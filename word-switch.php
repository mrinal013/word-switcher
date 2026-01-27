<?php
/**
 * Plugin Name:         Word Switch
 * Description:         Add word switching capability.
 * Version:             1.0.2
 * Requires at least:   6.7
 * Requires PHP:        7.4
 * Author:              mrinal013
 * Author URI:          https://www.wpdevagent.com
 * License:             GPLv2
 * Text Domain:         word-switch
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! defined( 'WORD_SWITCH_SCRIPT' ) ) {
	define( 'WORD_SWITCH_SCRIPT', 'word-switch-register-format-type' );
}

if ( ! defined( 'WORD_SWITCH_IAPI_SCRIPT' ) ) {
	define( 'WORD_SWITCH_IAPI_SCRIPT', 'word-switch-interactivity-api' );
}

if ( ! defined( 'WORD_SWITCH_STYLES' ) ) {
	define( 'WORD_SWITCH_STYLES', 'word-switch-styles' );
}

/**
 * Register assets.
 *
 * @since 1.0
 */
function word_switch_register_assets() {
	$dir = plugin_dir_path( __FILE__ );
	// Register the Format API script for the editor.
	$script_asset = require "$dir/build/js/register-format-type.asset.php";

	wp_register_script(
		WORD_SWITCH_SCRIPT,
		plugins_url( 'build/js/register-format-type.js', __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version'],
		true
	);

	// Register the Interactivity API script for the editor.
	$script_interactivity_api_asset = require "$dir/build/js/word-switch-store.asset.php";

	wp_register_script_module(
		WORD_SWITCH_IAPI_SCRIPT,
		plugins_url( 'build/js/word-switch-store.js', __FILE__ ),
		$script_interactivity_api_asset['dependencies'],
		$script_interactivity_api_asset['version']
	);

	wp_register_style(
		WORD_SWITCH_STYLES,
		plugins_url( 'build/css/word-switch-styles.css', __FILE__ ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . 'build/css/word-switch-styles.css' )
	);
}
add_action( 'init', 'word_switch_register_assets' );

/**
 * Enqueue editor site scrpts.
 *
 * @since 1.0
 */
function word_switch_enqueue_block_editor_assets() {
	wp_enqueue_script( WORD_SWITCH_SCRIPT );
	wp_enqueue_script( WORD_SWITCH_IAPI_SCRIPT );
}

add_action( 'enqueue_block_editor_assets', 'word_switch_enqueue_block_editor_assets' );

/**
 * Render paragraph and heading tags output.
 *
 * @param string $block_content The block content.
 * @param array  $block The full block, including name and attributes.
 *
 * @since 1.0
 */
function word_switch_render_block( $block_content, $block ) {
	if ( strpos( $block_content, 'class="word-switch-wrap' ) === false ) {
		return $block_content;
	}

	$processor = new WP_HTML_Tag_Processor( $block_content );

	while ( $processor->next_tag(
		array(
			'tag_name'   => 'span',
			'class_name' => 'word-switch-wrap',
		)
	) ) {

		$processor->set_bookmark( 'parent' );
		$words = array();

		// Find all spans with word-switch class.
		if ( $processor->next_tag(
			array(
				'tag_name'   => 'span',
				'class_name' => 'word-switch',
			)
		) ) {
			// Add Interactivity API directives .
			$processor->set_attribute( 'data-wp-text', 'state.currentWord' );
			$processor->set_attribute( 'data-wp-class--fade', 'context.isFading' );

			// Extract the comma - separated words .
			if ( $processor->next_token() ) {
				$text_content = $processor->get_modifiable_text();
				if ( $text_content ) {
					$words = array_filter( array_map( 'trim', explode( ',', $text_content ) ) );
				}
			}
		}

		$processor->seek( 'parent' );
		$processor->set_attribute( 'data-wp-interactive', 'wpdevagent/word-switch' );
		$processor->set_attribute( 'data-wp-init', 'callbacks.init' );
		$processor->set_attribute(
			'data-wp-context',
			wp_json_encode(
				array(
					'words'        => $words,
					'currentIndex' => 0,
					'isFading'     => false,
				)
			)
		);
	}

	if ( ! is_admin() ) {
		wp_enqueue_script_module( WORD_SWITCH_IAPI_SCRIPT );
		wp_enqueue_style( WORD_SWITCH_STYLES );
	}

	return $processor->get_updated_html();
}

add_filter( 'render_block_core/paragraph', 'word_switch_render_block', 10, 2 );
add_filter( 'render_block_core/heading', 'word_switch_render_block', 10, 2 );
