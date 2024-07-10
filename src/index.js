function getTemp(response) {
   
  let currentTempElement = document.querySelector("#current-Temp");
 let temperature = response.data.temperature.current;
 let weatherConditionElement = document.querySelector("#weather-Condition");
 let HumidityElement = document.querySelector("#Humidity");
 let humidity = `${response.data.temperature.humidity}%`;
 let currentCity = document.querySelector("#current-City");
 let timeElement = document.querySelector("#time");
 let date = new Date (response.data.time * 1000);
let icon = document.querySelector("#icon");
 icon.innerHTML = `<img src= "${response.data.condition.icon_url}"
            class="weatherEmoji"
           />`
currentCity.innerHTML = response.data.city;
timeElement.innerHTML = displayTime(date);
currentTempElement.innerHTML = Math.round(temperature);
weatherConditionElement.innerHTML = response.data.condition.description;
HumidityElement.innerHTML = (humidity);
}

function displayTime(date) {
    let hours = date.getHours(); 
    
    let minutes = date.getMinutes();
   if (minutes < 10) {
        let minutes = `0${minutes}`
    };

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

function getForecast(city) {
    let apiKey = "50a8380f4oe8265a54940c506tc9b3e0"
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`
axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    console.log(response.data)
    let forecastElement = document.querySelector("#forcast-Data");
let forecastHtml = "";
let days = ["Tue", "Wed", "Thu", "Fri", "Sat"]
days.forEach(function(day) {
 forecastHtml = forecastHtml +
 `<div class="forcastDate">${day}</div>
          <img
            src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day.png"
            alt=""
            class="forcastEmoji"
            width="70px"
          />
          <div class="forcastTemp"><strong>75°</strong></div>
          <div class="forecastTempTwo">55°</div>`;   
})
forecastElement.innerHTML = forecastHtml
}
let searchForm = document.querySelector("#search-Form");
searchForm.addEventListener("submit", searchForCity);

getForecast("New York");
displayCity("New York");
displayForecast(); 
