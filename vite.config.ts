import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// On GitHub Actions, serve under the repo name (project pages) unless it's a
// user/org site repo (<user>.github.io), which serves from the domain root.
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const base = process.env.GITHUB_ACTIONS
  ? repo.endsWith('.github.io')
    ? '/'
    : `/${repo}/`
  : '/';

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei'],
          gsap: ['gsap'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
