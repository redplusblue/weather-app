import "./style.css";
import secrets from "./secrets";
import { createClient } from "pexels";

const OW_API_KEY = secrets["OPENWEATHER"];
// const P_API_KEY = secrets["PEXELS"];
// const client = createClient(P_API_KEY);

function createLayout() {
  const header = document.createElement("header");
  const section = document.createElement("section");
  const footer = document.createElement("footer");

  // Header
  const title = document.createElement("div");
  title.innerText = "The-Weather-App";
  title.id = "title";
  const searchContainer = document.createElement("div");
  searchContainer.id = "search-container";
  const search = document.createElement("input");
  search.id = "search";
  search.placeholder = "🔎 Search...";
  const searchButton = document.createElement("button");
  searchButton.id = "search-button";
  
  // Section
  const weatherCard = document.createElement("div");
  weatherCard.id = "weather-card";
  const forecastCard = document.createElement("div");

  // Header: Title
  header.appendChild(title);
  // Header: Search Bar
  // TBD: Current location button next to search button 
  searchButton.innerText = "Search";
  searchContainer.appendChild(search);
  searchContainer.appendChild(searchButton);
  header.appendChild(searchContainer);

  // Section: weather card: {Icon, WeatherInfo, Fact}
  // Icon
  const iconContainer = document.createElement("div");
  iconContainer.id = "icon-container";
  const icon = document.createElement("img");
  icon.id = "icon";
  const feelsLike = document.createElement("div");
  feelsLike.id = "feels-like";
  const minTemp = document.createElement("div");
  minTemp.id = "min-temp";
  const maxTemp = document.createElement("div");
  maxTemp.id = "max-temp";
  const pressure = document.createElement("h3");
  pressure.id = "pressure";
  iconContainer.appendChild(icon);
  iconContainer.appendChild(feelsLike);
  iconContainer.appendChild(minTemp);
  iconContainer.appendChild(maxTemp);
  // WeatherInfo
  const weatherInfo = document.createElement("div");
  weatherInfo.id = "weather-info";
  const weatherLocation = document.createElement("div");
  weatherLocation.id = "weather-location";
  const weatherTemp = document.createElement("div");
  weatherTemp.id = "weather-temp";
  const weatherDescription = document.createElement("div");
  weatherDescription.id = "weather-description";
  weatherInfo.appendChild(weatherLocation);
  weatherInfo.appendChild(weatherTemp);
  weatherInfo.appendChild(weatherDescription);
  // Fact(s)
  const factsContainer = document.createElement("div");
  factsContainer.id = "facts-container";
  const sunrise = document.createElement("div");
  sunrise.id = "sunrise";
  const sunset = document.createElement("div");
  sunset.id = "sunset";
  const visibility = document.createElement("div");
  visibility.id = "visibility";
  const windspeed = document.createElement("div");
  windspeed.id = "windspeed";
  const humidityAndPressure = document.createElement("div");
  humidityAndPressure.id = "humidity-and-pressure";
  factsContainer.appendChild(sunrise);
  factsContainer.appendChild(sunset);
  factsContainer.appendChild(visibility);
  factsContainer.appendChild(windspeed);
  factsContainer.appendChild(humidityAndPressure);

  weatherCard.appendChild(iconContainer);
  weatherCard.appendChild(weatherInfo);
  weatherCard.appendChild(factsContainer);

  // Forecast Card: TBD

  section.appendChild(weatherCard);
  
  // Footer: TBD

  document.body.appendChild(header);
  document.body.appendChild(section);
  document.body.appendChild(footer);

  addListeners();
}

function addListeners() {
  const search = document.getElementById("search");
  const searchButton = document.getElementById("search-button");
  searchButton.disabled = true;
  // While the value of search is 0, button remains disabled
  search.addEventListener("input", () => {
    if (search.value.length > 0) {
      searchButton.disabled = false;
      // Listen for ENTER key
      search.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          searchButton.click();
        }
      });
    } else {
      searchButton.disabled = true;
    }
  });

  searchButton.addEventListener("click", () => {
    setLocation()
    // To prevent multiple api calls
    searchButton.disabled = true;
  });
}

