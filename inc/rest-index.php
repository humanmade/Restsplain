<?php
/**
 * The main rest schema filter.
 */

namespace Restsplain;

use WP_REST_Response;
use WP_Post;

// Custom excerpt filter
add_filter( 'restsplain_excerpt', 'wptexturize' );
add_filter( 'restsplain_excerpt', 'convert_smilies' );
add_filter( 'restsplain_excerpt', 'convert_chars' );
add_filter( 'restsplain_excerpt', 'wpautop' );
add_filter( 'restsplain_excerpt', 'shortcode_unautop' );

// Custom content filter (for descriptions & pages)
add_filter( 'restsplain_content', 'wptexturize' );
add_filter( 'restsplain_content', 'convert_smilies', 20 );
add_filter( 'restsplain_content', 'wpautop' );
add_filter( 'restsplain_content', 'shortcode_unautop' );
add_filter( 'restsplain_content', 'prepend_attachment' );
add_filter( 'restsplain_content', 'wp_make_content_images_responsive' );

/**
 * Decorate the schema if it's a request from our react app
 */
add_filter( 'rest_index', __NAMESPACE__ . '\filter_rest_index', 100 );

/**
 * Transforms the schema data when the $_GET['restsplain']
 * query parameter is set so that we can add and show
 * richer data than typically available.
 *
 * @param WP_REST_Response $response
 * @return WP_REST_Response
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

	$documentation_keys = array_map( function ( $doc ) {
		return sanitize_title_with_dashes( $doc->post_name );
	}, $documentation );

	// Get a keyed posts array
	$documentation = array_combine( $documentation_keys, $documentation );

	// Map to flat array
	$documentation = array_map( function ( WP_Post $doc ) {
		return array(
			'title'   => $doc->post_title,
			'content' => $doc->post_content,
			'excerpt' => $doc->post_excerpt,
			'slug'    => $doc->post_name,
		);
	}, $documentation );

	// Add our documentation pages if they don't exist so they
	// can be edited further from the admin, easiest way to l10n
	if ( empty( $documentation ) ) {
		$documentation = get_default_pages();
		foreach ( $documentation as $order => $page ) {
			wp_insert_post( wp_slash( array(
				'post_title'   => esc_html( $page['title'] ),
				'post_name'    => sanitize_title_with_dashes( $page['slug'] ),
				'post_content' => $page['content'],
				'post_excerpt' => $page['excerpt'],
				'post_type'    => 'restsplain',
				'menu_order'   => $order,
				'post_status'  => 'publish',
			) ) );
		}
	}

	// Append route descriptions
	foreach ( $data['routes'] as $route => $route_data ) {
		$key = sanitize_title_with_dashes( $route );

		if ( isset( $documentation[ $key ] ) ) {
			$page = $documentation[ $key ];

			$data['routes'][ $route ]['description'] = apply_filters( 'restsplain_content', $page['content'] );
			$data['routes'][ $route ]['excerpt']     = apply_filters( 'restsplain_excerpt', $page['excerpt'] );
			unset( $documentation[ $key ] );
		}
	}

	// Prime cookie auth info
	$data['authentication']['cookie'] = array();

	// Append auth descriptions
	foreach ( $data['authentication'] as $auth => $auth_data ) {
		$key = sanitize_title_with_dashes( $auth );

		// Move the real data one level deeper
		$data['authentication'][ $auth ] = array( 'endpoints' => $data['authentication'][ $auth ] );

		if ( isset( $documentation[ $key ] ) ) {
			$page = $documentation[ $key ];
			$doc  = array(
				'title'       => $page['title'],
				'description' => apply_filters( 'restsplain_content', $page['content'] ),
				'excerpt'     => apply_filters( 'restsplain_excerpt', $page['excerpt'] ),
			);

			$data['authentication'][ $auth ] = array_merge( $data['authentication'][ $auth ], $doc );
			unset( $documentation[ $key ] );
		}
	}

	// Anything left is a page
	$data['pages'] = array_values( $documentation );

	/**
	 * Provides a reliable hook for modifying the transformed Restsplain
	 * schema output.
	 *
	 * @param array $data
	 */
	$data = apply_filters( 'restsplain_schema', $data );

	$response->set_data( $data );

	return $response;
}
