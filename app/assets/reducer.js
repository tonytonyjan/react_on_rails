export { routerReducer as routing } from 'react-router-redux'

export function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREASE':
      return state + 1
    case 'DECREASE':
      return state - 1
    default:
      return state
  }
}
