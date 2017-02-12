import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

// Redux
import reducers from './data/reducers'
import config from './data/config'
import schema from './data/schema.json'
import { getSchema } from './data/actions'

// Components
import App from './App'

// CSS
import './scss/index.css'

// Redux store
const store = createStore( reducers, {
  schema: schema
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
  document.getElementById('root')
)

// Fetch schema
store.dispatch( getSchema( config.restbase ) )
