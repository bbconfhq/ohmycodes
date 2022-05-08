<script context="module" lang="ts">
	export async function load({ fetch }) {
	    const res = await fetch('/api/v1/code');
	    const { Data } = await res.json();
	    if (res.ok) {
	        return {
	            props: {
	                recentItems: Data,
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
	import RecentList from '../lib/RecentList.svelte';

	export let recentItems;
</script>

<svelte:head>
	<title>ohmy.codes - Sharing your codes temporarily!</title>
	<meta name="description" content="ohmy.codes" />
</svelte:head>

<Editor />
<RecentList items={recentItems} />
