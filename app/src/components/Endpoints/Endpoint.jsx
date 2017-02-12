import React, { PropTypes } from 'react'
import EndpointResponse from '../../containers/EndpointResponse'
import RouteParameters from './RouteParameters'
import { trim, getRouteReadable, makeID } from '../../helpers/formatting'
import { getDefault, getTypeString } from '../../helpers/transform'
import config from '../../data/config'

const Endpoint = ({ route }) => {

  let resource = getRouteReadable((route._links && route._links.self) || `${trim(config.restbase, '/')}${route.self}`)

  console.log(route)

  return (
      <section className="restsplain-endpoint" >

        <h1>
          {getRouteReadable(route.self)}
        </h1>

        <div className="restsplain-endpoint-url">
          <h3>Resource URL</h3>
          <p><em>{resource}</em></p>
          <RouteParameters route={route.self} />
        </div>

        { route.endpoints.map( (endpoint, id) => (
          <div key={id} className="restspain-endpoint-data">
            <h2
              id={makeID([...endpoint.methods])}
            >
              {
                // TODO: Determine if the combo is for create, update, fetch, delete
              }
              {endpoint.methods.join(', ')}
            </h2>

            <div className="restsplain-endpoint-parameters">
              <h3>Parameters</h3>
              <table>
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Required</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
                </thead>
                <tbody>
                { Object.keys( endpoint.args ).map( arg => {
                  arg = { name: arg, ...endpoint.args[arg] }

                  return (
                    <tr key={arg.name}>
                      <td>{arg.name}</td>
                      <td>{arg.required ? 'required' : 'optional'}</td>
                      <td>
                        <pre><code>{getTypeString(arg)}</code></pre>
                      </td>
                      <td>
                        { getDefault(arg.default) && <p className="restsplain-arg-default">Default: <code>{getDefault(arg.default, arg.type)}</code></p> }
                        { arg.description && <p className="restsplain-endpoint-arg-description">{arg.description}</p> }
                      </td>
                    </tr>
                  )
                } ) }
                </tbody>
              </table>
            </div>

            <EndpointResponse url={resource} contexts={(endpoint.args.context && endpoint.args.context.enum) || false} />

            {
              // Custom headers
            }

            {
              // CURL example
            }

            {
              // Try fetching
            }

          </div>
        ) ) }

      </section>
  )
}

Endpoint.propTypes = {
  path: PropTypes.string.isRequired,
  route: PropTypes.object.isRequired
}

export default Endpoint
