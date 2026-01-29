document.addEventListener('DOMContentLoaded', () => {
  if (typeof jQuery === 'undefined') {
    console.error('[Address Autocomplete] jQuery is not defined');
    return;
  }

  if (typeof jQuery.ui === 'undefined') {
    console.error('[Address Autocomplete] jQuery UI is not defined');
    return;
  }

  const $ = jQuery;
  const select = (selector) => document.querySelector(selector);

  const setValueAndTrigger = (selector, value, changeEvent) => {
    const el = select(selector);
    if (el) {
      el.value = value;
      if (changeEvent) {
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  }

  const photonAddressAutocomplete = (selector, onSelect) => {
    if (!$(selector).length) return;

    const usStates = wcAddressAutocomplete.us_states;

    $(selector).autocomplete({
      source: (request, response) => {
        const url = new URL(wcAddressAutocomplete.photon_url);
        url.searchParams.append('q', request.term);
        url.searchParams.append('limit', 50);
        url.searchParams.append('lang', 'en');

        fetch(url)
          .then((res) => res.json())
          .then((data) => createSuggestions(data, usStates, response))
          .catch((error) => {
            console.error(
              '[Address Autocomplete] Error fetching address suggestions:',
              error
            );
            response([]);
          });
      },
      classes: {
        'ui-autocomplete': 'wc-address-autocomplete-dropdown'
      },
      minLength: 3,
      select: (event, ui) => {
        if (onSelect) {
          onSelect(ui.item.data);
        }
      }
    });
  }

  const createSuggestions = (data, usStates, response) => {
    const suggestions = [];
    if (data.features) {
      data.features.forEach((feature) => {
        const props = feature.properties;

        if (props.countrycode === 'US' || props.country === 'United States') {
          const street = props.street;
          const city = props.city;
          const state = props.state;
          const postcode = props.postcode;
          const stateCode = usStates[state] || state;
          let housenumber = props.housenumber;
          let label = props.name;

          if (
            typeof city === 'undefined'
            || typeof state === 'undefined'
            || typeof postcode === 'undefined'
          ) {
            return;
          }

          if (housenumber) {
            housenumber = housenumber + ' ' + street;
            label = housenumber;
          } else if (street) {
            label = street;
            housenumber = street;
          } else {
            housenumber = label;
          }

          label = label + ', ' + city + ', ' + stateCode + ', ' + postcode;

          suggestions.push({
            label: label,
            value: housenumber,
            data: {
              line1: housenumber,
              city: city,
              state: stateCode,
              postcode: postcode,
              country: 'US'
            }
          });
        }
      });
    }
    response(suggestions);
  }

  photonAddressAutocomplete('#shipping_address_1', (data) => {
    const fields = [
      ['#shipping_address_1', data.line1],
      ['#shipping_city', data.city],
      ['#shipping_state', data.state, true],
      ['#shipping_postcode', data.postcode],
      ['#shipping_country', 'US', true]
    ];

    fields.forEach(([selector, value, trigger]) => {
      setValueAndTrigger(selector, value, trigger);
    });
  });

  photonAddressAutocomplete('#billing_address_1', (data) => {
    const fields = [
      ['#billing_address_1', data.line1],
      ['#billing_city', data.city],
      ['#billing_state', data.state, true],
      ['#billing_postcode', data.postcode],
      ['#billing_country', 'US', true]
    ];

    fields.forEach(([selector, value, trigger]) => {
      setValueAndTrigger(selector, value, trigger);
    });
  });

});