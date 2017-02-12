import React, { PropTypes } from 'react'
import Namespace from './Menu/Namespace'

const Menu = ({ namespaces, routes }) => {

  return (

    <nav className="restsplain-menu">
      {
        // Menu
        //  - Pages
        //  - Namespaces
        //    - Version picker
        //    - Endpoints by method group
      }

      { namespaces &&
        <div className="restsplain-namespaces">
          <h2>Namespaces</h2>
          <ul>
            { namespaces.map( namespace => <Namespace key={namespace} namespace={namespace} routes={routes[namespace]} /> ) }
          </ul>
        </div>
      }
    </nav>

  )
}

Menu.propTypes = {
  namespaces: PropTypes.array.isRequired,
  routes: PropTypes.object.isRequired
}

export default Menu
