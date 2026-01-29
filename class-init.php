<?php

namespace JPJULIAO\Wordpress\WooUSAddressAutocomplete;

if (!defined('ABSPATH')) {
  exit;
}

class Init
{

  private static $instance = null;

  public static function get_instance(): self
  {
    if (is_null(self::$instance)) {
      self::$instance = new self();
    }
    return self::$instance;
  }

  private function __construct()
  {

    add_action('wp_enqueue_scripts', array(
      $this,
      'enqueue_scripts'
    ));
  }

  public function enqueue_scripts(): void
  {
    if (!is_checkout()) {
      return;
    }
    wp_enqueue_style(
      'wc-address-autocomplete',
      plugin_dir_url(__FILE__) . 'assets/css/style.css',
      [],
      '1.0.0'
    );

    wp_enqueue_script(
      'wc-address-autocomplete',
      plugin_dir_url(__FILE__) . 'assets/js/script.js',
      ['jquery', 'jquery-ui-autocomplete'],
      '1.0.0',
      true
    );

    wp_localize_script(
      'wc-address-autocomplete',
      'wcAddressAutocomplete',
      [
        'us_states' => $this->get_us_states(),
        'photon_url' => 'https://photon.komoot.io/api/',
      ]
    );
  }

  public function get_us_states(): array
  {
    $us_states = file_get_contents(
      plugin_dir_path(__FILE__) . 'assets/us-states.json'
    );
    return json_decode($us_states, true);
  }
}
