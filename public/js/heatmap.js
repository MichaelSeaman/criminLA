
var map, heatmap;

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 34.052235, lng: -118.243683},
    mapTypeId: 'roadmap',
    scrollwheel: false,
    draggable: false,
    disableDefaultUI: true
  });

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(),
    map: map
  });

  var card = document.getElementById('pac-card');
  var input = document.getElementById('pac-input');
  var countries = document.getElementById('country-selector');

  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

  var autocomplete = new google.maps.places.Autocomplete(input);

  // Set initial restrict to the greater list of countries.
  autocomplete.setComponentRestrictions({'country': 'us'});

  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
	  // User entered the name of a Place that was not suggested and
	  // pressed the Enter key, or the Place Details request failed.
	  window.alert("No details available for input: '" + place.name + "'");
	  return;
  }

  // If the place has a geometry, then present it on a map.
  if (place.geometry.viewport) {
	  map.fitBounds(place.geometry.viewport);
  } else {
	  map.setCenter(place.geometry.location);
	  map.setZoom(17);  // Why 17? Because it looks good.
  }
  marker.setPosition(place.geometry.location);
  marker.setVisible(true);

  var address = '';
  if (place.address_components) {
	  address = [
	    (place.address_components[0] && place.address_components[0].short_name || ''),
	    (place.address_components[1] && place.address_components[1].short_name || ''),
	    (place.address_components[2] && place.address_components[2].short_name || '')
	    ].join(' ');
    }

    infowindowContent.children['place-icon'].src = place.icon;
    infowindowContent.children['place-name'].textContent = place.name;
    infowindowContent.children['place-address'].textContent = address;
    infowindow.open(map, marker);
  });

  // Sets a listener on a given radio button. The radio buttons specify
  // the countries used to restrict the autocomplete search.
  /*function setupClickListener(id, countries) {
    var radioButton = document.getElementById(id);
    radioButton.addEventListener('click', function() {
	  autocomplete.setComponentRestrictions({'country': countries});
    });
  }

  setupClickListener('changecountry-usa', 'us');
  setupClickListener(
	  'changecountry-usa-and-uot', ['us', 'pr', 'vi', 'gu', 'mp']);*/
  }

  function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
  }

  function changeGradient() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
  heatmap.set('radius', heatmap.get('radius') ? null : 40);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

// Heatmap data: 500 Points
function getPoints() {
  return [
    new google.maps.LatLng(34.0559, -118.2800),
    new google.maps.LatLng(33.7830, -118.2572),
    new google.maps.LatLng(34.1016, -118.3267),
    new google.maps.LatLng(34.1867, -118.3997),
    new google.maps.LatLng(34.1117, -118.3215),
    new google.maps.LatLng(33.9988, -118.4682),
    new google.maps.LatLng(33.9921, -118.2564),
    new google.maps.LatLng(34.0455, -118.2806),
    new google.maps.LatLng(34.9989, -118.2494),
    new google.maps.LatLng(34.0002, -118.2521),
    new google.maps.LatLng(34.0423, -118.2452),
    new google.maps.LatLng(34.0423, -118.2452),
    new google.maps.LatLng(33.9923, -118.4741),
    new google.maps.LatLng(34.2284, -118.4851),
    new google.maps.LatLng(34.1016, -118.3267),
    new google.maps.LatLng(34.1479, -118.5999),
    new google.maps.LatLng(33.9761, -118.2871),
    new google.maps.LatLng(34.0836, -118.3486),
    new google.maps.LatLng(34.2391, -118.4502),
  ];
}
