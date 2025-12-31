import { ShaderPlugin } from '../core/types';
export type StainedGlassConfig = {
    /** Background behind the glass (shows through a bit) */
    backgroundColor: string;
    /** Lead/edge color */
    leadColor?: string;
    /** Palette colors for glass cells */
    colorA?: string;
    colorB?: string;
    colorC?: string;
    colorD?: string;
    /** Cell scale */
    scale?: number;
    /**
     * Pattern variant (changes the underlying coordinate transform).
     * - 0: classic
     * - 1: crystal (anisotropic)
     * - 2: radial-ish twist
     */
    variant?: 0 | 1 | 2;
    /** Random seed (any number). Change this to get a different layout. */
    seed?: number;
    /**
     * Site jitter 0..1
     * - 0 => very regular cells
     * - 1 => fully random Voronoi sites
     */
    jitter?: number;
    /** Rotate the pattern in radians */
    rotation?: number;
    /** Edge thickness */
    edgeWidth?: number;
    /** Edge sharpness (higher = crisper lines) */
    edgeSharpness?: number;
    /** Glow along edges */
    edgeGlow?: number;
    /** Warp amount (0..1.5) */
    distortion?: number;
    /** Motion speed */
    speed?: number;
    /** Grain */
    grainAmount?: number;
};
export declare class StainedGlassPlugin implements ShaderPlugin {
    name: string;
    fragmentShader: string;
    uniforms: any;
    private speed;
    constructor(config: StainedGlassConfig);
    onRender(dt: number): void;
}
