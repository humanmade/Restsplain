import { connect } from 'react-redux'
import { fetchSchema } from '../data/api'
import Docs from '../components/Docs'

const mapStateToProps = (state) => ({
  schema: state.schema
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchSchema: () => dispatch(fetchSchema(ownProps.base))
})

const DocsContainer = connect(mapStateToProps, mapDispatchToProps)(Docs)

export default DocsContainer
