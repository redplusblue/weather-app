(self["webpackChunkweather_app"] = self["webpackChunkweather_app"] || []).push([["main"],{

/***/ "./src/async.js":
/*!**********************!*\
  !*** ./src/async.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchCountryName": () => (/* binding */ fetchCountryName),
/* harmony export */   "fetchForecast": () => (/* binding */ fetchForecast),
/* harmony export */   "fetchWeather": () => (/* binding */ fetchWeather),
/* harmony export */   "fetchWeatherBackground": () => (/* binding */ fetchWeatherBackground),
/* harmony export */   "fetchWeatherIcon": () => (/* binding */ fetchWeatherIcon)
/* harmony export */ });
/* harmony import */ var _secrets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./secrets */ "./src/secrets.js");
/* harmony import */ var _secrets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_secrets__WEBPACK_IMPORTED_MODULE_0__);

const OW_API_KEY = (_secrets__WEBPACK_IMPORTED_MODULE_0___default().OPENWEATHER);
async function fetchWeather(place) {
  // If number of params is 2, then it is lat and lon
  if (arguments.length === 2) {
    try {
      let weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${arguments[0]}&lon=${arguments[1]}&appid=${OW_API_KEY}&units=metric`);
      let data = await weather.json();
      return data;
    } catch (error) {
      console.log("Error in fetching weather " + error);
    }
  } else if (arguments.length === 1) {
    try {
      let weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${OW_API_KEY}&units=metric`);
      let data = await weather.json();
      return data;
    } catch (error) {
      console.log("Error in fetching weather " + error);
    }
  }
}
async function fetchForecast(place) {
  if (arguments.length === 2) {
    try {
      let forecast = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${arguments[0]}&lon=${arguments[1]}&appid=${OW_API_KEY}&units=metric`);
      let data = await forecast.json();
      return data;
    } catch (error) {
      console.log("Error in fetching forecast " + error);
    }
  } else if (arguments.length === 1) {
    try {
      let forecast = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${OW_API_KEY}&units=metric`);
      let data = await forecast.json();
      return data;
    } catch (error) {
      console.log("Error in fetching forecast " + error);
    }
  }
}
async function fetchWeatherIcon(code) {
  try {
    let icon = await fetch(`http://openweathermap.org/img/w/${code}.png`);
    return icon;
  } catch (error) {
    console.log("Error in fetching icon " + error);
  }
}

// IDEA: Fetch country flag

async function fetchCountryName(code) {
  try {
    let country = await fetch(`https://api.worldbank.org/v2/country/${code}?format=json`);
    let data = await country.json();
    return data[1][0].name;
  } catch (error) {
    console.log("Error in fetching country name " + error);
  }
}
async function fetchWeatherBackground(place) {
  try {
    let background = await fetch(`https://source.unsplash.com/1600x450/?Monuments,Tourism,Places,${place}`);
    return background;
  } catch (error) {
    console.log("Error in fetching background " + error);
  }
}

/***/ }),

/***/ "./src/content.js":
/*!************************!*\
  !*** ./src/content.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setLocation": () => (/* binding */ setLocation)
/* harmony export */ });
/* harmony import */ var _async_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./async.js */ "./src/async.js");

function setLocation(type) {
  const search = document.getElementById("search");
  let place = search.value;
  if (type === "search") {
    (0,_async_js__WEBPACK_IMPORTED_MODULE_0__.fetchWeather)(place).then(data => {
      // console.log(data);
      if (data.cod === 200) {
        // Left card
        let icon = data.weather[0].icon;
        let feelsLike = data.main.feels_like;
        let min = data.main.temp_min;
        let max = data.main.temp_max;
        let minmax = [min, max];
        // Middle card
        let location = [data.name, data.sys.country];
        let temperature = data.main.temp;
        let description = data.weather[0].main + ": " + data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
        // Right card
        let sunrise = data.sys.sunrise;
        let sunset = data.sys.sunset;
        let visibility = data.visibility;
        let windspeed = data.wind.speed;
        let humidity = data.main.humidity;
        let pressure = data.main.pressure;
        let sun = [sunrise, sunset];
        let humidityAndPressure = [humidity, pressure];
        updateWeather(icon, feelsLike, minmax, location, temperature, description, sun, visibility, windspeed, humidityAndPressure);
      } else if (data.cod === 404) {
        alert("Place not found. Please try again.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }).catch(error => {
      console.log("Error in setting location for weather: " + error);
    });
    // Fetch forecast
    (0,_async_js__WEBPACK_IMPORTED_MODULE_0__.fetchForecast)(place).then(data => {
      // console.log(data);
      if (data.cod === "200") {
        let forecast = [];
        for (let i = 0; i < 40; i += 3) {
          forecast.push(data.list[i]);
        }
        updateForecast(forecast);
      } else if (data.cod === "404") {
        alert("Place not found. Please try again.");
      } else {
        alert("Something went wrong. Please try again.");
      }
    }).catch(error => {
      console.log("Error in setting location for forecast: " + error);
    });
  } else if (type === "current") {
    try {
      navigator.geolocation.getCurrentPosition(position => {
        const {
          latitude,
          longitude
        } = position.coords;
        (0,_async_js__WEBPACK_IMPORTED_MODULE_0__.fetchWeather)(latitude, longitude).then(data => {
          // console.log(data);
          if (data.cod === 200) {
            // Left card
            let icon = data.weather[0].icon;
            let feelsLike = data.main.feels_like;
            let min = data.main.temp_min;
            let max = data.main.temp_max;
            let minmax = [min, max];
            // Middle card
            let location = [data.name, data.sys.country];
            let temperature = data.main.temp;
            let description = data.weather[0].main + ": " + data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
            // Right card
            let sunrise = data.sys.sunrise;
            let sunset = data.sys.sunset;
            let visibility = data.visibility;
            let windspeed = data.wind.speed;
            let humidity = data.main.humidity;
            let pressure = data.main.pressure;
            let sun = [sunrise, sunset];
            let humidityAndPressure = [humidity, pressure];
            updateWeather(icon, feelsLike, minmax, location, temperature, description, sun, visibility, windspeed, humidityAndPressure);
          } else if (data.cod === 404) {
            alert("Place not found. Please try again.");
          } else {
            alert("Something went wrong. Please try again.");
          }
        }).catch(error => {
          console.log("Error in setting location for weather: " + error);
        });
        // Fetch forecast
        (0,_async_js__WEBPACK_IMPORTED_MODULE_0__.fetchForecast)(latitude, longitude).then(data => {
          // console.log(data);
          if (data.cod === "200") {
            let forecast = [];
            for (let i = 0; i < 40; i += 3) {
              forecast.push(data.list[i]);
            }
            updateForecast(forecast);
          } else if (data.cod === "404") {
            alert("Place not found. Please try again.");
          } else {
            alert("Something went wrong. Please try again.");
          }
        }).catch(error => {
          console.log("Error in setting location for forecast: ");
        });
      });
    } catch (error) {
      alert("Please allow location access to use this feature.");
    }
    ;
  } else {
    alert("Something went wrong. Please try again.");
  }
}
function updateWeather(icon, feelslike, minmax, location, temperature, description, sun, visibility, windspeed, humidityAndPressure) {
  // Update ICON
  const iconContainer = document.getElementById("icon-container");
  (0,_async_js__WEBPACK_IMPORTED_MODULE_0__.fetchWeatherIcon)(icon).then(data => {
    document.getElementById("icon").src = data.url;
  });
  document.getElementById("feels-like").innerText = `Feels like: ${feelslike} °C / ${(feelslike * 9 / 5 + 32).toFixed(2)} °F`;
  document.getElementById("min-temp").innerText = `Min: ${minmax[0]} °C / ${(minmax[0] * 9 / 5 + 32).toFixed(2)} °F`;
  document.getElementById("max-temp").innerText = `Max: ${minmax[1]} °C / ${(minmax[1] * 9 / 5 + 32).toFixed(2)} °F`;

  // Update weather info
  const weatherInfo = document.getElementById("weather-info");
  // Update weather info colour
  // Optimal human temperature: 26-28 C
  if (Math.floor(temperature) < 26) {
    weatherInfo.style.background = `linear-gradient(357deg, rgba(0,212,255,1) 0%, rgba(0,0,36,1) 100%)`;
  } else if (Math.floor(temperature) > 28) {
    weatherInfo.style.background = `linear-gradient(357deg, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)`;
  } else {
    weatherInfo.style.background = `radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)`;
    weatherInfo.style.color = `rgba(0, 0, 0, 1)`;
    document.getElementById("additional-info").innerText = "Optimal temperature!";
  }
  // Update location, temp, description
  (0,_async_js__WEBPACK_IMPORTED_MODULE_0__.fetchCountryName)(location[1]).then(name => {
    document.getElementById("weather-location").innerText = `${location[0]}, ${name}`;
  });
  document.getElementById("weather-temp").innerText = temperature + " °C / " + (temperature * 9 / 5 + 32).toFixed(2) + " °F";
  document.getElementById("weather-description").innerText = description;
  // Update facts
  const factsContainer = document.getElementById("facts-container");
  document.getElementById("sunrise").innerText = `Sunrise: ${new Date(sun[0] * 1000).toLocaleTimeString()} EST`;
  document.getElementById("sunset").innerText = `Sunset: ${new Date(sun[1] * 1000).toLocaleTimeString()} EST`;
  document.getElementById("windspeed").innerText = `Windspeed: ${windspeed} m/s`;
  document.getElementById("visibility").innerText = `Visibility: ${visibility} m`;
  document.getElementById("humidity-and-pressure").innerText = `Humidity: ${humidityAndPressure[0]} %, Pressure: ${humidityAndPressure[1]} hPa`;
  iconContainer.style.display = "flex";
  weatherInfo.style.display = "flex";
  factsContainer.style.display = "flex";
  // Add a background image based on location
  (0,_async_js__WEBPACK_IMPORTED_MODULE_0__.fetchWeatherBackground)(description).then(response => {
    console.log(response);
    // Get section element
    document.getElementById("section").style.backgroundImage = `url(${response.url})`;
    document.getElementById("image-credits").innerHTML = `From: <a href="${response.url}">Unsplash</a>`;
  });
}
function updateForecast(forecasts) {
  // Update forecast
  document.querySelectorAll(".forecast").forEach((forecast, index) => {
    // Update forecast icon
    (0,_async_js__WEBPACK_IMPORTED_MODULE_0__.fetchWeatherIcon)(forecasts[index].weather[0].icon).then(data => {
      forecast.querySelector(".forecast-icon").src = data.url;
    });
    // Update forecast temperature
    forecast.querySelector(".forecast-temp").innerText = `${forecasts[index].main.temp} °C / ${(forecasts[index].main.temp * 9 / 5 + 32).toFixed(2)} °F`;
    // Update forecast description
    forecast.querySelector(".forecast-description").innerText = forecasts[index].weather[0].description;
    // Update forecast date and time
    forecast.querySelector(".forecast-date").innerText = new Date(forecasts[index].dt * 1000).toLocaleDateString() + " " + new Date(forecasts[index].dt * 1000).toLocaleTimeString();
    forecast.style.display = "flex";
  });
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _content__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./content */ "./src/content.js");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layout */ "./src/layout.js");


(0,_layout__WEBPACK_IMPORTED_MODULE_1__.createLayout)();
// setLocation("current")

/***/ }),

/***/ "./src/layout.js":
/*!***********************!*\
  !*** ./src/layout.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createLayout": () => (/* binding */ createLayout)
/* harmony export */ });
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _content_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./content.js */ "./src/content.js");
// Import setlocation function


