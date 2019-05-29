<script>
  console.log('Hi! This thing\'s source can be found here: https://github.com/phillipmalboeuf/phils.computer')

  import page from 'page'
  import axios from 'axios'

  import { content as contentStore, locale as localeStore } from './stores/content'
  import { current } from './stores/pages'

  import Header from './components/header'
  import Footer from './components/footer'

  import Bookshelf from './routes/bookshelf'
  import Article from './routes/article'
  import Journal from './routes/journal'
  import Collection from './routes/collection'
  import Portfolio from './routes/portfolio'
  import Page from './routes/page'
  import Thanks from './routes/thanks'
  import Home from './routes/home'

  import Styles from './styles'

  export let url
  export let locale
  export let content

  let component


  localeStore.set(locale)
  contentStore.set(content)


  function pages(target) {
    if (locale) {
      page.base(`/${locale}`)
    }

    page('*', (ctx, next)=> {
      // console.log(ctx)
      if (component) { component.$destroy() }
      current.set(ctx.page.current)
      next()
    })
    
    page('/', ({ params })=> component = new Home({ target, props: params, intro: true }))
    page('/bookshelfs/:id', ({ params })=> component = new Bookshelf({ target, props: params, intro: true }))
    page('/journals/:journal_id/articles/:id', ({ params })=> component = new Article({ target, props: params, intro: true }))
    page('/journals/:id', ({ params })=> component = new Journal({ target, props: params, intro: true }))
    page('/collections/:id', ({ params })=> component = new Collection({ target, props: params, intro: true }))
    page('/portfolios/:id', ({ params })=> component = new Portfolio({ target, props: params, intro: true }))
    page('/pages/:id', ({ params })=> component = new Page({ target, props: params, intro: true }))
    page('/thanks', ({ params })=> component = new Thanks({ target, props: params, intro: true }))

    page.start({ click: false })
  }
</script>


<svelte:head>
</svelte:head>

{#if $contentStore}
<Header />
<main use:pages />
<Footer />
{/if}