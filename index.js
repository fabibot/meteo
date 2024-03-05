// clé 9b0eebc2a6964161982213842240403
// https://api.weatherapi.com/v1/current.json?key=9b0eebc2a6964161982213842240403&q=london

function SetWeather(temperatureCelsius, temperatureFahrenheit, sky, windSpeed) {
  this.temperatureCelsius = temperatureCelsius;
  this.temperatureFahrenheit = temperatureFahrenheit;
  this.sky = sky;
  this.windSpeed = windSpeed;
}
let weather;

async function getweather(input) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=9b0eebc2a6964161982213842240403&q=${input}`);
    const weatherData = await response.json();
    weather = new SetWeather(
      weatherData.current.temp_c,
      weatherData.current.temp_f,
      weatherData.current.condition.text,
      weatherData.current.wind_kph,
    );
    return weather;
  } catch {
    console.log('This is an error');
  }
}

function updateScreen(currentWeather) {
  console.log(weather);
  console.log(currentWeather.temperatureCelsius);
}

const submitButton = document.querySelector('#submitButton');
submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  const input = document.querySelector('input').value;
  const weatherToDisplay = getweather(input);
  updateScreen(weatherToDisplay);
});