function createLayout() {
  const header = document.createElement("header");
  header.id = "header";
  const section = document.createElement("section");
  section.id = "section";
  const footer = document.createElement("footer");
  footer.id = "footer";

  // Header
  const title = document.createElement("div");
  title.innerText = "The-Weather-App";
  title.id = "title";
  const searchContainer = document.createElement("div");
  searchContainer.id = "search-container";
  const search = document.createElement("input");
  search.id = "search";
  search.placeholder = "🔎 Search...";
  const buttonContainer = document.createElement("div");
  buttonContainer.id = "button-container";
  const searchButton = document.createElement("button");
  searchButton.id = "search-button";
  const currentLocationButton = document.createElement("button");
  currentLocationButton.id = "current-location-button";

  // Section
  const weatherCard = document.createElement("div");
  weatherCard.id = "weather-card";
  const forecastCard = document.createElement("div");

  // Header: Title
  header.appendChild(title);
  // Header: Search Bar
  searchButton.innerText = "Search";
  currentLocationButton.innerText = "Current Location";
  buttonContainer.appendChild(searchButton);
  buttonContainer.appendChild(currentLocationButton);
  searchContainer.appendChild(search);
  searchContainer.appendChild(buttonContainer);
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
  const additionalInfo = document.createElement("div");
  additionalInfo.id = "additional-info";
  weatherInfo.appendChild(weatherLocation);
  weatherInfo.appendChild(weatherTemp);
  weatherInfo.appendChild(weatherDescription);
  weatherInfo.appendChild(additionalInfo);
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

  // Forecast card contents: 8x cards with [Icon, temperature, description, date and time]
  forecastCard.id = "forecast-card";
  for (let i = 1; i < 9; i++) {
    const forecast = document.createElement("div");
    forecast.id = `forecast-${i}`;
    forecast.className = "forecast";
    const forecastIcon = document.createElement("img");
    forecastIcon.id = `forecast-icon-${i}`;
    forecastIcon.className = "forecast-icon";
    const forecastTemp = document.createElement("div");
    forecastTemp.id = `forecast-temp-${i}`;
    forecastTemp.className = "forecast-temp";
    const forecastDescription = document.createElement("div");
    forecastDescription.id = `forecast-description-${i}`;
    forecastDescription.className = "forecast-description";
    const forecastDate = document.createElement("div");
    forecastDate.id = `forecast-date-${i}`;
    forecastDate.className = "forecast-date";
    forecast.appendChild(forecastIcon);
    forecast.appendChild(forecastTemp);
    forecast.appendChild(forecastDescription);
    forecast.appendChild(forecastDate);
    forecastCard.appendChild(forecast);
  }
  section.appendChild(weatherCard);
  section.appendChild(forecastCard);
  // Footer
  footer.id = "footer";
  const credits = document.createElement("div");
  credits.id = "credits";
  const purple = document.createElement("div");
  purple.id = "purple";
  const info = document.createElement("div");
  info.id = "info";
  footer.appendChild(credits);
  footer.appendChild(purple);
  footer.appendChild(info);

  // Footer content
  credits.innerHTML = "<p> Weather data provided by <a href='https://openweathermap.org/'>OpenWeatherMap</a></p>" + "<p> Fonts & Images provided by <a href='https://adobe.com'>Adobe</a>" + " And <a href='https://www.unsplash.com'>Unsplash</a>";
  purple.innerHTML = "<div> red + blue = </div><a href='https://www.github.com/redplusblue'><div id='github-image'></div></a>";
  info.innerHTML = "<p> <a href='https://github.com/redplusblue/weather-app/tree/main/src'>Source code</a></p>" + '<p id="info-btn"><img src="data/info.svg"/> Usage Info';
  document.body.appendChild(header);
  document.body.appendChild(section);
  document.body.appendChild(footer);
  addListeners();
}
function addListeners() {
  const search = document.getElementById("search");
  const searchButton = document.getElementById("search-button");
  const currentLocationButton = document.getElementById("current-location-button");
  searchButton.disabled = true;
  // While the value of search is 0, button remains disabled
  search.addEventListener("input", () => {
    if (search.value.length > 0) {
      searchButton.disabled = false;
      // Listen for ENTER key
      search.addEventListener("keydown", event => {
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
    (0,_content_js__WEBPACK_IMPORTED_MODULE_1__.setLocation)("search");
    // To prevent multiple api calls
    searchButton.disabled = true;
    currentLocationButton.disabled = false;
    showCredits();
  });
  currentLocationButton.addEventListener("click", () => {
    (0,_content_js__WEBPACK_IMPORTED_MODULE_1__.setLocation)("current");
    // Empty search bar
    search.value = "";
    searchButton.disabled = false;
    currentLocationButton.disabled = true;
    showCredits();
  });
}
function showCredits() {
  const credits = document.getElementById("credits");
  const purple = document.getElementById("purple");
  const info = document.getElementById("info");
}

/***/ }),

/***/ "./src/secrets.js":
/*!************************!*\
  !*** ./src/secrets.js ***!
  \************************/
/***/ ((module) => {

// API Keys for Open Weather API (Free for all)
const secrets = {
  OPENWEATHER: ""
};
module.exports = secrets;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! data/Cheap Pine Regular.ttf */ "./src/data/Cheap Pine Regular.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! data/Elza Regular.ttf */ "./src/data/Elza Regular.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! data/weather.svg */ "./src/data/weather.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! data/github.svg */ "./src/data/github.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: \"Cheap Pine\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n\n@font-face {\n  font-family: \"Elza Regular\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n}\n\n:root {\n  --box-shadow: 0px 4px 6px 0px rgba(50, 50, 93, 0.11),\n    0px 1px 3px 0px rgba(0, 0, 0, 0.08);\n  --purple: #9147ff;\n  --light-black: rgba(0, 0, 0, 0.6);\n}\n\nhtml,\nbody {\n  height: 100%;\n  margin: 0;\n}\n\nbody {\n  display: grid;\n  grid-template-rows: 25% auto min(auto, 10%);\n  gap: 0px;\n}\n\nheader,\nsection {\n  background-color: #fff;\n  box-shadow: var(--box-shadow);\n  margin: 5px;\n  border-radius: 10px;\n}\n\nheader {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  background-size: cover;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n\n#title {\n  font-size: 5rem;\n  font-family: \"Cheap Pine\", cursive;\n  cursor: default;\n}\n\n#search-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n}\n\n#search {\n  font-size: 13px;\n  font-family: \"Courier New\", Courier, monospace;\n  padding-left: 5px;\n  width: 20vw;\n  border-radius: 10px;\n  line-height: 1.5;\n  transition: box-shadow 100ms ease-in, border 100ms ease-in,\n    background-color 100ms ease-in;\n  border: 2px solid #dee1e2;\n  color: rgb(14, 14, 16);\n  background: #dee1e2;\n  opacity: 90%;\n}\n\n#search:hover {\n  border-color: #ccc;\n}\n#search:focus {\n  outline: none;\n  border-color: var(--purple);\n  background: #fff;\n  opacity: 100%;\n}\n\n#search::placeholder {\n  color: #ccc;\n  font-weight: 900;\n}\n\n#button-container {\n  display: flex;\n  flex-direction: row;\n  gap: 10px;\n}\n\n#search-button,\n#current-location-button {\n  display: inline-block;\n  outline: 0;\n  border: none;\n  cursor: pointer;\n  font-weight: 600;\n  border-radius: 10px;\n  font-size: 13px;\n  height: 30px;\n  width: 10vw;\n  background-color: var(--purple);\n  color: white;\n  padding: 0 10px;\n  opacity: 90%;\n}\n\n#search-button:hover,\n#current-location-button:hover {\n  background-color: var(--purple);\n  opacity: 100%;\n}\n\n#search-button:disabled,\n#current-location-button:disabled {\n  background-color: #ccc;\n  cursor: not-allowed;\n}\n\nsection {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-size: cover;\n  padding: 15px;\n  gap: 10px;\n}\n\n#weather-card {\n  width: 90%;\n  display: grid;\n  grid-template-columns: auto auto auto;\n  gap: 10px;\n  height: fit-content;\n  min-width: max-content;\n}\n\n#weather-info,\n#icon-container,\n#facts-container {\n  display: none;\n  flex-direction: column;\n  justify-content: center;\n  gap: 5px;\n  align-items: center;\n  border-radius: 10px;\n  margin: 5px;\n  padding: 15px;\n  font-family: \"Elza Regular\", cursive;\n  color: rgba(255, 255, 255, 0.85);\n  box-shadow: var(--box-shadow);\n  text-align: center;\n  font-size: 1.2rem;\n  opacity: 85%;\n}\n\n#weather-info:hover {\n  opacity: 100%;\n}\n\n#icon-container,\n#facts-container {\n  background-color: var(--light-black);\n}\n\n#icon-container:hover,\n#facts-container:hover,\n#forecast-card > div:hover {\n  background-color: rgba(0, 0, 0, 0.7);\n  opacity: 100%;\n}\n\n#weather-location,\n#weather-temp {\n  font-weight: 700;\n  font-size: 2rem;\n}\n\n#additional-info {\n  font-size: 1rem;\n}\n\n#forecast-card {\n  width: 90%;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 10px;\n  height: fit-content;\n  min-width: max-content;\n}\n\n#forecast-card > div {\n  display: none;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border-radius: 10px;\n  margin: 5px;\n  padding: 15px;\n  font-family: \"Elza Regular\", cursive;\n  color: rgba(255, 255, 255, 0.85);\n  background-color: var(--light-black);\n  box-shadow: var(--box-shadow);\n  text-align: center;\n  font-size: 1rem;\n  opacity: 85%;\n}\n\n#forecast-card > div > img {\n  width: 50px;\n  height: 50px;\n}\n\n.forecast-temp {\n  font-weight: 700;\n  font-size: 1rem;\n}\n\nfooter {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  align-items: center;\n  gap: 10px;\n  font-family: \"Elza Regular\", cursive;\n  box-shadow: var(--box-shadow);\n  text-align: center;\n  border-radius: 10px;\n  margin: 5px;\n  padding: 15px;\n}\n\n#purple{\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: row;\n  gap: 5px;\n}\n\n#github-image{\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n  background-size: cover;\n  width: 25px;\n  height: 25px;\n}\n\n@media screen and (max-width: 768px) {\n  body {\n    display: none;\n  }\n}\n\n@media screen and (max-height: 660px) {\n  body {\n    display: none;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["@font-face {\n  font-family: \"Cheap Pine\";\n  src: url(data/Cheap\\ Pine\\ Regular.ttf);\n}\n\n@font-face {\n  font-family: \"Elza Regular\";\n  src: url(data/Elza\\ Regular.ttf);\n}\n\n:root {\n  --box-shadow: 0px 4px 6px 0px rgba(50, 50, 93, 0.11),\n    0px 1px 3px 0px rgba(0, 0, 0, 0.08);\n  --purple: #9147ff;\n  --light-black: rgba(0, 0, 0, 0.6);\n}\n\nhtml,\nbody {\n  height: 100%;\n  margin: 0;\n}\n\nbody {\n  display: grid;\n  grid-template-rows: 25% auto min(auto, 10%);\n  gap: 0px;\n}\n\nheader,\nsection {\n  background-color: #fff;\n  box-shadow: var(--box-shadow);\n  margin: 5px;\n  border-radius: 10px;\n}\n\nheader {\n  background-image: url(data/weather.svg);\n  background-size: cover;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n\n#title {\n  font-size: 5rem;\n  font-family: \"Cheap Pine\", cursive;\n  cursor: default;\n}\n\n#search-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n}\n\n#search {\n  font-size: 13px;\n  font-family: \"Courier New\", Courier, monospace;\n  padding-left: 5px;\n  width: 20vw;\n  border-radius: 10px;\n  line-height: 1.5;\n  transition: box-shadow 100ms ease-in, border 100ms ease-in,\n    background-color 100ms ease-in;\n  border: 2px solid #dee1e2;\n  color: rgb(14, 14, 16);\n  background: #dee1e2;\n  opacity: 90%;\n}\n\n#search:hover {\n  border-color: #ccc;\n}\n#search:focus {\n  outline: none;\n  border-color: var(--purple);\n  background: #fff;\n  opacity: 100%;\n}\n\n#search::placeholder {\n  color: #ccc;\n  font-weight: 900;\n}\n\n#button-container {\n  display: flex;\n  flex-direction: row;\n  gap: 10px;\n}\n\n#search-button,\n#current-location-button {\n  display: inline-block;\n  outline: 0;\n  border: none;\n  cursor: pointer;\n  font-weight: 600;\n  border-radius: 10px;\n  font-size: 13px;\n  height: 30px;\n  width: 10vw;\n  background-color: var(--purple);\n  color: white;\n  padding: 0 10px;\n  opacity: 90%;\n}\n\n#search-button:hover,\n#current-location-button:hover {\n  background-color: var(--purple);\n  opacity: 100%;\n}\n\n#search-button:disabled,\n#current-location-button:disabled {\n  background-color: #ccc;\n  cursor: not-allowed;\n}\n\nsection {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-size: cover;\n  padding: 15px;\n  gap: 10px;\n}\n\n#weather-card {\n  width: 90%;\n  display: grid;\n  grid-template-columns: auto auto auto;\n  gap: 10px;\n  height: fit-content;\n  min-width: max-content;\n}\n\n#weather-info,\n#icon-container,\n#facts-container {\n  display: none;\n  flex-direction: column;\n  justify-content: center;\n  gap: 5px;\n  align-items: center;\n  border-radius: 10px;\n  margin: 5px;\n  padding: 15px;\n  font-family: \"Elza Regular\", cursive;\n  color: rgba(255, 255, 255, 0.85);\n  box-shadow: var(--box-shadow);\n  text-align: center;\n  font-size: 1.2rem;\n  opacity: 85%;\n}\n\n#weather-info:hover {\n  opacity: 100%;\n}\n\n#icon-container,\n#facts-container {\n  background-color: var(--light-black);\n}\n\n#icon-container:hover,\n#facts-container:hover,\n#forecast-card > div:hover {\n  background-color: rgba(0, 0, 0, 0.7);\n  opacity: 100%;\n}\n\n#weather-location,\n#weather-temp {\n  font-weight: 700;\n  font-size: 2rem;\n}\n\n#additional-info {\n  font-size: 1rem;\n}\n\n#forecast-card {\n  width: 90%;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 10px;\n  height: fit-content;\n  min-width: max-content;\n}\n\n#forecast-card > div {\n  display: none;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border-radius: 10px;\n  margin: 5px;\n  padding: 15px;\n  font-family: \"Elza Regular\", cursive;\n  color: rgba(255, 255, 255, 0.85);\n  background-color: var(--light-black);\n  box-shadow: var(--box-shadow);\n  text-align: center;\n  font-size: 1rem;\n  opacity: 85%;\n}\n\n#forecast-card > div > img {\n  width: 50px;\n  height: 50px;\n}\n\n.forecast-temp {\n  font-weight: 700;\n  font-size: 1rem;\n}\n\nfooter {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  align-items: center;\n  gap: 10px;\n  font-family: \"Elza Regular\", cursive;\n  box-shadow: var(--box-shadow);\n  text-align: center;\n  border-radius: 10px;\n  margin: 5px;\n  padding: 15px;\n}\n\n#purple{\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: row;\n  gap: 5px;\n}\n\n#github-image{\n  background-image: url(data/github.svg);\n  background-size: cover;\n  width: 25px;\n  height: 25px;\n}\n\n@media screen and (max-width: 768px) {\n  body {\n    display: none;\n  }\n}\n\n@media screen and (max-height: 660px) {\n  body {\n    display: none;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/data/Cheap Pine Regular.ttf":
/*!*****************************************!*\
  !*** ./src/data/Cheap Pine Regular.ttf ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "9531813ac8a84e7c5d76.ttf";

/***/ }),

/***/ "./src/data/Elza Regular.ttf":
/*!***********************************!*\
  !*** ./src/data/Elza Regular.ttf ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "91f80bc3fca1bbda0830.ttf";

/***/ }),

