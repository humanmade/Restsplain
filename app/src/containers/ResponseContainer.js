import { connect } from 'react-redux'
import { fetchResourceResponse } from '../data/api'
import { setOption } from '../data/actions'
import Response from '../components/Response'

const mapStateToProps = ( state, ownProps ) => ({
  resource: state.options.resource,
  response: state.responses[ state.options.resource ],
  view    : state.options.view,
  fetching: state.responses.fetching,
  ...ownProps
})

const mapDispatchToProps = ( dispatch ) => ({
  fetchResource: ( resource ) => dispatch( fetchResourceResponse( resource ) ),
  setView      : ( view ) => dispatch( setOption( 'view', view ) ),
  setResource  : ( resource ) => dispatch( setOption( 'resource', resource ) )
})

const ResponseContainer = connect( mapStateToProps, mapDispatchToProps )( Response )

export default ResponseContainer
