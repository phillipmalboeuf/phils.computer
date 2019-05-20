import * as React from 'react'
import { createContext } from 'react'
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

export const ContentContext = createContext({
  content: {} as Content,
  locale: undefined as string,
  fetchContent: (locale?: string): void => undefined,
  selectLocale: (locale: string)=> function(): void {}
})
