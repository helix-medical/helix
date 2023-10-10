import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    return defineConfig({
        plugins: [react()],
        base: mode === 'production' ? '/helix' : '/',
        build: {
            emptyOutDir: true,
            outDir: mode === 'production' ? './dist' : '../server/build/public',
            rollupOptions: {},
        },
        server: {
            port: 3000,
        },
    });
};
