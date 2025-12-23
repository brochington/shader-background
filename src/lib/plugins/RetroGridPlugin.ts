import { Color } from 'ogl';
import { ShaderPlugin } from '../core/types';

export type RetroGridConfig = {
  gridColor: string;
  backgroundColor: string;
  speed?: number; // default 1.0
};

export class RetroGridPlugin implements ShaderPlugin {
  name = 'retro-grid';

  fragmentShader = /* glsl */ `
    precision highp float;
    uniform float uTime;
    uniform vec3 uGridColor;
    uniform vec3 uBgColor;
    uniform float uSpeed;

    varying vec2 vUv;

    void main() {
        // Normalize UV to -1 to 1
        vec2 uv = vUv * 2.0 - 1.0;
        
        // Hoziron offset
        float horizon = 0.0; 
        float fov = 0.5; 

        // 3D Projection Logic
        // We only care about the bottom half for the floor
        if (uv.y > horizon) {
            // Sky (simple gradient or solid)
            gl_FragColor = vec4(uBgColor, 1.0);
            return;
        }

        // Project the 2D pixel to 3D floor coordinates
        // x = uv.x / |y| to flare out perspective
        // z = 1.0 / |y| to simulate depth
        float floorY = abs(uv.y - horizon);
        vec3 coord = vec3(uv.x / floorY, floorY, 1.0 / floorY);
        
        // Move the grid by time
        coord.z += uTime * uSpeed;

        // Grid Logic
        vec2 gridUV = coord.xz * fov;
        vec2 grid = fract(gridUV) - 0.5;
        
        // Thickness of lines (derivative for anti-aliasing approximation or hard coded)
        float line = min(abs(grid.x), abs(grid.y));
        
        float gridVal = 1.0 - smoothstep(0.0, 0.05 * coord.z, line);

        // Fade out grid near horizon (fog)
        float fog = smoothstep(0.0, 1.5, floorY);

        vec3 color = mix(uBgColor, uGridColor, gridVal * fog);

        gl_FragColor = vec4(color, 1.0);
    }
  `;

  uniforms: any;

  constructor(config: RetroGridConfig) {
    const grid = new Color(config.gridColor);
    const bg = new Color(config.backgroundColor);

    this.uniforms = {
      uGridColor: { value: [grid.r, grid.g, grid.b] },
      uBgColor: { value: [bg.r, bg.g, bg.b] },
      uSpeed: { value: config.speed ?? 1.0 },
    };
  }
}
