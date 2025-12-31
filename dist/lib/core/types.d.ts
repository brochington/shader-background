import { Program, OGLRenderingContext } from 'ogl';
export interface ShaderPlugin {
    name: string;
    fragmentShader: string;
    vertexShader?: string;
    uniforms: Record<string, {
        value: any;
    }>;
    onInit?: (gl: OGLRenderingContext, program: Program) => void;
    onRender?: (dt: number, totalTime: number) => void;
    onResize?: (width: number, height: number) => void;
}
