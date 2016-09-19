import * as reducers from 'reducer'

import { createStore, combineReducers } from 'redux'

export default createStore(
  combineReducers(reducers),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : _ => _
)
