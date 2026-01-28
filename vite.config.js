import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            output: {
                // 1. Force the main JS file to be named 'main.js' (no hash)
                entryFileNames: 'main.js',

                // 2. Put all CSS and images into the 'assets' folder
                assetFileNames: 'assets/[name].[ext]',

                // 3. Ensure strictly one chunk (prevents code splitting)
                manualChunks: undefined,
            },
        },
    },
});