import stripe from '../clients/stripe'
import { date } from '../helpers/formatters'
import { CONF } from '../../config/config'

export async function post({ body, locale }, res) {
  const session = await stripe.checkout.sessions.create({ 
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    success_url: `${CONF('REDIRECT_ROOT')}/thanks`,
    cancel_url: `${CONF('REDIRECT_ROOT')}/collections/consulting`,
    payment_intent_data: {
      capture_method: 'manual',
      description: body.description
    },
    customer_email: body.email,
    line_items: body.items.map(item => ({
      name: item.title,
      amount: Math.floor(item.price*100),
      currency: 'cad',
      quantity: item.quantity,
      description: `Booking request for ${date(item.requested_for)}`
    })),
    locale: (locale || 'en-US').split('-')[0]
  })

  res.end(JSON.stringify(session))
}