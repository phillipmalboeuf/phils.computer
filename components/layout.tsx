import * as React from 'react'
import { SFC } from 'react'

import { css } from 'emotion'
import { rythm, colors, gutter } from '../styles'


const flex = css`
  display: flex;
  flex-wrap: wrap;
`

const center = css`
  justify-content: center;
`

const spaced = css`
  justify-content: space-between;
`

const middle = css`
  align-items: center;
`

export const Flex: SFC<{
  center?: boolean
  spaced?: boolean
  middle?: boolean
}> = props => {
  return <div className={[flex, props.center && center, props.spaced && spaced, props.middle && middle].filter(i => i).join(' ')}>
    {props.children}
  </div>
}

const width = (width: number)=> {
  return css`
    width: ${(width*100).toFixed(1)}%;
  `
}

export interface Breakpoints {
  big?: string
  landscape?: string
  portrait?: string
  phone?: string
}

export const brake = (point: 'big' | 'landscape' | 'portrait' | 'phone', styles: string)=> {
  return css`
    @media ${{
      big: 'all and (min-width:1800px)',
      landscape: 'all and (max-width:1200px)',
      portrait: 'all and (max-width:988px)',
      phone: 'all and (max-width:666px)'
    }[point]} {
      ${styles}
    }
  `
}

export const breakpoints = (initial: string, points: Breakpoints)=> {
  return [initial, points.big && brake('big', points.big), points.landscape && brake('landscape', points.landscape), points.portrait && brake('portrait', points.portrait), points.phone && brake('phone', points.phone)].filter(i => i).join(' ')
}

export const third = width(0.333)
export const Third: SFC<Breakpoints> = props => {
  return <div className={breakpoints(third, props)}>
    {props.children}
  </div>
}

export const twothirds = width(0.666)
export const TwoThirds: SFC<Breakpoints> = props => {
  return <div className={breakpoints(twothirds, props)}>
    {props.children}
  </div>
}

export const half = width(0.5)
export const Half: SFC<Breakpoints> = props => {
  return <div className={breakpoints(half, props)}>
    {props.children}
  </div>
}

export const quarter = width(0.25)
export const Quarter: SFC<Breakpoints> = props => {
  console.log(props)
  return <div className={breakpoints(quarter, props)}>
    {props.children}
  </div>
}

export const threequarter = width(0.75)
export const ThreeQuarter: SFC<Breakpoints> = props => {
  return <div className={breakpoints(threequarter, props)}>
    {props.children}
  </div>
}

export const full = width(1)
export const Full: SFC<Breakpoints> = props => {
  return <div className={breakpoints(full, props)}>
    {props.children}
  </div>
}