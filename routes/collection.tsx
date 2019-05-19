
import * as React from 'react'
import { SFC, PureComponent } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Entry } from 'contentful'
import { css } from 'emotion'

import { rythm, colors, gutter, radius } from '../styles'
import { money, rich } from '../helpers/formatters'

import { ContentContext, Product, Collection as ContentCollection } from '../contexts/content'

import { Button } from '../components/button'
import { Flex, breakpoints, TwoThirds, Half } from '../components/layout'
import { AddToCart } from '../components/add_to_cart'
import { Helm } from '../components/helm'


const box = breakpoints(css`
  padding: ${rythm*1.333}px;
  border: 1px solid ${colors.white};
  border-radius: ${radius}px;
  
  p {
    margin-top: ${rythm/2}px;
  }
`, {
  phone: css`
    padding: ${rythm}px;
  `
})

export const Products: SFC<{
  products: Entry<Product>[]
}> = props => {
  return <>
  {props.products && props.products.map(product => <article className={box} key={product.sys.id}>
    <Flex spaced>
      <Half><h4>{product.fields.title}</h4></Half>
      <small>{product.fields.getInTouch ? 'tbd' : money(product.fields.price, 'CAD')} / {product.fields.type}</small>
    </Flex>
    <p>{product.fields.excerpt}</p>
    {product.fields.getInTouch
      ? <Button to='mailto:phil@phils.computer' external>{product.fields.cta || 'Get in Touch'}</Button>
      : <AddToCart product={product} />
    }
  </article>)}
  </>
}

interface Props extends RouteComponentProps<{ id: string }> {}
interface State {
  collection: Entry<ContentCollection>
}

export class Collection extends PureComponent<Props, State> {
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
      <Helm title={this.state.collection.fields.title} description={this.state.collection.fields.excerpt} />

      <h1>{this.state.collection.fields.title}</h1>
      {rich(this.state.collection.fields.description)}
      <Products products={this.state.collection.fields.products} />
    </>
  }
}