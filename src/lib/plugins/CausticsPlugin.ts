import { Color } from 'ogl';
import { ShaderPlugin } from '../core/types';

export type CausticsConfig = {
  color: string; // The light color (e.g. Cyan/White)
  backgroundColor: string; // Deep blue
  intensity?: number; // Brightness of the lines
  speed?: number;
  scale?: number; // Pattern scale, default 2.2
  distortion?: number; // 0..2, default 0.9
  sharpness?: number; // 1..6, default 3.2
  antiAlias?: number; // 0..2, default 1.0 (higher = smoother)
};

export class CausticsPlugin implements ShaderPlugin {
  name = 'caustics';

  fragmentShader = /* glsl */ `
    precision highp float;
    #ifdef GL_OES_standard_derivatives
    #extension GL_OES_standard_derivatives : enable
    #endif

    uniform float uTimeInternal; 
    uniform vec2 uResolution;
    uniform vec3 uColor;
    uniform vec3 uBgColor;
    uniform float uIntensity;
    uniform float uScale;
    uniform float uDistortion;
    uniform float uSharpness;
    uniform float uAA;
    
    varying vec2 vUv;

    float aawidth(float x) {
      #ifdef GL_OES_standard_derivatives
      return fwidth(x);
      #else
      // Fallback: approximate 1 pixel in normalized space.
      return 1.0 / max(1.0, min(uResolution.x, uResolution.y));
      #endif
    }

    float hash12(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    // Textureless "caustics-ish" pattern: warped cells + exponential falloff
    float caustics(vec2 p, float t) {
      float c = 0.0;
      float a = 1.0;

      // Add a slow, large-scale warp so it doesn't look like static tiles
      p += uDistortion * vec2(
        sin(p.y * 1.7 + t * 0.8),
        sin(p.x * 1.3 - t * 0.7)
      );

      for (int i = 0; i < 4; i++) {
        // repeat + distance to nearest cell edge (0 at edges)
        vec2 q = abs(fract(p) - 0.5);
        float edgeDist = min(q.x, q.y);

        // Derivative-based AA: widen the transition as frequency increases
        float w = aawidth(edgeDist) * (1.0 + uAA * 2.0);

        // Bright lines near edges, with controllable sharpness
        float line = 1.0 - smoothstep(0.0, w, edgeDist);
        // Emphasize peaks without introducing harsh aliasing
        float web = pow(clamp(line, 0.0, 1.0), uSharpness);
        c += web * a;

        // zoom and drift
        p = p * 1.65 + vec2(0.12 * t, -0.10 * t);
        p += (hash12(p + float(i) * 7.7) - 0.5) * 0.25;
        a *= 0.72;
      }

      return c;
    }

    void main() {
      float aspect = uResolution.x / uResolution.y;
      vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);
      float t = uTimeInternal;

      // scale in aspect-correct domain
      p *= uScale;

      float c = caustics(p, t);

      // shape + intensity
      float brightness = pow(clamp(c, 0.0, 2.0), 1.35) * uIntensity;

      vec3 col = uBgColor + uColor * brightness;

      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `;

  uniforms: any;
  private speed: number;

  constructor(config: CausticsConfig) {
    const c = new Color(config.color);
    const bg = new Color(config.backgroundColor);
    this.speed = config.speed ?? 0.5;

    this.uniforms = {
      uColor: { value: [c.r, c.g, c.b] },
      uBgColor: { value: [bg.r, bg.g, bg.b] },
      uIntensity: { value: config.intensity ?? 1.0 },
      uScale: { value: config.scale ?? 2.2 },
      uDistortion: { value: config.distortion ?? 0.9 },
      uSharpness: { value: config.sharpness ?? 3.2 },
      uAA: { value: config.antiAlias ?? 1.0 },
      uTimeInternal: { value: 0 },
    };
  }

  onRender(dt: number) {
    // We update our own time uniform to control the wave speed
    this.uniforms.uTimeInternal.value += dt * 0.001 * this.speed;
  }
}
