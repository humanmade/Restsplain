import React, { PropTypes } from 'react'

const Response = ({ resource, data = false, fetchResource }) => {

  // fetch endpoint
  if ( ! data ) {
    fetchResource()
  }

  // render raw

  // render JSON tree

  return (
    <div className="restsplain-endpoint-response">
      <h3>Response</h3>
      <pre className="restsplain-endpoint-response-raw">
        { data ? JSON.stringify(data, null, '  ') : 'Fetching data...' }
      </pre>
    </div>
  )

}

Response.propTypes = {
  resource: PropTypes.string,
  contexts: PropTypes.array,
}

export default Response
