/**
 * State management reducers
 */

import { combineReducers } from 'redux'

function version( state = '', action ) {
  switch( action.type ) {
    case 'UPDATE_VERSION':
      return action.version
    default:
      return state
  }
}

function schema( state = {}, action ) {
  console.log( 'schema reducer', state, action )
  switch( action.type ) {
    case 'GET_SCHEMA':
      return Object.assign( {}, state, action.schema )
    default:
      return state
  }
}

const reducers = combineReducers( {
  version,
  schema,
} )

export default reducers
