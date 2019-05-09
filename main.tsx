
import React, { Component } from 'react'
import { render, hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ContentContext, Content } from './contexts/content'

import axios, { AxiosRequestConfig } from 'axios'

import { css } from 'emotion'
import { font, colors, rythm, GlobalStyles, gutter } from './styles'

import { Header } from './components/header'
import { Footer } from './components/footer'
import { Routes } from './routes'


export class Main extends Component<{}, {
  content?: Content
  locale: string
}> {
  constructor(props: {}) {
    super(props)
    this.state = {
      content: undefined,
      locale: 'en-US'
    }
  }

  componentDidMount() {
    !this.state.content && this.fetchContent()
  }

  private fetchContent() {
    axios.get(`${process.env.NODE_ENV === 'production' ? '' : '//localhost:8089'}/content`, {
      withCredentials: true
    })
      .then(response => this.setState({
        content: response.data
      }))
  }

  private selectLocale(locale: string) {
    // cookies.set('locale', locale)
    this.setState({ locale })
  }

  public styles = css`
    max-width: 42rem;
    margin: 0 auto;
    min-height: 88vh;
    padding: ${gutter*3.33}px ${gutter}px;
  `

  render() {
    return <>
      {this.state.content
      ? <ContentContext.Provider value={{
        content: this.state.content,
        fetchContent: this.fetchContent.bind(this),
        locale: this.state.locale || 'en-US',
        selectLocale: this.selectLocale.bind(this)
      }}>
        <BrowserRouter>
          <>
          <Header />
            <main className={this.styles}><Routes /></main>
          <Footer />
          </>
        </BrowserRouter>
      </ContentContext.Provider> : null}
      <GlobalStyles />
    </>
  }
}

if (process.env.NODE_ENV === 'production') {
  hydrate(<Main />, document.getElementById('main'))
} else {
  render(<Main />, document.getElementById('main'))
}