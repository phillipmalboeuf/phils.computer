import * as React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Entry } from 'contentful'
import { Link as ContentLink, ContentContext } from '../contexts/content'


interface Props {
  links: Entry<ContentLink>[]
}
interface State {}


export class Navigation extends React.PureComponent<Props, State> {
  static contextType = ContentContext
  context!: React.ContextType<typeof ContentContext>

  render() {
    return <nav>
      {this.props.links && this.props.links.map(link => <React.Fragment key={link.sys.id}>
        {link.fields.internalLink
        && <NavLink className={link.fields.emphasize ? 'strong' : ''}
          to={`/${link.fields.internalLink.sys.contentType.sys.id}s/${link.fields.internalLink.fields.identifier}`}>
          {link.fields.label}
        </NavLink>}
        {link.fields.externalLink && <a href={link.fields.externalLink} target='_blank' className={link.fields.emphasize ? 'strong' : ''}>
          {link.fields.label}
        </a>}
        <br />
        {link.fields.subLinks && <Navigation links={link.fields.subLinks} />}
      </React.Fragment>
      )}
    </nav>
  }
}