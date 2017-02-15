import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import Endpoints from './Endpoints'

const Docs = ({ schema = {}, fetchSchema }) => {

  if ( ! schema.name ) {

    fetchSchema()

    return (
      <div className="restsplain restsplain-no-data">
        <h1>Fetching Schema&hellip;</h1>
        <div className="restsplain-loader"></div>
      </div>
    )
  }

  return (
    <div className="restsplain">

      <div className="restsplain-sidebar">
        <div className="restsplain-header">
          <h1>
            <Link to="/">
              {`${schema.name} API`}
            </Link>
          </h1>
        </div>

        <Menu schema={schema} />
      </div>

      <div className="restsplain-docs">
        <Endpoints routes={schema.routes} />
      </div>

    </div>
  )
}

Docs.propTypes = {
  schema: PropTypes.object.isRequired,
  fetchSchema: PropTypes.func.isRequired
}

export default Docs
