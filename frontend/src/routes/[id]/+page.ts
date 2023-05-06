/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params }) {
  const res = await fetch(`/api/v1/code/${params.id}`, {
    headers: {
      'Content-Type': 'application/json',
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
}