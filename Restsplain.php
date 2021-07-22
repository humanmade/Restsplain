<?php
/**
 * Plugin Name:     Restsplain
 * Plugin URI:      https://github.com/humanmade/Restsplain
 * Description:     REST API documentation generator
 * Author:          Robert O'Rourke
 * Author URI:      https://hmn.md
 * Text Domain:     restsplain
 * Domain Path:     /languages
 * Version:         1.0.1
 *
 * @package         Restsplain
 */

namespace Restsplain;

define( 'RESTSPLAIN_DIR', __DIR__ );
define( 'RESTSPLAIN_URL', plugins_url( '', __FILE__ ) );

require_once 'inc/documentation.php';
require_once 'inc/post-type.php';
require_once 'inc/rest-index.php';

/**
 * The default URL for the generated docs.
 * Should be root relative with no trailing slash.
 *
 * @return string
 */
function get_default_docs_base() {
	return untrailingslashit( apply_filters( 'restsplain_docs_base', '/api-docs' ) );
}

/**
 * Do our best to get the base URL of our docs, either current page
 * (shortcode) or rewrite rule
 *
 * @return string
 */
function get_docs_base() {
	$subdir_install = rtrim( (string) parse_url( home_url(), PHP_URL_PATH ), '/' );

	if ( get_query_var( 'restsplain', false ) ) {
		return $subdir_install . '/' . ltrim( get_default_docs_base(), '/' );
	}

	return $subdir_install . '/' . ltrim( str_replace( home_url( '/' ), '', get_permalink() ), '/' );
}

/**
 * You can override the config at the time of queueing scripts
 * by passing an array here.
 *
 * @param array $args
 */
function enqueue_scripts( $args = array() ) {

	$manifest = file_get_contents( RESTSPLAIN_DIR . '/app/build/asset-manifest.json' );
	$files    = json_decode( $manifest, ARRAY_A );

	if ( ! $files ) {
		return;
	}

	/**
	 * Try and get the logo to make it look noice
	 */
	$logo_url = false;

	if ( current_theme_supports( 'custom-logo' ) && has_custom_logo() ) {
		$logo_id  = get_theme_mod( 'custom_logo' );
		$logo_url = wp_get_attachment_image_url( $logo_id, array( 200, 200 ) );
	}

	$config = array(
		'basename'          => get_docs_base(),
		'restBase'          => get_rest_url(),
		'embedded'          => get_docs_base() !== get_default_docs_base(),
		'nonce'             => wp_create_nonce( 'wp_rest' ),
		'codeTheme'         => 'Tomorrow Night', // Any of the themes shipped with highlight.js
		'fallbackCodeTheme' => RESTSPLAIN_URL . '/app/src/scss/_tomorrow-night.min.css',
		'logo'              => $logo_url,
		'l10n'              => array(
			'response'                 => __( 'Response', 'restsplain' ),
			'responseInputPlaceholder' => __( 'Enter an API path and hit enter', 'restsplain' ),
			'responseHelp'             => __( 'Try clicking one of the resource links (👉) or enter an endpoint path above and hit enter to see the response.', 'restsplain' ),
			'raw'                      => __( 'Raw', 'restsplain' ),
			'json'                     => __( 'JSON', 'restsplain' ),
			'links'                    => __( 'Links', 'restsplain' ),
			'fetchingData'             => __( 'Fetching data...', 'restsplain' ),
			'noLinks'                  => __( 'No links in this response', 'restsplain' ),
			'documentation'            => __( 'Documentation', 'restsplain' ),
			'authentication'           => __( 'Authentication', 'restsplain' ),
			'endpoints'                => __( 'Endpoints', 'restsplain' ),
			'fetchingSchema'           => __( 'Fetching Schema', 'restsplain' ),
			'failedFetchingSchema'     => __( 'Failed Fetching Schema', 'restsplain' ),
			'apiMayBeDown'             => __( 'The API may be down or not currently enabled.', 'restsplain' ),
			'madeWithLove'             => __( 'made with ❤️ by', 'restsplain' ),
			'routeParameters'          => __( 'Route Parameters', 'restsplain' ),
			'name'                     => __( 'Name', 'restsplain' ),
			'type'                     => __( 'Type', 'restsplain' ),
			'description'              => __( 'Description', 'restsplain' ),
			'parameters'               => __( 'Parameters', 'restsplain' ),
			'required'                 => __( 'Required', 'restsplain' ),
			'default'                  => __( 'Default', 'restsplain' ),
			'resourceURL'              => __( 'Resource URL', 'restsplain' ),
			'code'                     => __( 'Code', 'restsplain' ),
			'embeddable'               => __( 'Embeddable', 'restsplain' ),
			'templated'                => __( 'Templated', 'restsplain' ),
		),
	);

	$config = wp_parse_args( $args, $config );

	/**
	 * Filter the default config here.
	 *
	 * For example you may want to style the code regions differently,
	 * Restsplain uses highlight.js so that you can give the name
	 * of any of it's themes eg. darcula, docco, monokai, solarized-dark etc...
	 */
	$config = apply_filters( 'restsplain_config', $config );

	/**
	 * Define RESTSPLAIN_DEBUG if you want to develop or modify the tool
	 * in the context of WordPress.
	 *
	 * Keep in mind you'll need to run the react-scripts from the app folder:
	 *
	 * $ cd app
	 * $ npm install && npm start
	 */
	$deps = [];

	if ( defined( 'RESTSPLAIN_DEBUG' ) && RESTSPLAIN_DEBUG ) {
		$js_url = 'http://localhost:3000/static/js/bundle.js';

		// Allow hot reloading.
		wp_enqueue_script( 'restsplain-runtime', 'http://localhost:3000/webpack-dev-server.js', [], null, true );
	} else {
		$js_runtime_url = RESTSPLAIN_URL . '/app/build' . $files['runtime~main.js'];
		$js_url = RESTSPLAIN_URL . '/app/build' . $files['main.js'];

		// Add the required files.
		wp_register_script( 'restsplain-runtime', $js_runtime_url, [], null, true );
		$deps[] = 'restsplain-runtime';

		$chunk_files = array_filter( $files, function ( $file ) {
			return preg_match( '#[A-Za-z0-9]{8}\.chunk\.js$#', $file );
		} );

		foreach ( $chunk_files as $chunk ) {
			wp_register_script( 'restsplain-' . $chunk, RESTSPLAIN_URL . '/app/build' . $chunk, [], null, true );
			$deps[] = 'restsplain-' . $chunk;
		}

		// CSS has to be enqueued in WordPress context.
		wp_enqueue_style( 'restsplain', RESTSPLAIN_URL . '/app/build' . $files['main.css'] );
	}

	wp_enqueue_script( 'restsplain', $js_url, $deps, null, true );
	wp_add_inline_script( 'restsplain-runtime',
		sprintf( 'var restsplain = %s', wp_json_encode( $config ) ),
		'before'
	);
}

