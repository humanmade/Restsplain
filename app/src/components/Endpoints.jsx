import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import createFragment from 'react-addons-create-fragment'
import Endpoint from './Endpoints/Endpoint'
import { getRouteURL, trim } from '../helpers/formatting'

const Endpoints = ({ routes }) => {
    return (
      <div className="restsplain-endpoints">
        { Object.keys( routes )
          .filter( route => trim(route, '/') !== trim(routes[route].namespace, '/') && route !== '/' )
          .map( route => createFragment({
            home: <Route exact path="/" render={props => <Endpoint {...props} route={({ self: route, ...routes[route]})} isExcerpt={true} />} />,
            endpoint: <Route exact path={`/endpoints${getRouteURL(route)}`} render={props => <Endpoint {...props} route={({ self: route, ...routes[route]})} />} />
          }) )
        }
      </div>
    )
}

Endpoints.propTypes = {
  routes: PropTypes.object.isRequired
}

export default Endpoints
