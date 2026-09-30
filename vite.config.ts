import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      // Proxies all /api requests to your FastAPI backend
      '/api': {
        // Updated to point to your deployed Render backend
        target: 'https://findjobsbackend-2xge.onrender.com', 
        changeOrigin: true,
        secure: false,
      },
    },
  },
});