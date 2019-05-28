<script>
  import { Link } from 'svelte-routing'

  export let to = ''
  export let external = false
  export let rel
  export let underline = false
  export let current = false

  function onClick() {
    window.scrollTo(0, 0)
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

  :global(a[aria-current]) {
    font-weight: bold;
  }
</style>

{#if external}
<a href="{to}" rel={rel} target="_blank" class:underline>
  <slot />
</a>
{:else}
<Link to="{to}" on:click={onClick}>
  <span class:underline><slot /></span>
</Link>
{/if}
