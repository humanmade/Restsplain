import React from 'react'
import PropTypes from 'prop-types'
import { getRouteParams, getParamType } from '../../helpers/transform'
import { l10n } from '../../helpers/l10n'

const RouteParameters = ({ route }) => {

  let params = getRouteParams(route)

  return !!params.length && (
    <div className="restsplain-endpoint-url-params">
      <h4>{l10n('routeParameters')}</h4>
      <div className="restsplain-table-wrap">
        <table>
          <thead>
          <tr>
            <th>{l10n('name')}</th>
            <th>{l10n('type')}</th>
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
    </div>
  )
}

RouteParameters.propTypes = {
  route: PropTypes.string.isRequired
}

export default RouteParameters
