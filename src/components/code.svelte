<script>
  import { onMount } from 'svelte'

  import Prism from 'prismjs'
  import 'prismjs/components/prism-typescript.js'
  import 'prismjs/components/prism-jsx.js'
  import 'prismjs/components/prism-tsx.js'

  import Token from './token'


  let code = false

  function prism(node) {
    code = Prism.tokenize(node.innerText, Prism.languages.tsx)
  }
</script>

<style>
  pre {
    margin: calc(var(--rythm)*2) calc(var(--rythm)*-6.66) calc(var(--rythm)*2) calc(var(--rythm)*-3.33);
    padding: var(--rythm);
    overflow: auto;

    line-height: 1.42;
    tab-size: 2;
    hyphens: none;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;

    color: var(--white);
    background-color: var(--black);
    border-radius: var(--radius);
  }
</style>

<pre use:prism>
  {#if code}
  {#each code as token}
  <Token token={token} />
  {/each}
  {:else}
  <slot />
  {/if}
</pre>