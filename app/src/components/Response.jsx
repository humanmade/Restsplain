import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Inspector from 'react-json-inspector'
import Highlight from 'react-highlight'
import Links from './Endpoints/Links'
import { trim } from '../helpers/formatting'
import { scrollTo } from '../helpers/dom'
import { isEmpty } from '../helpers/conditionals'
import { l10n } from '../helpers/l10n'
import config from '../data/config'

class Response extends Component {

  // dispatch action
  handleSubmit( event ) {
    event.preventDefault()
    this.props.setResource( `${config.restBase}${trim(this.input.value, '/')}` )
  }

  // fetch endpoint
  componentWillReceiveProps( nextProps ) {
    let { resource, response, fetchResource } = nextProps
    if ( ( !response || !response.data ) && resource ) {
      fetchResource( resource )
    }
    this.input.value = resource.replace( config.restBase, '/' )
    scrollTo('restsplain-response')
  }

  render() {

    // Destructure props needed for rendering
    let { resource, view, response, setView, fetching } = this.props

    // Stem the resource so the request is easier to see
    resource = resource ? resource.replace( config.restBase, '/' ) : ''

    // Extract links from the view if present
    let links, item = false

    if ( response && response.data && ! isEmpty(response.data) ) {
      item = response.data
      if ( Array.isArray( item ) ) {
        item = item[ 0 ]
      }
      links = item._links || false
    }

    return (
      <section className="restsplain-response">
        <h1>{l10n('response')}</h1>

        <form onSubmit={e => this.handleSubmit( e )}>
          <input
            className="restsplain-response-base"
            value={trim(config.restBase, '/')}
            type="text"
            readOnly
            onFocus={e => this.input.focus()}/>
          <input
            className="restsplain-response-input"
            type="text"
            defaultValue={resource}
            ref={input => this.input = input}
            placeholder={l10n('responseInputPlaceholder')}/>
        </form>

        { !response && !fetching &&
          <div className="restsplain-response-instructions">
            <p>{l10n('responseHelp')}</p>
          </div>
        }

        { !response && fetching &&
        <div className="restsplain-response-instructions">
          <p>{l10n('fetchingData')}</p>
        </div>
        }

        { response && response.data &&
          <div className="restsplain-response-view">
            <nav>
              <button className={view === 'raw' && 'active'} onClick={() => setView( 'raw' )}>{l10n('raw')}</button>
              <button className={view === 'json' && 'active'} onClick={() => setView( 'json' )}>{l10n('json')}</button>
              <button className={view === 'links' && 'active'} onClick={() => setView( 'links' )}>{l10n('links')}</button>
            </nav>

            { view === 'raw' &&
              <Highlight className="json">
                { response.data ?
                  JSON.stringify( response.data, null, '  ' ) :
                  <p>{l10n('fetchingData')}</p>
                }
              </Highlight>
            }

            { view === 'json' && (
              response.data ? <pre><code><Inspector ref="inspector" data={response.data} className="hljs"/></code></pre> : <p>{l10n('fetchingData')}</p>
            ) }

            { view === 'links' && (
              links ? <Links links={links}/> : <p>{l10n('noLinks')}</p>
            ) }
          </div>
        }
      </section>
    )
  }
}

Response.propTypes = {
  fetchResource: PropTypes.func.isRequired,
  setView      : PropTypes.func.isRequired,
  view         : PropTypes.string
}

export default Response
