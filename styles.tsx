import React, { Component, SFC } from 'react'
import { Global, css } from '@emotion/core'

export const font = 'Inter UI, sans-serif'

export const colors = {
  white: 'white',
  black: '#000001',
  ash: '#F2F3F2',
  kelly: '#27AE60',
  red: '#CC0000'
}

export const rythm = 20
export const gutter = rythm * 1.666
export const radius = 3

export const slow = 0.666

export const GlobalStyles: SFC<{}> = props => <Global
  styles={css`
    *, *:before, *:after {
      box-sizing: border-box;
    }

    html {
      background-color: ${colors.black};
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
      max-width: 42rem;
      margin: 0 auto;
      min-height: 88vh;
      padding: ${gutter*2}px ${gutter}px ${gutter*3.33}px;

      @media all and (max-width:600px) {
        padding-top: ${gutter*3.33}px;
        padding-left: ${gutter/2}px;
      }
    }

    article {
      margin: ${rythm}px 0;
    }

    h1, h2, h3, h4, h5, h6, p {
      white-space: pre-line;
      margin: 0 0 ${rythm}px;

      &:last-child {
        margin-bottom: 0;
      }
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
      margin-bottom: ${rythm/2}px;
    }

    a, button {
      outline: none;
      cursor: pointer;
      color: inherit;
      text-decoration: none;
      position: relative;
      &:active { top: 1px; }
    }

    ul, ol {
      margin: 0 0 ${rythm}px;
      padding-left: ${rythm}px;
    }
  `}
/>