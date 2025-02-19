// Retrieve the "favoritos" array from localStorage and parse it into a JavaScript array.
// If no data is found, initialize it as an empty array.
let favoritos=JSON.parse(localStorage.getItem("favoritos")) || [];
// Iterate through each favorite item stored in localStorage.
favoritos.forEach(element => {
    // Convert the element object to a JSON string and encode it to be used in a URL.
    let send = encodeURIComponent(JSON.stringify(element))
    // Insert a new list item (<li>) with a clickable link (<a>) that redirects to details.html.
    // The item data is passed as a URL parameter.
    document.getElementById("favoritos").insertAdjacentHTML("afterBegin",
                `<li><a href="details.html?item=${send}">${element.name}</a></li>`);
});

//LOCAL STORAGE

let nVisits = localStorage.getItem("counter")

if (nVisits === null) {
    nVisits = 0;
} else {
    nVisits = parseInt(nVisits);
}

nVisits++

localStorage.setItem("counter", nVisits);
document.getElementById("nVisits").textContent = nVisits;
