import * as React from 'react'
import { Component, SFC } from 'react'
import { Global, css } from '@emotion/core'

export const font = 'Inter, sans-serif'

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
    @font-face {
      font-family: 'Inter';
      src: url('https://rsms.me/inter/font-files/Inter-Regular.woff2') format('woff2');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Inter';
      src: url('https://rsms.me/inter/font-files/Inter-SemiBold.woff2') format('woff2');
      font-weight: bold;
      font-style: normal;
      font-display: swap;
    }

    @font-face {
      font-family: 'Inter';
      src: url('https://rsms.me/inter/font-files/Inter-Italic.woff2') format('woff2');
      font-weight: normal;
      font-style: italic;
      font-display: swap;
    }

    *, *:before, *:after {
      box-sizing: border-box;
    }

    html {
      background-color: ${colors.black};
    }

    body {
      font-family: ${font};
      font-feature-settings: "case", "ss01";
      font-size: ${rythm}px;
      line-height: ${rythm*1.333}px;
      letter-spacing: -0.014em;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-tap-highlight-color: ${colors.kelly};
      
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

      @media all and (max-width:988px) {
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
      line-height: ${rythm*2.42}px;
      letter-spacing: -0.022em;

      p + &,
      ul + &,
      ol + & {
        margin-top: ${rythm*2}px;
      }
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

    small {
      font-size: ${rythm/1.333}px;
      line-height: ${rythm/1.333}px;
      letter-spacing: -0.009em;
    }

    code,
    pre {
      font-family: monospace;
      font-size: ${rythm/1.2}px;
      line-height: ${rythm}px;
      white-space: pre;
    }

    iframe {
      width: 100%;
      height: 33vh;
      background-color: ${colors.black};
      margin-bottom: ${rythm}px;
    }
  `}
/>