# shader-backgrounds

Small shader-based background library built on [OGL](https://github.com/oframe/ogl). It provides:

- A lightweight plugin interface (`ShaderPlugin`)
- A canvas renderer (`ShaderCanvas`)
- A web component (`<shader-background>`) for easy page backgrounds
- A set of built-in background plugins

## Install

```bash
npm install @brochington/shader-backgrounds
```

## Quick start (Web Component)

Import the package once to register the custom element, then assign a plugin instance.

```ts
import '@brochington/shader-backgrounds';
import { SoftStarfieldPlugin } from '@brochington/shader-backgrounds';

const el = document.querySelector('shader-background') as any;
el.plugin = new SoftStarfieldPlugin({
  backgroundBottom: '#040512',
  backgroundTop: '#0b1630',
  starColor: '#ffffff',
});
```

HTML:

```html
<shader-background style="position:fixed; inset:0; z-index:-1;"></shader-background>
```

### Web component API

- **`plugin: ShaderPlugin`**: set the active plugin (recreates the renderer).
- **`renderScale: number`**: internal render resolution multiplier (0.1..2.0).
- **`singleRender: boolean`**: if true, render once (manual) instead of animating.
- **`render()`**: triggers a render when `singleRender === true`.
- **Attributes**
  - **`render-scale="0.5"`**: same as `renderScale`.
  - **`single-render`** or **`single-render="true"`**: same as `singleRender`.

Styling the internal canvas from outside the shadow root:

```css
shader-background::part(canvas) {
  filter: blur(10px) saturate(1.15);
}
```

## Quick start (ShaderCanvas)

Use this if you want to manage the `<canvas>` yourself.

```ts
import { ShaderCanvas, CausticsPlugin } from '@brochington/shader-backgrounds';

const canvas = document.querySelector('canvas')!;
const plugin = new CausticsPlugin({
  color: '#b9fff7',
  backgroundColor: '#031028',
});

const engine = new ShaderCanvas(canvas, plugin, {
  renderScale: 1.0,     // internal buffer scale
  pixelRatio: 1.0,      // additional multiplier (clamped 0.1..4.0)
  singleRender: false,
});

engine.start();
// engine.resize() is available if you manage sizing yourself.
```

## Built-in plugins

See `PLUGINS.md` for full configuration details for each plugin.

Available exports:

- `GradientPlugin`
- `GrainyFogPlugin`
- `RetroGridPlugin`
- `LiquidOrbPlugin`
- `CausticsPlugin`
- `AuroraWavesPlugin`
- `SoftStarfieldPlugin`
- `ContourLinesPlugin`
- `DreamyBokehPlugin`
- `InkWashPlugin`
- `StainedGlassPlugin`

## Writing your own plugin

Implement the `ShaderPlugin` interface from `src/lib/core/types.ts`:

- **`name`**: unique identifier.
- **`fragmentShader`**: GLSL fragment shader string.
- **`uniforms`**: object of `{ value }` entries (OGL wraps these).
- Optional hooks: **`onInit(gl, program)`**, **`onRender(dtMs, totalTimeSeconds)`**, **`onResize(width, height)`**

The engine always provides these uniforms:

- **`uTime`**: elapsed time in seconds.
- **`uResolution`**: display resolution in CSS pixels (`vec2(width, height)`), suitable for aspect-correct math.

### Minimal example plugin

```ts
import type { ShaderPlugin } from '@brochington/shader-backgrounds';

export class SolidColorPlugin implements ShaderPlugin {
  name = 'solid-color';

  fragmentShader = /* glsl */ `
    precision highp float;
    uniform vec3 uColor;
    void main() {
      gl_FragColor = vec4(uColor, 1.0);
    }
  `;

  uniforms = {
    uColor: { value: [0.10, 0.12, 0.18] },
  };
}
```

### Notes and conventions

- **Time units**: `onRender` receives `dt` in milliseconds. `uTime` and `totalTime` are seconds.
- **Uniform arrays**: for GLSL `uniform vec3 uData[N]`, pass an array of triplets like `[[x,y,z], ...]` (not a packed `Float32Array`).
- **Aspect correction**: typical pattern is:
  - `float aspect = uResolution.x / uResolution.y;`
  - `vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);`
- **Derivatives / antialiasing**: if you use `fwidth`, include:
  - `#ifdef GL_OES_standard_derivatives` / `#extension GL_OES_standard_derivatives : enable`

## Repository development

```bash
npm install
npm run dev     # run demo via Vite
npm run build   # generate dist bundles + .d.ts
npm run preview # preview Vite build
```


