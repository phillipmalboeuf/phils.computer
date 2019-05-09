
import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { ContentContext } from '../contexts/content'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'


interface Props extends RouteComponentProps<any> {}
interface State {}


export class Page extends React.PureComponent<Props, State> {
  static contextType = ContentContext
  context!: React.ContextType<typeof ContentContext>


  public render() {
    let page = this.context.content.pages.items.find(page => page.fields.identifier === this.props.match.params.id)
    return <>
      <h1>{page.fields.title}</h1>
      {documentToReactComponents(page.fields.body)}
    </>
  }
}