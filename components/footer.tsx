import * as React from 'react'
import { SFC } from 'react'
import { css } from 'emotion'

import { ContentContext } from '../contexts/content'

import { rythm, colors, gutter } from '../styles'
import { Navigation } from './navigation'
import { Flex, Third, full, breakpoints } from './layout'
import { Center } from './text'

const styles = breakpoints(css`
  padding: ${gutter}px;
  color: ${colors.white};
  background-color: ${colors.black};
`, {
  phone: css`
    padding-left: ${gutter/2}px;
  `
})

export const Footer: SFC<{}> = props => {
  return <ContentContext.Consumer>
    {({ content }) => <footer className={styles}>
      <Flex spaced middle>
        <Third phone={full}><Navigation links={content.footer.fields.links} /></Third>
        <Center><strong>{content.footer.fields.tagline}</strong><br />{content.footer.fields.copyright}</Center>
        <Third></Third>
      </Flex>
    </footer>}
  </ContentContext.Consumer>
}