import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'

const Routes = ({ routes }) => {
  return(
    <ul>
      { routes.map( route => (
        <li key={route.path}>
          <Link to={route.url}>{route.relative}</Link>
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