/***/ "./src/data/github.svg":
/*!*****************************!*\
  !*** ./src/data/github.svg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "d9f497792350bcf61ed6.svg";

/***/ }),

/***/ "./src/data/weather.svg":
/*!******************************!*\
  !*** ./src/data/weather.svg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "40b6549583bdefe45455.svg";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7QUFFQSxxQkFBcUIsNkJBQTZCO0FBQ2xEOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN2R2E7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0RBQXNEOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ3RDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUNWYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7O0FBRWpGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ1hhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEQUFrRDtBQUNsRDs7QUFFQTtBQUNBLDBDQUEwQztBQUMxQzs7QUFFQTs7QUFFQTtBQUNBLGlGQUFpRjtBQUNqRjs7QUFFQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RCxJQUFJOztBQUVKOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hc3luYy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb250ZW50LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2xheW91dC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zZWNyZXRzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc2VjcmV0cyBmcm9tIFwiLi9zZWNyZXRzXCI7XG5cbmNvbnN0IE9XX0FQSV9LRVkgPSBzZWNyZXRzW1wiT1BFTldFQVRIRVJcIl07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaFdlYXRoZXIocGxhY2UpIHtcbiAgLy8gSWYgbnVtYmVyIG9mIHBhcmFtcyBpcyAyLCB0aGVuIGl0IGlzIGxhdCBhbmQgbG9uXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCB3ZWF0aGVyID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP2xhdD0ke2FyZ3VtZW50c1swXX0mbG9uPSR7YXJndW1lbnRzWzFdfSZhcHBpZD0ke09XX0FQSV9LRVl9JnVuaXRzPW1ldHJpY2BcbiAgICAgICk7XG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IHdlYXRoZXIuanNvbigpO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gZmV0Y2hpbmcgd2VhdGhlciBcIiArIGVycm9yKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgd2VhdGhlciA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7cGxhY2V9JmFwcGlkPSR7T1dfQVBJX0tFWX0mdW5pdHM9bWV0cmljYFxuICAgICAgKTtcbiAgICAgIGxldCBkYXRhID0gYXdhaXQgd2VhdGhlci5qc29uKCk7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coXCJFcnJvciBpbiBmZXRjaGluZyB3ZWF0aGVyIFwiICsgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hGb3JlY2FzdChwbGFjZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZm9yZWNhc3QgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P2xhdD0ke2FyZ3VtZW50c1swXX0mbG9uPSR7YXJndW1lbnRzWzFdfSZhcHBpZD0ke09XX0FQSV9LRVl9JnVuaXRzPW1ldHJpY2BcbiAgICAgICk7XG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IGZvcmVjYXN0Lmpzb24oKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGluIGZldGNoaW5nIGZvcmVjYXN0IFwiICsgZXJyb3IpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBmb3JlY2FzdCA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/cT0ke3BsYWNlfSZhcHBpZD0ke09XX0FQSV9LRVl9JnVuaXRzPW1ldHJpY2BcbiAgICAgICk7XG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IGZvcmVjYXN0Lmpzb24oKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGluIGZldGNoaW5nIGZvcmVjYXN0IFwiICsgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hXZWF0aGVySWNvbihjb2RlKSB7XG4gIHRyeSB7XG4gICAgbGV0IGljb24gPSBhd2FpdCBmZXRjaChgaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvdy8ke2NvZGV9LnBuZ2ApO1xuICAgIHJldHVybiBpY29uO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gZmV0Y2hpbmcgaWNvbiBcIiArIGVycm9yKTtcbiAgfVxufVxuXG4vLyBJREVBOiBGZXRjaCBjb3VudHJ5IGZsYWdcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoQ291bnRyeU5hbWUoY29kZSkge1xuICB0cnkge1xuICAgIGxldCBjb3VudHJ5ID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9hcGkud29ybGRiYW5rLm9yZy92Mi9jb3VudHJ5LyR7Y29kZX0/Zm9ybWF0PWpzb25gXG4gICAgKTtcbiAgICBsZXQgZGF0YSA9IGF3YWl0IGNvdW50cnkuanNvbigpO1xuICAgIHJldHVybiBkYXRhWzFdWzBdLm5hbWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coXCJFcnJvciBpbiBmZXRjaGluZyBjb3VudHJ5IG5hbWUgXCIgKyBlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoV2VhdGhlckJhY2tncm91bmQocGxhY2UpIHtcbiAgdHJ5IHtcbiAgICBsZXQgYmFja2dyb3VuZCA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vc291cmNlLnVuc3BsYXNoLmNvbS8xNjAweDQ1MC8/TW9udW1lbnRzLFRvdXJpc20sUGxhY2VzLCR7cGxhY2V9YFxuICAgICk7XG4gICAgcmV0dXJuIGJhY2tncm91bmQ7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coXCJFcnJvciBpbiBmZXRjaGluZyBiYWNrZ3JvdW5kIFwiICsgZXJyb3IpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBmZXRjaFdlYXRoZXIsXG4gIGZldGNoV2VhdGhlckljb24sXG4gIGZldGNoV2VhdGhlckJhY2tncm91bmQsXG4gIGZldGNoQ291bnRyeU5hbWUsXG4gIGZldGNoRm9yZWNhc3QsXG59IGZyb20gXCIuL2FzeW5jLmpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRMb2NhdGlvbih0eXBlKSB7XG4gIGNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoXCIpO1xuICBsZXQgcGxhY2UgPSBzZWFyY2gudmFsdWU7XG4gIGlmICh0eXBlID09PSBcInNlYXJjaFwiKSB7XG4gICAgZmV0Y2hXZWF0aGVyKHBsYWNlKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIGlmIChkYXRhLmNvZCA9PT0gMjAwKSB7XG4gICAgICAgICAgLy8gTGVmdCBjYXJkXG4gICAgICAgICAgbGV0IGljb24gPSBkYXRhLndlYXRoZXJbMF0uaWNvbjtcbiAgICAgICAgICBsZXQgZmVlbHNMaWtlID0gZGF0YS5tYWluLmZlZWxzX2xpa2U7XG4gICAgICAgICAgbGV0IG1pbiA9IGRhdGEubWFpbi50ZW1wX21pbjtcbiAgICAgICAgICBsZXQgbWF4ID0gZGF0YS5tYWluLnRlbXBfbWF4O1xuICAgICAgICAgIGxldCBtaW5tYXggPSBbbWluLCBtYXhdO1xuICAgICAgICAgIC8vIE1pZGRsZSBjYXJkXG4gICAgICAgICAgbGV0IGxvY2F0aW9uID0gW2RhdGEubmFtZSwgZGF0YS5zeXMuY291bnRyeV07XG4gICAgICAgICAgbGV0IHRlbXBlcmF0dXJlID0gZGF0YS5tYWluLnRlbXA7XG4gICAgICAgICAgbGV0IGRlc2NyaXB0aW9uID1cbiAgICAgICAgICAgIGRhdGEud2VhdGhlclswXS5tYWluICtcbiAgICAgICAgICAgIFwiOiBcIiArXG4gICAgICAgICAgICBkYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb24uY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgK1xuICAgICAgICAgICAgZGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLnNsaWNlKDEpO1xuICAgICAgICAgIC8vIFJpZ2h0IGNhcmRcbiAgICAgICAgICBsZXQgc3VucmlzZSA9IGRhdGEuc3lzLnN1bnJpc2U7XG4gICAgICAgICAgbGV0IHN1bnNldCA9IGRhdGEuc3lzLnN1bnNldDtcbiAgICAgICAgICBsZXQgdmlzaWJpbGl0eSA9IGRhdGEudmlzaWJpbGl0eTtcbiAgICAgICAgICBsZXQgd2luZHNwZWVkID0gZGF0YS53aW5kLnNwZWVkO1xuICAgICAgICAgIGxldCBodW1pZGl0eSA9IGRhdGEubWFpbi5odW1pZGl0eTtcbiAgICAgICAgICBsZXQgcHJlc3N1cmUgPSBkYXRhLm1haW4ucHJlc3N1cmU7XG4gICAgICAgICAgbGV0IHN1biA9IFtzdW5yaXNlLCBzdW5zZXRdO1xuICAgICAgICAgIGxldCBodW1pZGl0eUFuZFByZXNzdXJlID0gW2h1bWlkaXR5LCBwcmVzc3VyZV07XG4gICAgICAgICAgdXBkYXRlV2VhdGhlcihcbiAgICAgICAgICAgIGljb24sXG4gICAgICAgICAgICBmZWVsc0xpa2UsXG4gICAgICAgICAgICBtaW5tYXgsXG4gICAgICAgICAgICBsb2NhdGlvbixcbiAgICAgICAgICAgIHRlbXBlcmF0dXJlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBzdW4sXG4gICAgICAgICAgICB2aXNpYmlsaXR5LFxuICAgICAgICAgICAgd2luZHNwZWVkLFxuICAgICAgICAgICAgaHVtaWRpdHlBbmRQcmVzc3VyZVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5jb2QgPT09IDQwNCkge1xuICAgICAgICAgIGFsZXJ0KFwiUGxhY2Ugbm90IGZvdW5kLiBQbGVhc2UgdHJ5IGFnYWluLlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbGVydChcIlNvbWV0aGluZyB3ZW50IHdyb25nLiBQbGVhc2UgdHJ5IGFnYWluLlwiKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBpbiBzZXR0aW5nIGxvY2F0aW9uIGZvciB3ZWF0aGVyOiBcIiArIGVycm9yKTtcbiAgICAgIH0pO1xuICAgIC8vIEZldGNoIGZvcmVjYXN0XG4gICAgZmV0Y2hGb3JlY2FzdChwbGFjZSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICBpZiAoZGF0YS5jb2QgPT09IFwiMjAwXCIpIHtcbiAgICAgICAgICBsZXQgZm9yZWNhc3QgPSBbXTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQwOyBpICs9IDMpIHtcbiAgICAgICAgICAgIGZvcmVjYXN0LnB1c2goZGF0YS5saXN0W2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdXBkYXRlRm9yZWNhc3QoZm9yZWNhc3QpO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEuY29kID09PSBcIjQwNFwiKSB7XG4gICAgICAgICAgYWxlcnQoXCJQbGFjZSBub3QgZm91bmQuIFBsZWFzZSB0cnkgYWdhaW4uXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFsZXJ0KFwiU29tZXRoaW5nIHdlbnQgd3JvbmcuIFBsZWFzZSB0cnkgYWdhaW4uXCIpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGluIHNldHRpbmcgbG9jYXRpb24gZm9yIGZvcmVjYXN0OiBcIiArIGVycm9yKTtcbiAgICAgIH0pO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiY3VycmVudFwiKSB7XG4gICAgdHJ5e1xuICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvblxuICAgICAgLmdldEN1cnJlbnRQb3NpdGlvbigocG9zaXRpb24pID0+IHtcbiAgICAgICAgY29uc3QgeyBsYXRpdHVkZSwgbG9uZ2l0dWRlIH0gPSBwb3NpdGlvbi5jb29yZHM7XG4gICAgICAgIGZldGNoV2VhdGhlcihsYXRpdHVkZSwgbG9uZ2l0dWRlKVxuICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGlmIChkYXRhLmNvZCA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgIC8vIExlZnQgY2FyZFxuICAgICAgICAgICAgICBsZXQgaWNvbiA9IGRhdGEud2VhdGhlclswXS5pY29uO1xuICAgICAgICAgICAgICBsZXQgZmVlbHNMaWtlID0gZGF0YS5tYWluLmZlZWxzX2xpa2U7XG4gICAgICAgICAgICAgIGxldCBtaW4gPSBkYXRhLm1haW4udGVtcF9taW47XG4gICAgICAgICAgICAgIGxldCBtYXggPSBkYXRhLm1haW4udGVtcF9tYXg7XG4gICAgICAgICAgICAgIGxldCBtaW5tYXggPSBbbWluLCBtYXhdO1xuICAgICAgICAgICAgICAvLyBNaWRkbGUgY2FyZFxuICAgICAgICAgICAgICBsZXQgbG9jYXRpb24gPSBbZGF0YS5uYW1lLCBkYXRhLnN5cy5jb3VudHJ5XTtcbiAgICAgICAgICAgICAgbGV0IHRlbXBlcmF0dXJlID0gZGF0YS5tYWluLnRlbXA7XG4gICAgICAgICAgICAgIGxldCBkZXNjcmlwdGlvbiA9XG4gICAgICAgICAgICAgICAgZGF0YS53ZWF0aGVyWzBdLm1haW4gK1xuICAgICAgICAgICAgICAgIFwiOiBcIiArXG4gICAgICAgICAgICAgICAgZGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICtcbiAgICAgICAgICAgICAgICBkYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb24uc2xpY2UoMSk7XG4gICAgICAgICAgICAgIC8vIFJpZ2h0IGNhcmRcbiAgICAgICAgICAgICAgbGV0IHN1bnJpc2UgPSBkYXRhLnN5cy5zdW5yaXNlO1xuICAgICAgICAgICAgICBsZXQgc3Vuc2V0ID0gZGF0YS5zeXMuc3Vuc2V0O1xuICAgICAgICAgICAgICBsZXQgdmlzaWJpbGl0eSA9IGRhdGEudmlzaWJpbGl0eTtcbiAgICAgICAgICAgICAgbGV0IHdpbmRzcGVlZCA9IGRhdGEud2luZC5zcGVlZDtcbiAgICAgICAgICAgICAgbGV0IGh1bWlkaXR5ID0gZGF0YS5tYWluLmh1bWlkaXR5O1xuICAgICAgICAgICAgICBsZXQgcHJlc3N1cmUgPSBkYXRhLm1haW4ucHJlc3N1cmU7XG4gICAgICAgICAgICAgIGxldCBzdW4gPSBbc3VucmlzZSwgc3Vuc2V0XTtcbiAgICAgICAgICAgICAgbGV0IGh1bWlkaXR5QW5kUHJlc3N1cmUgPSBbaHVtaWRpdHksIHByZXNzdXJlXTtcbiAgICAgICAgICAgICAgdXBkYXRlV2VhdGhlcihcbiAgICAgICAgICAgICAgICBpY29uLFxuICAgICAgICAgICAgICAgIGZlZWxzTGlrZSxcbiAgICAgICAgICAgICAgICBtaW5tYXgsXG4gICAgICAgICAgICAgICAgbG9jYXRpb24sXG4gICAgICAgICAgICAgICAgdGVtcGVyYXR1cmUsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgc3VuLFxuICAgICAgICAgICAgICAgIHZpc2liaWxpdHksXG4gICAgICAgICAgICAgICAgd2luZHNwZWVkLFxuICAgICAgICAgICAgICAgIGh1bWlkaXR5QW5kUHJlc3N1cmVcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5jb2QgPT09IDQwNCkge1xuICAgICAgICAgICAgICBhbGVydChcIlBsYWNlIG5vdCBmb3VuZC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBhbGVydChcIlNvbWV0aGluZyB3ZW50IHdyb25nLiBQbGVhc2UgdHJ5IGFnYWluLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gc2V0dGluZyBsb2NhdGlvbiBmb3Igd2VhdGhlcjogXCIgKyBlcnJvcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIC8vIEZldGNoIGZvcmVjYXN0XG4gICAgICAgIGZldGNoRm9yZWNhc3QobGF0aXR1ZGUsIGxvbmdpdHVkZSlcbiAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBpZiAoZGF0YS5jb2QgPT09IFwiMjAwXCIpIHtcbiAgICAgICAgICAgICAgbGV0IGZvcmVjYXN0ID0gW107XG4gICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDA7IGkgKz0gMykge1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0LnB1c2goZGF0YS5saXN0W2ldKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB1cGRhdGVGb3JlY2FzdChmb3JlY2FzdCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuY29kID09PSBcIjQwNFwiKSB7XG4gICAgICAgICAgICAgIGFsZXJ0KFwiUGxhY2Ugbm90IGZvdW5kLiBQbGVhc2UgdHJ5IGFnYWluLlwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGFsZXJ0KFwiU29tZXRoaW5nIHdlbnQgd3JvbmcuIFBsZWFzZSB0cnkgYWdhaW4uXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBpbiBzZXR0aW5nIGxvY2F0aW9uIGZvciBmb3JlY2FzdDogXCIpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSlcbiAgICB9Y2F0Y2goZXJyb3IpIHtcbiAgICAgICAgYWxlcnQoXCJQbGVhc2UgYWxsb3cgbG9jYXRpb24gYWNjZXNzIHRvIHVzZSB0aGlzIGZlYXR1cmUuXCIpO1xuICAgICAgICB9O1xuICB9IGVsc2Uge1xuICAgIGFsZXJ0KFwiU29tZXRoaW5nIHdlbnQgd3JvbmcuIFBsZWFzZSB0cnkgYWdhaW4uXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVdlYXRoZXIoXG4gIGljb24sXG4gIGZlZWxzbGlrZSxcbiAgbWlubWF4LFxuICBsb2NhdGlvbixcbiAgdGVtcGVyYXR1cmUsXG4gIGRlc2NyaXB0aW9uLFxuICBzdW4sXG4gIHZpc2liaWxpdHksXG4gIHdpbmRzcGVlZCxcbiAgaHVtaWRpdHlBbmRQcmVzc3VyZVxuKSB7XG4gIC8vIFVwZGF0ZSBJQ09OXG4gIGNvbnN0IGljb25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImljb24tY29udGFpbmVyXCIpO1xuICBmZXRjaFdlYXRoZXJJY29uKGljb24pLnRoZW4oKGRhdGEpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImljb25cIikuc3JjID0gZGF0YS51cmw7XG4gIH0pO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICBcImZlZWxzLWxpa2VcIlxuICApLmlubmVyVGV4dCA9IGBGZWVscyBsaWtlOiAke2ZlZWxzbGlrZX0gwrBDIC8gJHsoXG4gICAgKGZlZWxzbGlrZSAqIDkpIC8gNSArXG4gICAgMzJcbiAgKS50b0ZpeGVkKDIpfSDCsEZgO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1pbi10ZW1wXCIpLmlubmVyVGV4dCA9IGBNaW46ICR7bWlubWF4WzBdfSDCsEMgLyAkeyhcbiAgICAobWlubWF4WzBdICogOSkgLyA1ICtcbiAgICAzMlxuICApLnRvRml4ZWQoMil9IMKwRmA7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWF4LXRlbXBcIikuaW5uZXJUZXh0ID0gYE1heDogJHttaW5tYXhbMV19IMKwQyAvICR7KFxuICAgIChtaW5tYXhbMV0gKiA5KSAvIDUgK1xuICAgIDMyXG4gICkudG9GaXhlZCgyKX0gwrBGYDtcblxuICAvLyBVcGRhdGUgd2VhdGhlciBpbmZvXG4gIGNvbnN0IHdlYXRoZXJJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWF0aGVyLWluZm9cIik7XG4gIC8vIFVwZGF0ZSB3ZWF0aGVyIGluZm8gY29sb3VyXG4gIC8vIE9wdGltYWwgaHVtYW4gdGVtcGVyYXR1cmU6IDI2LTI4IENcbiAgaWYgKE1hdGguZmxvb3IodGVtcGVyYXR1cmUpIDwgMjYpIHtcbiAgICB3ZWF0aGVySW5mby5zdHlsZS5iYWNrZ3JvdW5kID0gYGxpbmVhci1ncmFkaWVudCgzNTdkZWcsIHJnYmEoMCwyMTIsMjU1LDEpIDAlLCByZ2JhKDAsMCwzNiwxKSAxMDAlKWA7XG4gIH0gZWxzZSBpZiAoTWF0aC5mbG9vcih0ZW1wZXJhdHVyZSkgPiAyOCkge1xuICAgIHdlYXRoZXJJbmZvLnN0eWxlLmJhY2tncm91bmQgPSBgbGluZWFyLWdyYWRpZW50KDM1N2RlZywgcmdiYSgyNTMsMjksMjksMSkgNTAlLCByZ2JhKDI1MiwxNzYsNjksMSkgMTAwJSlgO1xuICB9IGVsc2Uge1xuICAgIHdlYXRoZXJJbmZvLnN0eWxlLmJhY2tncm91bmQgPSBgcmFkaWFsLWdyYWRpZW50KGNpcmNsZSwgcmdiYSgyMzgsMTc0LDIwMiwxKSAwJSwgcmdiYSgxNDgsMTg3LDIzMywxKSAxMDAlKWA7XG4gICAgd2VhdGhlckluZm8uc3R5bGUuY29sb3IgPSBgcmdiYSgwLCAwLCAwLCAxKWA7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRpdGlvbmFsLWluZm9cIikuaW5uZXJUZXh0ID1cbiAgICAgIFwiT3B0aW1hbCB0ZW1wZXJhdHVyZSFcIjtcbiAgfVxuICAvLyBVcGRhdGUgbG9jYXRpb24sIHRlbXAsIGRlc2NyaXB0aW9uXG4gIGZldGNoQ291bnRyeU5hbWUobG9jYXRpb25bMV0pLnRoZW4oKG5hbWUpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgIFwid2VhdGhlci1sb2NhdGlvblwiXG4gICAgKS5pbm5lclRleHQgPSBgJHtsb2NhdGlvblswXX0sICR7bmFtZX1gO1xuICB9KTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWF0aGVyLXRlbXBcIikuaW5uZXJUZXh0ID1cbiAgICB0ZW1wZXJhdHVyZSArIFwiIMKwQyAvIFwiICsgKCh0ZW1wZXJhdHVyZSAqIDkpIC8gNSArIDMyKS50b0ZpeGVkKDIpICsgXCIgwrBGXCI7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VhdGhlci1kZXNjcmlwdGlvblwiKS5pbm5lclRleHQgPSBkZXNjcmlwdGlvbjtcbiAgLy8gVXBkYXRlIGZhY3RzXG4gIGNvbnN0IGZhY3RzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmYWN0cy1jb250YWluZXJcIik7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VucmlzZVwiKS5pbm5lclRleHQgPSBgU3VucmlzZTogJHtuZXcgRGF0ZShcbiAgICBzdW5bMF0gKiAxMDAwXG4gICkudG9Mb2NhbGVUaW1lU3RyaW5nKCl9IEVTVGA7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3Vuc2V0XCIpLmlubmVyVGV4dCA9IGBTdW5zZXQ6ICR7bmV3IERhdGUoXG4gICAgc3VuWzFdICogMTAwMFxuICApLnRvTG9jYWxlVGltZVN0cmluZygpfSBFU1RgO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICBcIndpbmRzcGVlZFwiXG4gICkuaW5uZXJUZXh0ID0gYFdpbmRzcGVlZDogJHt3aW5kc3BlZWR9IG0vc2A7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgIFwidmlzaWJpbGl0eVwiXG4gICkuaW5uZXJUZXh0ID0gYFZpc2liaWxpdHk6ICR7dmlzaWJpbGl0eX0gbWA7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgIFwiaHVtaWRpdHktYW5kLXByZXNzdXJlXCJcbiAgKS5pbm5lclRleHQgPSBgSHVtaWRpdHk6ICR7aHVtaWRpdHlBbmRQcmVzc3VyZVswXX0gJSwgUHJlc3N1cmU6ICR7aHVtaWRpdHlBbmRQcmVzc3VyZVsxXX0gaFBhYDtcbiAgaWNvbkNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gIHdlYXRoZXJJbmZvLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgZmFjdHNDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAvLyBBZGQgYSBiYWNrZ3JvdW5kIGltYWdlIGJhc2VkIG9uIGxvY2F0aW9uXG4gIGZldGNoV2VhdGhlckJhY2tncm91bmQoZGVzY3JpcHRpb24pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgIC8vIEdldCBzZWN0aW9uIGVsZW1lbnRcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgIFwic2VjdGlvblwiXG4gICAgKS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7cmVzcG9uc2UudXJsfSlgO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgXCJpbWFnZS1jcmVkaXRzXCJcbiAgICApLmlubmVySFRNTCA9IGBGcm9tOiA8YSBocmVmPVwiJHtyZXNwb25zZS51cmx9XCI+VW5zcGxhc2g8L2E+YDtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUZvcmVjYXN0KGZvcmVjYXN0cykge1xuICAvLyBVcGRhdGUgZm9yZWNhc3RcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5mb3JlY2FzdFwiKS5mb3JFYWNoKChmb3JlY2FzdCwgaW5kZXgpID0+IHtcbiAgICAvLyBVcGRhdGUgZm9yZWNhc3QgaWNvblxuICAgIGZldGNoV2VhdGhlckljb24oZm9yZWNhc3RzW2luZGV4XS53ZWF0aGVyWzBdLmljb24pLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGZvcmVjYXN0LnF1ZXJ5U2VsZWN0b3IoXCIuZm9yZWNhc3QtaWNvblwiKS5zcmMgPSBkYXRhLnVybDtcbiAgICB9KTtcbiAgICAvLyBVcGRhdGUgZm9yZWNhc3QgdGVtcGVyYXR1cmVcbiAgICBmb3JlY2FzdC5xdWVyeVNlbGVjdG9yKFwiLmZvcmVjYXN0LXRlbXBcIikuaW5uZXJUZXh0ID0gYCR7XG4gICAgICBmb3JlY2FzdHNbaW5kZXhdLm1haW4udGVtcFxuICAgIH0gwrBDIC8gJHsoKGZvcmVjYXN0c1tpbmRleF0ubWFpbi50ZW1wICogOSkgLyA1ICsgMzIpLnRvRml4ZWQoMil9IMKwRmA7XG4gICAgLy8gVXBkYXRlIGZvcmVjYXN0IGRlc2NyaXB0aW9uXG4gICAgZm9yZWNhc3QucXVlcnlTZWxlY3RvcihcIi5mb3JlY2FzdC1kZXNjcmlwdGlvblwiKS5pbm5lclRleHQgPVxuICAgICAgZm9yZWNhc3RzW2luZGV4XS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuICAgIC8vIFVwZGF0ZSBmb3JlY2FzdCBkYXRlIGFuZCB0aW1lXG4gICAgZm9yZWNhc3QucXVlcnlTZWxlY3RvcihcIi5mb3JlY2FzdC1kYXRlXCIpLmlubmVyVGV4dCA9XG4gICAgICBuZXcgRGF0ZShmb3JlY2FzdHNbaW5kZXhdLmR0ICogMTAwMCkudG9Mb2NhbGVEYXRlU3RyaW5nKCkgK1xuICAgICAgXCIgXCIgK1xuICAgICAgbmV3IERhdGUoZm9yZWNhc3RzW2luZGV4XS5kdCAqIDEwMDApLnRvTG9jYWxlVGltZVN0cmluZygpO1xuICAgIGZvcmVjYXN0LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBzZXRMb2NhdGlvbiB9IGZyb20gXCIuL2NvbnRlbnRcIjtcbmltcG9ydCB7IGNyZWF0ZUxheW91dCB9IGZyb20gXCIuL2xheW91dFwiO1xuXG5jcmVhdGVMYXlvdXQoKTtcbi8vIHNldExvY2F0aW9uKFwiY3VycmVudFwiKVxuIiwiLy8gSW1wb3J0IHNldGxvY2F0aW9uIGZ1bmN0aW9uXG5pbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuaW1wb3J0IHsgc2V0TG9jYXRpb24gfSBmcm9tIFwiLi9jb250ZW50LmpzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMYXlvdXQoKSB7XG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoZWFkZXJcIik7XG4gIGhlYWRlci5pZCA9IFwiaGVhZGVyXCI7XG4gIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VjdGlvblwiKTtcbiAgc2VjdGlvbi5pZCA9IFwic2VjdGlvblwiO1xuICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9vdGVyXCIpO1xuICBmb290ZXIuaWQgPSBcImZvb3RlclwiO1xuXG4gIC8vIEhlYWRlclxuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRpdGxlLmlubmVyVGV4dCA9IFwiVGhlLVdlYXRoZXItQXBwXCI7XG4gIHRpdGxlLmlkID0gXCJ0aXRsZVwiO1xuICBjb25zdCBzZWFyY2hDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzZWFyY2hDb250YWluZXIuaWQgPSBcInNlYXJjaC1jb250YWluZXJcIjtcbiAgY29uc3Qgc2VhcmNoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICBzZWFyY2guaWQgPSBcInNlYXJjaFwiO1xuICBzZWFyY2gucGxhY2Vob2xkZXIgPSBcIvCflI4gU2VhcmNoLi4uXCI7XG4gIGNvbnN0IGJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJ1dHRvbkNvbnRhaW5lci5pZCA9IFwiYnV0dG9uLWNvbnRhaW5lclwiO1xuICBjb25zdCBzZWFyY2hCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBzZWFyY2hCdXR0b24uaWQgPSBcInNlYXJjaC1idXR0b25cIjtcbiAgY29uc3QgY3VycmVudExvY2F0aW9uQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgY3VycmVudExvY2F0aW9uQnV0dG9uLmlkID0gXCJjdXJyZW50LWxvY2F0aW9uLWJ1dHRvblwiO1xuXG4gIC8vIFNlY3Rpb25cbiAgY29uc3Qgd2VhdGhlckNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB3ZWF0aGVyQ2FyZC5pZCA9IFwid2VhdGhlci1jYXJkXCI7XG4gIGNvbnN0IGZvcmVjYXN0Q2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgLy8gSGVhZGVyOiBUaXRsZVxuICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAvLyBIZWFkZXI6IFNlYXJjaCBCYXJcbiAgc2VhcmNoQnV0dG9uLmlubmVyVGV4dCA9IFwiU2VhcmNoXCI7XG4gIGN1cnJlbnRMb2NhdGlvbkJ1dHRvbi5pbm5lclRleHQgPSBcIkN1cnJlbnQgTG9jYXRpb25cIjtcbiAgYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlYXJjaEJ1dHRvbik7XG4gIGJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChjdXJyZW50TG9jYXRpb25CdXR0b24pO1xuICBzZWFyY2hDb250YWluZXIuYXBwZW5kQ2hpbGQoc2VhcmNoKTtcbiAgc2VhcmNoQ29udGFpbmVyLmFwcGVuZENoaWxkKGJ1dHRvbkNvbnRhaW5lcik7XG4gIGhlYWRlci5hcHBlbmRDaGlsZChzZWFyY2hDb250YWluZXIpO1xuXG4gIC8vIFNlY3Rpb246IHdlYXRoZXIgY2FyZDoge0ljb24sIFdlYXRoZXJJbmZvLCBGYWN0fVxuICAvLyBJY29uXG4gIGNvbnN0IGljb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBpY29uQ29udGFpbmVyLmlkID0gXCJpY29uLWNvbnRhaW5lclwiO1xuICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgaWNvbi5pZCA9IFwiaWNvblwiO1xuICBjb25zdCBmZWVsc0xpa2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBmZWVsc0xpa2UuaWQgPSBcImZlZWxzLWxpa2VcIjtcbiAgY29uc3QgbWluVGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG1pblRlbXAuaWQgPSBcIm1pbi10ZW1wXCI7XG4gIGNvbnN0IG1heFRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBtYXhUZW1wLmlkID0gXCJtYXgtdGVtcFwiO1xuICBjb25zdCBwcmVzc3VyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgcHJlc3N1cmUuaWQgPSBcInByZXNzdXJlXCI7XG4gIGljb25Db250YWluZXIuYXBwZW5kQ2hpbGQoaWNvbik7XG4gIGljb25Db250YWluZXIuYXBwZW5kQ2hpbGQoZmVlbHNMaWtlKTtcbiAgaWNvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChtaW5UZW1wKTtcbiAgaWNvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChtYXhUZW1wKTtcbiAgLy8gV2VhdGhlckluZm9cbiAgY29uc3Qgd2VhdGhlckluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB3ZWF0aGVySW5mby5pZCA9IFwid2VhdGhlci1pbmZvXCI7XG4gIGNvbnN0IHdlYXRoZXJMb2NhdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHdlYXRoZXJMb2NhdGlvbi5pZCA9IFwid2VhdGhlci1sb2NhdGlvblwiO1xuICBjb25zdCB3ZWF0aGVyVGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHdlYXRoZXJUZW1wLmlkID0gXCJ3ZWF0aGVyLXRlbXBcIjtcbiAgY29uc3Qgd2VhdGhlckRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgd2VhdGhlckRlc2NyaXB0aW9uLmlkID0gXCJ3ZWF0aGVyLWRlc2NyaXB0aW9uXCI7XG4gIGNvbnN0IGFkZGl0aW9uYWxJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYWRkaXRpb25hbEluZm8uaWQgPSBcImFkZGl0aW9uYWwtaW5mb1wiO1xuICB3ZWF0aGVySW5mby5hcHBlbmRDaGlsZCh3ZWF0aGVyTG9jYXRpb24pO1xuICB3ZWF0aGVySW5mby5hcHBlbmRDaGlsZCh3ZWF0aGVyVGVtcCk7XG4gIHdlYXRoZXJJbmZvLmFwcGVuZENoaWxkKHdlYXRoZXJEZXNjcmlwdGlvbik7XG4gIHdlYXRoZXJJbmZvLmFwcGVuZENoaWxkKGFkZGl0aW9uYWxJbmZvKTtcbiAgLy8gRmFjdChzKVxuICBjb25zdCBmYWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGZhY3RzQ29udGFpbmVyLmlkID0gXCJmYWN0cy1jb250YWluZXJcIjtcbiAgY29uc3Qgc3VucmlzZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHN1bnJpc2UuaWQgPSBcInN1bnJpc2VcIjtcbiAgY29uc3Qgc3Vuc2V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc3Vuc2V0LmlkID0gXCJzdW5zZXRcIjtcbiAgY29uc3QgdmlzaWJpbGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHZpc2liaWxpdHkuaWQgPSBcInZpc2liaWxpdHlcIjtcbiAgY29uc3Qgd2luZHNwZWVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgd2luZHNwZWVkLmlkID0gXCJ3aW5kc3BlZWRcIjtcbiAgY29uc3QgaHVtaWRpdHlBbmRQcmVzc3VyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGh1bWlkaXR5QW5kUHJlc3N1cmUuaWQgPSBcImh1bWlkaXR5LWFuZC1wcmVzc3VyZVwiO1xuICBmYWN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChzdW5yaXNlKTtcbiAgZmFjdHNDb250YWluZXIuYXBwZW5kQ2hpbGQoc3Vuc2V0KTtcbiAgZmFjdHNDb250YWluZXIuYXBwZW5kQ2hpbGQodmlzaWJpbGl0eSk7XG4gIGZhY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKHdpbmRzcGVlZCk7XG4gIGZhY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGh1bWlkaXR5QW5kUHJlc3N1cmUpO1xuXG4gIHdlYXRoZXJDYXJkLmFwcGVuZENoaWxkKGljb25Db250YWluZXIpO1xuICB3ZWF0aGVyQ2FyZC5hcHBlbmRDaGlsZCh3ZWF0aGVySW5mbyk7XG4gIHdlYXRoZXJDYXJkLmFwcGVuZENoaWxkKGZhY3RzQ29udGFpbmVyKTtcblxuICAvLyBGb3JlY2FzdCBjYXJkIGNvbnRlbnRzOiA4eCBjYXJkcyB3aXRoIFtJY29uLCB0ZW1wZXJhdHVyZSwgZGVzY3JpcHRpb24sIGRhdGUgYW5kIHRpbWVdXG4gIGZvcmVjYXN0Q2FyZC5pZCA9IFwiZm9yZWNhc3QtY2FyZFwiO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IDk7IGkrKykge1xuICAgIGNvbnN0IGZvcmVjYXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmb3JlY2FzdC5pZCA9IGBmb3JlY2FzdC0ke2l9YDtcbiAgICBmb3JlY2FzdC5jbGFzc05hbWUgPSBcImZvcmVjYXN0XCI7XG4gICAgY29uc3QgZm9yZWNhc3RJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICBmb3JlY2FzdEljb24uaWQgPSBgZm9yZWNhc3QtaWNvbi0ke2l9YDtcbiAgICBmb3JlY2FzdEljb24uY2xhc3NOYW1lID0gXCJmb3JlY2FzdC1pY29uXCI7XG4gICAgY29uc3QgZm9yZWNhc3RUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmb3JlY2FzdFRlbXAuaWQgPSBgZm9yZWNhc3QtdGVtcC0ke2l9YDtcbiAgICBmb3JlY2FzdFRlbXAuY2xhc3NOYW1lID0gXCJmb3JlY2FzdC10ZW1wXCI7XG4gICAgY29uc3QgZm9yZWNhc3REZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZm9yZWNhc3REZXNjcmlwdGlvbi5pZCA9IGBmb3JlY2FzdC1kZXNjcmlwdGlvbi0ke2l9YDtcbiAgICBmb3JlY2FzdERlc2NyaXB0aW9uLmNsYXNzTmFtZSA9IFwiZm9yZWNhc3QtZGVzY3JpcHRpb25cIjtcbiAgICBjb25zdCBmb3JlY2FzdERhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGZvcmVjYXN0RGF0ZS5pZCA9IGBmb3JlY2FzdC1kYXRlLSR7aX1gO1xuICAgIGZvcmVjYXN0RGF0ZS5jbGFzc05hbWUgPSBcImZvcmVjYXN0LWRhdGVcIjtcbiAgICBmb3JlY2FzdC5hcHBlbmRDaGlsZChmb3JlY2FzdEljb24pO1xuICAgIGZvcmVjYXN0LmFwcGVuZENoaWxkKGZvcmVjYXN0VGVtcCk7XG4gICAgZm9yZWNhc3QuYXBwZW5kQ2hpbGQoZm9yZWNhc3REZXNjcmlwdGlvbik7XG4gICAgZm9yZWNhc3QuYXBwZW5kQ2hpbGQoZm9yZWNhc3REYXRlKTtcbiAgICBmb3JlY2FzdENhcmQuYXBwZW5kQ2hpbGQoZm9yZWNhc3QpO1xuICB9XG5cbiAgc2VjdGlvbi5hcHBlbmRDaGlsZCh3ZWF0aGVyQ2FyZCk7XG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQoZm9yZWNhc3RDYXJkKTtcbiAgLy8gRm9vdGVyXG4gIGZvb3Rlci5pZCA9IFwiZm9vdGVyXCI7XG4gIGNvbnN0IGNyZWRpdHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjcmVkaXRzLmlkID0gXCJjcmVkaXRzXCI7XG4gIGNvbnN0IHB1cnBsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHB1cnBsZS5pZCA9IFwicHVycGxlXCI7XG4gIGNvbnN0IGluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBpbmZvLmlkID0gXCJpbmZvXCI7XG5cbiAgZm9vdGVyLmFwcGVuZENoaWxkKGNyZWRpdHMpO1xuICBmb290ZXIuYXBwZW5kQ2hpbGQocHVycGxlKTtcbiAgZm9vdGVyLmFwcGVuZENoaWxkKGluZm8pO1xuXG4gIC8vIEZvb3RlciBjb250ZW50XG4gIGNyZWRpdHMuaW5uZXJIVE1MID0gXG4gICAgXCI8cD4gV2VhdGhlciBkYXRhIHByb3ZpZGVkIGJ5IDxhIGhyZWY9J2h0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnLyc+T3BlbldlYXRoZXJNYXA8L2E+PC9wPlwiICsgXG4gICAgXCI8cD4gRm9udHMgJiBJbWFnZXMgcHJvdmlkZWQgYnkgPGEgaHJlZj0naHR0cHM6Ly9hZG9iZS5jb20nPkFkb2JlPC9hPlwiICtcbiAgICBcIiBBbmQgPGEgaHJlZj0naHR0cHM6Ly93d3cudW5zcGxhc2guY29tJz5VbnNwbGFzaDwvYT5cIlxuICBwdXJwbGUuaW5uZXJIVE1MID0gXG4gIFwiPGRpdj4gcmVkICsgYmx1ZSA9IDwvZGl2PjxhIGhyZWY9J2h0dHBzOi8vd3d3LmdpdGh1Yi5jb20vcmVkcGx1c2JsdWUnPjxkaXYgaWQ9J2dpdGh1Yi1pbWFnZSc+PC9kaXY+PC9hPlwiXG4gIGluZm8uaW5uZXJIVE1MID0gXG4gIFwiPHA+IDxhIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9yZWRwbHVzYmx1ZS93ZWF0aGVyLWFwcC90cmVlL21haW4vc3JjJz5Tb3VyY2UgY29kZTwvYT48L3A+XCIgKyBcbiAgJzxwIGlkPVwiaW5mby1idG5cIj48aW1nIHNyYz1cImRhdGEvaW5mby5zdmdcIi8+IFVzYWdlIEluZm8nXG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNlY3Rpb24pO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvb3Rlcik7XG5cbiAgYWRkTGlzdGVuZXJzKCk7XG59XG5cbmZ1bmN0aW9uIGFkZExpc3RlbmVycygpIHtcbiAgY29uc3Qgc2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hcIik7XG4gIGNvbnN0IHNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoLWJ1dHRvblwiKTtcbiAgY29uc3QgY3VycmVudExvY2F0aW9uQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgXCJjdXJyZW50LWxvY2F0aW9uLWJ1dHRvblwiXG4gICk7XG5cbiAgc2VhcmNoQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgLy8gV2hpbGUgdGhlIHZhbHVlIG9mIHNlYXJjaCBpcyAwLCBidXR0b24gcmVtYWlucyBkaXNhYmxlZFxuICBzZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICBpZiAoc2VhcmNoLnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgIHNlYXJjaEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgLy8gTGlzdGVuIGZvciBFTlRFUiBrZXlcbiAgICAgIHNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBzZWFyY2hCdXR0b24uY2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlYXJjaEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuICB9KTtcblxuICBzZWFyY2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBzZXRMb2NhdGlvbihcInNlYXJjaFwiKTtcbiAgICAvLyBUbyBwcmV2ZW50IG11bHRpcGxlIGFwaSBjYWxsc1xuICAgIHNlYXJjaEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgY3VycmVudExvY2F0aW9uQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgc2hvd0NyZWRpdHMoKTtcbiAgfSk7XG5cbiAgY3VycmVudExvY2F0aW9uQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgc2V0TG9jYXRpb24oXCJjdXJyZW50XCIpO1xuICAgIC8vIEVtcHR5IHNlYXJjaCBiYXJcbiAgICBzZWFyY2gudmFsdWUgPSBcIlwiO1xuICAgIHNlYXJjaEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIGN1cnJlbnRMb2NhdGlvbkJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgc2hvd0NyZWRpdHMoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNob3dDcmVkaXRzKCl7XG4gICAgY29uc3QgY3JlZGl0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3JlZGl0c1wiKTtcbiAgICBjb25zdCBwdXJwbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInB1cnBsZVwiKTtcbiAgICBjb25zdCBpbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmZvXCIpO1xuICAgIFxufVxuIiwiLy8gQVBJIEtleXMgZm9yIE9wZW4gV2VhdGhlciBBUEkgKEZyZWUgZm9yIGFsbClcbmNvbnN0IHNlY3JldHMgPSB7XG4gIE9QRU5XRUFUSEVSOiBcIlwiLFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzZWNyZXRzO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcImRhdGEvQ2hlYXAgUGluZSBSZWd1bGFyLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcImRhdGEvRWx6YSBSZWd1bGFyLnR0ZlwiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcImRhdGEvd2VhdGhlci5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyA9IG5ldyBVUkwoXCJkYXRhL2dpdGh1Yi5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiQ2hlYXAgUGluZVxcXCI7XFxuICBzcmM6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIik7XFxufVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJFbHphIFJlZ3VsYXJcXFwiO1xcbiAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fICsgXCIpO1xcbn1cXG5cXG46cm9vdCB7XFxuICAtLWJveC1zaGFkb3c6IDBweCA0cHggNnB4IDBweCByZ2JhKDUwLCA1MCwgOTMsIDAuMTEpLFxcbiAgICAwcHggMXB4IDNweCAwcHggcmdiYSgwLCAwLCAwLCAwLjA4KTtcXG4gIC0tcHVycGxlOiAjOTE0N2ZmO1xcbiAgLS1saWdodC1ibGFjazogcmdiYSgwLCAwLCAwLCAwLjYpO1xcbn1cXG5cXG5odG1sLFxcbmJvZHkge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDI1JSBhdXRvIG1pbihhdXRvLCAxMCUpO1xcbiAgZ2FwOiAwcHg7XFxufVxcblxcbmhlYWRlcixcXG5zZWN0aW9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBib3gtc2hhZG93OiB2YXIoLS1ib3gtc2hhZG93KTtcXG4gIG1hcmdpbjogNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gKyBcIik7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbiN0aXRsZSB7XFxuICBmb250LXNpemU6IDVyZW07XFxuICBmb250LWZhbWlseTogXFxcIkNoZWFwIFBpbmVcXFwiLCBjdXJzaXZlO1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG5cXG4jc2VhcmNoLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogMTBweDtcXG59XFxuXFxuI3NlYXJjaCB7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICBmb250LWZhbWlseTogXFxcIkNvdXJpZXIgTmV3XFxcIiwgQ291cmllciwgbW9ub3NwYWNlO1xcbiAgcGFkZGluZy1sZWZ0OiA1cHg7XFxuICB3aWR0aDogMjB2dztcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBsaW5lLWhlaWdodDogMS41O1xcbiAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAxMDBtcyBlYXNlLWluLCBib3JkZXIgMTAwbXMgZWFzZS1pbixcXG4gICAgYmFja2dyb3VuZC1jb2xvciAxMDBtcyBlYXNlLWluO1xcbiAgYm9yZGVyOiAycHggc29saWQgI2RlZTFlMjtcXG4gIGNvbG9yOiByZ2IoMTQsIDE0LCAxNik7XFxuICBiYWNrZ3JvdW5kOiAjZGVlMWUyO1xcbiAgb3BhY2l0eTogOTAlO1xcbn1cXG5cXG4jc2VhcmNoOmhvdmVyIHtcXG4gIGJvcmRlci1jb2xvcjogI2NjYztcXG59XFxuI3NlYXJjaDpmb2N1cyB7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1wdXJwbGUpO1xcbiAgYmFja2dyb3VuZDogI2ZmZjtcXG4gIG9wYWNpdHk6IDEwMCU7XFxufVxcblxcbiNzZWFyY2g6OnBsYWNlaG9sZGVyIHtcXG4gIGNvbG9yOiAjY2NjO1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG59XFxuXFxuI2J1dHRvbi1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBnYXA6IDEwcHg7XFxufVxcblxcbiNzZWFyY2gtYnV0dG9uLFxcbiNjdXJyZW50LWxvY2F0aW9uLWJ1dHRvbiB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBvdXRsaW5lOiAwO1xcbiAgYm9yZGVyOiBub25lO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICB3aWR0aDogMTB2dztcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXB1cnBsZSk7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiAwIDEwcHg7XFxuICBvcGFjaXR5OiA5MCU7XFxufVxcblxcbiNzZWFyY2gtYnV0dG9uOmhvdmVyLFxcbiNjdXJyZW50LWxvY2F0aW9uLWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wdXJwbGUpO1xcbiAgb3BhY2l0eTogMTAwJTtcXG59XFxuXFxuI3NlYXJjaC1idXR0b246ZGlzYWJsZWQsXFxuI2N1cnJlbnQtbG9jYXRpb24tYnV0dG9uOmRpc2FibGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XFxuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xcbn1cXG5cXG5zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgZ2FwOiAxMHB4O1xcbn1cXG5cXG4jd2VhdGhlci1jYXJkIHtcXG4gIHdpZHRoOiA5MCU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvIGF1dG8gYXV0bztcXG4gIGdhcDogMTBweDtcXG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XFxuICBtaW4td2lkdGg6IG1heC1jb250ZW50O1xcbn1cXG5cXG4jd2VhdGhlci1pbmZvLFxcbiNpY29uLWNvbnRhaW5lcixcXG4jZmFjdHMtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBnYXA6IDVweDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgbWFyZ2luOiA1cHg7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJFbHphIFJlZ3VsYXJcXFwiLCBjdXJzaXZlO1xcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44NSk7XFxuICBib3gtc2hhZG93OiB2YXIoLS1ib3gtc2hhZG93KTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgb3BhY2l0eTogODUlO1xcbn1cXG5cXG4jd2VhdGhlci1pbmZvOmhvdmVyIHtcXG4gIG9wYWNpdHk6IDEwMCU7XFxufVxcblxcbiNpY29uLWNvbnRhaW5lcixcXG4jZmFjdHMtY29udGFpbmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0LWJsYWNrKTtcXG59XFxuXFxuI2ljb24tY29udGFpbmVyOmhvdmVyLFxcbiNmYWN0cy1jb250YWluZXI6aG92ZXIsXFxuI2ZvcmVjYXN0LWNhcmQgPiBkaXY6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjcpO1xcbiAgb3BhY2l0eTogMTAwJTtcXG59XFxuXFxuI3dlYXRoZXItbG9jYXRpb24sXFxuI3dlYXRoZXItdGVtcCB7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiAycmVtO1xcbn1cXG5cXG4jYWRkaXRpb25hbC1pbmZvIHtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG59XFxuXFxuI2ZvcmVjYXN0LWNhcmQge1xcbiAgd2lkdGg6IDkwJTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDIwMHB4LCAxZnIpKTtcXG4gIGdhcDogMTBweDtcXG4gIGhlaWdodDogZml0LWNvbnRlbnQ7XFxuICBtaW4td2lkdGg6IG1heC1jb250ZW50O1xcbn1cXG5cXG4jZm9yZWNhc3QtY2FyZCA+IGRpdiB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBtYXJnaW46IDVweDtcXG4gIHBhZGRpbmc6IDE1cHg7XFxuICBmb250LWZhbWlseTogXFxcIkVsemEgUmVndWxhclxcXCIsIGN1cnNpdmU7XFxuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjg1KTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0LWJsYWNrKTtcXG4gIGJveC1zaGFkb3c6IHZhcigtLWJveC1zaGFkb3cpO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgb3BhY2l0eTogODUlO1xcbn1cXG5cXG4jZm9yZWNhc3QtY2FyZCA+IGRpdiA+IGltZyB7XFxuICB3aWR0aDogNTBweDtcXG4gIGhlaWdodDogNTBweDtcXG59XFxuXFxuLmZvcmVjYXN0LXRlbXAge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG59XFxuXFxuZm9vdGVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMTBweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRWx6YSBSZWd1bGFyXFxcIiwgY3Vyc2l2ZTtcXG4gIGJveC1zaGFkb3c6IHZhcigtLWJveC1zaGFkb3cpO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIG1hcmdpbjogNXB4O1xcbiAgcGFkZGluZzogMTVweDtcXG59XFxuXFxuI3B1cnBsZXtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgZ2FwOiA1cHg7XFxufVxcblxcbiNnaXRodWItaW1hZ2V7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fICsgXCIpO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gIHdpZHRoOiAyNXB4O1xcbiAgaGVpZ2h0OiAyNXB4O1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCkge1xcbiAgYm9keSB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtaGVpZ2h0OiA2NjBweCkge1xcbiAgYm9keSB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSx5QkFBeUI7RUFDekIsNENBQXVDO0FBQ3pDOztBQUVBO0VBQ0UsMkJBQTJCO0VB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b0M7RUFDcEMsNkJBQTZCO0VBQzdCLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsV0FBVztFQUNYLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixRQUFRO0FBQ1Y7O0FBRUE7RUFDRSx5REFBc0M7RUFDdEMsc0JBQXNCO0VBQ3RCLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRTtJQUNFLGFBQWE7RUFDZjtBQUNGOztBQUVBO0VBQ0U7SUFDRSxhQUFhO0VBQ2Y7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiQ2hlYXAgUGluZVxcXCI7XFxuICBzcmM6IHVybChkYXRhL0NoZWFwXFxcXCBQaW5lXFxcXCBSZWd1bGFyLnR0Zik7XFxufVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJFbHphIFJlZ3VsYXJcXFwiO1xcbiAgc3JjOiB1cmwoZGF0YS9FbHphXFxcXCBSZWd1bGFyLnR0Zik7XFxufVxcblxcbjpyb290IHtcXG4gIC0tYm94LXNoYWRvdzogMHB4IDRweCA2cHggMHB4IHJnYmEoNTAsIDUwLCA5MywgMC4xMSksXFxuICAgIDBweCAxcHggM3B4IDBweCByZ2JhKDAsIDAsIDAsIDAuMDgpO1xcbiAgLS1wdXJwbGU6ICM5MTQ3ZmY7XFxuICAtLWxpZ2h0LWJsYWNrOiByZ2JhKDAsIDAsIDAsIDAuNik7XFxufVxcblxcbmh0bWwsXFxuYm9keSB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbmJvZHkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMjUlIGF1dG8gbWluKGF1dG8sIDEwJSk7XFxuICBnYXA6IDBweDtcXG59XFxuXFxuaGVhZGVyLFxcbnNlY3Rpb24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJveC1zaGFkb3c6IHZhcigtLWJveC1zaGFkb3cpO1xcbiAgbWFyZ2luOiA1cHg7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGRhdGEvd2VhdGhlci5zdmcpO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4jdGl0bGUge1xcbiAgZm9udC1zaXplOiA1cmVtO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJDaGVhcCBQaW5lXFxcIiwgY3Vyc2l2ZTtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuXFxuI3NlYXJjaC1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBnYXA6IDEwcHg7XFxufVxcblxcbiNzZWFyY2gge1xcbiAgZm9udC1zaXplOiAxM3B4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJDb3VyaWVyIE5ld1xcXCIsIENvdXJpZXIsIG1vbm9zcGFjZTtcXG4gIHBhZGRpbmctbGVmdDogNXB4O1xcbiAgd2lkdGg6IDIwdnc7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgbGluZS1oZWlnaHQ6IDEuNTtcXG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMTAwbXMgZWFzZS1pbiwgYm9yZGVyIDEwMG1zIGVhc2UtaW4sXFxuICAgIGJhY2tncm91bmQtY29sb3IgMTAwbXMgZWFzZS1pbjtcXG4gIGJvcmRlcjogMnB4IHNvbGlkICNkZWUxZTI7XFxuICBjb2xvcjogcmdiKDE0LCAxNCwgMTYpO1xcbiAgYmFja2dyb3VuZDogI2RlZTFlMjtcXG4gIG9wYWNpdHk6IDkwJTtcXG59XFxuXFxuI3NlYXJjaDpob3ZlciB7XFxuICBib3JkZXItY29sb3I6ICNjY2M7XFxufVxcbiNzZWFyY2g6Zm9jdXMge1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIGJvcmRlci1jb2xvcjogdmFyKC0tcHVycGxlKTtcXG4gIGJhY2tncm91bmQ6ICNmZmY7XFxuICBvcGFjaXR5OiAxMDAlO1xcbn1cXG5cXG4jc2VhcmNoOjpwbGFjZWhvbGRlciB7XFxuICBjb2xvcjogI2NjYztcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxufVxcblxcbiNidXR0b24tY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgZ2FwOiAxMHB4O1xcbn1cXG5cXG4jc2VhcmNoLWJ1dHRvbixcXG4jY3VycmVudC1sb2NhdGlvbi1idXR0b24ge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgb3V0bGluZTogMDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgZm9udC1zaXplOiAxM3B4O1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgd2lkdGg6IDEwdnc7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wdXJwbGUpO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgcGFkZGluZzogMCAxMHB4O1xcbiAgb3BhY2l0eTogOTAlO1xcbn1cXG5cXG4jc2VhcmNoLWJ1dHRvbjpob3ZlcixcXG4jY3VycmVudC1sb2NhdGlvbi1idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHVycGxlKTtcXG4gIG9wYWNpdHk6IDEwMCU7XFxufVxcblxcbiNzZWFyY2gtYnV0dG9uOmRpc2FibGVkLFxcbiNjdXJyZW50LWxvY2F0aW9uLWJ1dHRvbjpkaXNhYmxlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcXG59XFxuXFxuc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGdhcDogMTBweDtcXG59XFxuXFxuI3dlYXRoZXItY2FyZCB7XFxuICB3aWR0aDogOTAlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byBhdXRvIGF1dG87XFxuICBnYXA6IDEwcHg7XFxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcbiAgbWluLXdpZHRoOiBtYXgtY29udGVudDtcXG59XFxuXFxuI3dlYXRoZXItaW5mbyxcXG4jaWNvbi1jb250YWluZXIsXFxuI2ZhY3RzLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiA1cHg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIG1hcmdpbjogNXB4O1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRWx6YSBSZWd1bGFyXFxcIiwgY3Vyc2l2ZTtcXG4gIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuODUpO1xcbiAgYm94LXNoYWRvdzogdmFyKC0tYm94LXNoYWRvdyk7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG4gIG9wYWNpdHk6IDg1JTtcXG59XFxuXFxuI3dlYXRoZXItaW5mbzpob3ZlciB7XFxuICBvcGFjaXR5OiAxMDAlO1xcbn1cXG5cXG4jaWNvbi1jb250YWluZXIsXFxuI2ZhY3RzLWNvbnRhaW5lciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodC1ibGFjayk7XFxufVxcblxcbiNpY29uLWNvbnRhaW5lcjpob3ZlcixcXG4jZmFjdHMtY29udGFpbmVyOmhvdmVyLFxcbiNmb3JlY2FzdC1jYXJkID4gZGl2OmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC43KTtcXG4gIG9wYWNpdHk6IDEwMCU7XFxufVxcblxcbiN3ZWF0aGVyLWxvY2F0aW9uLFxcbiN3ZWF0aGVyLXRlbXAge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG59XFxuXFxuI2FkZGl0aW9uYWwtaW5mbyB7XFxuICBmb250LXNpemU6IDFyZW07XFxufVxcblxcbiNmb3JlY2FzdC1jYXJkIHtcXG4gIHdpZHRoOiA5MCU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyMDBweCwgMWZyKSk7XFxuICBnYXA6IDEwcHg7XFxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcbiAgbWluLXdpZHRoOiBtYXgtY29udGVudDtcXG59XFxuXFxuI2ZvcmVjYXN0LWNhcmQgPiBkaXYge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgbWFyZ2luOiA1cHg7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJFbHphIFJlZ3VsYXJcXFwiLCBjdXJzaXZlO1xcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44NSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodC1ibGFjayk7XFxuICBib3gtc2hhZG93OiB2YXIoLS1ib3gtc2hhZG93KTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIG9wYWNpdHk6IDg1JTtcXG59XFxuXFxuI2ZvcmVjYXN0LWNhcmQgPiBkaXYgPiBpbWcge1xcbiAgd2lkdGg6IDUwcHg7XFxuICBoZWlnaHQ6IDUwcHg7XFxufVxcblxcbi5mb3JlY2FzdC10ZW1wIHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IDFyZW07XFxufVxcblxcbmZvb3RlciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDEwcHg7XFxuICBmb250LWZhbWlseTogXFxcIkVsemEgUmVndWxhclxcXCIsIGN1cnNpdmU7XFxuICBib3gtc2hhZG93OiB2YXIoLS1ib3gtc2hhZG93KTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBtYXJnaW46IDVweDtcXG4gIHBhZGRpbmc6IDE1cHg7XFxufVxcblxcbiNwdXJwbGV7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGdhcDogNXB4O1xcbn1cXG5cXG4jZ2l0aHViLWltYWdle1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGRhdGEvZ2l0aHViLnN2Zyk7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgd2lkdGg6IDI1cHg7XFxuICBoZWlnaHQ6IDI1cHg7XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XFxuICBib2R5IHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC1oZWlnaHQ6IDY2MHB4KSB7XFxuICBib2R5IHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJzZWNyZXRzIiwiT1dfQVBJX0tFWSIsImZldGNoV2VhdGhlciIsInBsYWNlIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwid2VhdGhlciIsImZldGNoIiwiZGF0YSIsImpzb24iLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJmZXRjaEZvcmVjYXN0IiwiZm9yZWNhc3QiLCJmZXRjaFdlYXRoZXJJY29uIiwiY29kZSIsImljb24iLCJmZXRjaENvdW50cnlOYW1lIiwiY291bnRyeSIsIm5hbWUiLCJmZXRjaFdlYXRoZXJCYWNrZ3JvdW5kIiwiYmFja2dyb3VuZCIsInNldExvY2F0aW9uIiwidHlwZSIsInNlYXJjaCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ2YWx1ZSIsInRoZW4iLCJjb2QiLCJmZWVsc0xpa2UiLCJtYWluIiwiZmVlbHNfbGlrZSIsIm1pbiIsInRlbXBfbWluIiwibWF4IiwidGVtcF9tYXgiLCJtaW5tYXgiLCJsb2NhdGlvbiIsInN5cyIsInRlbXBlcmF0dXJlIiwidGVtcCIsImRlc2NyaXB0aW9uIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInN1bnJpc2UiLCJzdW5zZXQiLCJ2aXNpYmlsaXR5Iiwid2luZHNwZWVkIiwid2luZCIsInNwZWVkIiwiaHVtaWRpdHkiLCJwcmVzc3VyZSIsInN1biIsImh1bWlkaXR5QW5kUHJlc3N1cmUiLCJ1cGRhdGVXZWF0aGVyIiwiYWxlcnQiLCJjYXRjaCIsImkiLCJwdXNoIiwibGlzdCIsInVwZGF0ZUZvcmVjYXN0IiwibmF2aWdhdG9yIiwiZ2VvbG9jYXRpb24iLCJnZXRDdXJyZW50UG9zaXRpb24iLCJwb3NpdGlvbiIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwiY29vcmRzIiwiZmVlbHNsaWtlIiwiaWNvbkNvbnRhaW5lciIsInNyYyIsInVybCIsImlubmVyVGV4dCIsInRvRml4ZWQiLCJ3ZWF0aGVySW5mbyIsIk1hdGgiLCJmbG9vciIsInN0eWxlIiwiY29sb3IiLCJmYWN0c0NvbnRhaW5lciIsIkRhdGUiLCJ0b0xvY2FsZVRpbWVTdHJpbmciLCJkaXNwbGF5IiwicmVzcG9uc2UiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJpbm5lckhUTUwiLCJmb3JlY2FzdHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImluZGV4IiwicXVlcnlTZWxlY3RvciIsImR0IiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwiY3JlYXRlTGF5b3V0IiwiaGVhZGVyIiwiY3JlYXRlRWxlbWVudCIsImlkIiwic2VjdGlvbiIsImZvb3RlciIsInRpdGxlIiwic2VhcmNoQ29udGFpbmVyIiwicGxhY2Vob2xkZXIiLCJidXR0b25Db250YWluZXIiLCJzZWFyY2hCdXR0b24iLCJjdXJyZW50TG9jYXRpb25CdXR0b24iLCJ3ZWF0aGVyQ2FyZCIsImZvcmVjYXN0Q2FyZCIsImFwcGVuZENoaWxkIiwibWluVGVtcCIsIm1heFRlbXAiLCJ3ZWF0aGVyTG9jYXRpb24iLCJ3ZWF0aGVyVGVtcCIsIndlYXRoZXJEZXNjcmlwdGlvbiIsImFkZGl0aW9uYWxJbmZvIiwiY2xhc3NOYW1lIiwiZm9yZWNhc3RJY29uIiwiZm9yZWNhc3RUZW1wIiwiZm9yZWNhc3REZXNjcmlwdGlvbiIsImZvcmVjYXN0RGF0ZSIsImNyZWRpdHMiLCJwdXJwbGUiLCJpbmZvIiwiYm9keSIsImFkZExpc3RlbmVycyIsImRpc2FibGVkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwia2V5IiwicHJldmVudERlZmF1bHQiLCJjbGljayIsInNob3dDcmVkaXRzIiwiT1BFTldFQVRIRVIiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZVJvb3QiOiIifQ==