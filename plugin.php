<?php

namespace JPJULIAO\Wordpress\WooUSAddressAutocomplete;

/**
 * Plugin name: WooCommerce Address Autocomplete
 * Description: Address Autocomplete for WooCommerce sites.
 * Version: 1.0.0
 * Author: Juan Pablo Juliao
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: woo-address-autocomplete
 * Require plugins: WooCommerce
 */

if (!defined('ABSPATH')) {
  exit;
}

require_once plugin_dir_path(__FILE__) . 'class-init.php';

Init::get_instance();
