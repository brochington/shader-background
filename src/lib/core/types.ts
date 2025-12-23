// src/core/types.ts
import { Program, OGLRenderingContext } from 'ogl';

export interface ShaderPlugin {
  // Unique name for the plugin
  name: string;

  // The Fragment shader string
  fragmentShader: string;

  // Optional Vertex shader (defaults to a pass-through if generic)
  vertexShader?: string;

  // Initial Uniforms (values only, OGL handles wrapping)
  uniforms: Record<string, { value: any }>;

  // Lifecycle hook: Called when the OGL Program is created
  onInit?: (gl: OGLRenderingContext, program: Program) => void;

  // Lifecycle hook: Called every frame
  // dt = delta time in ms, totalTime = elapsed in seconds
  onRender?: (dt: number, totalTime: number) => void;

  // Lifecycle hook: Called on resize
  onResize?: (width: number, height: number) => void;
}
