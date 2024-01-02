<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`journals/${params.journal}/articles/${params.identifier}.json`)
		const { article, journal } = await res.json()

		if (res.status === 200) {
			return { article, journal }
		} else {
			this.error(res.status)
		}
	}
</script>

<script>
  import { date } from '../../../../helpers/formatters'

  import Head from '../../../../components/head'
  import A from '../../../../components/a'
  import Document from '../../../../components/document'

  export let article
  export let journal

  import { stores } from '@sapper/app'
	const { page, session } = stores()

  $: locale = $session.locale
</script>

<Head title={article.fields.title} description={article.fields.excerpt} />

<h1>{article.fields.title}</h1>
<p>
  {article.fields.excerpt}<br />
  <small>{date(article.fields.publishedDate, undefined, undefined, locale)}{article.fields.ongoing ? (locale === 'fr-CA' ? ' – En continue' : ' – Ongoing') : ''}</small>
</p>
<article>
  <Document body={article.fields.body} />
</article>

<br />
<br />
{#if journal}
<A to={`journals/${journal.fields.identifier}`}><strong>← Back to {journal.fields.title}</strong></A>
{/if}