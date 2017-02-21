import React, { PropTypes } from 'react'
import createFragment from 'react-addons-create-fragment'
import { Route } from 'react-router-dom'
import Page from './Pages/Page'

const Pages = ({ pages }) => {
    return (
      <div className="restsplain-pages">
        { pages.map( page => createFragment({
            home: <Route exact path="/" component={Page} page={page} isExcerpt={true} />,
            page: <Route exact path={`/docs/${page.slug}/`} component={Page} page={page} />
          }) )
        }
      </div>
    )
}

Pages.propTypes = {
  pages: PropTypes.array.isRequired
}

export default Pages
