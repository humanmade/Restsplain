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
    case types.FETCHING_RESOURCE_RESPONSE:
      return Object.assign( {}, state, { fetching: true } )
    case types.GET_RESOURCE_RESPONSE:
      return Object.assign( {}, state, {
        fetching: false,
        [action.response.resource]: action.response
      } )
    case types.GET_RESOURCE_RESPONSE_ERROR:
      return Object.assign( {}, state, {
        fetching: false,
        [action.response.resource]: action.response
      } )
    default:
      return state
  }
}

function options( state = {}, action ) {
  switch( action.type ) {
    case types.SET_OPTION:
      return Object.assign( {}, state, { [action.option]: action.value } )
    default:
      return state
  }
}

const reducers = combineReducers( {
  schema,
  responses,
  options
} )

export default reducers
