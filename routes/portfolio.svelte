<script>
  import { rich, date } from '../helpers/formatters'
  import { content, locale } from '../stores/content'

  import A from '../components/a'
  import Document from '../components/document'

  export let id
  $: portfolio = $content.portfolios.items.find(portfolio => portfolio.fields.identifier === id)
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

<h1>{portfolio.fields.title}</h1>
<Document body={portfolio.fields.description} />

{#each portfolio.fields.projects as project (project.sys.id)}
<article>
  {#if project.fields.logo}
  <A to={project.fields.externalLink} external>
    <figure style="background-color: {project.fields.color }">
      <img src={project.fields.logo.fields.file.url} alt={project.fields.logo.fields.title} />
      <figcaption>
      {project.fields.comingSoon
        ? ($locale === 'fr-CA' ? 'Bientôt' : 'Coming Soon')
        : date(project.fields.releasedDate, false, true, locale)}
      </figcaption>
    </figure>
  </A>
  {/if}
  <h4><A to={project.fields.externalLink} external>{project.fields.title}</A></h4>
  <p>{project.fields.excerpt}</p>
</article>
{/each}
