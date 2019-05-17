import * as React from 'react'
import { createContext } from 'react'

export const FormContext = createContext({
  form_id: undefined as string,
  values: {} as { [key:string]: any },
  onChange: function(name: string, value: any): void {},
})

export interface FormContextProps {
  values: { [key:string]: any },
}