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
/* harmony import */ var _secrets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./secrets.js */ "./src/secrets.js");

const OW_API_KEY = _secrets_js__WEBPACK_IMPORTED_MODULE_0__.secrets.OPENWEATHER;
async function fetchWeather(place) {
  // If number of params is 2, then it is lat and lon
  if (arguments.length === 2) {
    try {
      let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${arguments[0]}&lon=${arguments[1]}&appid=${OW_API_KEY}&units=metric`, {
        mode: "cors"
      });
      let data = await weather.json();
      return data;
    } catch (error) {
      console.log("Error in fetching weather " + error);
    }
  } else if (arguments.length === 1) {
    try {
      let weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${OW_API_KEY}&units=metric`, {
        mode: "cors"
      });
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
      let forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${arguments[0]}&lon=${arguments[1]}&appid=${OW_API_KEY}&units=metric`, {
        mode: "cors"
      });
      let data = await forecast.json();
      return data;
    } catch (error) {
      console.log("Error in fetching forecast " + error);
    }
  } else if (arguments.length === 1) {
    try {
      let forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${OW_API_KEY}&units=metric`, {
        mode: "cors"
      });
      let data = await forecast.json();
      return data;
    } catch (error) {
      console.log("Error in fetching forecast " + error);
    }
  }
}
async function fetchWeatherIcon(code) {
  try {
    let icon = await fetch(`https://openweathermap.org/img/w/${code}.png`, {
      mode: "cors"
    });
    return icon;
  } catch (error) {
    console.log("Error in fetching icon " + error);
  }
}
async function fetchCountryName(code) {
  try {
    let country = await fetch(`https://api.worldbank.org/v2/country/${code}?format=json`, {
      mode: "cors"
    });
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


// Loading bar
const topbar = __webpack_require__(/*! topbar */ "./node_modules/topbar/topbar.min.js");
topbar.config({
  autoRun: false,
  barThickness: 3,
  barColors: {
    0: "rgba(26,  188, 156, .9)",
    ".25": "rgba(52,  152, 219, .9)",
    ".50": "rgba(241, 196, 15,  .9)",
    ".75": "rgba(230, 126, 34,  .9)",
    "1.0": "rgba(211, 84,  0,   .9)"
  },
  shadowBlur: 10,
  shadowColor: "rgba(0,   0,   0,   .6)"
});
function setLocation(type) {
  const search = document.getElementById("search");
  let place = search.value;
  if (type === "search") {
    topbar.show();
    (0,_async_js__WEBPACK_IMPORTED_MODULE_0__.fetchWeather)(place).then(data => {
      // console.log(data);
      topbar.progress(0.5);
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
        // Fetch forecast
        (0,_async_js__WEBPACK_IMPORTED_MODULE_0__.fetchForecast)(place).then(data => {
          topbar.progress(0.75);
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
      } else if (data.cod === "404") {
        topbar.hide();
        document.getElementById("section").style.display = "none";
        document.getElementById("footer").style.display = "none";
        alert("Place not found. Please try again.");
      }
    }).catch(error => {
      console.log("Error in setting location for weather: " + error);
    });
  } else if (type === "current") {
    try {
      navigator.geolocation.getCurrentPosition(position => {
        topbar.show();
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
            topbar.progress(0.5);
          } else if (data.cod === 404) {
            topbar.hide();
            alert("Place not found. Please try again.");
          } else {
            topbar.hide();
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
            topbar.progress(0.75);
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
  document.getElementById("windspeed").innerText = `Windspeed: ${windspeed} m/s = ${(windspeed / 1.609).toFixed(2)} mph`;
  document.getElementById("visibility").innerText = `Visibility: ${visibility} m`;
  document.getElementById("humidity-and-pressure").innerText = `Humidity: ${humidityAndPressure[0]} %, Pressure: ${humidityAndPressure[1]} hPa`;
  iconContainer.style.display = "flex";
  weatherInfo.style.display = "flex";
  factsContainer.style.display = "flex";
  // While background is fetched, section has a dark background for readability
  document.querySelector("section").style.background = `#b4b4b4`;
  // Add a background image based on location
  (0,_async_js__WEBPACK_IMPORTED_MODULE_0__.fetchWeatherBackground)(description).then(response => {
    if (response === undefined) {
      return;
    }
    // Reset section background
    document.querySelector("section").style.background = `#fff`;
    // Get section element
    document.getElementById("section").style.backgroundImage = `url(${response.url})`;
    topbar.progress(1);
    // Hide topbar in 5 seconds
    setTimeout(() => {
      topbar.hide();
    }, 5000);
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
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout */ "./src/layout.js");
/* harmony import */ var _responsive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./responsive */ "./src/responsive.js");


(0,_layout__WEBPACK_IMPORTED_MODULE_0__.createLayout)();
// document.getElementById("current-location-button").click();
(0,_responsive__WEBPACK_IMPORTED_MODULE_1__.checkState)(window.matchMedia("(max-width: 1250px)"));

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
/* harmony import */ var _responsive_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./responsive.js */ "./src/responsive.js");
// Import setlocation function


// To make the app responsive

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
  credits.innerHTML = "Weather data provided by <a href='https://openweathermap.org/'>OpenWeatherMap</a><br>" + "Fonts & Images provided by <a href='https://adobe.com'>Adobe" + " And <a href='https://www.unsplash.com'>Unsplash</a>";
  purple.innerHTML = "<div> red + blue = </div><a href='https://www.github.com/redplusblue'><div id='github-image'></div></a>";
  info.innerHTML = "<a href='https://github.com/redplusblue/weather-app/tree/main/src'>Source code</a><br>" + "<div id='usage'><div id='info-image'></div><div>Usage Info</div></div>";
  document.body.appendChild(header);
  document.body.appendChild(section);
  document.body.appendChild(footer);

  // Dark mode button
  const darkMode = document.createElement("div");
  darkMode.id = "dark-mode";
  const darkModeIcon = document.createElement("div");
  darkModeIcon.id = "dark-mode-icon";
  const darkModeText = document.createElement("div");
  darkModeText.id = "dark-mode-text";
  darkModeText.innerHTML = "Light Mode";
  darkMode.appendChild(darkModeIcon);
  darkMode.appendChild(darkModeText);
  document.body.appendChild(darkMode);
  addListeners();
}
function addListeners() {
  const search = document.getElementById("search");
  const searchButton = document.getElementById("search-button");
  const section = document.getElementById("section");
  const footer = document.getElementById("footer");
  const currentLocationButton = document.getElementById("current-location-button");
  const darkMode = document.getElementById("dark-mode");
  const darkModeText = document.getElementById("dark-mode-text");
  const title = document.getElementById("title");
  darkMode.addEventListener("click", () => {
    let dark = darkModeText.innerHTML === "Dark Mode" ? true : false;
    let primaryColor = dark ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.85)";
    let fontColor = dark ? "rgba(0, 0, 0, 0.85)" : "rgba(255, 255, 255, 0.85)";
    // Dark mode button
    darkModeText.innerHTML = darkModeText.innerHTML === "Dark Mode" ? "Light Mode" : "Dark Mode";
    // Change value of css variables related to font and bg
    document.querySelector(":root").style.setProperty("--font-color", fontColor);
    document.querySelector(":root").style.setProperty("--light-black", primaryColor);
    // Body background color
    document.body.style.backgroundColor = document.body.style.backgroundColor === "rgba(0, 0, 0, 0.9)" ? "white" : "rgba(0, 0, 0, 0.9)";
    title.style.color = title.style.color === "white" ? "black" : "white";
  });
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
    section.style.display = "flex";
    footer.style.display = "grid";
  });
  currentLocationButton.addEventListener("click", () => {
    (0,_content_js__WEBPACK_IMPORTED_MODULE_1__.setLocation)("current");
    // If no location access
    navigator.permissions.query({
      name: "geolocation"
    }).then(result => {
      if (result.state === "denied") {
        alert("Please allow location access to use this feature");
      } else {
        // Empty search bar
        search.value = "";
        section.style.display = "flex";
        footer.style.display = "grid";
      }
    });
    currentLocationButton.disabled = true;
  });

  // Usage button
  document.getElementById("usage").addEventListener("click", () => {
    alert("This application can only be used 3600 times per hour 😏");
  });
}

/***/ }),

/***/ "./src/responsive.js":
/*!***************************!*\
  !*** ./src/responsive.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkState": () => (/* binding */ checkState)
/* harmony export */ });
let x = window.matchMedia("(max-width: 1250px)");
function checkState(x) {
  const weatherCard = document.getElementById("weather-card");
  const iconContainer = document.getElementById("icon-container");
  const weatherInfo = document.getElementById("weather-info");
  const factsContainer = document.getElementById("facts-container");
  if (x.matches) {
    // Re-order elements in weatherCard
    weatherCard.removeChild(iconContainer);
    weatherCard.removeChild(weatherInfo);
    weatherCard.removeChild(factsContainer);
    weatherCard.appendChild(weatherInfo);
    weatherCard.appendChild(iconContainer);
    weatherCard.appendChild(factsContainer);
  } else {
    if (weatherCard.contains(weatherInfo)) {
      weatherCard.removeChild(weatherInfo);
    }
    if (weatherCard.contains(iconContainer)) {
      weatherCard.removeChild(iconContainer);
    }
    if (weatherCard.contains(factsContainer)) {
      weatherCard.removeChild(factsContainer);
    }
    weatherCard.appendChild(iconContainer);
    weatherCard.appendChild(weatherInfo);
    weatherCard.appendChild(factsContainer);
  }
}
x.onchange = checkState; // Attach listener function on state changes

// At H = 150 or W = 350 display error message
let y = window.matchMedia("(max-width: 350px) or (max-height: 150px)");
function displayError(y) {
  if (y.matches) {
    alert("Sorry, your screen is too small to display this page 🥲");
  }
}
y.onchange = displayError; // Attach listener function on state changes

/***/ }),

/***/ "./src/secrets.js":
/*!************************!*\
  !*** ./src/secrets.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "secrets": () => (/* binding */ secrets)
