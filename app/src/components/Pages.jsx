import React from 'react'
import PropTypes from 'prop-types'
import createFragment from 'react-addons-create-fragment'
import { Route } from 'react-router-dom'
import Page from './Pages/Page'

const Pages = ({ pages }) => {
    return (
      <div className="restsplain-pages">
        { pages.map( page => createFragment({
            home: <Route exact path="/" render={props => <Page {...props} page={page} isExcerpt={true} />} />,
            page: <Route exact path={`/pages/${page.slug}/`} render={props => <Page {...props} page={page} />} />
          }) )
        }
      </div>
    )
}

Pages.propTypes = {
  pages: PropTypes.array.isRequired
}

export default Pages
