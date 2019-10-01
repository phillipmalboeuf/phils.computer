<script>
  import { spring } from 'svelte/motion'
  
  import A from './a'
  import Navigation from './navigation'

  export let links = []

  let visible = false

  function toggle() {
    visible = !visible
    x.set(visible ? -88 : 0)
  }

  let x = spring(0, {
		stiffness: 0.1,
		damping: 0.42
	})
</script>

<style>
  div {
    position: fixed;
    z-index: 66;
    width: 50vw;
    top: 33vh;
    left: 100vw;

    padding: calc(var(--gutter)/2);
    color: var(--white);
    background-color: var(--black);
    border: 1px solid var(--white);
    border-right: 0;
    border-radius: var(--radius);

    will-change: transform;
    transform: translateX(0);
    /* transition: transform 0.666s cubic-bezier(0, 1.33, 1, 1); */
  }

  /* div.visible {
    transform: translateX(-88%);
  } */

  button {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 100%;

    font-size: calc(var(--rythm)/1.333);
    padding: calc(var(--gutter)/8.8) calc(var(--gutter)/4);
    border: 1px solid var(--white);
    border-bottom: 0;
    border-radius: var(--radius);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: var(--black);
    transform-origin: 100% 100%;
    transform: rotate(-90deg);
  }
</style>


<div style={`transform: translateX(${$x}%)`} on:click|preventDefault={()=> toggle()}>
  <button>{#if visible}Close{:else}Menu{/if}</button>
  <Navigation links={links} />
</div>