function setLocation() {
  const search = document.getElementById("search");
  let place = search.value;
  fetchWeather(place)
    .then((data) => {
      console.log(data);
      if (data.cod === '200') {
        // Left card
        let icon = data.list[0].weather[0].icon;
        let feelsLike = data.list[0].main.feels_like;
        let min = data.list[0].main.temp_min;
        let max = data.list[0].main.temp_max;
        let minmax = [min, max];
        // Middle card
        let location = data.city.name + ', ' + data.city.country;
        let temperature = data.list[0].main.temp; 
        let description = data.list[0].weather[0].main + ": " + data.list[0].weather[0].description;
        // Right card
        let sunrise = data.city.sunrise;
        let sunset = data.city.sunset;
        let visibility = data.list[0].visibility;
        let windspeed = data.list[0].wind.speed;
        let humidity = data.list[0].main.humidity;
        let pressure = data.list[0].main.pressure;
        let sun = [sunrise, sunset];
        let humidityAndPressure = [humidity, pressure];

        updateWeather(icon, feelsLike, minmax, location, temperature, description, sun, visibility, windspeed, humidityAndPressure);
      } else if (data.cod === "404") {
        alert("Place not found. Please try again.");
      }
    })
    .catch((error) => {
      console.log("Error in setting location: " + error);
    });
}

async function fetchWeather(place) {
  try {
    let weather = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${OW_API_KEY}&units=metric`
    );
    let data = await weather.json();
    return data;
  } catch (error) {
    console.log("Error in fetching weather" + error);
  }
}

async function fetchWeatherIcon(code) {
  try {
    let icon = await fetch(`http://openweathermap.org/img/w/${code}.png`);
    return icon;
  } catch (error) {
    console.log("Error in fetching icon" + error);
  }
}

function updateWeather(icon, feelslike, minmax, location, temperature, description, sun, visibility, windspeed, humidityAndPressure){
  // Update ICON
  const iconContainer = document.getElementById("icon-container");
  document.getElementById("icon").src = `http://openweathermap.org/img/w/${icon}.png`;
  document.getElementById("feels-like").innerText = `Feels like: ${feelslike} °C / ${(feelslike * 9/5 + 32).toFixed(2)} °F`;
  document.getElementById("min-temp").innerText = `Min: ${minmax[0]} °C / ${(minmax[0] * 9/5 + 32).toFixed(2)} °F`;
  document.getElementById("max-temp").innerText = `Max: ${minmax[1]} °C / ${(minmax[1] * 9/5 + 32).toFixed(2)} °F`;
  
  // Update weather info
  const weatherInfo = document.getElementById("weather-info");
  // Update weather info colour
  // Set the background colour (+gradient) of weatherInfo based on temperature value
  // Optimal human temperature: 26-28 C
  // BUG WITH NEGATIVE TEMPERATURES
  if (Math.floor(temperature) < 26) {
    weatherInfo.style.background = `linear-gradient(rgba(0, 0, 255, ${temperature/26}), rgba(0, 0, 255, ${temperature/26}))`;
  } else if (Math.floor(temperature) > 28) {
    weatherInfo.style.background = `linear-gradient(rgba(255, 0, 0, ${temperature/28}), rgba(255, 0, 0, ${temperature/28}))`;
  } else {
    weatherInfo.style.background = `linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))`;
    weatherInfo.style.color = `rgba(0, 0, 0, 1)`;
  }
  // Update location, temp, description
  document.getElementById("weather-location").innerText = location;
  document.getElementById("weather-temp").innerText = temperature + " °C / " + (temperature * 9/5 + 32).toFixed(2) + " °F";
  document.getElementById("weather-description").innerText = description;
  // Update facts
  const factsContainer = document.getElementById("facts-container");
  document.getElementById("sunrise").innerText = `Sunrise: ${new Date(sun[0] * 1000).toLocaleTimeString()} EST`;
  document.getElementById("sunset").innerText = `Sunset: ${new Date(sun[1] * 1000).toLocaleTimeString()} EST`;
  document.getElementById("windspeed").innerText = `Windspeed: ${windspeed} m/s`;
  document.getElementById("visibility").innerText = `Visibility: ${visibility} m`;
  document.getElementById("humidity-and-pressure").innerText = `Humidity: ${humidityAndPressure[0]} %, Pressure: ${humidityAndPressure[1]} hPa`;
  // IDEA: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://source.unsplash.com/1600x900/?${location}")`;
  // TBD
  // IDEA 2: Add more information in another card relating to humidity, pressure, windspeed, sunrise, sunset, etc
  iconContainer.style.display = "flex";
  weatherInfo.style.display = "flex";
  factsContainer.style.display = "flex";
}

// IDEA: Instead of image, we will change background colour based on temperature
async function fetchImage(query) {
  try {
    let images = await client.photos.search({
      query,
      orientation: "landscape",
    });
    return images;
  } catch (error) {
    console.log(error);
  }
}

function setImage(response) {
  let image = response.photos[0].src.medium;
  document.body.style.backgroundImage = `url(${image})`;
}

createLayout();