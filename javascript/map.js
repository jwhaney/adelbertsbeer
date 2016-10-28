//initialize map
var map = L.map('map', {zoomControl: false}).setView([30.417, -98.120], 8);

//osm variable
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="//osm.org/copyright">OpenStreetMap</a> contributors'
});

//leaflet plugin custom zoom in/out home tool
var zoomHome = L.Control.zoomHome();
    zoomHome.addTo(map);

var layers = {
    AdelbertsBeer: markers,
    OpenStreetMap: osm
};

layers.OpenStreetMap.addTo(map);

L.control.layers(layers).addTo(map);

//esri geocoder control
var arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider();

var searchControl = L.esri.Geocoding.geosearch({
    providers: [
      arcgisOnline,
      ]}).addTo(map);

var results = L.layerGroup().addTo(map);

searchControl.on('results', function(data){
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  });

//locate control
L.control.locate().addTo(map);

//leaflet markercluster
var markers = new L.MarkerClusterGroup();
for (var i = 0; i < beerLocations.length; i++) {
    var a = beerLocations[i];
    var title = a[2];
    var address = a[3];
    var city = a[4];
    var state = a[5];
    var zip = a[6];
    var marker = L.marker(new L.LatLng(a[0], a[1]), {
        icon: L.mapbox.marker.icon({'marker-symbol': 'alcohol-shop', 'marker-color': '654321'}),
	title: title
    });
    marker.bindPopup(title + '<br>' + address + '<br>' + city + ', ' + state + ' ' + zip);
    markers.addLayer(marker);
}
map.addLayer(markers);

//zoom to marker bounds
var bounds = markers.getBounds();
function fit() {
	map.fitBounds(bounds);
};

map.fitBounds(bounds);

//filter by county control
var county = document.getElementById('county');

county.addEventListener('change', function(){
    ausProjects.setWhere(county.value);
});