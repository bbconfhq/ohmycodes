import * as Sentry from '@sentry/sveltekit';
/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch }) {
  try {
    const res = await fetch(`/api/v1/code/${params.id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const body = await res.json();
    if (res.ok) {
      return {
        data: body.Data,
      };
    } else {
      return {
        data: null,
      };
    }
  } catch (error) {
    Sentry.captureException(error);
    return {
      data: null,
    };
  }
}
