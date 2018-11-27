import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import Menu from './Menu'
import Endpoints from './Endpoints'
import Pages from './Pages'
import Auths from './Auths'
import ResponseContainer from '../containers/ResponseContainer'
import { l10n } from '../helpers/l10n'
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
        <h1>{l10n('failedFetchingSchema')}</h1>
        <p>{l10n('apiMayBeDown')}</p>
        { schema.error && typeof schema.error === 'string' && (
			<p className="restsplain-error">{schema.error}</p>
		) }
        <div className="restsplain-loader"></div>
      </div>
    )
  }

  if ( ! schema.name ) {

    fetchSchema()

    classNames.push( 'restsplain-no-data' )

    return (
      <div className={classNames.join(' ')}>
        <h1>{l10n('fetchingSchema')}&hellip;</h1>
        <div className="restsplain-loader"></div>
      </div>
    )
  }

  return (
    <div className={classNames.join(' ')}>

      <nav className="restsplain-sidebar">
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
      </nav>

      <section className="restsplain-docs">
        <Route exact path="/" render={ () => <h2>{l10n('documentation')}</h2> } />
        <Pages pages={schema.pages} />
        <Route exact path="/" render={ () => <h2>{l10n('authentication')}</h2> } />
        <Auths auths={schema.authentication} />
        <Route exact path="/" render={ () => <h2>{l10n('endpoints')}</h2> } />
        <Endpoints routes={schema.routes} />
      </section>

      <ResponseContainer />

      <footer className="restsplain-colophon">{l10n('madeWithLove')} <a href="https://hmn.md/">Human Made</a></footer>
    </div>
  )
}

Docs.propTypes = {
  schema: PropTypes.object.isRequired,
  fetchSchema: PropTypes.func.isRequired
}

export default Docs
