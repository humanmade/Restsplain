import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import MaybeHTML from '../MaybeHTML'
import { highlightBlocks } from '../../helpers/dom'

class Page extends Component {

  componentDidMount() {
    highlightBlocks('.restsplain-page-content pre code')
  }

  render() {
    let { page, isExcerpt = false } = this.props

    if ( isExcerpt ) {
      return (
        <section className="restsplain-page">
          <h3>
            <Link to={`/pages/${page.slug}/`}>{page.title}</Link>
          </h3>
          { page.excerpt && <MaybeHTML className="restsplain-page-excerpt" text={page.excerpt} /> }
        </section>
      )
    }

    return (
      <section className="restsplain-page">
        <h1>{page.title}</h1>
        <MaybeHTML className="restsplain-page-content" text={page.content} />
      </section>
    )
  }
}

Page.propTypes = {
  page   : PropTypes.shape( {
    slug   : PropTypes.string.isRequired,
    title  : PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    excerpt: PropTypes.string
  } ),
  isExcerpt: PropTypes.bool
}

export default Page
