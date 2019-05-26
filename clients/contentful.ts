import { createClient } from 'contentful'

import { EntryCollection, Entry, Asset } from 'contentful'
import { Document } from '@contentful/rich-text-types'

export interface Page {
  title: string
  identifier: string
  excerpt: string
  body: Document
}

export interface Product {
  title: string
  identifier: string
  excerpt: string
  description: Document
  type: string
  getInTouch: string
  cta: string
  price: number
  defaultQuantity: number
  datesRules: string
  excludedDates: string[]
}

export interface Collection {
  title: string
  identifier: string
  description: Document
  excerpt: string
  products: Entry<Product>[]
}

export interface Project {
  title: string
  identifier: string
  excerpt: string
  externalLink: string
  releasedDate: Date
  description: Document
  logo: Asset
  color: string
  comingSoon: boolean
}

export interface Portfolio {
  title: string
  identifier: string
  excerpt: string
  description: Document
  projects: Entry<Project>[]
}

export interface Article {
  title: string
  identifier: string
  excerpt: string
  publishedDate: Date
  ongoing: boolean
  body: Document
}

export interface Journal {
  title: string
  identifier: string
  excerpt: string
  articles: Entry<Article>[]
}

export interface Book {
  title: string
  identifier: string
  excerpt: string
  externalLink: string
}

export interface Bookshelf {
  title: string
  identifier: string
  excerpt: string
  books: Entry<Book>[]
}

export interface Link {
  label: string
  internalLink: Entry<Page | Project | Portfolio | Article | Journal>
  externalLink: string
  emphasize: boolean
  subLinks: Entry<Link>[]
}

export interface Header {
  title: string
  tagline: Document
  introduction: Document
  links: Entry<Link>[]
}

export interface Footer {
  copyright: string
  tagline: string
  links: Entry<Link>[]
}

export interface Content {
  header: Entry<Header>
  footer: Entry<Footer>
  pages: EntryCollection<Page>
  products: EntryCollection<Product>
  collections: EntryCollection<Collection>
  projects: EntryCollection<Project>
  portfolios: EntryCollection<Portfolio>
  articles: EntryCollection<Article>
  journals: EntryCollection<Journal>
  bookshelfs: EntryCollection<Bookshelf>
}

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