/**
 * Various helpers for futzing with the DOM & window
 */

import { polyfill as smoothscroll } from 'smoothscroll-polyfill'
import hljs from 'highlight.js'

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

export const getCodeCSS = theme => fetch( `${cdnjs}/highlight.js/9.9.0/styles/${theme}.min.css` )
  .then( response => response.text() )
  .then( css => {

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

    let sheet = d.createElement( 'style' )
    sheet.textContent = css
    d.head.appendChild( sheet )
  } )
