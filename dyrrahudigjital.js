var hash = window.location.hash.substr(1);
var mapOptions = {
    tap: false,
    center: [41.3225, 19.445],
    zoom: 18,
    maxZoom: 22,
    minZoom: 10,
    //maxBounds: [[39.690784799474905, 19.81299812520738], [40.098806006678494, 20.262505016975012]],
    //panControl: true,
    fullscreenControl:true,
    //fullscreenControlOptions: {position:'topleft'},
    touchZoom: true,
    attributionControl: false
 }

var map = L.map('map', mapOptions);
L.control.pan().addTo(map);
var mapWidth = map.getSize().x;
var mapHeight = map.getSize().y;
var popUpWidth = mapWidth * 0.8;
var popUpHeight = mapHeight * 0.6;
var imageWidth = popUpWidth * 0.8;
var imageHeight = imageWidth * 0.6;

var  Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {maxZoom:22, maxNativeZoom:19,
attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }).addTo(map);

var allSUs = L.geoJSON(allLayers, {
  onEachFeature: function (feature, layer) {
    var out = [];
      if (feature.properties){
        out.push("SU Number: " + feature.properties.SU);
          }
    layer.bindPopup(out.join("<br />"), {closeOnClick:true});

  }
}).addTo(map);

var drone1 = L.tileLayer('./drone/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 18, maxZoom: 22}).addTo(map);
