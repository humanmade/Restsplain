import React, { Component, PropTypes } from 'react'
import Inspector from 'react-json-inspector'
import Highlight from 'react-highlight'
import Links from './Endpoints/Links'
import { trim } from '../helpers/formatting'
import { scrollTo } from '../helpers/dom'
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
    let { resource, view, response, setView } = this.props

    // Stem the resource so the request is easier to see
    resource = resource ? resource.replace( config.restBase, '/' ) : ''

    // Extract links from the view if present
    let links, item = false

    if ( response && response.data ) {
      item = response.data
      if ( Array.isArray( item ) ) {
        item = item[ 0 ]
      }
      links = item._links || false
    }

    return (
      <div className="restsplain-response">
        <h2>Response</h2>

        <form onSubmit={e => this.handleSubmit( e )}>
          <input
            type="text"
            defaultValue={resource}
            ref={( input ) => this.input = input}
            placeholder="Enter an API url and hit enter"/>
        </form>

        { !response &&
          <div className="restsplain-response-instructions">
            <p>
              Try clicking one of the resource links (👉) or enter an
              endpoint path above and hit enter to see the response.
            </p>
          </div>
        }

        { response && response.data &&
          <div className="restsplain-response-view">
            <nav>
              <a className={view === 'raw' && 'active'} onClick={() => setView( 'raw' )}>Raw</a>
              <a className={view === 'json' && 'active'} onClick={() => setView( 'json' )}>JSON</a>
              <a className={view === 'links' && 'active'} onClick={() => setView( 'links' )}>Links</a>
            </nav>

            { view === 'raw' &&
              <Highlight className="json">
                { response.data ?
                  JSON.stringify( response.data, null, '  ' ) :
                  <p>Fetching data...</p>
                }
              </Highlight>
            }

            { view === 'json' && (
              response.data ? <pre><code><Inspector ref="inspector" data={response.data} className="hljs"/></code></pre> : <p>Fetching data...</p>
            ) }

            { view === 'links' && (
              links ? <Links links={links}/> : <p>No links in this response</p>
            ) }
          </div>
        }
      </div>
    )
  }
}

Response.propTypes = {
  fetchResource: PropTypes.func.isRequired,
  setView      : PropTypes.func.isRequired,
  view         : PropTypes.string
}

export default Response
