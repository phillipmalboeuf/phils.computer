
import * as React from 'react'
import { PureComponent } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Entry } from 'contentful'

import { ContentContext, Journal as ContentJournal } from '../contexts/content'
import { date } from '../helpers/formatters'
import { A } from '../components/text'
import { Helm } from '../components/helm'


interface Props extends RouteComponentProps<any> {}
interface State {
  journal: Entry<ContentJournal>
}


export class Journal extends PureComponent<Props, State> {
  static contextType = ContentContext
  context!: React.ContextType<typeof ContentContext>

  constructor(props: Props, context: React.ContextType<typeof ContentContext>) {
    super(props)
    this.state = {
      journal: context.content.journals.items.find(journal => journal.fields.identifier === props.match.params.id)
    }
  }

  public render() {
    return <>
      <Helm title={this.state.journal.fields.title} description={this.state.journal.fields.excerpt} />

      {this.state.journal.fields.articles && this.state.journal.fields.articles.map(article => <article key={article.sys.id}>
        <h2><A to={`/journals/${this.state.journal.fields.identifier}/articles/${article.fields.identifier}`}>{article.fields.title}</A></h2>
        <p>{article.fields.excerpt}<br /><small>{date(article.fields.publishedDate)}{article.fields.ongoing && <> – Ongoing</>}</small></p>
      </article>)}
    </>
  }
}