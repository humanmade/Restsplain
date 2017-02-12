import { connect } from 'react-redux'
import Docs from '../components/Docs'

const mapStateToProps = ( state, ownProps ) => {
  console.log('schema map to props', state)
  return { schema: state.schema }
}

const Schema = connect(mapStateToProps)(Docs)

export default Schema
