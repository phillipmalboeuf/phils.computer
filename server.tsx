import express from 'express'
import { Application, Request, Response } from 'express'

import React from 'react'
import { StaticRouter } from 'react-router'
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'

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
  entries(req.query['locale'] || 'en-US').then(entries => res.send(entries))
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
    locale: (req.query['locale'] || 'en-US').split('-')[0]
  })
  
  res.json(session)
})

server.get('/*', async (req: Request, res: Response) => {
  const locale = req.query['locale'] as string || undefined
  const content = await entries(locale || 'en-US')

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
              <StaticRouter basename={locale} location={req.originalUrl} context={{}}>
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

        {locale && <script dangerouslySetInnerHTML={{ __html: `window.locale = "${locale}"` }} />}
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
        <script dangerouslySetInnerHTML={{ __html: `(function(a,b,c){var d=a.history,e=document,f=navigator||{},g=localStorage,
        h=encodeURIComponent,i=d.pushState,k=function(){return Math.random().toString(36)},
        l=function(){return g.cid||(g.cid=k()),g.cid},m=function(r){var s=[];for(var t in r)
        r.hasOwnProperty(t)&&void 0!==r[t]&&s.push(h(t)+"="+h(r[t]));return s.join("&")},
        n=function(r,s,t,u,v,w,x){var z="https://www.google-analytics.com/collect",
        A=m({v:"1",ds:"web",aip:c.anonymizeIp?1:void 0,tid:b,cid:l(),t:r||"pageview",
        sd:c.colorDepth&&screen.colorDepth?screen.colorDepth+"-bits":void 0,dr:e.referrer||
        void 0,dt:e.title,dl:e.location.origin+e.location.pathname+e.location.search,ul:c.language?
        (f.language||"").toLowerCase():void 0,de:c.characterSet?e.characterSet:void 0,
        sr:c.screenSize?(a.screen||{}).width+"x"+(a.screen||{}).height:void 0,vp:c.screenSize&&
        a.visualViewport?(a.visualViewport||{}).width+"x"+(a.visualViewport||{}).height:void 0,
        ec:s||void 0,ea:t||void 0,el:u||void 0,ev:v||void 0,exd:w||void 0,exf:"undefined"!=typeof x&&
        !1==!!x?0:void 0});if(f.sendBeacon)f.sendBeacon(z,A);else{var y=new XMLHttpRequest;
        y.open("POST",z,!0),y.send(A)}};d.pushState=function(r){return"function"==typeof d.onpushstate&&
        d.onpushstate({state:r}),setTimeout(n,c.delay||10),i.apply(d,arguments)},n(),
        a.ma={trackEvent:function o(r,s,t,u){return n("event",r,s,t,u)},
        trackException:function q(r,s){return n("exception",null,null,null,null,r,s)}}})
        (window,"UA-140459737-1",{anonymizeIp:true,colorDepth:true,characterSet:true,screenSize:true,language:true});` }} />
      </body>
    </html>
  ))

  const helmet = Helmet.renderStatic()

  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
  res.send(`<!doctype html>${html
    .replace('</head>', `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}<style>${css}</style></head>`)
    .replace('</body>', `<script>window.style_ids = ${JSON.stringify(ids)}</script></body>`)
    .replace('<html>', `<html ${helmet.htmlAttributes.toString()}>`)}`)
})


server.listen(3000)