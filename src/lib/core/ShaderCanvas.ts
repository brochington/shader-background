import { Renderer, Program, Mesh, Triangle, Vec2, OGLRenderingContext } from 'ogl';
import { ShaderPlugin } from './types';

export class ShaderCanvas {
  public gl: OGLRenderingContext;
  #renderer: Renderer;
  #mesh!: Mesh;
  #program!: Program;
  #plugin: ShaderPlugin;

  #animationId: number | null = null;
  #lastTime: number = 0;
  #totalTime: number = 0;
  #isPlaying: boolean = false;

  #renderScale: number;
  #singleRender: boolean;
  #displayWidth: number;
  #displayHeight: number;
  #pendingResize: { renderWidth: number; renderHeight: number } | null = null;

  constructor(
    private canvas: HTMLCanvasElement,
    plugin: ShaderPlugin,
    options: {
      pixelRatio?: number;
      width?: number;
      height?: number;
      renderScale?: number;
      singleRender?: boolean;
    } = {}
  ) {
    this.#plugin = plugin;
    // `pixelRatio` is an optional extra multiplier for the internal buffer size.
    // Kept separate from `renderScale` so you can do things like: renderScale=0.5 but pixelRatio=2.
    const pixelRatio = options.pixelRatio ?? 1;
    const pr = Math.max(0.1, Math.min(4.0, pixelRatio));
    this.#renderScale = (options.renderScale ?? 1.0) * pr;
    this.#singleRender = options.singleRender ?? false;

    // Get canvas dimensions, either from options or canvas element
    let width = options.width || 300;
    let height = options.height || 300;

    if (!options.width || !options.height) {
      const rect = this.canvas.getBoundingClientRect();
      if (rect.width > 0) width = rect.width;
      if (rect.height > 0) height = rect.height;
    }

    this.#displayWidth = width;
    this.#displayHeight = height;

    // Apply render scale to rendering resolution
    const renderWidth = Math.max(1, Math.floor(width * this.#renderScale));
    const renderHeight = Math.max(1, Math.floor(height * this.#renderScale));

    // Initialize OGL Renderer to match canvas buffer size
    this.#renderer = new Renderer({
      canvas: this.canvas,
      width: renderWidth,
      height: renderHeight,
      alpha: false, // Opaque background
      dpr: 1, // Don't apply device pixel ratio since we're already scaling
    });

    this.gl = this.#renderer.gl;

    // Important: OGL's internal sizing can update the canvas CSS size.
    // We want CSS size to remain at the display size, while only the drawing buffer scales.
    this.canvas.width = renderWidth;
    this.canvas.height = renderHeight;
    this.#renderer.setSize(renderWidth, renderHeight);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    this.init();
  }

  private init() {
    // Triangle creates a geometry with 3 vertices that covers the screen.
    // It provides 'position' and 'uv' attributes automatically.
    const geometry = new Triangle(this.gl);

    const commonUniforms = {
      uTime: { value: 0 },
      uResolution: {
        // Display-space resolution (CSS pixels); shaders typically use this for aspect-correct math.
        value: new Vec2(this.#displayWidth, this.#displayHeight),
      },
    };

    this.#program = new Program(this.gl, {
      vertex: this.#plugin.vertexShader || defaultVertex,
      fragment: this.#plugin.fragmentShader,
      uniforms: {
        ...commonUniforms,
        ...this.#plugin.uniforms,
      },
      // Ensure depth test is off for background
      depthTest: false,
      cullFace: false,
    });

    this.#mesh = new Mesh(this.gl, { geometry, program: this.#program });

    if (this.#plugin.onInit) {
      this.#plugin.onInit(this.gl, this.#program);
    }
  }

  public start() {
    if (this.#isPlaying) return;
    this.#isPlaying = true;
    this.#lastTime = performance.now();

    if (this.#singleRender) {
      // In single render mode, just render once and stop
      this.render();
      this.#isPlaying = false;
    } else {
      // Normal animation loop
      this.loop();
    }
  }

  public stop() {
    this.#isPlaying = false;
    if (this.#animationId !== null) {
      cancelAnimationFrame(this.#animationId);
      this.#animationId = null;
    }
  }

  public render() {
    // In single-render mode we may defer buffer resizing to avoid clearing the canvas on window resize.
    if (this.#pendingResize) {
      const { renderWidth, renderHeight } = this.#pendingResize;
      this.#pendingResize = null;

      this.canvas.width = renderWidth;
      this.canvas.height = renderHeight;
      this.#renderer.setSize(renderWidth, renderHeight);

      // Re-apply CSS sizing because OGL can overwrite it.
      this.canvas.style.width = `${this.#displayWidth}px`;
      this.canvas.style.height = `${this.#displayHeight}px`;
    }

    const now = performance.now();
    const dt = now - this.#lastTime;
    this.#lastTime = now;
    this.#totalTime += dt * 0.001; // Convert to seconds

    // Update global time uniform
    this.#program.uniforms.uTime.value = this.#totalTime;

    // Run Plugin Update Logic
    if (this.#plugin.onRender) {
      this.#plugin.onRender(dt, this.#totalTime);
    }

    this.#renderer.render({ scene: this.#mesh });
  }

  public resize(width?: number, height?: number) {
    // If dimensions not provided, get from canvas element
    if (width === undefined || height === undefined) {
      const rect = this.canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
    }

    this.#displayWidth = width;
    this.#displayHeight = height;

    // Calculate scaled render dimensions
    const renderWidth = Math.max(1, Math.floor(width * this.#renderScale));
    const renderHeight = Math.max(1, Math.floor(height * this.#renderScale));

    // Always update CSS size so the last rendered frame stays stretched to the element size.
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    if (this.#singleRender) {
      // Critical: Changing canvas.width/height clears the drawing buffer.
      // In single-render mode, defer buffer resize until the next manual render.
      this.#pendingResize = { renderWidth, renderHeight };
    } else {
      // Update canvas buffer size to scaled dimensions
      this.canvas.width = renderWidth;
      this.canvas.height = renderHeight;

      // Resize internal renderer to match canvas buffer size
      // OGL may update the canvas CSS size; we re-apply CSS sizing right after.
      this.#renderer.setSize(renderWidth, renderHeight);

      // Re-apply CSS size (setSize may overwrite it)
      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;
    }

    // Update uniforms with actual display dimensions (not scaled buffer size)
    if (this.#program) {
      this.#program.uniforms.uResolution.value.set(width, height);
    }

    // Notify plugin with actual display dimensions
    if (this.#plugin.onResize) {
      this.#plugin.onResize(width, height);
    }
  }

  private loop = () => {
    if (!this.#isPlaying) return;

    this.render();
    this.#animationId = requestAnimationFrame(this.loop);
  };

  public dispose() {
    this.stop();
    // basic cleanup, more can be done here (gl deleteProgram etc)
  }
}

const defaultVertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`;
