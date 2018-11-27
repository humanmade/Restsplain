/**
 * Transformers to get useful object from the schema
 */

import { trim, getRouteReadable, getRouteURL } from './formatting'

export const getNamespacedRoutes = (routes) => Object.keys( routes )
  .reduce( ( namespacedRoutes, key ) => {
    let namespace = trim( routes[key].namespace, '/' )

    if ( key === `/${namespace}` ) {
      return namespacedRoutes
    }

    let route = {
      path: getRouteReadable(key),
      relative: getRouteReadable(key).replace( `/${namespace}`, '' ),
      url: getRouteURL(key)
    }

    namespacedRoutes[ namespace ] = namespacedRoutes[ namespace ] || []

    namespacedRoutes[ namespace ].push( route )

    return namespacedRoutes
  }, {} )

export const getRoutesByNamespace = (schema, namespace) => getNamespacedRoutes(schema)[namespace]

export const getParamType = (match) => {
  switch(match) {
    case '[\\d]+':
      return 'integer'
    case '[\\w]+':
    case '[\\w-]+':
      return 'string'
    default:
      return match
  }
}

export const getExampleData = (type) => {
  switch(type) {
    case 'integer':
      return '123'
    default:
      return 'example'
  }
}

export const getDefault = (value, type) => {
  if ( ! value ) {
    return false
  }

  switch(type) {
    case 'array':
      return `[${value.toLocaleString()}]`
    case 'object':
      return `${value.toLocaleString()}` // TODO: object to string mapping func
    case 'boolean':
      return value ? 'true' : 'false'
    default:
      return value
  }
}

export const getTypeString = (arg) => {
  switch(arg.type) {
    case 'array':
      return (arg.items && `${arg.items.type}[]`) || arg.type
    case 'string':
      return (arg.enum && `${arg.enum.join(',\n')}`) || arg.type
    default:
      return arg.type
  }
}

export const getRouteParams = (route) => route
  .split(/(.*?\(\?P[^)]+\))/)
  .filter(Boolean)
  .map( (p) => {
    let [path, name, match] = p.split(/([^)]+)\(\?P<([a-z0-9]+)>([^)]+)\)/).filter(Boolean)
    let example = getExampleData(getParamType(match))
    return name && { path, name, match, example }
  } )
  .filter(Boolean)
