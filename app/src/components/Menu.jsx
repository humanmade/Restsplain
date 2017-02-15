import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import Namespace from './Menu/Namespace'
import { getNamespacedRoutes } from '../helpers/transform'

const Menu = ({ schema }) => {

  let routes = getNamespacedRoutes(schema.routes)

  return (

    <nav className="restsplain-menu">
      {
        // Menu
        //  - Pages
        //  - Auths
        //  - Errors
        //  - Endpoints
      }

      <div className="restsplain-pages">
        <h2>Documentation</h2>
        {
          // TODO: Add documentation pages
        }
        { !!schema.errors &&
          <div className="restsplain-errors">
            <h3><Link to="/errors/">Errors</Link></h3>
          </div>
        }

        { !!schema.authentication &&
          <div className="restsplain-authentication">
            <h3>Authentication</h3>
            <ul>
              {
                // TODO: Add authentication pages
              }
            </ul>
          </div>
        }
      </div>

      { !!schema.namespaces &&
        <div className="restsplain-namespaces">
          <h2>Endpoints</h2>
          <ul>
            { schema.namespaces.map( namespace => <Namespace key={namespace} namespace={namespace} routes={routes[namespace]} /> ) }
          </ul>
        </div>
      }
    </nav>

  )
}

Menu.propTypes = {
  schema: PropTypes.object.isRequired
}

export default Menu
