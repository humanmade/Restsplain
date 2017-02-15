import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import Endpoints from './Endpoints'
import { getNamespacedRoutes } from '../helpers/transform'

const Docs = ({ schema = {}, fetchSchema }) => {

  if ( ! schema.name ) {

    fetchSchema()

    return (
      <div className="restsplain restsplain-no-data">
        <h2>Fetching schema&hellip;</h2>
        <p>Hang in there!</p>
      </div>
    )
  }

  // Namespace & route map for menu

  // Route map for

  return (
    <div className="restsplain">

      <div className="restsplain-header">
        <h1>
          <Link to="/">
            {`${schema.name} API`}
          </Link>
        </h1>
        <p>REST API documentation</p>
      </div>

      <div className="restsplain-docs">

        <Menu namespaces={schema.namespaces} routes={getNamespacedRoutes(schema.routes)} />

        <Endpoints routes={schema.routes} />

      </div>

    </div>
  )
}

Docs.propTypes = {
  schema: PropTypes.object,
}

export default Docs
