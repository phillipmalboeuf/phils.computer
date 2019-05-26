<script>
  import { Link } from 'svelte-routing'

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
  :hover,
  :focus {
    top: -1px;
  }

  :active {
    top: 0px;
  }

  .underline {
    text-decoration: underline;
  }

  :global(a.current) {
    font-weight: bold;
  }
</style>

{#if external}
<a href="{to}" rel={rel} target="_blank" class:underline>
  <slot />
</a>
{:else}
<Link to="{to}" getProps={getProps}>
  <span class:underline><slot /></span>
</Link>
{/if}
