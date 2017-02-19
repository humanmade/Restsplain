import React, { PropTypes } from 'react'
import { NavLink } from 'react-router-dom'
import RouteParameters from './RouteParameters'
import Parameters from './Parameters'
import Links from './Links'
import CodeContainer from '../../containers/CodeContainer'
import { trim, getRouteReadable, makeID, getRouteURL } from '../../helpers/formatting'
import { isEmpty } from '../../helpers/conditionals'
import config from '../../data/config'

const Endpoint = ( { route, excerpt = false } ) => {

  let resource = (route._links && route._links.self) ||
                 `${trim( config.restBase, '/' )}${route.self}`

  let hash = location.hash.substr( 1 )

  if ( excerpt ) {
    return (
      <section className="restsplain-endpoint">
        <h3>
          <NavLink to={`/endpoints${getRouteURL( route.self )}`}>{getRouteReadable( route.self )}</NavLink>
        </h3>

        { route.description && <p className="restsplain-route-description">{route.description}</p> }
      </section>
    )
  }

  return (
    <section className="restsplain-endpoint">

      <h1>
        {getRouteReadable( route.self )}
      </h1>

      { route.description && <p className="restsplain-route-description">{route.description}</p> }

      <div className="restsplain-endpoint-url">
        <h3>Resource URL</h3>
        <p>{getRouteReadable( resource )}</p>
        <RouteParameters route={route.self}/>
      </div>

      { route._links && <Links links={route._links}/> }

      <nav className="restsplain-endpoint-method-switcher">
        { route.methods.map( method => (
          <NavLink
            key={method}
            className={`method-${method.toLowerCase()}`}
            activeClassName="active"
            isActive={(match, location) => {
              return ( method === 'GET' && ! location.hash ) || location.hash.substr(1) === method
            }}
            to={{
              pathname: `/endpoints${getRouteURL( route.self )}`,
              hash: method
            }}>
            {method}
          </NavLink>
        ) ) }
      </nav>

      { route.endpoints.map( ( endpoint, id ) => {

        if ( hash && !endpoint.methods.includes( hash ) ) {
          return null
        }

        if ( !hash && !endpoint.methods.includes( 'GET' ) ) {
          return null
        }

        return (
          <div key={id} className="restsplain-endpoint-data">
            <h2
              id={makeID( [ ...endpoint.methods ] )}
            >
              {endpoint.methods.join( ', ' )}
            </h2>

            { endpoint.description && <p className="restsplain-endpoint-description">{endpoint.description}</p> }

            { ! isEmpty(endpoint.args) && <Parameters args={endpoint.args}/> }

            <CodeContainer methods={endpoint.methods} resource={resource} args={endpoint.args} />

          </div>
        )
      } ) }

    </section>
  )
}

Endpoint.propTypes = {
  route  : PropTypes.object.isRequired,
  excerpt: PropTypes.bool
}

export default Endpoint