/* harmony export */ });
// API Keys for Open Weather API (Free for all) Encrypted
const secrets = {
  OPENWEATHER: ""
};

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
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! data/info.svg */ "./src/data/info.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! data/dark-mode.svg */ "./src/data/dark-mode.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: \"Cheap Pine\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n\n@font-face {\n  font-family: \"Elza Regular\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n}\n\n:root {\n  --box-shadow: 0px 4px 6px 0px rgba(50, 50, 93, 0.11),\n    0px 1px 3px 0px rgba(0, 0, 0, 0.08);\n  --purple: #9147ff;\n  --light-black: rgba(255, 255, 255, 0.6);\n  --font-color: rgba(0, 0, 0, 0.85);\n}\n\nhtml,\nbody {\n  height: 100%;\n  margin: 0;\n}\n\nbody {\n  display: grid;\n  grid-template-rows: 25% auto min(auto, 10%);\n  gap: 0px;\n}\n\nheader,\nsection {\n  background-color: #fff;\n  box-shadow: var(--box-shadow);\n  margin: 5px;\n  border-radius: 10px;\n}\n\nheader {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  background-size: cover;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n\n#title {\n  font-size: 5rem;\n  font-family: \"Cheap Pine\", cursive;\n  cursor: default;\n  user-select: none;\n}\n\n#search-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  margin-bottom: 10px;\n}\n\n#search {\n  font-size: 13px;\n  font-family: \"Courier New\", Courier, monospace;\n  padding-left: 5px;\n  width: max(200px, 20vw);\n  border-radius: 10px;\n  line-height: 1.5;\n  transition: box-shadow 100ms ease-in, border 100ms ease-in,\n    background-color 100ms ease-in;\n  border: 2px solid #dee1e2;\n  color: rgb(14, 14, 16);\n  background: #dee1e2;\n  opacity: 90%;\n}\n\n#search:hover {\n  border-color: #ccc;\n}\n#search:focus {\n  outline: none;\n  border-color: var(--purple);\n  background: #fff;\n  opacity: 100%;\n}\n\n#search::placeholder {\n  color: #ccc;\n  font-weight: 900;\n}\n\n#button-container {\n  display: flex;\n  flex-direction: row;\n  gap: 10px;\n}\n\n#search-button,\n#current-location-button {\n  display: inline-block;\n  outline: 0;\n  border: none;\n  cursor: pointer;\n  font-weight: 600;\n  border-radius: 10px;\n  font-size: 13px;\n  height: 30px;\n  width: max(100px, 10vw);\n  background-color: var(--purple);\n  color: white;\n  padding: 0 10px;\n  opacity: 90%;\n}\n\n#search-button:hover,\n#current-location-button:hover {\n  background-color: var(--purple);\n  opacity: 100%;\n}\n\n#search-button:disabled,\n#current-location-button:disabled {\n  background-color: #ccc;\n  cursor: not-allowed;\n}\n\nsection {\n  display: none;\n  flex-direction: column;\n  align-items: center;\n  background-size: cover;\n  padding: 15px;\n  gap: 10px;\n}\n\n#weather-card {\n  width: 90%;\n  display: grid;\n  grid-template-columns: auto auto auto;\n  gap: 10px;\n  height: fit-content;\n  min-width: max-content;\n}\n\n#weather-info {\n  color: rgba(255, 255, 255, 0.85);\n}\n\n#weather-info,\n#icon-container,\n#facts-container {\n  display: none;\n  flex-direction: column;\n  justify-content: center;\n  gap: 5px;\n  align-items: center;\n  border-radius: 10px;\n  margin: 5px;\n  padding: 15px;\n  font-family: \"Elza Regular\", cursive;\n  box-shadow: var(--box-shadow);\n  text-align: center;\n  font-size: 1.2rem;\n  opacity: 85%;\n}\n\n#icon-container,\n#facts-container {\n  color: var(--font-color);\n}\n\n#weather-info:hover {\n  opacity: 100%;\n}\n\n#icon-container,\n#facts-container {\n  background-color: var(--light-black);\n}\n\n#icon-container:hover,\n#facts-container:hover,\n#forecast-card > div:hover {\n  opacity: 100%;\n}\n\n#weather-location,\n#weather-temp {\n  font-weight: 700;\n  font-size: 2rem;\n}\n\n#additional-info {\n  font-size: 1rem;\n}\n\n#forecast-card {\n  width: 90%;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 10px;\n  height: fit-content;\n  min-width: max-content;\n}\n\n#forecast-card > div {\n  display: none;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border-radius: 10px;\n  margin: 5px;\n  padding: 15px;\n  font-family: \"Elza Regular\", cursive;\n  color: var(--font-color);\n  background-color: var(--light-black);\n  box-shadow: var(--box-shadow);\n  text-align: center;\n  font-size: 1rem;\n  opacity: 85%;\n}\n\n#forecast-card > div > img {\n  width: 50px;\n  height: 50px;\n}\n\n.forecast-temp {\n  font-weight: 700;\n  font-size: 1rem;\n}\n\nfooter {\n  color: var(--font-color);\n  background-color: var(--light-black);\n  justify-self: center;\n  width: fit-content;\n  display: none;\n  grid-template-columns: 1fr 1fr 1fr;\n  align-items: center;\n  gap: 10px;\n  font-family: \"Elza Regular\", cursive;\n  box-shadow: var(--box-shadow);\n  height: max-content;\n  border-radius: 10px;\n  margin: 5px;\n  padding: 15px;\n  cursor: default;\n  user-select: none;\n}\n\n/* No children of footer will have margin/padding */\nfooter > * {\n  margin: 0;\n  padding: 0;\n}\n\nfooter:hover {\n  outline: 2px solid var(--purple);\n  outline-offset: 2px;\n  transform: scale(1.01);\n}\n\n#credits {\n  text-align: left;\n  margin-left: 10px;\n}\n\n#credits > a,\n#credits > a:visited,\n#info > a,\n#info > a:visited {\n  text-decoration: none;\n  color: var(--purple);\n}\n\n#purple {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: row;\n  gap: 5px;\n  cursor: default;\n}\n\n#github-image {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n  background-size: cover;\n  width: 20px;\n  height: 20px;\n}\n\n#github-image:hover,\n#info-image:hover {\n  rotate: 360deg;\n  transform: scale(1.1);\n  transition: 0.5s;\n}\n\n#info {\n  display: grid;\n  grid-template-columns: auto auto;\n  justify-content: end;\n  align-items: center;\n  margin-right: 10px;\n}\n\n#usage {\n  display: flex;\n  gap: 2px;\n  align-items: center;\n  cursor: pointer;\n}\n\n#info-image {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ");\n  background-size: cover;\n  width: 25px;\n  height: 25px;\n}\n\n#dark-mode {\n  position: absolute;\n  top: 15px;\n  left: 15px;\n  border-radius: 10px;\n  cursor: pointer;\n  padding: 5px;\n  color: #fff;\n  background: rgba(0, 0, 0, 0.5);\n  box-shadow: var(--box-shadow);\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  user-select: none;\n}\n\n#dark-mode-icon {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ");\n  background-size: cover;\n  width: 20px;\n  height: 20px;\n}\n\n@media screen and (max-width: 1250px) {\n  body {\n    grid-template-rows: 25% auto auto;\n    grid-template-columns: 100%;\n  }\n  #title {\n    font-size: min(4.25rem, 375%);\n  }\n  #search-button,\n  #current-location-button {\n    font-size: 12px;\n    padding: 1px;\n  }\n  #weather-card {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n  }\n  #weather-card > div {\n    width: 90%;\n  }\n  #weather-info > * {\n    font-size: min(25px, 150%);\n  }\n  footer {\n    grid-template-columns: auto;\n  }\n  #info,\n  #credits {\n    display: none;\n  }\n}\n\n@media screen and (max-height: 550px) {\n  body {\n    grid-template-rows: 45% auto auto;\n    grid-template-columns: 100%;\n  }\n}\n\n@media screen and (max-height: 300px) {\n  header {\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n  }\n  #search-container {\n    margin: 0px;\n    gap: 1px;\n  }\n}\n\n/* Disable for small screens:  */\n@media screen and (max-width: 350px) {\n  html {\n    background-color: #9147ff;\n  }\n  body {\n    display: none;\n  }\n}\n\n@media screen and (max-height: 150px) {\n  html {\n    background-color: #9147ff;\n  }\n  body {\n    display: none;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["@font-face {\n  font-family: \"Cheap Pine\";\n  src: url(data/Cheap\\ Pine\\ Regular.ttf);\n}\n\n@font-face {\n  font-family: \"Elza Regular\";\n  src: url(data/Elza\\ Regular.ttf);\n}\n\n:root {\n  --box-shadow: 0px 4px 6px 0px rgba(50, 50, 93, 0.11),\n    0px 1px 3px 0px rgba(0, 0, 0, 0.08);\n  --purple: #9147ff;\n  --light-black: rgba(255, 255, 255, 0.6);\n  --font-color: rgba(0, 0, 0, 0.85);\n}\n\nhtml,\nbody {\n  height: 100%;\n  margin: 0;\n}\n\nbody {\n  display: grid;\n  grid-template-rows: 25% auto min(auto, 10%);\n  gap: 0px;\n}\n\nheader,\nsection {\n  background-color: #fff;\n  box-shadow: var(--box-shadow);\n  margin: 5px;\n  border-radius: 10px;\n}\n\nheader {\n  background-image: url(data/weather.svg);\n  background-size: cover;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n\n#title {\n  font-size: 5rem;\n  font-family: \"Cheap Pine\", cursive;\n  cursor: default;\n  user-select: none;\n}\n\n#search-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  margin-bottom: 10px;\n}\n\n#search {\n  font-size: 13px;\n  font-family: \"Courier New\", Courier, monospace;\n  padding-left: 5px;\n  width: max(200px, 20vw);\n  border-radius: 10px;\n  line-height: 1.5;\n  transition: box-shadow 100ms ease-in, border 100ms ease-in,\n    background-color 100ms ease-in;\n  border: 2px solid #dee1e2;\n  color: rgb(14, 14, 16);\n  background: #dee1e2;\n  opacity: 90%;\n}\n\n#search:hover {\n  border-color: #ccc;\n}\n#search:focus {\n  outline: none;\n  border-color: var(--purple);\n  background: #fff;\n  opacity: 100%;\n}\n\n#search::placeholder {\n  color: #ccc;\n  font-weight: 900;\n}\n\n#button-container {\n  display: flex;\n  flex-direction: row;\n  gap: 10px;\n}\n\n#search-button,\n#current-location-button {\n  display: inline-block;\n  outline: 0;\n  border: none;\n  cursor: pointer;\n  font-weight: 600;\n  border-radius: 10px;\n  font-size: 13px;\n  height: 30px;\n  width: max(100px, 10vw);\n  background-color: var(--purple);\n  color: white;\n  padding: 0 10px;\n  opacity: 90%;\n}\n\n#search-button:hover,\n#current-location-button:hover {\n  background-color: var(--purple);\n  opacity: 100%;\n}\n\n#search-button:disabled,\n#current-location-button:disabled {\n  background-color: #ccc;\n  cursor: not-allowed;\n}\n\nsection {\n  display: none;\n  flex-direction: column;\n  align-items: center;\n  background-size: cover;\n  padding: 15px;\n  gap: 10px;\n}\n\n#weather-card {\n  width: 90%;\n  display: grid;\n  grid-template-columns: auto auto auto;\n  gap: 10px;\n  height: fit-content;\n  min-width: max-content;\n}\n\n#weather-info {\n  color: rgba(255, 255, 255, 0.85);\n}\n\n#weather-info,\n#icon-container,\n#facts-container {\n  display: none;\n  flex-direction: column;\n  justify-content: center;\n  gap: 5px;\n  align-items: center;\n  border-radius: 10px;\n  margin: 5px;\n  padding: 15px;\n  font-family: \"Elza Regular\", cursive;\n  box-shadow: var(--box-shadow);\n  text-align: center;\n  font-size: 1.2rem;\n  opacity: 85%;\n}\n\n#icon-container,\n#facts-container {\n  color: var(--font-color);\n}\n\n#weather-info:hover {\n  opacity: 100%;\n}\n\n#icon-container,\n#facts-container {\n  background-color: var(--light-black);\n}\n\n#icon-container:hover,\n#facts-container:hover,\n#forecast-card > div:hover {\n  opacity: 100%;\n}\n\n#weather-location,\n#weather-temp {\n  font-weight: 700;\n  font-size: 2rem;\n}\n\n#additional-info {\n  font-size: 1rem;\n}\n\n#forecast-card {\n  width: 90%;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 10px;\n  height: fit-content;\n  min-width: max-content;\n}\n\n#forecast-card > div {\n  display: none;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border-radius: 10px;\n  margin: 5px;\n  padding: 15px;\n  font-family: \"Elza Regular\", cursive;\n  color: var(--font-color);\n  background-color: var(--light-black);\n  box-shadow: var(--box-shadow);\n  text-align: center;\n  font-size: 1rem;\n  opacity: 85%;\n}\n\n#forecast-card > div > img {\n  width: 50px;\n  height: 50px;\n}\n\n.forecast-temp {\n  font-weight: 700;\n  font-size: 1rem;\n}\n\nfooter {\n  color: var(--font-color);\n  background-color: var(--light-black);\n  justify-self: center;\n  width: fit-content;\n  display: none;\n  grid-template-columns: 1fr 1fr 1fr;\n  align-items: center;\n  gap: 10px;\n  font-family: \"Elza Regular\", cursive;\n  box-shadow: var(--box-shadow);\n  height: max-content;\n  border-radius: 10px;\n  margin: 5px;\n  padding: 15px;\n  cursor: default;\n  user-select: none;\n}\n\n/* No children of footer will have margin/padding */\nfooter > * {\n  margin: 0;\n  padding: 0;\n}\n\nfooter:hover {\n  outline: 2px solid var(--purple);\n  outline-offset: 2px;\n  transform: scale(1.01);\n}\n\n#credits {\n  text-align: left;\n  margin-left: 10px;\n}\n\n#credits > a,\n#credits > a:visited,\n#info > a,\n#info > a:visited {\n  text-decoration: none;\n  color: var(--purple);\n}\n\n#purple {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: row;\n  gap: 5px;\n  cursor: default;\n}\n\n#github-image {\n  background-image: url(data/github.svg);\n  background-size: cover;\n  width: 20px;\n  height: 20px;\n}\n\n#github-image:hover,\n#info-image:hover {\n  rotate: 360deg;\n  transform: scale(1.1);\n  transition: 0.5s;\n}\n\n#info {\n  display: grid;\n  grid-template-columns: auto auto;\n  justify-content: end;\n  align-items: center;\n  margin-right: 10px;\n}\n\n#usage {\n  display: flex;\n  gap: 2px;\n  align-items: center;\n  cursor: pointer;\n}\n\n#info-image {\n  background-image: url(data/info.svg);\n  background-size: cover;\n  width: 25px;\n  height: 25px;\n}\n\n#dark-mode {\n  position: absolute;\n  top: 15px;\n  left: 15px;\n  border-radius: 10px;\n  cursor: pointer;\n  padding: 5px;\n  color: #fff;\n  background: rgba(0, 0, 0, 0.5);\n  box-shadow: var(--box-shadow);\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  user-select: none;\n}\n\n#dark-mode-icon {\n  background: url(data/dark-mode.svg);\n  background-size: cover;\n  width: 20px;\n  height: 20px;\n}\n\n@media screen and (max-width: 1250px) {\n  body {\n    grid-template-rows: 25% auto auto;\n    grid-template-columns: 100%;\n  }\n  #title {\n    font-size: min(4.25rem, 375%);\n  }\n  #search-button,\n  #current-location-button {\n    font-size: 12px;\n    padding: 1px;\n  }\n  #weather-card {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n  }\n  #weather-card > div {\n    width: 90%;\n  }\n  #weather-info > * {\n    font-size: min(25px, 150%);\n  }\n  footer {\n    grid-template-columns: auto;\n  }\n  #info,\n  #credits {\n    display: none;\n  }\n}\n\n@media screen and (max-height: 550px) {\n  body {\n    grid-template-rows: 45% auto auto;\n    grid-template-columns: 100%;\n  }\n}\n\n@media screen and (max-height: 300px) {\n  header {\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n  }\n  #search-container {\n    margin: 0px;\n    gap: 1px;\n  }\n}\n\n/* Disable for small screens:  */\n@media screen and (max-width: 350px) {\n  html {\n    background-color: #9147ff;\n  }\n  body {\n    display: none;\n  }\n}\n\n@media screen and (max-height: 150px) {\n  html {\n    background-color: #9147ff;\n  }\n  body {\n    display: none;\n  }\n}\n"],"sourceRoot":""}]);
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

/***/ "./node_modules/topbar/topbar.min.js":
/*!*******************************************!*\
  !*** ./node_modules/topbar/topbar.min.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * @license MIT
 * topbar 1.0.0, 2021-01-06
 * http://buunguyen.github.io/topbar
 * Copyright (c) 2021 Buu Nguyen
 */
(function(window,document){"use strict";!function(){for(var lastTime=0,vendors=["ms","moz","webkit","o"],x=0;x<vendors.length&&!window.requestAnimationFrame;++x)window.requestAnimationFrame=window[vendors[x]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[vendors[x]+"CancelAnimationFrame"]||window[vendors[x]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(callback,element){var currTime=(new Date).getTime(),timeToCall=Math.max(0,16-(currTime-lastTime)),id=window.setTimeout(function(){callback(currTime+timeToCall)},timeToCall);return lastTime=currTime+timeToCall,id}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(id){clearTimeout(id)})}();function repaint(){canvas.width=window.innerWidth,canvas.height=5*options.barThickness;var ctx=canvas.getContext("2d");ctx.shadowBlur=options.shadowBlur,ctx.shadowColor=options.shadowColor;var stop,lineGradient=ctx.createLinearGradient(0,0,canvas.width,0);for(stop in options.barColors)lineGradient.addColorStop(stop,options.barColors[stop]);ctx.lineWidth=options.barThickness,ctx.beginPath(),ctx.moveTo(0,options.barThickness/2),ctx.lineTo(Math.ceil(currentProgress*canvas.width),options.barThickness/2),ctx.strokeStyle=lineGradient,ctx.stroke()}var canvas,progressTimerId,fadeTimerId,currentProgress,showing,options={autoRun:!0,barThickness:3,barColors:{0:"rgba(26,  188, 156, .9)",".25":"rgba(52,  152, 219, .9)",".50":"rgba(241, 196, 15,  .9)",".75":"rgba(230, 126, 34,  .9)","1.0":"rgba(211, 84,  0,   .9)"},shadowBlur:10,shadowColor:"rgba(0,   0,   0,   .6)",className:null},topbar={config:function(opts){for(var key in opts)options.hasOwnProperty(key)&&(options[key]=opts[key])},show:function(){var type,handler,elem;showing||(showing=!0,null!==fadeTimerId&&window.cancelAnimationFrame(fadeTimerId),canvas||((elem=(canvas=document.createElement("canvas")).style).position="fixed",elem.top=elem.left=elem.right=elem.margin=elem.padding=0,elem.zIndex=100001,elem.display="none",options.className&&canvas.classList.add(options.className),document.body.appendChild(canvas),type="resize",handler=repaint,(elem=window).addEventListener?elem.addEventListener(type,handler,!1):elem.attachEvent?elem.attachEvent("on"+type,handler):elem["on"+type]=handler),canvas.style.opacity=1,canvas.style.display="block",topbar.progress(0),options.autoRun&&function loop(){progressTimerId=window.requestAnimationFrame(loop),topbar.progress("+"+.05*Math.pow(1-Math.sqrt(currentProgress),2))}())},progress:function(to){return void 0===to||("string"==typeof to&&(to=(0<=to.indexOf("+")||0<=to.indexOf("-")?currentProgress:0)+parseFloat(to)),currentProgress=1<to?1:to,repaint()),currentProgress},hide:function(){showing&&(showing=!1,null!=progressTimerId&&(window.cancelAnimationFrame(progressTimerId),progressTimerId=null),function loop(){return 1<=topbar.progress("+.1")&&(canvas.style.opacity-=.05,canvas.style.opacity<=.05)?(canvas.style.display="none",void(fadeTimerId=null)):void(fadeTimerId=window.requestAnimationFrame(loop))}())}}; true&&"object"==typeof module.exports?module.exports=topbar: true?!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return topbar}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):0}).call(this,window,document);

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

/***/ "./src/data/dark-mode.svg":
/*!********************************!*\
  !*** ./src/data/dark-mode.svg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "fef769e3cfa5adcf4bf2.svg";

/***/ }),

/***/ "./src/data/github.svg":
/*!*****************************!*\
  !*** ./src/data/github.svg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "f04923d3c4b353290b4f.svg";

/***/ }),

