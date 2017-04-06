<?php
/**
 * Define some API content to be automatically created and
 * appended to the schema for use with Restsplain app
 */

namespace Restsplain;

/**
 * Fetch the default pages for the docs
 *
 * @return array
 */
function get_default_pages() {
	return apply_filters( 'restsplain_default_pages', array() );
}

/**
 * Adds help pages to the schema data
 *
 * $slug should match one of:
 *
 *      An endpoint route eg `/wp/v2/posts` for example
 *      and correspond to the array keys in the schema found at
 *      /wp-json/
 *
 *      An authentication array key eg. oauth1 or broker
 *
 *      If there's no match with the above provide a 'title' as well. A top level
 *      documentation page will be added.
 *
 * @param string $slug
 * @param array  $page Array containing 'description' and optional 'excerpt' & 'title' keys
 */
function add_default_page( $slug, $page ) {
	add_filter( 'restsplain_default_pages', function ( $pages ) use ( $slug, $page ) {
		if ( is_string( $page ) ) {
			$page = array(
				'content' => $page,
			);
		}

		$key = sanitize_title_with_dashes( $slug );

		$pages[ $key ] = wp_parse_args( $page, array(
			'slug'    => $key,
			'title'   => $slug,
			'content' => '',
			'excerpt' => '',
		) );

		return $pages;
	} );
}

add_default_page( 'global-parameters', array(
	'title'   => __( 'Global Parameters', 'restsplain' ),
	'excerpt' => 'The WP REST API supports a set of global parameters that 
modify how the responses are delivered to help with compatibility and
fetching multiple resources at once.',
	'content' => '
<p>The API includes a number of global parameters (also called “meta-parameters”) which control how the API handles the request/response handling. These operate at a layer above the actual resources themselves, and are available on all resources.</p>
<h2 id="jsonp"><code>_jsonp</code></h2>
<p>The API natively supports <a href="https://en.wikipedia.org/wiki/JSONP">JSONP</a> responses to allow cross-domain requests for legacy browsers and clients. This parameter takes a JavaScript callback function which will be prepended to the data. This URL can then be loaded via a <code>&lt;script&gt;</code> tag.</p>
<p>The callback function can contain any alphanumeric, <code>_</code> (underscore), or <code>.</code> (period) character. Callbacks which contain invalid characters will receive a HTTP 400 error response, and the callback will not be called.</p>
<div class="callout callout-info"><p><span class="screen-reader-text">Note:</span> <br>
Modern browsers can use <a href="https://en.wikipedia.org/wiki/Cross-origin_resource_sharing">Cross-Origin Resource Sharing (CORS)</a> preflight requests for cross-domain requests, but JSONP can be used to ensure support with all browsers.</p>
<ul>
<li><a href="http://caniuse.com/#feat=cors">Browser Support</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">MDN Article on CORS</a></li>
</ul>
</div>
<pre><code>&lt;script&gt;
function receiveData( data ) {
  // Do something with the data here.
  // For demonstration purposes, we\'ll simply log it.
  console.log( data );
}
&lt;/script&gt;
&lt;script src="https://demo.wp-api.org/wp-json/?_jsonp=receiveData"&gt;&lt;/script&gt;
</code></pre>
<h2 id="method-or-x-http-method-override-header"><code>_method</code> (or <code>X-HTTP-Method-Override</code> header)</h2>
<p>Some servers and clients cannot correctly process some HTTP methods that the API makes use of. For example, all deletion requests on resources use the <code>DELETE</code> method, but some clients do not provide the ability to send this method.</p>
<p>To ensure compatibility with these servers and clients, the API supports a method override. This can be passed either via a <code>_method</code> parameter or the <code>X-HTTP-Method-Override</code> header, with the value set to the HTTP method to use.</p>
<div class="callout callout-alert"><p><span class="screen-reader-text">Alert:</span> <br>
Clients should only ever send a method override parameter or header with POST requests. Using the method override with GET requests may cause the request to be incorrectly cached.</p>
</div>
<p>A <code>POST</code> to <code>/wp-json/wp/v2/posts/42?_method=DELETE</code> would be translated to a <code>DELETE</code> to the <code>wp/v2/posts/42</code> route.</p>
<p>Similarly the following POST request would become a DELETE:</p>
<pre><code>POST /wp-json/wp/v2/posts/42 HTTP/1.1
Host: example.com
X-HTTP-Method-Override: DELETE</code></pre>
<h2 id="envelope"><code>_envelope</code></h2>
<p>Similarly to <code>_method</code>, some servers, clients, and proxies do not support accessing the full response data. The API supports passing an <code>_envelope</code> parameter, which sends all response data in the body, including headers and status code.</p>
<p>Envelope mode is enabled if the <code>_envelope</code> parameter is passed in the query string (GET parameter). This parameter does not require a value (i.e. <code>?_envelope</code> is valid), but can be passed “1” as a value if required by a client library.</p>
<div class="callout callout-info"><p><span class="screen-reader-text">Note:</span> <br>
For future compatibility, other values should not be passed.</p>
</div>
<p>Enveloped responses include a “fake” HTTP 200 response code with no additional headers (apart from Content-Type) that should ensure the response correctly passes through intermediaries.</p>
<p>For example, given the following response to a <code>GET</code> to <code>wp/v2/users/me</code>:</p>
<pre><code>HTTP/1.1 302 Found
Location: http://example.com/wp-json/wp/v2/users/42
 
{
  "id": 42,
  ...
}</code></pre>
<p>The equivalent enveloped response (with a <code>GET</code> to <code>wp/v2/users/me?_envelope</code>) would be:</p>
<pre><code>HTTP/1.1 200 OK
 
{
  "status": 302,
  "headers": {
    "Location": "http://example.com/wp-json/wp/v2/users/42"
  },
  "body": {
    "id": 42
  }
}</code></pre>
<h2 id="embed"><code>_embed</code></h2>
<p>Most resources include links to related resources. For example, a post can link to the parent post, or to comments on the post. To reduce the number of HTTP requests required, clients may wish to fetch a resource as well as the linked resources. The <code>_embed</code> parameter indicates to the server that the response should include these embedded resources.</p>
<p>Embed mode is enabled if the <code>_embed</code> parameter is passed in the query string (GET parameter). This parameter does not require a value (i.e. <code>?_embed</code> is valid), however can be passed “1” as a value if required by a client library.</p>
<div class="callout callout-info"><p><span class="screen-reader-text">Note:</span> <br>
For future compatibility, other values should not be passed.</p>
</div>
<p>Resources in embed mode will contain an additional <code>_embedded</code> key next to the <code>_links</code> key containing the linked resources. Only links with the <code>embeddable</code> parameter set to <code>true</code> will be embedded.</p>',
) );

