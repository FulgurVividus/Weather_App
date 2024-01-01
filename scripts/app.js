const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

// function for updating ui

const updateUI = (data) => {

    const cityDets = data.cityDets;
    const weather = data.weather;

    // const {cityDets, weather} = data; -> destructure properties

    // update details template 
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // update the night/day & icon images
    const iconSrc = `icons${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = null;
    if (weather.IsDayTime) {
        timeSrc = 'images/day.svg';
    } else {
        timeSrc = 'images/night.svg';
        card.querySelector('h5').style.color = 'white';
    }
    time.setAttribute('src', timeSrc);

    // ternary operator
    // let timeSrc = weather.IsDayTime ? 'images/day.svg' : 'images/night.svg'; 

    //remove the d-none class if present 
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

};

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets: cityDets,
        weather: weather
    };

    // return {cityDets, weather}; -> only when pr.names and values are equal 
};

cityForm.addEventListener('submit', (e) => {
    // prevernt default action
    e.preventDefault();

    // get the city value 
    const city = cityForm.city.value.trim();
    cityForm.reset(); // to clear up the input field

    // update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(error => alert(error));
});