import * as React from 'react'
import { PureComponent } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Entry } from 'contentful'
import { css } from 'emotion'

import { Link as ContentLink, ContentContext } from '../contexts/content'
import { A } from './text'
import { rythm } from '../styles'


interface Props {
  links: Entry<ContentLink>[]
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}
interface State {}

const left = css`
  padding-left: ${rythm/2}px;
`

export class Navigation extends PureComponent<Props, State> {
  static contextType = ContentContext
  context!: React.ContextType<typeof ContentContext>

  render() {
    return <nav onClick={this.props.onClick}>
      {this.props.links && this.props.links.map(link => <React.Fragment key={link.sys.id}>
        {link.fields.internalLink
        && <A
          to={`/${link.fields.internalLink.sys.contentType.sys.id}s/${link.fields.internalLink.fields.identifier}`}>
          {link.fields.label}
        </A>}
        {link.fields.externalLink && <A to={link.fields.externalLink} external rel='me'>
          {link.fields.label}
        </A>}
        <br />
        <div className={left}>{link.fields.subLinks && <Navigation links={link.fields.subLinks} />}</div>
      </React.Fragment>
      )}
    </nav>
  }
}