
import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import { Home } from './routes/home'
import { Page } from './routes/page'
import { Collection } from './routes/collection'
import { Portfolio } from './routes/portfolio'
import { Journal } from './routes/journal'
import { Article } from './routes/article'
import { Bookshelf } from './routes/bookshelf'
// import { Product } from './routes/product'
// import { Subscribe } from './routes/subscribe'
// import { Thanks } from './routes/thanks'
// import { Account } from './routes/account'
// import { Login } from './routes/login'
// import { FourOFour } from './routes/404'

interface Props {}

export class Routes extends Component<Props, {}> { 
  render() {
    return <Switch>
      <Route exact path='/collections/:id' component={Collection} />
      <Route exact path='/portfolios/:id' component={Portfolio} />
      <Route exact path='/journals/:id' component={Journal} />
      <Route exact path='/articles/:id' component={Article} />
      <Route exact path='/journals/:journal/articles/:id' component={Article} />
      <Route exact path='/bookshelfs/:id' component={Bookshelf} />
      <Route exact path='/pages/:id' component={Page} />
      <Route exact path='/' component={Home} />
      {/* 
      <Route exact path='/products/:sku' component={Product} />
      <Route exact path='/collections/:id/products/:sku' component={Product} />
      <Route exact path='/thanks' component={Thanks} />
      <Route component={FourOFour} /> */}
    </Switch>
  }

}