<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`bookshelves/${params.identifier}.json`)
		const { bookshelf } = await res.json()

		if (res.status === 200) {
			return { bookshelf }
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

  export let bookshelf
</script>

<Head title={bookshelf.fields.title} />

<h1>{bookshelf.fields.title}</h1>

{#each bookshelf.fields.books as book}
<A to={book.fields.externalLink} external>{book.fields.title}</A><br />
{/each}

<br /><br />
<A to={'pages/books'} underline current>← Back to books</A>