function getTemp(response) {
   console.log  (response.data);
  let currentTempElement = document.querySelector("#current-Temp");
 let temperature = response.data.temperature.current;
 let weatherConditionElement = document.querySelector("#weather-Condition");
 let HumidityElement = document.querySelector("#Humidity");
 let humidity = `${response.data.temperature.humidity}%`
 let windElement = document.querySelector("#wind");
 
 let windSpeed = `${response.data.wind.speed}`
currentTempElement.innerHTML = Math.round(temperature);
weatherConditionElement.innerHTML = response.data.condition.description;
HumidityElement.innerHTML = (humidity);
windElement.innerHTML = Math.round`${windSpeed}Mph`;
}

function displayCity(city) {
    let apiKey = "50a8380f4oe8265a54940c506tc9b3e0"
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`
axios.get(apiUrl).then(getTemp);
}

function searchForCity(event) {
event.preventDefault()
    let searchFormInput = document.querySelector("#search-Form-Input");
    let currentCity = document.querySelector("#current-City");
    currentCity.innerHTML = searchFormInput.value;
    displayCity(searchFormInput.value);
}

let searchForm = document.querySelector("#search-Form");
searchForm.addEventListener("submit", searchForCity);