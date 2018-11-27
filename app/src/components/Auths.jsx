import React from 'react'
import PropTypes from 'prop-types'
import createFragment from 'react-addons-create-fragment'
import { Route } from 'react-router-dom'
import Auth from './Auths/Auth'
import { isEmpty } from '../helpers/conditionals'

const Auths = ({ auths }) => {

    if ( isEmpty(auths) ) {
      return
    }

    return (
      <div className="restsplain-auths">
        { Object.keys( auths ).map( auth => createFragment({
            home: <Route exact path="/" render={props => <Auth {...props} name={auth} data={auths[auth]} isExcerpt={true} />} />,
            page: <Route exact path={`/auths/${auth}/`} render={props => <Auth {...props} name={auth} data={auths[auth]} />} />
          }) )
        }
      </div>
    )
}

Auths.propTypes = {
  auths: PropTypes.any.isRequired
}

export default Auths
