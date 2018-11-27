import React from 'react'
import PropTypes from 'prop-types'
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
