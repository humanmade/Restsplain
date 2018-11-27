/**
 * Core config object for the docs app
 * Can be overwritten by a global window object
 */

const config = Object.assign( {}, {
  basename: '/',
  restBase: 'https://wordpress.org/wp-json/',
  embedded: false,
  codeTheme: 'tomorrow night',
  fallbackCodeTheme: false,
  logo: false,
  l10n: {
    response: 'Response',
    responseInputPlaceholder: 'Enter an API path and hit enter',
    responseHelp: `Try clicking one of the resource links (👉) or enter an
      endpoint path above and hit enter to see the response.`,
    raw: 'Raw',
    json: 'JSON',
    links: 'Links',
    fetchingData: 'Fetching data...',
    noLinks: 'No links in this response',
    documentation: 'Documentation',
    authentication: 'Authentication',
    endpoints: 'Endpoints',
    fetchingSchema: 'Fetching Schema',
    failedFetchingSchema: 'Failed Fetching Schema',
    apiMayBeDown: 'The API may be down or not currently enabled.',
    madeWithLove: 'made with ❤️ by',
    routeParameters: 'Route Parameters',
    name: 'Name',
    type: 'Type',
    description: 'Description',
    parameters: 'Parameters',
    required: 'Required',
    default: 'Default',
    resourceURL: 'Resource URL',
    code: 'Code',
    embeddable: 'Embeddable',
    templated: 'Templated'
  }
}, ( window && window.restsplain ) || {} )

export default config
