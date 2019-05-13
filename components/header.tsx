import React, { SFC } from 'react'
import { Link } from 'react-router-dom'
import { ContentContext } from '../contexts/content'

import { css } from 'emotion'
import { rythm, colors, gutter } from '../styles'

import { Navigation } from './navigation'
import { A, Big, Medium } from './text'

const styles = css`
  position: fixed;
  top: 0;
  left: 0;
  width: ${gutter*6}px;
  padding: ${gutter}px;
`

export const Header: SFC<{}> = props => {
  return <ContentContext.Consumer>
    {({ content }) => <header className={styles}>
      <h1><A to='/'><Medium>{content.header.fields.title}</Medium></A></h1>
      <Navigation links={content.header.fields.links} />
    </header>}
  </ContentContext.Consumer>
}