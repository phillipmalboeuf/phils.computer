<script>
  import { rich, date } from '../helpers/formatters'
  import { content, locale } from '../stores/content'

  import A from '../components/a'

  export let id
  $: journal = $content.journals.items.find(journal => journal.fields.identifier === id)
</script>

{#each journal.fields.articles as article (article.sys.id)}
<article>
  <h2><A to={`/journals/${journal.fields.identifier}/articles/${article.fields.identifier}`}>{article.fields.title}</A></h2>
  <p>
    {article.fields.excerpt}<br />
    <small>{date(article.fields.publishedDate, undefined, undefined, $locale)}{article.fields.ongoing && ($locale === 'fr-CA' ? ' – En continue' : ' – Ongoing')}</small>
  </p>
</article>
{/each}