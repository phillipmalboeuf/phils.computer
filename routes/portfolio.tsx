
import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Entry } from 'contentful'
import { css } from 'emotion'

import { rythm, colors } from '../styles'
import { ContentContext, Portfolio as ContentPortfolio } from '../contexts/content'
import { A } from '../components/text'
import { rich, date } from '../helpers/formatters';
import { Flex } from '../components/layout';


interface Props extends RouteComponentProps<any> {}
interface State {
  portfolio: Entry<ContentPortfolio>
}


export class Portfolio extends React.Component<Props, State> {
  static contextType = ContentContext
  context!: React.ContextType<typeof ContentContext>

  constructor(props: Props, context: React.ContextType<typeof ContentContext>) {
    super(props)
    this.state = {
      portfolio: context.content.portfolios.items.find(portfolio => portfolio.fields.identifier === props.match.params.id)
    }
  }

  public styles = {
    project: css`
      margin: ${rythm}px 0;
    `,
    banner: css`
      position: relative;
      display: flex;
      align-items: center;
      height: 33vh;
      border: 1px solid ${colors.white};
      margin: ${rythm}px 0;
    `,
    logo: css`
      max-width: 266px;
      max-height: 133px;
      margin: 0 auto;
    `,
    caption: css`
      position: absolute;
      top: 0;
      right: 0;
      padding: ${rythm/1.666}px;
      color: ${colors.white};
      font-size: ${rythm/1.333}px;
      text-align: right;
    `
  }

  public render() {
    return <>
      <h1>{this.state.portfolio.fields.title}</h1>
      {rich(this.state.portfolio.fields.description)}
      {this.state.portfolio.fields.projects && this.state.portfolio.fields.projects.map(project => <article key={project.sys.id} className={this.styles.project}>
        {project.fields.logo && <A to={project.fields.externalLink} external>
          <figure className={this.styles.banner} style={{ backgroundColor: project.fields.color }}>
            <img className={this.styles.logo} src={project.fields.logo.fields.file.url} alt={project.fields.logo.fields.title} />
            <figcaption className={this.styles.caption}>
              {date(project.fields.releasedDate, false, true)}
            </figcaption>
          </figure>
        </A>}
        <h4><A to={project.fields.externalLink} external>{project.fields.title}</A></h4>
        <p>{project.fields.excerpt}</p>
      </article>)}
    </>
  }
}