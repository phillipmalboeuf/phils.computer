
import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Entry } from 'contentful'

import { ContentContext, Bookshelf as ContentBookshelf } from '../contexts/content'
import { A, Spacer } from '../components/text'


interface Props extends RouteComponentProps<any> {}
interface State {
  bookshelf: Entry<ContentBookshelf>
}


export class Bookshelf extends React.PureComponent<Props, State> {
  static contextType = ContentContext
  context!: React.ContextType<typeof ContentContext>

  constructor(props: Props, context: React.ContextType<typeof ContentContext>) {
    super(props)
    this.state = {
      bookshelf: context.content.bookshelfs.items.find(bookshelf => bookshelf.fields.identifier === props.match.params.id)
    }
  }

  public render() {
    return <>
      <h1>{this.state.bookshelf.fields.title}</h1>
      {this.state.bookshelf.fields.books && this.state.bookshelf.fields.books.map(book => <article key={book.sys.id}>
        <a href={book.fields.externalLink} target='_blank'>{book.fields.title}</a><br />
      </article>)}
      <Spacer />
      <A to={'/pages/books'}>← Back to books</A>
    </>
  }
}