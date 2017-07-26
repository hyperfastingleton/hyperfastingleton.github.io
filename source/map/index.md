---
title: Map
date: 2017-07-27 00:03:31
---

Here's the latest proposed route plan for Ingleton.

{% raw %}
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.1.0/dist/leaflet.css"
   integrity="sha512-wcw6ts8Anuw10Mzh9Ytw4pylW8+NAD4ch3lqm9lzAsTxg0GFeJgoAtxuCLREZSC5lUXdVyo/7yfsqFjQ4S+aKw=="
   crossorigin=""/>

<script src="https://unpkg.com/leaflet@1.1.0/dist/leaflet.js"
   integrity="sha512-mNqn2Wg7tSToJhvHcqfzLMU6J4mkOImSPTxVZAdo+lcPlk+GhZmYgACEe0x35K7YzW1zJ7XyJV/TT1MrdXvMcA=="
   crossorigin=""></script>

<style>
    body { margin:0; padding:0; }
    #map { height: 40em; width:100%; }
</style>

<div id="map">
</div>

<script>

var url = 'https://api.mapbox.com/styles/v1/sumothecat/cj5lk1b2g2k2q2rqbu9xna399/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3Vtb3RoZWNhdCIsImEiOiJjaWxocngyanYwMDY4dmprcTg4ODN2Z3B2In0.CockfZdHAzqOfsbw8VcQyQ';

var map = L.map('map').setView([54.150, -2.47081], 15);
L.tileLayer(url).addTo(map);

</script>
{% endraw %}