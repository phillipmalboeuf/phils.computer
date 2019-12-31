<script>
  import { onMount } from 'svelte'

	import Header from '../components/header'
  import Footer from '../components/footer'

	export let segment

  onMount(()=> {
    console.log('Hi! This thing\'s source can be found here: https://github.com/phillipmalboeuf/phils.computer')
  })
</script>

<style>
	:global(*, *:before, *:after) {
    box-sizing: border-box;
  }

  :global(:root) {
    --black: #000001;
    --white: #FFFFFE;
    --ash: #F2F3F2;
    --kelly: #27AE60;
    --red: #CC0000;

    --rythm: 20px;
    --gutter: calc(var(--rythm)*1.666);
    --radius: 3px;

    --big: 1888px;
    --landscape: 1242px;
    --portrait: 988px;
    --phone: 666px;
  }

  :global(html) {
    background-color: var(--black);
  }

  :global(body) {
    font-family: "Inter", sans-serif;
    font-feature-settings: "case", "ss01";
    font-size: var(--rythm);
    line-height: 1.333;
    letter-spacing: -0.014em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: var(--kelly);
    
    color: var(--black);
    background-color: var(--ash);

    margin: 0;
  }

  main {
    display: block;
    max-width: 42rem;
    margin: 0 auto;
    min-height: 88vh;
    /* padding: var(--gutter); */
    padding: calc(var(--gutter)*2) calc(var(--gutter)) calc(var(--gutter)*3.33);
  }

  @media all and (max-width:988px) {
    main {
      padding-top: calc(var(--gutter)*3.33);
      padding-left: calc(var(--gutter)/2);
    }
  }

  :global(article, form) {
    margin: var(--rythm) 0;
  }

  :global(h1, h2, h3, h4, h5, h6, p) {
    margin: 0 0 var(--rythm);
    white-space: pre-line;
  }

  :global(p:last-child) {
    margin-bottom: 0;
  }

  :global(h1, h2, h3) {
    font-size: calc(var(--rythm)*2);
    font-weight: bold;
    line-height: 1;
    letter-spacing: -0.022em;
  }

  :global(.huge, .big) {
    font-weight: bold;
    font-size: calc(var(--rythm)*4);
    line-height: 1;
  }

  :global(.big) {
    font-size: calc(var(--rythm)*3);
  }

  :global(p + h1, p + h2, p + h3,
  ul + h1, ul + h2, ul + h3,
  ol + h1, ol + h2, ol + h3) {
    margin-top: calc(var(--rythm)*2);
  }

  :global(h4, h5, h6) {
    font-size: var(--rythm);
    font-weight: bold;
    line-height: 1;
    margin-bottom: calc(var(--rythm)/2);
  }

  :global(a, button) {
    outline: none;
    cursor: pointer;
    color: inherit;
    text-decoration: none;
    position: relative;
  }

  :global(a:active, button:active) {
    top: 1px;
  }

  :global(ul, ol) {
    margin: 0 0 var(--rythm);
    padding-left: var(--rythm);
  }

  :global(small) {
    font-size: calc(var(--rythm)/1.333);
    line-height: calc(var(--rythm)/1.333);
    letter-spacing: -0.009em;
  }

  :global(code, pre) {
    font-family: monospace;
    font-size: calc(var(--rythm)/1.2);
    line-height: 1;
    white-space: pre;
  }

  :global(iframe) {
    width: 100%;
    height: 33vh;
    background-color: var(--black);
    margin: 0 0 var(--rythm);
  }

  main.cards {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

    main.cards div {
      padding: var(--gutter);
      background-color: var(--white);
      border: 7px solid var(--red);
    }

    main.cards :global(h1) {
      font-size: calc(var(--rythm)*3);
      margin-bottom: calc(var(--rythm)*1.666);
      color: var(--red);
    }
</style>

{#if segment === 'cards'}
<main class={segment}>
	<div><slot></slot></div>
</main>
{:else}
<Header />
<main>
	<slot></slot>
</main>
<Footer />
{/if}
