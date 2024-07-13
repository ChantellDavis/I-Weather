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
getForecast(response.data.city);
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

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
   
        return days[date.getDay()];
}
function getForecast(city) {
    let apiKey = "50a8380f4oe8265a54940c506tc9b3e0"
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`
    console.log(apiUrl);
axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    console.log(response.data)
    let forecastElement = document.querySelector("#forcast-Data");
let forecastHtml = "";

response.data.daily.forEach(function(day, index) {
    if (index < 4) {
        
    
 forecastHtml = forecastHtml +
 `<div class="forcastDate">${formatDay(day.time)}</div>
          <img
            src="${day.condition.icon_url}"
            class="forcastEmoji"
            />
          <div class="forcastTemp"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
          <div class="forecastTempTwo">${Math.round(day.temperature.minimum)}°</div>`; 
          }  
})
forecastElement.innerHTML = forecastHtml
}
let searchForm = document.querySelector("#search-Form");
searchForm.addEventListener("submit", searchForCity);


displayCity("Queens");
displayForecast(); 
