import express from 'express'
import { Application, Request, Response } from 'express'

import React from 'react'
import { StaticRouter } from 'react-router'
import { renderToString } from 'react-dom/server'

import { renderStylesToString, extractCritical } from 'emotion-server'
import { cache } from 'emotion'
import { CacheProvider } from '@emotion/core'

import cors from 'cors'
import compression from 'compression'
import { json, raw } from 'body-parser'
import cookieparser from 'cookie-parser'

import contentful, { entries } from './clients/contentful'
import stripe from './clients/stripe'

import { Content, ContentContext } from './contexts/content'
import { Routes } from './routes'
import { date } from './helpers/formatters'

import { Header } from './components/header'
import { Footer } from './components/footer'
import { GlobalStyles } from './styles'


const server: Application = express()
server.disable('x-powered-by')
server.enable('trust proxy')
server.use(cors({ origin: true, credentials: true }))

server.use(cookieparser(process.env.SECRET))
server.use(compression())

server.get('/content', (req: Request, res: Response) => {
  entries(req.cookies['locale'] || 'en-US').then(entries => res.send(entries))
})

server.post('/checkout', json(), async (req: Request, res: Response)=> {
  // @ts-ignore
  const session = await stripe.checkout.sessions.create({ 
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    success_url: `${process.env.REDIRECT_ROOT}/thanks`,
    cancel_url: `${process.env.REDIRECT_ROOT}/consulting`,
    payment_intent_data: {
      capture_method: 'manual',
      description: req.body.description
    },
    customer_email: req.body.email,
    line_items: req.body.items.map((item: any)=> ({
      name: item.title,
      amount: Math.floor(item.price*100),
      currency: 'cad',
      quantity: item.quantity,
      description: `Booking request for ${date(item.requested_for)}`
    })),
    locale: (req.cookies['locale'] || 'en-US').split('-')[0]
  })
  
  res.json(session)
})

server.get('/*', async (req: Request, res: Response) => {
  const locale = req.cookies['locale'] || 'en-US'
  const content = await entries(locale)

  const { html, ids, css } = extractCritical(renderToString(
    <html>
      <head>
        <meta name='viewport' content='width=device-width, height=device-height, initial-scale=1.0' />
        <link rel='icon' type='image/png' href='https://images.ctfassets.net/igsltvx7i8jl/4MyTMxMx4QayHycRvCRFZq/c74cf2550f0dec9105563dc3f3a991a6/icon.png' />
      </head>
      <body>
        <div id="main">
          <CacheProvider value={{...cache, key: 'hello'}}>
            <ContentContext.Provider value={{
              content,
              fetchContent: undefined,
              locale,
              selectLocale: undefined
            }}>
              <StaticRouter location={req.originalUrl} context={{}}>
                <>
                  <Header />
                  <main>
                    <Routes />
                  </main>
                  <Footer />
                </>
              </StaticRouter>
              <GlobalStyles />
            </ContentContext.Provider>
          </CacheProvider>
        </div>

        <script dangerouslySetInnerHTML={{ __html: `window.locale = "${locale}"` }} />
        <script dangerouslySetInnerHTML={{ __html: `window.content = ${JSON.stringify(content)}` }} />
        <script async defer src='/main.js' />

        <script async defer src='https://js.stripe.com/v3/' />
        <script async defer src='https://cdn.jsdelivr.net/npm/@widgetbot/crate@3.1.237/umd/crate.min.js' dangerouslySetInnerHTML={{ __html: `
          new Crate({
            server: '578597625188712448',
            channel: '578597625188712450',
            shard: 'https://disweb.deploys.io',
            color: '#27AE60',
            glyph: ['https://images.ctfassets.net/igsltvx7i8jl/31YpHiSCYxX1kchiFs28iZ/e772b04abf43fb00f1a540593316ae5f/comment-discussion.svg', '50%'],
            css: '.button { box-shadow: none; width: 56px; } @media (max-width: 500px) { .button { border-bottom-left-radius: 50%; border-top-right-radius: 50%; } }',
            defer: false
          })
        ` }} />
      </body>
    </html>
  ))

  res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')
  res.send(`<!doctype html>${html.replace('</head>', `<style>${css}</style></head>`).replace('</body>', `<script>window.style_ids = ${JSON.stringify(ids)}</script></body>`)}`)
})


server.listen(3000)