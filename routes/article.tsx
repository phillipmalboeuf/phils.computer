
import * as React from 'react'
import { PureComponent } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Entry } from 'contentful'

import { ContentContext, Journal as ContentJournal, Article as ContentArticle } from '../contexts/content'
import { date, rich } from '../helpers/formatters'
import { A, Spacer } from '../components/text'
import { Helm } from '../components/helm'


interface Props extends RouteComponentProps<{ id: string, journal?: string }> {}
interface State {
  article: Entry<ContentArticle>
  journal?: Entry<ContentJournal>
}


export class Article extends PureComponent<Props, State> {
  static contextType = ContentContext
  context!: React.ContextType<typeof ContentContext>

  constructor(props: Props, context: React.ContextType<typeof ContentContext>) {
    super(props)
    this.state = {
      article: context.content.articles.items.find(article => article.fields.identifier === props.match.params.id),
      journal: context.content.journals.items.find(journal => journal.fields.identifier === props.match.params.journal)
    }
  }

  public render() {
    return <>
      <Helm title={this.state.article.fields.title} description={this.state.article.fields.excerpt} />

      <h1>{this.state.article.fields.title}</h1>
      <p>{this.state.article.fields.excerpt}<br /><small>{date(this.state.article.fields.publishedDate)}</small></p>
      {rich(this.state.article.fields.body)}
      <Spacer />
      {this.state.journal && <A to={`/journals/${this.state.journal.fields.identifier}`}>← Back to {this.state.journal.fields.title}</A>}
    </>
  }
}