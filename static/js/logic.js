// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson

// Create a map and then pass in some options
let map = L.map("map", {
    center: [
        40.76, -111.89
    ],
    zoom: 4
});
// Create layer for background
let basemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
// Add background to the map
basemap.addTo(map);

// Retrieve the earthquake data from the geojson
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

    function markerRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return 4 * magnitude
    }

    function styleInfo(feature) {
        return {
            fillOpacity: 0.9,
            radius: markerRadius(feature.properties.mag)
        }
    }

    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                "Magnitude: " + feature.properties.mag +
                "<br>Depth: " + feature.geometry.coordinates[2] +
                "<br>Location: " + feature.properties.place
            );
        }
    }).addTo(map);
})
