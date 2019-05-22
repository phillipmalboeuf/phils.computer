import * as React from 'react'
import { SFC } from 'react'
import { Link } from 'react-router-dom'
import { ContentContext } from '../contexts/content'

import { css } from 'emotion'
import { rythm, colors, gutter, radius } from '../styles'

const styles = css`
  cursor: pointer;
  outline: none;
  position: relative;
  display: inline-block;

  color: ${colors.white};
  text-decoration: none;
  line-height: ${rythm}px;
  font-size: ${rythm/1.333}px;
  font-weight: bold;
  text-align: center;
  background-color: ${colors.black};

  padding: ${rythm/2}px ${rythm*3}px;
  border: 1px solid ${colors.white};
  border-radius: ${radius}px;

  &:hover,
  &:focus {
    top: -1px;
  }

  &:active {
    top: 0px;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.88;
  }
`

const full = css`
  width: 100%;
`

export interface Props {
  to?: string,
  external?: boolean
  disabled?: boolean,
  submit?: boolean,
  full?: boolean,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: SFC<Props> = props => {
  const className = [styles, props.full && full].filter(style => style).join(' ')
  return props.to 
    ? props.external
      ? <a className={className} href={props.to} target='_blank'>{props.children}</a>
      : <Link to={props.to} className={className}>{props.children}</Link>
    : <button type={props.submit ? 'submit' : 'button'} className={className} disabled={props.disabled} onClick={(e)=> {
      e.currentTarget.blur()
      props.onClick && props.onClick(e)
    }}>{props.children}</button>
}