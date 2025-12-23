import { GradientPlugin } from './src/lib/plugins/GradientPlugin';
import { GrainyFogPlugin } from './src/lib/plugins/GrainyFogPlugin';
import { RetroGridPlugin } from './src/lib/plugins/RetroGridPlugin';
import { LiquidOrbPlugin } from './src/lib/plugins/LiquidOrbPlugin';
import { CausticsPlugin } from './src/lib/plugins/CausticsPlugin';
import { AuroraWavesPlugin } from './src/lib/plugins/AuroraWavesPlugin';
import { SoftStarfieldPlugin } from './src/lib/plugins/SoftStarfieldPlugin';
import { ContourLinesPlugin } from './src/lib/plugins/ContourLinesPlugin';
import { DreamyBokehPlugin } from './src/lib/plugins/DreamyBokehPlugin';
import { InkWashPlugin } from './src/lib/plugins/InkWashPlugin';
import { StainedGlassPlugin } from './src/lib/plugins/StainedGlassPlugin';

const el = document.getElementById('bg');
const pluginSelect = document.getElementById('pluginSelect');
const filterPreset = document.getElementById('filterPreset');
const filterInput = document.getElementById('filterInput');
const pluginParamsEl = document.getElementById('pluginParams');
const overlayToggleBtn = document.getElementById('overlayToggle');
const overlayEl = overlayToggleBtn?.closest?.('.overlay');

const gradientConfig1 = [
  { x: -0.5, y: -0.5, colors: ['#ff0000', '#ffaa00'], speed: 0.5 },
  { x: 0.5, y: 0.5, colors: ['#0000ff', '#00aaff'], speed: 1.0 },
  { x: 0.0, y: 0.0, colors: ['#00ff00', '#ccffcc'], speed: 2.0 },
];

const randomHex = () => {
  const n = Math.floor(Math.random() * 0xffffff);
  return `#${n.toString(16).padStart(6, '0')}`;
};

// --- Canvas CSS (from outside the web component) ---
// The internal <canvas> is exposed as a shadow part: `::part(canvas)`.
// You can style it via regular CSS like:
//   #bg::part(canvas) { filter: blur(8px) saturate(1.2); }
const canvasStyleEl = document.createElement('style');
canvasStyleEl.id = 'canvasPartStyle';
document.head.appendChild(canvasStyleEl);

function setCanvasCss({ filter = 'none', transition = '180ms ease' } = {}) {
  const safeFilter = (filter ?? '').trim() === '' ? 'none' : filter;
  const safeTransition = (transition ?? '').trim();
  const transitionCss =
    safeTransition === ''
      ? ''
      : `transition: filter ${safeTransition}, -webkit-filter ${safeTransition};`;

  canvasStyleEl.textContent = `
    #bg::part(canvas) {
      filter: ${safeFilter};
      -webkit-filter: ${safeFilter};
      ${transitionCss}
    }
  `;
}

// --- Dynamic plugin parameters form ---
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

function buildDefaults(schema) {
  const cfg = {};
  for (const f of schema.fields) {
    cfg[f.key] = typeof f.default === 'function' ? f.default() : f.default;
  }
  return cfg;
}

function renderParamsForm(schema, cfg, onChange) {
  if (!pluginParamsEl) return;
  pluginParamsEl.innerHTML = '';

  const row = document.createElement('div');
  row.className = 'row';
  pluginParamsEl.appendChild(row);

  const setVal = (k, v) => {
    cfg[k] = v;
    onChange();
  };

  for (const field of schema.fields) {
    const wrap = document.createElement('label');
    wrap.className = 'field';

    const label = document.createElement('span');
    label.textContent = field.label;
    wrap.appendChild(label);

    let input;
    if (field.type === 'select') {
      input = document.createElement('select');
      for (const opt of field.options) {
        const o = document.createElement('option');
        o.value = opt.value;
        o.textContent = opt.label;
        input.appendChild(o);
      }
      input.value = String(cfg[field.key] ?? field.default ?? '');
      input.addEventListener('change', () => setVal(field.key, input.value));
    } else if (field.type === 'boolean') {
      input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = Boolean(cfg[field.key]);
      input.addEventListener('change', () => setVal(field.key, input.checked));
    } else {
      input = document.createElement('input');
      input.type = field.type === 'color' ? 'color' : field.type === 'text' ? 'text' : 'number';

      if (field.type === 'number') {
        if (field.min != null) input.min = String(field.min);
        if (field.max != null) input.max = String(field.max);
        if (field.step != null) input.step = String(field.step);
        input.value = String(cfg[field.key] ?? field.default ?? '');
      } else {
        input.value = String(cfg[field.key] ?? field.default ?? '');
      }

      const commit = () => {
        if (field.type === 'number') {
          const v = Number(input.value);
          if (!Number.isNaN(v)) {
            setVal(field.key, clamp(v, field.min ?? -Infinity, field.max ?? Infinity));
          }
        } else {
          setVal(field.key, input.value);
        }
      };

      input.addEventListener('input', commit);
      input.addEventListener('change', commit);
    }

    wrap.appendChild(input);
    row.appendChild(wrap);
  }
}

