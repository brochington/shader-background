import { ShaderPlugin } from '../core/types';
export type RetroGridConfig = {
    gridColor: string;
    backgroundColor: string;
    speed?: number;
};
export declare class RetroGridPlugin implements ShaderPlugin {
    name: string;
    fragmentShader: string;
    uniforms: any;
    constructor(config: RetroGridConfig);
}
