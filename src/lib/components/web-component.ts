import { ShaderCanvas } from '../core/ShaderCanvas';
import { ShaderPlugin } from '../core/types';

export class ShaderBackgroundElement extends HTMLElement {
  #canvas: HTMLCanvasElement;
  #engine: ShaderCanvas | null = null;
  #observer: ResizeObserver;
  #plugin: ShaderPlugin | null = null;
  #renderScale: number = 1.0;
  #singleRender: boolean = false;
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    // Styles
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
      }
      canvas {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        /* Pixelated rendering for crisp upscaling of low-res buffers */
        image-rendering: pixelated;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
      }
      ::slotted(*) {
        position: relative;
        z-index: 1;
      }
    `;
    this.shadowRoot!.appendChild(style);

    // Canvas
    this.#canvas = document.createElement('canvas');
    // Allow styling the internal canvas from outside the shadow root:
    // e.g. `shader-background::part(canvas) { filter: blur(8px); }`
    this.#canvas.setAttribute('part', 'canvas');
    this.shadowRoot!.appendChild(this.#canvas);

    // Slot for children
    const slot = document.createElement('slot');
    this.shadowRoot!.appendChild(slot);

    // Resize Observer
    this.#observer = new ResizeObserver((entries) => {
      if (this.#engine && entries.length > 0) {
        const { width, height } = entries[0].contentRect;
        this.#engine.resize(width, height);
      }
    });
  }

  connectedCallback() {
    // Read initial attribute values
    const renderScaleAttr = this.getAttribute('render-scale');
    if (renderScaleAttr) {
      const scale = parseFloat(renderScaleAttr);
      if (!isNaN(scale)) {
        this.#renderScale = Math.max(0.1, Math.min(2.0, scale));
      }
    }

    const singleRenderAttr = this.getAttribute('single-render');
    if (singleRenderAttr) {
      this.#singleRender = singleRenderAttr === 'true' || singleRenderAttr === '';
    }

    this.#observer.observe(this);
    if (this.#plugin) {
      this.init();
    }
    // Ensure canvas is properly sized initially
    if (this.#engine) {
      const rect = this.getBoundingClientRect();
      this.#engine.resize(rect.width, rect.height);
    }
  }

  disconnectedCallback() {
    this.#observer.disconnect();
    if (this.#engine) {
      this.#engine.dispose();
      this.#engine = null;
    }
  }

  set plugin(plugin: ShaderPlugin) {
    this.#plugin = plugin;
    if (this.#engine) {
      this.#engine.stop();
      this.#engine.dispose();
      this.#engine = null;
    }
    this.init();
  }

  get plugin() {
    if (!this.#plugin) {
      throw new Error('Plugin is required');
    }
    return this.#plugin;
  }

  set renderScale(value: number) {
    this.#renderScale = Math.max(0.1, Math.min(2.0, value)); // Clamp between 0.1 and 2.0
    if (this.#engine) {
      this.#engine.stop();
      this.#engine.dispose();
      this.#engine = null;
    }
    this.init();
  }

  get renderScale() {
    return this.#renderScale;
  }

  set singleRender(value: boolean) {
    this.#singleRender = value;
    if (this.#engine) {
      this.#engine.stop();
      this.#engine.dispose();
      this.#engine = null;
    }
    this.init();
  }

  get singleRender() {
    return this.#singleRender;
  }

  public render() {
    if (this.#engine && this.#singleRender) {
      this.#engine.render();
    }
  }

  init() {
    // If we haven't received a plugin yet (common during element upgrade/attribute parsing),
    // don't throw—just defer init until `plugin` is set.
    if (!this.#plugin) return;

    // Clean up previous engine if resetting config
    if (this.#engine) {
      this.#engine.stop();
      this.#engine.dispose();
      this.#engine = null;
    }

    // Get initial dimensions from host element
    const rect = this.getBoundingClientRect();
    const width = rect.width > 0 ? rect.width : 300;
    const height = rect.height > 0 ? rect.height : 300;

    this.#engine = new ShaderCanvas(this.#canvas, this.#plugin, {
      width,
      height,
      renderScale: this.#renderScale,
      singleRender: this.#singleRender,
    });

    this.#engine.start();
  }

  static get observedAttributes() {
    return ['render-scale', 'single-render'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'render-scale': {
        const scale = parseFloat(newValue);
        if (!isNaN(scale)) {
          this.renderScale = scale;
        }
        break;
      }
      case 'single-render':
        this.singleRender = newValue === 'true' || newValue === '';
        break;
    }
  }
}

// Define the custom element
customElements.define('shader-background', ShaderBackgroundElement);
