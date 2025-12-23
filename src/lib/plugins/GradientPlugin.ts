import { Color } from 'ogl';
import { ShaderPlugin } from '../core/types';

export type GradientEasing =
  | 'linear'
  | 'smoothstep'
  | 'easeInOutQuad'
  | 'easeInOutCubic';

export type GradientMotionMode = 'none' | 'path' | 'random';

export type GradientMotionBounds = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

export type GradientMotion = {
  /**
   * - "none": static point (default)
   * - "path": moves between points in `path`
   * - "random": picks random targets and eases between them
   */
  mode?: GradientMotionMode;
  /** Waypoints for "path" mode. */
  path?: Array<{ x: number; y: number }>;
  /** Seconds to move from start -> target. Default 3.0 */
  duration?: number;
  /** Easing curve for interpolation. Default "smoothstep" */
  easing?: GradientEasing;
  /**
   * Bounds for clamping/random target generation. Defaults to [-1..1] in both axes.
   * (These are in the same -1..1 coordinate space as `x`/`y`.)
   */
  bounds?: Partial<GradientMotionBounds>;
  /**
   * Random mode only: if > 0, choose random targets within this radius around the point's
   * base `x`/`y` (then clamp to bounds). If omitted/0, choose targets anywhere in bounds.
   */
  randomRadius?: number;
};

export type GradientPoint = {
  x: number; // Range -1 to 1
  y: number; // Range -1 to 1
  colors: string[]; // Hex colors e.g., ["#ff0000", "#0000ff"]
  speed?: number; // Speed of color cycle, default 1.0
  motion?: GradientMotion;
};

export type GradientPluginOptions = {
  /** Defaults applied to any point that doesn't specify a `motion` field. */
  defaultMotion?: GradientMotion;
};

export class GradientPlugin implements ShaderPlugin {
  name = 'gradient-points';

  // Constants
  private static MAX_POINTS = 16; // Hard limit for WebGL uniform array size

