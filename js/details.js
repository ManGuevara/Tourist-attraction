//obtaining data from URL
const data =new URLSearchParams(window.location.search);

//obtaining specific data 
objJSON = JSON.parse(data.get("item"));

obj("image").src = objJSON.photo.images.small.url;

obj("description").textContent = objJSON.description;

//integrating  Leaflet to use OPENSTREETMAP
let map=L.map("map").setView([objJSON.latitude,objJSON.longitude],13)

//consuming

L.tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`,{
     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)