const PLUGIN_SCHEMAS = {
  gradient: {
    // Special-cased in the demo (points editor UI)
    fields: [],
  },
  'grainy-fog': {
    fields: [
      { key: 'firstColor', label: 'Color 1', type: 'color', default: () => randomHex() },
      { key: 'secondColor', label: 'Color 2', type: 'color', default: () => randomHex() },
      { key: 'backgroundColor', label: 'Background', type: 'color', default: '#05070b' },
      { key: 'speed', label: 'Speed', type: 'number', min: 0, max: 3, step: 0.05, default: 0.8 },
      { key: 'scale', label: 'Scale', type: 'number', min: 0.5, max: 5, step: 0.05, default: 2.25 },
      { key: 'octaves', label: 'Octaves', type: 'number', min: 1, max: 6, step: 1, default: 4 },
      { key: 'contrast', label: 'Contrast', type: 'number', min: 0.5, max: 2.5, step: 0.05, default: 1.25 },
      { key: 'grainAmount', label: 'Grain', type: 'number', min: 0, max: 0.25, step: 0.01, default: 0.15 },
    ],
  },
  'retro-grid': {
    fields: [
      { key: 'gridColor', label: 'Grid', type: 'color', default: '#ff4fd8' },
      { key: 'backgroundColor', label: 'Background', type: 'color', default: '#050212' },
      { key: 'speed', label: 'Speed', type: 'number', min: 0, max: 4, step: 0.05, default: 1.2 },
    ],
  },
  'liquid-orb': {
    fields: [
      { key: 'color', label: 'Blob', type: 'color', default: () => randomHex() },
      { key: 'backgroundColor', label: 'Background', type: 'color', default: '#0b0f18' },
      { key: 'count', label: 'Count', type: 'number', min: 1, max: 20, step: 1, default: 6 },
      { key: 'speed', label: 'Speed', type: 'number', min: 0, max: 2, step: 0.05, default: 0.7 },
      { key: 'gooeyness', label: 'Gooeyness', type: 'number', min: 0.05, max: 0.8, step: 0.01, default: 0.3 },
      { key: 'edgeSoftness', label: 'Edge Softness', type: 'number', min: 0.001, max: 0.08, step: 0.001, default: 0.02 },
    ],
  },
  caustics: {
    fields: [
      { key: 'color', label: 'Light', type: 'color', default: '#b9fff7' },
      { key: 'backgroundColor', label: 'Background', type: 'color', default: '#031028' },
      { key: 'intensity', label: 'Intensity', type: 'number', min: 0, max: 2, step: 0.05, default: 1.0 },
      { key: 'speed', label: 'Speed', type: 'number', min: 0, max: 2, step: 0.05, default: 0.6 },
      { key: 'scale', label: 'Scale', type: 'number', min: 0.5, max: 5, step: 0.05, default: 2.2 },
      { key: 'distortion', label: 'Distortion', type: 'number', min: 0, max: 2, step: 0.05, default: 0.9 },
      { key: 'sharpness', label: 'Sharpness', type: 'number', min: 0.5, max: 6, step: 0.05, default: 3.2 },
      { key: 'antiAlias', label: 'Anti-alias', type: 'number', min: 0, max: 2, step: 0.05, default: 1.0 },
    ],
  },
  'aurora-waves': {
    fields: [
      { key: 'backgroundColor', label: 'Background', type: 'color', default: '#050611' },
      { key: 'color1', label: 'Color 1', type: 'color', default: '#21f6c7' },
      { key: 'color2', label: 'Color 2', type: 'color', default: '#5a66ff' },
      { key: 'intensity', label: 'Intensity', type: 'number', min: 0, max: 2, step: 0.05, default: 0.95 },
      { key: 'speed', label: 'Speed', type: 'number', min: 0, max: 2, step: 0.05, default: 0.55 },
      { key: 'scale', label: 'Scale', type: 'number', min: 0.5, max: 4, step: 0.05, default: 1.5 },
      { key: 'grainAmount', label: 'Grain', type: 'number', min: 0, max: 0.2, step: 0.01, default: 0.05 },
    ],
  },
  'soft-starfield': {
    fields: [
      { key: 'backgroundBottom', label: 'Bottom', type: 'color', default: '#040512' },
      { key: 'backgroundTop', label: 'Top', type: 'color', default: '#0b1630' },
      { key: 'starColor', label: 'Stars', type: 'color', default: '#ff4fd8' },
      { key: 'nebulaColor', label: 'Nebula', type: 'color', default: '#6a5cff' },
      { key: 'nebula', label: 'Nebula Amt', type: 'number', min: 0, max: 1.5, step: 0.05, default: 0.85 },
      { key: 'density', label: 'Density', type: 'number', min: 0, max: 2.5, step: 0.05, default: 0.5 },
      { key: 'size', label: 'Size', type: 'number', min: 0.5, max: 2, step: 0.05, default: 1.0 },
      { key: 'twinkle', label: 'Twinkle', type: 'number', min: 0, max: 1, step: 0.05, default: 0.35 },
      { key: 'speed', label: 'Speed', type: 'number', min: 0, max: 1, step: 0.02, default: 0.2 },
      { key: 'grainAmount', label: 'Grain', type: 'number', min: 0, max: 0.2, step: 0.01, default: 0.0 },
    ],
  },
  'contour-lines': {
    fields: [
      { key: 'backgroundColor', label: 'Background', type: 'color', default: '#060a10' },
      { key: 'lineColor', label: 'Lines', type: 'color', default: '#a9b9ff' },
      { key: 'accentColor', label: 'Accent', type: 'color', default: '#35ffd1' },
      { key: 'density', label: 'Density', type: 'number', min: 4, max: 30, step: 1, default: 12 },
      { key: 'thickness', label: 'Thickness', type: 'number', min: 0.01, max: 0.2, step: 0.005, default: 0.075 },
      { key: 'warp', label: 'Warp', type: 'number', min: 0, max: 2, step: 0.05, default: 0.9 },
      { key: 'glow', label: 'Glow', type: 'number', min: 0, max: 1.5, step: 0.05, default: 0.35 },
      { key: 'speed', label: 'Speed', type: 'number', min: 0, max: 2, step: 0.05, default: 0.35 },
      { key: 'grainAmount', label: 'Grain', type: 'number', min: 0, max: 0.2, step: 0.01, default: 0.04 },
    ],
  },
  'dreamy-bokeh': {
    fields: [
      { key: 'backgroundBottom', label: 'Bottom', type: 'color', default: '#070818' },
      { key: 'backgroundTop', label: 'Top', type: 'color', default: '#0e1734' },
      { key: 'colorA', label: 'Color A', type: 'color', default: '#ffd1f3' },
      { key: 'colorB', label: 'Color B', type: 'color', default: '#8be9ff' },
      { key: 'colorC', label: 'Color C', type: 'color', default: '#b7ff9b' },
      { key: 'density', label: 'Density', type: 'number', min: 0, max: 3, step: 0.05, default: 1.0 },
      { key: 'size', label: 'Size', type: 'number', min: 0.5, max: 2, step: 0.05, default: 1.0 },
      { key: 'blur', label: 'Blur', type: 'number', min: 0.5, max: 2.5, step: 0.05, default: 1.0 },
      { key: 'speed', label: 'Speed', type: 'number', min: 0, max: 1, step: 0.02, default: 0.25 },
      { key: 'vignette', label: 'Vignette', type: 'number', min: 0, max: 1, step: 0.05, default: 0.35 },
      { key: 'grainAmount', label: 'Grain', type: 'number', min: 0, max: 0.2, step: 0.01, default: 0.03 },
    ],
  },
  'ink-wash': {
    fields: [
      { key: 'paperColor', label: 'Paper', type: 'color', default: '#f4f1ea' },
      { key: 'inkColor', label: 'Ink', type: 'color', default: '#121521' },
      { key: 'scale', label: 'Scale', type: 'number', min: 0.5, max: 4, step: 0.05, default: 1.4 },
      { key: 'flow', label: 'Flow', type: 'number', min: 0, max: 1.5, step: 0.05, default: 0.85 },
      { key: 'contrast', label: 'Contrast', type: 'number', min: 0.5, max: 2.5, step: 0.05, default: 1.15 },
      { key: 'granulation', label: 'Granulation', type: 'number', min: 0, max: 1.2, step: 0.05, default: 0.35 },
      { key: 'speed', label: 'Speed', type: 'number', min: 0, max: 1, step: 0.02, default: 0.18 },
      { key: 'vignette', label: 'Vignette', type: 'number', min: 0, max: 1, step: 0.05, default: 0.35 },
      { key: 'grainAmount', label: 'Grain', type: 'number', min: 0, max: 0.2, step: 0.01, default: 0.03 },
    ],
  },
  'stained-glass': {
    fields: [
      { key: 'backgroundColor', label: 'Background', type: 'color', default: '#05070b' },
      { key: 'leadColor', label: 'Lead', type: 'color', default: '#0b0b10' },
      { key: 'colorA', label: 'Color A', type: 'color', default: '#38bdf8' },
      { key: 'colorB', label: 'Color B', type: 'color', default: '#a78bfa' },
      { key: 'colorC', label: 'Color C', type: 'color', default: '#fb7185' },
      { key: 'colorD', label: 'Color D', type: 'color', default: '#fbbf24' },
      { key: 'scale', label: 'Scale', type: 'number', min: 1, max: 8, step: 0.1, default: 3.2 },
      { key: 'variant', label: 'Variant (0..2)', type: 'number', min: 0, max: 2, step: 1, default: 0 },
      { key: 'seed', label: 'Seed', type: 'number', min: 0, max: 9999, step: 1, default: 0 },
      { key: 'jitter', label: 'Jitter', type: 'number', min: 0, max: 1, step: 0.02, default: 1.0 },
      { key: 'rotation', label: 'Rotation', type: 'number', min: 0, max: 6.283, step: 0.05, default: 0.0 },
      { key: 'edgeWidth', label: 'Edge Width', type: 'number', min: 0.01, max: 0.25, step: 0.01, default: 0.08 },
      { key: 'edgeSharpness', label: 'Edge Sharpness', type: 'number', min: 0.25, max: 3.0, step: 0.05, default: 1.25 },
      { key: 'edgeGlow', label: 'Edge Glow', type: 'number', min: 0, max: 1.5, step: 0.05, default: 0.45 },
      { key: 'distortion', label: 'Distortion', type: 'number', min: 0, max: 1.5, step: 0.05, default: 0.55 },
      { key: 'speed', label: 'Speed', type: 'number', min: 0, max: 1, step: 0.02, default: 0.12 },
      { key: 'grainAmount', label: 'Grain', type: 'number', min: 0, max: 0.2, step: 0.01, default: 0.02 },
    ],
  },
};

