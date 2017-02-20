import React, { PropTypes } from 'react'

const MaybeHTML = ({ text, className = 'restsplain-description' }) => {

  // Is HTML?
  if ( text.match(/<([a-z]+).*?<\/\1/i) ) {
    return (
      <div className={className} dangerouslySetInnerHTML={{ __html: text }} />
    )
  }

  return <p className={className}>{text}</p>
}

MaybeHTML.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default MaybeHTML
