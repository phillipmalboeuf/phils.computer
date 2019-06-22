<script>
  import { scale, fade } from 'svelte/transition'
  import { elasticOut } from 'svelte/easing'

  import Button from './button'

  export let visible = false
  export let button

  let origin = {
    x: 0.5,
    y: 0.5
  }

  function hide() {
    visible = false
  }

  function toggle(e) {
    visible = !visible
  }
</script>

<style>
  aside {
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 666;

    width: 100vw;
    height: 100vh;
    overflow-y: auto;
  }

  @media all and (max-width:988px) {
    aside {
      align-items: flex-start;
    }

    div {
      margin-top: var(--rythm);
    }
  }

  aside > button {
    position: relative;
    display: inline-block;
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    z-index: -1;

    background: var(--white);
    opacity: 0.666;
    border: none;
  }

  div {
    position: relative;
    width: 100%;
    max-width: calc(var(--rythm)*30);
    padding: calc(var(--rythm)*2);

    font-size: calc(var(--rythm)/1.1);
    color: var(--white);
    background-color: var(--black);
    border: 2px solid var(--white);
    border-radius: var(--radius);
  }

  div > button:first-of-type {
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
    padding: calc(var(--rythm)/1.666);

    font-size: var(--rythm);
    font-weight: bold;
    background: transparent;
    border: none;
  }
</style>

{#if button}
<Button on:click={toggle}>{button}</Button>
{/if}
{#if visible}
<aside transition:fade={{ duration: 333 }}>
  <button on:click|preventDefault={hide} />
  <div in:scale={{ duration: 1666, start: 0.98, easing: elasticOut }} style="{`transform-origin: ${origin.x*100}% ${origin.y*100}%`}">
    <button on:click|preventDefault={hide}>✕</button>
    <slot />
  </div>
</aside>
{/if}