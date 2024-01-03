//* for APIs
// https://developer.accuweather.com/ -> APIs are taken
//? Free account permits 50 requests a day

class Forecast{
    constructor(){ // no need for parametrs because this wont have unique properties
        this.key = 'MH8Gzeld0FbpN1tdrE53mQOOZXF1nzLy';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    };
    async updateCity(city){ // async method
        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key);

        return {
            cityDets: cityDets,
            weather: weather
        };
        // return {cityDets, weather}; -> only when pr.names and values are equal
    };
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();

        return data[0];
    };
    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();

        return data[0];
    };
};


// getCity('tashkent').then(data => {
//     return getWeather(data.Key);
// }).then(data => {
//     console.log(data);
// }).catch(error => console.log(error));