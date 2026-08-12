import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    // Use the pure-JS `sass` package on the main thread.
    // Avoid `sass-embedded` — it requires macOS 14+ and fails on Ventura (13.x).
    preprocessorMaxWorkers: 0,
  },
});
