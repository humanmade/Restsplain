<?php
/**
 * Plugin Name:     Restsplain
 * Plugin URI:      https://github.com/humanmade/Restsplain
 * Description:     REST API documentation generator
 * Author:          Robert O'Rourke
 * Author URI:      https://hmn.md
 * Text Domain:     restsplain
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         Restsplain
 */

namespace Restsplain;

use WP_REST_Response;

define( 'RESTSPLAIN_DIR', __DIR__ );
define( 'RESTSPLAIN_URL', plugins_url( '', __FILE__ ) );

function enqueue_scripts() {

	$manifest = file_get_contents( RESTSPLAIN_DIR . '/app/build/asset-manifest.json' );
	$files    = json_decode( $manifest );

	if ( $files ) {

		wp_enqueue_script( 'restsplain-js', RESTSPLAIN_URL . '/app/build/' . $files['main.js'], array(), null, true );
		wp_localize_script( 'restsplain-js', 'restsplain', array(
			'css'      => RESTSPLAIN_URL . '/app/build/' . $files['main.css'],
			'restbase' => get_rest_url(),
			'embedded' => true,
		) );

		wp_enqueue_style( 'restsplain-css', RESTSPLAIN_URL . '/app/build/' . $files['main.css'] );
	}
}

// WP layer on top of base script
add_action( 'init', __NAMESPACE__ . '\init' );

function init() {

	$rest_url = get_rest_url();

	add_rewrite_rule();
}

add_action( 'template_redirect', function ( $template ) {

	if ( is_404() && $_SERVER['REQUEST_URI'] === get_rest_url( null, '/_docs' ) ) {

		// Load API docs app
		include 'app/build/index.html';

		exit;
	}
} );


function is_docs_request() {
	return isset( $_SERVER['X-WP-RESTSPLAIN'] );
}

add_filter( 'rest_index', function ( WP_REST_Response $response ) {

	if ( ! is_docs_request() ) {
		return $response;
	}

	$data = $response->get_data();

	// Add error examples


	// Add pages


	$response->set_data( $data );

	return $response;
} );


/**
 * Shortcode to embed the docs app in a page
 */
add_shortcode( 'restsplain', function() {
	static $done = false;

	if ( ! $done ) {
		$done = true;
		return '<div id="restsplain"></div>';
	}
} );