let currentConfig = {};
let updateQueued = false;

function queuePluginUpdate() {
  if (updateQueued) return;
  updateQueued = true;
  requestAnimationFrame(() => {
    updateQueued = false;
    setPlugin(currentKind());
  });
}

function schemaFor(kind) {
  return PLUGIN_SCHEMAS[kind] || PLUGIN_SCHEMAS.gradient;
}

function buildDefaultsForKind(kind) {
  if (kind === 'gradient') {
    return {
      points: gradientConfig1.map((p) => ({
        x: p.x,
        y: p.y,
        colors: [...p.colors],
        speed: p.speed ?? 1.0,
        motion: {
          mode: 'none',
          easing: 'smoothstep',
          duration: 3.0,
          path: [],
          bounds: { minX: -1, maxX: 1, minY: -1, maxY: 1 },
          randomRadius: 0,
        },
      })),
      selectedPoint: 0,
      clickToPlace: true,
    };
  }
  return buildDefaults(schemaFor(kind));
}

function renderGradientEditor(cfg) {
  if (!pluginParamsEl) return;
  pluginParamsEl.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'row';

  const controls = document.createElement('div');
  controls.className = 'field';
  const title = document.createElement('span');
  title.textContent = 'Points';
  controls.appendChild(title);

  const pointSelect = document.createElement('select');
  const points = cfg.points || [];
  points.forEach((p, idx) => {
    const o = document.createElement('option');
    o.value = String(idx);
    o.textContent = `Point ${idx + 1}`;
    pointSelect.appendChild(o);
  });
  pointSelect.value = String(cfg.selectedPoint ?? 0);
  pointSelect.addEventListener('change', () => {
    cfg.selectedPoint = Number(pointSelect.value) || 0;
    renderGradientEditor(cfg);
  });
  controls.appendChild(pointSelect);

  const actions = document.createElement('div');
  actions.className = 'field';
  const actionLabel = document.createElement('span');
  actionLabel.textContent = 'Actions';
  actions.appendChild(actionLabel);

  const addBtn = document.createElement('button');
  addBtn.textContent = 'Add Point';
  addBtn.onclick = () => {
    if (cfg.points.length >= 16) return;
    cfg.points.push({
      x: 0,
      y: 0,
      colors: [randomHex(), randomHex()],
      speed: 1.0,
      motion: {
        mode: 'none',
        easing: 'smoothstep',
        duration: 3.0,
        path: [],
        bounds: { minX: -1, maxX: 1, minY: -1, maxY: 1 },
        randomRadius: 0,
      },
    });
    cfg.selectedPoint = cfg.points.length - 1;
    queuePluginUpdate();
    renderGradientEditor(cfg);
  };

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove Point';
  removeBtn.onclick = () => {
    if (cfg.points.length <= 1) return;
    const idx = clamp(cfg.selectedPoint ?? 0, 0, cfg.points.length - 1);
    cfg.points.splice(idx, 1);
    cfg.selectedPoint = clamp(idx, 0, cfg.points.length - 1);
    queuePluginUpdate();
    renderGradientEditor(cfg);
  };

  const clickWrap = document.createElement('label');
  clickWrap.className = 'field';
  const clickText = document.createElement('span');
  clickText.textContent = 'Click-to-place';
  const clickToggle = document.createElement('input');
  clickToggle.type = 'checkbox';
  clickToggle.checked = Boolean(cfg.clickToPlace);
  clickToggle.onchange = () => {
    cfg.clickToPlace = clickToggle.checked;
  };
  clickWrap.appendChild(clickText);
  clickWrap.appendChild(clickToggle);

  actions.appendChild(addBtn);
  actions.appendChild(removeBtn);
  actions.appendChild(clickWrap);

  header.appendChild(controls);
  header.appendChild(actions);
  pluginParamsEl.appendChild(header);

  const idx = clamp(cfg.selectedPoint ?? 0, 0, cfg.points.length - 1);
  const p = cfg.points[idx];
  if (!p) return;

  const fieldsRow = document.createElement('div');
  fieldsRow.className = 'row';

  const makeNumberField = ({ label, value, min, max, step, onInput }) => {
    const wrap = document.createElement('label');
    wrap.className = 'field';
    const l = document.createElement('span');
    l.textContent = label;
    wrap.appendChild(l);

    const input = document.createElement('input');
    input.type = 'number';
    input.min = String(min);
    input.max = String(max);
    input.step = String(step);
    input.value = String(value);
    input.addEventListener('input', () => {
      const v = Number(input.value);
      if (Number.isNaN(v)) return;
      onInput(clamp(v, min, max));
      queuePluginUpdate();
    });
    wrap.appendChild(input);
    return wrap;
  };

  fieldsRow.appendChild(
    makeNumberField({
      label: 'X (-1..1)',
      value: p.x,
      min: -1,
      max: 1,
      step: 0.01,
      onInput: (v) => (p.x = v),
    })
  );
  fieldsRow.appendChild(
    makeNumberField({
      label: 'Y (-1..1)',
      value: p.y,
      min: -1,
      max: 1,
      step: 0.01,
      onInput: (v) => (p.y = v),
    })
  );
  fieldsRow.appendChild(
    makeNumberField({
      label: 'Speed',
      value: p.speed ?? 1.0,
      min: 0,
      max: 5,
      step: 0.05,
      onInput: (v) => (p.speed = v),
    })
  );

  // Motion controls
  const motion = (p.motion = p.motion || {
    mode: 'none',
    easing: 'smoothstep',
    duration: 3.0,
    path: [],
    bounds: { minX: -1, maxX: 1, minY: -1, maxY: 1 },
    randomRadius: 0,
  });

  const motionRow = document.createElement('div');
  motionRow.className = 'row';

  const modeWrap = document.createElement('label');
  modeWrap.className = 'field';
  const modeLabel = document.createElement('span');
  modeLabel.textContent = 'Motion Mode';
  modeWrap.appendChild(modeLabel);
  const modeSelect = document.createElement('select');
  for (const v of ['none', 'path', 'random']) {
    const o = document.createElement('option');
    o.value = v;
    o.textContent = v;
    modeSelect.appendChild(o);
  }
  modeSelect.value = motion.mode || 'none';
  modeSelect.onchange = () => {
    motion.mode = modeSelect.value;
    queuePluginUpdate();
    renderGradientEditor(cfg);
  };
  modeWrap.appendChild(modeSelect);

  const easeWrap = document.createElement('label');
  easeWrap.className = 'field';
  const easeLabel = document.createElement('span');
  easeLabel.textContent = 'Easing';
  easeWrap.appendChild(easeLabel);
  const easeSelect = document.createElement('select');
  for (const v of ['smoothstep', 'linear', 'easeInOutQuad', 'easeInOutCubic']) {
    const o = document.createElement('option');
    o.value = v;
    o.textContent = v;
    easeSelect.appendChild(o);
  }
  easeSelect.value = motion.easing || 'smoothstep';
  easeSelect.onchange = () => {
    motion.easing = easeSelect.value;
    queuePluginUpdate();
  };
  easeWrap.appendChild(easeSelect);

  const durWrap = document.createElement('label');
  durWrap.className = 'field';
  const durLabel = document.createElement('span');
  durLabel.textContent = 'Duration (s)';
  durWrap.appendChild(durLabel);
  const durInput = document.createElement('input');
  durInput.type = 'number';
  durInput.min = '0.1';
  durInput.max = '30';
  durInput.step = '0.1';
  durInput.value = String(motion.duration ?? 3.0);
  durInput.addEventListener('input', () => {
    const v = Number(durInput.value);
    if (Number.isNaN(v)) return;
    motion.duration = clamp(v, 0.1, 30);
    queuePluginUpdate();
  });
  durWrap.appendChild(durInput);

  motionRow.appendChild(modeWrap);
  motionRow.appendChild(easeWrap);
  motionRow.appendChild(durWrap);

  // placeholder cell (keeps the grid feel consistent)
  const motionHint = document.createElement('div');
  motionHint.className = 'field';
  const motionHintLabel = document.createElement('span');
  motionHintLabel.textContent = 'Motion';
  const motionHintText = document.createElement('div');
  motionHintText.style.fontSize = '12px';
  motionHintText.style.opacity = '0.8';
  motionHintText.textContent =
    motion.mode === 'path'
      ? 'Use waypoints below to move between positions.'
      : motion.mode === 'random'
        ? 'Moves to random targets within bounds.'
        : 'Static (no motion).';
  motionHint.appendChild(motionHintLabel);
  motionHint.appendChild(motionHintText);
  motionRow.appendChild(motionHint);

  pluginParamsEl.appendChild(motionRow);

  if (motion.mode === 'path') {
    motion.path = motion.path || [];

    const pathWrap = document.createElement('div');
    pathWrap.className = 'field';
    const pathLabel = document.createElement('span');
    pathLabel.textContent = 'Waypoints';
    pathWrap.appendChild(pathLabel);

    const list = document.createElement('div');
    list.style.display = 'flex';
    list.style.flexDirection = 'column';
    list.style.gap = '8px';

    motion.path.forEach((wp, wIdx) => {
      const line = document.createElement('div');
      line.style.display = 'grid';
      line.style.gridTemplateColumns = '1fr 1fr auto';
      line.style.gap = '8px';
      line.style.alignItems = 'center';

      const xIn = document.createElement('input');
      xIn.type = 'number';
      xIn.min = '-1';
      xIn.max = '1';
      xIn.step = '0.01';
      xIn.value = String(wp.x);
      xIn.addEventListener('input', () => {
        const v = Number(xIn.value);
        if (Number.isNaN(v)) return;
        wp.x = clamp(v, -1, 1);
        queuePluginUpdate();
      });

      const yIn = document.createElement('input');
      yIn.type = 'number';
      yIn.min = '-1';
      yIn.max = '1';
      yIn.step = '0.01';
      yIn.value = String(wp.y);
      yIn.addEventListener('input', () => {
        const v = Number(yIn.value);
        if (Number.isNaN(v)) return;
        wp.y = clamp(v, -1, 1);
        queuePluginUpdate();
      });

      const rm = document.createElement('button');
      rm.textContent = 'Remove';
      rm.onclick = () => {
        motion.path.splice(wIdx, 1);
        queuePluginUpdate();
        renderGradientEditor(cfg);
      };

      line.appendChild(xIn);
      line.appendChild(yIn);
      line.appendChild(rm);
      list.appendChild(line);
    });

    const btnRow = document.createElement('div');
    btnRow.style.display = 'flex';
    btnRow.style.gap = '8px';

    const addWp = document.createElement('button');
    addWp.textContent = 'Add Waypoint';
    addWp.onclick = () => {
      motion.path.push({ x: 0, y: 0 });
      queuePluginUpdate();
      renderGradientEditor(cfg);
    };

    const addCurrent = document.createElement('button');
    addCurrent.textContent = 'Add Current';
    addCurrent.onclick = () => {
      motion.path.push({ x: p.x, y: p.y });
      queuePluginUpdate();
      renderGradientEditor(cfg);
    };

    btnRow.appendChild(addWp);
    btnRow.appendChild(addCurrent);

    pathWrap.appendChild(list);
    pathWrap.appendChild(btnRow);
    pluginParamsEl.appendChild(pathWrap);
  }

  if (motion.mode === 'random') {
    motion.bounds = motion.bounds || { minX: -1, maxX: 1, minY: -1, maxY: 1 };

    const randWrap = document.createElement('div');
    randWrap.className = 'field';
    const randLabel = document.createElement('span');
    randLabel.textContent = 'Random Settings';
    randWrap.appendChild(randLabel);

    const randRow = document.createElement('div');
    randRow.className = 'row';

    const mk = (label, value, min, max, step, onSet) =>
      makeNumberField({
        label,
        value,
        min,
        max,
        step,
        onInput: (v) => {
          onSet(v);
          queuePluginUpdate();
        },
      });

    randRow.appendChild(
      mk('minX', motion.bounds.minX ?? -1, -1, 1, 0.01, (v) => (motion.bounds.minX = v))
    );
    randRow.appendChild(
      mk('maxX', motion.bounds.maxX ?? 1, -1, 1, 0.01, (v) => (motion.bounds.maxX = v))
    );
    randRow.appendChild(
      mk('minY', motion.bounds.minY ?? -1, -1, 1, 0.01, (v) => (motion.bounds.minY = v))
    );
    randRow.appendChild(
      mk('maxY', motion.bounds.maxY ?? 1, -1, 1, 0.01, (v) => (motion.bounds.maxY = v))
    );

    const radiusRow = document.createElement('div');
    radiusRow.className = 'row';
    radiusRow.appendChild(
      mk(
        'Radius (0=full)',
        motion.randomRadius ?? 0,
        0,
        2,
        0.01,
        (v) => (motion.randomRadius = v)
      )
    );

    randWrap.appendChild(randRow);
    randWrap.appendChild(radiusRow);
    pluginParamsEl.appendChild(randWrap);
  }

  // Spacer to keep grid aligned
  const hint = document.createElement('div');
  hint.className = 'field';
  const hintLabel = document.createElement('span');
  hintLabel.textContent = 'Hint';
  const hintText = document.createElement('div');
  hintText.style.fontSize = '12px';
  hintText.style.opacity = '0.8';
  hintText.textContent = cfg.clickToPlace
    ? 'Click on the background to move the selected point.'
    : 'Enable click-to-place to position points by clicking the background.';
  hint.appendChild(hintLabel);
  hint.appendChild(hintText);
  fieldsRow.appendChild(hint);

  pluginParamsEl.appendChild(fieldsRow);

  // Colors list
  const colorsWrap = document.createElement('div');
  colorsWrap.className = 'field';
  const colorsLabel = document.createElement('span');
  colorsLabel.textContent = 'Colors';
  colorsWrap.appendChild(colorsLabel);

  const list = document.createElement('div');
  list.style.display = 'flex';
  list.style.flexDirection = 'column';
  list.style.gap = '8px';

  p.colors = p.colors || [randomHex()];
  p.colors.forEach((c, cIdx) => {
    const line = document.createElement('div');
    line.style.display = 'flex';
    line.style.gap = '8px';
    line.style.alignItems = 'center';

    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = c;
    colorInput.addEventListener('input', () => {
      p.colors[cIdx] = colorInput.value;
      queuePluginUpdate();
    });

    const removeColor = document.createElement('button');
    removeColor.textContent = 'Remove';
    removeColor.onclick = () => {
      if (p.colors.length <= 1) return;
      p.colors.splice(cIdx, 1);
      queuePluginUpdate();
      renderGradientEditor(cfg);
    };

    line.appendChild(colorInput);
    line.appendChild(removeColor);
    list.appendChild(line);
  });

  const addColor = document.createElement('button');
  addColor.textContent = 'Add Color';
  addColor.onclick = () => {
    p.colors.push(randomHex());
    queuePluginUpdate();
    renderGradientEditor(cfg);
  };

  colorsWrap.appendChild(list);
  colorsWrap.appendChild(addColor);
  pluginParamsEl.appendChild(colorsWrap);
}

