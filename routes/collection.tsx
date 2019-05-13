
import React, { SFC } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Entry } from 'contentful'
import { css } from 'emotion'

import { rythm, colors, gutter, radius } from '../styles'
import { money } from '../helpers/formatters'

import { ContentContext, Product, Collection as ContentCollection } from '../contexts/content'
import { Checkout } from '../models/checkout'

import { Button } from '../components/button'
import { Flex } from '../components/layout'
import { Overlay } from '../components/overlay'
import { Form, Input } from '../components/form'


const box = css`
  padding: ${rythm*1.333}px;
  margin: ${rythm}px 0;
  border: 1px solid ${colors.white};
  border-radius: ${radius}px;
`

export const Products: SFC<{
  products: Entry<Product>[]
}> = props => {
  return <>
  {props.products && props.products.map(product => <article className={box} key={product.sys.id}>
    <Flex spaced>
      <h4>{product.fields.title}</h4>
      <small>{product.fields.getInTouch ? 'tbd' : money(product.fields.price, 'CAD')} / {product.fields.type}</small>
    </Flex>
    <p>{product.fields.excerpt}</p>
    {product.fields.getInTouch
      ? <Button to='mailto:phil@phils.computer' external>{product.fields.cta || 'Get in Touch'}</Button>
      : <Overlay button={product.fields.cta || 'Add to Cart'}>
        <h4>{product.fields.cta || 'Add to Cart'}</h4>
        <Form id={product.sys.id} onSubmit={async values => Checkout.create(values.email, values.description, [{
          title: product.fields.title,
          price: product.fields.price,
          requested_for: new Date(),
          quantity: values.quantity
        }])} button='Request'>
          <Input type='email' name='email' label='Email address' placeholder='you@your.tld' />
          <Input type='textarea' name='description' label='Provide more information' max={280} placeholder='Describe your project, problem, idea...' />
          <Input type='number' name='quantity' label='Quantity' />
        </Form>
      </Overlay>
    }
  </article>)}
  </>
}

interface Props extends RouteComponentProps<{ id: string }> {}
interface State {
  collection: Entry<ContentCollection>
}

export class Collection extends React.PureComponent<Props, State> {
  static contextType = ContentContext
  context!: React.ContextType<typeof ContentContext>

  constructor(props: Props, context: React.ContextType<typeof ContentContext>) {
    super(props)
    this.state = {
      collection: props.match.params.id && context.content.collections.items.find(collection => collection.fields.identifier === props.match.params.id)
    }
  }

  public render() {
    return <>
      <h1>{this.state.collection.fields.title}</h1>
      <Products products={this.state.collection.fields.products} />
    </>
  }
}