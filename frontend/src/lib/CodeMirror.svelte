<script lang="ts">
    import hljs from 'highlight.js';
    import {onMount} from 'svelte';

    import 'codemirror/lib/codemirror.css';
    import 'codemirror/theme/material-darker.css';
    import {debounce} from '../utils/debounce';
    import {sleep} from '../utils/sleep';

    export let readonly = false;
    export let tab = true;
    export let code = '';

    let CodeMirror;
    let editor;
    let textareaRef;
    let first = true;
    let destroyed = false;

    const langmode = {
        'html': 'text/html',
        'xml': 'text/html',
        'scss': 'text/x-scss',
        'less': 'text/x-less',
        'markdown': 'text/x-markdown',
        'c': 'text/x-csrc',
        'arduino': 'text/x-c++src',
        'cpp': 'text/x-c++src',
        'csharp': 'text/x-csharp',
        'java': 'text/x-java',
        'kotlin': 'text/x-kotlin',
        'scala': 'text/x-scala',
        'rust': 'text/x-rustsrc',
        'sql': 'text/x-sql',
        'pgsql': 'text/x-sql',
        'n1ql': 'text/x-sql',
        'typescript': 'text/typescript',
    };

    onMount(() => {
        (async () => {
            CodeMirror = await import('codemirror');
            await import('codemirror/addon/mode/simple');
            await import('codemirror/mode/clike/clike');
            await import('codemirror/mode/css/css');
            await import('codemirror/mode/django/django');
            await import('codemirror/mode/dockerfile/dockerfile');
            await import('codemirror/mode/htmlmixed/htmlmixed');
            await import('codemirror/mode/javascript/javascript');
            await import('codemirror/mode/python/python');
            await import('codemirror/mode/go/go');
            await import('codemirror/mode/rust/rust');
            await import('codemirror/mode/sass/sass');
            await import('codemirror/mode/shell/shell');
            await import('codemirror/mode/sql/sql');
            await import('codemirror/mode/toml/toml');
            await import('codemirror/mode/vue/vue');
            await import('codemirror/mode/markdown/markdown');
            await import('codemirror/mode/ruby/ruby');
            await import('codemirror/mode/gfm/gfm');
            await createEditor('gfm');
            if (editor) editor.setValue(code || '');
        })();
        return () => {
            if (editor) editor.toTextArea();
        };
    });

    async function createEditor(mode) {
        if (editor || destroyed) {
            return;
        }
        const opts = {
            theme: 'material-darker',
            lineNumbers: true,
            indentWithTabs: true,
            indentUnit: 2,
            tabSize: 2,
            value: '',
            mode: langmode[mode] ?? mode,
            readOnly: readonly,
            autoCloseBrackets: true,
            autoCloseTags: true,
            extraKeys: {
                Enter: 'newlineAndIndentContinueMarkdownList',
                'Ctrl-/': 'toggleComment',
                'Cmd-/': 'toggleComment',
            },
            foldGutter: true,
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
        };
        if (!tab) {
            opts.extraKeys['Tab'] = tab;
            opts.extraKeys['Shift-Tab'] = tab;
        }
        if (first) {
            await sleep(50);
        }
        editor = CodeMirror.fromTextArea(textareaRef, opts);
        editor.on('change', debounce(instance => {
            const value = instance.getValue();
            const {language} = hljs.highlightAuto(value);
            editor.setOption('mode', langmode[language] ?? language);
        }, 500));
        editor.on('change', instance => {
            code = instance.getValue();
        });
        if (first) await sleep(50);
        editor.refresh();
        first = false;
    }
</script>

<textarea
        bind:this={textareaRef}
        readonly
        value={code}
></textarea>

<style>
    textarea {
        display: block;
        border: none;
        width: 100%;

        color: rgba(255, 255, 255, 0.75);

        appearance: none;
        background: transparent;
    }
</style>
