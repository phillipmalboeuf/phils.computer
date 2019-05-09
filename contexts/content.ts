import * as React from 'react'
import { EntryCollection, Entry } from 'contentful'
import { Document } from '@contentful/rich-text-types'

// import { Overlay } from '../components/overlay'

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
  cta: string
}

export interface Collection {
  title: string
  identifier: string
  excerpt: string
  products: Entry<Product>[]
}

export interface Project {
  title: string
  identifier: string
  excerpt: string
  externalLink: string
  description: Document
}

export interface Portfolio {
  title: string
  identifier: string
  excerpt: string
  projects: Entry<Project>[]
}

export interface Article {
  title: string
  identifier: string
  excerpt: string
  body: Document
}

export interface Journal {
  title: string
  identifier: string
  excerpt: string
  articles: Entry<Article>[]
}

export interface Link {
  label: string
  internalLink: Entry<Page | Project | Portfolio | Article | Journal>
  externalLink: string
  emphasize: boolean
  subLinks: Entry<Link>[]
}

export interface Content {
  header: Entry<{
    title: string
    tagline: Document
    introduction: Document
    links: Entry<Link>[]
  }>
  footer: Entry<{
    copyright: string
    tagline: string
    links: Entry<Link>[]
  }>
  pages: EntryCollection<Page>
  products: EntryCollection<Product>
  collections: EntryCollection<Collection>
  projects: EntryCollection<Project>
  portfolios: EntryCollection<Portfolio>
  articles: EntryCollection<Article>
  journals: EntryCollection<Journal>
}

export const ContentContext = React.createContext({
  content: {} as Content,
  locale: undefined as string,
  fetchContent: (): void => undefined,
  selectLocale: (locale: string)=> function(): void {}
})
