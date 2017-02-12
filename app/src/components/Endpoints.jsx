import React, { PropTypes } from 'react'
import { Route } from 'react-router-dom'
import Endpoint from './Endpoints/Endpoint'
import { getRouteURL } from '../helpers/formatting'

const Endpoints = ({ routes }) => {
    return (
      <div className="restsplain-endpoints">
        { Object.keys( routes ).map( (route, id) => (
          <Route exact key={id} path={getRouteURL(route)} component={Endpoint} route={({ self: route, ...routes[route]})} />
        ) ) }
      </div>
    )
}

Endpoints.propTypes = {
  routes: PropTypes.object.isRequired
}

export default Endpoints
