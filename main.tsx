
import React, { Component } from 'react'
import { render, hydrate } from 'react-dom'
import { BrowserRouter, Router } from 'react-router-dom'
import { createBrowserHistory, History } from 'history'

import { entries } from './clients/contentful'
import { ContentContext, Content } from './contexts/content'

import axios, { AxiosRequestConfig } from 'axios'

import { css } from 'emotion'
import { font, colors, rythm, GlobalStyles, gutter } from './styles'

import { Header } from './components/header'
import { Footer } from './components/footer'
import { Routes } from './routes'


interface Props {
  content?: Content
  locale?: string
}

interface State {
  content?: Content
  locale: string
}

export class Main extends Component<Props, State> {

  public history: History
  private previous: string

  constructor(props: Props) {
    super(props)
    this.state = {
      content: props.content,
      locale: props.locale || localStorage.getItem('locale') || 'en-US'
    }

    this.history = createBrowserHistory()
    this.history.listen(location => {
      if (this.previous !== location.pathname) {
        window.scrollTo(0, 0)
        this.previous = location.pathname
      }
    })
  }

  componentDidMount() {
    !this.state.content && this.fetchContent()
  }

  private async fetchContent(locale?: string) {
    this.setState({ content: await entries(locale || this.state.locale) })
  }

  private selectLocale(locale: string) {
    localStorage.setItem('locale', locale)
    this.setState({ locale })
    this.fetchContent(locale)
  }

  render() {
    return <>
      {this.state.content
      ? <ContentContext.Provider value={{
        content: this.state.content,
        fetchContent: this.fetchContent.bind(this),
        locale: this.state.locale || 'en-US',
        selectLocale: this.selectLocale.bind(this)
      }}>
        <Router history={this.history}>
          <>
          <Header />
          <main><Routes /></main>
          <Footer />
          </>
        </Router>
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