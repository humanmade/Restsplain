import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { highlightBlocks } from '../../helpers/dom'

class Page extends Component {

  componentDidMount() {
    highlightBlocks('.restsplain-page-content pre code')
  }

  render() {
    let { page, excerpt = false } = this.props

    if ( excerpt ) {
      return (
        <section className="restsplain-page">
          <h3>
            <Link to={`/docs/${page.slug}/`}>{page.title}</Link>
          </h3>
          { page.excerpt && <p className="restsplain-page-excerpt">{page.excerpt}</p> }
        </section>
      )
    }

    return (
      <section className="restsplain-page">
        <h1>{page.title}</h1>
        <div className="restsplain-page-content" dangerouslySetInnerHTML={{ __html: page.content }} />
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
  excerpt: PropTypes.bool
}

export default Page
