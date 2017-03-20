/**
 * Various helpers for futzing with the DOM & window
 */

import { polyfill as smoothscroll } from 'smoothscroll-polyfill'
import hljs from 'highlight.js'
import config from '../data/config'

// Polyfill the DOM method
smoothscroll()

// Init highligh.js
hljs.initHighlightingOnLoad()

const d = document

export const getElementByClassName = className => d.getElementsByClassName( className )[ 0 ]

export const scrollTo = className => getElementByClassName( className )
  .scrollIntoView( {
    block   : 'start',
    behavior: 'smooth'
  } )

// Cross browser foreach on node list
export const querySelectorAllDo = ( selector, callback ) => []
  .forEach.call( d.querySelectorAll( selector ), callback )

export const highlightBlocks = selector => {
  querySelectorAllDo( selector, block => hljs.highlightBlock( block ) )
}

// Ref to JS CDN
export const cdnjs = `https://cdnjs.cloudflare.com/ajax/libs`

// Get some colours from the code theme to keep things purdy
const getColours = css => {
  let bg = css.match(/hljs\w*{.*?background:\w*(#[a-z0-9]{3,6})/im)[1]
  let fg = css.match(/hljs\w*{.*?color:\w*(#[a-z0-9]{3,6})/im)[1]
  let ln = css.match(/hljs-attribute[^{]*{.*?color:\w*(#[a-z0-9]{3,6})/im)[1]

  return { bg, fg, ln }
}

const injectCSS = css => {

  let { bg, fg, ln } = getColours(css)
  let linkScope = '.restsplain-response .restsplain-endpoint-links'

  // Add support for JSON inspector
  css = css
    .replace(/(hljs-name)/, '$1,.json-inspector__key')
    .replace(/(hljs-meta)/, `$1,
        .json-inspector__value_helper, 
        .json-inspector__value_null,
        .json-inspector__not-found`)
    .replace(/(hljs-string)/, '$1,.json-inspector__value_string')
    .replace(/(hljs-number)/, '$1,.json-inspector__value_nuber')
    .replace(/(hljs-keyword)/, '$1,.json-inspector__value_boolean')

  // Use values from code theme for response area styling
  css += `
      .restsplain-docs pre { background:${bg}; }
      .restsplain-response { background:${bg}; color:${fg} }
      ${linkScope} a, ${linkScope} a:link,
      ${linkScope} a:active, ${linkScope} a:visited,
      ${linkScope} a:hover { color:${ln} }`

  let sheet = d.createElement( 'style' )
  sheet.textContent = css
  d.head.appendChild( sheet )
}

export const getCodeCSS = theme => fetch( `${cdnjs}/highlight.js/9.9.0/styles/${theme.toLowerCase().replace(/\s+/g,'-')}.min.css` )
  .then( response => response.text() )
  .then( injectCSS )
  .catch( err => {
    if ( !config.fallbackCodeTheme ) {
      console.log( err )
    }
    fetch( config.fallbackCodeTheme )
      .then( response => response.text() )
      .then( injectCSS )
      .catch( err => console.log(err) )
  } )
