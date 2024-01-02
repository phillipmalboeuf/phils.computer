
<script>
  import { stores } from '@sapper/app'
	const { page } = stores()

  import A from './a'

  export let links = []
</script>

<style>
  nav > nav {
    padding-left: calc(var(--rythm)/2);
  }
</style>

<nav>
  {#each links as link (link.sys.id)}
  {#if link.fields.internalLink}
  <A to="{`${link.fields.internalLink.sys.contentType.sys.id}s/${link.fields.internalLink.fields.identifier}`}" current={$page.path === `/${link.fields.internalLink.sys.contentType.sys.id}s/${link.fields.internalLink.fields.identifier}`}>
    {link.fields.label}
  </A>
  {:else if link.fields.externalLink}
  <A to="{link.fields.externalLink}" external rel="me">
    {link.fields.label}
  </A>
  {/if}
  <br />
  {#if link.fields.subLinks}
  <svelte:self links={link.fields.subLinks} />
  {/if}
  {/each}
</nav>