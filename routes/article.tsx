
import * as React from 'react'
import { PureComponent } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Entry } from 'contentful'
import { BLOCKS } from '@contentful/rich-text-types'

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
    const { article, journal } = this.state
    return <>
      <Helm title={article.fields.title} description={article.fields.excerpt} />

      <h1>{article.fields.title}</h1>
      <p>{article.fields.excerpt}<br /><small>{date(article.fields.publishedDate, undefined, undefined, this.context.locale)}{article.fields.ongoing && (this.context.locale === 'fr-CA' ? <> – En continue</> : <> – Ongoing</>)}</small></p>
      <article>{rich(article.fields.body, {
        [BLOCKS.EMBEDDED_ENTRY]: node => {
          return {
            embed: (target: any)=> {
              return <iframe title={target.fields.title} src={target.fields.source} frameBorder='0' allow='autoplay; fullscreen' allowFullScreen></iframe>
            }
          }[node.data.target.sys.contentType.sys.id as 'embed'](node.data.target)
        }
      })}</article>
      <Spacer />
      {journal && <A to={`/journals/${journal.fields.identifier}`}>← Back to {journal.fields.title}</A>}
    </>
  }
}