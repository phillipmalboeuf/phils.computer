
import express from 'express'

import cors from 'cors'
import compression from 'compression'
import { json } from 'body-parser'

import { entries } from './clients/contentful'


import Main from './dist/main.svelte.js'

const timestamp = Date.now()
const server = express()
server.disable('x-powered-by')

server.use(cors({ origin: true }))
server.use(compression())

server.get('*', json(), async (req, res) => {
  const locale = req.query['locale']
  const content = await entries(req.query['locale'] || 'en-US')
  
  const { head, html, css } = Main.render({
    defaultLocale: locale,
		defaultContent: content,
    defaultPath: req.params['0']
  })

  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
  res.send(`<!doctype html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0" />
      <link rel="icon" type="image/png" href="https://images.ctfassets.net/igsltvx7i8jl/4MyTMxMx4QayHycRvCRFZq/c74cf2550f0dec9105563dc3f3a991a6/icon.png">
      
      ${head}

      <style>${css.code}</style>
    </head>
    <body>
      <div id="main">${html}</div>
      <script>
        window.locale = ${locale ? `"${locale}"`: 'undefined'};
      </script>
      <script defer src="/hydrate.${timestamp}.js"></script>

      <style>
        @font-face {
          font-family: 'Inter';
          src: url('https://rsms.me/inter/font-files/Inter-Regular.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Inter';
          src: url('https://rsms.me/inter/font-files/Inter-SemiBold.woff2') format('woff2');
          font-weight: bold;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Inter';
          src: url('https://rsms.me/inter/font-files/Inter-Italic.woff2') format('woff2');
          font-weight: normal;
          font-style: italic;
          font-display: swap;
        }
      </style>
      <link rel="stylesheet" href="/hydrate.${timestamp}.css" />

      <script async defer src="https://js.stripe.com/v3/"></script>
      <script async defer src="https://cdn.jsdelivr.net/npm/@widgetbot/crate@3.1.237/umd/crate.min.js">
        new Crate({
          server: '578597625188712448',
          channel: '578597625188712450',
          shard: 'https://disweb.deploys.io',
          color: '#27AE60',
          glyph: ['https://images.ctfassets.net/igsltvx7i8jl/31YpHiSCYxX1kchiFs28iZ/e772b04abf43fb00f1a540593316ae5f/comment-discussion.svg', '50%'],
          css: '.button { box-shadow: none; width: 56px; } @media (max-width: 500px) { .button { border-bottom-left-radius: 50%; border-top-right-radius: 50%; } }',
          defer: true
        })
      </script>
    </body>
  </html>`)
})

export default server