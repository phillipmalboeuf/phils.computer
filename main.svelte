<script>
  console.log('Hi! This thing\'s source can be found here: https://github.com/phillipmalboeuf/phils.computer')

  import { Router, Link, Route } from 'svelte-routing'
  import { content } from './stores/content'

  import Header from './components/header'
  import Footer from './components/footer'

  import Page from './routes/page'
  import Home from './routes/home'

  import Styles from './styles'

  export let url
</script>


{#if $content}
<Router url="{url}">
  <Header />
  <main>
    <Route path="pages/:id" component="{Page}" />
    <Route path="/"><Home /></Route>
  </main>
  <Footer />
</Router>
{/if}