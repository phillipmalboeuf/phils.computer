import express, { Application, Request, Response } from 'express'
import { renderToString } from 'react-dom/server'
import React from 'react'
import { StaticRouter } from 'react-router'

import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import { json, raw } from 'body-parser'
import cookieparser from 'cookie-parser'

import contentful from './clients/contentful'
import stripe from './clients/stripe'

import { Content } from './contexts/content'
import { Routes } from './routes'
import { date } from './helpers/formatters'

// import { CheckoutItem } from './models/checkout'
// import { Header } from './components/header'
// import { Footer } from './components/footer'


const server: Application = express()
server.disable('x-powered-by')
server.enable('trust proxy')
server.use(cors({ origin: true, credentials: true }))

server.use(cookieparser(process.env.SECRET))
server.use(compression())
server.use(morgan('dev'))

const entries = (locale: string): Promise<Content> => Promise.all([
  contentful.getEntries({ content_type: 'header', locale, include: 3 }),
  contentful.getEntries({ content_type: 'footer', locale, include: 3 }),
  contentful.getEntries({ content_type: 'page', locale, include: 2 }),
  contentful.getEntries({ content_type: 'product', locale }),
  contentful.getEntries({ content_type: 'collection', locale }),
  contentful.getEntries({ content_type: 'project', locale }),
  contentful.getEntries({ content_type: 'portfolio', locale }),
  contentful.getEntries({ content_type: 'article', locale }),
  contentful.getEntries({ content_type: 'journal', locale }),
  contentful.getEntries({ content_type: 'bookshelf', locale })
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
  } as Content
})

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

// server.get('/*', (req: Request, res: Response) => {
//   entries(req.cookies['locale'] || 'en-US').then(entries => {
//     res.send(`<!doctype html>${renderToString(
//       <html>
//         <head>
//           <meta name='viewport' content='width=device-width, height=device-height, initial-scale=1.0' />
//           <script async src='./main.tsx' />
//           <script async src='https://js.stripe.com/v3/' />
//         </head>
//         <body>
//           <StaticRouter location={req.originalUrl} context={{}}>
//             <>
//               <Header />
//               <main id='main'>
//                 <Routes />
//               </main>
//               <Footer />
//             </>
//           </StaticRouter>
//         </body>
//       </html>
//     )}`)
//   })
// })


server.listen(3000)