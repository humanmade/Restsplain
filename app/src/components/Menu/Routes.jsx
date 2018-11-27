import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const Routes = ({ routes }) => {
  return(
    <ul>
      { routes.map( route => (
        <li key={route.path}>
          <NavLink exact activeClassName="active" to={`/endpoints${route.url}`}>{route.relative}</NavLink>
        </li>
      ) ) }
    </ul>
  )
}

Routes.propTypes = {
  routes: PropTypes.arrayOf( PropTypes.shape( {
    path: PropTypes.string.isRequired,
    relative: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  } ) ).isRequired
}

export default Routes
