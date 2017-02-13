import React, { PropTypes } from 'react'

const Response = ({ resource, contexts = ['view'], data = {} }) => {

  // fetch endpoint

  // render raw

  // render JSON tree

  return (
    <div className="restsplain-endpoint-response">
      <h3>Response</h3>
      <pre className="restsplain-endpoint-response-raw">
        Fetching data...
      </pre>
    </div>
  )

}

Response.propTypes = {
  resource: PropTypes.string,
  contexts: PropTypes.array,
  data: PropTypes.object
}

export default Response
