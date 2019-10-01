<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`collections/${params.identifier}.json`)
		const { collection } = await res.json()

		if (res.status === 200) {
			return { collection }
		} else {
			this.error(res.status)
		}
	}
</script>

<script>
  import { date } from '../../helpers/formatters'

	import Head from '../../components/head'
  import A from '../../components/a'
  import Document from '../../components/document'
  import Products from '../../components/products'

  export let collection
</script>

<Head title={collection.fields.title} description={collection.fields.excerpt} />

<h1>{collection.fields.title}</h1>
<Document body={collection.fields.description} />
<Products products={collection.fields.products} />