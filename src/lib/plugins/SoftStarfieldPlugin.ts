import { Color } from 'ogl';
import { ShaderPlugin } from '../core/types';

export type SoftStarfieldConfig = {
  /** Background gradient bottom/top */
  backgroundBottom: string;
  backgroundTop: string;
  /** Star color (usually near-white) */
  starColor?: string; // default "#ffffff"
  /** Star density multiplier */
  density?: number; // default 1.0
  /** Star size multiplier */
  size?: number; // default 1.0
  /** Twinkle amount */
  twinkle?: number; // default 0.35
  /** Nebula tint */
  nebulaColor?: string; // default "#6a5cff"
  /** Nebula strength */
  nebula?: number; // default 0.35
  /** Motion speed */
  speed?: number; // default 0.2
  /** Grain 0.. */
  grainAmount?: number; // default 0.04
};

export class SoftStarfieldPlugin implements ShaderPlugin {
  name = 'soft-starfield';

  fragmentShader = /* glsl */ `
    precision highp float;
    uniform float uTimeInternal;
    uniform vec2 uResolution;
    uniform vec3 uBg0;
    uniform vec3 uBg1;
    uniform vec3 uStar;
    uniform vec3 uNebula;
    uniform float uDensity;
    uniform float uSize;
    uniform float uTwinkle;
    uniform float uNebulaAmt;
    uniform float uGrain;

    varying vec2 vUv;

    float hash12(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = hash12(i);
      float b = hash12(i + vec2(1.0, 0.0));
      float c = hash12(i + vec2(0.0, 1.0));
      float d = hash12(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      mat2 rot = mat2(0.80, -0.60, 0.60, 0.80);
      for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p = rot * p * 2.02 + 19.19;
        a *= 0.55;
      }
      return v;
    }

    // Simple cell-star: one star candidate per cell, softly drawn.
    float starLayer(vec2 uv, float scale, float t) {
      vec2 p = uv * scale;
      vec2 i = floor(p);
      vec2 f = fract(p) - 0.5;
      float rnd = hash12(i);

      // place star within cell
      vec2 o = vec2(hash12(i + 13.1), hash12(i + 71.7)) - 0.5;
      vec2 d = f - o * 0.45;

      // size distribution: many small, few larger
      float sz = mix(0.012, 0.035, pow(rnd, 7.0)) * uSize;
      float core = exp(-dot(d, d) / (sz * sz));

      // twinkle: slow, subtle (avoid distracting flicker)
      float tw = 1.0 + (sin((rnd * 12.0) + t * 1.5) * 0.5 + 0.5) * uTwinkle;

      // probability via rnd threshold (density)
      float present = step(0.55, rnd) * clamp(uDensity, 0.0, 3.0);
      return core * tw * present;
    }

    void main() {
      float aspect = uResolution.x / uResolution.y;
      vec2 uv = vUv;
      vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
      float t = uTimeInternal;

      // Background gradient
      vec3 col = mix(uBg0, uBg1, smoothstep(-0.6, 0.8, p.y));

      // Nebula: soft, low-contrast clouds
      float n = fbm(p * 1.35 + vec2(-0.05 * t, 0.02 * t));
      float n2 = fbm(p * 2.10 + vec2(0.03 * t, -0.04 * t));
      float neb = smoothstep(0.25, 0.85, n * 0.75 + n2 * 0.35);
      col += uNebula * neb * uNebulaAmt;

      // Stars: 3 layers parallax-ish
      float s1 = starLayer(uv + vec2(-0.010 * t, 0.006 * t), 55.0, t);
      float s2 = starLayer(uv + vec2(-0.020 * t, 0.010 * t), 90.0, t + 7.7) * 0.8;
      float s3 = starLayer(uv + vec2(-0.035 * t, 0.016 * t), 140.0, t + 13.3) * 0.6;
      float stars = clamp(s1 + s2 + s3, 0.0, 1.75);
      col += uStar * stars;

      // Grain
      float g = (hash12(uv * uResolution + t * 60.0) - 0.5) * 2.0;
      col += g * uGrain;

      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `;

  uniforms: any;
  private speed: number;

  constructor(config: SoftStarfieldConfig) {
    const bg0 = new Color(config.backgroundBottom);
    const bg1 = new Color(config.backgroundTop);
    const star = new Color(config.starColor ?? '#ffffff');
    const neb = new Color(config.nebulaColor ?? '#6a5cff');
    this.speed = config.speed ?? 0.2;

    this.uniforms = {
      uBg0: { value: [bg0.r, bg0.g, bg0.b] },
      uBg1: { value: [bg1.r, bg1.g, bg1.b] },
      uStar: { value: [star.r, star.g, star.b] },
      uNebula: { value: [neb.r, neb.g, neb.b] },
      uDensity: { value: config.density ?? 1.0 },
      uSize: { value: config.size ?? 1.0 },
      uTwinkle: { value: config.twinkle ?? 0.35 },
      uNebulaAmt: { value: config.nebula ?? 0.35 },
      uGrain: { value: config.grainAmount ?? 0.04 },
      uTimeInternal: { value: 0 },
    };
  }

  onRender(dt: number) {
    this.uniforms.uTimeInternal.value += dt * 0.001 * this.speed;
  }
}


