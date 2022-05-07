import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess(),

    kit: {
        adapter: adapter(),

        // Override http methods in the Todo forms
        methodOverride: {
            allowed: ['PATCH', 'DELETE']
        },

        vite: {
            server: {
                proxy: {
                    '/api': {
                        target: 'http://localhost:4000',
                        changeOrigin: true,
                        secure: false,
                    }
                }
            }
        }
    }
};

export default config;
