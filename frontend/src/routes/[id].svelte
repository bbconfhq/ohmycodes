<script context="module" lang="ts">
    export const prerender = true;

    export async function load({ fetch, params }) {
        const res = await fetch(`/api/v1/code/${params.id}`);
        const { Data } = await res.json();
        console.log(Data);
        if (res.ok) {
            return {
                props: {
                    data: Data,
                },
            };
        }

        return {
            status: res.status,
        };
    }
</script>

<script>
    import Editor from '../lib/Editor.svelte';

    export let data;
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="ohmy.codes" />
</svelte:head>

<Editor title={data.title} code={data.content} name={data.name} readonly />
