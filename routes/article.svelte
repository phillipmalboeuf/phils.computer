<script>
  import { rich, date } from '../helpers/formatters'
  import { content, locale } from '../stores/content'

  import A from '../components/a'
  import Document from '../components/document'

  export let id
  export let journal_id
  $: article = $content.articles.items.find(article => article.fields.identifier === id)
  $: journal = $content.journals.items.find(journal => journal.fields.identifier === journal_id)
</script>

<h1>{article.fields.title}</h1>
<p>
  {article.fields.excerpt}<br />
  <small>{date(article.fields.publishedDate, undefined, undefined, $locale)}{article.fields.ongoing && ($locale === 'fr-CA' ? ' – En continue' : ' – Ongoing')}</small>
</p>
<article>
  <Document body={article.fields.body} />
</article>

<br />
<br />
{#if journal}
<A to={`/journals/${journal.fields.identifier}`}><strong>← Back to {journal.fields.title}</strong></A>
{/if}