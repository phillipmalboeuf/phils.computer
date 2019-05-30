
import * as React from 'react'
import { Component } from 'react'
import { css } from 'emotion'

import { colors, rythm, radius, slow } from '../styles'

interface Props {
  visible?: boolean
  className?: string
  origin?: {
    x: number
    y: number
  }
}
interface State {
  visible: boolean
}

export class Fade extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      visible: props.visible || false
    }
  }

  componentDidMount() {
    setTimeout(()=> this.setState({visible: true}), 10)
  }

  public styles = {
    hidden: css`
      opacity: 0;
      will-change: opacity;
      transition: opacity ${slow}s;
    `,
    visible: css`
      opacity: 1;
    `
  }

  public render() {
    return <div className={[this.props.className, this.styles.hidden, this.state.visible && this.styles.visible].filter(style => style).join(' ')}>
      {this.props.children}
    </div>
  }
}

export class Glide extends Fade {
  public styles = {
    hidden: css`
      transform: translateY(-100%);
      will-change: transform;
      transition: transform ${slow}s cubic-bezier(0, -0.55, 0.266, 1.55);
    `,
    visible: css`
      transform: translateY(0);
    `
  }
}

export class Scale extends Fade {
  public styles = {
    hidden: css`
      transform: scale(0.88);
      will-change: transform;
      transition: transform ${slow}s cubic-bezier(0, -0.55, 0.266, 1.55);
    `,
    visible: css`
      transform: scale(1);
    `
  }

  public render() {
    return <div className={[this.props.className, this.styles.hidden, this.state.visible && this.styles.visible].filter(style => style).join(' ')} style={this.props.origin && { transformOrigin: `${this.props.origin.x*100}% ${this.props.origin.y*100}%` }}>
      {this.props.children}
    </div>
  }
}