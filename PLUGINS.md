# Built-in Plugins

This document describes configuration options for all built-in plugins exported from `shader-backgrounds`.

General notes:

- Colors are CSS color strings parsed by OGL `Color` (commonly hex like `#rrggbb`).
- `speed` values generally scale animation time (higher = faster).
- `grainAmount` adds subtle noise to reduce color banding; keep it low for backgrounds.

## `GradientPlugin` (`name = "gradient-points"`)

Creates a smooth multi-point gradient using inverse-distance weighting. Supports animated color cycling and optional motion for each point.

Constructor:

```ts
new GradientPlugin(points: GradientPoint[], options?: GradientPluginOptions)
```

### `GradientPoint`

- **`x: number`**: point X in range `[-1, 1]`.
- **`y: number`**: point Y in range `[-1, 1]`.
- **`colors: string[]`**: list of colors to cycle through (length 1 means static).
- **`speed?: number`**: color cycle speed multiplier. Default `1.0`.
- **`motion?: GradientMotion`**: optional motion configuration.

### `GradientPluginOptions`

- **`defaultMotion?: GradientMotion`**: defaults applied to points that omit `motion`.

### `GradientMotion`

- **`mode?: "none" | "path" | "random"`**: default `"none"`.
- **`path?: Array<{ x: number; y: number }>`**: waypoints for `"path"` mode.
- **`duration?: number`**: seconds to move from start to target. Default `3.0`.
- **`easing?: "linear" | "smoothstep" | "easeInOutQuad" | "easeInOutCubic"`**: default `"smoothstep"`.
- **`bounds?: Partial<{ minX: number; maxX: number; minY: number; maxY: number }>`**: clamp / random range; defaults to `[-1..1]` for both axes.
- **`randomRadius?: number`**: `"random"` mode only. If > 0, choose targets within this radius around the point’s base position.

Limits:

- Max points: **16** (extra points are truncated).

## `GrainyFogPlugin` (`name = "grainy-fog"`)

Animated fog-like noise with two primary colors blended over a background.

Constructor:

```ts
new GrainyFogPlugin(config: GrainyFogConfig)
```

### `GrainyFogConfig`

- **`firstColor: string`**
- **`secondColor: string`**
- **`backgroundColor: string`**
- **`grainAmount?: number`**: default `0.12`.
- **`speed?: number`**: default `1.0`.
- **`scale?: number`**: noise scale. Default `2.25`.
- **`octaves?: number`**: `1..6`. Default `4`.
- **`lacunarity?: number`**: default `2.0`.
- **`gain?: number`**: default `0.5`.
- **`contrast?: number`**: default `1.25`.

## `RetroGridPlugin` (`name = "retro-grid"`)

Retro-futuristic perspective floor grid.

Constructor:

```ts
new RetroGridPlugin(config: RetroGridConfig)
```

### `RetroGridConfig`

- **`gridColor: string`**
- **`backgroundColor: string`**
- **`speed?: number`**: default `1.0`.

## `LiquidOrbPlugin` (`name = "liquid-orb"`)

Metaball-like “goo” blobs simulated on the CPU and rendered as an SDF in the shader.

Constructor:

```ts
new LiquidOrbPlugin(config: LiquidOrbConfig)
```

### `LiquidOrbConfig`

- **`color: string`**
- **`backgroundColor: string`**
- **`count?: number`**: number of blobs. Default `5`. Max `20`.
- **`speed?: number`**: motion speed multiplier. Default `0.5`.
- **`gooeyness?: number`**: smooth-min blending factor. Default `0.3`.
- **`edgeSoftness?: number`**: edge softness / AA amount. Default `0.02`.

## `CausticsPlugin` (`name = "caustics"`)

Stylized light-caustics pattern with controllable sharpness and distortion.

Constructor:

```ts
new CausticsPlugin(config: CausticsConfig)
```

### `CausticsConfig`

- **`color: string`**: caustics light color.
- **`backgroundColor: string`**
- **`intensity?: number`**: brightness multiplier. Default `1.0`.
- **`speed?: number`**: default `0.5`.
- **`scale?: number`**: default `2.2`.
- **`distortion?: number`**: `0..2`. Default `0.9`.
- **`sharpness?: number`**: `0.5..6` typical. Default `3.2`.
- **`antiAlias?: number`**: `0..2`. Default `1.0` (higher = smoother).

## `AuroraWavesPlugin` (`name = "aurora-waves"`)

Soft aurora ribbons over a dark background.

Constructor:

```ts
new AuroraWavesPlugin(config: AuroraWavesConfig)
```

### `AuroraWavesConfig`