function renderParamsForKind(kind, cfg) {
  if (kind === 'gradient') {
    renderGradientEditor(cfg);
    return;
  }
  renderParamsForm(schemaFor(kind), cfg, queuePluginUpdate);
}

function makePlugin(kind) {
  switch (kind) {
    case 'gradient':
      return new GradientPlugin(currentConfig.points);

    case 'grainy-fog':
      return new GrainyFogPlugin({
        firstColor: currentConfig.firstColor,
        secondColor: currentConfig.secondColor,
        backgroundColor: currentConfig.backgroundColor,
        grainAmount: currentConfig.grainAmount,
        speed: currentConfig.speed,
        scale: currentConfig.scale,
        octaves: currentConfig.octaves,
        contrast: currentConfig.contrast,
      });

    case 'retro-grid':
      return new RetroGridPlugin({
        gridColor: currentConfig.gridColor,
        backgroundColor: currentConfig.backgroundColor,
        speed: currentConfig.speed,
      });

    case 'liquid-orb':
      return new LiquidOrbPlugin({
        color: currentConfig.color,
        backgroundColor: currentConfig.backgroundColor,
        count: currentConfig.count,
        speed: currentConfig.speed,
        gooeyness: currentConfig.gooeyness,
        edgeSoftness: currentConfig.edgeSoftness,
      });

    case 'caustics':
      return new CausticsPlugin({
        color: currentConfig.color,
        backgroundColor: currentConfig.backgroundColor,
        intensity: currentConfig.intensity,
        speed: currentConfig.speed,
        scale: currentConfig.scale,
        distortion: currentConfig.distortion,
        sharpness: currentConfig.sharpness,
        antiAlias: currentConfig.antiAlias,
      });

    case 'aurora-waves':
      return new AuroraWavesPlugin({
        backgroundColor: currentConfig.backgroundColor,
        color1: currentConfig.color1,
        color2: currentConfig.color2,
        intensity: currentConfig.intensity,
        speed: currentConfig.speed,
        scale: currentConfig.scale,
        grainAmount: currentConfig.grainAmount,
      });

    case 'soft-starfield':
      return new SoftStarfieldPlugin({
        backgroundBottom: currentConfig.backgroundBottom,
        backgroundTop: currentConfig.backgroundTop,
        starColor: currentConfig.starColor,
        nebulaColor: currentConfig.nebulaColor,
        nebula: currentConfig.nebula,
        density: currentConfig.density,
        size: currentConfig.size,
        twinkle: currentConfig.twinkle,
        speed: currentConfig.speed,
        grainAmount: currentConfig.grainAmount,
      });

    case 'contour-lines':
      return new ContourLinesPlugin({
        backgroundColor: currentConfig.backgroundColor,
        lineColor: currentConfig.lineColor,
        accentColor: currentConfig.accentColor,
        density: currentConfig.density,
        thickness: currentConfig.thickness,
        warp: currentConfig.warp,
        glow: currentConfig.glow,
        speed: currentConfig.speed,
        grainAmount: currentConfig.grainAmount,
      });

    case 'dreamy-bokeh':
      return new DreamyBokehPlugin({
        backgroundBottom: currentConfig.backgroundBottom,
        backgroundTop: currentConfig.backgroundTop,
        colorA: currentConfig.colorA,
        colorB: currentConfig.colorB,
        colorC: currentConfig.colorC,
        density: currentConfig.density,
        size: currentConfig.size,
        blur: currentConfig.blur,
        speed: currentConfig.speed,
        vignette: currentConfig.vignette,
        grainAmount: currentConfig.grainAmount,
      });

    case 'ink-wash':
      return new InkWashPlugin({
        paperColor: currentConfig.paperColor,
        inkColor: currentConfig.inkColor,
        scale: currentConfig.scale,
        speed: currentConfig.speed,
        flow: currentConfig.flow,
        contrast: currentConfig.contrast,
        granulation: currentConfig.granulation,
        vignette: currentConfig.vignette,
        grainAmount: currentConfig.grainAmount,
      });

    case 'stained-glass':
      return new StainedGlassPlugin({
        backgroundColor: currentConfig.backgroundColor,
        leadColor: currentConfig.leadColor,
        colorA: currentConfig.colorA,
        colorB: currentConfig.colorB,
        colorC: currentConfig.colorC,
        colorD: currentConfig.colorD,
        scale: currentConfig.scale,
        variant: currentConfig.variant,
        seed: currentConfig.seed,
        jitter: currentConfig.jitter,
        rotation: currentConfig.rotation,
        edgeWidth: currentConfig.edgeWidth,
        edgeSharpness: currentConfig.edgeSharpness,
        edgeGlow: currentConfig.edgeGlow,
        distortion: currentConfig.distortion,
        speed: currentConfig.speed,
        grainAmount: currentConfig.grainAmount,
      });

    default:
      return new GradientPlugin(gradientConfig1);
  }
}

