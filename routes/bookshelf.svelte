<script>
  import { date } from '../helpers/formatters'
  import { content, locale } from '../main'

  import A from '../components/a'
  import Document from '../components/document'
  import Products from '../components/products'

  export let id
  $: bookshelf = $content.bookshelfs.items.find(bookshelf => bookshelf.fields.identifier === id)
</script>

<h1>{bookshelf.fields.title}</h1>

{#each bookshelf.fields.books as book}
<A to={book.fields.externalLink} external>{book.fields.title}</A><br />
{/each}

<br /><br />
<A to={'/pages/books'} underline current>← Back to books</A>