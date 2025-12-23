import { Color } from 'ogl';
import { ShaderPlugin } from '../core/types';

export type StainedGlassConfig = {
  /** Background behind the glass (shows through a bit) */
  backgroundColor: string;
  /** Lead/edge color */
  leadColor?: string; // default "#0b0b10"

  /** Palette colors for glass cells */
  colorA?: string; // default "#38bdf8"
  colorB?: string; // default "#a78bfa"
  colorC?: string; // default "#fb7185"
  colorD?: string; // default "#fbbf24"

  /** Cell scale */
  scale?: number; // default 3.2
  /**
   * Pattern variant (changes the underlying coordinate transform).
   * - 0: classic
   * - 1: crystal (anisotropic)
   * - 2: radial-ish twist
   */
  variant?: 0 | 1 | 2; // default 0
  /** Random seed (any number). Change this to get a different layout. */
  seed?: number; // default 0
  /**
   * Site jitter 0..1
   * - 0 => very regular cells
   * - 1 => fully random Voronoi sites
   */
  jitter?: number; // default 1.0
  /** Rotate the pattern in radians */
  rotation?: number; // default 0
  /** Edge thickness */
  edgeWidth?: number; // default 0.08
  /** Edge sharpness (higher = crisper lines) */
  edgeSharpness?: number; // default 1.25
  /** Glow along edges */
  edgeGlow?: number; // default 0.45
  /** Warp amount (0..1.5) */
  distortion?: number; // default 0.55
  /** Motion speed */
  speed?: number; // default 0.12
  /** Grain */
  grainAmount?: number; // default 0.02
};

export class StainedGlassPlugin implements ShaderPlugin {
  name = 'stained-glass';

