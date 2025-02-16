import {obj} from './lib.js'
import  loadPlace  from './loadPlace.js'
import {filter} from './search.js'


// obtaining elements from DOM

const menuIcon = obj("menuIcon");
const menu = obj("nav");
const find= obj("input");
const filtros = document.getElementById("filtros");

let data =[];




// assigning a "click event" listner to the menu icon

menuIcon.addEventListener("click", (e) => {
    e.preventDefault()
    menu.classList.toggle("nav--show") //shows/hide the menu when click
})

find.addEventListener("keydown", (evt)=>{
  if(evt.target.value == ""){
    filtros.classList.remove("showFilter")
    fill(data.results.data);
    return
  }
if(evt.code == "Enter"){

  let filtrado = filter(evt.target.value, data)

  fill(filtrado)
  filtros.classList.add("showFilter")
} 

})


//LOCAL STORAGE

let nVisits = localStorage.getItem("counter")

if (nVisits === null) {
    nVisits = 0;
} else {
    nVisits = parseInt(nVisits)
}

nVisits++

localStorage.setItem("counter", nVisits);
obj("nVisits").textContent = nVisits


// API

window.addEventListener("load", async (e)=>{

  const result = await loadPlace()
  data = result

  fill(result.results.data)
  const category= document.getElementById("category");
  const popularity = document.getElementById("popularity");

  category.addEventListener("change", (e)=>{
    let filtro = filter(e.target.value, data, "cat")
    fill(filtro)
  })

popularity.addEventListener("change", (e)=>{

  let filtro = filter(e.target.value, data, "pop");
  fill(filtro)
})


})


const Fragment = document.createDocumentFragment(); //creates a fragment in document to manipulate DOM
const template = document.querySelector("template"); //takes the element template in documment for cloning its content


function fill(filtrado){

  filtrado.forEach((item) => {

    const clone = template.content.cloneNode(true)

    let data= {
            "id":item.location_id,
            "image":item.photo.images.small.url,
            "description":item.description,
            "latitude":item.latitude,
            "longitude":item.longitude
    }
console.log(data)
    let send = encodeURIComponent(JSON.stringify(data));
    
//modifying content elements in template
    clone.querySelector(".title").innerText = item.name;
    clone.getElementById("thumbnails").src = item.photo.images.small.url;
    clone.querySelector(".more").href =`details.html?item=${send}`
//passing clone to Fragment
    Fragment.append(clone);

    
  });
document.querySelector(".items").append(Fragment);
filtros.classList.add("showFilter");

}



