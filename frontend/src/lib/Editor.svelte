<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import CodeMirror from './CodeMirror.svelte';

  import { goto } from '$app/navigation';

  export let code = '';
  export let title = '';
  export let name = '';

  const onSubmit = (e) => {
    e.preventDefault();

    fetch('/api/v1/code/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        name,
        content: code
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

<div class="input-group">
  <input type="text" id="title" placeholder="Unnamed.txt" bind:value={title} />
  <input type="text" id="name" placeholder="Author (optional)" bind:value={name} />
</div>

<div id="editor-container">
  <CodeMirror bind:code />
</div>

<button type="button" id="create" on:click={onSubmit}>Create</button>

<style lang="scss">
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
</style>
