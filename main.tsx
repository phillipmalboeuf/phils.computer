
import * as React from 'react'
import { Component } from 'react'
import { render, hydrate } from 'react-dom'
import { BrowserRouter, Router } from 'react-router-dom'
import { createBrowserHistory, History, UnregisterCallback } from 'history'

import { ContentContext, Content } from './contexts/content'

import axios, { AxiosRequestConfig } from 'axios'

import { hydrate as styleHydrate } from 'emotion'
import { font, colors, rythm, GlobalStyles, gutter } from './styles'

import { Header } from './components/header'
import { Footer } from './components/footer'
import { Routes } from './routes'


interface Props {
  content?: Content
  locale?: string
}

interface State {
  content: Content
  locale: string
  history: History
}

export class Main extends Component<Props, State> {

  private previous: string
  private unlisten: UnregisterCallback

  constructor(props: Props) {
    super(props)
    const locale = props.locale || localStorage.getItem('locale') || undefined
    this.state = {
      content: props.content,
      locale,
      history: createBrowserHistory({
        basename: locale
      })
    }

    if (!location.pathname.startsWith(`/${this.state.locale}`)) {
      this.state.history.replace(this.state.history.location.pathname)
      process.env.NODE_ENV === 'production' && this.fetchContent(this.state.locale)
    }
  }

  componentDidMount() {
    !this.state.content && process.env.NODE_ENV !== 'production' && this.fetchContent(this.state.locale)
    this.unlisten = this.state.history.listen(this.scrollToTop.bind(this))
  }

  private scrollToTop(location: Location) {
    if (this.previous !== location.pathname) {
      window.scrollTo(0, 0)
      this.previous = location.pathname
    }
  }

  private async fetchContent(locale?: string) {
    axios.get(`${process.env.NODE_ENV === 'production' ? '' : '//localhost:3000'}/content${locale ? `?locale=${locale}` : ''}`)
      .then(response => this.setState({
        content: response.data
      }))
  }

  private selectLocale(locale: string) {
    locale === 'en-US' ? localStorage.removeItem('locale') : localStorage.setItem('locale', locale)
    const history =createBrowserHistory({
      basename: locale
    })
    history.replace(this.state.history.location.pathname)
    this.unlisten()
    this.unlisten = history.listen(this.scrollToTop.bind(this))
  
    this.setState({
      locale,
      history
    }) 
    this.fetchContent(locale)
  }

  render() {
    return <>
      {this.state.content
      ? <ContentContext.Provider value={{
        content: this.state.content,
        fetchContent: this.fetchContent.bind(this),
        locale: this.state.locale,
        selectLocale: this.selectLocale.bind(this)
      }}>
        <Router key={this.state.locale} history={this.state.history}>
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

declare global {
  interface Window {
    content: Content
    locale: string
    style_ids: string[]
  }
}

if (process.env.NODE_ENV === 'production') {
  styleHydrate(window.style_ids)
  hydrate(<Main content={window.content} locale={window.locale} />, document.getElementById('main'))
} else {
  render(<Main />, document.getElementById('main'))
}