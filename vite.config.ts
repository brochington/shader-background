import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ShaderBackgrounds',
      fileName: 'shader-backgrounds',
    },
    rollupOptions: {
      // Ensure we don't bundle OGL if we want the user to bring their own,
      // but for a standalone generic lib, bundling it is usually safer/easier for the user.
      // We will bundle it here for "zero config" usage.
    },
  },
  plugins: [dts()],
});
