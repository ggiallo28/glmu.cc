import tailwindcss from '@tailwindcss/vite';
import preact from '@preact/preset-vite';
import {defineConfig, type Plugin} from 'vite';

// Inlines the build's CSS directly into index.html so it's parsed synchronously
// with the document instead of blocking on a separate render-blocking request.
function inlineCss(): Plugin {
  let css = '';
  return {
    name: 'inline-css',
    apply: 'build',
    generateBundle(_, bundle) {
      for (const fileName of Object.keys(bundle)) {
        const chunk = bundle[fileName];
        if (chunk.type === 'asset' && fileName.endsWith('.css')) {
          css += chunk.source;
          delete bundle[fileName];
        }
      }
    },
    transformIndexHtml(html) {
      return html.replace(/<link rel="stylesheet"[^>]*crossorigin[^>]*href="[^"]*\.css">/, `<style>${css}</style>`);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [preact(), tailwindcss(), inlineCss()],
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
