const ES6 = ( { method, resource, args = {} } ) => {

  // Required args
  args = args
    .map( arg => ({ [arg.name]: arg.value }) )
    .reduce( (out, obj) => Object.assign(out, obj), { method: method } )

  args.credentials = 'same-origin'
  args.headers = { 'X-WP-Nonce': 'abcdefgh123' }

  args = JSON.stringify( args, null, '  ' )

  return {
    code: `fetch( "${resource}", ${args} )
  .then( response => response.json() )
  .then( data => callback( data ) )
  .catch( error => { console.log( error ) } )`,
    language: 'javascript'
  }
}

export default ES6
