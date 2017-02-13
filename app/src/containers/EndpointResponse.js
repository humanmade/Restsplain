import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getResourceResponse } from '../data/actions'
import Response from '../components/Endpoints/Response'

const mapStateToProps = (state, ownProps) => {
  if ( state.responses[ownProps.resource] ) {
    return { data: state.responses[ownProps.resource], ...ownProps }
  }
  return {...ownProps}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ getResourceResponse }, dispatch)
}

const EndpointResponse = connect(mapStateToProps, mapDispatchToProps)(Response)

export default EndpointResponse
