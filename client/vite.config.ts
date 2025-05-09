import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react()],
    build: {
      emptyOutDir: true,
      outDir: mode === 'production' ? './dist' : '../server/build/www',
      rollupOptions: {},
    },
    server: {
      host: process.env.VITE_HOST,
      port: +process.env.VITE_PORT,
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL,
          changeOrigin: true,
        },
        '/auth': {
          target: process.env.VITE_AUTH_URL,
          changeOrigin: true,
        },
      },
    },
  });
};
