<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import CodeMirror from './CodeMirror.svelte';

  import { goto } from '$app/navigation';
  import {supportedLanguages} from '$lib/language.js';

  let language = 'auto';
  let detectedLangauge = '';
  export let code = '';
  export let title = '';
  export let name = '';

  const handleEditorLanguageChange = (e) => {
    detectedLangauge = e.detail.language;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if ([title, name, code].some((v) => !v)) {
      alert('please fill all fields');
      return;
    }

    fetch('/api/v1/code/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        name,
        content: code,
        language: language === 'auto' ? (detectedLangauge || 'text') : language,
      })
    })
      .then((resp) => {
        resp
          .json()
          .then(({ Data }) => {
            const { id } = Data;
            goto(`/${id}`);
          })
          .catch(() => {
            alert('unknown error');
          });
      })
      .catch(() => {
        alert('failed to sharing your code');
      });
  };
</script>

<form id="form" class="input-group" on:submit={onSubmit}>
  <select bind:value={language} id="language">
    <option value={'auto'}>auto{detectedLangauge === '' ? '' : ` (${detectedLangauge})`}</option>
    {#each supportedLanguages as lang}
      <option value={lang}>{lang}</option>
    {/each}
  </select>
  <input type="text" id="title" placeholder="Title" required bind:value={title} />
  <input type="text" id="name" placeholder="Author" required bind:value={name} />
</form>

<div id="editor-container">
  <CodeMirror bind:code bind:language on:languageChange={handleEditorLanguageChange} />
</div>
<div class="action-group">
  <button type="submit" id="create" form="form">Create</button>
</div>

<style lang="scss">
  form {
    width: 100%;
  }

  #language {
    max-width: 180px;
    width: 100%;
  }

  #title {
    flex: 8;
  }

  #name {
    flex: 2;
  }

  #editor-container {
    margin-bottom: 1rem;
    border: 1px solid var(--gray1);
    border-radius: 6px;
  }

  .action-group {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
</style>
