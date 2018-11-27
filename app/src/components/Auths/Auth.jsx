import React from 'react'
import PropTypes from 'prop-types'
import createFragment from 'react-addons-create-fragment'
import { Link } from 'react-router-dom'
import MaybeHTML from '../MaybeHTML'
import { capitalise } from '../../helpers/formatting'
import { isEmpty } from '../../helpers/conditionals'
import { l10n } from '../../helpers/l10n'

const Auth = ( { name, data, isExcerpt = false } ) => {

  if ( isExcerpt ) {
    return (
      <section className="restsplain-auth">
        <h3>
          <Link to={`/auths/${name}/`}>{capitalise( data.title || name )}</Link>
        </h3>
        { data.excerpt &&
          <MaybeHTML className="restsplain-description" text={data.excerpt}/>
        }
      </section>
    )
  }

  return (
    <section className="restsplain-auth">
      <h1>{capitalise( data.title || name )}</h1>
      { data.description &&
        <MaybeHTML className="restsplain-description" text={data.description}/>
      }
      { !isEmpty( data.endpoints ) &&
        <div className="restsplain-auth-data">
          <h2>{l10n( 'endpoints' )}</h2>
          { typeof data.endpoints === 'string' &&
            <p>{data.endpoints}</p>
          }
          { data.endpoints instanceof Object &&
            <dl>
              { Object.keys( data.endpoints )
                .map( key => createFragment( {
                  key  : <dt>{key}</dt>,
                  value: <dd>{data.endpoints[ key ].toString()}</dd>
                } ) ) }
            </dl>
          }
        </div>
      }
    </section>
  )

}

Auth.propTypes = {
  name     : PropTypes.string.isRequired,
  data     : PropTypes.object.isRequired,
  isExcerpt: PropTypes.bool
}

export default Auth
