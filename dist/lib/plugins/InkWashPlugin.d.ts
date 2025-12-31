import { ShaderPlugin } from '../core/types';
export type InkWashConfig = {
    /** Paper/background color */
    paperColor: string;
    /** Ink/pigment color */
    inkColor: string;
    /** Overall pattern scale */
    scale?: number;
    /** Motion speed */
    speed?: number;
    /** Flow / warping amount */
    flow?: number;
    /** Contrast / punch of ink */
    contrast?: number;
    /** Granulation (pigment clumping) */
    granulation?: number;
    /** Vignette (0..1) */
    vignette?: number;
    /** Grain strength */
    grainAmount?: number;
};
export declare class InkWashPlugin implements ShaderPlugin {
    name: string;
    fragmentShader: string;
    uniforms: any;
    private speed;
    constructor(config: InkWashConfig);
    onRender(dt: number): void;
}
