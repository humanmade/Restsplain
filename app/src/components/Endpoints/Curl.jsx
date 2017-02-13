import React, { PropTypes } from 'react'
import { getRouteParams } from '../../helpers/transform'
import { getRouteReadable } from '../../helpers/formatting'

const Curl = ({ methods, resource, args = {} }) => {

  let params = getRouteParams(resource)

  // Enter examples for route params
  let exampleResource = getRouteReadable(resource)
    .replace(/:([a-z0-9_-]+)/g, (match, p1) => params
      .filter( p => p.name === p1 )
      .reduce( (val, p) => p.example, 'example' )
    )

  return (
    <div className="restsplain-endpoint-curl">
      <h3>CURL example</h3>
      <pre>
        {`curl -X${methods[0]} ${exampleResource}`}
      </pre>
    </div>
  )
}

Curl.propTypes = {
  methods: PropTypes.array.isRequired,
  resource: PropTypes.string.isRequired,
  args: PropTypes.object
}

export default Curl
