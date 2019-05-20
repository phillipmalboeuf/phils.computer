import * as React from 'react'
import { documentToReactComponents, Options, RenderNode } from '@contentful/rich-text-react-renderer'
import { Document, BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'

import { A } from '../components/text'

export const date = (value: string | Date, time=true, month=false, lang='en') =>
  value !== undefined && value !== null ? new Date(value)
    .toLocaleDateString(
      lang === 'fr' ? 'fr-CA' : 'en-us',
      {
        year: 'numeric',
        month: 'long',
        ...!month && { day: 'numeric' },
        ...time && {
          hour: '2-digit',
          minute: '2-digit'
        }
      }
    ).replace(/,/g, '')
  : '–'


export const money = (value: number, currency?: string) => 
  value !== undefined && value !== null ? `${value}${currency ? ` ${currency}` : ''}` : `–`

export const rich = (value: Document, render?: RenderNode) => documentToReactComponents(value, {
  renderNode: {
    [INLINES.HYPERLINK]: (node, children)=> {
      return <A to={node.data.uri} underline external>{children}</A>
    },
    [INLINES.ENTRY_HYPERLINK]: (node, children)=> {
      return <A to={`/${node.data.target.sys.contentType.sys.id}s/${node.data.target.fields.identifier}`} underline>{children}</A>
    },
    ...render
  }
})