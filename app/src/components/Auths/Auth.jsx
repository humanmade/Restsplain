import React, { PropTypes } from 'react'
import createFragment from 'react-addons-create-fragment'
import { Link } from 'react-router-dom'
import { capitalise } from '../../helpers/formatting'

const Auth = ({ name, data, excerpt = false }) => {

    if ( excerpt ) {
      return (
        <section className="restsplain-auth">
          <h3>
            <Link to={`/auths/${name}/`}>{capitalise(name)}</Link>
          </h3>
          { data instanceof Object && data.description && <p>{data.description}</p> }
        </section>
      )
    }

    return (
      <section className="restsplain-auth">
        <h1>{capitalise(name)}</h1>
        <div className="restsplain-auth-data">
          { typeof data === 'string' &&
            <div className="restsplain-auth-url">
              <h3>Resource URL</h3>
              <p>{data}</p>
            </div>
          }
          { data instanceof Object &&
            <dl>
              {  Object.keys( data ).map( key => createFragment( {
                key: <dt>{key}</dt>,
                value: <dd>{data[key]}</dd>
              } ) ) }
            </dl>
          }
          { data instanceof Object && data.description &&
            <div className="restsplain-auth-description">
              {data.description}
            </div>
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
