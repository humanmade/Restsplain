/**
 * Core config object for the docs app
 * Can be overwritten by a global window object
 */

const config = Object.assign( {}, ( window && window.restsplain ) || {}, {
  basename: ( location && `${location.protocol}//${location.hostname}${location.port.replace(/(^)/, ':')}` ) || '/',
  restbase: 'http://wordpress-develop.dev/wp-json/',
  embedded: false,
  codetheme: 'monokai-sublime'
} )

export default config
