<script>
  import A from '../a'

  export let mark
</script>

{#if mark.nodeType === 'text'}
{#if mark.marks.length > 0}
  {#if mark.marks[0].type === 'italic'}
  <em><svelte:self mark={{ ...mark, marks: mark.marks.slice(1) }} /></em>
  {:else if mark.marks[0].type === 'bold'}
  <strong><svelte:self mark={{ ...mark, marks: mark.marks.slice(1) }} /></strong>
  {:else if mark.marks[0].type === 'code'}
  <code><svelte:self mark={{ ...mark, marks: mark.marks.slice(1) }} /></code>
  {/if}
{:else}
{mark.value}
{/if}
{:else if mark.nodeType === 'hyperlink'}
<A to="{mark.data.uri}" external underline>{#each mark.content as mark}<svelte:self mark={mark} />{/each}</A>
{:else if mark.nodeType === 'entry-hyperlink'}
<A to="{mark.data.target.sys.contentType.sys.id}s/{mark.data.target.fields.identifier}" underline>{#each mark.content as mark}<svelte:self mark={mark} />{/each}</A>
{:else if mark.nodeType === 'asset-hyperlink'}
<A to="{mark.data.target.fields.file.url}" external underline>
  {#each mark.content as mark}<svelte:self mark={mark} />{/each}
</A>
{/if}