<script>
  import { stores } from '@sapper/app'
	const { page, session } = stores()

  export let title
  export let description = undefined

  $: header = $session.navigation.header
  $: locale = $session.locale
</script>

<svelte:head>
	<title>{title} – {header.fields.title}</title>
  {#if description}
  <meta name='description' content={description} />
  {/if}
</svelte:head>