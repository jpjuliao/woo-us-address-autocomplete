<?php

namespace JPJULIAO\Wordpress\WooUSAddressAutocomplete;

/**
 * Plugin name: WooCommerce US Address Autocomplete
 * Description: Address Autocomplete for WooCommerce sites.
 * Version: 0.0.1
 * Author: Juan Pablo Juliao
 * License: GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: woo-us-address-autocomplete
 * Require plugins: WooCommerce
 */

if (!defined('ABSPATH')) {
  exit;
}

require_once plugin_dir_path(__FILE__) . 'class-init.php';

Init::get_instance();
