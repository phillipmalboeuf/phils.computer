
import express from 'express'

import cors from 'cors'
import compression from 'compression'
import { json } from 'body-parser'

import { entries } from './clients/contentful'

const server = express()
server.disable('x-powered-by')

server.use(cors({ origin: true }))
server.use(compression())

server.get('*', json(), async (req, res) => {
  entries(req.query['locale'] || 'en-US').then(entries => res.send(entries))
})

export default server