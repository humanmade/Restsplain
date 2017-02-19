<?php
/**
 * Plugin Name:     Restsplain
 * Plugin URI:      https://github.com/humanmade/Restsplain
 * Description:     REST API documentation generator
 * Author:          Robert O'Rourke
 * Author URI:      https://hmn.md
 * Text Domain:     restsplain
 * Domain Path:     /languages
 * Version:         1.0.0
 *
 * @package         Restsplain
 */

namespace Restsplain;

use WP_REST_Response;
use WP_Post;

define( 'RESTSPLAIN_DIR', __DIR__ );
define( 'RESTSPLAIN_URL', plugins_url( '', __FILE__ ) );

require_once 'inc/documentation.php';
require_once 'inc/post-type.php';

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
	if ( get_query_var( 'restsplain', false ) ) {
		return get_default_docs_base();
	}

	return str_replace( home_url( '/' ), '', get_permalink() );
}

function enqueue_scripts() {

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
		'basename'  => get_docs_base(),
		'restBase'  => get_rest_url(),
		'embedded'  => get_docs_base() !== get_default_docs_base(),
		'nonce'     => wp_create_nonce( 'wp_rest' ),
		'codeTheme' => 'monokai-sublime', // Any of the themes shipped with highlight.js
		'logo'      => $logo_url,
	);

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
	if ( defined( 'RESTSPLAIN_DEBUG' ) && RESTSPLAIN_DEBUG ) {
		$js_url = 'http://localhost:3000/static/js/bundle.js';
	} else {
		$js_url = RESTSPLAIN_URL . '/app/build/' . $files['main.js'];

		// CSS has to be enqueued in WordPress context
		wp_enqueue_style( 'restsplain', RESTSPLAIN_URL . '/app/build/' . $files['main.css'] );
	}

	wp_enqueue_script( 'restsplain', $js_url, array(), null, true );
	wp_add_inline_script( 'restsplain',
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
	add_rewrite_endpoint( 'docs', EP_PAGES | EP_PERMALINK, false );
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

		return RESTSPLAIN_DIR . '/inc/template.php';
	}

	return $template;
}


/**
 * Decorate the schema if it's a request from our react app
 */
add_filter( 'rest_index', __NAMESPACE__ . '\filter_rest_index' );

/**
 * @param \WP_REST_Response $response
 * @return \WP_REST_Response
 */
function filter_rest_index( WP_REST_Response $response ) {

	if ( ! isset( $_GET['restsplain'] ) ) {
		return $response;
	}

	$data = $response->get_data();

	// Add documentation
	$data['documentation'] = array();

	$documentation = get_posts( array(
		'post_type'     => 'restsplain',
		'nopaging'      => true,
		'no_found_rows' => true,
		'orderby'       => 'menu_order',
		'order'         => 'asc',
	) );

	// Add our documentation pages if they don't exist so they
	// can be edited further from the admin
	if ( empty( $documentation ) ) {
		$pages = get_pages();
		foreach ( $pages as $order => $page ) {
			wp_insert_post( wp_slash( array(
				'post_title'   => $page['title'],
				'post_content' => $page['content'],
				'post_excerpt' => $page['excerpt'],
				'post_type'    => 'restsplain',
				'menu_order'   => $order,
				'post_status'  => 'publish',
			) ) );
		}

		$data['documentation'] = $pages;
	} else {
		$data['documentation'] = array_map( function ( WP_Post $doc ) {
			return array(
				'slug'    => $doc->post_name,
				'title'   => get_the_title( $doc ),
				'excerpt' => get_the_excerpt( $doc ),
				'content' => apply_filters( 'the_content', $doc->post_content ),
			);
		}, $documentation );
	}

	// Append route descriptions
	foreach ( $data['routes'] as $route => $route_data ) {
		$data['routes'][ $route ]['description'] = apply_filters( "restsplain_{$route}", '' );
	}

	$data = apply_filters( 'restsplain_schema', $data );

	$response->set_data( $data );

	return $response;
}

/**
 * Shortcode to embed the docs app in a page
 */
add_shortcode( 'restsplain', __NAMESPACE__ . '\shortcode' );

function shortcode() {
	static $done = false;

	if ( ! $done ) {
		$done = true;

		// Queue scripts
		enqueue_scripts();

		// Echo placeholder
		return '<div id="restsplain"></div>';
	}
}
