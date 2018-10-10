/**
 * Trim text from the beginning and end of a string
 *
 * @param str String to trim
 * @param charmap Character class for RegExp, passed to `[${charmap}]+`
 */
// eslint-disable-next-line
export const trim = ( str, charmap = '\\s' ) => str.replace( new RegExp( `^[${charmap}]*(.*?)[${charmap}]*$`, 'g' ), '$1' )

export const getRouteReadable = path => path.replace( /\(.*?<([a-zA-Z0-9_-]+)>.*?\)/g, ':$1' )

export const getRouteURL = path => `${getRouteReadable( path ).replace( /:/g, '' )}/`

export const makeID = strings => strings.map( s => s.replace( /[\s\W]/g, '-' ).toLowerCase() ).join( '-' )

export const capitalise = string => string.substr( 0, 1 ).toUpperCase() + string.substr( 1 )
