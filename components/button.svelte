<script>
  import { link } from 'svelte-routing'

  export let to
  export let external
  export let disabled
  export let submit
  export let full
  export let onClick
</script>

<style>
  button, a {
    cursor: pointer;
    outline: none;
    position: relative;
    display: inline-block;

    color: var(--white);
    text-decoration: none;
    
    font-size: calc(var(--rythm)/1.333);
    font-weight: bold;
    line-height: var(--rythm);
    text-align: center;
    background-color: var(--black);

    padding: calc(var(--rythm)/2) calc(var(--rythm)*3);
    border: 1px solid var(--white);
    border-radius: var(--radius);
  }

  :hover,
  :focus {
    top: -1px;
  }

  :active {
    top: 0px;
  }

  :disabled {
    pointer-events: none;
    opacity: 0.88;
  }

  .full {
    width: 100%;
  }
</style>

{#if to}
{#if external}
<a href="{to}" target="_blank" class:full>
  <slot />
</a>
{:else}
<a href="{to}" use:link to="{to}" class:full>
  <slot />
</a>
{/if}
{:else}
<button type={submit ? 'submit' : 'button'} disabled={disabled} class:full>
  <slot />
</button>
{/if}