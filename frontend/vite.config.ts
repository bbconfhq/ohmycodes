import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sentrySvelteKit({
    sourceMapsUploadOptions: {
      org: 'x--o',
      project: 'ohmycodes'
    }
  }), sveltekit()],
  server: {
    proxy: {
      '/api': {
        target: 'http://ohmycodes-server:4000',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
