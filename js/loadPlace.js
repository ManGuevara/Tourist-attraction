//asyncronic function
async function loadPlace() {
    
    const url = 'https://tourist-attraction.p.rapidapi.com/search'; //endpoint URL to search touristic attractions

    // HTTP request configuration
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '56b011bfb4mshb1084ad76787c1ap1bc4fajsn1759e7f95d22', //API key for authentication
            'x-rapidapi-host': 'tourist-attraction.p.rapidapi.com', //Host for API request
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        //request parameters sent in the body
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
}

export default loadPlace;