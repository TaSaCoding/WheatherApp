function weekTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let date = now.getDate();
  let weekDay = document.querySelector("#week-day");
  weekDay.innerHTML = `${day}, </br> ${month} ${date}, ${year}`;
  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = `${hours}:${minutes}`;
}
function displayWeatherCondition(response) {
  let newCity = document.querySelector("#city");
  let cityTemperature = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#temperature");
  let humidityData = document.querySelector("#humidity");
  let windspeedData = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  newCity.innerHTML = response.data.name;
  mainTemp.innerHTML = `${cityTemperature}`;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#weather-text").innerHTML =
    response.data.weather[0].main;
  humidityData.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windspeedData.innerHTML = `Wind-Speed: ${Math.round(
    response.data.wind.speed
  )}km/h`;
  iconElement.setAttribute(
    "src",
    weatherIconUrls[response.data.weather[0].icon]
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
function searchCity(city) {
  let apiKey = "6e6ec494746b5229a9f2d526478c924c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#location-search").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "6e6ec494746b5229a9f2d526478c924c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function formatDayForcast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let dailyForcast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row weather-forecast" >`;
  dailyForcast.forEach(function (forecastday, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
    <img
                class="weather-icon"
                src= ${weatherIconUrls[element.weather[0].icon]}
                alt=""
                width="70"
          />
    <div class="weather-forecast-date">${forecastday.dt}</div>
    <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature-max">${Math.round(
        forecastday.temp.max
      )}</span>
      <span class="weather-forecast-temperature-min">${Math.round(
        forecastday.temp.min
      )}</span>
    </div>
  </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "caa883a4a60d93878755b08a933f74ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
let searchForm = document.querySelector("#city-input");
searchForm.addEventListener("submit", handleSubmit);
let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);
let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
weekTime();
searchCity("Cologne");
displayforecast();
