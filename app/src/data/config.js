/**
 * Core config object for the docs app
 * Can be overwritten by a global window object
 */

const config = Object.assign( {}, {
  basename: '/',
  restBase: 'http://wordpress-develop.dev/wp-json/',
  embedded: false,
  codeTheme: 'monokai-sublime',
  logo: false
}, ( window && window.restsplain ) || {} )

export default config
