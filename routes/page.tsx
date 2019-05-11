
import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Entry } from 'contentful'
import { BLOCKS, Document } from '@contentful/rich-text-types'

import { ContentContext } from '../contexts/content'
import { rich } from '../helpers/formatters'
import { Big, Huge, Spacer } from '../components/text'
import { Flex, Quarter, Full, Third } from '../components/layout'



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
            collection: (target: any)=> <></>,
            bookshelf: (target: any)=> <div><Link to={`/${target.sys.contentType.sys.id}s/${target.fields.identifier}`}><Huge>{target.fields.title}</Huge></Link></div>,
            columns: (target: any)=> <>
              <Spacer />
              <h6>{target.fields.title}</h6>
              <Flex>
                {target.fields.columns.map((column: Entry<{
                  body: Document
                  size: string
                }>)=> ({
                  'One-third': <Third key={column.sys.id}>
                    {rich(column.fields.body)}
                  </Third>,
                  'One-quarter': <Quarter key={column.sys.id}>
                    {rich(column.fields.body)}
                  </Quarter>
                }[column.fields.size as 'One-quarter']))}
              </Flex>
              <Spacer />
            </>
          }[node.data.target.sys.contentType.sys.id as 'bookshelf'](node.data.target)
        }
      })}
    </>
  }
}