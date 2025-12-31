import { ShaderPlugin } from '../core/types';
export type DreamyBokehConfig = {
    /** Background gradient bottom/top */
    backgroundBottom: string;
    backgroundTop: string;
    /** A 3-color palette for the bokeh highlights */
    colorA?: string;
    colorB?: string;
    colorC?: string;
    /** Bokeh density multiplier (0..3) */
    density?: number;
    /** Bokeh size multiplier (0.5..2) */
    size?: number;
    /** Edge softness / blur multiplier (0.5..2) */
    blur?: number;
    /** Motion speed */
    speed?: number;
    /** Vignette strength (0..1) */
    vignette?: number;
    /** Grain strength (0..0.15) */
    grainAmount?: number;
};
export declare class DreamyBokehPlugin implements ShaderPlugin {
    name: string;
    fragmentShader: string;
    uniforms: any;
    private speed;
    constructor(config: DreamyBokehConfig);
    onRender(dt: number): void;
}
