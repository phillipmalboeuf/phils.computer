<script>
  console.log('Hi! This thing\'s source can be found here: https://github.com/phillipmalboeuf/phils.computer')

  import { Router, Link, Route } from 'svelte-routing'
  import { content } from './stores/content'

  import Header from './components/header'
  import Footer from './components/footer'

  import Bookshelf from './routes/bookshelf'
  import Article from './routes/article'
  import Journal from './routes/journal'
  import Collection from './routes/collection'
  import Portfolio from './routes/portfolio'
  import Page from './routes/page'
  import Home from './routes/home'

  import Styles from './styles'

  export let url
</script>


{#if $content}
<Router url="{url}">
  <Header />
  <main>
    <Route path="bookshelfs/:id" component="{Bookshelf}" />
    <Route path="journals/:journal_id/articles/:id" component="{Article}" />
    <Route path="journals/:id" component="{Journal}" />
    <Route path="collections/:id" component="{Collection}" />
    <Route path="portfolios/:id" component="{Portfolio}" />
    <Route path="pages/:id" component="{Page}" />
    <Route path="/"><Home /></Route>
  </main>
  <Footer />
</Router>
{/if}