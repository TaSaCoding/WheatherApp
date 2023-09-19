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
weekTime();

function displayWeatherCondition(response) {
  let newCity = document.querySelector("#city");
  newCity.innerHTML = response.data.name;
  let cityTemperature = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#temperature");
  mainTemp.innerHTML = `${cityTemperature}`;
  document.querySelector("#weather-text").innerHTML =
    response.data.weather[0].main;
  let humidityData = document.querySelector("#humidity");
  humidityData.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windspeedData = document.querySelector("#wind");
  windspeedData.innerHTML = `Wind-Speed: ${Math.round(
    response.data.wind.speed
  )}km/h`;
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
let searchForm = document.querySelector("#city-input");
searchForm.addEventListener("submit", handleSubmit);
let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);
