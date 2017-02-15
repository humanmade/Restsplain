/**
 * Actions for docs app
 */

import * as types from './actionTypes'


export const getSchema = (schema) => ({ type: types.GET_SCHEMA, schema })

export const getSchemaError = (error) => ({ type: types.GET_SCHEMA_ERROR, error })

export const getResourceResponse = (route, data) => ({ type: types.GET_RESOURCE_RESPONSE, route, data })

export const getResourceResponseError = (route, error) => ({ type: types.GET_RESOURCE_RESPONSE_ERROR, route, error })
