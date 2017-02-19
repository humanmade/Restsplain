import { connect } from 'react-redux'
import Link from '../components/Response/Link'
import { setOption } from '../data/actions'

const mapStateToProps = (state, ownProps) => ({
  active: state.options.resource === ownProps.href,
  ...ownProps
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setOption('view', 'raw'))
    dispatch(setOption('resource', ownProps.href))
  }
})

const LinkContainer = connect(mapStateToProps, mapDispatchToProps)(Link)

export default LinkContainer
