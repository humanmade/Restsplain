import React, { PropTypes } from 'react'
import Highlight from 'react-highlight'
import { getRouteParams, getExampleData } from '../../helpers/transform'
import { getRouteReadable } from '../../helpers/formatting'

const Curl = ({ methods, resource, args = {} }) => {

  let params = getRouteParams(resource)

  // Enter examples for route params
  let exampleResource = getRouteReadable(resource)
    .replace(/:([a-z0-9_-]+)/g, (match, p1) => params
      .filter( p => p.name === p1 )
      .reduce( (val, p) => p.example, 'example' )
    )

  // Required args
  let required = Object.keys( args )
    .filter( arg => args[arg].required )
    .map( arg => `${arg}=${getExampleData(args[arg].type)}` )

  let exampleParams = required.length ? `\n  --data "${required.join('&')}"` : ''

  return (
    <div className="restsplain-endpoint-curl">
      <h3>CURL example</h3>
      <Highlight className="bash">
        {`curl -X${methods[0]} ${exampleResource} ${exampleParams}`}
      </Highlight>
    </div>
  )
}

Curl.propTypes = {
  methods: PropTypes.array.isRequired,
  resource: PropTypes.string.isRequired,
  args: PropTypes.object
}

export default Curl
