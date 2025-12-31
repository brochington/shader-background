import { ShaderPlugin } from '../core/types';
export type GradientEasing = 'linear' | 'smoothstep' | 'easeInOutQuad' | 'easeInOutCubic';
export type GradientMotionMode = 'none' | 'path' | 'random';
export type GradientMotionBounds = {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
};
export type GradientMotion = {
    /**
     * - "none": static point (default)
     * - "path": moves between points in `path`
     * - "random": picks random targets and eases between them
     */
    mode?: GradientMotionMode;
    /** Waypoints for "path" mode. */
    path?: Array<{
        x: number;
        y: number;
    }>;
    /** Seconds to move from start -> target. Default 3.0 */
    duration?: number;
    /** Easing curve for interpolation. Default "smoothstep" */
    easing?: GradientEasing;
    /**
     * Bounds for clamping/random target generation. Defaults to [-1..1] in both axes.
     * (These are in the same -1..1 coordinate space as `x`/`y`.)
     */
    bounds?: Partial<GradientMotionBounds>;
    /**
     * Random mode only: if > 0, choose random targets within this radius around the point's
     * base `x`/`y` (then clamp to bounds). If omitted/0, choose targets anywhere in bounds.
     */
    randomRadius?: number;
};
export type GradientPoint = {
    x: number;
    y: number;
    colors: string[];
    speed?: number;
    motion?: GradientMotion;
};
export type GradientPluginOptions = {
    /** Defaults applied to any point that doesn't specify a `motion` field. */
    defaultMotion?: GradientMotion;
};
export declare class GradientPlugin implements ShaderPlugin {
    #private;
    name: string;
    private static MAX_POINTS;
    fragmentShader: string;
    uniforms: any;
    private pointsConfig;
    private colorStates;
    private motionStates;
    private defaultMotion;
    constructor(points: GradientPoint[], options?: GradientPluginOptions);
    onRender(dt: number): void;
}
