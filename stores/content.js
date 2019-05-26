import { readable } from 'svelte/store'
import { entries } from '../clients/contentful'

export const content = readable(undefined, set => {
  entries('en-US').then(content => set(content))
})