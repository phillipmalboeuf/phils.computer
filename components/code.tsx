import * as React from 'react'
import { SFC, PureComponent } from 'react'

import Prism from 'prismjs'
import 'prismjs/components/prism-typescript.js'
import 'prismjs/components/prism-jsx.js'
import 'prismjs/components/prism-tsx.js'


import { css } from 'emotion'
import { rythm, colors, gutter, radius } from '../styles'
import { breakpoints } from './layout';

export class Code extends PureComponent<{}, {}> {

  private pre: HTMLPreElement

  componentDidMount() {
    Prism.highlightElement(this.pre)
  }

  public styles = breakpoints(css`
    margin: ${rythm*2}px -${rythm*6.66}px ${rythm*2}px -${rythm*3.33}px;
    padding: ${rythm}px;
    overflow: auto;

    line-height: ${rythm*1.2}px;
    tab-size: 2;
    hyphens: none;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;

    color: ${colors.white};
    background-color: ${colors.black};

    .token.comment,
    .token.block-comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: #608B4E;
    }

    .token.punctuation {
      color: #ccc;
    }

    .token.tag,
    .token.namespace,
    .token.deleted {
      color: #4EC9B0;
    }

    .token.attr-name {
      color: #9CDCFE;
    }

    .token.function-name {
      color: #6196cc;
    }

    .token.boolean {
      color: #569CD6;
    }
    .token.number {
      color: #B5CEA8;
    }
    .token.function {
      color: #DCDCAA;
    }

    .token.property,
    .token.constant,
    .token.symbol {
      color: #f8c555;
    }

    .token.class-name {
      color: #4EC9B0;
    }

    .token.selector,
    .token.important,
    .token.atrule,
    .token.keyword,
    .token.builtin {
      color: #C586C0;
    }

    .token.string,
    .token.char,
    .token.attr-value,
    .token.regex,
    .token.variable {
      color: #CE9169;
    }

    .token.operator {
      color: #D4D4D4;
    }
    .token.entity,
    .token.url {
      color: #67cdcc;
    }

    .token.important,
    .token.bold {
      font-weight: bold;
    }
    .token.italic {
      font-style: italic;
    }

    .token.entity {
      cursor: help;
    }

    .token.inserted {
      color: green;
    }
    /* TypeScript */
    .language-jsx .token:not(.keyword) + .token.keyword + .token.keyword + .token.keyword,
    .language-jsx .token:not(.keyword) + .token.keyword + .token.keyword + .token.keyword + .token.class-name + .token.keyword,
    .language-jsx .token.function-variable.function + .token.operator + .token.keyword {
      color: #569CD6;
    }
    /* JSX */
    .language-jsx .language-javascript {
      color: #9CDCFE;
    }
    .language-jsx .language-javascript .token.string {
      color: #CE9169;
    }
    .language-jsx .language-javascript .token.punctuation {
      color: #3F9CD6;
    }
    .language-jsx .language-javascript .script-punctuation + .token.punctuation + .token.punctuation {
      color: #D4D4D4;
    }
    .language-jsx .language-javascript .script-punctuation + .token.punctuation + .token.punctuation ~ .token.punctuation {
      color: #D4D4D4;
    }
    .language-jsx .language-javascript .script-punctuation + .token.punctuation + .token.punctuation ~ .token.punctuation + .token.punctuation {
      color: #3F9CD6;
    }
  `, {
    portrait: css`
      margin: ${rythm*2}px -${rythm*2}px ${rythm*2}px -${rythm}px;
    `
  })

  render() {
    return <pre className={['lang-tsx', this.styles].join(' ')} ref={pre => this.pre = pre}>
      {this.props.children}
    </pre>
  }
}