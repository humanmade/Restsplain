import React from 'react'
import PropTypes from 'prop-types'
import Highlight from 'react-highlight'
import Curl from './Code/Curl'
import JS from './Code/JS'
import ES6 from './Code/ES6'
import { getRouteParams, getExampleData } from '../../helpers/transform'
import { getRouteReadable } from '../../helpers/formatting'
import { isEmpty } from '../../helpers/conditionals'
import { l10n } from '../../helpers/l10n'

const Code = ( { methods, resource, args = {}, language = 'curl', setLanguage } ) => {

  let params = getRouteParams( resource )

  // Enter examples for route params
  let exampleResource = getRouteReadable( resource )
    .replace( /:([a-z0-9_-]+)/g, ( match, p1 ) => params
      .filter( p => p.name === p1 )
      .reduce( ( val, p ) => p.example, 'example' )
    )

  // Required args
  args = isEmpty( args ) ? {} : args
  let requiredArgs = Object.keys( args )
    .filter( arg => args[ arg ].required )
    .map( arg => ({ name: arg, value: getExampleData( args[ arg ].type ) }) )

  let method = 'GET'
  if ( methods.includes( window.location.hash.substr(1) ) ) {
    method = window.location.hash.substr(1)
  }

  let props = {
    method,
    resource: exampleResource,
    args    : requiredArgs
  }

  let code

  switch ( language ) {
    case 'js':
      code = JS( props )
      break
    case 'curl':
      code = Curl( props )
      break
    case 'es6':
      code = ES6( props )
      break
    default:
      code = { code: '', language: '' }
  }

  return (
    <div className="restsplain-endpoint-code">
      <h3>{l10n('code')}</h3>
      <nav>
        <button className={language === 'curl' ? 'active' : ''} onClick={() => setLanguage( 'curl' )}>cURL</button>
        <button className={language === 'js' ? 'active' : ''} onClick={() => setLanguage( 'js' )}>JS</button>
        <button className={language === 'es6' ? 'active' : ''} onClick={() => setLanguage( 'es6' )}>ES6</button>
      </nav>
      <Highlight className={code.language}>
        {code.code}
      </Highlight>
    </div>
  )
}

Code.propTypes = {
  methods    : PropTypes.array.isRequired,
  resource   : PropTypes.string.isRequired,
  args       : PropTypes.any.isRequired,
  language   : PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
}

export default Code
