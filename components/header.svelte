<script>
  import { content } from '../stores/content'
  
  import A from './a'
  import Navigation from './navigation'
</script>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: calc(var(--gutter)*6);
    padding: calc(var(--gutter)*2) var(--gutter);
  }

  header.right {
    left: auto;
    right: 0;
    text-align: right;
  }
</style>

<header>
  <h1><A to='/'>{$content.header.fields.title}</A></h1>
  <Navigation links={$content.header.fields.links} />
</header>

<header class='right'>
  En Fr
</header>