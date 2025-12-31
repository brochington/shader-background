import { ShaderPlugin } from '../core/types';
export type ContourLinesConfig = {
    backgroundColor: string;
    lineColor: string;
    accentColor?: string;
    /** Lines per unit */
    density?: number;
    /** Line thickness */
    thickness?: number;
    /** Warp amount */
    warp?: number;
    /** Motion speed */
    speed?: number;
    /** Glow amount */
    glow?: number;
    /** Grain amount */
    grainAmount?: number;
};
export declare class ContourLinesPlugin implements ShaderPlugin {
    name: string;
    fragmentShader: string;
    uniforms: any;
    private speed;
    constructor(config: ContourLinesConfig);
    onRender(dt: number): void;
}
