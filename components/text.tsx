import React, { SFC } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { css } from 'emotion'
import { rythm, colors, gutter } from '../styles'


const a = css`
  text-decoration: none;
  background-image: linear-gradient(currentColor, currentColor);
  background-repeat: no-repeat;
  background-size: 100% .666em;
  background-position: left 0 bottom -66.6%;

  &:hover,
  &:focus {
    background-position: left 0 bottom -100%;
  }
`

export const A: SFC<{
  to?: string
  external?: boolean
}> = props => {
  return props.to ? props.external
  ? <a className={a} href={props.to} target='_blank'>
    {props.children}
  </a>
  : <NavLink className={a} to={props.to}>
    {props.children}
  </NavLink>
  : <a className={a}>
    {props.children}
  </a>
}

const big = css`
  font-size: ${rythm*3}px;
  font-weight: bold;
  line-height: ${rythm*3}px;
`

export const Big: SFC<{}> = props => {
  return <span className={big}>{props.children}</span>
}
