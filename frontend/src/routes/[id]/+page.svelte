<link rel="stylesheet" href="../../app.css">
<script lang="ts">
    import hljs from 'highlight.js';

    import 'highlight.js/styles/github.css';
    import {formatDate} from "../../utils/formatDate.js";

    /** @type {import('./$types').PageData} */
    export let data;
    let code = data.data;
    let { value } = hljs.highlightAuto(code.content);
</script>

<svelte:head>
	<title>{code.title} by {code.name} - ohmy.codes</title>
  <meta name="description" content="ohmy.codes" />
</svelte:head>

<div>
  <div class="tag-group">
      <span class="tag">
        <b>IP</b> {code.ip}
      </span>
    <span class="tag">
        <b>Created</b> {formatDate(code.created_at)}
      </span>
  </div>
  <div class="input-group">
    <input type="text" id="title" value={code.title} readonly>
    <input type="text" id="name" value={code.name} readonly>
  </div>
</div>
<div>
  <div class="code">{@html value}</div>
</div>

<style lang="scss">

  .tag-group {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 8px;
    gap: 1rem;
  }

  #title {
    flex: 8;
  }

  #name {
    flex: 2;
  }

  div.code {
    white-space: pre;
    border: 1px solid var(--gray1);
    border-radius: 6px;
    padding: 12px 16px;
    line-height: 1.25rem;
  }
</style>