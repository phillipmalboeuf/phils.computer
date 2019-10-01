<script>
  export let to = ''
  export let external = false
  export let rel = undefined
  export let current = undefined
  export let underline = undefined

  // function onClick(e) {
  //   window.scrollTo(0, 0)
  //   e.currentTarget.blur()
  //   page.show(to)
  // }
</script>

<style>
  a {
    position: relative;
  }
  
  a:hover,
  a:focus {
    top: -1px;
  }

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
<a href="{to}" rel={rel} target="_blank" class:underline><slot /></a>
{:else}
<a href="{to}" class:underline class:current><slot /></a>
{/if}
