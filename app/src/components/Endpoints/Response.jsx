import React, { PropTypes } from 'react'
import Inspector from 'react-json-inspector'
import Highlight from 'react-highlight'

const Response = ({ response = false, fetchResource }) => {

  // fetch endpoint
  if ( response === false ) {
    fetchResource()
  }

  return (
    <div className="restsplain-endpoint-response">
      <h3>Response</h3>
        <nav>
          <a onClick={() => {}}>Raw</a>
          <a onClick={() => {}}>Json</a>
        </nav>
        { response.view === 'raw' &&
          <Highlight className="json">
           { response.data ? JSON.stringify(response.data, null, '  ') : 'Fetching data...' }
          </Highlight>
        }
        { response.view === 'json' && (
          response.data ? <Inspector data={response.data} /> : 'Fetching data...'
        ) }
    </div>
  )

}

Response.propTypes = {
  fetchResource: PropTypes.func.isRequired,
}

export default Response
