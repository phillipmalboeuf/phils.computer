<script>
  import { rich, date, money } from '../helpers/formatters'
  import { content, locale } from '../stores/content'

  import A from '../components/a'
  import Flex from '../components/flex'
  import Button from '../components/button'

  export let products = []
</script>

<style>
  article {
    padding: calc(var(--rythm)*1.333);
    border: 1px solid var(--white);
    border-radius: var(--radius);
  }

  h4 {
    margin-bottom: calc(var(--rythm)/2);
  }
</style>

{#each products as product (product.sys.id)}
<article>
  <Flex spaced>
    <div><h4>{product.fields.title}</h4></div>
    <small>{product.fields.getInTouch ? 'tbd' : money(product.fields.price, 'CAD')} / {product.fields.type}</small>
  </Flex>
  <p>{product.fields.excerpt}</p>
  {#if product.fields.getInTouch}
  <Button to='mailto:phil@phils.computer' external>{product.fields.cta || 'Get in Touch'}</Button>
  {:else}
  <Button>{product.fields.cta || 'Add to Cart'}</Button>
  {/if}
</article>
{/each}
