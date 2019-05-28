<script>
  export let center = false
  export let spaced = false
  export let middle = false

  export let thirds = false
  export let quarters = false
</script>

<style>
  div {
    display: flex;
    flex-wrap: wrap;
  }

  .center { justify-content: center; }
  .spaced { justify-content: space-between; }
  .middle { align-items: center; }

  .thirds > :global(*) { width: 33.3% }
  .quarters > :global(*) { width: 25% }

  @media all and (max-width:666px) {
    .thirds > :global(*) { width: 100% }
    .quarters > :global(*) { width: 50% }
  }
</style>

<div class:center class:spaced class:middle class:thirds class:quarters><slot /></div>