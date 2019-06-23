
import express from 'express'

import cors from 'cors'
import compression from 'compression'
import { json } from 'body-parser'

import { entries } from './clients/contentful'


import Main from './dist/main.svelte.js'


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
      <link rel="webmention" href="https://webmention.io/phils.computer/webmention">
      <link rel="icon" type="image/png" href="https://images.ctfassets.net/igsltvx7i8jl/4MyTMxMx4QayHycRvCRFZq/c74cf2550f0dec9105563dc3f3a991a6/icon.png">
      ${head}
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
      <style>${css.code}</style>
    </head>
    <body>
      <div id="main">${html}</div>
      <script src="/main.js" />
    </body>
  </html>`)
})

export default server