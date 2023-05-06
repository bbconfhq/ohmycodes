<script lang="ts">
  import hljs from 'highlight.js';

  import 'highlight.js/styles/github.css';
  import { formatDate } from '../../utils/formatDate.js';

  /** @type {import('./$types').PageData} */
  export let data;
  let code = data.data;
  let { value } = hljs.highlightAuto(code.content);
  // base = 20

  let lines = value.split(/\r?\n/);
  let lineNumberWidth = Math.max(20, lines.length.toString().length * 15);
  value = lines.map((v, i) => {
      return `<div class="gutter" style="grid-template-columns: ${lineNumberWidth}px 1fr"><span class="line-number" style="">${i + 1}</span><div class="line">${v}</div></div>`
  }).join('');

  function onCopy() {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(code.content).then(() => {
          alert('Copied to clipboard.');
        })
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = code.content;
          
      textArea.style.position = "absolute";
      textArea.style.left = "-999999px";
          
      document.body.prepend(textArea);
      textArea.select();

      try {
          document.execCommand('copy');
          alert('Copied to clipboard.');
      } catch (error) {
          console.error(error);
      } finally {
          textArea.remove();
      }
    }
  };
</script>

<link rel="stylesheet" href="../../app.css" />

<svelte:head>
  <title>{code.title} by {code.name} - ohmy.codes</title>
  <meta name="description" content="ohmy.codes" />
</svelte:head>

<div>
  <div class="tag-group">
    <span class="tag">
      <b>IP</b>
      {code.ip}
    </span>
    <span class="tag">
      <b>Created</b>
      {formatDate(code.created_at)}
    </span>
  </div>
  <div class="input-group">
    <input type="text" id="title" value={code.title} readonly />
    <input type="text" id="name" value={code.name} readonly />
  </div>
</div>
<div>
  <div class="code">
    <button id="copy" on:click={onCopy}>Copy</button>{@html value}
  </div>
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
    position: relative;
    white-space: pre;
    border: 1px solid var(--gray1);
    border-radius: 6px;
    padding: 12px 16px;
    line-height: 1.25rem;
    white-space: pre-wrap;
  }

  button#copy {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 1;
    font-size: 12px;
    display: none;
  }
  .code:hover button#copy {
    display: block;
  }
</style>
