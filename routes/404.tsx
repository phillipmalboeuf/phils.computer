
import * as React from 'react'
import { PureComponent } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Entry } from 'contentful'

import { ContentContext } from '../contexts/content'

import { Big, Huge, Spacer, A, Center } from '../components/text'
import { Flex, Quarter, Full, Third, third, half } from '../components/layout'


interface Props extends RouteComponentProps<any> {}
interface State {}


export class FourOFour extends PureComponent<Props, State> {
  static contextType = ContentContext
  context!: React.ContextType<typeof ContentContext>


  public render() {
    return <Center>
      <Spacer />
      <h1><Huge>404</Huge></h1>
      <p><A to='/' underline>Head back home</A></p>
    </Center>
  }
}