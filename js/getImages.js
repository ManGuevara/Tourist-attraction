async function getImages(id){
    console.log("Descargando Datos...")
    const url = 'https://tourist-attraction.p.rapidapi.com/photos'
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': 'db121b7f58msh00824834efb239ep1c7638jsn9614ba6896aa',
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
export default getImages