// Asynchronous function to fetch images of a tourist attraction
async function getImages(id){
    
    const url = 'https://tourist-attraction.p.rapidapi.com/photos'
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '56b011bfb4mshb1084ad76787c1ap1bc4fajsn1759e7f95d22', // API key for authentication
            'x-rapidapi-host': 'tourist-attraction.p.rapidapi.com',  // API host
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            location_id: id,
            language: 'en_US',
            currency: 'USD',
            offset: '0'
        })
    };

try {//attempt to fetch data


    //Await usar fetch de manera sincrona
	const response = await fetch(url, options); // Make the request to the API
	const result = await response.json();// Convert response to JSON format


    return result; // Return the fetched images data

    } catch (error) {// Catch block to handle any request errors
	console.error(error);
}
 
}
export default getImages; // Export the function to use it in other modules