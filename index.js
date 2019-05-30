
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
		defaultContent: content
  })

  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
  res.send(`<!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0" />
      ${head}
      <style>${css.code}</style>
    </head>
    <body>
      <div id="main">${html}</div>
    </body>
  </html>`)
})

export default server