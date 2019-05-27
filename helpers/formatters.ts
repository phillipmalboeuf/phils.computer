import { documentToHtmlString, Options, RenderNode } from '@contentful/rich-text-html-renderer'
import { Document, BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'

export const date = (value: string | Date, time=true, month=false, locale='en-US') =>
  value !== undefined && value !== null ? new Date(value)
    .toLocaleDateString(
      locale,
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

export const rich = (value: Document, render?: RenderNode) => documentToHtmlString(value, {
  renderNode: {
    // [BLOCKS.QUOTE]: (node, children)=> {
    //   return <Code>{children}</Code>
    // },
    // [INLINES.HYPERLINK]: (node, children)=> {
    //   return <A to={node.data.uri} underline external>{children}</A>
    // },
    // [INLINES.ENTRY_HYPERLINK]: (node, next)=> {
    //   return `<a href="/${node.data.target.sys.contentType.sys.id}s/${node.data.target.fields.identifier}" class="underline">${next(node.content)}</a>`
    // },
    ...render
  }
})