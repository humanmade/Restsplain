import React, { PropTypes } from 'react'
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
            home: <Route exact path="/" component={Auth} name={auth} data={auths[auth]} isExcerpt={true} />,
            page: <Route exact path={`/auths/${auth}/`} component={Auth} name={auth} data={auths[auth]} />
          }) )
        }
      </div>
    )
}

Auths.propTypes = {
  auths: PropTypes.any.isRequired
}

export default Auths
