var baseLayerUrl="https://api.mapbox.com/styles/v1/sumothecat/cili0gxcb00dycykvtscdbtdz/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3Vtb3RoZWNhdCIsImEiOiJjaWxocngyanYwMDY4dmprcTg4ODN2Z3B2In0.CockfZdHAzqOfsbw8VcQyQ",map=L.map("map").setView([54.153421,-2.470504],13);L.tileLayer(baseLayerUrl,{attribution:'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',maxZoom:20}).addTo(map);var onEachFeature=function(a,e){a.properties&&a.properties.name&&e.bindPopup(a.properties.name)},addDataToMap=function(a){L.geoJson(a,{onEachFeature:onEachFeature}).addTo(map)};jQuery.ajax("data/map.json",{dataType:"json",success:addDataToMap});