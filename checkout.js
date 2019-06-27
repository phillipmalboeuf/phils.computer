
import express from 'express'

import cors from 'cors'
import compression from 'compression'
import { json } from 'body-parser'

import stripe from './clients/stripe'
import { date } from './helpers/formatters'

const server = express()
server.disable('x-powered-by')
server.enable('trust proxy')

server.use(cors({ origin: true }))
server.use(compression())

server.post('*', json(), async (req, res) => {
  const session = await stripe.checkout.sessions.create({ 
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    success_url: `${process.env.REDIRECT_ROOT}/thanks`,
    cancel_url: `${process.env.REDIRECT_ROOT}/collections/consulting`,
    payment_intent_data: {
      capture_method: 'manual',
      description: req.body.description
    },
    customer_email: req.body.email,
    line_items: req.body.items.map(item => ({
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

export default server