import { connect } from 'react-redux'
import { fetchResourceResponse } from '../data/api'
import Response from '../components/Endpoints/Response'

const mapStateToProps = (state, ownProps) => ({
  response: state.responses[ownProps.resource],
  ...ownProps
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchResource: () => dispatch(fetchResourceResponse(ownProps.resource))
})

const ResponseContainer = connect(mapStateToProps, mapDispatchToProps)(Response)

export default ResponseContainer
