<script>
  import Editor from '../lib/Editor.svelte';
  import RecentList from '../lib/RecentList.svelte';

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<svelte:head>
  <title>ohmy.codes - Sharing your codes temporarily!</title>
  <meta name="description" content="ohmy.codes" />
</svelte:head>

<div class="container">
  <Editor />
  <RecentList items={data.recentItems} />
</div>
