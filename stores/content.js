import { readable, writable } from 'svelte/store'
import { entries } from '../clients/contentful'

export const locale = writable('en-US')

export const content = readable(undefined, set => {
  entries('en-US').then(content => set(content))
})