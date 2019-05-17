

import * as React from 'react'
import { Component } from 'react'
import { css } from 'emotion'
import { set, get } from 'object-path'

import { FormContext, FormContextProps } from '../contexts/form'
import { Button } from './button'
import { colors, rythm, radius } from '../styles'
import { Flex } from './layout'


interface Props {
  id: string,
  button?: string,
  values?: { [key:string]: any },
  disabled?: boolean,
  autosave?: boolean,
  onSubmit: (values: { [key:string]: any })=> Promise<string | JSX.Element | void>
}
interface State extends FormContextProps {
  waiting: boolean,
  response?: string | JSX.Element,
  error?: string | JSX.Element
}

export class Form extends Component<Props, State> {

  private autosave: NodeJS.Timeout = null

  constructor(props: Props) {
    super(props)
    this.state = {
      values: props.values || {},
      waiting: false
    }
  }

  async onSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e && e.preventDefault()
    this.setState({
      waiting: true,
      error: undefined
    })

    this.props.onSubmit(this.state.values).then(response => this.setState({
        response: response || null,
        waiting: false
      })).catch(error => {
        console.error(error)
        this.setState({
          error: error.response.data.message,
          waiting: false
        })
      })
  }

  onChange(name: string, value: any) {
    set(this.state.values, name, value)
    this.setState({
      values : this.state.values
    })

    if (this.props.autosave) {
      clearTimeout(this.autosave)
      this.autosave = setTimeout(()=> {
        this.onSubmit()
      }, 500)
    }
  }

  componentWillUnmount() {
    this.autosave && clearTimeout(this.autosave)
  }

  public styles = {
    form: css`
      margin: 0 0 ${rythm}px;
    `,
    error: css`
      color: ${colors.white};
      background-color: ${colors.red};
      padding: ${rythm/2}px ${rythm}px;
      margin: ${rythm} 0;
    `
  }

  public render() {
    return this.state.response
    ? this.state.response
    : <form id={this.props.id} className={this.styles.form} {...({ disabled: this.props.disabled || this.state.waiting })} onSubmit={this.onSubmit.bind(this)}>
      <FormContext.Provider value={{
        form_id: this.props.id,
        onChange: this.onChange.bind(this),
        values: this.state.values
      }}>
        {this.props.children}
      </FormContext.Provider>
      {this.state.error && <div className={this.styles.error}>{this.state.error}</div>}
      {this.props.button && <Button submit disabled={this.state.waiting}>{this.state.waiting ? 'One moment...' : this.props.button || 'Save'}</Button>}
    </form>
  }
}

interface InputProps {
  name: string,
  placeholder?: string,
  value?: any,
  defaultValue?: any,
  type?: string,
  label?: string,
  min?: number,
  max?: number,
  optional?: boolean,
  disabled?: boolean,
  autoFocus?: boolean,
  newPassword?: boolean,
  options?: {value: string | number, label: string, disabled?: boolean}[]
}

const input = css`
  position: relative;

  font-size: ${rythm/1.333}px;
  font-weight: normal;
  color: ${colors.black};
  background-color: ${colors.ash};
  border: 2px solid ${colors.white};
  border-radius: ${radius}px;

  width: 100%;
  padding: ${rythm/1.333}px ${rythm/1.5}px;
  margin-bottom: ${rythm/1.333}px;

  &:active {
    top: 1px;
  }

  &:focus {
    outline: none;
    background-color: ${colors.white};
    border-color: ${colors.kelly};
  }
`

const label = css`
  font-size: ${rythm/1.666}px;
  font-weight: bold;
  text-align: left;
  
  display: block;
  margin-bottom: ${rythm/4}px;
`

export const Input: React.SFC<InputProps> = (props) => {
  return <FormContext.Consumer>
    {(context) => {

      if (props.type === 'select') {
        return <>
          {props.label && <label className={label} htmlFor={`${context.form_id}_${props.name}`}>{props.label}</label>}
          <select className={input} name={props.name} id={`${context.form_id}_${props.name}`}
            defaultValue={props.defaultValue}
            value={get(context.values, props.name) || props.value || undefined}
            disabled={props.disabled ? true : false}
            autoFocus={props.autoFocus ? true : false}
            onChange={e => context.onChange(props.name, e.currentTarget.value)}>
            <option disabled />
            {props.options.map(option => <option value={option.value} key={option.value} disabled={option.disabled}>{option.label}</option>)}
          </select>
        </>
      } else if (props.type === 'textarea') {
        return <>
          {props.label && <label className={label} htmlFor={`${context.form_id}_${props.name}`}>
            <Flex spaced>
              <span>{props.label}{props.optional ? ' (Opt.)' : '' }</span>
              {props.max && <small>{get(context.values, props.name) ? <span className={props.max - (get(context.values, props.name) as string).length < 6 ? 'red' : ''}>{props.max - (get(context.values, props.name) as string).length}</span> : props.max}</small>}
            </Flex>
          </label>}
          <textarea className={input} name={props.name} id={`${context.form_id}_${props.name}`}
            defaultValue={props.defaultValue}
            value={get(context.values, props.name) || props.value || ''}
            rows={5}
            maxLength={props.max}
            required={props.optional ? false : true}
            disabled={props.disabled ? true : false}
            autoFocus={props.autoFocus ? true : false}
            onChange={e => context.onChange(props.name, e.currentTarget.value)}
            placeholder={props.placeholder} />
        </>
      }

      return <>
        {props.label && <label className={label} htmlFor={`${context.form_id}_${props.name}`}>{props.label}{props.optional ? ' (Optional)' : '' }</label>}
        <input className={input} name={props.name} id={`${context.form_id}_${props.name}`}
          placeholder={props.placeholder}
          type={props.type ? props.type : 'text'}
          value={get(context.values, props.name) || props.value || ''}
          defaultValue={props.defaultValue}
          min={props.min}
          max={props.max}
          required={props.optional ? false : true}
          disabled={props.disabled ? true : false}
          autoFocus={props.autoFocus ? true : false}
          autoComplete={props.type == 'password' && props.newPassword ? 'new-password' : props.type == 'search' ? 'off' : null}
          step={props.type == 'number' ? 'any' : null}
          onChange={e => context.onChange(props.name, e.currentTarget.value)} />
      </>
    }}
  </FormContext.Consumer>
}