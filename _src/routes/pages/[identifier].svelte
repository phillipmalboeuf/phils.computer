<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`pages/${params.identifier}.json`)
		const { page } = await res.json()

		if (res.status === 200) {
			return { page }
		} else {
			this.error(res.status)
		}
	}
</script>

<script>
	import Head from '../../components/head'
  import Document from '../../components/document'

  export let page
</script>

<Head title={page.fields.title} description={page.fields.excerpt} />
<Document body={page.fields.body} />