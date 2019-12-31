<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`cards/${params.identifier}.json`)
		const { card } = await res.json()

		if (res.status === 200) {
			return { card }
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

  export let card
</script>

<Head title={card.fields.to} />

<h1>{card.fields.to},</h1>

<Document body={card.fields.body} />

<p>🎇🥳🎉🎆</p>