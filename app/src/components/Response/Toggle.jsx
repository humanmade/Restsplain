import React from 'react'
import PropTypes from 'prop-types'
import config from '../../data/config'

const Link = ({ href, onClick }) => (
  <a className="restsplain-response-link" href={href} onClick={(e) => { e.preventDefault(); onClick(href)}}>{href.replace(config.restBase, '/')}</a>
)

Link.propTypes = {
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Link
