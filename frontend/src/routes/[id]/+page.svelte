<script lang="ts">
  import hljs from 'highlight.js';
  import 'highlight.js/styles/github.css';
  import {onMount} from 'svelte';

  import {highlightLines, findNearestLineNumberElement} from '../../utils/dom';
  import { formatDate } from '../../utils/formatDate.js';
  import {parseLineHighlightHash} from '../../utils/navigator';

  /** @type {import('./$types').PageData} */
  export let data;
  let code = data.data;
  let { value } = hljs.highlightAuto(code.content);

  let lines = value.split(/\r?\n/);
  let lineNumberWidth = 20 + lines.length.toString().length * 8;
  value = lines
    .map((v, i) => {
      return `<div class="gutter" style="grid-template-columns: ${lineNumberWidth}px 1fr" data-line="${i + 1}"><span class="line-number" draggable="true" style="">${
        i + 1
      }</span><div class="line">${v}</div></div>`;
    })
    .join('');

  function onCopy() {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(code.content).then(() => {
        alert('Copied to clipboard.');
      });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = code.content;

      textArea.style.position = 'absolute';
      textArea.style.left = '-999999px';

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
  }

  function codeViewerEventBinder(el: Element) {
    el.addEventListener('click', onClick);
    el.addEventListener('dragstart', onDragStart);
    el.addEventListener('dragover', onDragOver);
    el.addEventListener('drop', onDrop);
  }

  function isLineNumberElement(el: Element) {
    return el.tagName === 'SPAN' && el.classList.contains('line-number');
  }

  function onClick(e: MouseEvent) {
    const el = e.target as Element;
    if (isLineNumberElement(el)) {
      const line = el.textContent;
      const lineEl = document.querySelector(`[data-line="${line}"]`);
      if (e.shiftKey) {
        const lastLineEl = document.querySelector('.highlight');
        if (lastLineEl == null) {
          return;
        }
        const [startEl, endEl] =
          Number(lastLineEl.getAttribute('data-line')) < Number(lineEl.getAttribute('data-line'))
            ? [lastLineEl, lineEl]
            : [lineEl, lastLineEl];
        removeAllHighlight();
        highlightLines(startEl, endEl);
      } else {
        removeAllHighlight();
        lineEl.classList.add('highlight');
      }
    }
  }

  function onDragStart(e: DragEvent) {
    const el = e.target as Element;
    if (isLineNumberElement(el)) {
      e.dataTransfer.setData('text/plain', el.textContent);
    } else {
      e.preventDefault();
    }
  }

  function onDragOver(e: DragEvent) {
    e.preventDefault();
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    const lineFrom = e.dataTransfer.getData('text');
    let lineTo: string;
    const el = e.target as Element;
    if (isLineNumberElement(el)) {
      lineTo = el.textContent;
    } else {
      const nearEl = findNearestLineNumberElement(el);
      if (nearEl == null) {
        return;
      }
      lineTo = nearEl.textContent;
    }
    const lineFromEl = document.querySelector(`[data-line="${lineFrom}"]`);
    const lineToEl = document.querySelector(`[data-line="${lineTo}"]`);
    removeAllHighlight();
    highlightLines(lineFromEl, lineToEl);
  }

  function removeAllHighlight() {
    const highlightEls = document.querySelectorAll('.highlight');
    highlightEls.forEach((el) => {
      el.classList.remove('highlight');
    });
  }

   onMount(() => {
     const range = parseLineHighlightHash();
     if (range == null) {
       return;
     }
     const { start, end } = range;  
     const lineFromEl = document.querySelector(`[data-line="${start}"]`);
     const lineToEl = document.querySelector(`[data-line="${end}"]`);
     removeAllHighlight();
     highlightLines(lineFromEl, lineToEl);
   });
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
  <div class="code" on:dragstart={onDragStart} use:codeViewerEventBinder>
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
