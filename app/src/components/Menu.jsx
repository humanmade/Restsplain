import React, { PropTypes } from 'react'
import { NavLink } from 'react-router-dom'
import Namespace from './Menu/Namespace'
import { getNamespacedRoutes } from '../helpers/transform'
import { isEmpty } from '../helpers/conditionals'

const Menu = ({ schema }) => {

  let routes = getNamespacedRoutes(schema.routes)

  return (

    <nav className="restsplain-menu">
      {
        // Menu
        //  - Pages
        //  - Auths
        //  - Endpoints
      }

      <div className="restsplain-pages">
        { ! isEmpty( schema.documentation ) &&
          <div className="restsplain-authentication">
            <h2>Documentation</h2>
            <ul>
              { schema.documentation.map( page => (
                <li key={page.slug}>
                  <NavLink exact activeClassName="active" to={`/docs/${page.slug}/`}>{page.title}</NavLink>
                </li>
              ) ) }
            </ul>
          </div>
        }

        { ! isEmpty( schema.authentication ) &&
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

      { ! isEmpty( schema.namespaces ) &&
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
