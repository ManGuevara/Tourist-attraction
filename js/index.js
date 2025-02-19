import {obj} from './lib.js'
import  loadPlace  from './loadPlace.js'
import {filter} from './search.js'


// obtaining elements from DOM with a helper function obj

const menuIcon = obj("menuIcon");
const menu = obj("nav");
const find= obj("input");
const filtros = document.getElementById("filtros");
// Initializing an empty array to store data
let data =[];


// Adding a "click event" listner to the menu icon

menuIcon.addEventListener("click", (e) => {
    e.preventDefault()// Prevents any default action 

    // Toggles the "nav--show" class on the menu element
    // If the class exists, it is removed (hiding the menu)
    // If the class does not exist, it is added (showing the menu)
    menu.classList.toggle("nav--show") 
})
// Adding a keydown event listener to the search input field
find.addEventListener("keydown", (evt)=>{
  if(evt.target.value == ""){
    filtros.classList.remove("showFilter");// Hide the filter section
    fill(data.results.data);// Reload all data into the page
    return;
  }
// If the user presses the "Enter" key, apply the filtering function  
if(evt.code == "Enter"){

  let filtrado = filter(evt.target.value, data); // Call the filter function

  fill(filtrado); // Update the displayed data with the filtered results
  filtros.classList.add("showFilter");  // Show the filter section
} 

})


//LOCAL STORAGE
// Retrieve the visit counter from localStorage
let nVisits = localStorage.getItem("counter")
// Check if this is the user's first visit
if (nVisits === null) {
    nVisits = 0; // If no previous counter exists, set it to 0
} else {
    nVisits = parseInt(nVisits); // Convert the stored string to an integer
  
}

nVisits++ // Increment the visit counter
// Store the updated counter value in localStorage
localStorage.setItem("counter", nVisits);
// Update the webpage to display the visit count
obj("nVisits").textContent = nVisits //selecting an element with helper function obj


// API
// Wait for the entire page (HTML, CSS, images) to load before executing the script
window.addEventListener("load", async ( )=>{
// Call loadPlace() asynchronously and wait for the result
  const result = await loadPlace();
  data = result; // Store the fetched data in a variable data

// Populate the interface with the initial data
  fill(result.results.data)

// Get the category and popularity filter elements from the DOM
  const category= document.getElementById("category");
  const popularity = document.getElementById("popularity");

// Event listener for the category filter
  category.addEventListener("change", (e)=>{
     // Filter the data based on the selected category
    let filtro = filter(e.target.value, data, "cat");
    // Update the interface with the filtered data
    fill(filtro)
  })
// Event listener for the popularity filter
popularity.addEventListener("change", (e)=>{
 // Filter the data based on the selected popularity level
  let filtro = filter(e.target.value, data, "pop");
  // Update the interface with the filtered data
  fill(filtro)
})


})

const Fragment = document.createDocumentFragment(); //creates a fragment in document to manipulate DOM
const template = document.querySelector("template"); //takes the element template in documment for cloning its content


function fill(filtrado){
//loop through the filtered data array
  filtrado.forEach((item) => {
// Clone the template content (deep clone to include all child elements)
    const clone = template.content.cloneNode(true);
 // Create an object containing the item's details
    let data= {
            "id":item.location_id,
            "name":item.name,
            "image":item.photo.images.small.url,
            "description":item.description,
            "latitude":item.latitude,
            "longitude":item.longitude
    }
// Convert the data object to a JSON string and encode it for use in a URL
    let send = encodeURIComponent(JSON.stringify(data));
    
//modifying content elements in template with actual data
    clone.querySelector(".title").innerText = item.name;
    clone.getElementById("thumbnails").src = item.photo.images.small.url;
    clone.querySelector(".more").href =`details.html?item=${send}`
//passing clone to Fragment
    Fragment.append(clone);

    
  });
  // Once all items are processed, add them to the main container in the DOM
document.querySelector(".items").append(Fragment);
// Make sure the filter interface section is visible by adding the "showFilter" class
filtros.classList.add("showFilter");

}

obj("btnBuscar").addEventListener("click",(e)=>{
    
  e.preventDefault()
  fill(filter(find.value, data))

})