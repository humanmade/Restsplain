import React, { PropTypes } from 'react'
import createFragment from 'react-addons-create-fragment'
import { Link } from 'react-router-dom'
import MaybeHTML from '../MaybeHTML'
import { capitalise } from '../../helpers/formatting'

const Auth = ({ name, data, excerpt = false }) => {

    if ( excerpt ) {
      return (
        <section className="restsplain-auth">
          <h3>
            <Link to={`/auths/${name}/`}>{capitalise(name)}</Link>
          </h3>
          { data instanceof Object && data.description &&
            <MaybeHTML className="restsplain-description" text={data.description} />
          }
        </section>
      )
    }

    return (
      <section className="restsplain-auth">
        <h1>{capitalise(name)}</h1>
        { data instanceof Object && data.description &&
          <MaybeHTML className="restsplain-description" text={data.description} />
        }
        <div className="restsplain-auth-data">
          <h2>Endpoints</h2>
          { typeof data === 'string' &&
            <div className="restsplain-auth-url">
              <h3>Resource URL</h3>
              <p>{data}</p>
            </div>
          }
          { data instanceof Object &&
            <dl>
              { Object.keys( data )
                .filter( key => key !== 'description' ) // Reserved word
                .map( key => createFragment( {
                key: <dt>{key}</dt>,
                value: <dd>{data[key].toString()}</dd>
              } ) ) }
            </dl>
          }
        </div>
      </section>
    )

}

Auth.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired,
  excerpt: PropTypes.bool
}

export default Auth
