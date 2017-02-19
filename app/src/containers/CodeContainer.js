import { connect } from 'react-redux'
import Code from '../components/Endpoints/Code'
import { setOption } from '../data/actions'

const mapStateToProps = (state, ownProps) => ({
  active: state.options.language === ownProps.language,
  language: state.options.language,
  ...ownProps
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  setLanguage: language => {
    dispatch(setOption('language', language))
  }
})

const CodeContainer = connect(mapStateToProps, mapDispatchToProps)(Code)

export default CodeContainer
