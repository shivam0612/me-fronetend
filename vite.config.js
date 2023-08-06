import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Adjust this folder name as per your preference
  },
  server: {
    port: 8080, // Render.com requires your application to listen on port 8080
    strictPort: true, // Ensure Vite uses the specified port
    hmr: {
      port: 443, // Render.com requires HMR to run on port 443
    },
    proxy: {
      '/api': {
        target: 'https://magicentertainment38.onrender.com',
        changeOrigin: true,
      },
    },
  },
});
