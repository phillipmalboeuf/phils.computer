
import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { ContentContext } from '../contexts/content'
import { A, Spacer } from '../components/text'


interface Props extends RouteComponentProps<any> {}
interface State {}


export class Bookshelf extends React.PureComponent<Props, State> {
  static contextType = ContentContext
  context!: React.ContextType<typeof ContentContext>


  public render() {
    let bookshelf = this.context.content.bookshelfs.items.find(bookshelf => bookshelf.fields.identifier === this.props.match.params.id)
    return <>
      <h1>{bookshelf.fields.title}</h1>
      {bookshelf.fields.books && bookshelf.fields.books.map(book => <article key={book.sys.id}>
        <a href={book.fields.externalLink} target='_blank'>{book.fields.title}</a><br />
      </article>)}
      <Spacer />
      <A to={'/pages/books'}>← Back to books</A>
    </>
  }
}