<script>
  import Editor from '../lib/Editor.svelte';
  import RecentList from '../lib/RecentList.svelte';

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<svelte:head>
  <title>mycod.es - Sharing your codes temporarily!</title>
  <meta name="description" content="mycod.es" />
</svelte:head>

<div class="container">
  <Editor />
  <RecentList items={data.recentItems} />
</div>
