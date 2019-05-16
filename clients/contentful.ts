import { createClient } from 'contentful'
import { Content, Header, Footer, Page, Product, Collection, Project, Portfolio, Article, Journal, Bookshelf } from '../contexts/content'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})
export default client

export const entries = (locale: string): Promise<Content> => Promise.all([
  client.getEntries<Header>({ content_type: 'header', locale, include: 3 }),
  client.getEntries<Footer>({ content_type: 'footer', locale, include: 3 }),
  client.getEntries<Page>({ content_type: 'page', locale, include: 2 }),
  client.getEntries<Product>({ content_type: 'product', locale }),
  client.getEntries<Collection>({ content_type: 'collection', locale }),
  client.getEntries<Project>({ content_type: 'project', locale }),
  client.getEntries<Portfolio>({ content_type: 'portfolio', locale }),
  client.getEntries<Article>({ content_type: 'article', locale }),
  client.getEntries<Journal>({ content_type: 'journal', locale }),
  client.getEntries<Bookshelf>({ content_type: 'bookshelf', locale })
]).then(async ([headers, footers, pages, products, collections, projects, portfolios, articles, journals, bookshelfs])=> {
  return {
    header: headers.items[0],
    footer: footers.items[0],
    pages,
    products,
    collections,
    projects,
    portfolios,
    articles,
    journals,
    bookshelfs
  }
})