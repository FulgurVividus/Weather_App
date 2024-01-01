//* for APIs
// https://developer.accuweather.com/ -> APIs are taken
//? Free account permits 50 requests a day

const key = 'MH8Gzeld0FbpN1tdrE53mQOOZXF1nzLy';

// get weather information 

const getWeather = async (id) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};

// get city API call, city information

const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];

};
// getCity('tashkent').then(data => {
//     return getWeather(data.Key);
// }).then(data => {
//     console.log(data);
// }).catch(error => console.log(error));