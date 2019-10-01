<script>
  import { stores } from '@sapper/app'
	const { page, session } = stores()

  import Flex from './flex'
  import Navigation from './navigation'

  $: footer = $session.navigation.footer
  $: locale = $session.locale
</script>

<style>
  footer {
    padding: var(--gutter);
    color: var(--white);
    background-color: var(--black);
  }

  @media all and (max-width:666px) {
    center {
      text-align: left;
      padding-top: calc(var(--gutter)/2);
    }
  }
</style>

<footer>
  <Flex spaced middle thirds>
    <Navigation links={footer.fields.links} />
    <center><strong>{footer.fields.tagline}</strong><br />{footer.fields.copyright}</center>
    <div />
  </Flex>
</footer>