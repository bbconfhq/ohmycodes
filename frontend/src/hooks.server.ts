import type {HandleFetch} from '@sveltejs/kit';

import { dev } from '$app/environment';

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
  if (dev) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api')) {
      request = new Request(
        request.url.replace(url.host, 'server:4000'),
        request
      );
    }
  }
  return fetch(request);
};
