function getTemp(response) {
   console.log  (response.data);
  let currentTempElement = document.querySelector("#current-Temp");
 let temperature = response.data.temperature.current;
 let weatherConditionElement = document.querySelector("#weather-Condition");
 let HumidityElement = document.querySelector("#Humidity");
 let humidity = `${response.data.temperature.humidity}%`;
 let currentCity = document.querySelector("#current-City");
 let timeElement = document.querySelector("#time");
 let date = new Date (response.data.time * 1000);

currentCity.innerHTML = response.data.city;
timeElement.innerHTML = displayTime(date);
currentTempElement.innerHTML = Math.round(temperature);
weatherConditionElement.innerHTML = response.data.condition.description;
HumidityElement.innerHTML = (humidity);
}

function displayTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    let day = days[date.getDay()];

    return `${day}, ${hours}:${minutes}`
}

function displayCity(city) {
    let apiKey = "50a8380f4oe8265a54940c506tc9b3e0"
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`
axios.get(apiUrl).then(getTemp);
}

function searchForCity(event) {
event.preventDefault()
    let searchFormInput = document.querySelector("#search-Form-Input");
    displayCity(searchFormInput.value);
}

let searchForm = document.querySelector("#search-Form");
searchForm.addEventListener("submit", searchForCity);

displayCity("New York");