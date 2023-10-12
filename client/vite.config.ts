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
            port: 3000,
        },
    });
};
