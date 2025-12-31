import { ShaderPlugin } from '../core/types';
export type CausticsConfig = {
    color: string;
    backgroundColor: string;
    intensity?: number;
    speed?: number;
    scale?: number;
    distortion?: number;
    sharpness?: number;
    antiAlias?: number;
};
export declare class CausticsPlugin implements ShaderPlugin {
    name: string;
    fragmentShader: string;
    uniforms: any;
    private speed;
    constructor(config: CausticsConfig);
    onRender(dt: number): void;
}
