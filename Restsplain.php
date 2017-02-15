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

define( 'RESTSPLAIN_DIR', __DIR__ );
define( 'RESTSPLAIN_URL', plugins_url( '', __FILE__ ) );

// WP layer on top of base script
add_action( 'init', function() {



} );

add_action( 'template_redirect', function( $template ) {

	if ( is_404() && $_SERVER['REQUEST_URI'] === get_rest_url( null, '/_docs' ) ) {

		// Load API docs app
		include 'app/build/index.html';

		exit;
	}

} );



add_action( 'admin_print_footer_scripts', function () {
	?>
	<script type="text/javascript">
      jQuery( function ( $ ) {
        if ( typeof tinymce !== 'undefined' ) {
          var invalid = false;
          tinymce.on( 'GetContent', function ( event ) {

            console.log(event.content);

            if ( !invalid || event.content.match( /&amp;preview=/ ) ) {
				invalid = true;
				$('#publish').attr('disabled', 'disabled');
            } else {
              $('#publish').removeAttr('disabled', 'disabled');
            }

          } );

          $('#post').on('submit.validate', function() {

          });
        }
      } );
	</script>
	<?php
} );
