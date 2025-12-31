import { ShaderPlugin } from '../core/types';
export type SoftStarfieldConfig = {
    /** Background gradient bottom/top */
    backgroundBottom: string;
    backgroundTop: string;
    /** Star color (usually near-white) */
    starColor?: string;
    /** Star density multiplier */
    density?: number;
    /** Star size multiplier */
    size?: number;
    /** Twinkle amount */
    twinkle?: number;
    /** Nebula tint */
    nebulaColor?: string;
    /** Nebula strength */
    nebula?: number;
    /** Motion speed */
    speed?: number;
    /** Grain 0.. */
    grainAmount?: number;
};
export declare class SoftStarfieldPlugin implements ShaderPlugin {
    name: string;
    fragmentShader: string;
    uniforms: any;
    private speed;
    constructor(config: SoftStarfieldConfig);
    onRender(dt: number): void;
}
