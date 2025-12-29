<?php
/**
 * Plugin Name:         Word Switcher
 * Description:         Add word swithing capability.
 * Version:             0.1.0
 * Requires at least:   6.7
 * Requires PHP:        7.4
 * Author:              mrinal013
 * License:             GPL-2.0-or-later
 * Text Domain:         word-switcher
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! defined( 'WS_FORMAT_SCRIPT' ) ) {
	define( 'WS_FORMAT_SCRIPT', 'word-switcher-core-blocks-register-format-type' );
}

if ( ! defined( 'WS_IAPI_SCRIPT' ) ) {
	define( 'WS_IAPI_SCRIPT', 'word-switcher-core-blocks-interactivity-api' );
}

if ( ! defined( 'WS_STYLES' ) ) {
	define( 'WS_STYLES', 'word-switcher-core-blocks-styles' );
}

function word_switcher_core_blocks_register_assets() {
	$dir = plugin_dir_path( __FILE__ );
	// Register the Format API script for the editor.
	$script_asset = require "$dir/build/js/register-format-type.asset.php";

	wp_register_script(
		WS_FORMAT_SCRIPT,
		plugins_url( 'build/js/register-format-type.js', __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version'],
		true
	);

	// Register the Interactivity API script for the editor.
	$script_interactivity_api_asset = require "$dir/build/js/word-switcher-store.asset.php";

	wp_register_script_module(
		WS_IAPI_SCRIPT,
		plugins_url( 'build/js/word-switcher-store.js', __FILE__ ),
		$script_interactivity_api_asset['dependencies'],
		$script_interactivity_api_asset['version']
	);

	wp_register_style(
		WS_STYLES,
		plugins_url( 'build/css/word-switcher-styles.css', __FILE__ ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . 'build/css/word-switcher-styles.css' )
	);
}
add_action( 'init', 'word_switcher_core_blocks_register_assets' );

function word_switcher_core_blocks_enqueue_block_editor_assets() {
	wp_enqueue_script( WS_FORMAT_SCRIPT );
	wp_enqueue_script( WS_IAPI_SCRIPT );
}

add_action( 'enqueue_block_editor_assets', 'word_switcher_core_blocks_enqueue_block_editor_assets' );

add_filter( 'render_block_core/paragraph', 'word_switcher_core_blocks_render_block', 10, 2 );
add_filter( 'render_block_core/heading', 'word_switcher_core_blocks_render_block', 10, 2 );

function word_switcher_core_blocks_render_block( $block_content, $block ) {
	if ( strpos( $block_content, 'class="word-switcher' ) === false ) {
		return $block_content;
	}

	$processor = new WP_HTML_Tag_Processor( $block_content );

	// Find the first tag (the block wrapper)
	if ( ! $processor->next_tag() ) {
		return $block_content;
	}

	$processor->set_bookmark( 'parent' );
	$words = array();

	while ( $processor->next_tag(
		array(
			'tag_name'   => 'span',
			'class_name' => 'word-switcher',
		)
	) ) {
		// Add Interactivity API directives
		$processor->set_attribute( 'data-wp-text', 'state.currentWord' );
		$processor->set_attribute( 'data-wp-class--fade', 'context.isFading' );

		// Extract the comma-seperated words
		if ( $processor->next_token() ) {
			$text_content = $processor->get_modifiable_text();
			if ( $text_content ) {
				$words = array_filter( array_map( 'trim', explode( ', ', $text_content ) ) );
			}
		}
	}

	// Return to parent and add Interactivity API attributes.
	$processor->seek( 'parent' );
	$processor->set_attribute( 'data-wp-interactive', 'devblog/word-switcher-core-blocks' );
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

	if ( ! is_admin() ) {
		wp_enqueue_script_module( WS_IAPI_SCRIPT );
		wp_enqueue_style( WS_STYLES );
	}

	return $processor->get_updated_html();
}