  fragmentShader = /* glsl */ `
    precision highp float;
    #ifdef GL_OES_standard_derivatives
    #extension GL_OES_standard_derivatives : enable
    #endif

    uniform float uTimeInternal;
    uniform vec2 uResolution;
    uniform vec3 uBg;
    uniform vec3 uLead;
    uniform vec3 uA;
    uniform vec3 uB;
    uniform vec3 uC;
    uniform vec3 uD;
    uniform float uScale;
    uniform float uSeed;
    uniform float uJitter;
    uniform float uRotate;
    uniform int uVariant;
    uniform float uEdgeW;
    uniform float uEdgeSharp;
    uniform float uGlow;
    uniform float uDist;
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

    vec3 palette4(float h) {
      // Blend 4 colors in a loop-friendly way.
      vec3 ab = mix(uA, uB, smoothstep(0.0, 0.50, h));
      vec3 cd = mix(uC, uD, smoothstep(0.50, 1.0, h));
      return mix(ab, cd, smoothstep(0.25, 0.85, h));
    }

    mat2 rot2(float a) {
      float s = sin(a), c = cos(a);
      return mat2(c, -s, s, c);
    }

    // Returns:
    // x: distance to nearest site
    // y: border metric (small near borders)
    // z: random id
    vec3 voronoi(vec2 x) {
      vec2 n = floor(x);
      vec2 f = fract(x);

      float md = 8.0;
      float md2 = 8.0;
      vec2 mr = vec2(0.0);
      vec2 seed2 = vec2(uSeed, uSeed * 1.618);

      for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
          vec2 g = vec2(float(i), float(j));
          vec2 o = hash22(n + g + seed2);
          // Jitter controls how "random" the site is inside the cell.
          o = mix(vec2(0.5), o, clamp(uJitter, 0.0, 1.0));
          vec2 r = g + o - f;
          float d = dot(r, r);
          if (d < md) {
            md2 = md;
            md = d;
            mr = n + g + o;
          } else if (d < md2) {
            md2 = d;
          }
        }
      }

      float d1 = sqrt(md);
      float d2 = sqrt(md2);
      float border = d2 - d1; // small at edges
      return vec3(d1, border, hash12(mr + seed2));
    }

    void main() {
      float aspect = uResolution.x / uResolution.y;
      vec2 uv = vUv;
      vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
      float t = uTimeInternal;

      // Subtle low-frequency warp to avoid static mosaic vibe
      vec2 warp = vec2(
        noise(p * 1.5 + vec2(0.07 * t, -0.03 * t)) - 0.5,
        noise(p * 1.5 + vec2(-0.05 * t, 0.06 * t) + 19.19) - 0.5
      );
      p += warp * (0.30 * uDist);

      // Variant transforms (changes the cell character)
      vec2 g = p;
      g = rot2(uRotate) * g;
      if (uVariant == 1) {
        // Crystal: anisotropic scaling for more "shard-like" cells
        g *= mat2(1.35, 0.35, -0.10, 0.85);
      } else if (uVariant == 2) {
        // Radial-ish twist: mild angular warp
        float ang = atan(g.y, g.x);
        float rad = length(g);
        g += 0.15 * vec2(cos(ang * 3.0 + rad * 2.0), sin(ang * 2.0 - rad * 2.4));
      }
      g *= uScale;
      vec3 v = voronoi(g);

      float border = v.y;
      float id = v.z;

      // Lead line mask (1 at borders)
      float w = max(0.0005, uEdgeW);
      float aa = 0.0015;
      #ifdef GL_OES_standard_derivatives
      aa = fwidth(border) / max(0.0001, uEdgeSharp);
      #endif
      float lead = 1.0 - smoothstep(w - aa, w + aa, border);

      // Cell color from palette + gentle variation
      vec3 cell = palette4(id);
      float tint = (noise(g * 0.85 + id * 11.7) - 0.5) * 0.18;
      cell *= (1.0 + tint);

      // Faux “glass thickness” / caustic-y highlight
      float highlight = smoothstep(0.02, 0.30, noise(g * 2.2 + vec2(0.0, t * 0.6)));
      highlight *= (1.0 - lead);

      // Edge glow
      float glow = exp(-border * border / max(0.00001, (w * w) * 0.35));
      glow *= uGlow;

      // Compose
      vec3 col = mix(uBg, cell, 0.92);
      col += cell * highlight * 0.10;

      // Lead overrides + glow on top
      col = mix(col, uLead, lead);
      col += (cell * 0.55 + vec3(1.0) * 0.25) * glow;

      // Subtle vignette
      float vig = 1.0 - smoothstep(0.35, 1.15, length(p * vec2(1.0, 0.95)));
      col *= 0.90 + 0.10 * vig;

      // Grain
      float gr = (hash12(uv * uResolution + t * 61.0) - 0.5) * 2.0;
      col += gr * uGrain;

      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `;

  uniforms: any;
  private speed: number;

  constructor(config: StainedGlassConfig) {
    const bg = new Color(config.backgroundColor);
    const lead = new Color(config.leadColor ?? '#0b0b10');
    const a = new Color(config.colorA ?? '#38bdf8');
    const b = new Color(config.colorB ?? '#a78bfa');
    const c = new Color(config.colorC ?? '#fb7185');
    const d = new Color(config.colorD ?? '#fbbf24');

    this.speed = config.speed ?? 0.12;

    this.uniforms = {
      uBg: { value: [bg.r, bg.g, bg.b] },
      uLead: { value: [lead.r, lead.g, lead.b] },
      uA: { value: [a.r, a.g, a.b] },
      uB: { value: [b.r, b.g, b.b] },
      uC: { value: [c.r, c.g, c.b] },
      uD: { value: [d.r, d.g, d.b] },
      uScale: { value: config.scale ?? 3.2 },
      uSeed: { value: config.seed ?? 0 },
      uJitter: { value: config.jitter ?? 1.0 },
      uRotate: { value: config.rotation ?? 0 },
      uVariant: { value: config.variant ?? 0 },
      uEdgeW: { value: config.edgeWidth ?? 0.08 },
      uEdgeSharp: { value: config.edgeSharpness ?? 1.25 },
      uGlow: { value: config.edgeGlow ?? 0.45 },
      uDist: { value: config.distortion ?? 0.55 },
      uGrain: { value: config.grainAmount ?? 0.02 },
      uTimeInternal: { value: 0 },
    };
  }

  onRender(dt: number) {
    this.uniforms.uTimeInternal.value += dt * 0.001 * this.speed;
  }
}


