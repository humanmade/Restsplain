import React, { PropTypes } from 'react'
import { getRouteParams, getParamType } from '../../helpers/transform'

const RouteParameters = ({ route }) => {

  console.log(route)

  let params = getRouteParams(route)

  return !!params.length && (
    <div className="restsplain-endpoint-url-params">
      <h4>Route Parameters</h4>
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
        </tr>
        </thead>
        <tbody>
        { params.map( param => (
          <tr key={param.name}>
            <td>:{param.name}</td>
            <td><code>{getParamType(param.match)}</code></td>
          </tr>
        ) ) }
        </tbody>
      </table>
    </div>
  )
}

RouteParameters.propTypes = {
  route: PropTypes.string.isRequired
}

export default RouteParameters
