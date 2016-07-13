

declare var L: any;
declare var omnivore: any;

console.log('Hello, Typescript');


let nice = (s: number) => {
    return s + s;
};

let baseLayerUrl = 'https://api.mapbox.com/styles/v1/sumothecat/cili0gxcb00dycykvtscdbtdz/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3Vtb3RoZWNhdCIsImEiOiJjaWxocngyanYwMDY4dmprcTg4ODN2Z3B2In0.CockfZdHAzqOfsbw8VcQyQ';

let map = L.map('map').setView([54.153421, -2.470504], 13);

L.tileLayer(baseLayerUrl, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    //id: 'your.mapbox.project.id',
    //accessToken: 'your.mapbox.public.access.token'
}).addTo(map);

// "C:\work\hyperfastingleton.github.io\data\Ingleton v2.5\doc.kml"
omnivore.kml('data/doc.kml').addTo(map);