
import * as Stripe from 'stripe'

export default new Stripe(process.env.STRIPE_PRIVATE_KEY)