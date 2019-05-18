
import * as React from 'react'
import { SFC, PureComponent } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { RRule, RRuleSet, rrulestr } from 'rrule'
import { Entry } from 'contentful'

import { money, rich, date } from '../helpers/formatters'

import { ContentContext, Product, Collection as ContentCollection } from '../contexts/content'

import { Overlay } from './overlay'
import { Form, Input } from './form'
import { Medium, A } from './text'


// const short = new RRule({
//   freq: RRule.WEEKLY,
//   interval: 1,
//   byweekday: [RRule.MO, RRule.WE, RRule.FR],
//   byhour: [15, 20],
//   byminute: 0,
//   bysecond: 0,
//   count: 18,
//   dtstart: new Date()
// })

// const sprint = new RRule({
//   freq: RRule.WEEKLY,
//   interval: 1,
//   byweekday: [RRule.MO, RRule.WE, RRule.FR],
//   byhour: 17,
//   byminute: 0,
//   bysecond: 0,
//   count: 9,
//   dtstart: new Date()
// })

// console.log(short.toString())
// console.log(sprint.toString())

const checkout = (email: string, description: string, items: {
  title: string,
  price: number,
  requested_for: Date,
  quantity: number
}[]): any => {
  axios.post(`${process.env.NODE_ENV === 'production' ? '' : '//localhost:3000'}/checkout`, {
    email,
    description,
    items
  })
    .then(response => {
      // @ts-ignore
      Stripe(process.env.STRIPE_PUBLIC_KEY).redirectToCheckout({
        sessionId: response.data.id
      })
    })
}

export const AddToCart: SFC<{
  product: Entry<Product>
}> = ({ product }) => {
  return <Overlay button={product.fields.cta || 'Add to Cart'}>
    <h4>{product.fields.cta || 'Add to Cart'}</h4>
    {rich(product.fields.description)}

    <Form id={product.sys.id} onSubmit={values => checkout(values.email, values.description, [{
      title: product.fields.title,
      price: product.fields.price,
      requested_for: new Date(values.requested_for),
      quantity: product.fields.defaultQuantity
    }])} button={`Request – ${money(product.fields.price * product.fields.defaultQuantity, 'CAD')}`}>
      <Input type='email' name='email' label='Your email address' placeholder='you@your.tld' />
      <Input type='textarea' name='description' label='Provide upfront details here' max={280} placeholder='Describe your project, problem, idea...' />
      <Input type='select' name='requested_for' label='Choose a booking datetime' options={
        [{
          label: 'Let me pick a time',
          value: 'Let me pick a time'
        }, ...rrulestr(product.fields.datesRules).all().map(dt => ({
          label: date(dt),
          value: dt.toISOString(),
          disabled: product.fields.excludedDates && product.fields.excludedDates.map(excluded => new Date(excluded)).includes(dt)
        }))]} />
      {/* <Input type='number' name='quantity' label='Quantity' /> */}
    </Form>
    <A to='https://stripe.com' external><img src='https://images.ctfassets.net/igsltvx7i8jl/7GahQXpXJMRYmTpHPII20V/8d5e5c2ad08258602de6e29a3b40f34e/powered_by_stripe.svg' alt='Powered by Stripe' /></A>
  </Overlay>
}