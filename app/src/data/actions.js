/**
 * Actions for docs app
 */

export const switchVersion = ( version ) => { return { action: 'SWITCH_VERSION', version } }

export const getSchema = ( url ) => {
  return ( dispatch ) => fetch( url )
    .then( data => JSON.parse( data ) )
    .then( data => { console.log(data); return dispatch( { type: 'GET_SCHEMA', schema: data } ) } )
    .catch( err => {
      console.log( err )
      dispatch( { type: 'GET_SCHEMA_ERROR', error: err } )
    } )
}
