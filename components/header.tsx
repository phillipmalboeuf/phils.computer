import React, { SFC } from 'react'
import { Link } from 'react-router-dom'
import { ContentContext } from '../contexts/content'

import { css } from 'emotion'
import { rythm, colors, gutter } from '../styles'

import { Navigation } from './navigation'

const styles = css`
  position: fixed;
  top: 0;
  left: 0;
  padding: ${gutter}px;
`

export const Header: SFC<{}> = props => {
  return <ContentContext.Consumer>
    {({ content }) => <header className={styles}>
      <Link to='/'>{content.header.fields.title}</Link>
      <Navigation links={content.header.fields.links} />
    </header>}
  </ContentContext.Consumer>
}