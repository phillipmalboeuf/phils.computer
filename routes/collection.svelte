<script>
  import { date } from '../helpers/formatters'
  import { content, locale } from '../main'

  import A from '../components/a'
  import Document from '../components/document'
  import Products from '../components/products'

  export let id
  $: collection = $content.collections.items.find(collection => collection.fields.identifier === id)
</script>

<h1>{collection.fields.title}</h1>
<Document body={collection.fields.description} />
<Products products={collection.fields.products} />