<script>
  import { content } from '../stores/content'

  import Flex from './flex'
  import Navigation from './navigation'
</script>

<style>
  footer {
    padding: var(--gutter);
    color: var(--white);
    background-color: var(--black);
  }
</style>

<footer>
  <Flex spaced middle>
    <Navigation links={$content.footer.fields.links} />
    <center><strong>{$content.footer.fields.tagline}</strong><br />{$content.footer.fields.copyright}</center>
    <div />
  </Flex>
</footer>