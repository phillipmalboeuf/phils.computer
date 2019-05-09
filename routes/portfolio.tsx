
import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { ContentContext } from '../contexts/content'


interface Props extends RouteComponentProps<any> {}
interface State {}


export class Portfolio extends React.PureComponent<Props, State> {
  static contextType = ContentContext
  context!: React.ContextType<typeof ContentContext>


  public render() {
    let portfolio = this.context.content.portfolios.items.find(portfolio => portfolio.fields.identifier === this.props.match.params.id)
    return <>
      <h1>{portfolio.fields.title}</h1>
      {portfolio.fields.projects && portfolio.fields.projects.map(product => <article key={product.sys.id}>
        <h4>{product.fields.title}</h4>
        <p>{product.fields.excerpt}</p>
        <a href={product.fields.externalLink} target='_blank' rel='noopener noreferrer'>{product.fields.externalLink}</a>
      </article>)}
    </>
  }
}