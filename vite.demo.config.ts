import { defineConfig } from 'vite';

// Build the repo-root `index.html` as a static demo site (for GitHub Pages).
// Set BASE_PATH in CI to `/<repo-name>/` so asset URLs work under Pages subpaths.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  build: {
    outDir: 'dist-demo',
    emptyOutDir: true,
  },
});


