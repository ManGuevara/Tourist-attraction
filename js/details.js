import {obj} from "./lib.js"
import getImages from "./getImages.js"


// Wait for the entire page to load before executing this function
window.addEventListener("load" ,async ( )=>{
//obtaining data from URL
const data =new URLSearchParams(window.location.search);// Get query parameters

 // Retrieve and parse the JSON object from the URL parameter "item"
const  objJSON = JSON.parse(data.get("item"));
//Fetch images related to the selected place using its ID
let phots = await getImages(objJSON.id);

//Assign images to the HTML elements with IDs "minA", "minB", etc.
obj("minA").src = phots.results.data[0].images.small.url;
obj("minB").src = phots.results.data[1].images.small.url;
obj("minC").src = phots.results.data[2].images.small.url;
obj("minD").src = phots.results.data[3].images.small.url;
//Set the main image and description
obj("image").src=objJSON.image;

obj("description").textContent = objJSON.description;
//"Add to Favorites" button functionality
obj("btnFavorite").addEventListener("click",(e)=>{

     e.preventDefault(); // Prevent default link behavior
     // Retrieve existing favorites from localStorage or initialize an empty array
     let favorito=JSON.parse(localStorage.getItem("favoritos")) || [];
        // Add the current place to the favorites array
     favorito.push(
          
               {
                    "id":objJSON.id,
                    "name":objJSON.name,
                    "image":objJSON.image,
                    "description":objJSON.description,
                    "latitude":objJSON.latitude,
                    "longitude":objJSON.longitude
                }
          
     );
 // Save the updated favorites list back to localStorage
     localStorage.setItem("favoritos",JSON.stringify(favorito))
     alert("save to favorite");

})

//Initialize OpenStreetMap (Leaflet.js) and center it on the place's coordinates
const map=L.map("map").setView([objJSON.latitude,objJSON.longitude],12) //New York

//adding layer map from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Adding marker to the map with a popup
L.marker([objJSON.latitude, objJSON.longitude]).addTo(map)
     .bindPopup("Ubicación seleccionada")
     .openPopup();
     
});




