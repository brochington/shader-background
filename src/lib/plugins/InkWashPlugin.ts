import { Color } from 'ogl';
import { ShaderPlugin } from '../core/types';

export type InkWashConfig = {
  /** Paper/background color */
  paperColor: string;
  /** Ink/pigment color */
  inkColor: string;

  /** Overall pattern scale */
  scale?: number; // default 1.4
  /** Motion speed */
  speed?: number; // default 0.18
  /** Flow / warping amount */
  flow?: number; // default 0.85
  /** Contrast / punch of ink */
  contrast?: number; // default 1.15
  /** Granulation (pigment clumping) */
  granulation?: number; // default 0.35
  /** Vignette (0..1) */
  vignette?: number; // default 0.35
  /** Grain strength */
  grainAmount?: number; // default 0.03
};

export class InkWashPlugin implements ShaderPlugin {
  name = 'ink-wash';

  fragmentShader = /* glsl */ `
    precision highp float;
    #ifdef GL_OES_standard_derivatives
    #extension GL_OES_standard_derivatives : enable
    #endif

    uniform float uTimeInternal;
    uniform vec2 uResolution;
    uniform vec3 uPaper;
    uniform vec3 uInk;
    uniform float uScale;
    uniform float uFlow;
    uniform float uContrast;
    uniform float uGran;
    uniform float uVignette;
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
      for (int i = 0; i < 6; i++) {
        v += a * noise(p);
        p = rot * p * 2.02 + 17.17;
        a *= 0.55;
      }
      return v;
    }

    vec2 flowField(vec2 p, float t) {
      // Curl-ish flow from two fbm samples
      float n1 = fbm(p * 1.10 + vec2(0.0,  t * 0.12));
      float n2 = fbm(p * 1.10 + vec2(13.1, -t * 0.10));
      vec2 f = vec2(n1 - 0.5, n2 - 0.5);
      return f;
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

      // Base paper tone + subtle fiber texture
      float fiber = noise(uv * vec2(uResolution.x, uResolution.y) * 0.0025);
      float fiber2 = noise(uv * vec2(uResolution.x, uResolution.y) * 0.0060 + 19.19);
      vec3 col = uPaper + (fiber - 0.5) * 0.05 + (fiber2 - 0.5) * 0.03;

      // Domain-warped pigment field
      vec2 q = p * uScale;
      vec2 f = flowField(q, t) * (0.55 * uFlow);
      vec2 r = flowField(q + f * 1.35, t + 7.7) * (0.55 * uFlow);
      vec2 w = f + r;

      float base = fbm(q + w);
      float detail = fbm(q * 2.10 - w * 0.70 + vec2(-0.07 * t, 0.05 * t));
      float field = base * 0.72 + detail * 0.35;

      // Contrast shaping
      field = clamp(field, 0.0, 1.0);
      field = pow(field, 1.0 / max(0.001, uContrast));

      // Pigment coverage (soft threshold)
      float edgeW = 0.08 + 0.06 * (1.0 - uFlow);
      float ink = smoothstep(0.38 - edgeW, 0.68 + edgeW, field);

      // “Tide lines”: emphasize places where the field changes quickly
      float grad = 0.0;
      #ifdef GL_OES_standard_derivatives
      grad = (abs(dFdx(field)) + abs(dFdy(field))) * 6.0;
      #else
      grad = aawidth(field) * 120.0;
      #endif
      float tide = smoothstep(0.20, 0.95, grad);
      tide *= (1.0 - ink) * 0.55 + ink * 0.25; // strongest near transitions

      // Pigment granulation: high-frequency noise visible where ink exists
      float gran = noise(q * 10.0 + vec2(31.2, 17.8)) - 0.5;
      float gran2 = noise(q * 18.0 + vec2(9.7, 53.1)) - 0.5;
      float granTex = gran * 0.8 + gran2 * 0.6;
      float granAmt = uGran * (0.35 + 0.65 * ink);

      float pigment = clamp(ink + tide * 0.35 + granTex * granAmt, 0.0, 1.0);

      // Mix ink into paper
      col = mix(col, mix(col, uInk, 0.92), pigment);

      // Vignette
      float v = 1.0 - smoothstep(0.25, 1.15, length(p * vec2(1.0, 0.95)));
      col *= mix(1.0, v, clamp(uVignette, 0.0, 1.0));

      // Grain
      float g = (hash12(uv * uResolution + t * 61.0) - 0.5) * 2.0;
      col += g * uGrain;

      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `;

  uniforms: any;
  private speed: number;

  constructor(config: InkWashConfig) {
    const paper = new Color(config.paperColor);
    const ink = new Color(config.inkColor);

    this.speed = config.speed ?? 0.18;

    this.uniforms = {
      uPaper: { value: [paper.r, paper.g, paper.b] },
      uInk: { value: [ink.r, ink.g, ink.b] },
      uScale: { value: config.scale ?? 1.4 },
      uFlow: { value: config.flow ?? 0.85 },
      uContrast: { value: config.contrast ?? 1.15 },
      uGran: { value: config.granulation ?? 0.35 },
      uVignette: { value: config.vignette ?? 0.35 },
      uGrain: { value: config.grainAmount ?? 0.03 },
      uTimeInternal: { value: 0 },
    };
  }

  onRender(dt: number) {
    this.uniforms.uTimeInternal.value += dt * 0.001 * this.speed;
  }
}


