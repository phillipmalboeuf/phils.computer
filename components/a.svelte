<script>
  import { link } from 'svelte-routing'

  export let to = ''
  export let external = false
  export let rel
  export let underline = false
  export let current = false

  function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
    return isPartiallyCurrent ? { class: "current" } : {}
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
<a href="{to}" use:link to="{to}" class:underline class:current>
  <slot />
</a>
{/if}
