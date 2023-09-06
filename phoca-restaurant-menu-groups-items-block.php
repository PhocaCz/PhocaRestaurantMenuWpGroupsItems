<?php
/**
 * Plugin Name:       Phoca Restaurant Menu - Groups and Items Block
 * Description:       Phoca Restaurant Menu groups and items is inner block of Phoca Restaurant Menu Block.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           6.0.0
 * Author:            Jan Pavelka ( <a href="https://www.phoca.cz">Phoca</a> )
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       phoca-restaurant-menu-groups-items-block
 *
 * @package           create-block
 */

function phoca_restaurant_menu_groups_items_block_init() {
	register_block_type( __DIR__ . '/build' );
}

function phoca_restaurant_menu_groups_items_block_set_script_translations() {
	wp_set_script_translations( 'phoca-restaurant-menu-groups-itemsblock', 'phoca-restaurant-menu-groups-itemsblock',
    plugin_dir_path( __FILE__ ) . '/languages/' );
}

add_action( 'init', 'phoca_restaurant_menu_groups_items_block_init' );
add_action( 'init', 'phoca_restaurant_menu_groups_items_block_set_script_translations' );
