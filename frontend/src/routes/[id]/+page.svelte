<script lang="ts">
  import { detectLanguage, getParseRule, Language, tokenize } from '@calor/core';
  import '@calor/highlighter/themes/github-light.css';
  import hljs from 'highlight.js';
  import 'highlight.js/styles/github.css';
  import {onMount} from 'svelte';

  import {highlightLines, findNearestLineNumberElement} from '../../utils/dom';
  import { formatDate } from '../../utils/formatDate.js';
  import {parseLineHighlightHash} from '../../utils/navigator';

  /** @type {import('./$types').PageData} */
  export let data;
  let payload = data.data;
  let value: string;
  const calorLanguages: Array<Language> = Object.keys(Language).map((k) => Language[k]);

  const calorRemap = (lang: string) => {
    switch (lang) {
    case 'go':
      return 'golang';
    default:
      return lang;
    }
  };

  const escapeHTML = (text: string) => {
    return text.replace(/[&<>]/g, (match) => {
      switch (match) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      default:
        return match;
      }
    });
  };

  const calorHighlighter = (code: string, language?: string): string => {
    if (language == null) {
      language = detectLanguage(code);
    }
    const tokens = tokenize(code, getParseRule(language));
    const html = tokens.reduce((acc, token) => {
      acc += escapeHTML(token.value).split(/\r?\n/).map((v) => `<span class="calor-${token.kind}">${v}</span>`).join('\n');
      return acc;
    }, '');
    return html;
  };

  if (payload.language !== 'auto') {
    if (calorLanguages.includes(calorRemap(payload.language))) {
      value = calorHighlighter(payload.content, calorRemap(payload.language));
    } else {
      value = hljs.highlight(payload.content, { language: payload.language }).value;
    }
  } else {
    value = hljs.highlightAuto(payload.content).value;
  }
  const lines = value.split(/\r?\n/);
  const lineNumberWidth = 20 + lines.length.toString().length * 8;
  value = lines
    .map((v, i) => {
      return `<div class="gutter" style="grid-template-columns: ${lineNumberWidth}px 1fr" data-line="${i + 1}"><span class="line-number" draggable="true" style="">${
        i + 1
      }</span><div class="line">${v}</div></div>`;
    })
    .join('');

  let copyButtonText = 'Copy';
  function onCopy() {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(payload.content).then(() => {
        copyButtonText = 'Copied!';
        setTimeout(() => {
          copyButtonText = 'Copy';
        }, 3000);
      });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = payload.content;

      textArea.style.position = 'absolute';
      textArea.style.left = '-999999px';

      document.body.prepend(textArea);
      textArea.select();

      try {
        document.execCommand('copy');
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
    el.addEventListener('drop', onDragOver);
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

  let dragStartLine: string;
  function onDragStart(e: DragEvent) {
    const el = e.target as Element;
    if (isLineNumberElement(el)) {
      dragStartLine = el.textContent;
    } else {
      e.preventDefault();
    }
  }

  function onDragOver(e: DragEvent) {
    e.preventDefault();
    let dragEndLine: string;
    const el = e.target as Element;
    if (isLineNumberElement(el)) {
      dragEndLine = el.textContent;
    } else {
      const nearEl = findNearestLineNumberElement(el);
      if (nearEl == null) {
        return;
      }
      dragEndLine = nearEl.textContent;
    }
    let lineFromEl = document.querySelector(`[data-line="${dragStartLine}"]`);
    let lineToEl = document.querySelector(`[data-line="${dragEndLine}"]`);
    if (Number(dragStartLine) > Number(dragEndLine)) {
      [lineFromEl, lineToEl] = [lineToEl, lineFromEl];
    }
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
  <title>{payload.title} by {payload.name} - ohmy.codes</title>
  <meta name="description" content="ohmy.codes" />
</svelte:head>

<div>
  <div class="tag-group">
    <span class="tag">
      <b>IP</b>
      {payload.ip}
    </span>
    <span class="tag">
      <b>Created</b>
      {formatDate(payload.created_at)}
    </span>
  </div>
  <div class="input-group">
    <input type="text" id="title" value={payload.title} readonly />
    <input type="text" id="name" value={payload.name} readonly />
  </div>
</div>
<div>
  <div class="code" use:codeViewerEventBinder>
    <button id="copy" on:click={onCopy}>{copyButtonText}</button>{@html value}
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
    white-space: pre-wrap;
    border: 1px solid var(--gray1);
    border-radius: 6px;
    padding: 12px 16px;
    line-height: 1.25rem;
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
