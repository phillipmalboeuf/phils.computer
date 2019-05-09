
import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { ContentContext } from '../contexts/content'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Page } from './page';


interface Props extends RouteComponentProps<any> {}
interface State {}


export class Home extends React.PureComponent<Props, State> {
  static contextType = ContentContext
  context!: React.ContextType<typeof ContentContext>


  public render() {
    return <Page {...{...this.props, match: {...this.props.match, params: { id: 'home' }}}} />
  }
}