<script>
  import { rich, date } from '../helpers/formatters'
  import { content, locale } from '../stores/content'

  import A from '../components/a'
  import Products from '../components/products'

  export let id
  $: collection = $content.collections.items.find(collection => collection.fields.identifier === id)
</script>

<h1>{collection.fields.title}</h1>
{@html rich(collection.fields.description)}
<Products products={collection.fields.products} />