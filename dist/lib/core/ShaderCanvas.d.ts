import { OGLRenderingContext } from 'ogl';
import { ShaderPlugin } from './types';
export declare class ShaderCanvas {
    #private;
    private canvas;
    gl: OGLRenderingContext;
    constructor(canvas: HTMLCanvasElement, plugin: ShaderPlugin, options?: {
        pixelRatio?: number;
        width?: number;
        height?: number;
        renderScale?: number;
        singleRender?: boolean;
    });
    private init;
    start(): void;
    stop(): void;
    render(): void;
    resize(width?: number, height?: number): void;
    private loop;
    dispose(): void;
}
