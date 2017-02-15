/**
 * State management reducers
 */

import { combineReducers } from 'redux'
import * as types from './actionTypes'

function schema( state = {}, action ) {
  switch( action.type ) {
    case types.GET_SCHEMA:
      return Object.assign( {}, state, action.schema )
    case types.GET_SCHEMA_ERROR:
      return { error: action.error }
    default:
      return state
  }
}

function responses( state = {}, action ) {
  switch( action.type ) {
    case types.GET_RESOURCE_RESPONSE:
      return Object.assign( {}, state, { [action.route]: action.data } )
    case types.GET_RESOURCE_RESPONSE_ERROR:
      return Object.assign( {}, state, { [action.route]: { error: action.error } } )
    case types.RECEIVE_RESOURCE_RESPONSE:
      return Object.assign( {}, state, { [action.route]: action.data } )
    default:
      return state
  }
}

const reducers = combineReducers( {
  schema,
  responses
} )

export default reducers