function currentKind() {
  return pluginSelect?.value || 'gradient';
}

function setPlugin(kind) {
  el.plugin = makePlugin(kind);
}

// Wait for the custom element to be defined before setting config
customElements.whenDefined('shader-background').then(() => {
  console.log('[index.html] shader-background element defined, setting initial plugin');
  const kind = currentKind();
  currentConfig = buildDefaultsForKind(kind);
  renderParamsForKind(kind, currentConfig);
  setPlugin(kind);

  // Initialize filter UI
  const initialFilter = filterPreset?.value || 'none';
  setCanvasCss({ filter: initialFilter, transition: '180ms ease' });
  if (filterInput) filterInput.value = initialFilter;

  // Overlay collapse state
  if (overlayEl && overlayToggleBtn) {
    const saved = localStorage.getItem('demo.overlayCollapsed');
    const collapsed = saved === '1';
    overlayEl.classList.toggle('collapsed', collapsed);
    overlayToggleBtn.textContent = collapsed ? 'Show' : 'Hide';

    overlayToggleBtn.addEventListener('click', () => {
      const next = !overlayEl.classList.contains('collapsed');
      overlayEl.classList.toggle('collapsed', next);
      overlayToggleBtn.textContent = next ? 'Show' : 'Hide';
      localStorage.setItem('demo.overlayCollapsed', next ? '1' : '0');
    });
  }
});

