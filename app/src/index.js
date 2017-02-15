import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
//import promiseMiddleware from 'redux-promise-middleware'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

// Redux
import reducers from './data/reducers'
import config from './data/config'

// Components
import App from './App'

// CSS
import './scss/index.css'

// Redux store
const logger = createLogger()
const store = createStore( reducers, {
  schema: {},
  responses: {}
}, applyMiddleware(
  thunk,
  logger
) )

// Render app
ReactDOM.render(
  <Provider store={store}>
    <Router basename={config.basename}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('restsplain')
)
