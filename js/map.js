//create map
var map = L.map('map', {zoomControl: false}).setView([31.755, -94.444], 6);

//load osm basemap tiles
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//controls
var zoomHome = L.Control.zoomHome();
zoomHome.addTo(map);

L.control.locate().addTo(map);

var searchControl = L.esri.Geocoding.geosearch().addTo(map);
var results = L.layerGroup().addTo(map);

//Load states.json and style
L.geoJson(states, {
    style: function (feature) {
        return {color: "#666666", weight: 2, fillOpacity: 0}
    }
}).addTo(map);

//load counties.json and style based on distributor attribute
L.geoJson(counties, {
    style: function (feature) {
        switch (feature.properties.DIST) {
            case 'Favorite Brands New Mexico': return {color: "#ff9900", fillOpacity: 0, weight: 2};
            case 'L&F Distributors LLC': return {color: "#ff3333", fillOpacity: 0, weight: 2};
            case 'Ben E. Keith': return {color: "#00cc66", fillOpacity: 0, weight: 2};
            case 'Jack Hilliard Distributing': return {color: "#996633", fillOpacity: 0, weight: 2};
            case 'Sons of John': return {color: "#9933ff", fillOpacity: 0, weight: 2};
            case 'Crafty Connoisseurs Distributing': return {color: "#0066ff", fillOpacity: 0, weight: 2};
        }
    }
}).addTo(map);

//load adelberts.json and style
L.geoJson(adelberts).addTo(map);