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

  h1 {
    margin-bottom: calc(var(--rythm)/2);
  }

  header.right {
    left: auto;
    right: 0;
    text-align: right;
  }

  @media all and (max-width:988px) {
    header {
      position: absolute;
      padding: calc(var(--gutter)/2);
    }

    h1 {
      font-size: var(--rythm);
    }
  }
</style>

<header>
  <h1><A to='/'>{$content.header.fields.title}</A></h1>
  <Navigation links={$content.header.fields.links} />
</header>

<header class='right'>
  En Fr
</header>