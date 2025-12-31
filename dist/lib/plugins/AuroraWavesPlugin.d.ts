import { ShaderPlugin } from '../core/types';
export type AuroraWavesConfig = {
    /** Base background color */
    backgroundColor: string;
    /** Aurora ribbon primary color */
    color1: string;
    /** Aurora ribbon secondary color */
    color2: string;
    /** Overall brightness multiplier */
    intensity?: number;
    /** Motion speed */
    speed?: number;
    /** Noise scale (bigger = larger features) */
    scale?: number;
    /** Subtle film grain */
    grainAmount?: number;
};
export declare class AuroraWavesPlugin implements ShaderPlugin {
    name: string;
    fragmentShader: string;
    uniforms: any;
    private speed;
    constructor(config: AuroraWavesConfig);
    onRender(dt: number): void;
}
