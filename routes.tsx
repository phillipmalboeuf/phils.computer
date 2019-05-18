
import * as React from 'react'
import { Component } from 'react'
import { Route, Redirect, Switch, RouteComponentProps } from 'react-router-dom'

import { Home } from './routes/home'
import { Page } from './routes/page'
import { Collection } from './routes/collection'
import { Portfolio } from './routes/portfolio'
import { Journal } from './routes/journal'
import { Article } from './routes/article'
import { Bookshelf } from './routes/bookshelf'
import { Thanks } from './routes/thanks'
import { FourOFour } from './routes/404'

// import { Product } from './routes/product'
// import { Subscribe } from './routes/subscribe'
// import { Account } from './routes/account'
// import { Login } from './routes/login'

interface CollectionRoute extends RouteComponentProps<{ id: string }> {}
interface Props {}

export class Routes extends Component<Props, {}> { 
  render() {
    return <Switch>
      <Route exact path='/collections/:id'
        component={(props: CollectionRoute)=> <Collection key={props.match.params.id} {...props} />} />
      <Route exact path='/portfolios/:id'
        component={(props: CollectionRoute)=> <Portfolio key={props.match.params.id} {...props} />} />
      <Route exact path='/journals/:id'
        component={(props: CollectionRoute)=> <Journal key={props.match.params.id} {...props} />} />
      <Route exact path='/articles/:id'
        component={(props: CollectionRoute)=> <Article key={props.match.params.id} {...props} />} />
      <Route exact path='/journals/:journal/articles/:id'
        component={(props: CollectionRoute)=> <Article key={props.match.params.id} {...props} />} />
      <Route exact path='/bookshelfs/:id'
        component={(props: CollectionRoute)=> <Bookshelf key={props.match.params.id} {...props} />} />
      <Route exact path='/pages/:id'
        component={(props: CollectionRoute)=> <Page key={props.match.params.id} {...props} />} />
      <Route exact path='/' component={Home} />
      {/* 
      <Route exact path='/products/:sku' component={Product} />
      <Route exact path='/collections/:id/products/:sku' component={Product} /> */}
      <Route exact path='/thanks' component={Thanks} />
      <Route component={FourOFour} />
    </Switch>
  }

}