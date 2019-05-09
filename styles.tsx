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
    *, *:before, *:after {
      box-sizing: border-box;
    }

    body {
      font-family: ${font};
      font-size: ${rythm}px;
      line-height: ${rythm*1.333}px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      
      color: ${colors.black};
      background-color: ${colors.ash};

      margin: 0;
    }

    main {
      display: block;
    }
    
    h1, h2, h3 {
      font-size: ${rythm*2}px;
      font-weight: bold;
      line-height: ${rythm*2}px;
    }

    h4, h5, h6 {
      font-size: ${rythm}px;
      font-weight: bold;
      line-height: ${rythm}px;
    }

    h1, h2, h3, h4, h5, h6, p {
      white-space: pre-line;
      margin: 0 0 ${rythm}px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    a, button {
      color: inherit;
      text-decoration: none;
      position: relative;
      &:active { top: 1px; }
    }
  `}
/>