/**
 * Add some rewrite rules to handle displaying the docs on a page
 */
add_action( 'init', __NAMESPACE__ . '\init', 200 );

function init() {

	// Add rewrite rule for our docs
	$docs_base = ltrim( get_default_docs_base(), '/' );
	add_rewrite_rule( "^{$docs_base}.*?$", 'index.php?restsplain=true', 'top' );

	// Allow shortcode to be rendered on any page / post
	add_rewrite_endpoint( 'endpoints', EP_PAGES | EP_PERMALINK, false );
	add_rewrite_endpoint( 'auths', EP_PAGES | EP_PERMALINK, false );
	add_rewrite_endpoint( 'pages', EP_PAGES | EP_PERMALINK, false );
}

add_filter( 'query_vars', __NAMESPACE__ . '\query_vars' );

function query_vars( $vars ) {
	$vars[] = 'restsplain';

	return $vars;
}

/**
 * Load our custom WP based docs template
 */
add_filter( 'template_include', __NAMESPACE__ . '\template_include' );

function template_include( $template ) {

	if ( get_query_var( 'restsplain', false ) ) {
		enqueue_scripts();

		return RESTSPLAIN_DIR . '/views/template.php';
	}

	return $template;
}

/**
 * Shortcode to embed the docs app in a page
 *
 * **SUPER BETA NOT RECOMMENDED KLAXON**
 */
add_shortcode( 'restsplain', __NAMESPACE__ . '\shortcode' );

function shortcode() {
	static $done = false;

	if ( ! $done ) {
		$done = true;

		// Queue scripts
		enqueue_scripts( array(
			'embedded' => true,
		) );

		// Echo placeholder
		return '<div id="restsplain"></div>';
	}
}
