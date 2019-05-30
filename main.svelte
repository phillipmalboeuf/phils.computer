<script context="module">
  import { writable } from 'svelte/store'
  
  export const path = writable(undefined)
  export const locale = writable(undefined)
  export const content = writable(undefined)
</script>

<script>
  console.log('Hi! This thing\'s source can be found here: https://github.com/phillipmalboeuf/phils.computer')

  import { tick } from 'svelte'
  import page from 'page'
  import axios from 'axios'

  import Header from './components/header'
  import Footer from './components/footer'

  import Bookshelf from './routes/bookshelf'
  import Article from './routes/article'
  import Journal from './routes/journal'
  import Collection from './routes/collection'
  import Portfolio from './routes/portfolio'
  import Page from './routes/page'
  import Thanks from './routes/thanks'
  import Home from './routes/home'

  export let defaultPath
  export let defaultLocale
  export let defaultContent

  path.set(defaultPath)
  locale.set(defaultLocale)
  content.set(defaultContent)

  let component

  function pages(target) {
    if (defaultLocale) {
      page.base(`/${defaultLocale}`)
    }

    page('*', (ctx, next)=> {
      if (component) { component.$destroy() }
      path.set(ctx.page.current)
      next()
    })
    
    page('/', ({ params })=> component = new Home({ target, props: params, intro: true }))
    page('/bookshelfs/:id', ({ params })=> component = new Bookshelf({ target, props: params, intro: true }))
    page('/journals/:journal_id/articles/:id', ({ params })=> component = new Article({ target, props: params, intro: true }))
    page('/journals/:id', ({ params })=> component = new Journal({ target, props: params, intro: true }))
    page('/collections/:id', ({ params })=> component = new Collection({ target, props: params, intro: true }))
    page('/portfolios/:id', ({ params })=> component = new Portfolio({ target, props: params, intro: true }))
    page('/pages/:id', ({ params })=> component = new Page({ target, props: params, intro: true }))
    page('/thanks', ({ params })=> component = new Thanks({ target, props: params, intro: true }))

    page.start({ click: false })
  }
</script>



{#await tick then }
<Header />
<main use:pages />
<Footer />
{/await}



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

  :global(main) {
    display: block;
    max-width: 42rem;
    margin: 0 auto;
    min-height: 88vh;
    padding: var(--gutter);
    padding: calc(var(--gutter)*2) calc(var(--gutter)) calc(var(--gutter)*3.33);
  }

  @media all and (max-width:988px) {
    :global(main) {
      padding-top: calc(var(--gutter)*3.33);
      padding-left: calc(var(--gutter)/2);
    }
  }

  :global(article, form) {
    margin: var(--rythm) 0;
  }

  :global(h1, h2, h3, h4, h5, h6, p) {
    white-space: pre-line;
    margin: 0 0 var(--rythm);
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
</style>