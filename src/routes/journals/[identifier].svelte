<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`journals/${params.identifier}.json`)
		const { journal } = await res.json()

		if (res.status === 200) {
			return { journal }
		} else {
			this.error(res.status)
		}
	}
</script>

<script>
  import { date } from '../../helpers/formatters'

  import A from '../../components/a'

  export let journal

  import { stores } from '@sapper/app'
	const { page, session } = stores()

  $: locale = $session.locale
</script>

{#each journal.fields.articles as article (article.sys.id)}
<article>
  <h2><A to={`journals/${journal.fields.identifier}/articles/${article.fields.identifier}`}>{article.fields.title}</A></h2>
  <p>
    {article.fields.excerpt}<br />
    <small>{date(article.fields.publishedDate, undefined, undefined, locale)}{article.fields.ongoing ? (locale === 'fr-CA' ? ' – En continue' : ' – Ongoing') : ''}</small>
  </p>
</article>
{/each}