pluginSelect?.addEventListener('change', () => {
  const kind = currentKind();
  currentConfig = buildDefaultsForKind(kind);
  renderParamsForKind(kind, currentConfig);
  setPlugin(kind);
});

filterPreset?.addEventListener('change', () => {
  const f = filterPreset.value || 'none';
  setCanvasCss({ filter: f, transition: '180ms ease' });
  if (filterInput) filterInput.value = f;
});

window.applyFilter = () => {
  const val = (filterInput?.value ?? '').trim();
  setCanvasCss({ filter: val === '' ? 'none' : val, transition: '180ms ease' });
  if (filterPreset) filterPreset.value = 'none';
};

// Click-to-place for Gradient points (when enabled in the params UI).
el.addEventListener('pointerdown', (e) => {
  if (currentKind() !== 'gradient') return;
  if (!currentConfig?.clickToPlace) return;

  // Ignore clicks on the overlay UI (so buttons/inputs don't move points).
  if (e.target?.closest?.('.overlay')) return;

  const points = currentConfig.points;
  if (!Array.isArray(points) || points.length === 0) return;

  const idx = clamp(currentConfig.selectedPoint ?? 0, 0, points.length - 1);
  const rect = el.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  const px = (e.clientX - rect.left) / rect.width;
  const py = (e.clientY - rect.top) / rect.height;

  const x = clamp(px * 2 - 1, -1, 1);
  const y = clamp((1 - py) * 2 - 1, -1, 1);

  points[idx].x = x;
  points[idx].y = y;
  renderGradientEditor(currentConfig);
  queuePluginUpdate();
});

