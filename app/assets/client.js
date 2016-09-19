import getStore from 'getStore'
import getRoutes from 'getRoutes'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'

const store = getStore(window.__PRELOADED_STATE__)
const history = syncHistoryWithStore(browserHistory, store)
const routes = getRoutes(history)

var app = document.getElementById('app')
render(<Provider store={store}>{routes}</Provider>, app)
