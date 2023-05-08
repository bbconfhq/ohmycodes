<script lang="ts">
  import hljs from 'highlight.js';
  import {createEventDispatcher, onMount} from 'svelte';

  import 'codemirror/lib/codemirror.css';
  import 'codemirror-github-light/lib/codemirror-github-light-theme.css';
  import { debounce } from '../utils/debounce';

  import {langmode, supportedLanguages} from './language';


  export let readonly = false;
  export let tab = true;
  export let code = '';
  export let language = 'auto';

  const dispatch = createEventDispatcher();

  const onLanguageChange = (language: string) => {
    dispatch('languageChange', { language: language ?? '' });
  };


  let CodeMirror;
  let editor;
  let textareaRef;
  let destroyed = false;

  onMount(() => {
    (async () => {
      CodeMirror = await import('codemirror');
      await import('codemirror/addon/mode/simple');
      await import('codemirror/addon/scroll/simplescrollbars.css');
      await import('codemirror/addon/scroll/simplescrollbars');
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
      theme: 'github-light',
      lineNumbers: true,
      indentWithTabs: true,
      indentUnit: 2,
      tabSize: 2,
      value: '',
      mode: langmode[mode] ?? mode,
      scrollbarStyle: 'overlay',
      readOnly: readonly,
      autoCloseBrackets: true,
      autoCloseTags: true,
      extraKeys: {
        Enter: 'newlineAndIndentContinueMarkdownList',
        'Ctrl-/': 'toggleComment',
        'Cmd-/': 'toggleComment'
      },
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
    };
    if (!tab) {
      opts.extraKeys['Tab'] = tab;
      opts.extraKeys['Shift-Tab'] = tab;
    }
    editor = CodeMirror.fromTextArea(textareaRef, opts);
    editor.on(
      'change',
      debounce((instance) => {
        if (language !== 'auto') {
          return;
        }
        const value = instance.getValue();
        const { language: detectedLanguage} = hljs.highlightAuto(value, supportedLanguages);
        onLanguageChange(detectedLanguage);
        editor.setOption('mode', langmode[detectedLanguage] ?? detectedLanguage);
      }, 500)
    );
    editor.on('change', (instance) => {
      code = instance.getValue();
    });
    editor.refresh();
  }

  $: {
    if (editor != null) {
      if (language !== 'auto') {
        editor.setOption('mode', langmode[language] ?? langmode);
      } else {
        const {language: detectedLanguage} = hljs.highlightAuto(code, supportedLanguages);
        onLanguageChange(detectedLanguage);
        editor.setOption('mode', langmode[detectedLanguage] ?? detectedLanguage);
      }
    }
  }
</script>

<textarea bind:this={textareaRef} readonly value={code} />

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
