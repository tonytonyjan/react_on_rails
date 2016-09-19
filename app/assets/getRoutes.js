import React from 'react'
import {Router, IndexRoute, Route, browserHistory} from 'react-router'
import {App, Home, About, NoMatch} from 'pages'

export default (history=browserHistory) => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="about" component={About}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
)
