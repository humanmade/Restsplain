/**
 * Action creators for docs app
 */

import * as actions from './actions'

export function fetchSchema( schema ) {
  return dispatch => {
    return fetch( schema + '?restsplain' )
      .then( response => response.json() )
      .then( data => dispatch(actions.getSchema(data)) )
      .catch( error => dispatch(actions.getSchemaError(error)) )
  }
}

export function fetchResourceResponse( resource ) {
  return dispatch => {
    return fetch( resource )
      .then( response => response.json() )
      .then( data => dispatch(actions.getResourceResponse({resource, data, view: 'raw'})) )
      .catch( error => dispatch(actions.getResourceResponseError({resource, error})) )
  }
}
