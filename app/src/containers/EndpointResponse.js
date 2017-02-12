import { connect } from 'react-redux'
import Response from '../components/Endpoints/Response'

const mapStateToProps = (state, ownProps) => {
  // Fetch URL?

  return state
}

//const mapDispatchToProps = (state, ownProps) => {
//  // Fetch URL
//
//  return state
//}

const EndpointResponse = connect(mapStateToProps)(Response)

export default EndpointResponse
