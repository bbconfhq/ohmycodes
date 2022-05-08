<script context="module" lang="ts">
    export const prerender = true;
</script>

<script lang="ts">
    import CodeMirror from '../lib/CodeMirror.svelte';
    import {formatDate} from '../utils/formatDate';

    import {goto} from '$app/navigation';

    export let readonly = false;
    export let code = '';
    export let title = '';
    export let name = '';
    export let ip;
    export let createdAt;

    const onSubmit = (e) => {
        e.preventDefault();

        fetch('/api/v1/code/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                name,
                content: code,
            }),
        }).then((resp) => {
            resp.json().then(({Data}) => {
                const {id} = Data;
                goto(`/${id}`);
            }).catch(() => {
                alert('unknown error');
            });
        }).catch(() => {
            alert('failed to sharing your code');
        });
    };
</script>

<div class="window shadow glass" class:readonly={readonly}>
    <div class="header">
        {#if readonly}
            <dl id="info">
                <dt>Title</dt>
                <dd>{title}</dd>
                <dt>Name</dt>
                <dd>{name}</dd>
                <dt>IP</dt>
                <dd>{ip}</dd>
                <dt>Created At</dt>
                <dd>{formatDate(createdAt)}</dd>
            </dl>
        {:else}
            <input type="text" id="title" placeholder="Untitled-1" bind:value={title} readonly={readonly}>
        {/if}
    </div>
    <CodeMirror readonly={readonly} bind:code={code}/>
</div>

{#if !readonly }
    <form class="controls shadow glass">
        <input type="text" id="name" placeholder="Name (optional)" bind:value={name}>
        <button type="button" id="create" on:click={onSubmit}>Create</button>
    </form>
{/if}

<style lang="scss">
    .window {
        border-radius: 0.75rem;
    }

    .window input {
        display: block;
        margin-top: 0.25rem;
        padding: 0.375rem 0.25rem;
        border: 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.25);
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        width: 100%;

        text-align: center;
        font-size: 0.875rem;

        color: rgba(255, 255, 255, 0.75);
        background: rgba(0, 0, 0, 0.2);
        outline: none;

        appearance: none;

        .dark & {
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        }
    }

    #info {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-column-gap: 0;
        grid-row-gap: 1rem;
        margin: 0.25rem auto 1rem auto;
        padding: 0.5rem 1rem;
        border: 0;
        border-radius: 6px;
        width: 100%;

        color: rgba(255, 255, 255, 0.75);
        background: rgba(0, 0, 0, 0.2);
    }

    .window input::placeholder {
        color: rgba(255, 255, 255, 0.75);
    }

    .window #editor {
        display: block;
        border: none;
        width: 100%;

        color: rgba(255, 255, 255, 0.75);

        appearance: none;
        background: transparent;
    }

    .controls {
        display: flex;
        align-content: space-between;
        gap: 1rem;
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 0.75rem;
        width: 100%;

        input {
            width: 100%;
            padding: 0 1rem;
            border: 0;
            border-radius: 6px;

            color: rgba(255, 255, 255, 0.8);
            font-size: 0.875rem;

            background: transparent;

            appearance: none;

            outline: 0;

            transition: box-shadow 0.2s;
        }

        button#create {
            padding: 0.75rem 1rem;
            border: 0;
            border-radius: 0.375rem;

            font-size: 0.875rem;

            background-color: rgba(255, 99, 99, .15);
            color: #e91e63;

            appearance: none;
            cursor: pointer;

            transition: box-shadow 0.2s;

            &:focus, &:active {
              box-shadow: 0 0 8px 2px rgba(233, 30, 99, 0.15);
            }
        }
    }
</style>
