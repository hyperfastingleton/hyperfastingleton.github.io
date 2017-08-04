---
date: 2017-07-27 00:03:31
---

The latest route plan for Ingleton.  View [full screen](https://api.mapbox.com/styles/v1/sumothecat/cj5w3i6w672u12slb33spg3te.html?title=true&access_token=pk.eyJ1Ijoic3Vtb3RoZWNhdCIsImEiOiJjaWxocngyanYwMDY4dmprcTg4ODN2Z3B2In0.CockfZdHAzqOfsbw8VcQyQ#16.0/54.155841/-2.467356/0), or **zoom in to find your house**!


{% raw %}
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.1.0/dist/leaflet.css"
   integrity="sha512-wcw6ts8Anuw10Mzh9Ytw4pylW8+NAD4ch3lqm9lzAsTxg0GFeJgoAtxuCLREZSC5lUXdVyo/7yfsqFjQ4S+aKw=="
   crossorigin=""/>

<script src="https://unpkg.com/leaflet@1.1.0/dist/leaflet.js"
   integrity="sha512-mNqn2Wg7tSToJhvHcqfzLMU6J4mkOImSPTxVZAdo+lcPlk+GhZmYgACEe0x35K7YzW1zJ7XyJV/TT1MrdXvMcA=="
   crossorigin=""></script>

<style>
    body { margin:0; padding:0; }
    #profile { display: none; }
    #sidebar { display: none; }
    #main { width: 100%; }
    #map { height: 40em; width:100%; }
</style>

<div id="map">
</div>

<script>

var url = 'https://api.mapbox.com/styles/v1/sumothecat/cj5w3i6w672u12slb33spg3te/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3Vtb3RoZWNhdCIsImEiOiJjaWxocngyanYwMDY4dmprcTg4ODN2Z3B2In0.CockfZdHAzqOfsbw8VcQyQ';

var map = L.map('map').setView([54.151, -2.470], 15);
L.tileLayer(url).addTo(map);

</script>
{% endraw %}

Please note; this route plan is **still changing**, and has probably already been amended since we uploaded it. The core **orange** routes are relatively stable. 

Please check your house or businesses is on the map. **If we don't know about you, you may miss out on a connection!** To suggest route alterations for your area, please contact your [local Zone Champion](/sign-up/).