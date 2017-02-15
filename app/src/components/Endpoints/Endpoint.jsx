import React, { PropTypes } from 'react'
import ResponseContainer from '../../containers/ResponseContainer'
import RouteParameters from './RouteParameters'
import Parameters from './Parameters'
import Curl from './Curl'
import { trim, getRouteReadable, makeID } from '../../helpers/formatting'
import config from '../../data/config'

const Endpoint = ({ route }) => {

  let resource = (route._links && route._links.self) ||
                 `${trim(config.restbase, '/')}${route.self}`

  return (
      <section className="restsplain-endpoint" >

        <h1>
          {getRouteReadable(route.self)}
        </h1>

        <div className="restsplain-endpoint-url">
          <h3>Resource URL</h3>
          <p><em>{getRouteReadable(resource)}</em></p>
          <RouteParameters route={route.self} />
        </div>

        { route.description && <p className="restsplain-route-description">{route.description}</p> }

        { route.endpoints.map( (endpoint, id) => (
          <div key={id} className="restsplain-endpoint-data">
            <h2
              id={makeID([...endpoint.methods])}
            >
              {endpoint.methods.join(', ')}
            </h2>

            { endpoint.description && <p className="restsplain-endpoint-description">{endpoint.description}</p> }

            <Parameters args={endpoint.args || {}} />

            <Curl methods={endpoint.methods} resource={resource} args={endpoint.args || {}} />

            {
              // Fetch the response if...

              // is a GET request
              endpoint.methods.includes('GET') &&
              // has a defined self link
              route._links && route._links.self &&
              // has no required params
              ! Object.keys( endpoint.args ).filter( arg => endpoint.args[arg].required ).length &&
              <ResponseContainer resource={route._links.self} />
            }

          </div>
        ) ) }

      </section>
  )
}

Endpoint.propTypes = {
  route: PropTypes.object.isRequired
}

export default Endpoint
