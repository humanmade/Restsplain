/**
 * Action creators for docs app
 */

import * as actions from './actions'

export function fetchSchema( schema ) {
  return dispatch => {
    return fetch( schema )
      .then( response => response.json() )
      .then( data => dispatch(actions.getSchema(data)) )
      .catch( err => dispatch(actions.getSchemaError(err)) )
  }
}

export function fetchResourceResponse( resource ) {
  return dispatch => {
    return fetch( resource )
      .then( response => response.json() )
      .then( data => dispatch(actions.getResourceResponse(resource, data)) )
      .catch( err => dispatch(actions.getResourceResponseError(resource, err)) )
  }
}
