import { createClient } from 'contentful'


const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})
export default client

export const entries = (locale) => Promise.all([
  client.getEntries({ content_type: 'header', locale, include: 3 }),
  client.getEntries({ content_type: 'footer', locale, include: 3 }),
  client.getEntries({ content_type: 'page', locale, include: 2 }),
  client.getEntries({ content_type: 'product', locale }),
  client.getEntries({ content_type: 'collection', locale }),
  client.getEntries({ content_type: 'project', locale }),
  client.getEntries({ content_type: 'portfolio', locale }),
  client.getEntries({ content_type: 'article', locale }),
  client.getEntries({ content_type: 'journal', locale }),
  client.getEntries({ content_type: 'bookshelf', locale })
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