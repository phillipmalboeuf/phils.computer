
import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { BLOCKS } from '@contentful/rich-text-types'
import { ContentContext } from '../contexts/content'
import { rich } from '../helpers/formatters'
import { Big, Huge } from '../components/text'


interface Props extends RouteComponentProps<any> {}
interface State {}


export class Page extends React.PureComponent<Props, State> {
  static contextType = ContentContext
  context!: React.ContextType<typeof ContentContext>


  public render() {
    let page = this.context.content.pages.items.find(page => page.fields.identifier === this.props.match.params.id)
    return <>
      {/* <h1>{page.fields.title}</h1> */}
      {rich(page.fields.body, {
        [BLOCKS.EMBEDDED_ENTRY]: node => {
          return {
            bookshelf: <div><Link to={`/${node.data.target.sys.contentType.sys.id}s/${node.data.target.fields.identifier}`}><Huge>{node.data.target.fields.title}</Huge></Link></div>
          }[node.data.target.sys.contentType.sys.id as 'bookshelf']
        }
      })}
    </>
  }
}