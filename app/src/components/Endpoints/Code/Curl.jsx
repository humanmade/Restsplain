const Curl = ({ method, resource, args = {} }) => {

  // Required args
  let required = args.map( arg => `${arg.name}=${arg.value}` )

  let exampleParams = required.length ? `\n  --data "${required.join('&')}"` : ''

  return {
    code: `curl -X${method} ${resource} ${exampleParams}`,
    language: 'bash'
  }
}

export default Curl
