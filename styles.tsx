import React, { Component, SFC } from 'react'
import { Global, css } from '@emotion/core'

export const font = 'Inter UI, sans-serif'

export const colors = {
  white: 'white',
  black: '#000001',
  ash: '#F2F3F2'
}

export const rythm = 20
export const gutter = rythm * 1.666
export const radius = 3

export const GlobalStyles: SFC<{}> = props => <Global
  styles={css`
    body {
      font-family: ${font};
      font-size: ${rythm}px;
      line-height: ${rythm*1.333}px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      
      color: ${colors.black};
      background-color: ${colors.ash};
      white-space: pre-line;
      margin: 0;
    }

    a, button {
      color: inherit;
      position: relative;
      &:active { top: 1px; }
    }
  `}
/>