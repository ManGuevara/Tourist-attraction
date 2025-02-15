export async function getImages(id){

    const url = 'https://tourist-attraction.p.rapidapi.com/photos'
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': 'f4f0970df7msh1ab4217c55cd832p1eb68ejsn0d6e7ee699ac',
            'x-rapidapi-host': 'tourist-attraction.p.rapidapi.com',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            location_id: id,
            language: 'en_US',
            currency: 'USD',
            offset: '0'
        })
    };

try {//intentamos


    //Await usar fetch de manera sincrona
	const response = await fetch(url, options);//Hacer el request
	const result = await response.json();


    return result

    } catch (error) {
	console.error(error);
}
 
}