  // Shader
  // We use Inverse Distance Weighting for soft interpolation
  fragmentShader = /* glsl */ `
    precision highp float;
    
    uniform float uTime;
    uniform vec2 uResolution;
    
    uniform int uPointCount;
    uniform vec2 uPoints[${GradientPlugin.MAX_POINTS}];
    uniform vec3 uColors[${GradientPlugin.MAX_POINTS}];
    
    varying vec2 vUv;

    void main() {
      // 1. Normalize UVs to preserve aspect ratio
      // This ensures points placed at (0.5, 0.5) look correct on rectangles
      float aspect = uResolution.x / uResolution.y;
      vec2 uv = vUv * 2.0 - 1.0; // Transform UV 0..1 to -1..1
      uv.x *= aspect;

      vec3 finalColor = vec3(0.0);
      float totalWeight = 0.0;

      for (int i = 0; i < ${GradientPlugin.MAX_POINTS}; i++) {
        if (i >= uPointCount) break;

        vec2 p = uPoints[i];
        p.x *= aspect; // Apply same aspect correction to point

        // Calculate Distance
        float dist = distance(uv, p);
        
        // Weight Function: 1 / (dist^power)
        // Power controls how "fat" the points are. 
        // 2.0 is standard (Gravity), lower (e.g. 1.5) is softer/fuzzier.
        float w = 1.0 / pow(dist, 2.0);
        
        // Clamp weight to avoid infinity at exact point location
        w = min(w, 1000.0);

        finalColor += uColors[i] * w;
        totalWeight += w;
      }

      // Avoid division by zero
      if (totalWeight > 0.0) {
        finalColor /= totalWeight;
      }

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  uniforms: any;

  // State for Color Animation
  private pointsConfig: GradientPoint[];
  // Pre-parsed RGB colors per point to avoid per-frame allocations
  #parsedColors: Array<Array<[number, number, number]>> = [];
  private colorStates: Array<{
    currentIdx: number;
    nextIdx: number;
    t: number;
  }>;

  // State for Motion Animation
  private motionStates: Array<{
    mode: GradientMotionMode;
    easing: GradientEasing;
    duration: number;
    bounds: GradientMotionBounds;
    randomRadius: number;
    // current lerp segment
    startX: number;
    startY: number;
    targetX: number;
    targetY: number;
    t: number; // 0..1
    // path
    pathIndex: number;
    // current value
    x: number;
    y: number;
  }>;

  private defaultMotion: GradientMotion;

  constructor(points: GradientPoint[], options: GradientPluginOptions = {}) {
    // Validate count
    if (points.length > GradientPlugin.MAX_POINTS) {
      console.warn(
        `GradientPlugin: Max points is ${GradientPlugin.MAX_POINTS}. Truncating.`
      );
      points = points.slice(0, GradientPlugin.MAX_POINTS);
    }

    this.pointsConfig = points;
    this.defaultMotion = options.defaultMotion ?? {};

    // Pre-parse colors once to avoid per-frame allocations in onRender.
    this.#parsedColors = points.map((p) =>
      (p.colors ?? []).map((hex) => {
        const c = new Color(hex);
        return [c.r, c.g, c.b];
      })
    );

    // Initialize color animation state for each point
    this.colorStates = points.map(() => ({
      currentIdx: 0,
      nextIdx: 1 % 2, // Safe default will be fixed in loop
      t: 0,
    }));

    this.motionStates = points.map((p) => this.#createMotionState(p));

    // Prepare Uniform Arrays
    const pointArray = new Array(GradientPlugin.MAX_POINTS);
    const colorArray = new Array(GradientPlugin.MAX_POINTS);

    // Initial Population
    points.forEach((p, i) => {
      // Coords as vec2 array [x, y]
      pointArray[i] = [p.x, p.y];

      // Initial Color as vec3 array [r, g, b]
      const rgb0 = this.#parsedColors[i]?.[0] ?? [0, 0, 0];
      colorArray[i] = [rgb0[0], rgb0[1], rgb0[2]];

      // Fix state logic if array length is small
      if (p.colors.length < 2) {
        // If only one color, it just loops to itself
        this.colorStates[i].nextIdx = 0;
      } else {
        this.colorStates[i].nextIdx = 1;
      }
    });

    // Fill remaining slots with default values
    for (let i = points.length; i < GradientPlugin.MAX_POINTS; i++) {
      pointArray[i] = [0, 0]; // Default center
      colorArray[i] = [0, 0, 0]; // Default black
    }

    this.uniforms = {
      uPointCount: { value: points.length },
      uPoints: { value: pointArray },
      uColors: { value: colorArray },
    };
  }

  #clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
  }

  #lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
  }

  #ease(t: number, easing: GradientEasing) {
    const x = this.#clamp(t, 0, 1);
    switch (easing) {
      case 'linear':
        return x;
      case 'easeInOutQuad':
        return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
      case 'easeInOutCubic':
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
      case 'smoothstep':
      default:
        return x * x * (3 - 2 * x);
    }
  }

  #resolveMotion(point: GradientPoint) {
    const m: GradientMotion = { ...this.defaultMotion, ...(point.motion ?? {}) };
    const bounds: GradientMotionBounds = {
      minX: -1,
      maxX: 1,
      minY: -1,
      maxY: 1,
      ...(m.bounds ?? {}),
    };
    // ensure sane ordering
    if (bounds.minX > bounds.maxX) [bounds.minX, bounds.maxX] = [bounds.maxX, bounds.minX];
    if (bounds.minY > bounds.maxY) [bounds.minY, bounds.maxY] = [bounds.maxY, bounds.minY];

    return {
      mode: (m.mode ?? 'none') as GradientMotionMode,
      path: m.path ?? [],
      duration: Math.max(0.001, m.duration ?? 3.0),
      easing: (m.easing ?? 'smoothstep') as GradientEasing,
      bounds,
      randomRadius: Math.max(0, m.randomRadius ?? 0),
    };
  }

  #randomTarget(
    baseX: number,
    baseY: number,
    bounds: GradientMotionBounds,
    radius: number
  ) {
    if (radius > 0) {
      // uniform disk
      const a = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * radius;
      const x = baseX + Math.cos(a) * r;
      const y = baseY + Math.sin(a) * r;
      return {
        x: this.#clamp(x, bounds.minX, bounds.maxX),
        y: this.#clamp(y, bounds.minY, bounds.maxY),
      };
    }
    return {
      x: this.#lerp(bounds.minX, bounds.maxX, Math.random()),
      y: this.#lerp(bounds.minY, bounds.maxY, Math.random()),
    };
  }

  #createMotionState(point: GradientPoint) {
    const r = this.#resolveMotion(point);
    const state = {
      mode: r.mode,
      easing: r.easing,
      duration: r.duration,
      bounds: r.bounds,
      randomRadius: r.randomRadius,
      startX: point.x,
      startY: point.y,
      targetX: point.x,
      targetY: point.y,
      t: 1,
      pathIndex: 0,
      x: point.x,
      y: point.y,
    };

    if (r.mode === 'path' && r.path.length > 0) {
      state.targetX = this.#clamp(r.path[0].x, r.bounds.minX, r.bounds.maxX);
      state.targetY = this.#clamp(r.path[0].y, r.bounds.minY, r.bounds.maxY);
      state.t = 0;
    } else if (r.mode === 'random') {
      const tgt = this.#randomTarget(point.x, point.y, r.bounds, r.randomRadius);
      state.targetX = tgt.x;
      state.targetY = tgt.y;
      state.t = 0;
    }

    return state;
  }

  #stepMotion(point: GradientPoint, state: GradientPlugin['motionStates'][number], dt: number) {
    const r = this.#resolveMotion(point);

    // If motion config changed, re-seed state but preserve current position.
    const modeChanged = state.mode !== r.mode;
    const easingChanged = state.easing !== r.easing;
    const durationChanged = state.duration !== r.duration;
    const boundsChanged =
      state.bounds.minX !== r.bounds.minX ||
      state.bounds.maxX !== r.bounds.maxX ||
      state.bounds.minY !== r.bounds.minY ||
      state.bounds.maxY !== r.bounds.maxY;
    const radiusChanged = state.randomRadius !== r.randomRadius;

    if (modeChanged || easingChanged || durationChanged || boundsChanged || radiusChanged) {
      state.mode = r.mode;
      state.easing = r.easing;
      state.duration = r.duration;
      state.bounds = r.bounds;
      state.randomRadius = r.randomRadius;

      state.startX = state.x;
      state.startY = state.y;
      state.t = 0;
      state.pathIndex = 0;

      if (r.mode === 'path' && r.path.length > 0) {
        state.targetX = this.#clamp(r.path[0].x, r.bounds.minX, r.bounds.maxX);
        state.targetY = this.#clamp(r.path[0].y, r.bounds.minY, r.bounds.maxY);
      } else if (r.mode === 'random') {
        const tgt = this.#randomTarget(point.x, point.y, r.bounds, r.randomRadius);
        state.targetX = tgt.x;
        state.targetY = tgt.y;
      } else {
        state.targetX = point.x;
        state.targetY = point.y;
        state.t = 1;
      }
    }

    if (r.mode === 'none') {
      // always track the base point position (useful if user mutates x/y without recreating plugin)
      state.x = this.#clamp(point.x, r.bounds.minX, r.bounds.maxX);
      state.y = this.#clamp(point.y, r.bounds.minY, r.bounds.maxY);
      state.startX = state.x;
      state.startY = state.y;
      state.targetX = state.x;
      state.targetY = state.y;
      state.t = 1;
      return;
    }

    // Advance time
    state.t += dt / (r.duration * 1000);
    if (state.t >= 1) {
      // snap to target and pick next
      state.x = state.targetX;
      state.y = state.targetY;
      state.startX = state.x;
      state.startY = state.y;
      state.t = 0;

      if (r.mode === 'path') {
        if (r.path.length === 0) {
          state.targetX = state.x;
          state.targetY = state.y;
          state.t = 1;
          return;
        }
        state.pathIndex = (state.pathIndex + 1) % r.path.length;
        const wp = r.path[state.pathIndex];
        state.targetX = this.#clamp(wp.x, r.bounds.minX, r.bounds.maxX);
        state.targetY = this.#clamp(wp.y, r.bounds.minY, r.bounds.maxY);
      } else {
        // random
        const tgt = this.#randomTarget(point.x, point.y, r.bounds, r.randomRadius);
        state.targetX = tgt.x;
        state.targetY = tgt.y;
      }
    }

    const e = this.#ease(state.t, r.easing);
    state.x = this.#lerp(state.startX, state.targetX, e);
    state.y = this.#lerp(state.startY, state.targetY, e);
  }

  onRender(dt: number) {
    const pointArray = this.uniforms.uPoints.value;
    const colorArray = this.uniforms.uColors.value;

    this.pointsConfig.forEach((p, i) => {
      // Update motion (position) first
      const motionState = this.motionStates[i];
      this.#stepMotion(p, motionState, dt);
      pointArray[i][0] = motionState.x;
      pointArray[i][1] = motionState.y;

      if (p.colors.length <= 1) return;

      const state = this.colorStates[i];
      const speed = p.speed || 1.0;

      // Update Interpolation T
      // dt is in ms, we want speed relative to seconds roughly
      state.t += dt * 0.001 * speed;

      if (state.t >= 1.0) {
        state.t = 0;
        state.currentIdx = state.nextIdx;
        state.nextIdx = (state.nextIdx + 1) % p.colors.length;
      }

      // Perform Lerp
      const c1 = this.#parsedColors[i][state.currentIdx];
      const c2 = this.#parsedColors[i][state.nextIdx];

      // Simple RGB Linear Interpolation
      const r = c1[0] + (c2[0] - c1[0]) * state.t;
      const g = c1[1] + (c2[1] - c1[1]) * state.t;
      const b = c1[2] + (c2[2] - c1[2]) * state.t;

      // Update array element
      colorArray[i][0] = r;
      colorArray[i][1] = g;
      colorArray[i][2] = b;
    });

    // No need to reassign the array - OGL will detect the changes
  }
}
