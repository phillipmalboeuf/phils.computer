import React, { SFC } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { css } from 'emotion'
import { rythm, colors, gutter } from '../styles'


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
}> = props => {
  const className = [a, props.underline && underline].filter(style => style).join(' ')
  return props.to ? props.external
  ? <a className={className} href={props.to} target='_blank'>
    {props.children}
  </a>
  : <NavLink onClick={e => e.currentTarget.blur()} activeClassName={current} className={className} to={props.to}>
    {props.children}
  </NavLink>
  : <a className={className}>
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
  font-size: ${rythm*3}px;
  font-weight: bold;
  line-height: ${rythm*3}px;
`

export const Big: SFC<{}> = props => {
  return <span className={big}>{props.children}</span>
}

const huge = css`
  font-size: ${rythm*4}px;
  font-weight: bold;
  line-height: ${rythm*4}px;
`

export const Huge: SFC<{}> = props => {
  return <span className={huge}>{props.children}</span>
}

const spacer = css`margin-bottom: ${rythm*3}px;`
export const Spacer: SFC<{}> = props => {
  return <div className={spacer}>{props.children}</div>
}
