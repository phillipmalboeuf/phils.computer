
import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { ContentContext } from '../contexts/content'


interface Props extends RouteComponentProps<any> {}
interface State {}


export class Journal extends React.PureComponent<Props, State> {
  static contextType = ContentContext
  context!: React.ContextType<typeof ContentContext>


  public render() {
    let journal = this.context.content.journals.items.find(journal => journal.fields.identifier === this.props.match.params.id)
    return <>
      <h2>{journal.fields.title}</h2>
      {journal.fields.articles && journal.fields.articles.map(article => <article key={article.sys.id}>
        <h6>{article.fields.title}</h6>
        <p>{article.fields.excerpt}</p>
      </article>)}
    </>
  }
}