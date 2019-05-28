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

  @media all and (max-width:666px) {
    center {
      text-align: left;
      padding-top: calc(var(--gutter)/2);
    }
  }
</style>

<footer>
  <Flex spaced middle thirds>
    <Navigation links={$content.footer.fields.links} />
    <center><strong>{$content.footer.fields.tagline}</strong><br />{$content.footer.fields.copyright}</center>
    <div />
  </Flex>
</footer>