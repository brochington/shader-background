import { Color } from 'ogl';
import { ShaderPlugin } from '../core/types';

export type DreamyBokehConfig = {
  /** Background gradient bottom/top */
  backgroundBottom: string;
  backgroundTop: string;

  /** A 3-color palette for the bokeh highlights */
  colorA?: string; // default "#ffd1f3"
  colorB?: string; // default "#8be9ff"
  colorC?: string; // default "#b7ff9b"

  /** Bokeh density multiplier (0..3) */
  density?: number; // default 1.0
  /** Bokeh size multiplier (0.5..2) */
  size?: number; // default 1.0
  /** Edge softness / blur multiplier (0.5..2) */
  blur?: number; // default 1.0
  /** Motion speed */
  speed?: number; // default 0.25
  /** Vignette strength (0..1) */
  vignette?: number; // default 0.35
  /** Grain strength (0..0.15) */
  grainAmount?: number; // default 0.03
};

export class DreamyBokehPlugin implements ShaderPlugin {
  name = 'dreamy-bokeh';

  fragmentShader = /* glsl */ `
    precision highp float;

    uniform float uTimeInternal;
    uniform vec2 uResolution;
    uniform vec3 uBg0;
    uniform vec3 uBg1;
    uniform vec3 uA;
    uniform vec3 uB;
    uniform vec3 uC;
    uniform float uDensity;
    uniform float uSize;
    uniform float uBlur;
    uniform float uVignette;
    uniform float uGrain;

    varying vec2 vUv;

    float hash12(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    vec2 hash22(vec2 p) {
      float n = hash12(p);
      return vec2(n, hash12(p + n + 19.19));
    }

    float softCircle(vec2 d, float r, float blur) {
      float dist = length(d);
      // inside -> 1, outside -> 0, with soft falloff
      // NOTE: smoothstep requires edge0 < edge1.
      float b = max(0.0001, blur);
      float a = 1.0 - smoothstep(max(0.0, r - b), r, dist);
      return a * a;
    }

    vec3 palette3(float h) {
      // Smoothly mix between 3 user colors
      float t0 = smoothstep(0.0, 1.0, h);
      vec3 ab = mix(uA, uB, smoothstep(0.0, 0.65, t0));
      return mix(ab, uC, smoothstep(0.35, 1.0, t0));
    }

    vec3 bokehLayer(vec2 uv, float scale, float t, float seed, float weight) {
      vec2 p = uv * scale;
      vec2 ip = floor(p);
      vec2 fp = fract(p);

      vec3 col = vec3(0.0);
      float acc = 0.0;

      // Look at neighboring cells so circles crossing boundaries still render.
      for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
          vec2 cell = ip + vec2(float(i), float(j));
          float r0 = hash12(cell + seed);

          // density gate: fewer circles when density is low
          float present = step(0.18, r0) * clamp(uDensity, 0.0, 3.0);
          if (present <= 0.0) continue;

          vec2 o = hash22(cell + seed * 1.7);

          // Slow drift to avoid looking tiled/static.
          // Drift amplitude intentionally small for background usage.
          vec2 drift = 0.08 * vec2(
            sin(t * 0.25 + r0 * 6.2831),
            cos(t * 0.21 + r0 * 4.9132)
          );

          // Center in this cell (0..1), then shift to neighbor offset
          vec2 c = vec2(float(i), float(j)) + o + drift;
          vec2 d = fp - c;

          float radius = mix(0.10, 0.44, pow(r0, 2.3)) * uSize;
          float blur = mix(0.05, 0.18, hash12(cell + seed + 7.7)) * uBlur;

          float a = softCircle(d, radius, blur);

          // Add a soft “lens glow” lobe (subtle)
          float glow = exp(-dot(d, d) / max(0.0001, radius * radius) * 1.9);
          a = a * 0.72 + glow * 0.28;

          // Color per circle, slightly biased to highlight variety
          vec3 ccol = palette3(hash12(cell + seed + 3.3));

          // Gentle twinkle (avoid flicker)
          float tw = 1.0 + 0.12 * sin(t * 1.1 + r0 * 10.0);

          col += ccol * a * tw;
          acc += a;
        }
      }

      // Normalize by accumulated alpha to keep brightness stable.
      col *= weight / (1.0 + acc * 0.85);
      return col;
    }

    void main() {
      float aspect = uResolution.x / uResolution.y;
      vec2 uv = vUv;
      vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
      float t = uTimeInternal;

      // Background gradient with a slight vertical curve.
      float g = smoothstep(-0.7, 0.85, p.y + 0.08 * sin(p.x * 0.7));
      vec3 col = mix(uBg0, uBg1, g);

      // Multi-scale bokeh (parallax-ish via slight offsets).
      col += bokehLayer(uv + vec2(-0.010 * t, 0.006 * t), 10.0, t, 11.0, 1.0);
      col += bokehLayer(uv + vec2(-0.018 * t, 0.010 * t), 16.0, t + 3.7, 37.0, 0.9);
      col += bokehLayer(uv + vec2(-0.030 * t, 0.016 * t), 26.0, t + 9.1, 83.0, 0.7);

      // Vignette
      float v = 1.0 - smoothstep(0.25, 1.15, length(p * vec2(1.0, 0.9)));
      col *= mix(1.0, v, clamp(uVignette, 0.0, 1.0));

      // Grain
      float gr = (hash12(uv * uResolution + t * 61.0) - 0.5) * 2.0;
      col += gr * uGrain;

      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `;

  uniforms: any;
  private speed: number;

  constructor(config: DreamyBokehConfig) {
    const bg0 = new Color(config.backgroundBottom);
    const bg1 = new Color(config.backgroundTop);
    const a = new Color(config.colorA ?? '#ffd1f3');
    const b = new Color(config.colorB ?? '#8be9ff');
    const c = new Color(config.colorC ?? '#b7ff9b');

    this.speed = config.speed ?? 0.25;

    this.uniforms = {
      uBg0: { value: [bg0.r, bg0.g, bg0.b] },
      uBg1: { value: [bg1.r, bg1.g, bg1.b] },
      uA: { value: [a.r, a.g, a.b] },
      uB: { value: [b.r, b.g, b.b] },
      uC: { value: [c.r, c.g, c.b] },
      uDensity: { value: config.density ?? 1.0 },
      uSize: { value: config.size ?? 1.0 },
      uBlur: { value: config.blur ?? 1.0 },
      uVignette: { value: config.vignette ?? 0.35 },
      uGrain: { value: config.grainAmount ?? 0.03 },
      uTimeInternal: { value: 0 },
    };
  }

  onRender(dt: number) {
    this.uniforms.uTimeInternal.value += dt * 0.001 * this.speed;
  }
}


