
google.maps.event.addDomListener(window, 'load', function() {
 /**
 * Function scope variable for position
 */
    var latLon;
 /**
 * map styles
 */
	var styles = [
	{elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
			{elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
			{elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
			{
			featureType: 'poi.business',
			stylers: [{visibility: 'off'}]
			},
			{
			featureType: 'transit',
			elementType: 'labels.icon',
			stylers: [{visibility: 'off'}]
			},
			{
			featureType: 'administrative',
			elementType: 'geometry.stroke',
			stylers: [{color: '#c9b2a6'}]
			},
			{
			featureType: 'administrative.land_parcel',
			elementType: 'geometry.stroke',
			stylers: [{color: '#dcd2be'}]
			},
			{
			featureType: 'administrative.land_parcel',
			elementType: 'labels.text.fill',
			stylers: [{color: '#ae9e90'}]
			},
			{
			featureType: 'landscape.natural',
			elementType: 'geometry',
			stylers: [{color: '#dfd2ae'}]
			},
			{
			featureType: 'poi',
			elementType: 'geometry',
			stylers: [{color: '#dfd2ae'}]
			},
			{
			featureType: 'poi',
			elementType: 'labels.text.fill',
			stylers: [{color: '#93817c'}]
			},
			{
			featureType: 'poi.park',
			elementType: 'geometry.fill',
			stylers: [{color: '#a5b076'}]
			},
			{
			featureType: 'poi.park',
			elementType: 'labels.text.fill',
			stylers: [{color: '#447530'}]
			},
			{
			featureType: 'road',
			elementType: 'geometry',
			stylers: [{color: '#f5f1e6'}]
			},
			{
			featureType: 'road.arterial',
			elementType: 'geometry',
			stylers: [{color: '#fdfcf8'}]
			},
			{
			featureType: 'road.highway',
			elementType: 'geometry',
			stylers: [{color: '#f8c967'}]
			},
			{
			featureType: 'road.highway',
			elementType: 'geometry.stroke',
			stylers: [{color: '#e9bc62'}]
			},
			{
			featureType: 'road.highway.controlled_access',
			elementType: 'geometry',
			stylers: [{color: '#e98d58'}]
			},
			{
			featureType: 'road.highway.controlled_access',
			elementType: 'geometry.stroke',
			stylers: [{color: '#db8555'}]
			},
			{
			featureType: 'road.local',
			elementType: 'labels.text.fill',
			stylers: [{color: '#806b63'}]
			},
			{
			featureType: 'transit.line',
			elementType: 'geometry',
			stylers: [{color: '#dfd2ae'}]
			},
			{
			featureType: 'transit.line',
			elementType: 'labels.text.fill',
			stylers: [{color: '#8f7d77'}]
			},
			{
			featureType: 'transit.line',
			elementType: 'labels.text.stroke',
			stylers: [{color: '#ebe3cd'}]
			},
			{
			featureType: 'transit.station',
			elementType: 'geometry',
			stylers: [{color: '#dfd2ae'}]
			},
			{
			featureType: 'water',
			elementType: 'geometry.fill',
			stylers: [{color: '#b9d3c2'}]
			},
			{
			featureType: 'water',
			elementType: 'labels.text.fill',
			stylers: [{color: '#92998d'}]
			}
	];
	
	/* Check if Geo-location is supported, then choose the center of the map */
	if (navigator.geolocation) {
	/* Center = user location  */
		navigator.geolocation.getCurrentPosition(geoPosition, geoError);
	} else {
	/* Center = BSB atelier  */
		latLon = new google.maps.LatLng(51.2051, 4.4254);
		 buildmap(latLon);
	};

	function geoPosition(position) {
		latLon = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		buildmap(latLon);
	};
    
	function geoError(error) {
    /* Default to BSB Atelier BE */
		latLon = new google.maps.LatLng(51.2051, 4.4254);
		 buildmap(latLon);
	};

	/* Needed to put everything in a function to avoid hoisting asyncs  */
	function buildmap(latLon) {
	
	
		map = new google.maps.Map(document.getElementById('map-canvas'), {
			center: latLon,
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			/**
		* Set the map style
		*/
			styles: styles
		});
	 
        
		var panelDiv = document.getElementById('panel');

		var data = new BsBDataSource;
		var view = new storeLocator.View(map, data, {
			geolocation: false,
			features: data.getFeatures(),
			markerIcon: 'cookie-marker32.png'
		});

		new storeLocator.Panel(panelDiv, {
			view: view,
			locationSearchLabel: 'Enter a location:'
	});
  };

});