window.changeColors = () => {
  const kind = currentKind();
  if (kind === 'gradient') {
    // Randomize all gradient point colors.
    for (const p of currentConfig.points || []) {
      p.colors = (p.colors || []).map(() => randomHex());
      if (!p.colors.length) p.colors = [randomHex()];
    }
    renderGradientEditor(currentConfig);
    queuePluginUpdate();
    return;
  }

  // For other plugins, randomize obvious color fields (if present) and re-render.
  for (const k of Object.keys(currentConfig)) {
    if (k.toLowerCase().includes('color')) {
      currentConfig[k] = randomHex();
    }
  }
  renderParamsForKind(kind, currentConfig);
  setPlugin(kind);
};

window.toggleRenderScale = () => {
  const currentScale = el.renderScale;
  el.renderScale = currentScale === 1.0 ? 0.5 : 1.0;
  console.log(`Render scale set to: ${el.renderScale}`);
};

window.toggleSingleRender = () => {
  el.singleRender = !el.singleRender;
  const manualBtn = document.getElementById('manualRenderBtn');
  manualBtn.style.display = el.singleRender ? 'block' : 'none';
  console.log(`Single render mode: ${el.singleRender}`);
};

window.manualRender = () => {
  if (el.singleRender) {
    el.render();
    console.log('Manual render triggered');
  }
};
