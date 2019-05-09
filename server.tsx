import express, { Application, Request, Response } from 'express'
import { renderToString } from 'react-dom/server'
import React from 'react'

import cors from 'cors'
import compression from 'compression'
import { json, raw } from 'body-parser'
import cookieparser from 'cookie-parser'

import { CONF } from './config'

import contentful from './clients/contentful'

import { Content } from './contexts/content'
import { Routes } from './routes'



const server: Application = express()
server.disable('x-powered-by')
server.enable('trust proxy')
server.use(cors({ origin: true, credentials: true }))

server.use(cookieparser(CONF('SECRET')))
server.use(compression())

const entries = (locale: string): Promise<Content> => Promise.all([
  contentful.getEntries({ content_type: 'header', locale, include: 3 }),
  contentful.getEntries({ content_type: 'footer', locale, include: 3 }),
  contentful.getEntries({ content_type: 'page', locale, include: 2 }),
  contentful.getEntries({ content_type: 'product', locale }),
  contentful.getEntries({ content_type: 'collection', locale }),
  contentful.getEntries({ content_type: 'project', locale }),
  contentful.getEntries({ content_type: 'portfolio', locale }),
  contentful.getEntries({ content_type: 'article', locale }),
  contentful.getEntries({ content_type: 'journal', locale })
]).then(async ([headers, footers, pages, products, collections, projects, portfolios, articles, journals])=> {
  return {
    header: headers.items[0],
    footer: footers.items[0],
    pages,
    products,
    collections,
    projects,
    portfolios,
    articles,
    journals
  } as Content
})

server.get('/content', (req: Request, res: Response) => {
  entries(req.cookies['locale'] || 'en-US').then(entries => res.send(entries))
})

server.get('/*', (req: Request, res: Response) => {
  entries(req.cookies['locale'] || 'en-US').then(entries => {
    res.send(`<!doctype html>${renderToString(
      <html>
        <body>
          <main id='main'>
            <Routes />
          </main>
        </body>
      </html>
    )}`)
  })
})


server.listen(CONF('SERVER_PORT'), () => {
  console.log(`Listening on port ${CONF('SERVER_PORT')}...`)
})