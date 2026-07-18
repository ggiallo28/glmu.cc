import tailwindcss from '@tailwindcss/vite';
import preact from '@preact/preset-vite';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [preact(), tailwindcss()],
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
