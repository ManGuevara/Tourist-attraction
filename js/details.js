import {obj} from "/lib.js"
import {getImages} from "/getImages.js"



window.addEventListener("load" ,async (e)=>{
//obtaining data from URL
const data =new URLSearchParams(window.location.search);

//obtaining specific data 
const  objJSON = JSON.parse(data.get("item"));

let phots = await getImages(objJSON.id);

obj("minA").src = phots.results.data[0].images.small.url;
obj("minB").src = phots.results.data[1].images.small.url;
obj("minC").src = phots.results.data[2].images.small.url;
obj("minD").src = phots.results.data[3].images.small.url;

obj("image").src=objJSON.image

obj("description").textContent = objJSON.description;

//integrating  Leaflet to use OPENSTREETMAP
const map=L.map("map").setView([objJSON.latitude,objJSON.longitude],12) //New York

//adding layer map from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Adding marker
L.marker([objJSON.latitude, objJSON.longitude]).addTo(map)
     .bindPopup("Ubicación seleccionada")
     .openPopup();
     

})




