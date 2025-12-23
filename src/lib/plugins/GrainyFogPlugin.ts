import { Color } from 'ogl';
import { ShaderPlugin } from '../core/types';

export type GrainyFogConfig = {
  firstColor: string;
  secondColor: string;
  backgroundColor: string;
  grainAmount?: number; // 0.0 to 1.0, default 0.12
  speed?: number; // default 1.0
  scale?: number; // Noise scale, default 2.25
  octaves?: number; // 1..6, default 4
  lacunarity?: number; // default 2.0
  gain?: number; // default 0.5
  contrast?: number; // 0.5..2.5, default 1.25
};

export class GrainyFogPlugin implements ShaderPlugin {
  name = 'grainy-fog';

  fragmentShader = /* glsl */ `
    precision highp float;
    uniform float uTimeInternal;
    uniform vec2 uResolution;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uBgColor;
    uniform float uGrain;
    uniform float uScale;
    uniform float uContrast;
    uniform int uOctaves;
    uniform float uLacunarity;
    uniform float uGain;
    
    varying vec2 vUv;

    // --- Value Noise / FBM ---
    float hash12(vec2 p) {
      // Dave Hoskins-ish: cheap, stable
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    float noise(in vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);

      float a = hash12(i);
      float b = hash12(i + vec2(1.0, 0.0));
      float c = hash12(i + vec2(0.0, 1.0));
      float d = hash12(i + vec2(1.0, 1.0));

      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float fbm(in vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      float freq = 1.0;

      // rotate to reduce axial bias
      mat2 rot = mat2(0.80, -0.60, 0.60, 0.80);

      for (int i = 0; i < 6; i++) {
        if (i >= uOctaves) break;
        value += amplitude * noise(st * freq);
        st = rot * st + 19.19;
        freq *= uLacunarity;
        amplitude *= uGain;
      }

      return value;
    }

    void main() {
      vec2 uv = vUv;

      // aspect-correct domain
      float aspect = uResolution.x / uResolution.y;
      vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

      float t = uTimeInternal;

      // Two-layer flow field -> richer motion
      vec2 q;
      q.x = fbm(p * uScale + vec2(0.0, 0.12 * t));
      q.y = fbm(p * (uScale * 0.9) + vec2(3.1, -0.08 * t));

      vec2 r;
      r.x = fbm(p * (uScale * 1.2) + 1.7 * q + vec2(1.7, 9.2) + 0.15 * t);
      r.y = fbm(p * (uScale * 1.1) + 1.3 * q + vec2(8.3, 2.8) + 0.11 * t);

      float f = fbm(p * uScale + r);

      // Contrast curve (keeps highlights punchy)
      f = pow(clamp(f, 0.0, 1.0), 1.0 / max(0.001, uContrast));

      // Color mix
      vec3 col = uBgColor;
      col = mix(col, uColor1, smoothstep(0.10, 0.85, f));
      col = mix(col, uColor2, smoothstep(0.15, 0.95, length(q)));

      // Film grain in pixel space (stable-ish)
      vec2 px = uv * uResolution;
      float g = (hash12(px + t * 60.0) - 0.5) * 2.0;
      col += g * uGrain;

      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `;

  uniforms: any;
  private speed: number;

  constructor(config: GrainyFogConfig) {
    const c1 = new Color(config.firstColor);
    const c2 = new Color(config.secondColor);
    const bg = new Color(config.backgroundColor);
    this.speed = config.speed ?? 1.0;

    this.uniforms = {
      uColor1: { value: [c1.r, c1.g, c1.b] },
      uColor2: { value: [c2.r, c2.g, c2.b] },
      uBgColor: { value: [bg.r, bg.g, bg.b] },
      uGrain: { value: config.grainAmount ?? 0.12 },
      uScale: { value: config.scale ?? 2.25 },
      uContrast: { value: config.contrast ?? 1.25 },
      uOctaves: { value: Math.max(1, Math.min(6, config.octaves ?? 4)) },
      uLacunarity: { value: config.lacunarity ?? 2.0 },
      uGain: { value: config.gain ?? 0.5 },
      uTimeInternal: { value: 0 },
    };
  }

  onRender(dt: number) {
    this.uniforms.uTimeInternal.value += dt * 0.001 * this.speed;
  }
}
