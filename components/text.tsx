import React, { SFC } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { css } from 'emotion'
import { rythm, colors, gutter } from '../styles'
import { breakpoints } from './layout';


const a = css`
  &:hover,
  &:focus {
    top: -1px;
  }

  &:active {
    top: 0px;
  }
`

const underline = css`
  background-image: linear-gradient(${colors.kelly}, ${colors.kelly});
  background-repeat: no-repeat;
  background-size: 100% .66em;
  background-position: left 0 bottom -66.6%;
`

const current = css`
  font-weight: bold;
`

export const A: SFC<{
  to?: string
  external?: boolean
  underline?: boolean
  current?: boolean
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}> = props => {
  const className = [a, props.underline && underline, props.current && current].filter(style => style).join(' ')
  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.currentTarget.blur()
    props.onClick && props.onClick(e)
  }
  return props.to ? props.external
  ? <a className={className} href={props.to} target='_blank'>
    {props.children}
  </a>
  : <NavLink onClick={onClick} activeClassName={current} className={className} to={props.to}>
    {props.children}
  </NavLink>
  : <a onClick={onClick} className={className}>
    {props.children}
  </a>
}

const medium = css`
  font-size: ${rythm*2}px;
  font-weight: bold;
  line-height: ${rythm*2}px;
`

export const Medium: SFC<{}> = props => {
  return <span className={medium}>{props.children}</span>
}

const big = css`
  font-weight: bold;
  font-size: ${rythm*3}px;
  line-height: ${rythm*3}px;
`

export const Big: SFC<{}> = props => {
  return <span className={big}>{props.children}</span>
}

const huge = breakpoints(css`
  font-weight: bold;
  font-size: ${rythm*4}px;
  line-height: ${rythm*4}px;
`, {
  phone: css`
    font-size: ${rythm*2.66}px;
    line-height: ${rythm*2.66}px;
  `
})

export const Huge: SFC<{}> = props => {
  return <span className={huge}>{props.children}</span>
}

const center = css`text-align: center;`
export const Center: SFC<{}> = props => {
  return <div className={center}>{props.children}</div>
}

const spacer = css`margin-bottom: ${rythm*3}px;`
export const Spacer: SFC<{}> = props => {
  return <div className={spacer}>{props.children}</div>
}
