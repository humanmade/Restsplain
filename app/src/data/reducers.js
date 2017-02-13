/**
 * State management reducers
 */

import { combineReducers } from 'redux'

function schema( state = {}, action ) {
  console.log( 'schema reducer', state, action )
  switch( action.type ) {
    case 'SET_SCHEMA':
      return Object.assign( {}, state, action.schema )
    default:
      return state
  }
}

function responses( state = {}, action ) {
  console.log( 'responses reducer', state, action )
  switch( action.type ) {
    case 'ADD_RESPONSE':
      return Object.assign( {}, state, { [action.route]: action.data } )
    case 'GET_RESPONSE':
      return state[action.route] || false
    default:
      return state
  }
}

const reducers = combineReducers( {
  schema,
  responses
} )

export default reducers
