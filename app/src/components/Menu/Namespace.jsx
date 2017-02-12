import React, { PropTypes } from 'react'
import Routes from './Routes'

const Namespace = ({ namespace, routes }) => (
  <li key={namespace} className="restsplain-menu-namespace">
    <h3>{namespace}</h3>
    <Routes routes={routes} />
  </li>
)

Namespace.propTypes = {
  namespace: PropTypes.string.isRequired,
  routes: PropTypes.array
}

export default Namespace
