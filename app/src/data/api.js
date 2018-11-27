/**
 * Action creators for docs app
 */

import config from './config'
import * as actions from './actions'

let opts = {
  credentials: 'same-origin'
}

if ( config.nonce ) {
  opts.headers = { 'X-WP-Nonce': config.nonce }
}

export function fetchSchema( schema ) {
  return dispatch => {
    return fetch( schema + '?restsplain=1', opts )
      .then( response => response.json() )
      .then( data => dispatch(actions.getSchema(data)) )
      .catch( error => dispatch(actions.getSchemaError(error)) )
  }
}

export function fetchResourceResponse( resource ) {
  return dispatch => {
    // Set loading state
    dispatch(actions.fetchingResourceResponse())
    // Fetch resource
    return fetch( resource, opts )
      .then( response => response.json() )
      .then( data => dispatch(actions.getResourceResponse({resource, data, view: 'raw'})) )
      .catch( error => dispatch(actions.getResourceResponseError({resource, error})) )
  }
}
