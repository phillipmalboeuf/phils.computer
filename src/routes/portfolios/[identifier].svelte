<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`portfolios/${params.identifier}.json`)
		const { portfolio } = await res.json()

		if (res.status === 200) {
			return { portfolio }
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

  export let portfolio

  import { stores } from '@sapper/app'
	const { page, session } = stores()

  $: locale = $session.locale
</script>

<style>
  figure {
    position: relative;
    display: flex;
    align-items: center;
    height: 33vh;
    border: 1px solid var(--white);
    margin: var(--rythm) 0;
  }

  img {
    max-width: 266px;
    max-height: 133px;
    margin: 0 auto;
  }

  figcaption {
    position: absolute;
    top: 0;
    right: 0;
    padding: calc(var(--rythm)/1.666);
    color: var(--black);
    font-size: calc(var(--rythm)/1.333);
    text-align: right;
  }
</style>

<Head title={portfolio.fields.title} description={portfolio.fields.excerpt} />

<h1>{portfolio.fields.title}</h1>
<Document body={portfolio.fields.description} />

{#each portfolio.fields.projects as project (project.sys.id)}
<article>
  {#if project.fields.logo}
  <A to={project.fields.externalLink} external>
    <figure style="background-color: {project.fields.color}">
      <img src={project.fields.logo.fields.file.url} alt={project.fields.logo.fields.title} />
      <figcaption>
      {project.fields.comingSoon
        ? (locale === 'fr-CA' ? 'Bientôt' : 'Coming Soon')
        : date(project.fields.releasedDate, false, true, locale)}
      </figcaption>
    </figure>
  </A>
  {/if}
  <h4><A to={project.fields.externalLink} external>{project.fields.title}</A></h4>
  <p>{project.fields.excerpt}</p>
</article>
{/each}