- **`backgroundColor: string`**
- **`color1: string`**
- **`color2: string`**
- **`intensity?: number`**: default `0.9`.
- **`speed?: number`**: default `0.6`.
- **`scale?: number`**: default `1.6`.
- **`grainAmount?: number`**: default `0.05`.

## `SoftStarfieldPlugin` (`name = "soft-starfield"`)

Starfield with background gradient and a subtle nebula layer.

Constructor:

```ts
new SoftStarfieldPlugin(config: SoftStarfieldConfig)
```

### `SoftStarfieldConfig`

- **`backgroundBottom: string`**
- **`backgroundTop: string`**
- **`starColor?: string`**: default `#ffffff`.
- **`density?: number`**: star density multiplier. Default `1.0`.
- **`size?: number`**: star size multiplier. Default `1.0`.
- **`twinkle?: number`**: default `0.35`.
- **`nebulaColor?: string`**: default `#6a5cff`.
- **`nebula?: number`**: nebula strength. Default `0.35`.
- **`speed?: number`**: default `0.2`.
- **`grainAmount?: number`**: default `0.04`.

## `ContourLinesPlugin` (`name = "contour-lines"`)

Topographic contour lines with controllable density, glow, and warp.

Constructor:

```ts
new ContourLinesPlugin(config: ContourLinesConfig)
```

### `ContourLinesConfig`

- **`backgroundColor: string`**
- **`lineColor: string`**
- **`accentColor?: string`**: default is derived from `lineColor`.
- **`density?: number`**: default `12`.
- **`thickness?: number`**: default `0.075`.
- **`warp?: number`**: default `0.9`.
- **`speed?: number`**: default `0.35`.
- **`glow?: number`**: default `0.35`.
- **`grainAmount?: number`**: default `0.04`.

## `DreamyBokehPlugin` (`name = "dreamy-bokeh"`)

Soft bokeh highlights over a gradient. Designed to stay low-distraction as a background.

Constructor:

```ts
new DreamyBokehPlugin(config: DreamyBokehConfig)
```

### `DreamyBokehConfig`

- **`backgroundBottom: string`**
- **`backgroundTop: string`**
- **`colorA?: string`**: default `#ffd1f3`.
- **`colorB?: string`**: default `#8be9ff`.
- **`colorC?: string`**: default `#b7ff9b`.
- **`density?: number`**: `0..3`. Default `1.0`.
- **`size?: number`**: `0.5..2` typical. Default `1.0`.
- **`blur?: number`**: `0.5..2.5` typical. Default `1.0`.
- **`speed?: number`**: default `0.25`.
- **`vignette?: number`**: `0..1`. Default `0.35`.
- **`grainAmount?: number`**: default `0.03`.

## `InkWashPlugin` (`name = "ink-wash"`)

Animated ink diffusion on paper with optional granulation and vignette.

Constructor:

```ts
new InkWashPlugin(config: InkWashConfig)
```

### `InkWashConfig`

- **`paperColor: string`**
- **`inkColor: string`**
- **`scale?: number`**: default `1.4`.
- **`speed?: number`**: default `0.18`.
- **`flow?: number`**: default `0.85`.
- **`contrast?: number`**: default `1.15`.
- **`granulation?: number`**: default `0.35`.
- **`vignette?: number`**: `0..1`. Default `0.35`.
- **`grainAmount?: number`**: default `0.03`.

## `StainedGlassPlugin` (`name = "stained-glass"`)

Voronoi mosaic “stained glass” pattern with lead lines, edge glow, and layout variation controls.

Constructor:

```ts
new StainedGlassPlugin(config: StainedGlassConfig)
```

### `StainedGlassConfig`

- **`backgroundColor: string`**
- **`leadColor?: string`**: default `#0b0b10`.
- **`colorA?: string`**: default `#38bdf8`.
- **`colorB?: string`**: default `#a78bfa`.
- **`colorC?: string`**: default `#fb7185`.
- **`colorD?: string`**: default `#fbbf24`.
- **`scale?: number`**: cell scale. Default `3.2`.
- **`variant?: 0 | 1 | 2`**: default `0`.
  - `0`: classic
  - `1`: crystal (anisotropic)
  - `2`: radial-ish twist
- **`seed?: number`**: default `0` (change to get a new layout).
- **`jitter?: number`**: `0..1`. Default `1.0` (regular -> random).
- **`rotation?: number`**: radians. Default `0`.
- **`edgeWidth?: number`**: lead line thickness. Default `0.08`.
- **`edgeSharpness?: number`**: higher = crisper lines. Default `1.25`.
- **`edgeGlow?: number`**: default `0.45`.
- **`distortion?: number`**: default `0.55`.
- **`speed?: number`**: default `0.12`.
- **`grainAmount?: number`**: default `0.02`.


