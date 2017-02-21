<?php

namespace Restsplain;

function add_post_type() {

	register_post_type( 'restsplain', array(
		'labels'            => array(
			'name'               => __( 'API Docs', 'restsplain' ),
			'singular_name'      => __( 'API Docs', 'restsplain' ),
			'all_items'          => __( 'All API Docs', 'restsplain' ),
			'new_item'           => __( 'New API Docs', 'restsplain' ),
			'add_new'            => __( 'Add New', 'restsplain' ),
			'add_new_item'       => __( 'Add New API Docs', 'restsplain' ),
			'edit_item'          => __( 'Edit API Docs', 'restsplain' ),
			'view_item'          => __( 'View API Docs', 'restsplain' ),
			'search_items'       => __( 'Search API Docs', 'restsplain' ),
			'not_found'          => __( 'No API Docs found', 'restsplain' ),
			'not_found_in_trash' => __( 'No API Docs found in trash', 'restsplain' ),
			'parent_item_colon'  => __( 'Parent API Docs', 'restsplain' ),
			'menu_name'          => __( 'API Docs', 'restsplain' ),
		),
		'public'            => false,
		'hierarchical'      => true,
		'show_ui'           => true,
		'show_in_nav_menus' => false,
		'supports'          => array( 'title', 'editor', 'excerpt', 'page-attributes' ),
		'menu_icon'         => 'dashicons-book-alt',
		'show_in_rest'      => false,
		'menu_position'     => 1000,
	) );
}

add_action( 'init', __NAMESPACE__ . '\add_post_type' );

function updated_messages( $messages ) {
	global $post;

	$permalink = get_permalink( $post );

	$messages['restsplain'] = array(
		0  => '', // Unused. Messages start at index 1.
		1  => sprintf( __( 'API Docs updated. <a target="_blank" href="%s">View API Docs</a>', 'restsplain' ), esc_url( $permalink ) ),
		2  => __( 'Custom field updated.', 'restsplain' ),
		3  => __( 'Custom field deleted.', 'restsplain' ),
		4  => __( 'API Docs updated.', 'restsplain' ),
		/* translators: %s: date and time of the revision */
		5  => isset( $_GET['revision'] ) ? sprintf( __( 'API Docs restored to revision from %s', 'restsplain' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
		6  => sprintf( __( 'API Docs published. <a href="%s">View API Docs</a>', 'restsplain' ), esc_url( $permalink ) ),
		7  => __( 'API Docs saved.', 'restsplain' ),
		8  => sprintf( __( 'API Docs submitted. <a target="_blank" href="%s">Preview API Docs</a>', 'restsplain' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
		9  => sprintf( __( 'API Docs scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview API Docs</a>', 'restsplain' ),
			// translators: Publish box date format, see http://php.net/date
			date_i18n( __( 'M j, Y @ G:i' ), strtotime( $post->post_date ) ), esc_url( $permalink ) ),
		10 => sprintf( __( 'API Docs draft updated. <a target="_blank" href="%s">Preview API Docs</a>', 'restsplain' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
	);

	return $messages;
}

add_filter( 'post_updated_messages', __NAMESPACE__ . '\updated_messages' );
