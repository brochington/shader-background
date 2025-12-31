import { ShaderPlugin } from '../core/types';
export type LiquidOrbConfig = {
    color: string;
    backgroundColor: string;
    count?: number;
    speed?: number;
    gooeyness?: number;
    edgeSoftness?: number;
};
export declare class LiquidOrbPlugin implements ShaderPlugin {
    name: string;
    private static MAX_ORBS;
    fragmentShader: string;
    uniforms: any;
    private orbs;
    private orbData;
    private speedMultiplier;
    constructor(config: LiquidOrbConfig);
    onRender(dt: number): void;
}
