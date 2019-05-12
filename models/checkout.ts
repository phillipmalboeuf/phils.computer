import Axios from 'axios'

export interface CheckoutItem {
  title: string
  price: number
  quantity: number
  requested_for: Date
}

export class Checkout {

  static create(email: string, description: string, items: CheckoutItem[]) {
    return Axios.post(`${process.env.NODE_ENV === 'production' ? '' : '//localhost:8089'}/checkout`, JSON.stringify({
      email,
      description,
      items
    }), {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      responseType: 'json'
    }).then(async response => {
      return await Stripe('pk_test_h1cuoFpXFUMGTeBcnNoJXIjH00Vlz0ScPV').redirectToCheckout({
        sessionId: response.data.id
      })
    })
  }
}