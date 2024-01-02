import Stripe from 'stripe'
import { CONF } from '../../config/config'

export default new Stripe(CONF('STRIPE_PRIVATE_KEY'))