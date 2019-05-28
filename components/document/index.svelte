<script>
  import Node from './node'

  export let body
</script>

{#each body.content as node}
<Node node={node} />
{/each}