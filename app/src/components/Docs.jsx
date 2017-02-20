import React, { PropTypes } from 'react'
import { Route, Link } from 'react-router-dom'
import Menu from './Menu'
import Endpoints from './Endpoints'
import Pages from './Pages'
import Auths from './Auths'
import ResponseContainer from '../containers/ResponseContainer'
import config from '../data/config'

const Docs = ({ schema = {}, fetchSchema }) => {

  let classNames = [
    'restsplain'
  ]

  if ( config.embedded ) {
    classNames.push( 'restsplain-embedded' )
  }

  if ( ( schema.code && schema.message ) || schema.error ) {

    classNames.push( 'restsplain-no-data' )

    return (
      <div className={classNames.join(' ')}>
        <h1>Failed Fetching Schema</h1>
        <p>The API may be down or not currently enabled.</p>
        { schema.error && <p className="restsplain-error">{schema.error}</p> }
        <div className="restsplain-loader"></div>
      </div>
    )
  }

  if ( ! schema.name ) {

    fetchSchema()

    classNames.push( 'restsplain-no-data' )

    return (
      <div className={classNames.join(' ')}>
        <h1>Fetching Schema&hellip;</h1>
        <div className="restsplain-loader"></div>
      </div>
    )
  }

  return (
    <div className={classNames.join(' ')}>

      <div className="restsplain-sidebar">
        { !config.embedded &&
          <div className="restsplain-header">
            <h1>
              <Link to="/">
                { config.logo && <img src={config.logo} alt={`${schema.name} API Docs`} /> }
                <span className="restsplain-title">{`${schema.name}`}</span>
                {' '}
                API
              </Link>
            </h1>
          </div>
        }

        <Menu schema={schema} />
      </div>

      <div className="restsplain-docs">
        <Route exact path="/" render={ () => <h2>Documentation</h2> } />
        <Pages pages={schema.documentation} />
        <Route exact path="/" render={ () => <h2>Authentication</h2> } />
        <Auths auths={schema.authentication} />
        <Route exact path="/" render={ () => <h2>Endpoints</h2> } />
        <Endpoints routes={schema.routes} />
      </div>

      <ResponseContainer />

      <div className="restsplain-colophon">made with ❤️ by <a href="https://hmn.md/">Human Made</a></div>
    </div>
  )
}

Docs.propTypes = {
  schema: PropTypes.object.isRequired,
  fetchSchema: PropTypes.func.isRequired
}

export default Docs
