import React from 'react'
import PropTypes from 'prop-types'
import createFragment from 'react-addons-create-fragment'
import LinkContainer from '../../containers/LinkContainer'
import { l10n } from '../../helpers/l10n'

const DD = ({ text, className = '' }) => (
  <dd className={className}>
    {text}
  </dd>
)

const Links = ({ links }) => {

  return links && (
    <div className="restsplain-endpoint-links">
      <h3>{l10n('links')}</h3>
      <dl>
      { Object.keys( links ).map( link => {
        let fragment = {
          dt: <dt>{link}</dt>
        }

        if ( Array.isArray( links[link] ) ) {

          let definitions = links[ link ]
            .reduce( ( dds, data ) => Object.assign( dds, {
              [data.href]: link === 'curies' ? <DD text={data.href} /> : <DD text={<LinkContainer href={data.href} />} />,
              [`${data.href}-embed`]: data.embeddable && <DD text={l10n('embeddable')} className="restsplain-link-data" />,
              [`${data.href}-name`]: data.name && <DD text={`${l10n('name')}: ${data.name}`} className="restsplain-link-data" />,
              [`${data.href}-templated`]: data.templated && <DD text={l10n('templated')} className="restsplain-link-data" />
            } ), {} )

          fragment = Object.assign( fragment, {...definitions} )
        } else {
          fragment.dd = <DD text={<LinkContainer href={links[link]} />} />
        }

        return createFragment(fragment)
      } ) }
      </dl>
    </div>
  )
}

Links.propTypes = {
  links: PropTypes.object
}

export default Links
