/**
 * Actions for docs app
 */

import * as types from './actionTypes'


export const getSchema = (schema) => ({ type: types.GET_SCHEMA, schema })

export const getSchemaError = (error) => ({ type: types.GET_SCHEMA_ERROR, error })

export const fetchingResourceResponse = () => ({
  type: types.FETCHING_RESOURCE_RESPONSE
})

export const getResourceResponse = (response) => ({
  type: types.GET_RESOURCE_RESPONSE,
  response
})

export const getResourceResponseError = (response) => ({
  type: types.GET_RESOURCE_RESPONSE_ERROR,
  response
})

export const setOption = (option, value) => ({ type: types.SET_OPTION, option, value })
