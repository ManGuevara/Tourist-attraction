//asyncronic function
export async function loadPlace() {
    console.log("downloading data....") //testing data


    const url = 'https://tourist-attraction.p.rapidapi.com/search'; //endpoint URL to search touristic attractions

    // HTTP request configuration
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': 'f4f0970df7msh1ab4217c55cd832p1eb68ejsn0d6e7ee699ac',
            'x-rapidapi-host': 'tourist-attraction.p.rapidapi.com',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        //request params
        body: new URLSearchParams({
            location_id: '45963',
            language: 'en_US',
            currency: 'USD',
            offset: '0'
        })
    };



    try {
         const response = await fetch(url, options); //making request
         const result = await response.json(); //converting response to Json

        return result

        
    } catch (error) {
        console.error(error);
    }
    console.log("....downloaded data") // testing
}

//export default loadPlace;