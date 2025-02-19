//function for filtering results
export function filter(filtro,places, type =""){
 // Initializing an empty array to store the filtered results
    let filtrado =[];

    //through filtering logic based on the type of search

    if(type == ""){// If no type is specified, filter by name (input search)
        filtrado = places.results.data.filter(item => item.name.toLowerCase().includes(filtro.toLowerCase()));// Convert both to lowercase to make the search case-insensitive
    }else if(type == "cat"){// If filtering by category (dropdown selection)

        filtrado = places.results.data.filter(item => {
            return item.subcategory[0].name.toLowerCase().includes(filtro.toLowerCase())
        })

    }else if (type == "pop"){// If sorting by popularity (dropdown selection)

        filtrado = places.results.data.sort((a,b)=>a.rating - b.rating)
    }
    // Clear previous content before displaying new results
    document.querySelector(".items").innerHTML = "";
    // Return the filtered or sorted data
    return filtrado;

}