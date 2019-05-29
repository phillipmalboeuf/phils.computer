<script>
  import page from 'page'

  import { current } from '../stores/pages'
  import { locale } from '../stores/content'

  export let to = ''
  export let external = false
  export let rel
  export let underline = false

  function onClick() {
    window.scrollTo(0, 0)
    page.show(to)
  }
</script>

<style>
  .underline {
    background-image: linear-gradient(var(--kelly), var(--kelly));
    background-repeat: no-repeat;
    background-size: 100% .66em;
    background-position: left 0 bottom -66.6%;
  }

  :global(article) .underline {
    background: none;
    text-decoration: underline;
  }

  .current {
    font-weight: bold;
  }
</style>

{#if external}
<a href="{to}" rel={rel} target="_blank" class:underline>
  <slot />
</a>
{:else}
<a href="{to}" class:underline on:click|preventDefault={onClick} class:current={$current === to}>
  <slot />
</a>
{/if}
