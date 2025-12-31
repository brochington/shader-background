import { ShaderPlugin } from '../core/types';
export type GrainyFogConfig = {
    firstColor: string;
    secondColor: string;
    backgroundColor: string;
    grainAmount?: number;
    speed?: number;
    scale?: number;
    octaves?: number;
    lacunarity?: number;
    gain?: number;
    contrast?: number;
};
export declare class GrainyFogPlugin implements ShaderPlugin {
    name: string;
    fragmentShader: string;
    uniforms: any;
    private speed;
    constructor(config: GrainyFogConfig);
    onRender(dt: number): void;
}
