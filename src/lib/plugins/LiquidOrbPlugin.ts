import { Color } from 'ogl';
import { ShaderPlugin } from '../core/types';

export type LiquidOrbConfig = {
  color: string;
  backgroundColor: string;
  count?: number; // Number of blobs, max 20
  speed?: number;
  gooeyness?: number; // Smooth-min blending factor, default 0.3
  edgeSoftness?: number; // Edge AA/softness, default 0.02
};

type Orb = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

export class LiquidOrbPlugin implements ShaderPlugin {
  name = 'liquid-orb';
  private static MAX_ORBS = 20;

  fragmentShader = /* glsl */ `
    precision highp float;
    uniform vec2 uResolution;
    uniform vec3 uColor;
    uniform vec3 uBgColor;
    uniform float uGooeyness;
    uniform float uEdgeSoftness;
    
    uniform int uCount;
    uniform vec3 uOrbs[${LiquidOrbPlugin.MAX_ORBS}]; // x, y, radius

    varying vec2 vUv;

    // Smooth Minimum function (The "Goo" math)
    float smin(float a, float b, float k) {
        float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
        return mix(b, a, h) - k * h * (1.0 - h);
    }

    void main() {
        float aspect = uResolution.x / uResolution.y;
        vec2 uv = vUv * 2.0 - 1.0;
        uv.x *= aspect;

        // Calculate Signed Distance Field (SDF)
        // Start with a large distance
        float d = 100.0;

        for (int i = 0; i < ${LiquidOrbPlugin.MAX_ORBS}; i++) {
            if (i >= uCount) break;
            
            vec3 orb = uOrbs[i];
            vec2 pos = orb.xy;
            pos.x *= aspect; // Correct aspect for orb position too
            
            float radius = orb.z;
            
            // Distance from pixel to orb center minus radius
            float dist = length(uv - pos) - radius;
            
            // Smoothly blend distances
            d = smin(d, dist, uGooeyness);
        }

        // Render based on threshold
        // If d < 0.0, we are inside the goo
        // We use smoothstep for antialiasing the edge
        float alpha = 1.0 - smoothstep(0.0, max(0.0001, uEdgeSoftness), d);

        vec3 color = mix(uBgColor, uColor, alpha);

        gl_FragColor = vec4(color, 1.0);
    }
  `;

  uniforms: any;
  private orbs: Orb[] = [];
  private orbData: Array<[number, number, number]> = [];
  private speedMultiplier: number;

  constructor(config: LiquidOrbConfig) {
    const fg = new Color(config.color);
    const bg = new Color(config.backgroundColor);
    const count = Math.min(config.count ?? 5, LiquidOrbPlugin.MAX_ORBS);
    this.speedMultiplier = config.speed ?? 0.5;

    // Initialize Physics
    for (let i = 0; i < count; i++) {
      this.orbs.push({
        x: (Math.random() * 2 - 1) * 0.8,
        y: (Math.random() * 2 - 1) * 0.8,
        vx: (Math.random() - 0.5) * 0.01,
        vy: (Math.random() - 0.5) * 0.01,
        radius: 0.2 + Math.random() * 0.2,
      });
    }

    // IMPORTANT: OGL expects uniform vec3[] values as an array of vec3-ish triplets,
    // not a packed Float32Array. If we pass a packed typed array, it will not map
    // correctly to `uniform vec3 uOrbs[MAX]` and you'll effectively see zeros.
    this.orbData = Array.from({ length: LiquidOrbPlugin.MAX_ORBS }, () => [0, 0, 0]);

    this.uniforms = {
      uColor: { value: [fg.r, fg.g, fg.b] },
      uBgColor: { value: [bg.r, bg.g, bg.b] },
      uCount: { value: count },
      uOrbs: { value: this.orbData },
      uGooeyness: { value: config.gooeyness ?? 0.3 },
      uEdgeSoftness: { value: config.edgeSoftness ?? 0.02 },
    };
  }

  onRender(dt: number) {
    // Physics Step
    // dt is usually ~16ms.

    let i = 0;
    for (const orb of this.orbs) {
      orb.x += orb.vx * this.speedMultiplier * (dt / 16);
      orb.y += orb.vy * this.speedMultiplier * (dt / 16);

      // Bounce off walls
      if (orb.x < -1.0 || orb.x > 1.0) orb.vx *= -1;
      if (orb.y < -1.0 || orb.y > 1.0) orb.vy *= -1;

      // Update vec3[] triplets
      const v = this.orbData[i];
      v[0] = orb.x;
      v[1] = orb.y;
      v[2] = orb.radius;
      i++;
    }

    // No need to reassign; values are updated in-place.
  }
}