/***/ "./src/data/info.svg":
/*!***************************!*\
  !*** ./src/data/info.svg ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "be4697898e1199241c11.svg";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFPLE9BQU8sVUFBVSxNQUFNLE1BQU0sWUFBWSxXQUFXLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxVQUFVLFVBQVUsWUFBWSxPQUFPLFlBQVksTUFBTSxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxRQUFRLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsTUFBTSxNQUFNLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxNQUFNLEtBQUssS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksTUFBTSxNQUFNLFVBQVUsVUFBVSxLQUFLLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxLQUFLLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLE1BQU0sVUFBVSxLQUFLLE1BQU0sS0FBSyxLQUFLLFlBQVksYUFBYSxNQUFNLE1BQU0sS0FBSyxLQUFLLFVBQVUsWUFBWSxhQUFhLE1BQU0sS0FBSyxVQUFVLFVBQVUsS0FBSyxNQUFNLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFVBQVUsS0FBSyxNQUFNLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxVQUFVLEtBQUsscUNBQXFDLGdDQUFnQyw4Q0FBOEMsR0FBRyxnQkFBZ0Isa0NBQWtDLHNDQUFzQyxHQUFHLFdBQVcsbUdBQW1HLHNCQUFzQiw0Q0FBNEMsc0NBQXNDLEdBQUcsaUJBQWlCLGlCQUFpQixjQUFjLEdBQUcsVUFBVSxrQkFBa0IsZ0RBQWdELGFBQWEsR0FBRyxzQkFBc0IsMkJBQTJCLGtDQUFrQyxnQkFBZ0Isd0JBQXdCLEdBQUcsWUFBWSw0Q0FBNEMsMkJBQTJCLGtCQUFrQix3QkFBd0IsNEJBQTRCLDJCQUEyQixHQUFHLFlBQVksb0JBQW9CLHlDQUF5QyxvQkFBb0Isc0JBQXNCLEdBQUcsdUJBQXVCLGtCQUFrQiwyQkFBMkIsd0JBQXdCLDRCQUE0QixjQUFjLHdCQUF3QixHQUFHLGFBQWEsb0JBQW9CLHFEQUFxRCxzQkFBc0IsNEJBQTRCLHdCQUF3QixxQkFBcUIsb0dBQW9HLDhCQUE4QiwyQkFBMkIsd0JBQXdCLGlCQUFpQixHQUFHLG1CQUFtQix1QkFBdUIsR0FBRyxpQkFBaUIsa0JBQWtCLGdDQUFnQyxxQkFBcUIsa0JBQWtCLEdBQUcsMEJBQTBCLGdCQUFnQixxQkFBcUIsR0FBRyx1QkFBdUIsa0JBQWtCLHdCQUF3QixjQUFjLEdBQUcsK0NBQStDLDBCQUEwQixlQUFlLGlCQUFpQixvQkFBb0IscUJBQXFCLHdCQUF3QixvQkFBb0IsaUJBQWlCLDRCQUE0QixvQ0FBb0MsaUJBQWlCLG9CQUFvQixpQkFBaUIsR0FBRywyREFBMkQsb0NBQW9DLGtCQUFrQixHQUFHLGlFQUFpRSwyQkFBMkIsd0JBQXdCLEdBQUcsYUFBYSxrQkFBa0IsMkJBQTJCLHdCQUF3QiwyQkFBMkIsa0JBQWtCLGNBQWMsR0FBRyxtQkFBbUIsZUFBZSxrQkFBa0IsMENBQTBDLGNBQWMsd0JBQXdCLDJCQUEyQixHQUFHLG1CQUFtQixxQ0FBcUMsR0FBRyx3REFBd0Qsa0JBQWtCLDJCQUEyQiw0QkFBNEIsYUFBYSx3QkFBd0Isd0JBQXdCLGdCQUFnQixrQkFBa0IsMkNBQTJDLGtDQUFrQyx1QkFBdUIsc0JBQXNCLGlCQUFpQixHQUFHLHdDQUF3Qyw2QkFBNkIsR0FBRyx5QkFBeUIsa0JBQWtCLEdBQUcsd0NBQXdDLHlDQUF5QyxHQUFHLGlGQUFpRixrQkFBa0IsR0FBRyx1Q0FBdUMscUJBQXFCLG9CQUFvQixHQUFHLHNCQUFzQixvQkFBb0IsR0FBRyxvQkFBb0IsZUFBZSxrQkFBa0IsZ0VBQWdFLGNBQWMsd0JBQXdCLDJCQUEyQixHQUFHLDBCQUEwQixrQkFBa0IsMkJBQTJCLDRCQUE0Qix3QkFBd0Isd0JBQXdCLGdCQUFnQixrQkFBa0IsMkNBQTJDLDZCQUE2Qix5Q0FBeUMsa0NBQWtDLHVCQUF1QixvQkFBb0IsaUJBQWlCLEdBQUcsZ0NBQWdDLGdCQUFnQixpQkFBaUIsR0FBRyxvQkFBb0IscUJBQXFCLG9CQUFvQixHQUFHLFlBQVksNkJBQTZCLHlDQUF5Qyx5QkFBeUIsdUJBQXVCLGtCQUFrQix1Q0FBdUMsd0JBQXdCLGNBQWMsMkNBQTJDLGtDQUFrQyx3QkFBd0Isd0JBQXdCLGdCQUFnQixrQkFBa0Isb0JBQW9CLHNCQUFzQixHQUFHLHNFQUFzRSxjQUFjLGVBQWUsR0FBRyxrQkFBa0IscUNBQXFDLHdCQUF3QiwyQkFBMkIsR0FBRyxjQUFjLHFCQUFxQixzQkFBc0IsR0FBRyx5RUFBeUUsMEJBQTBCLHlCQUF5QixHQUFHLGFBQWEsa0JBQWtCLHdCQUF3Qiw0QkFBNEIsd0JBQXdCLGFBQWEsb0JBQW9CLEdBQUcsbUJBQW1CLDJDQUEyQywyQkFBMkIsZ0JBQWdCLGlCQUFpQixHQUFHLDZDQUE2QyxtQkFBbUIsMEJBQTBCLHFCQUFxQixHQUFHLFdBQVcsa0JBQWtCLHFDQUFxQyx5QkFBeUIsd0JBQXdCLHVCQUF1QixHQUFHLFlBQVksa0JBQWtCLGFBQWEsd0JBQXdCLG9CQUFvQixHQUFHLGlCQUFpQix5Q0FBeUMsMkJBQTJCLGdCQUFnQixpQkFBaUIsR0FBRyxnQkFBZ0IsdUJBQXVCLGNBQWMsZUFBZSx3QkFBd0Isb0JBQW9CLGlCQUFpQixnQkFBZ0IsbUNBQW1DLGtDQUFrQyxlQUFlLGtCQUFrQix3QkFBd0IsYUFBYSxzQkFBc0IsR0FBRyxxQkFBcUIsd0NBQXdDLDJCQUEyQixnQkFBZ0IsaUJBQWlCLEdBQUcsMkNBQTJDLFVBQVUsd0NBQXdDLGtDQUFrQyxLQUFLLFlBQVksb0NBQW9DLEtBQUssaURBQWlELHNCQUFzQixtQkFBbUIsS0FBSyxtQkFBbUIsb0JBQW9CLDZCQUE2Qiw4QkFBOEIsMEJBQTBCLEtBQUsseUJBQXlCLGlCQUFpQixLQUFLLHVCQUF1QixpQ0FBaUMsS0FBSyxZQUFZLGtDQUFrQyxLQUFLLHdCQUF3QixvQkFBb0IsS0FBSyxHQUFHLDJDQUEyQyxVQUFVLHdDQUF3QyxrQ0FBa0MsS0FBSyxHQUFHLDJDQUEyQyxZQUFZLG9CQUFvQiwwQkFBMEIsOEJBQThCLEtBQUssdUJBQXVCLGtCQUFrQixlQUFlLEtBQUssR0FBRyw2RUFBNkUsVUFBVSxnQ0FBZ0MsS0FBSyxVQUFVLG9CQUFvQixLQUFLLEdBQUcsMkNBQTJDLFVBQVUsZ0NBQWdDLEtBQUssVUFBVSxvQkFBb0IsS0FBSyxHQUFHLHFCQUFxQjtBQUN6cmtCO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7OztBQ3BCMUI7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQSxxRkFBcUY7QUFDckY7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGlCQUFpQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIscUJBQXFCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNGQUFzRixxQkFBcUI7QUFDM0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLGlEQUFpRCxxQkFBcUI7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNEQUFzRCxxQkFBcUI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUNwRmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN6QmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZEEsTUFBK0Y7QUFDL0YsTUFBcUY7QUFDckYsTUFBNEY7QUFDNUYsTUFBK0c7QUFDL0csTUFBd0c7QUFDeEcsTUFBd0c7QUFDeEcsTUFBbUc7QUFDbkc7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyxzRkFBTzs7OztBQUk2QztBQUNyRSxPQUFPLGlFQUFlLHNGQUFPLElBQUksNkZBQWMsR0FBRyw2RkFBYyxZQUFZLEVBQUM7Ozs7Ozs7Ozs7OztBQzFCaEU7O0FBRWI7O0FBRUE7QUFDQTs7QUFFQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxxQkFBcUIsNkJBQTZCO0FBQ2xEOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN2R2E7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0RBQXNEOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ3RDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUNWYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7O0FBRWpGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ1hhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEQUFrRDtBQUNsRDs7QUFFQTtBQUNBLDBDQUEwQztBQUMxQzs7QUFFQTs7QUFFQTtBQUNBLGlGQUFpRjtBQUNqRjs7QUFFQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RCxJQUFJOztBQUVKOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsYUFBYSxZQUFZLHlEQUF5RCxnREFBZ0Qsb01BQW9NLHVGQUF1RixnSEFBZ0gsOEJBQThCLGFBQWEsdUNBQXVDLHlFQUF5RSxpQkFBaUIsRUFBRSxHQUFHLG1CQUFtQixvRUFBb0UsZ0NBQWdDLHNFQUFzRSxtRUFBbUUsc0ZBQXNGLDZNQUE2TSx3RUFBd0UscUNBQXFDLDRKQUE0SixvRUFBb0UsU0FBUyxzQkFBc0IsMEVBQTBFLGlCQUFpQixzQkFBc0IsMG5CQUEwbkIscUhBQXFILElBQUksdUJBQXVCLDhLQUE4SyxpQkFBaUIsZ0lBQWdJLGtNQUFrTSxNQUFNLEtBQXVCLHdEQUF3RCxLQUFxQyxDQUFDLG1DQUFPLFdBQVcsY0FBYztBQUFBLGtHQUFDLENBQUMsQ0FBa0IsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2FzeW5jLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2NvbnRlbnQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbGF5b3V0LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3Jlc3BvbnNpdmUuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc2VjcmV0cy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvdG9wYmFyL3RvcGJhci5taW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2VjcmV0cyB9IGZyb20gXCIuL3NlY3JldHMuanNcIjtcblxuY29uc3QgT1dfQVBJX0tFWSA9IHNlY3JldHMuT1BFTldFQVRIRVI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaFdlYXRoZXIocGxhY2UpIHtcbiAgLy8gSWYgbnVtYmVyIG9mIHBhcmFtcyBpcyAyLCB0aGVuIGl0IGlzIGxhdCBhbmQgbG9uXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCB3ZWF0aGVyID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9sYXQ9JHthcmd1bWVudHNbMF19Jmxvbj0ke2FyZ3VtZW50c1sxXX0mYXBwaWQ9JHtPV19BUElfS0VZfSZ1bml0cz1tZXRyaWNgLFxuICAgICAgICB7IG1vZGU6IFwiY29yc1wiIH1cbiAgICAgICk7XG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IHdlYXRoZXIuanNvbigpO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gZmV0Y2hpbmcgd2VhdGhlciBcIiArIGVycm9yKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgd2VhdGhlciA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke3BsYWNlfSZhcHBpZD0ke09XX0FQSV9LRVl9JnVuaXRzPW1ldHJpY2AsXG4gICAgICAgIHsgbW9kZTogXCJjb3JzXCIgfVxuICAgICAgKTtcbiAgICAgIGxldCBkYXRhID0gYXdhaXQgd2VhdGhlci5qc29uKCk7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coXCJFcnJvciBpbiBmZXRjaGluZyB3ZWF0aGVyIFwiICsgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hGb3JlY2FzdChwbGFjZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZm9yZWNhc3QgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9sYXQ9JHthcmd1bWVudHNbMF19Jmxvbj0ke2FyZ3VtZW50c1sxXX0mYXBwaWQ9JHtPV19BUElfS0VZfSZ1bml0cz1tZXRyaWNgLFxuICAgICAgICB7IG1vZGU6IFwiY29yc1wiIH1cbiAgICAgICk7XG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IGZvcmVjYXN0Lmpzb24oKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGluIGZldGNoaW5nIGZvcmVjYXN0IFwiICsgZXJyb3IpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBmb3JlY2FzdCA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtwbGFjZX0mYXBwaWQ9JHtPV19BUElfS0VZfSZ1bml0cz1tZXRyaWNgLFxuICAgICAgICB7IG1vZGU6IFwiY29yc1wiIH1cbiAgICAgICk7XG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IGZvcmVjYXN0Lmpzb24oKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGluIGZldGNoaW5nIGZvcmVjYXN0IFwiICsgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hXZWF0aGVySWNvbihjb2RlKSB7XG4gIHRyeSB7XG4gICAgbGV0IGljb24gPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3cvJHtjb2RlfS5wbmdgLCB7XG4gICAgICBtb2RlOiBcImNvcnNcIixcbiAgICB9KTtcbiAgICByZXR1cm4gaWNvbjtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhcIkVycm9yIGluIGZldGNoaW5nIGljb24gXCIgKyBlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoQ291bnRyeU5hbWUoY29kZSkge1xuICB0cnkge1xuICAgIGxldCBjb3VudHJ5ID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly9hcGkud29ybGRiYW5rLm9yZy92Mi9jb3VudHJ5LyR7Y29kZX0/Zm9ybWF0PWpzb25gLFxuICAgICAgeyBtb2RlOiBcImNvcnNcIiB9XG4gICAgKTtcbiAgICBsZXQgZGF0YSA9IGF3YWl0IGNvdW50cnkuanNvbigpO1xuICAgIHJldHVybiBkYXRhWzFdWzBdLm5hbWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coXCJFcnJvciBpbiBmZXRjaGluZyBjb3VudHJ5IG5hbWUgXCIgKyBlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoV2VhdGhlckJhY2tncm91bmQocGxhY2UpIHtcbiAgdHJ5IHtcbiAgICBsZXQgYmFja2dyb3VuZCA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vc291cmNlLnVuc3BsYXNoLmNvbS8xNjAweDQ1MC8/TW9udW1lbnRzLFRvdXJpc20sUGxhY2VzLCR7cGxhY2V9YFxuICAgICk7XG4gICAgcmV0dXJuIGJhY2tncm91bmQ7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coXCJFcnJvciBpbiBmZXRjaGluZyBiYWNrZ3JvdW5kIFwiICsgZXJyb3IpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBmZXRjaFdlYXRoZXIsXG4gIGZldGNoV2VhdGhlckljb24sXG4gIGZldGNoV2VhdGhlckJhY2tncm91bmQsXG4gIGZldGNoQ291bnRyeU5hbWUsXG4gIGZldGNoRm9yZWNhc3QsXG59IGZyb20gXCIuL2FzeW5jLmpzXCI7XG5cbi8vIExvYWRpbmcgYmFyXG5jb25zdCB0b3BiYXIgPSByZXF1aXJlKFwidG9wYmFyXCIpO1xudG9wYmFyLmNvbmZpZyh7XG4gIGF1dG9SdW46IGZhbHNlLFxuICBiYXJUaGlja25lc3M6IDMsXG4gIGJhckNvbG9yczoge1xuICAgIDA6IFwicmdiYSgyNiwgIDE4OCwgMTU2LCAuOSlcIixcbiAgICBcIi4yNVwiOiBcInJnYmEoNTIsICAxNTIsIDIxOSwgLjkpXCIsXG4gICAgXCIuNTBcIjogXCJyZ2JhKDI0MSwgMTk2LCAxNSwgIC45KVwiLFxuICAgIFwiLjc1XCI6IFwicmdiYSgyMzAsIDEyNiwgMzQsICAuOSlcIixcbiAgICBcIjEuMFwiOiBcInJnYmEoMjExLCA4NCwgIDAsICAgLjkpXCIsXG4gIH0sXG4gIHNoYWRvd0JsdXI6IDEwLFxuICBzaGFkb3dDb2xvcjogXCJyZ2JhKDAsICAgMCwgICAwLCAgIC42KVwiLFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRMb2NhdGlvbih0eXBlKSB7XG4gIGNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoXCIpO1xuICBsZXQgcGxhY2UgPSBzZWFyY2gudmFsdWU7XG4gIGlmICh0eXBlID09PSBcInNlYXJjaFwiKSB7XG4gICAgdG9wYmFyLnNob3coKTtcbiAgICBmZXRjaFdlYXRoZXIocGxhY2UpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgdG9wYmFyLnByb2dyZXNzKDAuNSk7XG4gICAgICAgIGlmIChkYXRhLmNvZCA9PT0gMjAwKSB7XG4gICAgICAgICAgLy8gTGVmdCBjYXJkXG4gICAgICAgICAgbGV0IGljb24gPSBkYXRhLndlYXRoZXJbMF0uaWNvbjtcbiAgICAgICAgICBsZXQgZmVlbHNMaWtlID0gZGF0YS5tYWluLmZlZWxzX2xpa2U7XG4gICAgICAgICAgbGV0IG1pbiA9IGRhdGEubWFpbi50ZW1wX21pbjtcbiAgICAgICAgICBsZXQgbWF4ID0gZGF0YS5tYWluLnRlbXBfbWF4O1xuICAgICAgICAgIGxldCBtaW5tYXggPSBbbWluLCBtYXhdO1xuICAgICAgICAgIC8vIE1pZGRsZSBjYXJkXG4gICAgICAgICAgbGV0IGxvY2F0aW9uID0gW2RhdGEubmFtZSwgZGF0YS5zeXMuY291bnRyeV07XG4gICAgICAgICAgbGV0IHRlbXBlcmF0dXJlID0gZGF0YS5tYWluLnRlbXA7XG4gICAgICAgICAgbGV0IGRlc2NyaXB0aW9uID1cbiAgICAgICAgICAgIGRhdGEud2VhdGhlclswXS5tYWluICtcbiAgICAgICAgICAgIFwiOiBcIiArXG4gICAgICAgICAgICBkYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb24uY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgK1xuICAgICAgICAgICAgZGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLnNsaWNlKDEpO1xuICAgICAgICAgIC8vIFJpZ2h0IGNhcmRcbiAgICAgICAgICBsZXQgc3VucmlzZSA9IGRhdGEuc3lzLnN1bnJpc2U7XG4gICAgICAgICAgbGV0IHN1bnNldCA9IGRhdGEuc3lzLnN1bnNldDtcbiAgICAgICAgICBsZXQgdmlzaWJpbGl0eSA9IGRhdGEudmlzaWJpbGl0eTtcbiAgICAgICAgICBsZXQgd2luZHNwZWVkID0gZGF0YS53aW5kLnNwZWVkO1xuICAgICAgICAgIGxldCBodW1pZGl0eSA9IGRhdGEubWFpbi5odW1pZGl0eTtcbiAgICAgICAgICBsZXQgcHJlc3N1cmUgPSBkYXRhLm1haW4ucHJlc3N1cmU7XG4gICAgICAgICAgbGV0IHN1biA9IFtzdW5yaXNlLCBzdW5zZXRdO1xuICAgICAgICAgIGxldCBodW1pZGl0eUFuZFByZXNzdXJlID0gW2h1bWlkaXR5LCBwcmVzc3VyZV07XG4gICAgICAgICAgdXBkYXRlV2VhdGhlcihcbiAgICAgICAgICAgIGljb24sXG4gICAgICAgICAgICBmZWVsc0xpa2UsXG4gICAgICAgICAgICBtaW5tYXgsXG4gICAgICAgICAgICBsb2NhdGlvbixcbiAgICAgICAgICAgIHRlbXBlcmF0dXJlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBzdW4sXG4gICAgICAgICAgICB2aXNpYmlsaXR5LFxuICAgICAgICAgICAgd2luZHNwZWVkLFxuICAgICAgICAgICAgaHVtaWRpdHlBbmRQcmVzc3VyZVxuICAgICAgICAgICk7XG4gICAgICAgICAgLy8gRmV0Y2ggZm9yZWNhc3RcbiAgICAgICAgICBmZXRjaEZvcmVjYXN0KHBsYWNlKVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgdG9wYmFyLnByb2dyZXNzKDAuNzUpO1xuICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgaWYgKGRhdGEuY29kID09PSBcIjIwMFwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZvcmVjYXN0ID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0MDsgaSArPSAzKSB7XG4gICAgICAgICAgICAgICAgICBmb3JlY2FzdC5wdXNoKGRhdGEubGlzdFtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHVwZGF0ZUZvcmVjYXN0KGZvcmVjYXN0KTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmNvZCA9PT0gXCI0MDRcIikge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiUGxhY2Ugbm90IGZvdW5kLiBQbGVhc2UgdHJ5IGFnYWluLlwiKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIlNvbWV0aGluZyB3ZW50IHdyb25nLiBQbGVhc2UgdHJ5IGFnYWluLlwiKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBpbiBzZXR0aW5nIGxvY2F0aW9uIGZvciBmb3JlY2FzdDogXCIgKyBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChkYXRhLmNvZCA9PT0gXCI0MDRcIikge1xuICAgICAgICAgIHRvcGJhci5oaWRlKCk7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWN0aW9uXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvb3RlclwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgYWxlcnQoXCJQbGFjZSBub3QgZm91bmQuIFBsZWFzZSB0cnkgYWdhaW4uXCIpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGluIHNldHRpbmcgbG9jYXRpb24gZm9yIHdlYXRoZXI6IFwiICsgZXJyb3IpO1xuICAgICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJjdXJyZW50XCIpIHtcbiAgICB0cnkge1xuICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbigocG9zaXRpb24pID0+IHtcbiAgICAgICAgdG9wYmFyLnNob3coKTtcbiAgICAgICAgY29uc3QgeyBsYXRpdHVkZSwgbG9uZ2l0dWRlIH0gPSBwb3NpdGlvbi5jb29yZHM7XG4gICAgICAgIGZldGNoV2VhdGhlcihsYXRpdHVkZSwgbG9uZ2l0dWRlKVxuICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGlmIChkYXRhLmNvZCA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgIC8vIExlZnQgY2FyZFxuICAgICAgICAgICAgICBsZXQgaWNvbiA9IGRhdGEud2VhdGhlclswXS5pY29uO1xuICAgICAgICAgICAgICBsZXQgZmVlbHNMaWtlID0gZGF0YS5tYWluLmZlZWxzX2xpa2U7XG4gICAgICAgICAgICAgIGxldCBtaW4gPSBkYXRhLm1haW4udGVtcF9taW47XG4gICAgICAgICAgICAgIGxldCBtYXggPSBkYXRhLm1haW4udGVtcF9tYXg7XG4gICAgICAgICAgICAgIGxldCBtaW5tYXggPSBbbWluLCBtYXhdO1xuICAgICAgICAgICAgICAvLyBNaWRkbGUgY2FyZFxuICAgICAgICAgICAgICBsZXQgbG9jYXRpb24gPSBbZGF0YS5uYW1lLCBkYXRhLnN5cy5jb3VudHJ5XTtcbiAgICAgICAgICAgICAgbGV0IHRlbXBlcmF0dXJlID0gZGF0YS5tYWluLnRlbXA7XG4gICAgICAgICAgICAgIGxldCBkZXNjcmlwdGlvbiA9XG4gICAgICAgICAgICAgICAgZGF0YS53ZWF0aGVyWzBdLm1haW4gK1xuICAgICAgICAgICAgICAgIFwiOiBcIiArXG4gICAgICAgICAgICAgICAgZGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICtcbiAgICAgICAgICAgICAgICBkYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb24uc2xpY2UoMSk7XG4gICAgICAgICAgICAgIC8vIFJpZ2h0IGNhcmRcbiAgICAgICAgICAgICAgbGV0IHN1bnJpc2UgPSBkYXRhLnN5cy5zdW5yaXNlO1xuICAgICAgICAgICAgICBsZXQgc3Vuc2V0ID0gZGF0YS5zeXMuc3Vuc2V0O1xuICAgICAgICAgICAgICBsZXQgdmlzaWJpbGl0eSA9IGRhdGEudmlzaWJpbGl0eTtcbiAgICAgICAgICAgICAgbGV0IHdpbmRzcGVlZCA9IGRhdGEud2luZC5zcGVlZDtcbiAgICAgICAgICAgICAgbGV0IGh1bWlkaXR5ID0gZGF0YS5tYWluLmh1bWlkaXR5O1xuICAgICAgICAgICAgICBsZXQgcHJlc3N1cmUgPSBkYXRhLm1haW4ucHJlc3N1cmU7XG4gICAgICAgICAgICAgIGxldCBzdW4gPSBbc3VucmlzZSwgc3Vuc2V0XTtcbiAgICAgICAgICAgICAgbGV0IGh1bWlkaXR5QW5kUHJlc3N1cmUgPSBbaHVtaWRpdHksIHByZXNzdXJlXTtcbiAgICAgICAgICAgICAgdXBkYXRlV2VhdGhlcihcbiAgICAgICAgICAgICAgICBpY29uLFxuICAgICAgICAgICAgICAgIGZlZWxzTGlrZSxcbiAgICAgICAgICAgICAgICBtaW5tYXgsXG4gICAgICAgICAgICAgICAgbG9jYXRpb24sXG4gICAgICAgICAgICAgICAgdGVtcGVyYXR1cmUsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgc3VuLFxuICAgICAgICAgICAgICAgIHZpc2liaWxpdHksXG4gICAgICAgICAgICAgICAgd2luZHNwZWVkLFxuICAgICAgICAgICAgICAgIGh1bWlkaXR5QW5kUHJlc3N1cmVcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgdG9wYmFyLnByb2dyZXNzKDAuNSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuY29kID09PSA0MDQpIHtcbiAgICAgICAgICAgICAgdG9wYmFyLmhpZGUoKTtcbiAgICAgICAgICAgICAgYWxlcnQoXCJQbGFjZSBub3QgZm91bmQuIFBsZWFzZSB0cnkgYWdhaW4uXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdG9wYmFyLmhpZGUoKTtcbiAgICAgICAgICAgICAgYWxlcnQoXCJTb21ldGhpbmcgd2VudCB3cm9uZy4gUGxlYXNlIHRyeSBhZ2Fpbi5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGluIHNldHRpbmcgbG9jYXRpb24gZm9yIHdlYXRoZXI6IFwiICsgZXJyb3IpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAvLyBGZXRjaCBmb3JlY2FzdFxuICAgICAgICBmZXRjaEZvcmVjYXN0KGxhdGl0dWRlLCBsb25naXR1ZGUpXG4gICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgaWYgKGRhdGEuY29kID09PSBcIjIwMFwiKSB7XG4gICAgICAgICAgICAgIGxldCBmb3JlY2FzdCA9IFtdO1xuICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQwOyBpICs9IDMpIHtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdC5wdXNoKGRhdGEubGlzdFtpXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdXBkYXRlRm9yZWNhc3QoZm9yZWNhc3QpO1xuICAgICAgICAgICAgICB0b3BiYXIucHJvZ3Jlc3MoMC43NSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuY29kID09PSBcIjQwNFwiKSB7XG4gICAgICAgICAgICAgIGFsZXJ0KFwiUGxhY2Ugbm90IGZvdW5kLiBQbGVhc2UgdHJ5IGFnYWluLlwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGFsZXJ0KFwiU29tZXRoaW5nIHdlbnQgd3JvbmcuIFBsZWFzZSB0cnkgYWdhaW4uXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBpbiBzZXR0aW5nIGxvY2F0aW9uIGZvciBmb3JlY2FzdDogXCIpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGFsZXJ0KFwiUGxlYXNlIGFsbG93IGxvY2F0aW9uIGFjY2VzcyB0byB1c2UgdGhpcyBmZWF0dXJlLlwiKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYWxlcnQoXCJTb21ldGhpbmcgd2VudCB3cm9uZy4gUGxlYXNlIHRyeSBhZ2Fpbi5cIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlV2VhdGhlcihcbiAgaWNvbixcbiAgZmVlbHNsaWtlLFxuICBtaW5tYXgsXG4gIGxvY2F0aW9uLFxuICB0ZW1wZXJhdHVyZSxcbiAgZGVzY3JpcHRpb24sXG4gIHN1bixcbiAgdmlzaWJpbGl0eSxcbiAgd2luZHNwZWVkLFxuICBodW1pZGl0eUFuZFByZXNzdXJlXG4pIHtcbiAgLy8gVXBkYXRlIElDT05cbiAgY29uc3QgaWNvbkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaWNvbi1jb250YWluZXJcIik7XG4gIGZldGNoV2VhdGhlckljb24oaWNvbikudGhlbigoZGF0YSkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaWNvblwiKS5zcmMgPSBkYXRhLnVybDtcbiAgfSk7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgIFwiZmVlbHMtbGlrZVwiXG4gICkuaW5uZXJUZXh0ID0gYEZlZWxzIGxpa2U6ICR7ZmVlbHNsaWtlfSDCsEMgLyAkeyhcbiAgICAoZmVlbHNsaWtlICogOSkgLyA1ICtcbiAgICAzMlxuICApLnRvRml4ZWQoMil9IMKwRmA7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWluLXRlbXBcIikuaW5uZXJUZXh0ID0gYE1pbjogJHttaW5tYXhbMF19IMKwQyAvICR7KFxuICAgIChtaW5tYXhbMF0gKiA5KSAvIDUgK1xuICAgIDMyXG4gICkudG9GaXhlZCgyKX0gwrBGYDtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXgtdGVtcFwiKS5pbm5lclRleHQgPSBgTWF4OiAke21pbm1heFsxXX0gwrBDIC8gJHsoXG4gICAgKG1pbm1heFsxXSAqIDkpIC8gNSArXG4gICAgMzJcbiAgKS50b0ZpeGVkKDIpfSDCsEZgO1xuXG4gIC8vIFVwZGF0ZSB3ZWF0aGVyIGluZm9cbiAgY29uc3Qgd2VhdGhlckluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXRoZXItaW5mb1wiKTtcbiAgLy8gVXBkYXRlIHdlYXRoZXIgaW5mbyBjb2xvdXJcbiAgLy8gT3B0aW1hbCBodW1hbiB0ZW1wZXJhdHVyZTogMjYtMjggQ1xuICBpZiAoTWF0aC5mbG9vcih0ZW1wZXJhdHVyZSkgPCAyNikge1xuICAgIHdlYXRoZXJJbmZvLnN0eWxlLmJhY2tncm91bmQgPSBgbGluZWFyLWdyYWRpZW50KDM1N2RlZywgcmdiYSgwLDIxMiwyNTUsMSkgMCUsIHJnYmEoMCwwLDM2LDEpIDEwMCUpYDtcbiAgfSBlbHNlIGlmIChNYXRoLmZsb29yKHRlbXBlcmF0dXJlKSA+IDI4KSB7XG4gICAgd2VhdGhlckluZm8uc3R5bGUuYmFja2dyb3VuZCA9IGBsaW5lYXItZ3JhZGllbnQoMzU3ZGVnLCByZ2JhKDI1MywyOSwyOSwxKSA1MCUsIHJnYmEoMjUyLDE3Niw2OSwxKSAxMDAlKWA7XG4gIH0gZWxzZSB7XG4gICAgd2VhdGhlckluZm8uc3R5bGUuYmFja2dyb3VuZCA9IGByYWRpYWwtZ3JhZGllbnQoY2lyY2xlLCByZ2JhKDIzOCwxNzQsMjAyLDEpIDAlLCByZ2JhKDE0OCwxODcsMjMzLDEpIDEwMCUpYDtcbiAgICB3ZWF0aGVySW5mby5zdHlsZS5jb2xvciA9IGByZ2JhKDAsIDAsIDAsIDEpYDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZGl0aW9uYWwtaW5mb1wiKS5pbm5lclRleHQgPVxuICAgICAgXCJPcHRpbWFsIHRlbXBlcmF0dXJlIVwiO1xuICB9XG4gIC8vIFVwZGF0ZSBsb2NhdGlvbiwgdGVtcCwgZGVzY3JpcHRpb25cbiAgZmV0Y2hDb3VudHJ5TmFtZShsb2NhdGlvblsxXSkudGhlbigobmFtZSkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgXCJ3ZWF0aGVyLWxvY2F0aW9uXCJcbiAgICApLmlubmVyVGV4dCA9IGAke2xvY2F0aW9uWzBdfSwgJHtuYW1lfWA7XG4gIH0pO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXRoZXItdGVtcFwiKS5pbm5lclRleHQgPVxuICAgIHRlbXBlcmF0dXJlICsgXCIgwrBDIC8gXCIgKyAoKHRlbXBlcmF0dXJlICogOSkgLyA1ICsgMzIpLnRvRml4ZWQoMikgKyBcIiDCsEZcIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWF0aGVyLWRlc2NyaXB0aW9uXCIpLmlubmVyVGV4dCA9IGRlc2NyaXB0aW9uO1xuICAvLyBVcGRhdGUgZmFjdHNcbiAgY29uc3QgZmFjdHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZhY3RzLWNvbnRhaW5lclwiKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdW5yaXNlXCIpLmlubmVyVGV4dCA9IGBTdW5yaXNlOiAke25ldyBEYXRlKFxuICAgIHN1blswXSAqIDEwMDBcbiAgKS50b0xvY2FsZVRpbWVTdHJpbmcoKX0gRVNUYDtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdW5zZXRcIikuaW5uZXJUZXh0ID0gYFN1bnNldDogJHtuZXcgRGF0ZShcbiAgICBzdW5bMV0gKiAxMDAwXG4gICkudG9Mb2NhbGVUaW1lU3RyaW5nKCl9IEVTVGA7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgIFwid2luZHNwZWVkXCJcbiAgKS5pbm5lclRleHQgPSBgV2luZHNwZWVkOiAke3dpbmRzcGVlZH0gbS9zID0gJHsod2luZHNwZWVkIC8gMS42MDkpLnRvRml4ZWQoXG4gICAgMlxuICApfSBtcGhgO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICBcInZpc2liaWxpdHlcIlxuICApLmlubmVyVGV4dCA9IGBWaXNpYmlsaXR5OiAke3Zpc2liaWxpdHl9IG1gO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICBcImh1bWlkaXR5LWFuZC1wcmVzc3VyZVwiXG4gICkuaW5uZXJUZXh0ID0gYEh1bWlkaXR5OiAke2h1bWlkaXR5QW5kUHJlc3N1cmVbMF19ICUsIFByZXNzdXJlOiAke2h1bWlkaXR5QW5kUHJlc3N1cmVbMV19IGhQYWA7XG4gIGljb25Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICB3ZWF0aGVySW5mby5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gIGZhY3RzQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgLy8gV2hpbGUgYmFja2dyb3VuZCBpcyBmZXRjaGVkLCBzZWN0aW9uIGhhcyBhIGRhcmsgYmFja2dyb3VuZCBmb3IgcmVhZGFiaWxpdHlcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInNlY3Rpb25cIikuc3R5bGUuYmFja2dyb3VuZCA9IGAjYjRiNGI0YDtcbiAgLy8gQWRkIGEgYmFja2dyb3VuZCBpbWFnZSBiYXNlZCBvbiBsb2NhdGlvblxuICBmZXRjaFdlYXRoZXJCYWNrZ3JvdW5kKGRlc2NyaXB0aW9uKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgIGlmIChyZXNwb25zZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIFJlc2V0IHNlY3Rpb24gYmFja2dyb3VuZFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJzZWN0aW9uXCIpLnN0eWxlLmJhY2tncm91bmQgPSBgI2ZmZmA7XG4gICAgLy8gR2V0IHNlY3Rpb24gZWxlbWVudFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgXCJzZWN0aW9uXCJcbiAgICApLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtyZXNwb25zZS51cmx9KWA7XG4gICAgdG9wYmFyLnByb2dyZXNzKDEpO1xuICAgIC8vIEhpZGUgdG9wYmFyIGluIDUgc2Vjb25kc1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdG9wYmFyLmhpZGUoKTtcbiAgICB9LCA1MDAwKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUZvcmVjYXN0KGZvcmVjYXN0cykge1xuICAvLyBVcGRhdGUgZm9yZWNhc3RcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5mb3JlY2FzdFwiKS5mb3JFYWNoKChmb3JlY2FzdCwgaW5kZXgpID0+IHtcbiAgICAvLyBVcGRhdGUgZm9yZWNhc3QgaWNvblxuICAgIGZldGNoV2VhdGhlckljb24oZm9yZWNhc3RzW2luZGV4XS53ZWF0aGVyWzBdLmljb24pLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGZvcmVjYXN0LnF1ZXJ5U2VsZWN0b3IoXCIuZm9yZWNhc3QtaWNvblwiKS5zcmMgPSBkYXRhLnVybDtcbiAgICB9KTtcbiAgICAvLyBVcGRhdGUgZm9yZWNhc3QgdGVtcGVyYXR1cmVcbiAgICBmb3JlY2FzdC5xdWVyeVNlbGVjdG9yKFwiLmZvcmVjYXN0LXRlbXBcIikuaW5uZXJUZXh0ID0gYCR7XG4gICAgICBmb3JlY2FzdHNbaW5kZXhdLm1haW4udGVtcFxuICAgIH0gwrBDIC8gJHsoKGZvcmVjYXN0c1tpbmRleF0ubWFpbi50ZW1wICogOSkgLyA1ICsgMzIpLnRvRml4ZWQoMil9IMKwRmA7XG4gICAgLy8gVXBkYXRlIGZvcmVjYXN0IGRlc2NyaXB0aW9uXG4gICAgZm9yZWNhc3QucXVlcnlTZWxlY3RvcihcIi5mb3JlY2FzdC1kZXNjcmlwdGlvblwiKS5pbm5lclRleHQgPVxuICAgICAgZm9yZWNhc3RzW2luZGV4XS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuICAgIC8vIFVwZGF0ZSBmb3JlY2FzdCBkYXRlIGFuZCB0aW1lXG4gICAgZm9yZWNhc3QucXVlcnlTZWxlY3RvcihcIi5mb3JlY2FzdC1kYXRlXCIpLmlubmVyVGV4dCA9XG4gICAgICBuZXcgRGF0ZShmb3JlY2FzdHNbaW5kZXhdLmR0ICogMTAwMCkudG9Mb2NhbGVEYXRlU3RyaW5nKCkgK1xuICAgICAgXCIgXCIgK1xuICAgICAgbmV3IERhdGUoZm9yZWNhc3RzW2luZGV4XS5kdCAqIDEwMDApLnRvTG9jYWxlVGltZVN0cmluZygpO1xuICAgIGZvcmVjYXN0LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgfSk7XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVMYXlvdXQgfSBmcm9tIFwiLi9sYXlvdXRcIjtcbmltcG9ydCB7IGNoZWNrU3RhdGUgfSBmcm9tIFwiLi9yZXNwb25zaXZlXCI7XG5cbmNyZWF0ZUxheW91dCgpO1xuLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdXJyZW50LWxvY2F0aW9uLWJ1dHRvblwiKS5jbGljaygpO1xuY2hlY2tTdGF0ZSh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDEyNTBweClcIikpOyIsIi8vIEltcG9ydCBzZXRsb2NhdGlvbiBmdW5jdGlvblxuaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCB7IHNldExvY2F0aW9uIH0gZnJvbSBcIi4vY29udGVudC5qc1wiO1xuLy8gVG8gbWFrZSB0aGUgYXBwIHJlc3BvbnNpdmVcbmltcG9ydCBcIi4vcmVzcG9uc2l2ZS5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICBoZWFkZXIuaWQgPSBcImhlYWRlclwiO1xuICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG4gIHNlY3Rpb24uaWQgPSBcInNlY3Rpb25cIjtcbiAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvb3RlclwiKTtcbiAgZm9vdGVyLmlkID0gXCJmb290ZXJcIjtcblxuICAvLyBIZWFkZXJcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0aXRsZS5pbm5lclRleHQgPSBcIlRoZS1XZWF0aGVyLUFwcFwiO1xuICB0aXRsZS5pZCA9IFwidGl0bGVcIjtcbiAgY29uc3Qgc2VhcmNoQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc2VhcmNoQ29udGFpbmVyLmlkID0gXCJzZWFyY2gtY29udGFpbmVyXCI7XG4gIGNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgc2VhcmNoLmlkID0gXCJzZWFyY2hcIjtcbiAgc2VhcmNoLnBsYWNlaG9sZGVyID0gXCLwn5SOIFNlYXJjaC4uLlwiO1xuICBjb25zdCBidXR0b25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBidXR0b25Db250YWluZXIuaWQgPSBcImJ1dHRvbi1jb250YWluZXJcIjtcbiAgY29uc3Qgc2VhcmNoQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgc2VhcmNoQnV0dG9uLmlkID0gXCJzZWFyY2gtYnV0dG9uXCI7XG4gIGNvbnN0IGN1cnJlbnRMb2NhdGlvbkJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGN1cnJlbnRMb2NhdGlvbkJ1dHRvbi5pZCA9IFwiY3VycmVudC1sb2NhdGlvbi1idXR0b25cIjtcblxuICAvLyBTZWN0aW9uXG4gIGNvbnN0IHdlYXRoZXJDYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgd2VhdGhlckNhcmQuaWQgPSBcIndlYXRoZXItY2FyZFwiO1xuICBjb25zdCBmb3JlY2FzdENhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gIC8vIEhlYWRlcjogVGl0bGVcbiAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgLy8gSGVhZGVyOiBTZWFyY2ggQmFyXG4gIHNlYXJjaEJ1dHRvbi5pbm5lclRleHQgPSBcIlNlYXJjaFwiO1xuICBjdXJyZW50TG9jYXRpb25CdXR0b24uaW5uZXJUZXh0ID0gXCJDdXJyZW50IExvY2F0aW9uXCI7XG4gIGJ1dHRvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWFyY2hCdXR0b24pO1xuICBidXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoY3VycmVudExvY2F0aW9uQnV0dG9uKTtcbiAgc2VhcmNoQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlYXJjaCk7XG4gIHNlYXJjaENvbnRhaW5lci5hcHBlbmRDaGlsZChidXR0b25Db250YWluZXIpO1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQoc2VhcmNoQ29udGFpbmVyKTtcblxuICAvLyBTZWN0aW9uOiB3ZWF0aGVyIGNhcmQ6IHtJY29uLCBXZWF0aGVySW5mbywgRmFjdH1cbiAgLy8gSWNvblxuICBjb25zdCBpY29uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaWNvbkNvbnRhaW5lci5pZCA9IFwiaWNvbi1jb250YWluZXJcIjtcbiAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gIGljb24uaWQgPSBcImljb25cIjtcbiAgY29uc3QgZmVlbHNMaWtlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZmVlbHNMaWtlLmlkID0gXCJmZWVscy1saWtlXCI7XG4gIGNvbnN0IG1pblRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBtaW5UZW1wLmlkID0gXCJtaW4tdGVtcFwiO1xuICBjb25zdCBtYXhUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbWF4VGVtcC5pZCA9IFwibWF4LXRlbXBcIjtcbiAgY29uc3QgcHJlc3N1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gIHByZXNzdXJlLmlkID0gXCJwcmVzc3VyZVwiO1xuICBpY29uQ29udGFpbmVyLmFwcGVuZENoaWxkKGljb24pO1xuICBpY29uQ29udGFpbmVyLmFwcGVuZENoaWxkKGZlZWxzTGlrZSk7XG4gIGljb25Db250YWluZXIuYXBwZW5kQ2hpbGQobWluVGVtcCk7XG4gIGljb25Db250YWluZXIuYXBwZW5kQ2hpbGQobWF4VGVtcCk7XG4gIC8vIFdlYXRoZXJJbmZvXG4gIGNvbnN0IHdlYXRoZXJJbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgd2VhdGhlckluZm8uaWQgPSBcIndlYXRoZXItaW5mb1wiO1xuICBjb25zdCB3ZWF0aGVyTG9jYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB3ZWF0aGVyTG9jYXRpb24uaWQgPSBcIndlYXRoZXItbG9jYXRpb25cIjtcbiAgY29uc3Qgd2VhdGhlclRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB3ZWF0aGVyVGVtcC5pZCA9IFwid2VhdGhlci10ZW1wXCI7XG4gIGNvbnN0IHdlYXRoZXJEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHdlYXRoZXJEZXNjcmlwdGlvbi5pZCA9IFwid2VhdGhlci1kZXNjcmlwdGlvblwiO1xuICBjb25zdCBhZGRpdGlvbmFsSW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGFkZGl0aW9uYWxJbmZvLmlkID0gXCJhZGRpdGlvbmFsLWluZm9cIjtcbiAgd2VhdGhlckluZm8uYXBwZW5kQ2hpbGQod2VhdGhlckxvY2F0aW9uKTtcbiAgd2VhdGhlckluZm8uYXBwZW5kQ2hpbGQod2VhdGhlclRlbXApO1xuICB3ZWF0aGVySW5mby5hcHBlbmRDaGlsZCh3ZWF0aGVyRGVzY3JpcHRpb24pO1xuICB3ZWF0aGVySW5mby5hcHBlbmRDaGlsZChhZGRpdGlvbmFsSW5mbyk7XG4gIC8vIEZhY3QocylcbiAgY29uc3QgZmFjdHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBmYWN0c0NvbnRhaW5lci5pZCA9IFwiZmFjdHMtY29udGFpbmVyXCI7XG4gIGNvbnN0IHN1bnJpc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzdW5yaXNlLmlkID0gXCJzdW5yaXNlXCI7XG4gIGNvbnN0IHN1bnNldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHN1bnNldC5pZCA9IFwic3Vuc2V0XCI7XG4gIGNvbnN0IHZpc2liaWxpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB2aXNpYmlsaXR5LmlkID0gXCJ2aXNpYmlsaXR5XCI7XG4gIGNvbnN0IHdpbmRzcGVlZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHdpbmRzcGVlZC5pZCA9IFwid2luZHNwZWVkXCI7XG4gIGNvbnN0IGh1bWlkaXR5QW5kUHJlc3N1cmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBodW1pZGl0eUFuZFByZXNzdXJlLmlkID0gXCJodW1pZGl0eS1hbmQtcHJlc3N1cmVcIjtcbiAgZmFjdHNDb250YWluZXIuYXBwZW5kQ2hpbGQoc3VucmlzZSk7XG4gIGZhY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKHN1bnNldCk7XG4gIGZhY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKHZpc2liaWxpdHkpO1xuICBmYWN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZCh3aW5kc3BlZWQpO1xuICBmYWN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChodW1pZGl0eUFuZFByZXNzdXJlKTtcblxuICB3ZWF0aGVyQ2FyZC5hcHBlbmRDaGlsZChpY29uQ29udGFpbmVyKTtcbiAgd2VhdGhlckNhcmQuYXBwZW5kQ2hpbGQod2VhdGhlckluZm8pO1xuICB3ZWF0aGVyQ2FyZC5hcHBlbmRDaGlsZChmYWN0c0NvbnRhaW5lcik7XG5cbiAgLy8gRm9yZWNhc3QgY2FyZCBjb250ZW50czogOHggY2FyZHMgd2l0aCBbSWNvbiwgdGVtcGVyYXR1cmUsIGRlc2NyaXB0aW9uLCBkYXRlIGFuZCB0aW1lXVxuICBmb3JlY2FzdENhcmQuaWQgPSBcImZvcmVjYXN0LWNhcmRcIjtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCA5OyBpKyspIHtcbiAgICBjb25zdCBmb3JlY2FzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZm9yZWNhc3QuaWQgPSBgZm9yZWNhc3QtJHtpfWA7XG4gICAgZm9yZWNhc3QuY2xhc3NOYW1lID0gXCJmb3JlY2FzdFwiO1xuICAgIGNvbnN0IGZvcmVjYXN0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgZm9yZWNhc3RJY29uLmlkID0gYGZvcmVjYXN0LWljb24tJHtpfWA7XG4gICAgZm9yZWNhc3RJY29uLmNsYXNzTmFtZSA9IFwiZm9yZWNhc3QtaWNvblwiO1xuICAgIGNvbnN0IGZvcmVjYXN0VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZm9yZWNhc3RUZW1wLmlkID0gYGZvcmVjYXN0LXRlbXAtJHtpfWA7XG4gICAgZm9yZWNhc3RUZW1wLmNsYXNzTmFtZSA9IFwiZm9yZWNhc3QtdGVtcFwiO1xuICAgIGNvbnN0IGZvcmVjYXN0RGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGZvcmVjYXN0RGVzY3JpcHRpb24uaWQgPSBgZm9yZWNhc3QtZGVzY3JpcHRpb24tJHtpfWA7XG4gICAgZm9yZWNhc3REZXNjcmlwdGlvbi5jbGFzc05hbWUgPSBcImZvcmVjYXN0LWRlc2NyaXB0aW9uXCI7XG4gICAgY29uc3QgZm9yZWNhc3REYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmb3JlY2FzdERhdGUuaWQgPSBgZm9yZWNhc3QtZGF0ZS0ke2l9YDtcbiAgICBmb3JlY2FzdERhdGUuY2xhc3NOYW1lID0gXCJmb3JlY2FzdC1kYXRlXCI7XG4gICAgZm9yZWNhc3QuYXBwZW5kQ2hpbGQoZm9yZWNhc3RJY29uKTtcbiAgICBmb3JlY2FzdC5hcHBlbmRDaGlsZChmb3JlY2FzdFRlbXApO1xuICAgIGZvcmVjYXN0LmFwcGVuZENoaWxkKGZvcmVjYXN0RGVzY3JpcHRpb24pO1xuICAgIGZvcmVjYXN0LmFwcGVuZENoaWxkKGZvcmVjYXN0RGF0ZSk7XG4gICAgZm9yZWNhc3RDYXJkLmFwcGVuZENoaWxkKGZvcmVjYXN0KTtcbiAgfVxuXG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQod2VhdGhlckNhcmQpO1xuICBzZWN0aW9uLmFwcGVuZENoaWxkKGZvcmVjYXN0Q2FyZCk7XG4gIC8vIEZvb3RlclxuICBmb290ZXIuaWQgPSBcImZvb3RlclwiO1xuICBjb25zdCBjcmVkaXRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY3JlZGl0cy5pZCA9IFwiY3JlZGl0c1wiO1xuICBjb25zdCBwdXJwbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBwdXJwbGUuaWQgPSBcInB1cnBsZVwiO1xuICBjb25zdCBpbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaW5mby5pZCA9IFwiaW5mb1wiO1xuXG4gIGZvb3Rlci5hcHBlbmRDaGlsZChjcmVkaXRzKTtcbiAgZm9vdGVyLmFwcGVuZENoaWxkKHB1cnBsZSk7XG4gIGZvb3Rlci5hcHBlbmRDaGlsZChpbmZvKTtcblxuICAvLyBGb290ZXIgY29udGVudFxuICBjcmVkaXRzLmlubmVySFRNTCA9XG4gICAgXCJXZWF0aGVyIGRhdGEgcHJvdmlkZWQgYnkgPGEgaHJlZj0naHR0cHM6Ly9vcGVud2VhdGhlcm1hcC5vcmcvJz5PcGVuV2VhdGhlck1hcDwvYT48YnI+XCIgK1xuICAgIFwiRm9udHMgJiBJbWFnZXMgcHJvdmlkZWQgYnkgPGEgaHJlZj0naHR0cHM6Ly9hZG9iZS5jb20nPkFkb2JlXCIgK1xuICAgIFwiIEFuZCA8YSBocmVmPSdodHRwczovL3d3dy51bnNwbGFzaC5jb20nPlVuc3BsYXNoPC9hPlwiO1xuICBwdXJwbGUuaW5uZXJIVE1MID1cbiAgICBcIjxkaXY+IHJlZCArIGJsdWUgPSA8L2Rpdj48YSBocmVmPSdodHRwczovL3d3dy5naXRodWIuY29tL3JlZHBsdXNibHVlJz48ZGl2IGlkPSdnaXRodWItaW1hZ2UnPjwvZGl2PjwvYT5cIjtcbiAgaW5mby5pbm5lckhUTUwgPVxuICAgIFwiPGEgaHJlZj0naHR0cHM6Ly9naXRodWIuY29tL3JlZHBsdXNibHVlL3dlYXRoZXItYXBwL3RyZWUvbWFpbi9zcmMnPlNvdXJjZSBjb2RlPC9hPjxicj5cIiArXG4gICAgXCI8ZGl2IGlkPSd1c2FnZSc+PGRpdiBpZD0naW5mby1pbWFnZSc+PC9kaXY+PGRpdj5Vc2FnZSBJbmZvPC9kaXY+PC9kaXY+XCI7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNlY3Rpb24pO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvb3Rlcik7XG5cbiAgLy8gRGFyayBtb2RlIGJ1dHRvblxuICBjb25zdCBkYXJrTW9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGRhcmtNb2RlLmlkID0gXCJkYXJrLW1vZGVcIjtcbiAgY29uc3QgZGFya01vZGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZGFya01vZGVJY29uLmlkID0gXCJkYXJrLW1vZGUtaWNvblwiO1xuICBjb25zdCBkYXJrTW9kZVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBkYXJrTW9kZVRleHQuaWQgPSBcImRhcmstbW9kZS10ZXh0XCI7XG4gIGRhcmtNb2RlVGV4dC5pbm5lckhUTUwgPSBcIkxpZ2h0IE1vZGVcIjtcbiAgZGFya01vZGUuYXBwZW5kQ2hpbGQoZGFya01vZGVJY29uKTtcbiAgZGFya01vZGUuYXBwZW5kQ2hpbGQoZGFya01vZGVUZXh0KTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkYXJrTW9kZSk7XG5cbiAgYWRkTGlzdGVuZXJzKCk7XG59XG5cbmZ1bmN0aW9uIGFkZExpc3RlbmVycygpIHtcbiAgY29uc3Qgc2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hcIik7XG4gIGNvbnN0IHNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoLWJ1dHRvblwiKTtcbiAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VjdGlvblwiKTtcbiAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb290ZXJcIik7XG4gIGNvbnN0IGN1cnJlbnRMb2NhdGlvbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgIFwiY3VycmVudC1sb2NhdGlvbi1idXR0b25cIlxuICApO1xuICBjb25zdCBkYXJrTW9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGFyay1tb2RlXCIpO1xuICBjb25zdCBkYXJrTW9kZVRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhcmstbW9kZS10ZXh0XCIpO1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGl0bGVcIik7XG4gIGRhcmtNb2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgbGV0IGRhcmsgPSBkYXJrTW9kZVRleHQuaW5uZXJIVE1MID09PSBcIkRhcmsgTW9kZVwiID8gdHJ1ZSA6IGZhbHNlO1xuICAgIGxldCBwcmltYXJ5Q29sb3IgPSBkYXJrXG4gICAgICA/IFwicmdiYSgyNTUsIDI1NSwgMjU1LCAwLjg1KVwiXG4gICAgICA6IFwicmdiYSgwLCAwLCAwLCAwLjg1KVwiO1xuICAgIGxldCBmb250Q29sb3IgPSBkYXJrID8gXCJyZ2JhKDAsIDAsIDAsIDAuODUpXCIgOiBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMC44NSlcIjtcbiAgICAvLyBEYXJrIG1vZGUgYnV0dG9uXG4gICAgZGFya01vZGVUZXh0LmlubmVySFRNTCA9XG4gICAgICBkYXJrTW9kZVRleHQuaW5uZXJIVE1MID09PSBcIkRhcmsgTW9kZVwiID8gXCJMaWdodCBNb2RlXCIgOiBcIkRhcmsgTW9kZVwiO1xuICAgIC8vIENoYW5nZSB2YWx1ZSBvZiBjc3MgdmFyaWFibGVzIHJlbGF0ZWQgdG8gZm9udCBhbmQgYmdcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCI6cm9vdFwiKVxuICAgICAgLnN0eWxlLnNldFByb3BlcnR5KFwiLS1mb250LWNvbG9yXCIsIGZvbnRDb2xvcik7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiOnJvb3RcIilcbiAgICAgIC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tbGlnaHQtYmxhY2tcIiwgcHJpbWFyeUNvbG9yKTtcbiAgICAvLyBCb2R5IGJhY2tncm91bmQgY29sb3JcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9XG4gICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRDb2xvciA9PT0gXCJyZ2JhKDAsIDAsIDAsIDAuOSlcIlxuICAgICAgICA/IFwid2hpdGVcIlxuICAgICAgICA6IFwicmdiYSgwLCAwLCAwLCAwLjkpXCI7XG4gICAgdGl0bGUuc3R5bGUuY29sb3IgPSB0aXRsZS5zdHlsZS5jb2xvciA9PT0gXCJ3aGl0ZVwiID8gXCJibGFja1wiIDogXCJ3aGl0ZVwiO1xuICB9KTtcblxuICBzZWFyY2hCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAvLyBXaGlsZSB0aGUgdmFsdWUgb2Ygc2VhcmNoIGlzIDAsIGJ1dHRvbiByZW1haW5zIGRpc2FibGVkXG4gIHNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgIGlmIChzZWFyY2gudmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgc2VhcmNoQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAvLyBMaXN0ZW4gZm9yIEVOVEVSIGtleVxuICAgICAgc2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHNlYXJjaEJ1dHRvbi5jbGljaygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VhcmNoQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIHNlYXJjaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHNldExvY2F0aW9uKFwic2VhcmNoXCIpO1xuICAgIC8vIFRvIHByZXZlbnQgbXVsdGlwbGUgYXBpIGNhbGxzXG4gICAgc2VhcmNoQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICBjdXJyZW50TG9jYXRpb25CdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBzZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICBmb290ZXIuc3R5bGUuZGlzcGxheSA9IFwiZ3JpZFwiO1xuICB9KTtcblxuICBjdXJyZW50TG9jYXRpb25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBzZXRMb2NhdGlvbihcImN1cnJlbnRcIik7XG4gICAgLy8gSWYgbm8gbG9jYXRpb24gYWNjZXNzXG4gICAgbmF2aWdhdG9yLnBlcm1pc3Npb25zLnF1ZXJ5KHsgbmFtZTogXCJnZW9sb2NhdGlvblwiIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgaWYgKHJlc3VsdC5zdGF0ZSA9PT0gXCJkZW5pZWRcIikge1xuICAgICAgICBhbGVydChcIlBsZWFzZSBhbGxvdyBsb2NhdGlvbiBhY2Nlc3MgdG8gdXNlIHRoaXMgZmVhdHVyZVwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEVtcHR5IHNlYXJjaCBiYXJcbiAgICAgICAgc2VhcmNoLnZhbHVlID0gXCJcIjtcbiAgICAgICAgc2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgICAgIGZvb3Rlci5zdHlsZS5kaXNwbGF5ID0gXCJncmlkXCI7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjdXJyZW50TG9jYXRpb25CdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICB9KTtcblxuICAvLyBVc2FnZSBidXR0b25cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2FnZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGFsZXJ0KFwiVGhpcyBhcHBsaWNhdGlvbiBjYW4gb25seSBiZSB1c2VkIDM2MDAgdGltZXMgcGVyIGhvdXIg8J+Yj1wiKTtcbiAgfSk7XG59XG4iLCJsZXQgeCA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogMTI1MHB4KVwiKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrU3RhdGUoeCkge1xuICAgIGNvbnN0IHdlYXRoZXJDYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWF0aGVyLWNhcmRcIik7XG4gICAgICAgIGNvbnN0IGljb25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImljb24tY29udGFpbmVyXCIpO1xuICAgICAgICBjb25zdCB3ZWF0aGVySW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VhdGhlci1pbmZvXCIpO1xuICAgICAgICBjb25zdCBmYWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmFjdHMtY29udGFpbmVyXCIpO1xuICAgIGlmICh4Lm1hdGNoZXMpIHsgXG4gICAgICAgIC8vIFJlLW9yZGVyIGVsZW1lbnRzIGluIHdlYXRoZXJDYXJkXG4gICAgICAgIHdlYXRoZXJDYXJkLnJlbW92ZUNoaWxkKGljb25Db250YWluZXIpO1xuICAgICAgICB3ZWF0aGVyQ2FyZC5yZW1vdmVDaGlsZCh3ZWF0aGVySW5mbyk7XG4gICAgICAgIHdlYXRoZXJDYXJkLnJlbW92ZUNoaWxkKGZhY3RzQ29udGFpbmVyKTtcbiAgICAgICAgd2VhdGhlckNhcmQuYXBwZW5kQ2hpbGQod2VhdGhlckluZm8pO1xuICAgICAgICB3ZWF0aGVyQ2FyZC5hcHBlbmRDaGlsZChpY29uQ29udGFpbmVyKTtcbiAgICAgICAgd2VhdGhlckNhcmQuYXBwZW5kQ2hpbGQoZmFjdHNDb250YWluZXIpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHdlYXRoZXJDYXJkLmNvbnRhaW5zKHdlYXRoZXJJbmZvKSkge1xuICAgICAgICAgICAgd2VhdGhlckNhcmQucmVtb3ZlQ2hpbGQod2VhdGhlckluZm8pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3ZWF0aGVyQ2FyZC5jb250YWlucyhpY29uQ29udGFpbmVyKSkge1xuICAgICAgICAgICAgd2VhdGhlckNhcmQucmVtb3ZlQ2hpbGQoaWNvbkNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdlYXRoZXJDYXJkLmNvbnRhaW5zKGZhY3RzQ29udGFpbmVyKSkge1xuICAgICAgICAgICAgd2VhdGhlckNhcmQucmVtb3ZlQ2hpbGQoZmFjdHNDb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIHdlYXRoZXJDYXJkLmFwcGVuZENoaWxkKGljb25Db250YWluZXIpO1xuICAgICAgICB3ZWF0aGVyQ2FyZC5hcHBlbmRDaGlsZCh3ZWF0aGVySW5mbyk7XG4gICAgICAgIHdlYXRoZXJDYXJkLmFwcGVuZENoaWxkKGZhY3RzQ29udGFpbmVyKTtcbiAgICB9XG59XG5cbngub25jaGFuZ2UgPSBjaGVja1N0YXRlOyAvLyBBdHRhY2ggbGlzdGVuZXIgZnVuY3Rpb24gb24gc3RhdGUgY2hhbmdlc1xuXG4vLyBBdCBIID0gMTUwIG9yIFcgPSAzNTAgZGlzcGxheSBlcnJvciBtZXNzYWdlXG5sZXQgeSA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogMzUwcHgpIG9yIChtYXgtaGVpZ2h0OiAxNTBweClcIik7XG5cbmZ1bmN0aW9uIGRpc3BsYXlFcnJvcih5KXtcbiAgICBpZiAoeS5tYXRjaGVzKSB7XG4gICAgICAgIGFsZXJ0KFwiU29ycnksIHlvdXIgc2NyZWVuIGlzIHRvbyBzbWFsbCB0byBkaXNwbGF5IHRoaXMgcGFnZSDwn6WyXCIpOyAgICAgICAgXG4gICAgfVxufVxuXG55Lm9uY2hhbmdlID0gZGlzcGxheUVycm9yOyAvLyBBdHRhY2ggbGlzdGVuZXIgZnVuY3Rpb24gb24gc3RhdGUgY2hhbmdlcyIsIi8vIEFQSSBLZXlzIGZvciBPcGVuIFdlYXRoZXIgQVBJIChGcmVlIGZvciBhbGwpIEVuY3J5cHRlZFxuZXhwb3J0IGNvbnN0IHNlY3JldHMgPSB7XG4gIE9QRU5XRUFUSEVSOiBcIlwiLFxufTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCJkYXRhL0NoZWFwIFBpbmUgUmVndWxhci50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCJkYXRhL0VsemEgUmVndWxhci50dGZcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCJkYXRhL3dlYXRoZXIuc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18gPSBuZXcgVVJMKFwiZGF0YS9naXRodWIuc3ZnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzRfX18gPSBuZXcgVVJMKFwiZGF0YS9pbmZvLnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF81X19fID0gbmV3IFVSTChcImRhdGEvZGFyay1tb2RlLnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF80X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzVfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogXFxcIkNoZWFwIFBpbmVcXFwiO1xcbiAgc3JjOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpO1xcbn1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRWx6YSBSZWd1bGFyXFxcIjtcXG4gIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyArIFwiKTtcXG59XFxuXFxuOnJvb3Qge1xcbiAgLS1ib3gtc2hhZG93OiAwcHggNHB4IDZweCAwcHggcmdiYSg1MCwgNTAsIDkzLCAwLjExKSxcXG4gICAgMHB4IDFweCAzcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4wOCk7XFxuICAtLXB1cnBsZTogIzkxNDdmZjtcXG4gIC0tbGlnaHQtYmxhY2s6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTtcXG4gIC0tZm9udC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjg1KTtcXG59XFxuXFxuaHRtbCxcXG5ib2R5IHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuYm9keSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAyNSUgYXV0byBtaW4oYXV0bywgMTAlKTtcXG4gIGdhcDogMHB4O1xcbn1cXG5cXG5oZWFkZXIsXFxuc2VjdGlvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm94LXNoYWRvdzogdmFyKC0tYm94LXNoYWRvdyk7XFxuICBtYXJnaW46IDVweDtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxufVxcblxcbmhlYWRlciB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fICsgXCIpO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4jdGl0bGUge1xcbiAgZm9udC1zaXplOiA1cmVtO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJDaGVhcCBQaW5lXFxcIiwgY3Vyc2l2ZTtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG5cXG4jc2VhcmNoLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogMTBweDtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XFxufVxcblxcbiNzZWFyY2gge1xcbiAgZm9udC1zaXplOiAxM3B4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJDb3VyaWVyIE5ld1xcXCIsIENvdXJpZXIsIG1vbm9zcGFjZTtcXG4gIHBhZGRpbmctbGVmdDogNXB4O1xcbiAgd2lkdGg6IG1heCgyMDBweCwgMjB2dyk7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgbGluZS1oZWlnaHQ6IDEuNTtcXG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMTAwbXMgZWFzZS1pbiwgYm9yZGVyIDEwMG1zIGVhc2UtaW4sXFxuICAgIGJhY2tncm91bmQtY29sb3IgMTAwbXMgZWFzZS1pbjtcXG4gIGJvcmRlcjogMnB4IHNvbGlkICNkZWUxZTI7XFxuICBjb2xvcjogcmdiKDE0LCAxNCwgMTYpO1xcbiAgYmFja2dyb3VuZDogI2RlZTFlMjtcXG4gIG9wYWNpdHk6IDkwJTtcXG59XFxuXFxuI3NlYXJjaDpob3ZlciB7XFxuICBib3JkZXItY29sb3I6ICNjY2M7XFxufVxcbiNzZWFyY2g6Zm9jdXMge1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIGJvcmRlci1jb2xvcjogdmFyKC0tcHVycGxlKTtcXG4gIGJhY2tncm91bmQ6ICNmZmY7XFxuICBvcGFjaXR5OiAxMDAlO1xcbn1cXG5cXG4jc2VhcmNoOjpwbGFjZWhvbGRlciB7XFxuICBjb2xvcjogI2NjYztcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxufVxcblxcbiNidXR0b24tY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgZ2FwOiAxMHB4O1xcbn1cXG5cXG4jc2VhcmNoLWJ1dHRvbixcXG4jY3VycmVudC1sb2NhdGlvbi1idXR0b24ge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgb3V0bGluZTogMDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgZm9udC1zaXplOiAxM3B4O1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgd2lkdGg6IG1heCgxMDBweCwgMTB2dyk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wdXJwbGUpO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgcGFkZGluZzogMCAxMHB4O1xcbiAgb3BhY2l0eTogOTAlO1xcbn1cXG5cXG4jc2VhcmNoLWJ1dHRvbjpob3ZlcixcXG4jY3VycmVudC1sb2NhdGlvbi1idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHVycGxlKTtcXG4gIG9wYWNpdHk6IDEwMCU7XFxufVxcblxcbiNzZWFyY2gtYnV0dG9uOmRpc2FibGVkLFxcbiNjdXJyZW50LWxvY2F0aW9uLWJ1dHRvbjpkaXNhYmxlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcXG59XFxuXFxuc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGdhcDogMTBweDtcXG59XFxuXFxuI3dlYXRoZXItY2FyZCB7XFxuICB3aWR0aDogOTAlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byBhdXRvIGF1dG87XFxuICBnYXA6IDEwcHg7XFxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcbiAgbWluLXdpZHRoOiBtYXgtY29udGVudDtcXG59XFxuXFxuI3dlYXRoZXItaW5mbyB7XFxuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjg1KTtcXG59XFxuXFxuI3dlYXRoZXItaW5mbyxcXG4jaWNvbi1jb250YWluZXIsXFxuI2ZhY3RzLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiA1cHg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIG1hcmdpbjogNXB4O1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRWx6YSBSZWd1bGFyXFxcIiwgY3Vyc2l2ZTtcXG4gIGJveC1zaGFkb3c6IHZhcigtLWJveC1zaGFkb3cpO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxuICBvcGFjaXR5OiA4NSU7XFxufVxcblxcbiNpY29uLWNvbnRhaW5lcixcXG4jZmFjdHMtY29udGFpbmVyIHtcXG4gIGNvbG9yOiB2YXIoLS1mb250LWNvbG9yKTtcXG59XFxuXFxuI3dlYXRoZXItaW5mbzpob3ZlciB7XFxuICBvcGFjaXR5OiAxMDAlO1xcbn1cXG5cXG4jaWNvbi1jb250YWluZXIsXFxuI2ZhY3RzLWNvbnRhaW5lciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodC1ibGFjayk7XFxufVxcblxcbiNpY29uLWNvbnRhaW5lcjpob3ZlcixcXG4jZmFjdHMtY29udGFpbmVyOmhvdmVyLFxcbiNmb3JlY2FzdC1jYXJkID4gZGl2OmhvdmVyIHtcXG4gIG9wYWNpdHk6IDEwMCU7XFxufVxcblxcbiN3ZWF0aGVyLWxvY2F0aW9uLFxcbiN3ZWF0aGVyLXRlbXAge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG59XFxuXFxuI2FkZGl0aW9uYWwtaW5mbyB7XFxuICBmb250LXNpemU6IDFyZW07XFxufVxcblxcbiNmb3JlY2FzdC1jYXJkIHtcXG4gIHdpZHRoOiA5MCU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyMDBweCwgMWZyKSk7XFxuICBnYXA6IDEwcHg7XFxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcbiAgbWluLXdpZHRoOiBtYXgtY29udGVudDtcXG59XFxuXFxuI2ZvcmVjYXN0LWNhcmQgPiBkaXYge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgbWFyZ2luOiA1cHg7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJFbHphIFJlZ3VsYXJcXFwiLCBjdXJzaXZlO1xcbiAgY29sb3I6IHZhcigtLWZvbnQtY29sb3IpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQtYmxhY2spO1xcbiAgYm94LXNoYWRvdzogdmFyKC0tYm94LXNoYWRvdyk7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDFyZW07XFxuICBvcGFjaXR5OiA4NSU7XFxufVxcblxcbiNmb3JlY2FzdC1jYXJkID4gZGl2ID4gaW1nIHtcXG4gIHdpZHRoOiA1MHB4O1xcbiAgaGVpZ2h0OiA1MHB4O1xcbn1cXG5cXG4uZm9yZWNhc3QtdGVtcCB7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgY29sb3I6IHZhcigtLWZvbnQtY29sb3IpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQtYmxhY2spO1xcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDEwcHg7XFxuICBmb250LWZhbWlseTogXFxcIkVsemEgUmVndWxhclxcXCIsIGN1cnNpdmU7XFxuICBib3gtc2hhZG93OiB2YXIoLS1ib3gtc2hhZG93KTtcXG4gIGhlaWdodDogbWF4LWNvbnRlbnQ7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgbWFyZ2luOiA1cHg7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcblxcbi8qIE5vIGNoaWxkcmVuIG9mIGZvb3RlciB3aWxsIGhhdmUgbWFyZ2luL3BhZGRpbmcgKi9cXG5mb290ZXIgPiAqIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbmZvb3Rlcjpob3ZlciB7XFxuICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tcHVycGxlKTtcXG4gIG91dGxpbmUtb2Zmc2V0OiAycHg7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMDEpO1xcbn1cXG5cXG4jY3JlZGl0cyB7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxufVxcblxcbiNjcmVkaXRzID4gYSxcXG4jY3JlZGl0cyA+IGE6dmlzaXRlZCxcXG4jaW5mbyA+IGEsXFxuI2luZm8gPiBhOnZpc2l0ZWQge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY29sb3I6IHZhcigtLXB1cnBsZSk7XFxufVxcblxcbiNwdXJwbGUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBnYXA6IDVweDtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuXFxuI2dpdGh1Yi1pbWFnZSB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fICsgXCIpO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gIHdpZHRoOiAyMHB4O1xcbiAgaGVpZ2h0OiAyMHB4O1xcbn1cXG5cXG4jZ2l0aHViLWltYWdlOmhvdmVyLFxcbiNpbmZvLWltYWdlOmhvdmVyIHtcXG4gIHJvdGF0ZTogMzYwZGVnO1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xcbiAgdHJhbnNpdGlvbjogMC41cztcXG59XFxuXFxuI2luZm8ge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byBhdXRvO1xcbiAganVzdGlmeS1jb250ZW50OiBlbmQ7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xcbn1cXG5cXG4jdXNhZ2Uge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMnB4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuI2luZm8taW1hZ2Uge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNF9fXyArIFwiKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICB3aWR0aDogMjVweDtcXG4gIGhlaWdodDogMjVweDtcXG59XFxuXFxuI2RhcmstbW9kZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDE1cHg7XFxuICBsZWZ0OiAxNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgYm94LXNoYWRvdzogdmFyKC0tYm94LXNoYWRvdyk7XFxuICB6LWluZGV4OiAxO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDVweDtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG5cXG4jZGFyay1tb2RlLWljb24ge1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNV9fXyArIFwiKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICB3aWR0aDogMjBweDtcXG4gIGhlaWdodDogMjBweDtcXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTI1MHB4KSB7XFxuICBib2R5IHtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAyNSUgYXV0byBhdXRvO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDEwMCU7XFxuICB9XFxuICAjdGl0bGUge1xcbiAgICBmb250LXNpemU6IG1pbig0LjI1cmVtLCAzNzUlKTtcXG4gIH1cXG4gICNzZWFyY2gtYnV0dG9uLFxcbiAgI2N1cnJlbnQtbG9jYXRpb24tYnV0dG9uIHtcXG4gICAgZm9udC1zaXplOiAxMnB4O1xcbiAgICBwYWRkaW5nOiAxcHg7XFxuICB9XFxuICAjd2VhdGhlci1jYXJkIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuICAjd2VhdGhlci1jYXJkID4gZGl2IHtcXG4gICAgd2lkdGg6IDkwJTtcXG4gIH1cXG4gICN3ZWF0aGVyLWluZm8gPiAqIHtcXG4gICAgZm9udC1zaXplOiBtaW4oMjVweCwgMTUwJSk7XFxuICB9XFxuICBmb290ZXIge1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG87XFxuICB9XFxuICAjaW5mbyxcXG4gICNjcmVkaXRzIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC1oZWlnaHQ6IDU1MHB4KSB7XFxuICBib2R5IHtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiA0NSUgYXV0byBhdXRvO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDEwMCU7XFxuICB9XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtaGVpZ2h0OiAzMDBweCkge1xcbiAgaGVhZGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICB9XFxuICAjc2VhcmNoLWNvbnRhaW5lciB7XFxuICAgIG1hcmdpbjogMHB4O1xcbiAgICBnYXA6IDFweDtcXG4gIH1cXG59XFxuXFxuLyogRGlzYWJsZSBmb3Igc21hbGwgc2NyZWVuczogICovXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzUwcHgpIHtcXG4gIGh0bWwge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTE0N2ZmO1xcbiAgfVxcbiAgYm9keSB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtaGVpZ2h0OiAxNTBweCkge1xcbiAgaHRtbCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM5MTQ3ZmY7XFxuICB9XFxuICBib2R5IHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLHlCQUF5QjtFQUN6Qiw0Q0FBdUM7QUFDekM7O0FBRUE7RUFDRSwyQkFBMkI7RUFDM0IsNENBQWdDO0FBQ2xDOztBQUVBO0VBQ0U7dUNBQ3FDO0VBQ3JDLGlCQUFpQjtFQUNqQix1Q0FBdUM7RUFDdkMsaUNBQWlDO0FBQ25DOztBQUVBOztFQUVFLFlBQVk7RUFDWixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsMkNBQTJDO0VBQzNDLFFBQVE7QUFDVjs7QUFFQTs7RUFFRSxzQkFBc0I7RUFDdEIsNkJBQTZCO0VBQzdCLFdBQVc7RUFDWCxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSx5REFBdUM7RUFDdkMsc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGVBQWU7RUFDZixrQ0FBa0M7RUFDbEMsZUFBZTtFQUNmLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixTQUFTO0VBQ1QsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLDhDQUE4QztFQUM5QyxpQkFBaUI7RUFDakIsdUJBQXVC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QUMzQjtFQUNBO0lBQ0UsYUFBYTtFQUNmO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLHlCQUF5QjtFQUMzQjtFQUNBO0lBQ0UsYUFBYTtFQUNmO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogXFxcIkNoZWFwIFBpbmVcXFwiO1xcbiAgc3JjOiB1cmwoZGF0YS9DaGVhcFxcXFwgUGluZVxcXFwgUmVndWxhci50dGYpO1xcbn1cXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRWx6YSBSZWd1bGFyXFxcIjtcXG4gIHNyYzogdXJsKGRhdGEvRWx6YVxcXFwgUmVndWxhci50dGYpO1xcbn1cXG5cXG46cm9vdCB7XFxuICAtLWJveC1zaGFkb3c6IDBweCA0cHggNnB4IDBweCByZ2JhKDUwLCA1MCwgOTMsIDAuMTEpLFxcbiAgICAwcHggMXB4IDNweCAwcHggcmdiYSgwLCAwLCAwLCAwLjA4KTtcXG4gIC0tcHVycGxlOiAjOTE0N2ZmO1xcbiAgLS1saWdodC1ibGFjazogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO1xcbiAgLS1mb250LWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuODUpO1xcbn1cXG5cXG5odG1sLFxcbmJvZHkge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDI1JSBhdXRvIG1pbihhdXRvLCAxMCUpO1xcbiAgZ2FwOiAwcHg7XFxufVxcblxcbmhlYWRlcixcXG5zZWN0aW9uIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBib3gtc2hhZG93OiB2YXIoLS1ib3gtc2hhZG93KTtcXG4gIG1hcmdpbjogNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChkYXRhL3dlYXRoZXIuc3ZnKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuI3RpdGxlIHtcXG4gIGZvbnQtc2l6ZTogNXJlbTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiQ2hlYXAgUGluZVxcXCIsIGN1cnNpdmU7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuXFxuI3NlYXJjaC1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBnYXA6IDEwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbn1cXG5cXG4jc2VhcmNoIHtcXG4gIGZvbnQtc2l6ZTogMTNweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiQ291cmllciBOZXdcXFwiLCBDb3VyaWVyLCBtb25vc3BhY2U7XFxuICBwYWRkaW5nLWxlZnQ6IDVweDtcXG4gIHdpZHRoOiBtYXgoMjAwcHgsIDIwdncpO1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDEwMG1zIGVhc2UtaW4sIGJvcmRlciAxMDBtcyBlYXNlLWluLFxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yIDEwMG1zIGVhc2UtaW47XFxuICBib3JkZXI6IDJweCBzb2xpZCAjZGVlMWUyO1xcbiAgY29sb3I6IHJnYigxNCwgMTQsIDE2KTtcXG4gIGJhY2tncm91bmQ6ICNkZWUxZTI7XFxuICBvcGFjaXR5OiA5MCU7XFxufVxcblxcbiNzZWFyY2g6aG92ZXIge1xcbiAgYm9yZGVyLWNvbG9yOiAjY2NjO1xcbn1cXG4jc2VhcmNoOmZvY3VzIHtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBib3JkZXItY29sb3I6IHZhcigtLXB1cnBsZSk7XFxuICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgb3BhY2l0eTogMTAwJTtcXG59XFxuXFxuI3NlYXJjaDo6cGxhY2Vob2xkZXIge1xcbiAgY29sb3I6ICNjY2M7XFxuICBmb250LXdlaWdodDogOTAwO1xcbn1cXG5cXG4jYnV0dG9uLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGdhcDogMTBweDtcXG59XFxuXFxuI3NlYXJjaC1idXR0b24sXFxuI2N1cnJlbnQtbG9jYXRpb24tYnV0dG9uIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIG91dGxpbmU6IDA7XFxuICBib3JkZXI6IG5vbmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIGZvbnQtc2l6ZTogMTNweDtcXG4gIGhlaWdodDogMzBweDtcXG4gIHdpZHRoOiBtYXgoMTAwcHgsIDEwdncpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHVycGxlKTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDAgMTBweDtcXG4gIG9wYWNpdHk6IDkwJTtcXG59XFxuXFxuI3NlYXJjaC1idXR0b246aG92ZXIsXFxuI2N1cnJlbnQtbG9jYXRpb24tYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXB1cnBsZSk7XFxuICBvcGFjaXR5OiAxMDAlO1xcbn1cXG5cXG4jc2VhcmNoLWJ1dHRvbjpkaXNhYmxlZCxcXG4jY3VycmVudC1sb2NhdGlvbi1idXR0b246ZGlzYWJsZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XFxufVxcblxcbnNlY3Rpb24ge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gIHBhZGRpbmc6IDE1cHg7XFxuICBnYXA6IDEwcHg7XFxufVxcblxcbiN3ZWF0aGVyLWNhcmQge1xcbiAgd2lkdGg6IDkwJTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG8gYXV0byBhdXRvO1xcbiAgZ2FwOiAxMHB4O1xcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG4gIG1pbi13aWR0aDogbWF4LWNvbnRlbnQ7XFxufVxcblxcbiN3ZWF0aGVyLWluZm8ge1xcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44NSk7XFxufVxcblxcbiN3ZWF0aGVyLWluZm8sXFxuI2ljb24tY29udGFpbmVyLFxcbiNmYWN0cy1jb250YWluZXIge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogNXB4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBtYXJnaW46IDVweDtcXG4gIHBhZGRpbmc6IDE1cHg7XFxuICBmb250LWZhbWlseTogXFxcIkVsemEgUmVndWxhclxcXCIsIGN1cnNpdmU7XFxuICBib3gtc2hhZG93OiB2YXIoLS1ib3gtc2hhZG93KTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgb3BhY2l0eTogODUlO1xcbn1cXG5cXG4jaWNvbi1jb250YWluZXIsXFxuI2ZhY3RzLWNvbnRhaW5lciB7XFxuICBjb2xvcjogdmFyKC0tZm9udC1jb2xvcik7XFxufVxcblxcbiN3ZWF0aGVyLWluZm86aG92ZXIge1xcbiAgb3BhY2l0eTogMTAwJTtcXG59XFxuXFxuI2ljb24tY29udGFpbmVyLFxcbiNmYWN0cy1jb250YWluZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQtYmxhY2spO1xcbn1cXG5cXG4jaWNvbi1jb250YWluZXI6aG92ZXIsXFxuI2ZhY3RzLWNvbnRhaW5lcjpob3ZlcixcXG4jZm9yZWNhc3QtY2FyZCA+IGRpdjpob3ZlciB7XFxuICBvcGFjaXR5OiAxMDAlO1xcbn1cXG5cXG4jd2VhdGhlci1sb2NhdGlvbixcXG4jd2VhdGhlci10ZW1wIHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IDJyZW07XFxufVxcblxcbiNhZGRpdGlvbmFsLWluZm8ge1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbn1cXG5cXG4jZm9yZWNhc3QtY2FyZCB7XFxuICB3aWR0aDogOTAlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjAwcHgsIDFmcikpO1xcbiAgZ2FwOiAxMHB4O1xcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG4gIG1pbi13aWR0aDogbWF4LWNvbnRlbnQ7XFxufVxcblxcbiNmb3JlY2FzdC1jYXJkID4gZGl2IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIG1hcmdpbjogNXB4O1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRWx6YSBSZWd1bGFyXFxcIiwgY3Vyc2l2ZTtcXG4gIGNvbG9yOiB2YXIoLS1mb250LWNvbG9yKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0LWJsYWNrKTtcXG4gIGJveC1zaGFkb3c6IHZhcigtLWJveC1zaGFkb3cpO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgb3BhY2l0eTogODUlO1xcbn1cXG5cXG4jZm9yZWNhc3QtY2FyZCA+IGRpdiA+IGltZyB7XFxuICB3aWR0aDogNTBweDtcXG4gIGhlaWdodDogNTBweDtcXG59XFxuXFxuLmZvcmVjYXN0LXRlbXAge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG59XFxuXFxuZm9vdGVyIHtcXG4gIGNvbG9yOiB2YXIoLS1mb250LWNvbG9yKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0LWJsYWNrKTtcXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAxMHB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJFbHphIFJlZ3VsYXJcXFwiLCBjdXJzaXZlO1xcbiAgYm94LXNoYWRvdzogdmFyKC0tYm94LXNoYWRvdyk7XFxuICBoZWlnaHQ6IG1heC1jb250ZW50O1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIG1hcmdpbjogNXB4O1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG5cXG4vKiBObyBjaGlsZHJlbiBvZiBmb290ZXIgd2lsbCBoYXZlIG1hcmdpbi9wYWRkaW5nICovXFxuZm9vdGVyID4gKiB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5mb290ZXI6aG92ZXIge1xcbiAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXB1cnBsZSk7XFxuICBvdXRsaW5lLW9mZnNldDogMnB4O1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjAxKTtcXG59XFxuXFxuI2NyZWRpdHMge1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbn1cXG5cXG4jY3JlZGl0cyA+IGEsXFxuI2NyZWRpdHMgPiBhOnZpc2l0ZWQsXFxuI2luZm8gPiBhLFxcbiNpbmZvID4gYTp2aXNpdGVkIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGNvbG9yOiB2YXIoLS1wdXJwbGUpO1xcbn1cXG5cXG4jcHVycGxlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgZ2FwOiA1cHg7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcblxcbiNnaXRodWItaW1hZ2Uge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGRhdGEvZ2l0aHViLnN2Zyk7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgd2lkdGg6IDIwcHg7XFxuICBoZWlnaHQ6IDIwcHg7XFxufVxcblxcbiNnaXRodWItaW1hZ2U6aG92ZXIsXFxuI2luZm8taW1hZ2U6aG92ZXIge1xcbiAgcm90YXRlOiAzNjBkZWc7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XFxuICB0cmFuc2l0aW9uOiAwLjVzO1xcbn1cXG5cXG4jaW5mbyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvIGF1dG87XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGVuZDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxufVxcblxcbiN1c2FnZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAycHg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4jaW5mby1pbWFnZSB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoZGF0YS9pbmZvLnN2Zyk7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgd2lkdGg6IDI1cHg7XFxuICBoZWlnaHQ6IDI1cHg7XFxufVxcblxcbiNkYXJrLW1vZGUge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAxNXB4O1xcbiAgbGVmdDogMTVweDtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIGJveC1zaGFkb3c6IHZhcigtLWJveC1zaGFkb3cpO1xcbiAgei1pbmRleDogMTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiA1cHg7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuXFxuI2RhcmstbW9kZS1pY29uIHtcXG4gIGJhY2tncm91bmQ6IHVybChkYXRhL2RhcmstbW9kZS5zdmcpO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gIHdpZHRoOiAyMHB4O1xcbiAgaGVpZ2h0OiAyMHB4O1xcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxMjUwcHgpIHtcXG4gIGJvZHkge1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDI1JSBhdXRvIGF1dG87XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMTAwJTtcXG4gIH1cXG4gICN0aXRsZSB7XFxuICAgIGZvbnQtc2l6ZTogbWluKDQuMjVyZW0sIDM3NSUpO1xcbiAgfVxcbiAgI3NlYXJjaC1idXR0b24sXFxuICAjY3VycmVudC1sb2NhdGlvbi1idXR0b24ge1xcbiAgICBmb250LXNpemU6IDEycHg7XFxuICAgIHBhZGRpbmc6IDFweDtcXG4gIH1cXG4gICN3ZWF0aGVyLWNhcmQge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIH1cXG4gICN3ZWF0aGVyLWNhcmQgPiBkaXYge1xcbiAgICB3aWR0aDogOTAlO1xcbiAgfVxcbiAgI3dlYXRoZXItaW5mbyA+ICoge1xcbiAgICBmb250LXNpemU6IG1pbigyNXB4LCAxNTAlKTtcXG4gIH1cXG4gIGZvb3RlciB7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0bztcXG4gIH1cXG4gICNpbmZvLFxcbiAgI2NyZWRpdHMge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LWhlaWdodDogNTUwcHgpIHtcXG4gIGJvZHkge1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDQ1JSBhdXRvIGF1dG87XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMTAwJTtcXG4gIH1cXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC1oZWlnaHQ6IDMwMHB4KSB7XFxuICBoZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIH1cXG4gICNzZWFyY2gtY29udGFpbmVyIHtcXG4gICAgbWFyZ2luOiAwcHg7XFxuICAgIGdhcDogMXB4O1xcbiAgfVxcbn1cXG5cXG4vKiBEaXNhYmxlIGZvciBzbWFsbCBzY3JlZW5zOiAgKi9cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAzNTBweCkge1xcbiAgaHRtbCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICM5MTQ3ZmY7XFxuICB9XFxuICBib2R5IHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC1oZWlnaHQ6IDE1MHB4KSB7XFxuICBodG1sIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzkxNDdmZjtcXG4gIH1cXG4gIGJvZHkge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLyoqXG4gKiBAbGljZW5zZSBNSVRcbiAqIHRvcGJhciAxLjAuMCwgMjAyMS0wMS0wNlxuICogaHR0cDovL2J1dW5ndXllbi5naXRodWIuaW8vdG9wYmFyXG4gKiBDb3B5cmlnaHQgKGMpIDIwMjEgQnV1IE5ndXllblxuICovXG4oZnVuY3Rpb24od2luZG93LGRvY3VtZW50KXtcInVzZSBzdHJpY3RcIjshZnVuY3Rpb24oKXtmb3IodmFyIGxhc3RUaW1lPTAsdmVuZG9ycz1bXCJtc1wiLFwibW96XCIsXCJ3ZWJraXRcIixcIm9cIl0seD0wO3g8dmVuZG9ycy5sZW5ndGgmJiF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOysreCl3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lPXdpbmRvd1t2ZW5kb3JzW3hdK1wiUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCJdLHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZT13aW5kb3dbdmVuZG9yc1t4XStcIkNhbmNlbEFuaW1hdGlvbkZyYW1lXCJdfHx3aW5kb3dbdmVuZG9yc1t4XStcIkNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZVwiXTt3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHwod2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZT1mdW5jdGlvbihjYWxsYmFjayxlbGVtZW50KXt2YXIgY3VyclRpbWU9KG5ldyBEYXRlKS5nZXRUaW1lKCksdGltZVRvQ2FsbD1NYXRoLm1heCgwLDE2LShjdXJyVGltZS1sYXN0VGltZSkpLGlkPXdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7Y2FsbGJhY2soY3VyclRpbWUrdGltZVRvQ2FsbCl9LHRpbWVUb0NhbGwpO3JldHVybiBsYXN0VGltZT1jdXJyVGltZSt0aW1lVG9DYWxsLGlkfSksd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lfHwod2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lPWZ1bmN0aW9uKGlkKXtjbGVhclRpbWVvdXQoaWQpfSl9KCk7ZnVuY3Rpb24gcmVwYWludCgpe2NhbnZhcy53aWR0aD13aW5kb3cuaW5uZXJXaWR0aCxjYW52YXMuaGVpZ2h0PTUqb3B0aW9ucy5iYXJUaGlja25lc3M7dmFyIGN0eD1jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO2N0eC5zaGFkb3dCbHVyPW9wdGlvbnMuc2hhZG93Qmx1cixjdHguc2hhZG93Q29sb3I9b3B0aW9ucy5zaGFkb3dDb2xvcjt2YXIgc3RvcCxsaW5lR3JhZGllbnQ9Y3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsMCxjYW52YXMud2lkdGgsMCk7Zm9yKHN0b3AgaW4gb3B0aW9ucy5iYXJDb2xvcnMpbGluZUdyYWRpZW50LmFkZENvbG9yU3RvcChzdG9wLG9wdGlvbnMuYmFyQ29sb3JzW3N0b3BdKTtjdHgubGluZVdpZHRoPW9wdGlvbnMuYmFyVGhpY2tuZXNzLGN0eC5iZWdpblBhdGgoKSxjdHgubW92ZVRvKDAsb3B0aW9ucy5iYXJUaGlja25lc3MvMiksY3R4LmxpbmVUbyhNYXRoLmNlaWwoY3VycmVudFByb2dyZXNzKmNhbnZhcy53aWR0aCksb3B0aW9ucy5iYXJUaGlja25lc3MvMiksY3R4LnN0cm9rZVN0eWxlPWxpbmVHcmFkaWVudCxjdHguc3Ryb2tlKCl9dmFyIGNhbnZhcyxwcm9ncmVzc1RpbWVySWQsZmFkZVRpbWVySWQsY3VycmVudFByb2dyZXNzLHNob3dpbmcsb3B0aW9ucz17YXV0b1J1bjohMCxiYXJUaGlja25lc3M6MyxiYXJDb2xvcnM6ezA6XCJyZ2JhKDI2LCAgMTg4LCAxNTYsIC45KVwiLFwiLjI1XCI6XCJyZ2JhKDUyLCAgMTUyLCAyMTksIC45KVwiLFwiLjUwXCI6XCJyZ2JhKDI0MSwgMTk2LCAxNSwgIC45KVwiLFwiLjc1XCI6XCJyZ2JhKDIzMCwgMTI2LCAzNCwgIC45KVwiLFwiMS4wXCI6XCJyZ2JhKDIxMSwgODQsICAwLCAgIC45KVwifSxzaGFkb3dCbHVyOjEwLHNoYWRvd0NvbG9yOlwicmdiYSgwLCAgIDAsICAgMCwgICAuNilcIixjbGFzc05hbWU6bnVsbH0sdG9wYmFyPXtjb25maWc6ZnVuY3Rpb24ob3B0cyl7Zm9yKHZhciBrZXkgaW4gb3B0cylvcHRpb25zLmhhc093blByb3BlcnR5KGtleSkmJihvcHRpb25zW2tleV09b3B0c1trZXldKX0sc2hvdzpmdW5jdGlvbigpe3ZhciB0eXBlLGhhbmRsZXIsZWxlbTtzaG93aW5nfHwoc2hvd2luZz0hMCxudWxsIT09ZmFkZVRpbWVySWQmJndpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShmYWRlVGltZXJJZCksY2FudmFzfHwoKGVsZW09KGNhbnZhcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpKS5zdHlsZSkucG9zaXRpb249XCJmaXhlZFwiLGVsZW0udG9wPWVsZW0ubGVmdD1lbGVtLnJpZ2h0PWVsZW0ubWFyZ2luPWVsZW0ucGFkZGluZz0wLGVsZW0uekluZGV4PTEwMDAwMSxlbGVtLmRpc3BsYXk9XCJub25lXCIsb3B0aW9ucy5jbGFzc05hbWUmJmNhbnZhcy5jbGFzc0xpc3QuYWRkKG9wdGlvbnMuY2xhc3NOYW1lKSxkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyksdHlwZT1cInJlc2l6ZVwiLGhhbmRsZXI9cmVwYWludCwoZWxlbT13aW5kb3cpLmFkZEV2ZW50TGlzdGVuZXI/ZWxlbS5hZGRFdmVudExpc3RlbmVyKHR5cGUsaGFuZGxlciwhMSk6ZWxlbS5hdHRhY2hFdmVudD9lbGVtLmF0dGFjaEV2ZW50KFwib25cIit0eXBlLGhhbmRsZXIpOmVsZW1bXCJvblwiK3R5cGVdPWhhbmRsZXIpLGNhbnZhcy5zdHlsZS5vcGFjaXR5PTEsY2FudmFzLnN0eWxlLmRpc3BsYXk9XCJibG9ja1wiLHRvcGJhci5wcm9ncmVzcygwKSxvcHRpb25zLmF1dG9SdW4mJmZ1bmN0aW9uIGxvb3AoKXtwcm9ncmVzc1RpbWVySWQ9d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKSx0b3BiYXIucHJvZ3Jlc3MoXCIrXCIrLjA1Kk1hdGgucG93KDEtTWF0aC5zcXJ0KGN1cnJlbnRQcm9ncmVzcyksMikpfSgpKX0scHJvZ3Jlc3M6ZnVuY3Rpb24odG8pe3JldHVybiB2b2lkIDA9PT10b3x8KFwic3RyaW5nXCI9PXR5cGVvZiB0byYmKHRvPSgwPD10by5pbmRleE9mKFwiK1wiKXx8MDw9dG8uaW5kZXhPZihcIi1cIik/Y3VycmVudFByb2dyZXNzOjApK3BhcnNlRmxvYXQodG8pKSxjdXJyZW50UHJvZ3Jlc3M9MTx0bz8xOnRvLHJlcGFpbnQoKSksY3VycmVudFByb2dyZXNzfSxoaWRlOmZ1bmN0aW9uKCl7c2hvd2luZyYmKHNob3dpbmc9ITEsbnVsbCE9cHJvZ3Jlc3NUaW1lcklkJiYod2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHByb2dyZXNzVGltZXJJZCkscHJvZ3Jlc3NUaW1lcklkPW51bGwpLGZ1bmN0aW9uIGxvb3AoKXtyZXR1cm4gMTw9dG9wYmFyLnByb2dyZXNzKFwiKy4xXCIpJiYoY2FudmFzLnN0eWxlLm9wYWNpdHktPS4wNSxjYW52YXMuc3R5bGUub3BhY2l0eTw9LjA1KT8oY2FudmFzLnN0eWxlLmRpc3BsYXk9XCJub25lXCIsdm9pZChmYWRlVGltZXJJZD1udWxsKSk6dm9pZChmYWRlVGltZXJJZD13aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApKX0oKSl9fTtcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9dG9wYmFyOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gdG9wYmFyfSk6dGhpcy50b3BiYXI9dG9wYmFyfSkuY2FsbCh0aGlzLHdpbmRvdyxkb2N1bWVudCk7Il0sIm5hbWVzIjpbInNlY3JldHMiLCJPV19BUElfS0VZIiwiT1BFTldFQVRIRVIiLCJmZXRjaFdlYXRoZXIiLCJwbGFjZSIsImFyZ3VtZW50cyIsImxlbmd0aCIsIndlYXRoZXIiLCJmZXRjaCIsIm1vZGUiLCJkYXRhIiwianNvbiIsImVycm9yIiwiY29uc29sZSIsImxvZyIsImZldGNoRm9yZWNhc3QiLCJmb3JlY2FzdCIsImZldGNoV2VhdGhlckljb24iLCJjb2RlIiwiaWNvbiIsImZldGNoQ291bnRyeU5hbWUiLCJjb3VudHJ5IiwibmFtZSIsImZldGNoV2VhdGhlckJhY2tncm91bmQiLCJiYWNrZ3JvdW5kIiwidG9wYmFyIiwicmVxdWlyZSIsImNvbmZpZyIsImF1dG9SdW4iLCJiYXJUaGlja25lc3MiLCJiYXJDb2xvcnMiLCJzaGFkb3dCbHVyIiwic2hhZG93Q29sb3IiLCJzZXRMb2NhdGlvbiIsInR5cGUiLCJzZWFyY2giLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwidmFsdWUiLCJzaG93IiwidGhlbiIsInByb2dyZXNzIiwiY29kIiwiZmVlbHNMaWtlIiwibWFpbiIsImZlZWxzX2xpa2UiLCJtaW4iLCJ0ZW1wX21pbiIsIm1heCIsInRlbXBfbWF4IiwibWlubWF4IiwibG9jYXRpb24iLCJzeXMiLCJ0ZW1wZXJhdHVyZSIsInRlbXAiLCJkZXNjcmlwdGlvbiIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJzdW5yaXNlIiwic3Vuc2V0IiwidmlzaWJpbGl0eSIsIndpbmRzcGVlZCIsIndpbmQiLCJzcGVlZCIsImh1bWlkaXR5IiwicHJlc3N1cmUiLCJzdW4iLCJodW1pZGl0eUFuZFByZXNzdXJlIiwidXBkYXRlV2VhdGhlciIsImkiLCJwdXNoIiwibGlzdCIsInVwZGF0ZUZvcmVjYXN0IiwiYWxlcnQiLCJjYXRjaCIsImhpZGUiLCJzdHlsZSIsImRpc3BsYXkiLCJuYXZpZ2F0b3IiLCJnZW9sb2NhdGlvbiIsImdldEN1cnJlbnRQb3NpdGlvbiIsInBvc2l0aW9uIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJjb29yZHMiLCJmZWVsc2xpa2UiLCJpY29uQ29udGFpbmVyIiwic3JjIiwidXJsIiwiaW5uZXJUZXh0IiwidG9GaXhlZCIsIndlYXRoZXJJbmZvIiwiTWF0aCIsImZsb29yIiwiY29sb3IiLCJmYWN0c0NvbnRhaW5lciIsIkRhdGUiLCJ0b0xvY2FsZVRpbWVTdHJpbmciLCJxdWVyeVNlbGVjdG9yIiwicmVzcG9uc2UiLCJ1bmRlZmluZWQiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJzZXRUaW1lb3V0IiwiZm9yZWNhc3RzIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJpbmRleCIsImR0IiwidG9Mb2NhbGVEYXRlU3RyaW5nIiwiY3JlYXRlTGF5b3V0IiwiY2hlY2tTdGF0ZSIsIndpbmRvdyIsIm1hdGNoTWVkaWEiLCJoZWFkZXIiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJzZWN0aW9uIiwiZm9vdGVyIiwidGl0bGUiLCJzZWFyY2hDb250YWluZXIiLCJwbGFjZWhvbGRlciIsImJ1dHRvbkNvbnRhaW5lciIsInNlYXJjaEJ1dHRvbiIsImN1cnJlbnRMb2NhdGlvbkJ1dHRvbiIsIndlYXRoZXJDYXJkIiwiZm9yZWNhc3RDYXJkIiwiYXBwZW5kQ2hpbGQiLCJtaW5UZW1wIiwibWF4VGVtcCIsIndlYXRoZXJMb2NhdGlvbiIsIndlYXRoZXJUZW1wIiwid2VhdGhlckRlc2NyaXB0aW9uIiwiYWRkaXRpb25hbEluZm8iLCJjbGFzc05hbWUiLCJmb3JlY2FzdEljb24iLCJmb3JlY2FzdFRlbXAiLCJmb3JlY2FzdERlc2NyaXB0aW9uIiwiZm9yZWNhc3REYXRlIiwiY3JlZGl0cyIsInB1cnBsZSIsImluZm8iLCJpbm5lckhUTUwiLCJib2R5IiwiZGFya01vZGUiLCJkYXJrTW9kZUljb24iLCJkYXJrTW9kZVRleHQiLCJhZGRMaXN0ZW5lcnMiLCJhZGRFdmVudExpc3RlbmVyIiwiZGFyayIsInByaW1hcnlDb2xvciIsImZvbnRDb2xvciIsInNldFByb3BlcnR5IiwiYmFja2dyb3VuZENvbG9yIiwiZGlzYWJsZWQiLCJldmVudCIsImtleSIsInByZXZlbnREZWZhdWx0IiwiY2xpY2siLCJwZXJtaXNzaW9ucyIsInF1ZXJ5IiwicmVzdWx0Iiwic3RhdGUiLCJ4IiwibWF0Y2hlcyIsInJlbW92ZUNoaWxkIiwiY29udGFpbnMiLCJvbmNoYW5nZSIsInkiLCJkaXNwbGF5RXJyb3IiXSwic291cmNlUm9vdCI6IiJ9