<script>
  export let token
</script>

<style>
  .comment,
  .block-comment,
  .prolog,
  .doctype,
  .cdata {
    color: #608B4E;
  }

  .punctuation {
    color: #ccc;
  }

  .tag,
  .namespace,
  .deleted {
    color: #4EC9B0;
  }

  .attr-name {
    color: #9CDCFE;
  }

  .function-name {
    color: #6196cc;
  }

  .boolean {
    color: #569CD6;
  }
  .number {
    color: #B5CEA8;
  }
  .function {
    color: #DCDCAA;
  }

  .property,
  .constant,
  .symbol {
    color: #f8c555;
  }

  .class-name {
    color: #4EC9B0;
  }

  .selector,
  .important,
  .atrule,
  .keyword,
  .builtin {
    color: #C586C0;
  }

  .string,
  .char,
  .attr-value,
  .regex,
  .variable {
    color: #CE9169;
  }

  .operator {
    color: #D4D4D4;
  }
  .entity,
  .url {
    color: #67cdcc;
  }

  .important,
  .bold {
    font-weight: bold;
  }
  .italic {
    font-style: italic;
  }

  .entity {
    cursor: help;
  }

  .inserted {
    color: green;
  }
</style>

{#if token.content}
{#if Array.isArray(token.content)}
{#each token.content as t}
<span class="{token.type}"><svelte:self token={t} /></span>
{/each}
{:else}
<span class="{token.type}">{token.content}</span>
{/if}
{:else}
{token}
{/if}