<script>
  import page from 'page'
  import axios from 'axios'

  import { path, content, locale } from '../main'
  
  import A from './a'
  import Navigation from './navigation'
  import Menu from './menu'

  let width = 999
  let pathname = ''

  function setLocale(l) {
    localStorage.setItem('locale', l)
    locale.set(l)

    page.base(`/${l}`)
    page.show($path)

    axios.get(`${process.env.NODE_ENV === 'production' ? '' : '//localhost:3000'}/content?locale=${l}`)
      .then(response => content.set(response.data))
  }
</script>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: calc(var(--gutter)*6);
    padding: calc(var(--gutter)*2) var(--gutter);
  }

  h1 {
    margin-bottom: calc(var(--rythm)/2);
  }

  header.right {
    left: auto;
    right: 0;
    text-align: right;
  }

  @media all and (max-width:988px) {
    header {
      position: absolute;
      padding: calc(var(--gutter)/2);
    }

    h1 {
      font-size: var(--rythm);
    }
  }

  .current {
    font-weight: bold;
  }
</style>

<svelte:window bind:innerWidth={width} />

<header>
  <h1><A to='/'>{$content.header.fields.title}</A></h1>
  {#if width > 988}
  <Navigation links={$content.header.fields.links} />
  {:else}
  <Menu links={$content.header.fields.links} />
  {/if}
</header>

<header class='right'>
  <a href='/en-US' class:current={!$locale || $locale === 'en-US'} on:click|preventDefault={e => setLocale('en-US')}>En</a>
  <a href='/fr-CA' class:current={$locale === 'fr-CA'} on:click|preventDefault={e => setLocale('fr-CA')}>Fr</a>
</header>