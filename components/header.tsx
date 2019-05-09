import React, { SFC } from 'react'
import { Link } from 'react-router-dom'
import { ContentContext } from '../contexts/content'

import { css } from 'emotion'
import { rythm, colors } from '../styles'

import { Navigation } from './navigation'

const HeaderStyles = css`
  padding: ${rythm}px;
`

export const Header: SFC<{}> = props => {
  return <ContentContext.Consumer>
    {({ content }) => <header className={HeaderStyles}>
      <Link to='/'><h1>{content.header.fields.title}</h1></Link>
      <Navigation links={content.header.fields.links} />
    </header>}
  </ContentContext.Consumer>
}