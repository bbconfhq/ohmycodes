import * as Sentry from '@sentry/sveltekit';
import type { HandleFetch } from '@sveltejs/kit';
import {sequence} from '@sveltejs/kit/hooks';

import { dev } from '$app/environment';

Sentry.init({
  dsn: 'https://56c3eea8e6db25e6c0b58e5a83d08ccf@o4506542468038656.ingest.sentry.io/4506542469414912',
  tracesSampleRate: 1
});

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
  if (dev) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api')) {
      request = new Request(request.url.replace(url.host, 'server:4000'), request);
    }
  }
  return fetch(request);
};
export const handleError = Sentry.handleErrorWithSentry();
export const handle = sequence(Sentry.sentryHandle());
