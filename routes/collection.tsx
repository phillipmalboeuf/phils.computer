
import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { ContentContext } from '../contexts/content'


interface Props extends RouteComponentProps<any> {}
interface State {}


export class Collection extends React.PureComponent<Props, State> {
  static contextType = ContentContext
  context!: React.ContextType<typeof ContentContext>


  public render() {
    let collection = this.context.content.collections.items.find(collection => collection.fields.identifier === this.props.match.params.id)
    return <>
      <h2>{collection.fields.title}</h2>
      {collection.fields.products && collection.fields.products.map(product => <article key={product.sys.id}>
        <h6>{product.fields.title}</h6>
        <p>{product.fields.excerpt}</p>
        <button>{product.fields.cta || 'Add to Cart'}</button>
      </article>)}
    </>
  }
}