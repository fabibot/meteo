// clé 9b0eebc2a6964161982213842240403
// https://api.weatherapi.com/v1/current.json?key=9b0eebc2a6964161982213842240403&q=london

let weather;
let isTempInCelsius = true;

function SetWeather(location, temperatureCelsius, temperatureFahrenheit, sky, windSpeed) {
  this.location = location;
  this.temperatureCelsius = temperatureCelsius;
  this.temperatureFahrenheit = temperatureFahrenheit;
  this.sky = sky;
  this.windSpeed = windSpeed;
}

async function getweather(input) {
  fetch(`https://api.weatherapi.com/v1/current.json?key=9b0eebc2a6964161982213842240403&q=${input}`)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      weather = new SetWeather(
        response.location,
        response.current.temp_c,
        response.current.temp_f,
        response.current.condition.text,
        response.current.wind_kph,
      );
      updateScreen(weather);
      return weather;
    })
    .catch(() => {
      console.log('ERROR');
    });
}

function updateScreen(currentWeather) {
  const locationh1 = document.querySelector('#location');
  const temp = document.querySelector('#temp');
  const windSpeed = document.querySelector('#windSpeed');
  const sky = document.querySelector('#sky');
  locationh1.textContent = `${currentWeather.location.name}, ${currentWeather.location.region}, ${currentWeather.location.country}`;
  sky.textContent = currentWeather.sky;
  if (isTempInCelsius) {
    temp.textContent = `${currentWeather.temperatureCelsius}°C`;
  } else {
    temp.textContent = `${currentWeather.temperatureFahrenheit}°F`;
  }
  windSpeed.textContent = `wind speed : ${currentWeather.windSpeed} kph`;
}

const submitButton = document.querySelector('#submitButton');
submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  const input = document.querySelector('input').value;
  getweather(input);
});

const celsiusButton = document.querySelector('#celsius');
const fahrenheitButton = document.querySelector('#fahrenheit');

celsiusButton.addEventListener('click', () => {
  celsiusButton.style.backgroundColor = '#ceebe1d4';
  isTempInCelsius = true;
  fahrenheitButton.style.backgroundColor = '';
});

fahrenheitButton.addEventListener('click', () => {
  fahrenheitButton.style.backgroundColor = '#ceebe1d4';
  isTempInCelsius = false;
  celsiusButton.style.backgroundColor = '';
});
