import * as reducers from 'reducer'

import { createStore, combineReducers } from 'redux'

export default (initState={}) => createStore(
  combineReducers(reducers),
  initState,
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : _ => _
)
