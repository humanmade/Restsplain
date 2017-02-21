import React, { PropTypes } from 'react'
import { NavLink } from 'react-router-dom'
import Namespace from './Menu/Namespace'
import { getNamespacedRoutes } from '../helpers/transform'
import { isEmpty } from '../helpers/conditionals'
import { l10n } from '../helpers/l10n'

const Menu = ( { schema } ) => {

  let routes = getNamespacedRoutes( schema.routes )

  return (

    <nav className="restsplain-menu">
      {
        // Menu
        //  - Pages
        //  - Auths
        //  - Endpoints
      }

      <div className="restsplain-pages">
        { !isEmpty( schema.pages ) &&
          <div className="restsplain-authentication">
            <h2>{l10n( 'documentation' )}</h2>
            <ul>
              { schema.pages.map( page => (
                <li key={page.slug}>
                  <NavLink exact activeClassName="active" to={`/docs/${page.slug}/`}>{page.title}</NavLink>
                </li>
              ) ) }
            </ul>
          </div>
        }

        { !isEmpty( schema.authentication ) &&
          <div className="restsplain-authentication">
<<<<<<< Updated upstream
            <h3>Authentication</h3>
            <ul>
              {
                // TODO: Add authentication pages
              }
=======
            <h2>{l10n( 'authentication' )}</h2>
            <ul>
              { Object.keys( schema.authentication ).map( auth => (
                <li key={auth}>
                  <NavLink exact activeClassName="active"
                           to={`/auths/${auth}/`}>{capitalise( schema.authentication[ auth ].title || auth )}</NavLink>
                </li>
              ) ) }
>>>>>>> Stashed changes
            </ul>
          </div>
        }
      </div>

      { !isEmpty( schema.namespaces ) &&
        <div className="restsplain-namespaces">
          <h2>{l10n( 'endpoints' )}</h2>
          <ul>
            { schema.namespaces.map( namespace => <Namespace key={namespace} namespace={namespace}
                                                             routes={routes[ namespace ]}/> ) }
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
