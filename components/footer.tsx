import React, { SFC } from 'react'
import { css } from 'emotion'

import { ContentContext } from '../contexts/content'

import { rythm, colors, gutter } from '../styles'
import { Navigation } from './navigation'

const FooterStyles = css`
  padding: ${gutter}px;
  color: ${colors.white};
  background-color: ${colors.black};
`

export const Footer: SFC<{}> = props => {
  return <ContentContext.Consumer>
    {({ content }) => <footer className={FooterStyles}>
      <Navigation links={content.footer.fields.links} />
      <div>{content.footer.fields.copyright}</div>
      <div></div>
    </footer>}
  </ContentContext.Consumer>
}