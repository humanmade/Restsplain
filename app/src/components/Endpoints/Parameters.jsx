import React from 'react'
import PropTypes from 'prop-types'
import { getTypeString, getDefault } from '../../helpers/transform'
import { l10n } from '../../helpers/l10n'

const Parameters = ({ args }) => {
  return args && (
    <div className="restsplain-endpoint-parameters">
      <h3>{l10n('parameters')}</h3>
      <div className="restsplain-table-wrap">
        <table>
          <thead>
          <tr>
            <th>{l10n('name')}</th>
            <th>{l10n('type')}</th>
            <th>{l10n('description')}</th>
          </tr>
          </thead>
          <tbody>
          { Object.keys( args ).map( arg => {
            arg = { name: arg, ...args[ arg ] }

            return (
              <tr key={arg.name}>
                <td>{arg.name}</td>
                <td>
                  <span className="restsplain-pre">
                    {arg.enum && `enum:\n\n`}
                    <code>{getTypeString( arg )}</code>
                  </span>
                </td>
                <td>
                  {arg.required && <p className="restsplain-endpoint-arg-required">{l10n('required')}</p>}
                  { getDefault( arg.default ) &&
                    <p className="restsplain-endpoint-arg-default">
                      {l10n('default')}:
                      {' '}
                      <code>{getDefault( arg.default, arg.type )}</code>
                    </p>
                  }
                  {arg.description && <p className="restsplain-endpoint-arg-description">{arg.description}</p>}
                </td>
              </tr>
            )
          } ) }
          </tbody>
        </table>
      </div>
    </div>
  )
}

Parameters.proptypes = {
  args: PropTypes.object.isRequired
}

export default Parameters
