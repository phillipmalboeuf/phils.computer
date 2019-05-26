<script>
  export let center = false
  export let spaced = false
  export let middle = false
</script>

<style>
  div {
    display: flex;
    flex-wrap: wrap;
  }

  .center { justify-content: center; }
  .spaced { justify-content: space-between; }
  .middle { align-items: center; }
</style>

<div class:center class:spaced class:middle><slot /></div>