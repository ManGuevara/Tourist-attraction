//function for filtering results
export function filter(filtro, type =""){

    let filtrado =[]

    //through filtering

    if(type == ""){//input
        filtrado = places.results.data.filter(item => item.name.toLowerCase().includes(filtro.toLowerCase()))
    }else if(type == "cat"){//combo

        filtrado = places.results.data.filter(item => {
            return item.subcategory[0].name.toLowerCase().includes(filtro.toLowerCase())
        })

    }else if (type == "pop"){//combo

        filtrado = places.results.data.sort((a,b)=>a.rating - b.rating)
    }
//drop content
document.querySelector(".items").innerHTML = "";

return filtrado

}