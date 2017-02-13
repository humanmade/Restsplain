/**
 * Actions for docs app
 */

export function getSchema( url ) {
  return ( dispatch ) => fetch( url )
    .then( data => JSON.parse( data ) )
    .then( data => { console.log(data); return dispatch( { type: 'ADD_SCHEMA', schema: data } ) } )
    .catch( err => {
      console.log( err )
      dispatch( { type: 'ADD_SCHEMA_ERROR', error: err } )
    } )
}

export function getResourceResponse( url ) {
  return ( dispatch ) => fetch( url )
    .then( data => JSON.parse( data ) )
    .then( data => { console.log(data); return dispatch( { type: 'ADD_RESPONSE', route: url, data: data } ) } )
    .catch( err => {
      console.log( err )
      dispatch( { type: 'ADD_RESPONSE_ERROR', error: err } )
    } )
}
