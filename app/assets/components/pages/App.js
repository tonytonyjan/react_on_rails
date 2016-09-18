import React from 'react'
import {Link} from 'react-router'

export default props => (
  <div>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
    {props.children}
  </div>
)
