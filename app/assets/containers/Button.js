import {increase} from 'action'
import Button from 'components/Button'

import {connect} from 'react-redux'

export default connect(
  state => ({
    text: state.counter
  }),
  dispatch => ({
    onClick: () => dispatch(increase())
  })
)(Button)
