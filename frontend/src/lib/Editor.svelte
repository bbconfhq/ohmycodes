<script context="module" lang="ts">
    export const prerender = true;
</script>

<script lang="ts">
    import CodeMirror from '../lib/CodeMirror.svelte';

    import {goto} from '$app/navigation';

    export let readonly = false;
    export let code = '';
    export let title = '';
    export let name = '';

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

<div class="window shadow" class:readonly={readonly}>
    <div class="header">
        <input type="text" id="title" placeholder="Untitled-1" bind:value={title} readonly={readonly}>
    </div>
    <CodeMirror readonly={readonly} bind:code={code}/>
</div>

{#if !readonly }
    <form class="controls shadow">
        <input type="text" id="name" placeholder="Name (optional)" bind:value={name}>
        <button type="button" id="create" on:click={onSubmit}>Create</button>
    </form>
{/if}

<style lang="scss">
    .window {
        padding: 1rem;
        border-radius: 0.75rem;

        background-color: rgba(0, 0, 0, 0.65);
    }

    .window input {
        display: block;
        border: 0;
        width: 100%;

        text-align: center;

        color: rgba(255, 255, 255, 0.75);
        background: transparent;
        outline: none;

        appearance: none;
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
        margin-top: 2rem;
        padding: 1rem;
        border-radius: 0.75rem;
        width: 100%;

        background-color: rgba(0, 0, 0, 0.7);

        input {
            width: 100%;
            padding: 0 1rem;
            border: 0;
            border-radius: 6px;

            color: rgba(255, 255, 255, 0.8);
            font-size: 1rem;

            background: transparent;

            appearance: none;

            outline: 0;

            transition: box-shadow 0.2s;

            &:focus, &:active {
                box-shadow: 0 0 20px 2px hsl(278deg 51% 35%);
            }
        }

        button#create {
            padding: 0.75rem 1rem;
            border: 0;
            border-radius: 0.375rem;

            font-size: 0.975rem;

            background-color: rgba(255, 99, 99, .15);
            color: #e91e63;

            appearance: none;
            cursor: pointer;

            transition: box-shadow 0.2s;

            &:focus, &:active {
              box-shadow: 0 0 9px 2px rgb(244 54 175 / 34%);
            }
        }
    }
</style>