add_default_page( 'linking-and-embedding', array(
	'title'   => __( 'Linking and Embedding', 'restsplain' ),
	'excerpt' => 'API responses contain links to other resources that they reference
such as media, users, terms. You can get the linked data automatically form a single request.',
	'content' => '
<p>The WP REST API incorporates hyperlinking throughout the API to allow discoverability and browsability, as well as embedding related resources together in one response. While the REST API does not completely conform to the entire <a href="http://stateless.co/hal_specification.html">HAL standard</a>, it implements the <code>._links</code> and <code>._embedded</code> properties from that standard as described below.</p>
<h2 class="toc-heading" id="links" tabindex="-1">Links <a href="#links" class="anchor"><span aria-hidden="true">#</span><span class="screen-reader-text">Links</span></a></h2>
<p>The <code>_links</code> property of the response object contains a map of links to other API resources, grouped by “relation.” The relation specifies how the linked resource relates to the primary resource. (Examples include “author,” describing a relationship between a resource and its author, or “wp:term,” describing the relationship between a post and its tags or categories.) The relation is either a <a href="http://www.iana.org/assignments/link-relations/link-relations.xhtml#link-relations-1">standardised relation</a>, a URI relation (like <code>https://api.w.org/term</code>) or a Compact URI relation (like <code>wp:term</code>). (Compact URI relations can be normalised to full URI relations to ensure full compatibility if required.) This is similar to HTML <code>&lt;link&gt;</code> tags, or <code>&lt;a rel=""&gt;</code> links.</p>
<p>The links are an object containing a <code>href</code> property with an absolute URL to the resource, as well as other optional properties. These include content types, disambiguation information, and data on actions that can be taken with the link.</p>
<p>For collection responses (those that return a list of objects rather than a top-level object), each item contains links, and the top-level response includes links via the <code>Link</code> header instead.</p>
<div class="callout callout-info"><p><span class="screen-reader-text">Note:</span>
If your client library does not allow accessing headers, you can use the <a href="https://developer.wordpress.org/rest-api/global-parameters/#envelope"><code>_envelope</code></a> parameter to include the headers as body data instead.</p>
</div>
<h3 class="toc-heading" id="example-response" tabindex="-1">Example Response <a href="#example-response" class="anchor"><span aria-hidden="true">#</span><span class="screen-reader-text">Example Response</span></a></h3>
<p>A typical single post request (<code>/wp/v2/posts/42</code>):</p>
<pre><code>{
  "id": 42,
  "_links": {
    "collection": [
      {
        "href": "https://demo.wp-api.org/wp-json/wp/v2/posts"
      }
    ],
    "author": [
      {
        "href": "https://demo.wp-api.org/wp-json/wp/v2/users/1",
        "embeddable": true
      }
    ]
  }
}</code></pre>
<h2 class="toc-heading" id="embedding" tabindex="-1">Embedding <a href="#embedding" class="anchor"><span aria-hidden="true">#</span><span class="screen-reader-text">Embedding</span></a></h2>
<p>Optionally, some linked resources may be included in the response to reduce the number of HTTP requests required. These resources are “embedded” into the main response.</p>
<p>Embedding is triggered by setting the <code>_embed</code> query parameter on the request. This will then include embedded resources under the <code>_embedded</code> key adjacent to the <code>_links</code> key. The layout of this object mirrors the <code>_links</code> object, but includes the embedded resource in place of the link properties.</p>
<p>Only links with the <code>embedded</code> flag set to <code>true</code> can be embedded, and <code>_embed</code> will cause all embeddable links to be embedded. Only relations containing embedded responses are included in <code>_embedded</code>, however relations with mixed embeddable and unembeddable links will contain dummy responses for the unembeddable links to ensure numeric indexes match those in <code>_links</code>.</p>
<h3 class="toc-heading" id="example-response" tabindex="-1">Example Response <a href="#example-response" class="anchor"><span aria-hidden="true">#</span><span class="screen-reader-text">Example Response</span></a></h3>
<pre><code>{
  "id": 42,
  "_links": {
    "collection": [
      {
        "href": "https://demo.wp-api.org/wp-json/wp/v2/posts"
      }
    ],
    "author": [
      {
        "href": "https://demo.wp-api.org/wp-json/wp/v2/users/1",
        "embeddable": true
      }
    ]
  },
  "_embedded": {
    "author": {
      "id": 1,
      "name": "admin",
      "description": "Site administrator"
    }
  }
}</code></pre>',
) );

add_default_page( 'error', array(
	'title'   => __( 'Errors', 'restsplain' ),
	'excerpt' => 'Sometimes you\'ll receive an error response. They all follow a
similar pattern to help you consistently deal with them.',
	'content' => '
		<p>Error responses come in the following form:</p>
		<pre><code>{
  "code": "rest_no_route",
    "message": "No route was found matching the URL and request method",
    "data": {
      "status": 404
     }
}</code></pre>
		<p>The message &amp; code should tell you what the issue is and the data object contains the status code which corresponds to the HTTP status code.</p>
		<p>Another common error is failing the authentication checks for the action you are performing. You may see either of the following:</p>
		<pre><code>{
  "code": "rest_not_logged_in",
  "message": "You are not currently logged in.",
  "data": {
    "status": 401
  }
}</code></pre>
		<p>or</p>
		<pre><code>{
  "code": "rest_forbidden",
  "message": "Sorry, you are not allowed to do that.",
  "data": {
    "status": 403
  }
}</code></pre>',
) );

// Add basic post type descriptions
foreach ( get_post_types( array( 'show_in_rest' => true ), 'objects' ) as $post_type ) {
	if ( isset( $post_type->rest_base ) ) {
		add_default_page( "/wp/v2/{$post_type->rest_base}",
			sprintf(
				__( 'List or create %s.', 'restsplain' ),
				$post_type->labels->name
			)
		);
		add_default_page( "/wp/v2/{$post_type->rest_base}/(?P<id>[\d]+)",
			sprintf(
				__( 'Fetch or edit a single %s.', 'restsplain' ),
				$post_type->labels->singular_name
			)
		);
	}
}

// Add basic taxonomy descriptions
foreach ( get_taxonomies( array( 'show_in_rest' => true ), 'objects' ) as $taxonomy ) {
	if ( isset( $taxonomy->rest_base ) ) {
		add_default_page( "/wp/v2/{$taxonomy->rest_base}",
			sprintf(
				__( 'List or create %s.', 'restsplain' ),
				$taxonomy->labels->name
			)
		);
		add_default_page( "/wp/v2/{$taxonomy->rest_base}/(?P<id>[\d]+)",
			sprintf(
				__( 'Fetch or edit a single %s.', 'restsplain' ),
				$taxonomy->labels->singular_name
			)
		);
	}
}

// Users
add_default_page( '/wp/v2/users', __( 'Fetch or create Users.', 'restsplain' ) );
add_default_page( '/wp/v2/users/(?P<id>[\d]+)', __( 'Fetch or edit a single User.', 'restsplain' ) );
add_default_page( '/wp/v2/users/me', __( 'Fetch or edit the currently logged in User.', 'restsplain' ) );

// Types
add_default_page( '/wp/v2/types', __( 'Fetch information about all post types.', 'restsplain' ) );
add_default_page( '/wp/v2/types/(?P<type>[\w-]+)', __( 'Fetch information about a single post type.', 'restsplain' ) );

// Taxonomies
add_default_page( '/wp/v2/taxonomies', __( 'Fetch information about all taxonomies.', 'restsplain' ) );
add_default_page( '/wp/v2/taxonomies/(?P<taxonomy>[\w-]+)', __( 'Fetch information about a single taxonomy.', 'restsplain' ) );

// Statuses
add_default_page( '/wp/v2/statuses', __( 'Fetch information about available post statuses.', 'restsplain' ) );
add_default_page( '/wp/v2/statuses/(?P<status>[\w-]+)', __( 'Fetch information about a single post status.', 'restsplain' ) );

// Comments
add_default_page( '/wp/v2/comments', __( 'Fetch or create Comments.', 'restsplain' ) );
add_default_page( '/wp/v2/comments/(?P<id>[\d]+)', __( 'Fetch or edit a single Comment.', 'restsplain' ) );

// Settings
add_default_page( '/wp/v2/settings', __( 'Fetch or update registered settings.', 'restsplain' ) );

// Cookie auth
add_default_page( 'cookie', array(
	'title'   => __( 'Cookie Authentication', 'restsplain' ),
	'excerpt' => __( 'Built-in cookie authentication.', 'restsplain' ),
	'content' => '
	<p>Cookie authentication is baked into WordPress by default. There are a couple of steps you need to take in your app to use it.</p> 
	<h2>The REST API Nonce</h2>
	<p>While you can make requests against the API without any credentials you won\'t be able to perform any actions that require permission.</p>
	<p>By sending a valid nonce in the header of your requests you can take advantage of endpoints such as <code>/wp/v2/users/me</code> to get data about the current user.</p>
	<p><strong>Note:</strong> if you send an invalid nonce even to an endpoint that requires no credentials you will gt an error message back.</p>
	<h3>Generating the nonce</h3>
	<p>The nonce can be generated using <code>wp_create_nonce( \'wp_rest\' )</code></p>
	<p>The easiest way to expose this is to use the built-in Backbone Client script:</p>
	<pre><code>&lt;?php
add_action( \'enqueue_scripts\', function() {
  wp_enqueue_script( \'wp-api\' );
} );</code></pre>
	<p>The nonce is present at <code>window.wpApiSettings.nonce</code>. Check out the full <a href="https://developer.wordpress.org/rest-api/using-the-rest-api/backbone-javascript-client/"> Backbone JavaScript Client documentation</a> for more.
	<p>Or if you have a custom API script:</p>
	<pre><code>&lt;?php
// Using wp_localize_script()
add_action( \'enqueue_scripts\', function() use ( $nonce ) {
  wp_enqueue_script( \'my-script-id\', get_stylesheet_directory_uri() . \'/js/api.js\' );
  wp_localize_script( \'my-script-id\', \'restApi\', array(
    \'nonce\' => wp_create_nonce( \'wp_rest\' ),
  ) );
} );

// You can then access it on the front end at
// window.restApi.nonce</code></pre>
	<h3>Sending the nonce</h3>
	<p>The recommended way to send the nonce value is in the request header.</p>
	<p>Using jQuery:</p>
	<pre><code>$.ajax({
  url: \'/wp-json/wp/v2/posts\',
  beforeSend: function( xhr ) {
    xhr.setRequestHeader( \'X-WP-Nonce\', wpApiSettings.nonce );
  },
  success: function( data ) {
    console.log( data )
  }
})</code></pre>
	<p>Using the Fetch API requires the <code>credentials</code> parameter to be "same-origin" in order to send the cookies:</p>
	<pre><code>fetch( \'/wp-json/wp/v2/posts\', {
  credentials: \'same-origin\',
  headers: {
    \'X-WP-Nonce\': wpApiSettings.nonce
  }
  } )
  .then( function( response ) { return response.json() } )
  .then( function( data ) { console.log( data ) } )</code></pre>',
) );

if ( function_exists( 'rest_oauth1_init' ) ) {

	// Official Oauth1 plugin
	add_default_page( 'oauth1', array(
		'title'   => __( 'Oauth 1.0a', 'restsplain' ),
		'excerpt' => __( 'Endpoints for authenticating requests with Oauth 1.0a', 'restsplain' ),
		'content' => '
		<p>Oauth1 Authentication is available.</p> 
		<p>Find out more on how to implement it at <a href="https://github.com/WP-API/OAuth1">the official plugin page</a>.</p>',
	) );

}

if ( function_exists( 'rest_broker_register_routes' ) ) {

	// Broker
	add_default_page( 'broker', array(
		'title'   => __( 'Broker', 'restsplain' ),
		'excerpt' => __( 'Endpoint URL and information on the WordPress App Registry.', 'restsplain' ),
		'content' => '
		<p>The official App Registry for WordPress.</p> 
		<p>You can register your application once and all WordPress sites using the Oauth 1.0a plugin will be able to securely authenticate with it.</p>
		<p>Learn more at <a href="https://apps.wp-api.org/">apps.wp-api.org</a>.</p>',
	) );

}
