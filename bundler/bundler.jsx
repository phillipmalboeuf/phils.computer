import Bundler, { Packager } from 'parcel-bundler'
import Path from 'path'

import React from 'react'
import ReactDOM from 'react-dom/server'
// import { ServerStyleSheet } from 'styled-components'
import { StaticRouter } from 'react-router'

import { entries } from '../clients/contentful'
import { ContentContext, Content } from '../contexts/content'

import { Routes } from '../routes'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { GlobalStyles } from '../styles'


const entryFiles = Path.join(__dirname, '../../*.html')
const bundler = new Bundler(entryFiles, {
  contentHash: true,
  minify: true,
  scopeHoist: true,
  sourceMaps: false,
  target: 'browser',
  watch: false,
  detailedReport: true
})


class RoutesPackager extends Packager {
  async addAsset(asset) {
    // const styles = Array.from(asset.depAssets).find(([key, value])=> key.name === './styles/styles.scss')
    // const sheet = new ServerStyleSheet()
    // const html = ReactDOM.renderToString(sheet.collectStyles(
    //   <StaticRouter location={`/${asset.basename.replace('.html', '').replace('index', '')}`} context={{}}>
    //     <Routes />
    //   </StaticRouter>
    // ))
    
    const html = ReactDOM.renderToString(<>
      <ContentContext.Provider value={{
        content: await entries(),
        fetchContent: undefined,
        locale: 'en-US',
        selectLocale: undefined
      }}>
        <StaticRouter location={`/${asset.basename.replace('.html', '').replace('index', '')}`} context={{}}>
          <>
            <Header />
            <main><Routes /></main>
            <Footer />
          </>
        </StaticRouter>
        <GlobalStyles />
      </ContentContext.Provider>
    </>)

    await this.dest.write(asset.generated.html
      .replace('<div id="main"></div>', `
        <div id="main">
          ${html}
        </div>
      `))
      // .replace(new RegExp('<link rel="stylesheet" href="/styles.*.css">'), `
      //   <style>${styles[1].generated.css}</style>
      //   ${sheet.getStyleTags()}
      // `))
  }
}

bundler.addPackager('html', RoutesPackager)

// bundler.on('bundled', (bundle) => {
//   console.log(bundle)
// })

bundler.bundle()