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
    let titleColor = dark ? "white" : "black";
    // Dark mode button
    darkModeText.innerHTML = darkModeText.innerHTML === "Dark Mode" ? "Light Mode" : "Dark Mode";
    // Change value of css variables related to font and bg
    document.querySelector(":root").style.setProperty("--font-color", fontColor);
    document.querySelector(":root").style.setProperty("--light-black", primaryColor);
    // Body background color
    document.body.style.backgroundColor = document.body.style.backgroundColor === "rgba(0, 0, 0, 0.9)" ? "white" : "rgba(0, 0, 0, 0.9)";
    title.style.color = titleColor;
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
  OPENWEATHER: "6465bec51b4e9f411cb93d9488121224"
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
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: \"Cheap Pine\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n\n@font-face {\n  font-family: \"Elza Regular\";\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n}\n\n:root {\n  --box-shadow: 0px 4px 6px 0px rgba(50, 50, 93, 0.11),\n    0px 1px 3px 0px rgba(0, 0, 0, 0.08);\n  --purple: #9147ff;\n  --light-black: rgba(255, 255, 255, 0.6);\n  --font-color: rgba(0, 0, 0, 0.85);\n}\n\nhtml,\nbody {\n  height: 100%;\n  margin: 0;\n}\n\nbody {\n  display: grid;\n  grid-template-rows: 25% auto min(auto, 10%);\n  gap: 0px;\n}\n\nheader,\nsection {\n  background-color: #fff;\n  box-shadow: var(--box-shadow);\n  margin: 5px;\n  border-radius: 10px;\n}\n\nheader {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  background-size: cover;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n\n#title {\n  font-size: 5rem;\n  font-family: \"Cheap Pine\", cursive;\n  cursor: default;\n  user-select: none;\n  color: white;\n}\n\n#search-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  margin-bottom: 10px;\n}\n\n#search {\n  font-size: 13px;\n  font-family: \"Courier New\", Courier, monospace;\n  padding-left: 5px;\n  width: max(200px, 20vw);\n  border-radius: 10px;\n  line-height: 1.5;\n  transition: box-shadow 100ms ease-in, border 100ms ease-in,\n    background-color 100ms ease-in;\n  border: 2px solid #dee1e2;\n  color: rgb(14, 14, 16);\n  background: #dee1e2;\n  opacity: 90%;\n}\n\n#search:hover {\n  border-color: #ccc;\n}\n#search:focus {\n  outline: none;\n  border-color: var(--purple);\n  background: #fff;\n  opacity: 100%;\n}\n\n#search::placeholder {\n  color: #ccc;\n  font-weight: 900;\n}\n\n#button-container {\n  display: flex;\n  flex-direction: row;\n  gap: 10px;\n}\n\n#search-button,\n#current-location-button {\n  display: inline-block;\n  outline: 0;\n  border: none;\n  cursor: pointer;\n  font-weight: 600;\n  border-radius: 10px;\n  font-size: 13px;\n  height: 30px;\n  width: max(100px, 10vw);\n  background-color: var(--purple);\n  color: white;\n  padding: 0 10px;\n  opacity: 90%;\n}\n\n#search-button:hover,\n#current-location-button:hover {\n  background-color: var(--purple);\n  opacity: 100%;\n}\n\n#search-button:disabled,\n#current-location-button:disabled {\n  background-color: #ccc;\n  cursor: not-allowed;\n}\n\nsection {\n  display: none;\n  flex-direction: column;\n  align-items: center;\n  background-size: cover;\n  padding: 15px;\n  gap: 10px;\n}\n\n#weather-card {\n  width: 90%;\n  display: grid;\n  grid-template-columns: auto auto auto;\n  gap: 10px;\n  height: fit-content;\n  min-width: max-content;\n}\n\n#weather-info {\n  color: rgba(255, 255, 255, 0.85);\n}\n\n#weather-info,\n#icon-container,\n#facts-container {\n  display: none;\n  flex-direction: column;\n  justify-content: center;\n  gap: 5px;\n  align-items: center;\n  border-radius: 10px;\n  margin: 5px;\n  padding: 15px;\n  font-family: \"Elza Regular\", cursive;\n  box-shadow: var(--box-shadow);\n  text-align: center;\n  font-size: 1.2rem;\n  opacity: 85%;\n}\n\n#icon-container,\n#facts-container {\n  color: var(--font-color);\n}\n\n#weather-info:hover {\n  opacity: 100%;\n}\n\n#icon-container,\n#facts-container {\n  background-color: var(--light-black);\n}\n\n#icon-container:hover,\n#facts-container:hover,\n#forecast-card > div:hover {\n  opacity: 100%;\n}\n\n#weather-location,\n#weather-temp {\n  font-weight: 700;\n  font-size: 2rem;\n}\n\n#additional-info {\n  font-size: 1rem;\n}\n\n#forecast-card {\n  width: 90%;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 10px;\n  height: fit-content;\n  min-width: max-content;\n}\n\n#forecast-card > div {\n  display: none;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border-radius: 10px;\n  margin: 5px;\n  padding: 15px;\n  font-family: \"Elza Regular\", cursive;\n  color: var(--font-color);\n  background-color: var(--light-black);\n  box-shadow: var(--box-shadow);\n  text-align: center;\n  font-size: 1rem;\n  opacity: 85%;\n}\n\n#forecast-card > div > img {\n  width: 50px;\n  height: 50px;\n}\n\n.forecast-temp {\n  font-weight: 700;\n  font-size: 1rem;\n}\n\nfooter {\n  color: var(--font-color);\n  background-color: var(--light-black);\n  justify-self: center;\n  width: fit-content;\n  display: none;\n  grid-template-columns: 1fr 1fr 1fr;\n  align-items: center;\n  gap: 10px;\n  font-family: \"Elza Regular\", cursive;\n  box-shadow: var(--box-shadow);\n  height: max-content;\n  border-radius: 10px;\n  margin: 5px;\n  padding: 15px;\n  cursor: default;\n  user-select: none;\n}\n\n/* No children of footer will have margin/padding */\nfooter > * {\n  margin: 0;\n  padding: 0;\n}\n\nfooter:hover {\n  outline: 2px solid var(--purple);\n  outline-offset: 2px;\n  transform: scale(1.01);\n}\n\n#credits {\n  text-align: left;\n  margin-left: 10px;\n}\n\n#credits > a,\n#credits > a:visited,\n#info > a,\n#info > a:visited {\n  text-decoration: none;\n  color: var(--purple);\n}\n\n#purple {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: row;\n  gap: 5px;\n  cursor: default;\n}\n\n#github-image {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n  background-size: cover;\n  width: 20px;\n  height: 20px;\n}\n\n#github-image:hover,\n#info-image:hover {\n  rotate: 360deg;\n  transform: scale(1.1);\n  transition: 0.5s;\n}\n\n#info {\n  display: grid;\n  grid-template-columns: auto auto;\n  justify-content: end;\n  align-items: center;\n  margin-right: 10px;\n}\n\n#usage {\n  display: flex;\n  gap: 2px;\n  align-items: center;\n  cursor: pointer;\n}\n\n#info-image {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ");\n  background-size: cover;\n  width: 25px;\n  height: 25px;\n}\n\n#dark-mode {\n  position: absolute;\n  top: 15px;\n  left: 15px;\n  border-radius: 10px;\n  cursor: pointer;\n  padding: 5px;\n  color: #fff;\n  background: rgba(0, 0, 0, 0.5);\n  box-shadow: var(--box-shadow);\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  user-select: none;\n}\n\n#dark-mode-icon {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ");\n  background-size: cover;\n  width: 20px;\n  height: 20px;\n}\n\n@media screen and (max-width: 1250px) {\n  body {\n    grid-template-rows: 25% auto auto;\n    grid-template-columns: 100%;\n  }\n  #title {\n    font-size: min(4.25rem, 375%);\n  }\n  #search-button,\n  #current-location-button {\n    font-size: 12px;\n    padding: 1px;\n  }\n  #weather-card {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n  }\n  #weather-card > div {\n    width: 90%;\n  }\n  #weather-info > * {\n    font-size: min(25px, 150%);\n  }\n  footer {\n    grid-template-columns: auto;\n  }\n  #info,\n  #credits {\n    display: none;\n  }\n}\n\n@media screen and (max-height: 550px) {\n  body {\n    grid-template-rows: 45% auto auto;\n    grid-template-columns: 100%;\n  }\n}\n\n@media screen and (max-height: 300px) {\n  header {\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n  }\n  #search-container {\n    margin: 0px;\n    gap: 1px;\n  }\n}\n\n/* Disable for small screens:  */\n@media screen and (max-width: 350px) {\n  html {\n    background-color: #9147ff;\n  }\n  body {\n    display: none;\n  }\n}\n\n@media screen and (max-height: 150px) {\n  html {\n    background-color: #9147ff;\n  }\n  body {\n    display: none;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":["@font-face {\n  font-family: \"Cheap Pine\";\n  src: url(data/Cheap\\ Pine\\ Regular.ttf);\n}\n\n@font-face {\n  font-family: \"Elza Regular\";\n  src: url(data/Elza\\ Regular.ttf);\n}\n\n:root {\n  --box-shadow: 0px 4px 6px 0px rgba(50, 50, 93, 0.11),\n    0px 1px 3px 0px rgba(0, 0, 0, 0.08);\n  --purple: #9147ff;\n  --light-black: rgba(255, 255, 255, 0.6);\n  --font-color: rgba(0, 0, 0, 0.85);\n}\n\nhtml,\nbody {\n  height: 100%;\n  margin: 0;\n}\n\nbody {\n  display: grid;\n  grid-template-rows: 25% auto min(auto, 10%);\n  gap: 0px;\n}\n\nheader,\nsection {\n  background-color: #fff;\n  box-shadow: var(--box-shadow);\n  margin: 5px;\n  border-radius: 10px;\n}\n\nheader {\n  background-image: url(data/weather.svg);\n  background-size: cover;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n\n#title {\n  font-size: 5rem;\n  font-family: \"Cheap Pine\", cursive;\n  cursor: default;\n  user-select: none;\n  color: white;\n}\n\n#search-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  margin-bottom: 10px;\n}\n\n#search {\n  font-size: 13px;\n  font-family: \"Courier New\", Courier, monospace;\n  padding-left: 5px;\n  width: max(200px, 20vw);\n  border-radius: 10px;\n  line-height: 1.5;\n  transition: box-shadow 100ms ease-in, border 100ms ease-in,\n    background-color 100ms ease-in;\n  border: 2px solid #dee1e2;\n  color: rgb(14, 14, 16);\n  background: #dee1e2;\n  opacity: 90%;\n}\n\n#search:hover {\n  border-color: #ccc;\n}\n#search:focus {\n  outline: none;\n  border-color: var(--purple);\n  background: #fff;\n  opacity: 100%;\n}\n\n#search::placeholder {\n  color: #ccc;\n  font-weight: 900;\n}\n\n#button-container {\n  display: flex;\n  flex-direction: row;\n  gap: 10px;\n}\n\n#search-button,\n#current-location-button {\n  display: inline-block;\n  outline: 0;\n  border: none;\n  cursor: pointer;\n  font-weight: 600;\n  border-radius: 10px;\n  font-size: 13px;\n  height: 30px;\n  width: max(100px, 10vw);\n  background-color: var(--purple);\n  color: white;\n  padding: 0 10px;\n  opacity: 90%;\n}\n\n#search-button:hover,\n#current-location-button:hover {\n  background-color: var(--purple);\n  opacity: 100%;\n}\n\n#search-button:disabled,\n#current-location-button:disabled {\n  background-color: #ccc;\n  cursor: not-allowed;\n}\n\nsection {\n  display: none;\n  flex-direction: column;\n  align-items: center;\n  background-size: cover;\n  padding: 15px;\n  gap: 10px;\n}\n\n#weather-card {\n  width: 90%;\n  display: grid;\n  grid-template-columns: auto auto auto;\n  gap: 10px;\n  height: fit-content;\n  min-width: max-content;\n}\n\n#weather-info {\n  color: rgba(255, 255, 255, 0.85);\n}\n\n#weather-info,\n#icon-container,\n#facts-container {\n  display: none;\n  flex-direction: column;\n  justify-content: center;\n  gap: 5px;\n  align-items: center;\n  border-radius: 10px;\n  margin: 5px;\n  padding: 15px;\n  font-family: \"Elza Regular\", cursive;\n  box-shadow: var(--box-shadow);\n  text-align: center;\n  font-size: 1.2rem;\n  opacity: 85%;\n}\n\n#icon-container,\n#facts-container {\n  color: var(--font-color);\n}\n\n#weather-info:hover {\n  opacity: 100%;\n}\n\n#icon-container,\n#facts-container {\n  background-color: var(--light-black);\n}\n\n#icon-container:hover,\n#facts-container:hover,\n#forecast-card > div:hover {\n  opacity: 100%;\n}\n\n#weather-location,\n#weather-temp {\n  font-weight: 700;\n  font-size: 2rem;\n}\n\n#additional-info {\n  font-size: 1rem;\n}\n\n#forecast-card {\n  width: 90%;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 10px;\n  height: fit-content;\n  min-width: max-content;\n}\n\n#forecast-card > div {\n  display: none;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border-radius: 10px;\n  margin: 5px;\n  padding: 15px;\n  font-family: \"Elza Regular\", cursive;\n  color: var(--font-color);\n  background-color: var(--light-black);\n  box-shadow: var(--box-shadow);\n  text-align: center;\n  font-size: 1rem;\n  opacity: 85%;\n}\n\n#forecast-card > div > img {\n  width: 50px;\n  height: 50px;\n}\n\n.forecast-temp {\n  font-weight: 700;\n  font-size: 1rem;\n}\n\nfooter {\n  color: var(--font-color);\n  background-color: var(--light-black);\n  justify-self: center;\n  width: fit-content;\n  display: none;\n  grid-template-columns: 1fr 1fr 1fr;\n  align-items: center;\n  gap: 10px;\n  font-family: \"Elza Regular\", cursive;\n  box-shadow: var(--box-shadow);\n  height: max-content;\n  border-radius: 10px;\n  margin: 5px;\n  padding: 15px;\n  cursor: default;\n  user-select: none;\n}\n\n/* No children of footer will have margin/padding */\nfooter > * {\n  margin: 0;\n  padding: 0;\n}\n\nfooter:hover {\n  outline: 2px solid var(--purple);\n  outline-offset: 2px;\n  transform: scale(1.01);\n}\n\n#credits {\n  text-align: left;\n  margin-left: 10px;\n}\n\n#credits > a,\n#credits > a:visited,\n#info > a,\n#info > a:visited {\n  text-decoration: none;\n  color: var(--purple);\n}\n\n#purple {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: row;\n  gap: 5px;\n  cursor: default;\n}\n\n#github-image {\n  background-image: url(data/github.svg);\n  background-size: cover;\n  width: 20px;\n  height: 20px;\n}\n\n#github-image:hover,\n#info-image:hover {\n  rotate: 360deg;\n  transform: scale(1.1);\n  transition: 0.5s;\n}\n\n#info {\n  display: grid;\n  grid-template-columns: auto auto;\n  justify-content: end;\n  align-items: center;\n  margin-right: 10px;\n}\n\n#usage {\n  display: flex;\n  gap: 2px;\n  align-items: center;\n  cursor: pointer;\n}\n\n#info-image {\n  background-image: url(data/info.svg);\n  background-size: cover;\n  width: 25px;\n  height: 25px;\n}\n\n#dark-mode {\n  position: absolute;\n  top: 15px;\n  left: 15px;\n  border-radius: 10px;\n  cursor: pointer;\n  padding: 5px;\n  color: #fff;\n  background: rgba(0, 0, 0, 0.5);\n  box-shadow: var(--box-shadow);\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  user-select: none;\n}\n\n#dark-mode-icon {\n  background: url(data/dark-mode.svg);\n  background-size: cover;\n  width: 20px;\n  height: 20px;\n}\n\n@media screen and (max-width: 1250px) {\n  body {\n    grid-template-rows: 25% auto auto;\n    grid-template-columns: 100%;\n  }\n  #title {\n    font-size: min(4.25rem, 375%);\n  }\n  #search-button,\n  #current-location-button {\n    font-size: 12px;\n    padding: 1px;\n  }\n  #weather-card {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n  }\n  #weather-card > div {\n    width: 90%;\n  }\n  #weather-info > * {\n    font-size: min(25px, 150%);\n  }\n  footer {\n    grid-template-columns: auto;\n  }\n  #info,\n  #credits {\n    display: none;\n  }\n}\n\n@media screen and (max-height: 550px) {\n  body {\n    grid-template-rows: 45% auto auto;\n    grid-template-columns: 100%;\n  }\n}\n\n@media screen and (max-height: 300px) {\n  header {\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n  }\n  #search-container {\n    margin: 0px;\n    gap: 1px;\n  }\n}\n\n/* Disable for small screens:  */\n@media screen and (max-width: 350px) {\n  html {\n    background-color: #9147ff;\n  }\n  body {\n    display: none;\n  }\n}\n\n@media screen and (max-height: 150px) {\n  html {\n    background-color: #9147ff;\n  }\n  body {\n    display: none;\n  }\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WUFBWSxPQUFPLE9BQU8sVUFBVSxNQUFNLE1BQU0sWUFBWSxXQUFXLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxVQUFVLFVBQVUsWUFBWSxPQUFPLFlBQVksTUFBTSxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxRQUFRLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsTUFBTSxNQUFNLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLFdBQVcsVUFBVSxNQUFNLEtBQUssS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksTUFBTSxNQUFNLFVBQVUsVUFBVSxLQUFLLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxLQUFLLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLE1BQU0sVUFBVSxLQUFLLE1BQU0sS0FBSyxLQUFLLFlBQVksYUFBYSxNQUFNLE1BQU0sS0FBSyxLQUFLLFVBQVUs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QUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ3JFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGFBQWEsWUFBWSx5REFBeUQsZ0RBQWdELG9NQUFvTSx1RkFBdUYsZ0hBQWdILDhCQUE4QixhQUFhLHVDQUF1Qyx5RUFBeUUsaUJBQWlCLEVBQUUsR0FBRyxtQkFBbUIsb0VBQW9FLGdDQUFnQyxzRUFBc0UsbUVBQW1FLHNGQUFzRiw2TUFBNk0sd0VBQXdFLHFDQUFxQyw0SkFBNEosb0VBQW9FLFNBQVMsc0JBQXNCLDBFQUEwRSxpQkFBaUIsc0JBQXNCLDBuQkFBMG5CLHFIQUFxSCxJQUFJLHVCQUF1Qiw4S0FBOEssaUJBQWlCLGdJQUFnSSxrTUFBa00sTUFBTSxLQUF1Qix3REFBd0QsS0FBcUMsQ0FBQyxtQ0FBTyxXQUFXLGNBQWM7QUFBQSxrR0FBQyxDQUFDLENBQWtCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9hc3luYy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jb250ZW50LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2xheW91dC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9yZXNwb25zaXZlLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3NlY3JldHMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3RvcGJhci90b3BiYXIubWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNlY3JldHMgfSBmcm9tIFwiLi9zZWNyZXRzLmpzXCI7XG5cbmNvbnN0IE9XX0FQSV9LRVkgPSBzZWNyZXRzLk9QRU5XRUFUSEVSO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hXZWF0aGVyKHBsYWNlKSB7XG4gIC8vIElmIG51bWJlciBvZiBwYXJhbXMgaXMgMiwgdGhlbiBpdCBpcyBsYXQgYW5kIGxvblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgIHRyeSB7XG4gICAgICBsZXQgd2VhdGhlciA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/bGF0PSR7YXJndW1lbnRzWzBdfSZsb249JHthcmd1bWVudHNbMV19JmFwcGlkPSR7T1dfQVBJX0tFWX0mdW5pdHM9bWV0cmljYCxcbiAgICAgICAgeyBtb2RlOiBcImNvcnNcIiB9XG4gICAgICApO1xuICAgICAgbGV0IGRhdGEgPSBhd2FpdCB3ZWF0aGVyLmpzb24oKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGluIGZldGNoaW5nIHdlYXRoZXIgXCIgKyBlcnJvcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHdlYXRoZXIgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtwbGFjZX0mYXBwaWQ9JHtPV19BUElfS0VZfSZ1bml0cz1tZXRyaWNgLFxuICAgICAgICB7IG1vZGU6IFwiY29yc1wiIH1cbiAgICAgICk7XG4gICAgICBsZXQgZGF0YSA9IGF3YWl0IHdlYXRoZXIuanNvbigpO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gZmV0Y2hpbmcgd2VhdGhlciBcIiArIGVycm9yKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoRm9yZWNhc3QocGxhY2UpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IGZvcmVjYXN0ID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3Q/bGF0PSR7YXJndW1lbnRzWzBdfSZsb249JHthcmd1bWVudHNbMV19JmFwcGlkPSR7T1dfQVBJX0tFWX0mdW5pdHM9bWV0cmljYCxcbiAgICAgICAgeyBtb2RlOiBcImNvcnNcIiB9XG4gICAgICApO1xuICAgICAgbGV0IGRhdGEgPSBhd2FpdCBmb3JlY2FzdC5qc29uKCk7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coXCJFcnJvciBpbiBmZXRjaGluZyBmb3JlY2FzdCBcIiArIGVycm9yKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgZm9yZWNhc3QgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9mb3JlY2FzdD9xPSR7cGxhY2V9JmFwcGlkPSR7T1dfQVBJX0tFWX0mdW5pdHM9bWV0cmljYCxcbiAgICAgICAgeyBtb2RlOiBcImNvcnNcIiB9XG4gICAgICApO1xuICAgICAgbGV0IGRhdGEgPSBhd2FpdCBmb3JlY2FzdC5qc29uKCk7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coXCJFcnJvciBpbiBmZXRjaGluZyBmb3JlY2FzdCBcIiArIGVycm9yKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoV2VhdGhlckljb24oY29kZSkge1xuICB0cnkge1xuICAgIGxldCBpY29uID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93LyR7Y29kZX0ucG5nYCwge1xuICAgICAgbW9kZTogXCJjb3JzXCIsXG4gICAgfSk7XG4gICAgcmV0dXJuIGljb247XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coXCJFcnJvciBpbiBmZXRjaGluZyBpY29uIFwiICsgZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaENvdW50cnlOYW1lKGNvZGUpIHtcbiAgdHJ5IHtcbiAgICBsZXQgY291bnRyeSA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHBzOi8vYXBpLndvcmxkYmFuay5vcmcvdjIvY291bnRyeS8ke2NvZGV9P2Zvcm1hdD1qc29uYCxcbiAgICAgIHsgbW9kZTogXCJjb3JzXCIgfVxuICAgICk7XG4gICAgbGV0IGRhdGEgPSBhd2FpdCBjb3VudHJ5Lmpzb24oKTtcbiAgICByZXR1cm4gZGF0YVsxXVswXS5uYW1lO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gZmV0Y2hpbmcgY291bnRyeSBuYW1lIFwiICsgZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaFdlYXRoZXJCYWNrZ3JvdW5kKHBsYWNlKSB7XG4gIHRyeSB7XG4gICAgbGV0IGJhY2tncm91bmQgPSBhd2FpdCBmZXRjaChcbiAgICAgIGBodHRwczovL3NvdXJjZS51bnNwbGFzaC5jb20vMTYwMHg0NTAvP01vbnVtZW50cyxUb3VyaXNtLFBsYWNlcywke3BsYWNlfWBcbiAgICApO1xuICAgIHJldHVybiBiYWNrZ3JvdW5kO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gZmV0Y2hpbmcgYmFja2dyb3VuZCBcIiArIGVycm9yKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgZmV0Y2hXZWF0aGVyLFxuICBmZXRjaFdlYXRoZXJJY29uLFxuICBmZXRjaFdlYXRoZXJCYWNrZ3JvdW5kLFxuICBmZXRjaENvdW50cnlOYW1lLFxuICBmZXRjaEZvcmVjYXN0LFxufSBmcm9tIFwiLi9hc3luYy5qc1wiO1xuXG4vLyBMb2FkaW5nIGJhclxuY29uc3QgdG9wYmFyID0gcmVxdWlyZShcInRvcGJhclwiKTtcbnRvcGJhci5jb25maWcoe1xuICBhdXRvUnVuOiBmYWxzZSxcbiAgYmFyVGhpY2tuZXNzOiAzLFxuICBiYXJDb2xvcnM6IHtcbiAgICAwOiBcInJnYmEoMjYsICAxODgsIDE1NiwgLjkpXCIsXG4gICAgXCIuMjVcIjogXCJyZ2JhKDUyLCAgMTUyLCAyMTksIC45KVwiLFxuICAgIFwiLjUwXCI6IFwicmdiYSgyNDEsIDE5NiwgMTUsICAuOSlcIixcbiAgICBcIi43NVwiOiBcInJnYmEoMjMwLCAxMjYsIDM0LCAgLjkpXCIsXG4gICAgXCIxLjBcIjogXCJyZ2JhKDIxMSwgODQsICAwLCAgIC45KVwiLFxuICB9LFxuICBzaGFkb3dCbHVyOiAxMCxcbiAgc2hhZG93Q29sb3I6IFwicmdiYSgwLCAgIDAsICAgMCwgICAuNilcIixcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0TG9jYXRpb24odHlwZSkge1xuICBjb25zdCBzZWFyY2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFwiKTtcbiAgbGV0IHBsYWNlID0gc2VhcmNoLnZhbHVlO1xuICBpZiAodHlwZSA9PT0gXCJzZWFyY2hcIikge1xuICAgIHRvcGJhci5zaG93KCk7XG4gICAgZmV0Y2hXZWF0aGVyKHBsYWNlKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIHRvcGJhci5wcm9ncmVzcygwLjUpO1xuICAgICAgICBpZiAoZGF0YS5jb2QgPT09IDIwMCkge1xuICAgICAgICAgIC8vIExlZnQgY2FyZFxuICAgICAgICAgIGxldCBpY29uID0gZGF0YS53ZWF0aGVyWzBdLmljb247XG4gICAgICAgICAgbGV0IGZlZWxzTGlrZSA9IGRhdGEubWFpbi5mZWVsc19saWtlO1xuICAgICAgICAgIGxldCBtaW4gPSBkYXRhLm1haW4udGVtcF9taW47XG4gICAgICAgICAgbGV0IG1heCA9IGRhdGEubWFpbi50ZW1wX21heDtcbiAgICAgICAgICBsZXQgbWlubWF4ID0gW21pbiwgbWF4XTtcbiAgICAgICAgICAvLyBNaWRkbGUgY2FyZFxuICAgICAgICAgIGxldCBsb2NhdGlvbiA9IFtkYXRhLm5hbWUsIGRhdGEuc3lzLmNvdW50cnldO1xuICAgICAgICAgIGxldCB0ZW1wZXJhdHVyZSA9IGRhdGEubWFpbi50ZW1wO1xuICAgICAgICAgIGxldCBkZXNjcmlwdGlvbiA9XG4gICAgICAgICAgICBkYXRhLndlYXRoZXJbMF0ubWFpbiArXG4gICAgICAgICAgICBcIjogXCIgK1xuICAgICAgICAgICAgZGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICtcbiAgICAgICAgICAgIGRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbi5zbGljZSgxKTtcbiAgICAgICAgICAvLyBSaWdodCBjYXJkXG4gICAgICAgICAgbGV0IHN1bnJpc2UgPSBkYXRhLnN5cy5zdW5yaXNlO1xuICAgICAgICAgIGxldCBzdW5zZXQgPSBkYXRhLnN5cy5zdW5zZXQ7XG4gICAgICAgICAgbGV0IHZpc2liaWxpdHkgPSBkYXRhLnZpc2liaWxpdHk7XG4gICAgICAgICAgbGV0IHdpbmRzcGVlZCA9IGRhdGEud2luZC5zcGVlZDtcbiAgICAgICAgICBsZXQgaHVtaWRpdHkgPSBkYXRhLm1haW4uaHVtaWRpdHk7XG4gICAgICAgICAgbGV0IHByZXNzdXJlID0gZGF0YS5tYWluLnByZXNzdXJlO1xuICAgICAgICAgIGxldCBzdW4gPSBbc3VucmlzZSwgc3Vuc2V0XTtcbiAgICAgICAgICBsZXQgaHVtaWRpdHlBbmRQcmVzc3VyZSA9IFtodW1pZGl0eSwgcHJlc3N1cmVdO1xuICAgICAgICAgIHVwZGF0ZVdlYXRoZXIoXG4gICAgICAgICAgICBpY29uLFxuICAgICAgICAgICAgZmVlbHNMaWtlLFxuICAgICAgICAgICAgbWlubWF4LFxuICAgICAgICAgICAgbG9jYXRpb24sXG4gICAgICAgICAgICB0ZW1wZXJhdHVyZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgc3VuLFxuICAgICAgICAgICAgdmlzaWJpbGl0eSxcbiAgICAgICAgICAgIHdpbmRzcGVlZCxcbiAgICAgICAgICAgIGh1bWlkaXR5QW5kUHJlc3N1cmVcbiAgICAgICAgICApO1xuICAgICAgICAgIC8vIEZldGNoIGZvcmVjYXN0XG4gICAgICAgICAgZmV0Y2hGb3JlY2FzdChwbGFjZSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgIHRvcGJhci5wcm9ncmVzcygwLjc1KTtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAgIGlmIChkYXRhLmNvZCA9PT0gXCIyMDBcIikge1xuICAgICAgICAgICAgICAgIGxldCBmb3JlY2FzdCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDA7IGkgKz0gMykge1xuICAgICAgICAgICAgICAgICAgZm9yZWNhc3QucHVzaChkYXRhLmxpc3RbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1cGRhdGVGb3JlY2FzdChmb3JlY2FzdCk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5jb2QgPT09IFwiNDA0XCIpIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIlBsYWNlIG5vdCBmb3VuZC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJTb21ldGhpbmcgd2VudCB3cm9uZy4gUGxlYXNlIHRyeSBhZ2Fpbi5cIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gc2V0dGluZyBsb2NhdGlvbiBmb3IgZm9yZWNhc3Q6IFwiICsgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YS5jb2QgPT09IFwiNDA0XCIpIHtcbiAgICAgICAgICB0b3BiYXIuaGlkZSgpO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VjdGlvblwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb290ZXJcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgIGFsZXJ0KFwiUGxhY2Ugbm90IGZvdW5kLiBQbGVhc2UgdHJ5IGFnYWluLlwiKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBpbiBzZXR0aW5nIGxvY2F0aW9uIGZvciB3ZWF0aGVyOiBcIiArIGVycm9yKTtcbiAgICAgIH0pO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiY3VycmVudFwiKSB7XG4gICAgdHJ5IHtcbiAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oKHBvc2l0aW9uKSA9PiB7XG4gICAgICAgIHRvcGJhci5zaG93KCk7XG4gICAgICAgIGNvbnN0IHsgbGF0aXR1ZGUsIGxvbmdpdHVkZSB9ID0gcG9zaXRpb24uY29vcmRzO1xuICAgICAgICBmZXRjaFdlYXRoZXIobGF0aXR1ZGUsIGxvbmdpdHVkZSlcbiAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBpZiAoZGF0YS5jb2QgPT09IDIwMCkge1xuICAgICAgICAgICAgICAvLyBMZWZ0IGNhcmRcbiAgICAgICAgICAgICAgbGV0IGljb24gPSBkYXRhLndlYXRoZXJbMF0uaWNvbjtcbiAgICAgICAgICAgICAgbGV0IGZlZWxzTGlrZSA9IGRhdGEubWFpbi5mZWVsc19saWtlO1xuICAgICAgICAgICAgICBsZXQgbWluID0gZGF0YS5tYWluLnRlbXBfbWluO1xuICAgICAgICAgICAgICBsZXQgbWF4ID0gZGF0YS5tYWluLnRlbXBfbWF4O1xuICAgICAgICAgICAgICBsZXQgbWlubWF4ID0gW21pbiwgbWF4XTtcbiAgICAgICAgICAgICAgLy8gTWlkZGxlIGNhcmRcbiAgICAgICAgICAgICAgbGV0IGxvY2F0aW9uID0gW2RhdGEubmFtZSwgZGF0YS5zeXMuY291bnRyeV07XG4gICAgICAgICAgICAgIGxldCB0ZW1wZXJhdHVyZSA9IGRhdGEubWFpbi50ZW1wO1xuICAgICAgICAgICAgICBsZXQgZGVzY3JpcHRpb24gPVxuICAgICAgICAgICAgICAgIGRhdGEud2VhdGhlclswXS5tYWluICtcbiAgICAgICAgICAgICAgICBcIjogXCIgK1xuICAgICAgICAgICAgICAgIGRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbi5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArXG4gICAgICAgICAgICAgICAgZGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAvLyBSaWdodCBjYXJkXG4gICAgICAgICAgICAgIGxldCBzdW5yaXNlID0gZGF0YS5zeXMuc3VucmlzZTtcbiAgICAgICAgICAgICAgbGV0IHN1bnNldCA9IGRhdGEuc3lzLnN1bnNldDtcbiAgICAgICAgICAgICAgbGV0IHZpc2liaWxpdHkgPSBkYXRhLnZpc2liaWxpdHk7XG4gICAgICAgICAgICAgIGxldCB3aW5kc3BlZWQgPSBkYXRhLndpbmQuc3BlZWQ7XG4gICAgICAgICAgICAgIGxldCBodW1pZGl0eSA9IGRhdGEubWFpbi5odW1pZGl0eTtcbiAgICAgICAgICAgICAgbGV0IHByZXNzdXJlID0gZGF0YS5tYWluLnByZXNzdXJlO1xuICAgICAgICAgICAgICBsZXQgc3VuID0gW3N1bnJpc2UsIHN1bnNldF07XG4gICAgICAgICAgICAgIGxldCBodW1pZGl0eUFuZFByZXNzdXJlID0gW2h1bWlkaXR5LCBwcmVzc3VyZV07XG4gICAgICAgICAgICAgIHVwZGF0ZVdlYXRoZXIoXG4gICAgICAgICAgICAgICAgaWNvbixcbiAgICAgICAgICAgICAgICBmZWVsc0xpa2UsXG4gICAgICAgICAgICAgICAgbWlubWF4LFxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLFxuICAgICAgICAgICAgICAgIHRlbXBlcmF0dXJlLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIHN1bixcbiAgICAgICAgICAgICAgICB2aXNpYmlsaXR5LFxuICAgICAgICAgICAgICAgIHdpbmRzcGVlZCxcbiAgICAgICAgICAgICAgICBodW1pZGl0eUFuZFByZXNzdXJlXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHRvcGJhci5wcm9ncmVzcygwLjUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmNvZCA9PT0gNDA0KSB7XG4gICAgICAgICAgICAgIHRvcGJhci5oaWRlKCk7XG4gICAgICAgICAgICAgIGFsZXJ0KFwiUGxhY2Ugbm90IGZvdW5kLiBQbGVhc2UgdHJ5IGFnYWluLlwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRvcGJhci5oaWRlKCk7XG4gICAgICAgICAgICAgIGFsZXJ0KFwiU29tZXRoaW5nIHdlbnQgd3JvbmcuIFBsZWFzZSB0cnkgYWdhaW4uXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBpbiBzZXR0aW5nIGxvY2F0aW9uIGZvciB3ZWF0aGVyOiBcIiArIGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgLy8gRmV0Y2ggZm9yZWNhc3RcbiAgICAgICAgZmV0Y2hGb3JlY2FzdChsYXRpdHVkZSwgbG9uZ2l0dWRlKVxuICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgIGlmIChkYXRhLmNvZCA9PT0gXCIyMDBcIikge1xuICAgICAgICAgICAgICBsZXQgZm9yZWNhc3QgPSBbXTtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0MDsgaSArPSAzKSB7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3QucHVzaChkYXRhLmxpc3RbaV0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHVwZGF0ZUZvcmVjYXN0KGZvcmVjYXN0KTtcbiAgICAgICAgICAgICAgdG9wYmFyLnByb2dyZXNzKDAuNzUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLmNvZCA9PT0gXCI0MDRcIikge1xuICAgICAgICAgICAgICBhbGVydChcIlBsYWNlIG5vdCBmb3VuZC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBhbGVydChcIlNvbWV0aGluZyB3ZW50IHdyb25nLiBQbGVhc2UgdHJ5IGFnYWluLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gc2V0dGluZyBsb2NhdGlvbiBmb3IgZm9yZWNhc3Q6IFwiKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBhbGVydChcIlBsZWFzZSBhbGxvdyBsb2NhdGlvbiBhY2Nlc3MgdG8gdXNlIHRoaXMgZmVhdHVyZS5cIik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGFsZXJ0KFwiU29tZXRoaW5nIHdlbnQgd3JvbmcuIFBsZWFzZSB0cnkgYWdhaW4uXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVdlYXRoZXIoXG4gIGljb24sXG4gIGZlZWxzbGlrZSxcbiAgbWlubWF4LFxuICBsb2NhdGlvbixcbiAgdGVtcGVyYXR1cmUsXG4gIGRlc2NyaXB0aW9uLFxuICBzdW4sXG4gIHZpc2liaWxpdHksXG4gIHdpbmRzcGVlZCxcbiAgaHVtaWRpdHlBbmRQcmVzc3VyZVxuKSB7XG4gIC8vIFVwZGF0ZSBJQ09OXG4gIGNvbnN0IGljb25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImljb24tY29udGFpbmVyXCIpO1xuICBmZXRjaFdlYXRoZXJJY29uKGljb24pLnRoZW4oKGRhdGEpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImljb25cIikuc3JjID0gZGF0YS51cmw7XG4gIH0pO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICBcImZlZWxzLWxpa2VcIlxuICApLmlubmVyVGV4dCA9IGBGZWVscyBsaWtlOiAke2ZlZWxzbGlrZX0gwrBDIC8gJHsoXG4gICAgKGZlZWxzbGlrZSAqIDkpIC8gNSArXG4gICAgMzJcbiAgKS50b0ZpeGVkKDIpfSDCsEZgO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1pbi10ZW1wXCIpLmlubmVyVGV4dCA9IGBNaW46ICR7bWlubWF4WzBdfSDCsEMgLyAkeyhcbiAgICAobWlubWF4WzBdICogOSkgLyA1ICtcbiAgICAzMlxuICApLnRvRml4ZWQoMil9IMKwRmA7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWF4LXRlbXBcIikuaW5uZXJUZXh0ID0gYE1heDogJHttaW5tYXhbMV19IMKwQyAvICR7KFxuICAgIChtaW5tYXhbMV0gKiA5KSAvIDUgK1xuICAgIDMyXG4gICkudG9GaXhlZCgyKX0gwrBGYDtcblxuICAvLyBVcGRhdGUgd2VhdGhlciBpbmZvXG4gIGNvbnN0IHdlYXRoZXJJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWF0aGVyLWluZm9cIik7XG4gIC8vIFVwZGF0ZSB3ZWF0aGVyIGluZm8gY29sb3VyXG4gIC8vIE9wdGltYWwgaHVtYW4gdGVtcGVyYXR1cmU6IDI2LTI4IENcbiAgaWYgKE1hdGguZmxvb3IodGVtcGVyYXR1cmUpIDwgMjYpIHtcbiAgICB3ZWF0aGVySW5mby5zdHlsZS5iYWNrZ3JvdW5kID0gYGxpbmVhci1ncmFkaWVudCgzNTdkZWcsIHJnYmEoMCwyMTIsMjU1LDEpIDAlLCByZ2JhKDAsMCwzNiwxKSAxMDAlKWA7XG4gIH0gZWxzZSBpZiAoTWF0aC5mbG9vcih0ZW1wZXJhdHVyZSkgPiAyOCkge1xuICAgIHdlYXRoZXJJbmZvLnN0eWxlLmJhY2tncm91bmQgPSBgbGluZWFyLWdyYWRpZW50KDM1N2RlZywgcmdiYSgyNTMsMjksMjksMSkgNTAlLCByZ2JhKDI1MiwxNzYsNjksMSkgMTAwJSlgO1xuICB9IGVsc2Uge1xuICAgIHdlYXRoZXJJbmZvLnN0eWxlLmJhY2tncm91bmQgPSBgcmFkaWFsLWdyYWRpZW50KGNpcmNsZSwgcmdiYSgyMzgsMTc0LDIwMiwxKSAwJSwgcmdiYSgxNDgsMTg3LDIzMywxKSAxMDAlKWA7XG4gICAgd2VhdGhlckluZm8uc3R5bGUuY29sb3IgPSBgcmdiYSgwLCAwLCAwLCAxKWA7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRpdGlvbmFsLWluZm9cIikuaW5uZXJUZXh0ID1cbiAgICAgIFwiT3B0aW1hbCB0ZW1wZXJhdHVyZSFcIjtcbiAgfVxuICAvLyBVcGRhdGUgbG9jYXRpb24sIHRlbXAsIGRlc2NyaXB0aW9uXG4gIGZldGNoQ291bnRyeU5hbWUobG9jYXRpb25bMV0pLnRoZW4oKG5hbWUpID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgIFwid2VhdGhlci1sb2NhdGlvblwiXG4gICAgKS5pbm5lclRleHQgPSBgJHtsb2NhdGlvblswXX0sICR7bmFtZX1gO1xuICB9KTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWF0aGVyLXRlbXBcIikuaW5uZXJUZXh0ID1cbiAgICB0ZW1wZXJhdHVyZSArIFwiIMKwQyAvIFwiICsgKCh0ZW1wZXJhdHVyZSAqIDkpIC8gNSArIDMyKS50b0ZpeGVkKDIpICsgXCIgwrBGXCI7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VhdGhlci1kZXNjcmlwdGlvblwiKS5pbm5lclRleHQgPSBkZXNjcmlwdGlvbjtcbiAgLy8gVXBkYXRlIGZhY3RzXG4gIGNvbnN0IGZhY3RzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmYWN0cy1jb250YWluZXJcIik7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VucmlzZVwiKS5pbm5lclRleHQgPSBgU3VucmlzZTogJHtuZXcgRGF0ZShcbiAgICBzdW5bMF0gKiAxMDAwXG4gICkudG9Mb2NhbGVUaW1lU3RyaW5nKCl9IEVTVGA7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3Vuc2V0XCIpLmlubmVyVGV4dCA9IGBTdW5zZXQ6ICR7bmV3IERhdGUoXG4gICAgc3VuWzFdICogMTAwMFxuICApLnRvTG9jYWxlVGltZVN0cmluZygpfSBFU1RgO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICBcIndpbmRzcGVlZFwiXG4gICkuaW5uZXJUZXh0ID0gYFdpbmRzcGVlZDogJHt3aW5kc3BlZWR9IG0vcyA9ICR7KHdpbmRzcGVlZCAvIDEuNjA5KS50b0ZpeGVkKFxuICAgIDJcbiAgKX0gbXBoYDtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgXCJ2aXNpYmlsaXR5XCJcbiAgKS5pbm5lclRleHQgPSBgVmlzaWJpbGl0eTogJHt2aXNpYmlsaXR5fSBtYDtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgXCJodW1pZGl0eS1hbmQtcHJlc3N1cmVcIlxuICApLmlubmVyVGV4dCA9IGBIdW1pZGl0eTogJHtodW1pZGl0eUFuZFByZXNzdXJlWzBdfSAlLCBQcmVzc3VyZTogJHtodW1pZGl0eUFuZFByZXNzdXJlWzFdfSBoUGFgO1xuICBpY29uQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgd2VhdGhlckluZm8uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICBmYWN0c0NvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gIC8vIFdoaWxlIGJhY2tncm91bmQgaXMgZmV0Y2hlZCwgc2VjdGlvbiBoYXMgYSBkYXJrIGJhY2tncm91bmQgZm9yIHJlYWRhYmlsaXR5XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJzZWN0aW9uXCIpLnN0eWxlLmJhY2tncm91bmQgPSBgI2I0YjRiNGA7XG4gIC8vIEFkZCBhIGJhY2tncm91bmQgaW1hZ2UgYmFzZWQgb24gbG9jYXRpb25cbiAgZmV0Y2hXZWF0aGVyQmFja2dyb3VuZChkZXNjcmlwdGlvbikudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICBpZiAocmVzcG9uc2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBSZXNldCBzZWN0aW9uIGJhY2tncm91bmRcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwic2VjdGlvblwiKS5zdHlsZS5iYWNrZ3JvdW5kID0gYCNmZmZgO1xuICAgIC8vIEdldCBzZWN0aW9uIGVsZW1lbnRcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgIFwic2VjdGlvblwiXG4gICAgKS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7cmVzcG9uc2UudXJsfSlgO1xuICAgIHRvcGJhci5wcm9ncmVzcygxKTtcbiAgICAvLyBIaWRlIHRvcGJhciBpbiA1IHNlY29uZHNcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRvcGJhci5oaWRlKCk7XG4gICAgfSwgNTAwMCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVGb3JlY2FzdChmb3JlY2FzdHMpIHtcbiAgLy8gVXBkYXRlIGZvcmVjYXN0XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZm9yZWNhc3RcIikuZm9yRWFjaCgoZm9yZWNhc3QsIGluZGV4KSA9PiB7XG4gICAgLy8gVXBkYXRlIGZvcmVjYXN0IGljb25cbiAgICBmZXRjaFdlYXRoZXJJY29uKGZvcmVjYXN0c1tpbmRleF0ud2VhdGhlclswXS5pY29uKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICBmb3JlY2FzdC5xdWVyeVNlbGVjdG9yKFwiLmZvcmVjYXN0LWljb25cIikuc3JjID0gZGF0YS51cmw7XG4gICAgfSk7XG4gICAgLy8gVXBkYXRlIGZvcmVjYXN0IHRlbXBlcmF0dXJlXG4gICAgZm9yZWNhc3QucXVlcnlTZWxlY3RvcihcIi5mb3JlY2FzdC10ZW1wXCIpLmlubmVyVGV4dCA9IGAke1xuICAgICAgZm9yZWNhc3RzW2luZGV4XS5tYWluLnRlbXBcbiAgICB9IMKwQyAvICR7KChmb3JlY2FzdHNbaW5kZXhdLm1haW4udGVtcCAqIDkpIC8gNSArIDMyKS50b0ZpeGVkKDIpfSDCsEZgO1xuICAgIC8vIFVwZGF0ZSBmb3JlY2FzdCBkZXNjcmlwdGlvblxuICAgIGZvcmVjYXN0LnF1ZXJ5U2VsZWN0b3IoXCIuZm9yZWNhc3QtZGVzY3JpcHRpb25cIikuaW5uZXJUZXh0ID1cbiAgICAgIGZvcmVjYXN0c1tpbmRleF0ud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgICAvLyBVcGRhdGUgZm9yZWNhc3QgZGF0ZSBhbmQgdGltZVxuICAgIGZvcmVjYXN0LnF1ZXJ5U2VsZWN0b3IoXCIuZm9yZWNhc3QtZGF0ZVwiKS5pbm5lclRleHQgPVxuICAgICAgbmV3IERhdGUoZm9yZWNhc3RzW2luZGV4XS5kdCAqIDEwMDApLnRvTG9jYWxlRGF0ZVN0cmluZygpICtcbiAgICAgIFwiIFwiICtcbiAgICAgIG5ldyBEYXRlKGZvcmVjYXN0c1tpbmRleF0uZHQgKiAxMDAwKS50b0xvY2FsZVRpbWVTdHJpbmcoKTtcbiAgICBmb3JlY2FzdC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gIH0pO1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlTGF5b3V0IH0gZnJvbSBcIi4vbGF5b3V0XCI7XG5pbXBvcnQgeyBjaGVja1N0YXRlIH0gZnJvbSBcIi4vcmVzcG9uc2l2ZVwiO1xuXG5jcmVhdGVMYXlvdXQoKTtcbi8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3VycmVudC1sb2NhdGlvbi1idXR0b25cIikuY2xpY2soKTtcbmNoZWNrU3RhdGUod2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiAxMjUwcHgpXCIpKTsiLCIvLyBJbXBvcnQgc2V0bG9jYXRpb24gZnVuY3Rpb25cbmltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5pbXBvcnQgeyBzZXRMb2NhdGlvbiB9IGZyb20gXCIuL2NvbnRlbnQuanNcIjtcbi8vIFRvIG1ha2UgdGhlIGFwcCByZXNwb25zaXZlXG5pbXBvcnQgXCIuL3Jlc3BvbnNpdmUuanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgaGVhZGVyLmlkID0gXCJoZWFkZXJcIjtcbiAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICBzZWN0aW9uLmlkID0gXCJzZWN0aW9uXCI7XG4gIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb290ZXJcIik7XG4gIGZvb3Rlci5pZCA9IFwiZm9vdGVyXCI7XG5cbiAgLy8gSGVhZGVyXG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdGl0bGUuaW5uZXJUZXh0ID0gXCJUaGUtV2VhdGhlci1BcHBcIjtcbiAgdGl0bGUuaWQgPSBcInRpdGxlXCI7XG4gIGNvbnN0IHNlYXJjaENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHNlYXJjaENvbnRhaW5lci5pZCA9IFwic2VhcmNoLWNvbnRhaW5lclwiO1xuICBjb25zdCBzZWFyY2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gIHNlYXJjaC5pZCA9IFwic2VhcmNoXCI7XG4gIHNlYXJjaC5wbGFjZWhvbGRlciA9IFwi8J+UjiBTZWFyY2guLi5cIjtcbiAgY29uc3QgYnV0dG9uQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYnV0dG9uQ29udGFpbmVyLmlkID0gXCJidXR0b24tY29udGFpbmVyXCI7XG4gIGNvbnN0IHNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHNlYXJjaEJ1dHRvbi5pZCA9IFwic2VhcmNoLWJ1dHRvblwiO1xuICBjb25zdCBjdXJyZW50TG9jYXRpb25CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBjdXJyZW50TG9jYXRpb25CdXR0b24uaWQgPSBcImN1cnJlbnQtbG9jYXRpb24tYnV0dG9uXCI7XG5cbiAgLy8gU2VjdGlvblxuICBjb25zdCB3ZWF0aGVyQ2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHdlYXRoZXJDYXJkLmlkID0gXCJ3ZWF0aGVyLWNhcmRcIjtcbiAgY29uc3QgZm9yZWNhc3RDYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAvLyBIZWFkZXI6IFRpdGxlXG4gIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gIC8vIEhlYWRlcjogU2VhcmNoIEJhclxuICBzZWFyY2hCdXR0b24uaW5uZXJUZXh0ID0gXCJTZWFyY2hcIjtcbiAgY3VycmVudExvY2F0aW9uQnV0dG9uLmlubmVyVGV4dCA9IFwiQ3VycmVudCBMb2NhdGlvblwiO1xuICBidXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQoc2VhcmNoQnV0dG9uKTtcbiAgYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGN1cnJlbnRMb2NhdGlvbkJ1dHRvbik7XG4gIHNlYXJjaENvbnRhaW5lci5hcHBlbmRDaGlsZChzZWFyY2gpO1xuICBzZWFyY2hDb250YWluZXIuYXBwZW5kQ2hpbGQoYnV0dG9uQ29udGFpbmVyKTtcbiAgaGVhZGVyLmFwcGVuZENoaWxkKHNlYXJjaENvbnRhaW5lcik7XG5cbiAgLy8gU2VjdGlvbjogd2VhdGhlciBjYXJkOiB7SWNvbiwgV2VhdGhlckluZm8sIEZhY3R9XG4gIC8vIEljb25cbiAgY29uc3QgaWNvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGljb25Db250YWluZXIuaWQgPSBcImljb24tY29udGFpbmVyXCI7XG4gIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICBpY29uLmlkID0gXCJpY29uXCI7XG4gIGNvbnN0IGZlZWxzTGlrZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGZlZWxzTGlrZS5pZCA9IFwiZmVlbHMtbGlrZVwiO1xuICBjb25zdCBtaW5UZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbWluVGVtcC5pZCA9IFwibWluLXRlbXBcIjtcbiAgY29uc3QgbWF4VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG1heFRlbXAuaWQgPSBcIm1heC10ZW1wXCI7XG4gIGNvbnN0IHByZXNzdXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICBwcmVzc3VyZS5pZCA9IFwicHJlc3N1cmVcIjtcbiAgaWNvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChpY29uKTtcbiAgaWNvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChmZWVsc0xpa2UpO1xuICBpY29uQ29udGFpbmVyLmFwcGVuZENoaWxkKG1pblRlbXApO1xuICBpY29uQ29udGFpbmVyLmFwcGVuZENoaWxkKG1heFRlbXApO1xuICAvLyBXZWF0aGVySW5mb1xuICBjb25zdCB3ZWF0aGVySW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHdlYXRoZXJJbmZvLmlkID0gXCJ3ZWF0aGVyLWluZm9cIjtcbiAgY29uc3Qgd2VhdGhlckxvY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgd2VhdGhlckxvY2F0aW9uLmlkID0gXCJ3ZWF0aGVyLWxvY2F0aW9uXCI7XG4gIGNvbnN0IHdlYXRoZXJUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgd2VhdGhlclRlbXAuaWQgPSBcIndlYXRoZXItdGVtcFwiO1xuICBjb25zdCB3ZWF0aGVyRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB3ZWF0aGVyRGVzY3JpcHRpb24uaWQgPSBcIndlYXRoZXItZGVzY3JpcHRpb25cIjtcbiAgY29uc3QgYWRkaXRpb25hbEluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBhZGRpdGlvbmFsSW5mby5pZCA9IFwiYWRkaXRpb25hbC1pbmZvXCI7XG4gIHdlYXRoZXJJbmZvLmFwcGVuZENoaWxkKHdlYXRoZXJMb2NhdGlvbik7XG4gIHdlYXRoZXJJbmZvLmFwcGVuZENoaWxkKHdlYXRoZXJUZW1wKTtcbiAgd2VhdGhlckluZm8uYXBwZW5kQ2hpbGQod2VhdGhlckRlc2NyaXB0aW9uKTtcbiAgd2VhdGhlckluZm8uYXBwZW5kQ2hpbGQoYWRkaXRpb25hbEluZm8pO1xuICAvLyBGYWN0KHMpXG4gIGNvbnN0IGZhY3RzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZmFjdHNDb250YWluZXIuaWQgPSBcImZhY3RzLWNvbnRhaW5lclwiO1xuICBjb25zdCBzdW5yaXNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc3VucmlzZS5pZCA9IFwic3VucmlzZVwiO1xuICBjb25zdCBzdW5zZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzdW5zZXQuaWQgPSBcInN1bnNldFwiO1xuICBjb25zdCB2aXNpYmlsaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdmlzaWJpbGl0eS5pZCA9IFwidmlzaWJpbGl0eVwiO1xuICBjb25zdCB3aW5kc3BlZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB3aW5kc3BlZWQuaWQgPSBcIndpbmRzcGVlZFwiO1xuICBjb25zdCBodW1pZGl0eUFuZFByZXNzdXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaHVtaWRpdHlBbmRQcmVzc3VyZS5pZCA9IFwiaHVtaWRpdHktYW5kLXByZXNzdXJlXCI7XG4gIGZhY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKHN1bnJpc2UpO1xuICBmYWN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChzdW5zZXQpO1xuICBmYWN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZCh2aXNpYmlsaXR5KTtcbiAgZmFjdHNDb250YWluZXIuYXBwZW5kQ2hpbGQod2luZHNwZWVkKTtcbiAgZmFjdHNDb250YWluZXIuYXBwZW5kQ2hpbGQoaHVtaWRpdHlBbmRQcmVzc3VyZSk7XG5cbiAgd2VhdGhlckNhcmQuYXBwZW5kQ2hpbGQoaWNvbkNvbnRhaW5lcik7XG4gIHdlYXRoZXJDYXJkLmFwcGVuZENoaWxkKHdlYXRoZXJJbmZvKTtcbiAgd2VhdGhlckNhcmQuYXBwZW5kQ2hpbGQoZmFjdHNDb250YWluZXIpO1xuXG4gIC8vIEZvcmVjYXN0IGNhcmQgY29udGVudHM6IDh4IGNhcmRzIHdpdGggW0ljb24sIHRlbXBlcmF0dXJlLCBkZXNjcmlwdGlvbiwgZGF0ZSBhbmQgdGltZV1cbiAgZm9yZWNhc3RDYXJkLmlkID0gXCJmb3JlY2FzdC1jYXJkXCI7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgOTsgaSsrKSB7XG4gICAgY29uc3QgZm9yZWNhc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGZvcmVjYXN0LmlkID0gYGZvcmVjYXN0LSR7aX1gO1xuICAgIGZvcmVjYXN0LmNsYXNzTmFtZSA9IFwiZm9yZWNhc3RcIjtcbiAgICBjb25zdCBmb3JlY2FzdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgIGZvcmVjYXN0SWNvbi5pZCA9IGBmb3JlY2FzdC1pY29uLSR7aX1gO1xuICAgIGZvcmVjYXN0SWNvbi5jbGFzc05hbWUgPSBcImZvcmVjYXN0LWljb25cIjtcbiAgICBjb25zdCBmb3JlY2FzdFRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGZvcmVjYXN0VGVtcC5pZCA9IGBmb3JlY2FzdC10ZW1wLSR7aX1gO1xuICAgIGZvcmVjYXN0VGVtcC5jbGFzc05hbWUgPSBcImZvcmVjYXN0LXRlbXBcIjtcbiAgICBjb25zdCBmb3JlY2FzdERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBmb3JlY2FzdERlc2NyaXB0aW9uLmlkID0gYGZvcmVjYXN0LWRlc2NyaXB0aW9uLSR7aX1gO1xuICAgIGZvcmVjYXN0RGVzY3JpcHRpb24uY2xhc3NOYW1lID0gXCJmb3JlY2FzdC1kZXNjcmlwdGlvblwiO1xuICAgIGNvbnN0IGZvcmVjYXN0RGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZm9yZWNhc3REYXRlLmlkID0gYGZvcmVjYXN0LWRhdGUtJHtpfWA7XG4gICAgZm9yZWNhc3REYXRlLmNsYXNzTmFtZSA9IFwiZm9yZWNhc3QtZGF0ZVwiO1xuICAgIGZvcmVjYXN0LmFwcGVuZENoaWxkKGZvcmVjYXN0SWNvbik7XG4gICAgZm9yZWNhc3QuYXBwZW5kQ2hpbGQoZm9yZWNhc3RUZW1wKTtcbiAgICBmb3JlY2FzdC5hcHBlbmRDaGlsZChmb3JlY2FzdERlc2NyaXB0aW9uKTtcbiAgICBmb3JlY2FzdC5hcHBlbmRDaGlsZChmb3JlY2FzdERhdGUpO1xuICAgIGZvcmVjYXN0Q2FyZC5hcHBlbmRDaGlsZChmb3JlY2FzdCk7XG4gIH1cblxuICBzZWN0aW9uLmFwcGVuZENoaWxkKHdlYXRoZXJDYXJkKTtcbiAgc2VjdGlvbi5hcHBlbmRDaGlsZChmb3JlY2FzdENhcmQpO1xuICAvLyBGb290ZXJcbiAgZm9vdGVyLmlkID0gXCJmb290ZXJcIjtcbiAgY29uc3QgY3JlZGl0cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGNyZWRpdHMuaWQgPSBcImNyZWRpdHNcIjtcbiAgY29uc3QgcHVycGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcHVycGxlLmlkID0gXCJwdXJwbGVcIjtcbiAgY29uc3QgaW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGluZm8uaWQgPSBcImluZm9cIjtcblxuICBmb290ZXIuYXBwZW5kQ2hpbGQoY3JlZGl0cyk7XG4gIGZvb3Rlci5hcHBlbmRDaGlsZChwdXJwbGUpO1xuICBmb290ZXIuYXBwZW5kQ2hpbGQoaW5mbyk7XG5cbiAgLy8gRm9vdGVyIGNvbnRlbnRcbiAgY3JlZGl0cy5pbm5lckhUTUwgPVxuICAgIFwiV2VhdGhlciBkYXRhIHByb3ZpZGVkIGJ5IDxhIGhyZWY9J2h0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnLyc+T3BlbldlYXRoZXJNYXA8L2E+PGJyPlwiICtcbiAgICBcIkZvbnRzICYgSW1hZ2VzIHByb3ZpZGVkIGJ5IDxhIGhyZWY9J2h0dHBzOi8vYWRvYmUuY29tJz5BZG9iZVwiICtcbiAgICBcIiBBbmQgPGEgaHJlZj0naHR0cHM6Ly93d3cudW5zcGxhc2guY29tJz5VbnNwbGFzaDwvYT5cIjtcbiAgcHVycGxlLmlubmVySFRNTCA9XG4gICAgXCI8ZGl2PiByZWQgKyBibHVlID0gPC9kaXY+PGEgaHJlZj0naHR0cHM6Ly93d3cuZ2l0aHViLmNvbS9yZWRwbHVzYmx1ZSc+PGRpdiBpZD0nZ2l0aHViLWltYWdlJz48L2Rpdj48L2E+XCI7XG4gIGluZm8uaW5uZXJIVE1MID1cbiAgICBcIjxhIGhyZWY9J2h0dHBzOi8vZ2l0aHViLmNvbS9yZWRwbHVzYmx1ZS93ZWF0aGVyLWFwcC90cmVlL21haW4vc3JjJz5Tb3VyY2UgY29kZTwvYT48YnI+XCIgK1xuICAgIFwiPGRpdiBpZD0ndXNhZ2UnPjxkaXYgaWQ9J2luZm8taW1hZ2UnPjwvZGl2PjxkaXY+VXNhZ2UgSW5mbzwvZGl2PjwvZGl2PlwiO1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzZWN0aW9uKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb290ZXIpO1xuXG4gIC8vIERhcmsgbW9kZSBidXR0b25cbiAgY29uc3QgZGFya01vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBkYXJrTW9kZS5pZCA9IFwiZGFyay1tb2RlXCI7XG4gIGNvbnN0IGRhcmtNb2RlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGRhcmtNb2RlSWNvbi5pZCA9IFwiZGFyay1tb2RlLWljb25cIjtcbiAgY29uc3QgZGFya01vZGVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZGFya01vZGVUZXh0LmlkID0gXCJkYXJrLW1vZGUtdGV4dFwiO1xuICBkYXJrTW9kZVRleHQuaW5uZXJIVE1MID0gXCJMaWdodCBNb2RlXCI7XG4gIGRhcmtNb2RlLmFwcGVuZENoaWxkKGRhcmtNb2RlSWNvbik7XG4gIGRhcmtNb2RlLmFwcGVuZENoaWxkKGRhcmtNb2RlVGV4dCk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGFya01vZGUpO1xuXG4gIGFkZExpc3RlbmVycygpO1xufVxuXG5mdW5jdGlvbiBhZGRMaXN0ZW5lcnMoKSB7XG4gIGNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoXCIpO1xuICBjb25zdCBzZWFyY2hCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaC1idXR0b25cIik7XG4gIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlY3Rpb25cIik7XG4gIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9vdGVyXCIpO1xuICBjb25zdCBjdXJyZW50TG9jYXRpb25CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICBcImN1cnJlbnQtbG9jYXRpb24tYnV0dG9uXCJcbiAgKTtcbiAgY29uc3QgZGFya01vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhcmstbW9kZVwiKTtcbiAgY29uc3QgZGFya01vZGVUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXJrLW1vZGUtdGV4dFwiKTtcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpdGxlXCIpO1xuICBkYXJrTW9kZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGxldCBkYXJrID0gZGFya01vZGVUZXh0LmlubmVySFRNTCA9PT0gXCJEYXJrIE1vZGVcIiA/IHRydWUgOiBmYWxzZTtcbiAgICBsZXQgcHJpbWFyeUNvbG9yID0gZGFya1xuICAgICAgPyBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMC44NSlcIlxuICAgICAgOiBcInJnYmEoMCwgMCwgMCwgMC44NSlcIjtcbiAgICBsZXQgZm9udENvbG9yID0gZGFyayA/IFwicmdiYSgwLCAwLCAwLCAwLjg1KVwiIDogXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuODUpXCI7XG4gICAgbGV0IHRpdGxlQ29sb3IgPSBkYXJrID8gXCJ3aGl0ZVwiIDogXCJibGFja1wiO1xuICAgIC8vIERhcmsgbW9kZSBidXR0b25cbiAgICBkYXJrTW9kZVRleHQuaW5uZXJIVE1MID1cbiAgICAgIGRhcmtNb2RlVGV4dC5pbm5lckhUTUwgPT09IFwiRGFyayBNb2RlXCIgPyBcIkxpZ2h0IE1vZGVcIiA6IFwiRGFyayBNb2RlXCI7XG4gICAgLy8gQ2hhbmdlIHZhbHVlIG9mIGNzcyB2YXJpYWJsZXMgcmVsYXRlZCB0byBmb250IGFuZCBiZ1xuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihcIjpyb290XCIpXG4gICAgICAuc3R5bGUuc2V0UHJvcGVydHkoXCItLWZvbnQtY29sb3JcIiwgZm9udENvbG9yKTtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCI6cm9vdFwiKVxuICAgICAgLnN0eWxlLnNldFByb3BlcnR5KFwiLS1saWdodC1ibGFja1wiLCBwcmltYXJ5Q29sb3IpO1xuICAgIC8vIEJvZHkgYmFja2dyb3VuZCBjb2xvclxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID1cbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID09PSBcInJnYmEoMCwgMCwgMCwgMC45KVwiXG4gICAgICAgID8gXCJ3aGl0ZVwiXG4gICAgICAgIDogXCJyZ2JhKDAsIDAsIDAsIDAuOSlcIjtcbiAgICB0aXRsZS5zdHlsZS5jb2xvciA9IHRpdGxlQ29sb3I7XG4gIH0pO1xuXG4gIHNlYXJjaEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gIC8vIFdoaWxlIHRoZSB2YWx1ZSBvZiBzZWFyY2ggaXMgMCwgYnV0dG9uIHJlbWFpbnMgZGlzYWJsZWRcbiAgc2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgaWYgKHNlYXJjaC52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICBzZWFyY2hCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIC8vIExpc3RlbiBmb3IgRU5URVIga2V5XG4gICAgICBzZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgc2VhcmNoQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWFyY2hCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgc2VhcmNoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgc2V0TG9jYXRpb24oXCJzZWFyY2hcIik7XG4gICAgLy8gVG8gcHJldmVudCBtdWx0aXBsZSBhcGkgY2FsbHNcbiAgICBzZWFyY2hCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgIGN1cnJlbnRMb2NhdGlvbkJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIHNlY3Rpb24uc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgIGZvb3Rlci5zdHlsZS5kaXNwbGF5ID0gXCJncmlkXCI7XG4gIH0pO1xuXG4gIGN1cnJlbnRMb2NhdGlvbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHNldExvY2F0aW9uKFwiY3VycmVudFwiKTtcbiAgICAvLyBJZiBubyBsb2NhdGlvbiBhY2Nlc3NcbiAgICBuYXZpZ2F0b3IucGVybWlzc2lvbnMucXVlcnkoeyBuYW1lOiBcImdlb2xvY2F0aW9uXCIgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICBpZiAocmVzdWx0LnN0YXRlID09PSBcImRlbmllZFwiKSB7XG4gICAgICAgIGFsZXJ0KFwiUGxlYXNlIGFsbG93IGxvY2F0aW9uIGFjY2VzcyB0byB1c2UgdGhpcyBmZWF0dXJlXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRW1wdHkgc2VhcmNoIGJhclxuICAgICAgICBzZWFyY2gudmFsdWUgPSBcIlwiO1xuICAgICAgICBzZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICAgICAgZm9vdGVyLnN0eWxlLmRpc3BsYXkgPSBcImdyaWRcIjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGN1cnJlbnRMb2NhdGlvbkJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gIH0pO1xuXG4gIC8vIFVzYWdlIGJ1dHRvblxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzYWdlXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgYWxlcnQoXCJUaGlzIGFwcGxpY2F0aW9uIGNhbiBvbmx5IGJlIHVzZWQgMzYwMCB0aW1lcyBwZXIgaG91ciDwn5iPXCIpO1xuICB9KTtcbn1cbiIsImxldCB4ID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiAxMjUwcHgpXCIpO1xuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tTdGF0ZSh4KSB7XG4gICAgY29uc3Qgd2VhdGhlckNhcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXRoZXItY2FyZFwiKTtcbiAgICAgICAgY29uc3QgaWNvbkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaWNvbi1jb250YWluZXJcIik7XG4gICAgICAgIGNvbnN0IHdlYXRoZXJJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWF0aGVyLWluZm9cIik7XG4gICAgICAgIGNvbnN0IGZhY3RzQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmYWN0cy1jb250YWluZXJcIik7XG4gICAgaWYgKHgubWF0Y2hlcykgeyBcbiAgICAgICAgLy8gUmUtb3JkZXIgZWxlbWVudHMgaW4gd2VhdGhlckNhcmRcbiAgICAgICAgd2VhdGhlckNhcmQucmVtb3ZlQ2hpbGQoaWNvbkNvbnRhaW5lcik7XG4gICAgICAgIHdlYXRoZXJDYXJkLnJlbW92ZUNoaWxkKHdlYXRoZXJJbmZvKTtcbiAgICAgICAgd2VhdGhlckNhcmQucmVtb3ZlQ2hpbGQoZmFjdHNDb250YWluZXIpO1xuICAgICAgICB3ZWF0aGVyQ2FyZC5hcHBlbmRDaGlsZCh3ZWF0aGVySW5mbyk7XG4gICAgICAgIHdlYXRoZXJDYXJkLmFwcGVuZENoaWxkKGljb25Db250YWluZXIpO1xuICAgICAgICB3ZWF0aGVyQ2FyZC5hcHBlbmRDaGlsZChmYWN0c0NvbnRhaW5lcik7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAod2VhdGhlckNhcmQuY29udGFpbnMod2VhdGhlckluZm8pKSB7XG4gICAgICAgICAgICB3ZWF0aGVyQ2FyZC5yZW1vdmVDaGlsZCh3ZWF0aGVySW5mbyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdlYXRoZXJDYXJkLmNvbnRhaW5zKGljb25Db250YWluZXIpKSB7XG4gICAgICAgICAgICB3ZWF0aGVyQ2FyZC5yZW1vdmVDaGlsZChpY29uQ29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2VhdGhlckNhcmQuY29udGFpbnMoZmFjdHNDb250YWluZXIpKSB7XG4gICAgICAgICAgICB3ZWF0aGVyQ2FyZC5yZW1vdmVDaGlsZChmYWN0c0NvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgd2VhdGhlckNhcmQuYXBwZW5kQ2hpbGQoaWNvbkNvbnRhaW5lcik7XG4gICAgICAgIHdlYXRoZXJDYXJkLmFwcGVuZENoaWxkKHdlYXRoZXJJbmZvKTtcbiAgICAgICAgd2VhdGhlckNhcmQuYXBwZW5kQ2hpbGQoZmFjdHNDb250YWluZXIpO1xuICAgIH1cbn1cblxueC5vbmNoYW5nZSA9IGNoZWNrU3RhdGU7IC8vIEF0dGFjaCBsaXN0ZW5lciBmdW5jdGlvbiBvbiBzdGF0ZSBjaGFuZ2VzXG5cbi8vIEF0IEggPSAxNTAgb3IgVyA9IDM1MCBkaXNwbGF5IGVycm9yIG1lc3NhZ2VcbmxldCB5ID0gd2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiAzNTBweCkgb3IgKG1heC1oZWlnaHQ6IDE1MHB4KVwiKTtcblxuZnVuY3Rpb24gZGlzcGxheUVycm9yKHkpe1xuICAgIGlmICh5Lm1hdGNoZXMpIHtcbiAgICAgICAgYWxlcnQoXCJTb3JyeSwgeW91ciBzY3JlZW4gaXMgdG9vIHNtYWxsIHRvIGRpc3BsYXkgdGhpcyBwYWdlIPCfpbJcIik7ICAgICAgICBcbiAgICB9XG59XG5cbnkub25jaGFuZ2UgPSBkaXNwbGF5RXJyb3I7IC8vIEF0dGFjaCBsaXN0ZW5lciBmdW5jdGlvbiBvbiBzdGF0ZSBjaGFuZ2VzIiwiLy8gQVBJIEtleXMgZm9yIE9wZW4gV2VhdGhlciBBUEkgKEZyZWUgZm9yIGFsbCkgRW5jcnlwdGVkXG5leHBvcnQgY29uc3Qgc2VjcmV0cyA9IHtcbiAgT1BFTldFQVRIRVI6IFwiNjQ2NWJlYzUxYjRlOWY0MTFjYjkzZDk0ODgxMjEyMjRcIixcbn07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiZGF0YS9DaGVhcCBQaW5lIFJlZ3VsYXIudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiZGF0YS9FbHphIFJlZ3VsYXIudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18gPSBuZXcgVVJMKFwiZGF0YS93ZWF0aGVyLnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fID0gbmV3IFVSTChcImRhdGEvZ2l0aHViLnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF80X19fID0gbmV3IFVSTChcImRhdGEvaW5mby5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNV9fXyA9IG5ldyBVUkwoXCJkYXRhL2RhcmstbW9kZS5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzVfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF81X19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJDaGVhcCBQaW5lXFxcIjtcXG4gIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKTtcXG59XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogXFxcIkVsemEgUmVndWxhclxcXCI7XFxuICBzcmM6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gKyBcIik7XFxufVxcblxcbjpyb290IHtcXG4gIC0tYm94LXNoYWRvdzogMHB4IDRweCA2cHggMHB4IHJnYmEoNTAsIDUwLCA5MywgMC4xMSksXFxuICAgIDBweCAxcHggM3B4IDBweCByZ2JhKDAsIDAsIDAsIDAuMDgpO1xcbiAgLS1wdXJwbGU6ICM5MTQ3ZmY7XFxuICAtLWxpZ2h0LWJsYWNrOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNik7XFxuICAtLWZvbnQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44NSk7XFxufVxcblxcbmh0bWwsXFxuYm9keSB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbmJvZHkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMjUlIGF1dG8gbWluKGF1dG8sIDEwJSk7XFxuICBnYXA6IDBweDtcXG59XFxuXFxuaGVhZGVyLFxcbnNlY3Rpb24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJveC1zaGFkb3c6IHZhcigtLWJveC1zaGFkb3cpO1xcbiAgbWFyZ2luOiA1cHg7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyArIFwiKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuI3RpdGxlIHtcXG4gIGZvbnQtc2l6ZTogNXJlbTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiQ2hlYXAgUGluZVxcXCIsIGN1cnNpdmU7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuI3NlYXJjaC1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBnYXA6IDEwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbn1cXG5cXG4jc2VhcmNoIHtcXG4gIGZvbnQtc2l6ZTogMTNweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiQ291cmllciBOZXdcXFwiLCBDb3VyaWVyLCBtb25vc3BhY2U7XFxuICBwYWRkaW5nLWxlZnQ6IDVweDtcXG4gIHdpZHRoOiBtYXgoMjAwcHgsIDIwdncpO1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDEwMG1zIGVhc2UtaW4sIGJvcmRlciAxMDBtcyBlYXNlLWluLFxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yIDEwMG1zIGVhc2UtaW47XFxuICBib3JkZXI6IDJweCBzb2xpZCAjZGVlMWUyO1xcbiAgY29sb3I6IHJnYigxNCwgMTQsIDE2KTtcXG4gIGJhY2tncm91bmQ6ICNkZWUxZTI7XFxuICBvcGFjaXR5OiA5MCU7XFxufVxcblxcbiNzZWFyY2g6aG92ZXIge1xcbiAgYm9yZGVyLWNvbG9yOiAjY2NjO1xcbn1cXG4jc2VhcmNoOmZvY3VzIHtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBib3JkZXItY29sb3I6IHZhcigtLXB1cnBsZSk7XFxuICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgb3BhY2l0eTogMTAwJTtcXG59XFxuXFxuI3NlYXJjaDo6cGxhY2Vob2xkZXIge1xcbiAgY29sb3I6ICNjY2M7XFxuICBmb250LXdlaWdodDogOTAwO1xcbn1cXG5cXG4jYnV0dG9uLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGdhcDogMTBweDtcXG59XFxuXFxuI3NlYXJjaC1idXR0b24sXFxuI2N1cnJlbnQtbG9jYXRpb24tYnV0dG9uIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIG91dGxpbmU6IDA7XFxuICBib3JkZXI6IG5vbmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIGZvbnQtc2l6ZTogMTNweDtcXG4gIGhlaWdodDogMzBweDtcXG4gIHdpZHRoOiBtYXgoMTAwcHgsIDEwdncpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHVycGxlKTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDAgMTBweDtcXG4gIG9wYWNpdHk6IDkwJTtcXG59XFxuXFxuI3NlYXJjaC1idXR0b246aG92ZXIsXFxuI2N1cnJlbnQtbG9jYXRpb24tYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXB1cnBsZSk7XFxuICBvcGFjaXR5OiAxMDAlO1xcbn1cXG5cXG4jc2VhcmNoLWJ1dHRvbjpkaXNhYmxlZCxcXG4jY3VycmVudC1sb2NhdGlvbi1idXR0b246ZGlzYWJsZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XFxufVxcblxcbnNlY3Rpb24ge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gIHBhZGRpbmc6IDE1cHg7XFxuICBnYXA6IDEwcHg7XFxufVxcblxcbiN3ZWF0aGVyLWNhcmQge1xcbiAgd2lkdGg6IDkwJTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG8gYXV0byBhdXRvO1xcbiAgZ2FwOiAxMHB4O1xcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG4gIG1pbi13aWR0aDogbWF4LWNvbnRlbnQ7XFxufVxcblxcbiN3ZWF0aGVyLWluZm8ge1xcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44NSk7XFxufVxcblxcbiN3ZWF0aGVyLWluZm8sXFxuI2ljb24tY29udGFpbmVyLFxcbiNmYWN0cy1jb250YWluZXIge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogNXB4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBtYXJnaW46IDVweDtcXG4gIHBhZGRpbmc6IDE1cHg7XFxuICBmb250LWZhbWlseTogXFxcIkVsemEgUmVndWxhclxcXCIsIGN1cnNpdmU7XFxuICBib3gtc2hhZG93OiB2YXIoLS1ib3gtc2hhZG93KTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgb3BhY2l0eTogODUlO1xcbn1cXG5cXG4jaWNvbi1jb250YWluZXIsXFxuI2ZhY3RzLWNvbnRhaW5lciB7XFxuICBjb2xvcjogdmFyKC0tZm9udC1jb2xvcik7XFxufVxcblxcbiN3ZWF0aGVyLWluZm86aG92ZXIge1xcbiAgb3BhY2l0eTogMTAwJTtcXG59XFxuXFxuI2ljb24tY29udGFpbmVyLFxcbiNmYWN0cy1jb250YWluZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQtYmxhY2spO1xcbn1cXG5cXG4jaWNvbi1jb250YWluZXI6aG92ZXIsXFxuI2ZhY3RzLWNvbnRhaW5lcjpob3ZlcixcXG4jZm9yZWNhc3QtY2FyZCA+IGRpdjpob3ZlciB7XFxuICBvcGFjaXR5OiAxMDAlO1xcbn1cXG5cXG4jd2VhdGhlci1sb2NhdGlvbixcXG4jd2VhdGhlci10ZW1wIHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IDJyZW07XFxufVxcblxcbiNhZGRpdGlvbmFsLWluZm8ge1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbn1cXG5cXG4jZm9yZWNhc3QtY2FyZCB7XFxuICB3aWR0aDogOTAlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjAwcHgsIDFmcikpO1xcbiAgZ2FwOiAxMHB4O1xcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG4gIG1pbi13aWR0aDogbWF4LWNvbnRlbnQ7XFxufVxcblxcbiNmb3JlY2FzdC1jYXJkID4gZGl2IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIG1hcmdpbjogNXB4O1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRWx6YSBSZWd1bGFyXFxcIiwgY3Vyc2l2ZTtcXG4gIGNvbG9yOiB2YXIoLS1mb250LWNvbG9yKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0LWJsYWNrKTtcXG4gIGJveC1zaGFkb3c6IHZhcigtLWJveC1zaGFkb3cpO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbiAgb3BhY2l0eTogODUlO1xcbn1cXG5cXG4jZm9yZWNhc3QtY2FyZCA+IGRpdiA+IGltZyB7XFxuICB3aWR0aDogNTBweDtcXG4gIGhlaWdodDogNTBweDtcXG59XFxuXFxuLmZvcmVjYXN0LXRlbXAge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG59XFxuXFxuZm9vdGVyIHtcXG4gIGNvbG9yOiB2YXIoLS1mb250LWNvbG9yKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0LWJsYWNrKTtcXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAxMHB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJFbHphIFJlZ3VsYXJcXFwiLCBjdXJzaXZlO1xcbiAgYm94LXNoYWRvdzogdmFyKC0tYm94LXNoYWRvdyk7XFxuICBoZWlnaHQ6IG1heC1jb250ZW50O1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIG1hcmdpbjogNXB4O1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG5cXG4vKiBObyBjaGlsZHJlbiBvZiBmb290ZXIgd2lsbCBoYXZlIG1hcmdpbi9wYWRkaW5nICovXFxuZm9vdGVyID4gKiB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5mb290ZXI6aG92ZXIge1xcbiAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXB1cnBsZSk7XFxuICBvdXRsaW5lLW9mZnNldDogMnB4O1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjAxKTtcXG59XFxuXFxuI2NyZWRpdHMge1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xcbn1cXG5cXG4jY3JlZGl0cyA+IGEsXFxuI2NyZWRpdHMgPiBhOnZpc2l0ZWQsXFxuI2luZm8gPiBhLFxcbiNpbmZvID4gYTp2aXNpdGVkIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGNvbG9yOiB2YXIoLS1wdXJwbGUpO1xcbn1cXG5cXG4jcHVycGxlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgZ2FwOiA1cHg7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcblxcbiNnaXRodWItaW1hZ2Uge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyArIFwiKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICB3aWR0aDogMjBweDtcXG4gIGhlaWdodDogMjBweDtcXG59XFxuXFxuI2dpdGh1Yi1pbWFnZTpob3ZlcixcXG4jaW5mby1pbWFnZTpob3ZlciB7XFxuICByb3RhdGU6IDM2MGRlZztcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcXG4gIHRyYW5zaXRpb246IDAuNXM7XFxufVxcblxcbiNpbmZvIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG8gYXV0bztcXG4gIGp1c3RpZnktY29udGVudDogZW5kO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1hcmdpbi1yaWdodDogMTBweDtcXG59XFxuXFxuI3VzYWdlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDJweDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbiNpbmZvLWltYWdlIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX18gKyBcIik7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgd2lkdGg6IDI1cHg7XFxuICBoZWlnaHQ6IDI1cHg7XFxufVxcblxcbiNkYXJrLW1vZGUge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAxNXB4O1xcbiAgbGVmdDogMTVweDtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIGJveC1zaGFkb3c6IHZhcigtLWJveC1zaGFkb3cpO1xcbiAgei1pbmRleDogMTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiA1cHg7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuXFxuI2RhcmstbW9kZS1pY29uIHtcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzVfX18gKyBcIik7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgd2lkdGg6IDIwcHg7XFxuICBoZWlnaHQ6IDIwcHg7XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDEyNTBweCkge1xcbiAgYm9keSB7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogMjUlIGF1dG8gYXV0bztcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxMDAlO1xcbiAgfVxcbiAgI3RpdGxlIHtcXG4gICAgZm9udC1zaXplOiBtaW4oNC4yNXJlbSwgMzc1JSk7XFxuICB9XFxuICAjc2VhcmNoLWJ1dHRvbixcXG4gICNjdXJyZW50LWxvY2F0aW9uLWJ1dHRvbiB7XFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgcGFkZGluZzogMXB4O1xcbiAgfVxcbiAgI3dlYXRoZXItY2FyZCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgfVxcbiAgI3dlYXRoZXItY2FyZCA+IGRpdiB7XFxuICAgIHdpZHRoOiA5MCU7XFxuICB9XFxuICAjd2VhdGhlci1pbmZvID4gKiB7XFxuICAgIGZvbnQtc2l6ZTogbWluKDI1cHgsIDE1MCUpO1xcbiAgfVxcbiAgZm9vdGVyIHtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvO1xcbiAgfVxcbiAgI2luZm8sXFxuICAjY3JlZGl0cyB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtaGVpZ2h0OiA1NTBweCkge1xcbiAgYm9keSB7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogNDUlIGF1dG8gYXV0bztcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxMDAlO1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LWhlaWdodDogMzAwcHgpIHtcXG4gIGhlYWRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgfVxcbiAgI3NlYXJjaC1jb250YWluZXIge1xcbiAgICBtYXJnaW46IDBweDtcXG4gICAgZ2FwOiAxcHg7XFxuICB9XFxufVxcblxcbi8qIERpc2FibGUgZm9yIHNtYWxsIHNjcmVlbnM6ICAqL1xcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDM1MHB4KSB7XFxuICBodG1sIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzkxNDdmZjtcXG4gIH1cXG4gIGJvZHkge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LWhlaWdodDogMTUwcHgpIHtcXG4gIGh0bWwge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTE0N2ZmO1xcbiAgfVxcbiAgYm9keSB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSx5QkFBeUI7RUFDekIsNENBQXVDO0FBQ3pDOztBQUVBO0VBQ0UsMkJBQTJCO0VBQzNCLDRDQUFnQztBQUNsQzs7QUFFQTtFQUNFO3VDQUNxQztFQUNyQyxpQkFBaUI7RUFDakIsdUNBQXVDO0VBQ3ZDLGlDQUFpQztBQUNuQzs7QUFFQTs7RUFFRSxZQUFZO0VBQ1osU0FBUztBQUNYOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDJDQUEyQztFQUMzQyxRQUFRO0FBQ1Y7O0FBRUE7O0VBRUUsc0JBQXNCO0VBQ3RCLDZCQUE2QjtFQUM3QixXQUFXO0VBQ1gsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UseURBQXVDO0VBQ3ZDLHNCQUFzQjtFQUN0QixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxlQUFlO0VBQ2Ysa0NBQWtDO0VBQ2xDLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsdUJBQXVCO0VB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QjtFQUN6QjtFQUNBO0lBQ0UsV0FBVztJQUNYLFFBQVE7RUFDVjtBQUNGOztBQUVBLGdDQUFnQztBQUNoQztFQUNFO0lBQ0UseUJBQXlCO0VBQzNCO0VBQ0E7SUFDRSxhQUFhO0VBQ2Y7QUFDRjs7QUFFQTtFQUNFO0lBQ0UseUJBQXlCO0VBQzNCO0VBQ0E7SUFDRSxhQUFhO0VBQ2Y7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiQ2hlYXAgUGluZVxcXCI7XFxuICBzcmM6IHVybChkYXRhL0NoZWFwXFxcXCBQaW5lXFxcXCBSZWd1bGFyLnR0Zik7XFxufVxcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJFbHphIFJlZ3VsYXJcXFwiO1xcbiAgc3JjOiB1cmwoZGF0YS9FbHphXFxcXCBSZWd1bGFyLnR0Zik7XFxufVxcblxcbjpyb290IHtcXG4gIC0tYm94LXNoYWRvdzogMHB4IDRweCA2cHggMHB4IHJnYmEoNTAsIDUwLCA5MywgMC4xMSksXFxuICAgIDBweCAxcHggM3B4IDBweCByZ2JhKDAsIDAsIDAsIDAuMDgpO1xcbiAgLS1wdXJwbGU6ICM5MTQ3ZmY7XFxuICAtLWxpZ2h0LWJsYWNrOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNik7XFxuICAtLWZvbnQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44NSk7XFxufVxcblxcbmh0bWwsXFxuYm9keSB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbmJvZHkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMjUlIGF1dG8gbWluKGF1dG8sIDEwJSk7XFxuICBnYXA6IDBweDtcXG59XFxuXFxuaGVhZGVyLFxcbnNlY3Rpb24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJveC1zaGFkb3c6IHZhcigtLWJveC1zaGFkb3cpO1xcbiAgbWFyZ2luOiA1cHg7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKGRhdGEvd2VhdGhlci5zdmcpO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4jdGl0bGUge1xcbiAgZm9udC1zaXplOiA1cmVtO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJDaGVhcCBQaW5lXFxcIiwgY3Vyc2l2ZTtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG5cXG4jc2VhcmNoLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogMTBweDtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XFxufVxcblxcbiNzZWFyY2gge1xcbiAgZm9udC1zaXplOiAxM3B4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJDb3VyaWVyIE5ld1xcXCIsIENvdXJpZXIsIG1vbm9zcGFjZTtcXG4gIHBhZGRpbmctbGVmdDogNXB4O1xcbiAgd2lkdGg6IG1heCgyMDBweCwgMjB2dyk7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgbGluZS1oZWlnaHQ6IDEuNTtcXG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMTAwbXMgZWFzZS1pbiwgYm9yZGVyIDEwMG1zIGVhc2UtaW4sXFxuICAgIGJhY2tncm91bmQtY29sb3IgMTAwbXMgZWFzZS1pbjtcXG4gIGJvcmRlcjogMnB4IHNvbGlkICNkZWUxZTI7XFxuICBjb2xvcjogcmdiKDE0LCAxNCwgMTYpO1xcbiAgYmFja2dyb3VuZDogI2RlZTFlMjtcXG4gIG9wYWNpdHk6IDkwJTtcXG59XFxuXFxuI3NlYXJjaDpob3ZlciB7XFxuICBib3JkZXItY29sb3I6ICNjY2M7XFxufVxcbiNzZWFyY2g6Zm9jdXMge1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIGJvcmRlci1jb2xvcjogdmFyKC0tcHVycGxlKTtcXG4gIGJhY2tncm91bmQ6ICNmZmY7XFxuICBvcGFjaXR5OiAxMDAlO1xcbn1cXG5cXG4jc2VhcmNoOjpwbGFjZWhvbGRlciB7XFxuICBjb2xvcjogI2NjYztcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxufVxcblxcbiNidXR0b24tY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgZ2FwOiAxMHB4O1xcbn1cXG5cXG4jc2VhcmNoLWJ1dHRvbixcXG4jY3VycmVudC1sb2NhdGlvbi1idXR0b24ge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgb3V0bGluZTogMDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgZm9udC1zaXplOiAxM3B4O1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgd2lkdGg6IG1heCgxMDBweCwgMTB2dyk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wdXJwbGUpO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgcGFkZGluZzogMCAxMHB4O1xcbiAgb3BhY2l0eTogOTAlO1xcbn1cXG5cXG4jc2VhcmNoLWJ1dHRvbjpob3ZlcixcXG4jY3VycmVudC1sb2NhdGlvbi1idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHVycGxlKTtcXG4gIG9wYWNpdHk6IDEwMCU7XFxufVxcblxcbiNzZWFyY2gtYnV0dG9uOmRpc2FibGVkLFxcbiNjdXJyZW50LWxvY2F0aW9uLWJ1dHRvbjpkaXNhYmxlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcXG59XFxuXFxuc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGdhcDogMTBweDtcXG59XFxuXFxuI3dlYXRoZXItY2FyZCB7XFxuICB3aWR0aDogOTAlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byBhdXRvIGF1dG87XFxuICBnYXA6IDEwcHg7XFxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcbiAgbWluLXdpZHRoOiBtYXgtY29udGVudDtcXG59XFxuXFxuI3dlYXRoZXItaW5mbyB7XFxuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjg1KTtcXG59XFxuXFxuI3dlYXRoZXItaW5mbyxcXG4jaWNvbi1jb250YWluZXIsXFxuI2ZhY3RzLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiA1cHg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIG1hcmdpbjogNXB4O1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRWx6YSBSZWd1bGFyXFxcIiwgY3Vyc2l2ZTtcXG4gIGJveC1zaGFkb3c6IHZhcigtLWJveC1zaGFkb3cpO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxLjJyZW07XFxuICBvcGFjaXR5OiA4NSU7XFxufVxcblxcbiNpY29uLWNvbnRhaW5lcixcXG4jZmFjdHMtY29udGFpbmVyIHtcXG4gIGNvbG9yOiB2YXIoLS1mb250LWNvbG9yKTtcXG59XFxuXFxuI3dlYXRoZXItaW5mbzpob3ZlciB7XFxuICBvcGFjaXR5OiAxMDAlO1xcbn1cXG5cXG4jaWNvbi1jb250YWluZXIsXFxuI2ZhY3RzLWNvbnRhaW5lciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodC1ibGFjayk7XFxufVxcblxcbiNpY29uLWNvbnRhaW5lcjpob3ZlcixcXG4jZmFjdHMtY29udGFpbmVyOmhvdmVyLFxcbiNmb3JlY2FzdC1jYXJkID4gZGl2OmhvdmVyIHtcXG4gIG9wYWNpdHk6IDEwMCU7XFxufVxcblxcbiN3ZWF0aGVyLWxvY2F0aW9uLFxcbiN3ZWF0aGVyLXRlbXAge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG59XFxuXFxuI2FkZGl0aW9uYWwtaW5mbyB7XFxuICBmb250LXNpemU6IDFyZW07XFxufVxcblxcbiNmb3JlY2FzdC1jYXJkIHtcXG4gIHdpZHRoOiA5MCU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCgyMDBweCwgMWZyKSk7XFxuICBnYXA6IDEwcHg7XFxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcbiAgbWluLXdpZHRoOiBtYXgtY29udGVudDtcXG59XFxuXFxuI2ZvcmVjYXN0LWNhcmQgPiBkaXYge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgbWFyZ2luOiA1cHg7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJFbHphIFJlZ3VsYXJcXFwiLCBjdXJzaXZlO1xcbiAgY29sb3I6IHZhcigtLWZvbnQtY29sb3IpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQtYmxhY2spO1xcbiAgYm94LXNoYWRvdzogdmFyKC0tYm94LXNoYWRvdyk7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDFyZW07XFxuICBvcGFjaXR5OiA4NSU7XFxufVxcblxcbiNmb3JlY2FzdC1jYXJkID4gZGl2ID4gaW1nIHtcXG4gIHdpZHRoOiA1MHB4O1xcbiAgaGVpZ2h0OiA1MHB4O1xcbn1cXG5cXG4uZm9yZWNhc3QtdGVtcCB7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiAxcmVtO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgY29sb3I6IHZhcigtLWZvbnQtY29sb3IpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQtYmxhY2spO1xcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDEwcHg7XFxuICBmb250LWZhbWlseTogXFxcIkVsemEgUmVndWxhclxcXCIsIGN1cnNpdmU7XFxuICBib3gtc2hhZG93OiB2YXIoLS1ib3gtc2hhZG93KTtcXG4gIGhlaWdodDogbWF4LWNvbnRlbnQ7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgbWFyZ2luOiA1cHg7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcblxcbi8qIE5vIGNoaWxkcmVuIG9mIGZvb3RlciB3aWxsIGhhdmUgbWFyZ2luL3BhZGRpbmcgKi9cXG5mb290ZXIgPiAqIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbmZvb3Rlcjpob3ZlciB7XFxuICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tcHVycGxlKTtcXG4gIG91dGxpbmUtb2Zmc2V0OiAycHg7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMDEpO1xcbn1cXG5cXG4jY3JlZGl0cyB7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XFxufVxcblxcbiNjcmVkaXRzID4gYSxcXG4jY3JlZGl0cyA+IGE6dmlzaXRlZCxcXG4jaW5mbyA+IGEsXFxuI2luZm8gPiBhOnZpc2l0ZWQge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY29sb3I6IHZhcigtLXB1cnBsZSk7XFxufVxcblxcbiNwdXJwbGUge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBnYXA6IDVweDtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuXFxuI2dpdGh1Yi1pbWFnZSB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoZGF0YS9naXRodWIuc3ZnKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICB3aWR0aDogMjBweDtcXG4gIGhlaWdodDogMjBweDtcXG59XFxuXFxuI2dpdGh1Yi1pbWFnZTpob3ZlcixcXG4jaW5mby1pbWFnZTpob3ZlciB7XFxuICByb3RhdGU6IDM2MGRlZztcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcXG4gIHRyYW5zaXRpb246IDAuNXM7XFxufVxcblxcbiNpbmZvIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG8gYXV0bztcXG4gIGp1c3RpZnktY29udGVudDogZW5kO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1hcmdpbi1yaWdodDogMTBweDtcXG59XFxuXFxuI3VzYWdlIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDJweDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbiNpbmZvLWltYWdlIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChkYXRhL2luZm8uc3ZnKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICB3aWR0aDogMjVweDtcXG4gIGhlaWdodDogMjVweDtcXG59XFxuXFxuI2RhcmstbW9kZSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDE1cHg7XFxuICBsZWZ0OiAxNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgYm94LXNoYWRvdzogdmFyKC0tYm94LXNoYWRvdyk7XFxuICB6LWluZGV4OiAxO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDVweDtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG5cXG4jZGFyay1tb2RlLWljb24ge1xcbiAgYmFja2dyb3VuZDogdXJsKGRhdGEvZGFyay1tb2RlLnN2Zyk7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgd2lkdGg6IDIwcHg7XFxuICBoZWlnaHQ6IDIwcHg7XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDEyNTBweCkge1xcbiAgYm9keSB7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogMjUlIGF1dG8gYXV0bztcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxMDAlO1xcbiAgfVxcbiAgI3RpdGxlIHtcXG4gICAgZm9udC1zaXplOiBtaW4oNC4yNXJlbSwgMzc1JSk7XFxuICB9XFxuICAjc2VhcmNoLWJ1dHRvbixcXG4gICNjdXJyZW50LWxvY2F0aW9uLWJ1dHRvbiB7XFxuICAgIGZvbnQtc2l6ZTogMTJweDtcXG4gICAgcGFkZGluZzogMXB4O1xcbiAgfVxcbiAgI3dlYXRoZXItY2FyZCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgfVxcbiAgI3dlYXRoZXItY2FyZCA+IGRpdiB7XFxuICAgIHdpZHRoOiA5MCU7XFxuICB9XFxuICAjd2VhdGhlci1pbmZvID4gKiB7XFxuICAgIGZvbnQtc2l6ZTogbWluKDI1cHgsIDE1MCUpO1xcbiAgfVxcbiAgZm9vdGVyIHtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvO1xcbiAgfVxcbiAgI2luZm8sXFxuICAjY3JlZGl0cyB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtaGVpZ2h0OiA1NTBweCkge1xcbiAgYm9keSB7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogNDUlIGF1dG8gYXV0bztcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxMDAlO1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LWhlaWdodDogMzAwcHgpIHtcXG4gIGhlYWRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgfVxcbiAgI3NlYXJjaC1jb250YWluZXIge1xcbiAgICBtYXJnaW46IDBweDtcXG4gICAgZ2FwOiAxcHg7XFxuICB9XFxufVxcblxcbi8qIERpc2FibGUgZm9yIHNtYWxsIHNjcmVlbnM6ICAqL1xcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDM1MHB4KSB7XFxuICBodG1sIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzkxNDdmZjtcXG4gIH1cXG4gIGJvZHkge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LWhlaWdodDogMTUwcHgpIHtcXG4gIGh0bWwge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTE0N2ZmO1xcbiAgfVxcbiAgYm9keSB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvKipcbiAqIEBsaWNlbnNlIE1JVFxuICogdG9wYmFyIDEuMC4wLCAyMDIxLTAxLTA2XG4gKiBodHRwOi8vYnV1bmd1eWVuLmdpdGh1Yi5pby90b3BiYXJcbiAqIENvcHlyaWdodCAoYykgMjAyMSBCdXUgTmd1eWVuXG4gKi9cbihmdW5jdGlvbih3aW5kb3csZG9jdW1lbnQpe1widXNlIHN0cmljdFwiOyFmdW5jdGlvbigpe2Zvcih2YXIgbGFzdFRpbWU9MCx2ZW5kb3JzPVtcIm1zXCIsXCJtb3pcIixcIndlYmtpdFwiLFwib1wiXSx4PTA7eDx2ZW5kb3JzLmxlbmd0aCYmIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7Kyt4KXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU9d2luZG93W3ZlbmRvcnNbeF0rXCJSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcIl0sd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lPXdpbmRvd1t2ZW5kb3JzW3hdK1wiQ2FuY2VsQW5pbWF0aW9uRnJhbWVcIl18fHdpbmRvd1t2ZW5kb3JzW3hdK1wiQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCJdO3dpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fCh3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lPWZ1bmN0aW9uKGNhbGxiYWNrLGVsZW1lbnQpe3ZhciBjdXJyVGltZT0obmV3IERhdGUpLmdldFRpbWUoKSx0aW1lVG9DYWxsPU1hdGgubWF4KDAsMTYtKGN1cnJUaW1lLWxhc3RUaW1lKSksaWQ9d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXtjYWxsYmFjayhjdXJyVGltZSt0aW1lVG9DYWxsKX0sdGltZVRvQ2FsbCk7cmV0dXJuIGxhc3RUaW1lPWN1cnJUaW1lK3RpbWVUb0NhbGwsaWR9KSx3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWV8fCh3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWU9ZnVuY3Rpb24oaWQpe2NsZWFyVGltZW91dChpZCl9KX0oKTtmdW5jdGlvbiByZXBhaW50KCl7Y2FudmFzLndpZHRoPXdpbmRvdy5pbm5lcldpZHRoLGNhbnZhcy5oZWlnaHQ9NSpvcHRpb25zLmJhclRoaWNrbmVzczt2YXIgY3R4PWNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7Y3R4LnNoYWRvd0JsdXI9b3B0aW9ucy5zaGFkb3dCbHVyLGN0eC5zaGFkb3dDb2xvcj1vcHRpb25zLnNoYWRvd0NvbG9yO3ZhciBzdG9wLGxpbmVHcmFkaWVudD1jdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwwLGNhbnZhcy53aWR0aCwwKTtmb3Ioc3RvcCBpbiBvcHRpb25zLmJhckNvbG9ycylsaW5lR3JhZGllbnQuYWRkQ29sb3JTdG9wKHN0b3Asb3B0aW9ucy5iYXJDb2xvcnNbc3RvcF0pO2N0eC5saW5lV2lkdGg9b3B0aW9ucy5iYXJUaGlja25lc3MsY3R4LmJlZ2luUGF0aCgpLGN0eC5tb3ZlVG8oMCxvcHRpb25zLmJhclRoaWNrbmVzcy8yKSxjdHgubGluZVRvKE1hdGguY2VpbChjdXJyZW50UHJvZ3Jlc3MqY2FudmFzLndpZHRoKSxvcHRpb25zLmJhclRoaWNrbmVzcy8yKSxjdHguc3Ryb2tlU3R5bGU9bGluZUdyYWRpZW50LGN0eC5zdHJva2UoKX12YXIgY2FudmFzLHByb2dyZXNzVGltZXJJZCxmYWRlVGltZXJJZCxjdXJyZW50UHJvZ3Jlc3Msc2hvd2luZyxvcHRpb25zPXthdXRvUnVuOiEwLGJhclRoaWNrbmVzczozLGJhckNvbG9yczp7MDpcInJnYmEoMjYsICAxODgsIDE1NiwgLjkpXCIsXCIuMjVcIjpcInJnYmEoNTIsICAxNTIsIDIxOSwgLjkpXCIsXCIuNTBcIjpcInJnYmEoMjQxLCAxOTYsIDE1LCAgLjkpXCIsXCIuNzVcIjpcInJnYmEoMjMwLCAxMjYsIDM0LCAgLjkpXCIsXCIxLjBcIjpcInJnYmEoMjExLCA4NCwgIDAsICAgLjkpXCJ9LHNoYWRvd0JsdXI6MTAsc2hhZG93Q29sb3I6XCJyZ2JhKDAsICAgMCwgICAwLCAgIC42KVwiLGNsYXNzTmFtZTpudWxsfSx0b3BiYXI9e2NvbmZpZzpmdW5jdGlvbihvcHRzKXtmb3IodmFyIGtleSBpbiBvcHRzKW9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSYmKG9wdGlvbnNba2V5XT1vcHRzW2tleV0pfSxzaG93OmZ1bmN0aW9uKCl7dmFyIHR5cGUsaGFuZGxlcixlbGVtO3Nob3dpbmd8fChzaG93aW5nPSEwLG51bGwhPT1mYWRlVGltZXJJZCYmd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGZhZGVUaW1lcklkKSxjYW52YXN8fCgoZWxlbT0oY2FudmFzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIikpLnN0eWxlKS5wb3NpdGlvbj1cImZpeGVkXCIsZWxlbS50b3A9ZWxlbS5sZWZ0PWVsZW0ucmlnaHQ9ZWxlbS5tYXJnaW49ZWxlbS5wYWRkaW5nPTAsZWxlbS56SW5kZXg9MTAwMDAxLGVsZW0uZGlzcGxheT1cIm5vbmVcIixvcHRpb25zLmNsYXNzTmFtZSYmY2FudmFzLmNsYXNzTGlzdC5hZGQob3B0aW9ucy5jbGFzc05hbWUpLGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKSx0eXBlPVwicmVzaXplXCIsaGFuZGxlcj1yZXBhaW50LChlbGVtPXdpbmRvdykuYWRkRXZlbnRMaXN0ZW5lcj9lbGVtLmFkZEV2ZW50TGlzdGVuZXIodHlwZSxoYW5kbGVyLCExKTplbGVtLmF0dGFjaEV2ZW50P2VsZW0uYXR0YWNoRXZlbnQoXCJvblwiK3R5cGUsaGFuZGxlcik6ZWxlbVtcIm9uXCIrdHlwZV09aGFuZGxlciksY2FudmFzLnN0eWxlLm9wYWNpdHk9MSxjYW52YXMuc3R5bGUuZGlzcGxheT1cImJsb2NrXCIsdG9wYmFyLnByb2dyZXNzKDApLG9wdGlvbnMuYXV0b1J1biYmZnVuY3Rpb24gbG9vcCgpe3Byb2dyZXNzVGltZXJJZD13aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApLHRvcGJhci5wcm9ncmVzcyhcIitcIisuMDUqTWF0aC5wb3coMS1NYXRoLnNxcnQoY3VycmVudFByb2dyZXNzKSwyKSl9KCkpfSxwcm9ncmVzczpmdW5jdGlvbih0byl7cmV0dXJuIHZvaWQgMD09PXRvfHwoXCJzdHJpbmdcIj09dHlwZW9mIHRvJiYodG89KDA8PXRvLmluZGV4T2YoXCIrXCIpfHwwPD10by5pbmRleE9mKFwiLVwiKT9jdXJyZW50UHJvZ3Jlc3M6MCkrcGFyc2VGbG9hdCh0bykpLGN1cnJlbnRQcm9ncmVzcz0xPHRvPzE6dG8scmVwYWludCgpKSxjdXJyZW50UHJvZ3Jlc3N9LGhpZGU6ZnVuY3Rpb24oKXtzaG93aW5nJiYoc2hvd2luZz0hMSxudWxsIT1wcm9ncmVzc1RpbWVySWQmJih3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUocHJvZ3Jlc3NUaW1lcklkKSxwcm9ncmVzc1RpbWVySWQ9bnVsbCksZnVuY3Rpb24gbG9vcCgpe3JldHVybiAxPD10b3BiYXIucHJvZ3Jlc3MoXCIrLjFcIikmJihjYW52YXMuc3R5bGUub3BhY2l0eS09LjA1LGNhbnZhcy5zdHlsZS5vcGFjaXR5PD0uMDUpPyhjYW52YXMuc3R5bGUuZGlzcGxheT1cIm5vbmVcIix2b2lkKGZhZGVUaW1lcklkPW51bGwpKTp2b2lkKGZhZGVUaW1lcklkPXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCkpfSgpKX19O1wib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz10b3BiYXI6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShmdW5jdGlvbigpe3JldHVybiB0b3BiYXJ9KTp0aGlzLnRvcGJhcj10b3BiYXJ9KS5jYWxsKHRoaXMsd2luZG93LGRvY3VtZW50KTsiXSwibmFtZXMiOlsic2VjcmV0cyIsIk9XX0FQSV9LRVkiLCJPUEVOV0VBVEhFUiIsImZldGNoV2VhdGhlciIsInBsYWNlIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwid2VhdGhlciIsImZldGNoIiwibW9kZSIsImRhdGEiLCJqc29uIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiZmV0Y2hGb3JlY2FzdCIsImZvcmVjYXN0IiwiZmV0Y2hXZWF0aGVySWNvbiIsImNvZGUiLCJpY29uIiwiZmV0Y2hDb3VudHJ5TmFtZSIsImNvdW50cnkiLCJuYW1lIiwiZmV0Y2hXZWF0aGVyQmFja2dyb3VuZCIsImJhY2tncm91bmQiLCJ0b3BiYXIiLCJyZXF1aXJlIiwiY29uZmlnIiwiYXV0b1J1biIsImJhclRoaWNrbmVzcyIsImJhckNvbG9ycyIsInNoYWRvd0JsdXIiLCJzaGFkb3dDb2xvciIsInNldExvY2F0aW9uIiwidHlwZSIsInNlYXJjaCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJ2YWx1ZSIsInNob3ciLCJ0aGVuIiwicHJvZ3Jlc3MiLCJjb2QiLCJmZWVsc0xpa2UiLCJtYWluIiwiZmVlbHNfbGlrZSIsIm1pbiIsInRlbXBfbWluIiwibWF4IiwidGVtcF9tYXgiLCJtaW5tYXgiLCJsb2NhdGlvbiIsInN5cyIsInRlbXBlcmF0dXJlIiwidGVtcCIsImRlc2NyaXB0aW9uIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInN1bnJpc2UiLCJzdW5zZXQiLCJ2aXNpYmlsaXR5Iiwid2luZHNwZWVkIiwid2luZCIsInNwZWVkIiwiaHVtaWRpdHkiLCJwcmVzc3VyZSIsInN1biIsImh1bWlkaXR5QW5kUHJlc3N1cmUiLCJ1cGRhdGVXZWF0aGVyIiwiaSIsInB1c2giLCJsaXN0IiwidXBkYXRlRm9yZWNhc3QiLCJhbGVydCIsImNhdGNoIiwiaGlkZSIsInN0eWxlIiwiZGlzcGxheSIsIm5hdmlnYXRvciIsImdlb2xvY2F0aW9uIiwiZ2V0Q3VycmVudFBvc2l0aW9uIiwicG9zaXRpb24iLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImNvb3JkcyIsImZlZWxzbGlrZSIsImljb25Db250YWluZXIiLCJzcmMiLCJ1cmwiLCJpbm5lclRleHQiLCJ0b0ZpeGVkIiwid2VhdGhlckluZm8iLCJNYXRoIiwiZmxvb3IiLCJjb2xvciIsImZhY3RzQ29udGFpbmVyIiwiRGF0ZSIsInRvTG9jYWxlVGltZVN0cmluZyIsInF1ZXJ5U2VsZWN0b3IiLCJyZXNwb25zZSIsInVuZGVmaW5lZCIsImJhY2tncm91bmRJbWFnZSIsInNldFRpbWVvdXQiLCJmb3JlY2FzdHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImluZGV4IiwiZHQiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJjcmVhdGVMYXlvdXQiLCJjaGVja1N0YXRlIiwid2luZG93IiwibWF0Y2hNZWRpYSIsImhlYWRlciIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsInNlY3Rpb24iLCJmb290ZXIiLCJ0aXRsZSIsInNlYXJjaENvbnRhaW5lciIsInBsYWNlaG9sZGVyIiwiYnV0dG9uQ29udGFpbmVyIiwic2VhcmNoQnV0dG9uIiwiY3VycmVudExvY2F0aW9uQnV0dG9uIiwid2VhdGhlckNhcmQiLCJmb3JlY2FzdENhcmQiLCJhcHBlbmRDaGlsZCIsIm1pblRlbXAiLCJtYXhUZW1wIiwid2VhdGhlckxvY2F0aW9uIiwid2VhdGhlclRlbXAiLCJ3ZWF0aGVyRGVzY3JpcHRpb24iLCJhZGRpdGlvbmFsSW5mbyIsImNsYXNzTmFtZSIsImZvcmVjYXN0SWNvbiIsImZvcmVjYXN0VGVtcCIsImZvcmVjYXN0RGVzY3JpcHRpb24iLCJmb3JlY2FzdERhdGUiLCJjcmVkaXRzIiwicHVycGxlIiwiaW5mbyIsImlubmVySFRNTCIsImJvZHkiLCJkYXJrTW9kZSIsImRhcmtNb2RlSWNvbiIsImRhcmtNb2RlVGV4dCIsImFkZExpc3RlbmVycyIsImFkZEV2ZW50TGlzdGVuZXIiLCJkYXJrIiwicHJpbWFyeUNvbG9yIiwiZm9udENvbG9yIiwidGl0bGVDb2xvciIsInNldFByb3BlcnR5IiwiYmFja2dyb3VuZENvbG9yIiwiZGlzYWJsZWQiLCJldmVudCIsImtleSIsInByZXZlbnREZWZhdWx0IiwiY2xpY2siLCJwZXJtaXNzaW9ucyIsInF1ZXJ5IiwicmVzdWx0Iiwic3RhdGUiLCJ4IiwibWF0Y2hlcyIsInJlbW92ZUNoaWxkIiwiY29udGFpbnMiLCJvbmNoYW5nZSIsInkiLCJkaXNwbGF5RXJyb3IiXSwic291cmNlUm9vdCI6IiJ9