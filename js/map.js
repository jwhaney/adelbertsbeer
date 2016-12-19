//create map
var map = L.map('map',{zoomControl:false});

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//esri geocoder
var arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider();

var searchControl = L.esri.Geocoding.geosearch({providers: [arcgisOnline]}).addTo(map);

var results = L.layerGroup().addTo(map);

searchControl.on('results', function(data){
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  });

//create adelberts world headquarters json
L.mapbox.featureLayer({
    'type': 'Feature',
    'geometry': {
        'type': 'Point',
        'coordinates': [
          -97.7199070,
          30.3825210,
        ]
    },
    'properties': {
        'title': 'Adelberts Brewery World Headquarters',
		'description': '2314 Rutland Dr #100, Austin, TX 78758',
		'marker-color': '#654321'
    }
}).addTo(map);