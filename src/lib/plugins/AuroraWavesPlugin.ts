import { Color } from 'ogl';
import { ShaderPlugin } from '../core/types';

export type AuroraWavesConfig = {
  /** Base background color */
  backgroundColor: string;
  /** Aurora ribbon primary color */
  color1: string;
  /** Aurora ribbon secondary color */
  color2: string;
  /** Overall brightness multiplier */
  intensity?: number; // default 0.9
  /** Motion speed */
  speed?: number; // default 0.6
  /** Noise scale (bigger = larger features) */
  scale?: number; // default 1.6
  /** Subtle film grain */
  grainAmount?: number; // default 0.05
};

export class AuroraWavesPlugin implements ShaderPlugin {
  name = 'aurora-waves';

  fragmentShader = /* glsl */ `
    precision highp float;
    uniform float uTimeInternal;
    uniform vec2 uResolution;
    uniform vec3 uBg;
    uniform vec3 uC1;
    uniform vec3 uC2;
    uniform float uIntensity;
    uniform float uScale;
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

    void main() {
      float aspect = uResolution.x / uResolution.y;
      vec2 uv = vUv;
      vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

      float t = uTimeInternal;
      vec3 col = uBg;

      // Ribbon field: layered sin waves warped by fbm
      float warp = fbm(p * (uScale * 0.9) + vec2(0.0, 0.10 * t));
      float warp2 = fbm(p * (uScale * 1.3) + vec2(4.0, -0.07 * t));
      float y = p.y + (warp - 0.5) * 0.55 + (warp2 - 0.5) * 0.35;

      // Multiple ribbons at different heights
      float band1 = exp(-pow((y - 0.15 + 0.08 * sin(p.x * 1.2 + t * 0.6)), 2.0) * 18.0);
      float band2 = exp(-pow((y + 0.05 + 0.10 * sin(p.x * 0.9 - t * 0.5)), 2.0) * 14.0);
      float band3 = exp(-pow((y - 0.35 + 0.06 * sin(p.x * 1.6 + t * 0.4)), 2.0) * 22.0);

      float bands = clamp(band1 + 0.8 * band2 + 0.6 * band3, 0.0, 1.5);
      // Soft flicker-free shimmer via low-frequency fbm
      float shimmer = 0.65 + 0.35 * fbm(p * (uScale * 0.6) + vec2(2.0, t * 0.12));

      vec3 aur = mix(uC1, uC2, clamp(0.5 + 0.5 * sin(p.x * 0.7 + t * 0.25 + warp * 2.0), 0.0, 1.0));
      col += aur * (bands * shimmer) * uIntensity;

      // Gentle vertical fade (so content remains readable)
      float fade = smoothstep(-0.9, 0.2, p.y);
      col = mix(col, uBg, fade * 0.35);

      // Grain
      float g = (hash12(uv * uResolution + t * 60.0) - 0.5) * 2.0;
      col += g * uGrain;

      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `;

  uniforms: any;
  private speed: number;

  constructor(config: AuroraWavesConfig) {
    const bg = new Color(config.backgroundColor);
    const c1 = new Color(config.color1);
    const c2 = new Color(config.color2);
    this.speed = config.speed ?? 0.6;

    this.uniforms = {
      uBg: { value: [bg.r, bg.g, bg.b] },
      uC1: { value: [c1.r, c1.g, c1.b] },
      uC2: { value: [c2.r, c2.g, c2.b] },
      uIntensity: { value: config.intensity ?? 0.9 },
      uScale: { value: config.scale ?? 1.6 },
      uGrain: { value: config.grainAmount ?? 0.05 },
      uTimeInternal: { value: 0 },
    };
  }

  onRender(dt: number) {
    this.uniforms.uTimeInternal.value += dt * 0.001 * this.speed;
  }
}


