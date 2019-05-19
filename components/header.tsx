import * as React from 'react'
import { SFC } from 'react'
import { Link } from 'react-router-dom'
import { ContentContext } from '../contexts/content'

import { css } from 'emotion'
import { rythm, colors, gutter, radius, slow } from '../styles'

import { Navigation } from './navigation'
import { A, Big, Medium } from './text'
import { breakpoints } from './layout'

const styles = breakpoints(css`
  position: fixed;
  top: 0;
  left: 0;
  width: ${gutter*6}px;
  padding: ${gutter*2}px ${gutter}px;

  span {
    display: block;
    margin-bottom: ${rythm/2}px;
  }
`, {
  portrait: css`
    position: absolute;
    padding: ${gutter/2}px;

    span {
      font-size: ${rythm}px;
      line-height: ${rythm}px;
    }

    > nav {
      position: fixed;
      z-index: 66;
      width: 50vw;
      top: 33vh;
      left: 100vw;
      padding: ${gutter/2}px;
      color: ${colors.white};
      background-color: ${colors.black};
      border: 1px solid ${colors.white};
      border-right: 0;
      border-radius: ${radius}px;

      transform: translateX(0);
      transition: transform ${slow}s;

      &:hover {
        transform: translateX(-100%);
      }

      &:before {
        content: "Menu";
        display: inline-block;
        position: absolute;
        top: 0;
        right: 100%;

        font-size: ${rythm/1.333}px;
        padding: ${gutter/8.8}px ${gutter/4}px;
        border: 1px solid ${colors.white};
        border-bottom: 0;
        border-radius: ${radius}px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        background-color: ${colors.black};
        transform-origin: 100% 100%;
        transform: translateX(1px) rotate(-90deg);
      }
    }
  `
})

const right = breakpoints(css`
  left: auto;
  right: 0;
  text-align: right;
`, {
  portrait: css`
    position: fixed;
    z-index: 66;
    font-size: ${rythm/1.333}px;
  `
})

export const Header: SFC<{}> = props => {
  return <ContentContext.Consumer>
    {({ content, locale, selectLocale }) => <>
      <header className={styles}>
        <A to='/'><Medium>{content.header.fields.title}</Medium></A>
        <Navigation links={content.header.fields.links} />
      </header>
      <header className={[styles, right].join(' ')}>
        <A current={locale === undefined || locale === 'en-US'} onClick={e => selectLocale('en-US')}>En</A> <A current={locale === 'fr-CA'} onClick={e => selectLocale('fr-CA')}>Fr</A>
      </header>
    </>}
  </ContentContext.Consumer>
}