
import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Entry } from 'contentful'
import { ContentContext, Portfolio as ContentPortfolio } from '../contexts/content'


interface Props extends RouteComponentProps<any> {}
interface State {
  portfolio: Entry<ContentPortfolio>
}


export class Portfolio extends React.PureComponent<Props, State> {
  static contextType = ContentContext
  context!: React.ContextType<typeof ContentContext>

  constructor(props: Props, context: React.ContextType<typeof ContentContext>) {
    super(props)
    this.state = {
      portfolio: context.content.portfolios.items.find(portfolio => portfolio.fields.identifier === props.match.params.id)
    }
  }

  public render() {
    return <>
      <h1>{this.state.portfolio.fields.title}</h1>
      {this.state.portfolio.fields.projects && this.state.portfolio.fields.projects.map(product => <article key={product.sys.id}>
        <h4>{product.fields.title}</h4>
        <p>{product.fields.excerpt}</p>
        <a href={product.fields.externalLink} target='_blank' rel='noopener noreferrer'>{product.fields.externalLink}</a>
      </article>)}
    </>
  }
}