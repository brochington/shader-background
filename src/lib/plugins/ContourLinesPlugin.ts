import { Color } from 'ogl';
import { ShaderPlugin } from '../core/types';

export type ContourLinesConfig = {
  backgroundColor: string;
  lineColor: string;
  accentColor?: string; // default derived from lineColor
  /** Lines per unit */
  density?: number; // default 12
  /** Line thickness */
  thickness?: number; // default 0.075
  /** Warp amount */
  warp?: number; // default 0.9
  /** Motion speed */
  speed?: number; // default 0.35
  /** Glow amount */
  glow?: number; // default 0.35
  /** Grain amount */
  grainAmount?: number; // default 0.04
};

export class ContourLinesPlugin implements ShaderPlugin {
  name = 'contour-lines';

  fragmentShader = /* glsl */ `
    precision highp float;
    #ifdef GL_OES_standard_derivatives
    #extension GL_OES_standard_derivatives : enable
    #endif

    uniform float uTimeInternal;
    uniform vec2 uResolution;
    uniform vec3 uBg;
    uniform vec3 uLine;
    uniform vec3 uAccent;
    uniform float uDensity;
    uniform float uThickness;
    uniform float uWarp;
    uniform float uGlow;
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

    float aawidth(float x) {
      #ifdef GL_OES_standard_derivatives
      return fwidth(x);
      #else
      return 1.0 / max(1.0, min(uResolution.x, uResolution.y));
      #endif
    }

    void main() {
      float aspect = uResolution.x / uResolution.y;
      vec2 uv = vUv;
      vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
      float t = uTimeInternal;

      // Height field
      vec2 flow = vec2(0.10 * t, -0.06 * t);
      float h = fbm(p * 1.25 + flow);
      float h2 = fbm(p * 2.10 + vec2(-0.05 * t, 0.08 * t));
      float height = h + 0.55 * h2;

      // Warp the domain so contours bend naturally
      vec2 w = vec2(
        fbm(p * 1.2 + vec2(2.0, 0.15 * t)),
        fbm(p * 1.2 + vec2(7.0, -0.12 * t))
      );
      p += (w - 0.5) * uWarp;

      // Contour function: periodic bands
      float c = fract((height + 0.35 * fbm(p * 1.75 + 4.0)) * uDensity);
      float distToLine = min(c, 1.0 - c);
      float wAA = aawidth(distToLine) * 1.4;
      float line = 1.0 - smoothstep(uThickness, uThickness + wAA, distToLine);

      // Glow around lines
      float glow = smoothstep(0.45, 0.0, distToLine) * uGlow;

      vec3 col = uBg;
      col += uLine * line;
      col += uAccent * glow;

      // Grain
      float g = (hash12(uv * uResolution + t * 60.0) - 0.5) * 2.0;
      col += g * uGrain;

      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `;

  uniforms: any;
  private speed: number;

  constructor(config: ContourLinesConfig) {
    const bg = new Color(config.backgroundColor);
    const line = new Color(config.lineColor);
    const accent = new Color(config.accentColor ?? config.lineColor);
    this.speed = config.speed ?? 0.35;

    this.uniforms = {
      uBg: { value: [bg.r, bg.g, bg.b] },
      uLine: { value: [line.r, line.g, line.b] },
      uAccent: { value: [accent.r, accent.g, accent.b] },
      uDensity: { value: config.density ?? 12 },
      uThickness: { value: config.thickness ?? 0.075 },
      uWarp: { value: config.warp ?? 0.9 },
      uGlow: { value: config.glow ?? 0.35 },
      uGrain: { value: config.grainAmount ?? 0.04 },
      uTimeInternal: { value: 0 },
    };
  }

  onRender(dt: number) {
    this.uniforms.uTimeInternal.value += dt * 0.001 * this.speed;
  }
}


