import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { highlightBlocks } from '../helpers/dom'

class MaybeHTML extends Component {

  componentDidMount() {
    highlightBlocks(`.${this.props.className} pre code`)
  }

  render() {
    let { text, className = 'restsplain-description' } = this.props

    // Is HTML?
    if ( text.match(/<([a-z]+).*?<\/\1/i) ) {
      return (
        <div className={className} dangerouslySetInnerHTML={{ __html: text }} />
      )
    }

    return <p className={className}>{text}</p>
  }

}

MaybeHTML.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default MaybeHTML
