import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

// Redux
import reducers from './data/reducers'
import config from './data/config'

// Components
import DocsContainer from './containers/DocsContainer'

// DOM
import { scrollTo, getCodeCSS } from './helpers/dom'

// CSS
import './scss/index.css'
getCodeCSS(config.codeTheme)

// Redux store
const logger = createLogger()
const store = createStore( reducers, {
  schema   : {},
  responses: {
    fetching: false,
  },
  options  : {
    language : 'curl', // TODO: Add way to register additional code sample templates
    view     : 'raw',  // Response view, raw, formatted, links
    resource : false,  // Current response resource
  }
}, applyMiddleware(
  thunk,
  logger
) )

// History
const history = createBrowserHistory({
  basename: config.basename.replace(/\/+$/, '')
})

let lastLocation = null

history.listen( (location, action) => {
  if ( ! lastLocation || lastLocation.pathname !== location.pathname ) {
    scrollTo('restsplain')
  }
  lastLocation = location
} )

// Render app
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" render={props => <DocsContainer {...props} base={config.restBase} />} />
    </Router>
  </Provider>,
  document.getElementById( 'restsplain' )
)
