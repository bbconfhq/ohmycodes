import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess(),

    kit: {
        adapter: adapter(),
        vite: {
            server: {
                proxy: {
                    '/api': {
                        target: 'http://127.0.0.1:4000',
                        changeOrigin: true,
                        secure: false,
                    }
                }
            }
        }
    }
};

export default config;
