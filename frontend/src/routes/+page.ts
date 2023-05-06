/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const res = await fetch('/api/v1/code', {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const body = await res.json();
  if (res.ok) {
    return {
      recentItems: body.Data,
    };
  } else {
    return {
      recentItems: []
    };
  }
}