import { documentToReactComponents, Options, RenderNode } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'

export const date = (value: string | Date, time=true, lang='en') =>
  value !== undefined && value !== null ? new Date(value)
    .toLocaleDateString(
      lang === 'fr' ? 'fr-CA' : 'en-us',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...time && {
          hour: '2-digit',
          minute: '2-digit'
        }
      }
    ).replace(/,/g, '')
  : '–'


export const money = (value: number, currency?: string) => 
  value !== undefined && value !== null ? `$${value.toFixed(2)}${currency ? ` ${currency}` : ''}` : `–`

export const rich = (value: Document) => documentToReactComponents(value)