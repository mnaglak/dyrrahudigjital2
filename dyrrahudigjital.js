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
var popUpWidth = mapWidth * 0.6;
var popUpHeight = mapHeight * 0.6;
var imageWidth = popUpWidth * 0.8;
var imageHeight = imageWidth * 0.6;
var langNumber=0;
var  Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {maxZoom:22, maxNativeZoom:19,
attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }).addTo(map);

var allSUs = L.geoJSON(allLayers, {
  onEachFeature: function (feature, layer) {
    var out = [];
      if (feature.properties){
        out.push("SU: " + feature.properties.SU);
          }
    layer.bindPopup(out.join("<br />"), {closeOnClick:true});

  }
}).addTo(map);
var sites= L.geoJSON(nearbySites, {
  onEachFeature: popUpPlacesAL,
  pointToLayer: function (feature, latlng) {
      var markerStyle = {
          color: "#FFF",
          fillOpacity: 1,
          opacity: 0.5,
          weight: 1,
          radius: 10
      };
      return L.circleMarker(latlng, markerStyle);
  }
}).addTo(map);

function popUpPlacesAL(f, l) {
    l.bindTooltip(f.properties.Name);
    var out = [];
    var myImage;
    var myImageW = imageWidth;
    var myImageH = imageHeight;
    if (f.properties) {
        out.push("<img class='center' style='max-width:300px' src= '.\\" + f.properties.photo + "'/>");
        out.push("<b><u>" + f.properties.Name + '</u></b>');
        out.push( f.properties.descriptionAL);
        l.bindPopup(out.join("<br/>"), { maxHeight: popUpHeight, maxWidth: popUpWidth, closeOnClick: true });
    }
}
function popUpPlacesEN(f, l) {
    l.bindTooltip(f.properties.Name);
    var out = [];
    var myImage;
    var myImageW = imageWidth;
    var myImageH = imageHeight;
    if (f.properties) {
        out.push("<img class='center' style='max-width:300px' src= '.\\" + f.properties.photo + "'/>");
        out.push("<b><u>" + f.properties.Name + '</u></b>');
        out.push( f.properties.descriptionEN);
        l.bindPopup(out.join("<br/>"), { maxHeight: popUpHeight, maxWidth: popUpWidth, closeOnClick: true });
    }
}
var drone1 = L.tileLayer('./drone/{z}/{x}/{y}.png', {tms: true, attribution: "", minZoom: 18, maxZoom: 22}).addTo(map);
map.on('popupopen', function(e) {
    var px = map.project(e.target._popup._latlng); // find the pixel location on the map where the popup anchor is
    px.y -= e.target._popup._container.clientHeight/2; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
    map.panTo(map.unproject(px),{animate: true}); // pan to new center
});

function changeLanguage(lang) {
  map.removeLayer(sites);
  if (lang == "en") {
    langNumber=1;
    var sites= L.geoJSON(nearbySites, {
      onEachFeature: popUpPlacesEN,
      pointToLayer: function (feature, latlng) {
          var markerStyle = {
              color: "#FFF",
              fillOpacity: 1,
              opacity: 0.5,
              weight: 1,
              radius: 10
          };
          return L.circleMarker(latlng, markerStyle);
      }

    })}
    else {
      langNumber=1;
      var sites= L.geoJSON(nearbySites, {
        onEachFeature: popUpPlacesAL,
        pointToLayer: function (feature, latlng) {
            var markerStyle = {
                color: "#FFF",
                fillOpacity: 1,
                opacity: 0.5,
                weight: 1,
                radius: 10
            };
            return L.circleMarker(latlng, markerStyle);
        }
    })}
    sites.addTo(map);
}
