import React from 'react'
import DocsContainer from './containers/DocsContainer'
import config from './data/config'

const App = () => {
  return (
    <div className="App">
      <DocsContainer base={config.restbase} />
    </div>
  )
}

export default App
