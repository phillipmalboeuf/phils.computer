
import * as React from 'react'
import { PureComponent } from 'react'
import { css } from 'emotion'

import { Button, Props as ButtonProps } from './button'
import { colors, rythm, radius } from '../styles'
// import { Glide, Fade } from './animations'

interface Props {
  visible?: boolean
  wider?: boolean
  button?: string | JSX.Element
  buttonProps?: ButtonProps
  onHide?: Function
}
interface State {
  visible: boolean
}

export class Overlay extends PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      visible: props.visible || false
    }
  }

  componentDidMount() {
    document.documentElement.classList.remove('noscroll')
  }

  public toggle() {
    this.setState({visible: !this.state.visible})
    document.documentElement.classList.toggle('noscroll')
  }

  public hide() {
    this.setState({visible: false})
    document.documentElement.classList.remove('noscroll')
    this.props.onHide && this.props.onHide()
  }

  public styles = {
    overlay: css`
      display: flex;
      justify-content: center;
      align-items: center;

      position: fixed;
      top: 0;
      left: 0;
      z-index: 666;

      width: 100vw;
      height: 100vh;
      overflow-y: auto;
    `,
    back: css`
      position: relative;
      display: inline-block;
      position: fixed;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;
      z-index: -1;

      background: ${colors.white};
      opacity: 0.666;
      border: none;
    `,
    container: css`
      position: relative;
      width: 100%;
      max-width: ${rythm*33}px;
      padding: ${rythm*2}px;
      color: ${colors.white};
      background-color: ${colors.black};
      border: 2px solid ${colors.white};
      border-radius: ${radius*2}px;
    `,
    wider: css`
      max-width: ${rythm*42}px;
    `,
    close: css`
      position: absolute;
      top: 0;
      right: 0;
      display: inline-block;
      padding: ${rythm/1.666}px;

      font-size: ${rythm}px;
      font-weight: bold;
      background: transparent;
      border: none;

      &:hover,
      &:focus {
        top: -1px;
      }

      &:active {
        top: 0px;
      }
    `
  }

  public render() {
    return <>
      {this.props.button && <Button {...this.props.buttonProps} onClick={()=> this.toggle()}>{this.props.button}</Button>}
      {this.state.visible
        ? <div className={this.styles.overlay}>
          <button className={this.styles.back} onClick={()=> this.hide()} />
          <div className={`${this.styles.container}${this.props.wider ? ` ${this.styles.wider}` : ''}`}>
            <button className={this.styles.close} onClick={()=> this.hide()}>✕</button>
            {this.props.children}
          </div>
        </div>
        : null}
    </>
  }
}