(self["webpackChunkweather_app"] = self["webpackChunkweather_app"] || []).push([["main"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _secrets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./secrets */ "./src/secrets.js");
/* harmony import */ var _secrets__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_secrets__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var pexels__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! pexels */ "./node_modules/pexels/dist/main.module.js");



const OW_API_KEY = (_secrets__WEBPACK_IMPORTED_MODULE_1___default().OPENWEATHER);
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
    setLocation();
    // To prevent multiple api calls
    searchButton.disabled = true;
  });
}
function setLocation() {
  const search = document.getElementById("search");
  let place = search.value;
  fetchWeather(place).then(data => {
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
  }).catch(error => {
    console.log("Error in setting location: " + error);
  });
}
async function fetchWeather(place) {
  try {
    let weather = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${OW_API_KEY}&units=metric`);
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
function updateWeather(icon, feelslike, minmax, location, temperature, description, sun, visibility, windspeed, humidityAndPressure) {
  // Update ICON
  const iconContainer = document.getElementById("icon-container");
  document.getElementById("icon").src = `http://openweathermap.org/img/w/${icon}.png`;
  document.getElementById("feels-like").innerText = `Feels like: ${feelslike} °C / ${(feelslike * 9 / 5 + 32).toFixed(2)} °F`;
  document.getElementById("min-temp").innerText = `Min: ${minmax[0]} °C / ${(minmax[0] * 9 / 5 + 32).toFixed(2)} °F`;
  document.getElementById("max-temp").innerText = `Max: ${minmax[1]} °C / ${(minmax[1] * 9 / 5 + 32).toFixed(2)} °F`;

  // Update weather info
  const weatherInfo = document.getElementById("weather-info");
  // Update weather info colour
  // Set the background colour (+gradient) of weatherInfo based on temperature value
  // Optimal human temperature: 26-28 C
  // BUG WITH NEGATIVE TEMPERATURES
  if (Math.floor(temperature) < 26) {
    weatherInfo.style.background = `linear-gradient(rgba(0, 0, 255, ${temperature / 26}), rgba(0, 0, 255, ${temperature / 26}))`;
  } else if (Math.floor(temperature) > 28) {
    weatherInfo.style.background = `linear-gradient(rgba(255, 0, 0, ${temperature / 28}), rgba(255, 0, 0, ${temperature / 28}))`;
  } else {
    weatherInfo.style.background = `linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))`;
    weatherInfo.style.color = `rgba(0, 0, 0, 1)`;
  }
  // Update location, temp, description
  document.getElementById("weather-location").innerText = location;
  document.getElementById("weather-temp").innerText = temperature + " °C / " + (temperature * 9 / 5 + 32).toFixed(2) + " °F";
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
      orientation: "landscape"
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

/***/ }),

/***/ "./src/secrets.js":
/*!************************!*\
  !*** ./src/secrets.js ***!
  \************************/
/***/ ((module) => {

// API Keys for Open Weather and PEXELS API (Free for all)
const secrets = {
  'OPENWEATHER': '',
  'PEXELS': ''
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
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! data/weather4.svg */ "./src/data/weather4.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@font-face {\n  font-family: 'Cheap Pine';\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n\n@font-face {\n  font-family: 'Elza Regular';\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n}\n\n:root {\n  --box-shadow: 0px 4px 6px 0px rgba(50, 50, 93, 0.11),\n    0px 1px 3px 0px rgba(0, 0, 0, 0.08);\n  --purple: #9147ff;\n}\n\nhtml,\nbody {\n  height: 100%;\n  margin: 0;\n}\n\nbody {\n  /* Grid: header[15%], section[70%], footer[#%]*/\n  display: grid;\n  grid-template-rows: 30% 70% 10%;\n  gap: 10px;\n}\n\nheader,\nsection {\n  background-color: #fff;\n  box-shadow: var(--box-shadow);\n}\n\nheader {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  background-size: cover;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  gap: 2px;\n}\n\n#title {\n  font-size: 5rem;\n  font-family: 'Cheap Pine', cursive;\n  cursor: default;\n  margin-bottom: 40px;\n}\n\n#search-container {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    gap: 10px;\n}\n\n#search {\n  font-size: 13px;\n  font-family: 'Courier New', Courier, monospace;\n  padding-left: 5px;\n  width: 20vw;\n  border-radius: 10px;\n  line-height: 1.5;\n  transition: box-shadow 100ms ease-in, border 100ms ease-in, background-color 100ms ease-in;\n  border: 2px solid #dee1e2;\n  color: rgb(14, 14, 16);\n  background: #dee1e2;\n  opacity: 90%;\n}\n\n#search:hover {\n  border-color: #ccc;\n}\n#search:focus {\n  outline: none;\n  border-color: var(--purple);\n  background: #fff;\n  opacity: 100%;\n}\n\n#search::placeholder {\n  color: #ccc;\n  font-weight: 900;\n}\n\n#search-button {  \n    display: inline-block;\n    outline: 0;\n    border: none;\n    cursor: pointer;\n    font-weight: 600;\n    border-radius: 10px;\n    font-size: 13px;\n    height: 30px;\n    width: 10vw;\n    background-color: var(--purple);\n    color: white;\n    padding: 0 10px;\n    opacity: 90%;\n}\n\n#search-button:hover {\n    background-color: var(--purple);\n    opacity: 100%;\n}\n\n#search-button:disabled {\n    background-color: #ccc;\n    cursor: not-allowed;\n}\n\nsection {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n#weather-card{\n  width: 90%;\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 10px;\n  height: fit-content;\n}\n\n#weather-info, #icon-container, #facts-container{\n  display: none;\n  flex-direction: column;\n  justify-content: center;\n  gap: 5px;\n  align-items: center;\n  border-radius: 10px;\n  margin: 5px;\n  padding: 5px;\n  font-family: 'Elza Regular', cursive;\n  color: rgba(255, 255, 255, 0.85);\n  box-shadow: var(--box-shadow);\n  text-align: center;\n  font-size: 1.2rem;\n}\n\n#icon-container, #facts-container{\n  background-color: #9147ffd2;\n}\n\n#weather-location, #weather-temp{\n  font-weight: 700;\n  font-size: 1.5rem;\n}\n\nfooter {\n  /* border: 2px blue solid; */\n}\n\n@media screen and (max-width: 768px) {\n  body{\n    display: none;\n  }\n}\n\n@media screen and (max-height: 660px) {\n  body{\n    display: none;\n  }\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,yBAAyB;EACzB,4CAAuC;AACzC;;AAEA;EACE,2BAA2B;EAC3B,4CAAgC;AAClC;;AAEA;EACE;uCACqC;EACrC,iBAAiB;AACnB;;AAEA;;EAEE,YAAY;EACZ,SAAS;AACX;;AAEA;EACE,+CAA+C;EAC/C,aAAa;EACb,+BAA+B;EAC/B,SAAS;AACX;;AAEA;;EAEE,sBAAsB;EACtB,6BAA6B;AAC/B;;AAEA;EACE,yDAAwC;EACxC,sBAAsB;EACtB,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,sBAAsB;EACtB,QAAQ;AACV;;AAEA;EACE,eAAe;EACf,kCAAkC;EAClC,eAAe;EACf,mBAAmB;AACrB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,uBAAuB;IACvB,SAAS;AACb;;AAEA;EACE,eAAe;EACf,8CAA8C;EAC9C,iBAAiB;EACjB,WAAW;EACX,mBAAmB;EACnB,gBAAgB;EAChB,0FAA0F;EAC1F,yBAAyB;EACzB,sBAAsB;EACtB,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,kBAAkB;AACpB;AACA;EACE,aAAa;EACb,2BAA2B;EAC3B,gBAAgB;EAChB,aAAa;AACf;;AAEA;EACE,WAAW;EACX,gBAAgB;AAClB;;AAEA;IACI,qBAAqB;IACrB,UAAU;IACV,YAAY;IACZ,eAAe;IACf,gBAAgB;IAChB,mBAAmB;IACnB,eAAe;IACf,YAAY;IACZ,WAAW;IACX,+BAA+B;IAC/B,YAAY;IACZ,eAAe;IACf,YAAY;AAChB;;AAEA;IACI,+BAA+B;IAC/B,aAAa;AACjB;;AAEA;IACI,sBAAsB;IACtB,mBAAmB;AACvB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,UAAU;EACV,aAAa;EACb,kCAAkC;EAClC,SAAS;EACT,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,QAAQ;EACR,mBAAmB;EACnB,mBAAmB;EACnB,WAAW;EACX,YAAY;EACZ,oCAAoC;EACpC,gCAAgC;EAChC,6BAA6B;EAC7B,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,gBAAgB;EAChB,iBAAiB;AACnB;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE;IACE,aAAa;EACf;AACF;;AAEA;EACE;IACE,aAAa;EACf;AACF","sourcesContent":["@font-face {\n  font-family: 'Cheap Pine';\n  src: url(data/Cheap\\ Pine\\ Regular.ttf);\n}\n\n@font-face {\n  font-family: 'Elza Regular';\n  src: url(data/Elza\\ Regular.ttf);\n}\n\n:root {\n  --box-shadow: 0px 4px 6px 0px rgba(50, 50, 93, 0.11),\n    0px 1px 3px 0px rgba(0, 0, 0, 0.08);\n  --purple: #9147ff;\n}\n\nhtml,\nbody {\n  height: 100%;\n  margin: 0;\n}\n\nbody {\n  /* Grid: header[15%], section[70%], footer[#%]*/\n  display: grid;\n  grid-template-rows: 30% 70% 10%;\n  gap: 10px;\n}\n\nheader,\nsection {\n  background-color: #fff;\n  box-shadow: var(--box-shadow);\n}\n\nheader {\n  background-image: url(data/weather4.svg);\n  background-size: cover;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  gap: 2px;\n}\n\n#title {\n  font-size: 5rem;\n  font-family: 'Cheap Pine', cursive;\n  cursor: default;\n  margin-bottom: 40px;\n}\n\n#search-container {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    gap: 10px;\n}\n\n#search {\n  font-size: 13px;\n  font-family: 'Courier New', Courier, monospace;\n  padding-left: 5px;\n  width: 20vw;\n  border-radius: 10px;\n  line-height: 1.5;\n  transition: box-shadow 100ms ease-in, border 100ms ease-in, background-color 100ms ease-in;\n  border: 2px solid #dee1e2;\n  color: rgb(14, 14, 16);\n  background: #dee1e2;\n  opacity: 90%;\n}\n\n#search:hover {\n  border-color: #ccc;\n}\n#search:focus {\n  outline: none;\n  border-color: var(--purple);\n  background: #fff;\n  opacity: 100%;\n}\n\n#search::placeholder {\n  color: #ccc;\n  font-weight: 900;\n}\n\n#search-button {  \n    display: inline-block;\n    outline: 0;\n    border: none;\n    cursor: pointer;\n    font-weight: 600;\n    border-radius: 10px;\n    font-size: 13px;\n    height: 30px;\n    width: 10vw;\n    background-color: var(--purple);\n    color: white;\n    padding: 0 10px;\n    opacity: 90%;\n}\n\n#search-button:hover {\n    background-color: var(--purple);\n    opacity: 100%;\n}\n\n#search-button:disabled {\n    background-color: #ccc;\n    cursor: not-allowed;\n}\n\nsection {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n#weather-card{\n  width: 90%;\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 10px;\n  height: fit-content;\n}\n\n#weather-info, #icon-container, #facts-container{\n  display: none;\n  flex-direction: column;\n  justify-content: center;\n  gap: 5px;\n  align-items: center;\n  border-radius: 10px;\n  margin: 5px;\n  padding: 5px;\n  font-family: 'Elza Regular', cursive;\n  color: rgba(255, 255, 255, 0.85);\n  box-shadow: var(--box-shadow);\n  text-align: center;\n  font-size: 1.2rem;\n}\n\n#icon-container, #facts-container{\n  background-color: #9147ffd2;\n}\n\n#weather-location, #weather-temp{\n  font-weight: 700;\n  font-size: 1.5rem;\n}\n\nfooter {\n  /* border: 2px blue solid; */\n}\n\n@media screen and (max-width: 768px) {\n  body{\n    display: none;\n  }\n}\n\n@media screen and (max-height: 660px) {\n  body{\n    display: none;\n  }\n}"],"sourceRoot":""}]);
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

/***/ "./node_modules/isomorphic-fetch/fetch-npm-browserify.js":
/*!***************************************************************!*\
  !*** ./node_modules/isomorphic-fetch/fetch-npm-browserify.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
__webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");
module.exports = self.fetch.bind(self);


/***/ }),

/***/ "./node_modules/pexels/dist/main.module.js":
/*!*************************************************!*\
  !*** ./node_modules/pexels/dist/main.module.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createClient": () => (/* binding */ c)
/* harmony export */ });
var t={photo:"https://api.pexels.com/v1/",video:"https://api.pexels.com/videos/",collections:"https://api.pexels.com/v1/collections/"};function r(r,e){var n={method:"GET",headers:{Accept:"application/json","Content-Type":"application/json","User-Agent":"Pexels/JavaScript",Authorization:r}},o=t[e];return function(t,r){return fetch(""+o+t+"?"+function(t){return Object.keys(t).map(function(r){return r+"="+t[r]}).join("&")}(r||{}),n).then(function(t){if(!t.ok)throw new Error(t.statusText);return t.json()})}}function e(t){var e=r(t,"collections");return{all:function(t){return void 0===t&&(t={}),e("",t)},media:function(t){var r=t.id,n=function(t,r){if(null==t)return{};var e,n,o={},i=Object.keys(t);for(n=0;n<i.length;n++)r.indexOf(e=i[n])>=0||(o[e]=t[e]);return o}(t,["id"]);return e(""+r,n)},featured:function(t){return void 0===t&&(t={}),e("featured",t)}}}function n(t){return!(!t||!t.photos)}var o={__proto__:null,isPhotos:n,isVideos:function(t){return!(!t||!t.videos)},isError:function(t){return!!t.error}};function i(t){var e=r(t,"photo");return{search:function(t){return e("/search",t)},curated:function(t){return void 0===t&&(t={}),e("/curated",t)},show:function(t){return e("/photos/"+t.id)},random:function(){try{var t=Math.floor(1e3*Math.random());return Promise.resolve(this.curated({page:t,per_page:1})).then(function(t){return n(t)?t.photos[0]:t})}catch(t){return Promise.reject(t)}}}}function u(t){var e=r(t,"video");return{search:function(t){return e("/search",t)},popular:function(t){return void 0===t&&(t={}),e("/popular",t)},show:function(t){return e("/videos/"+t.id)}}}function c(t){if(!t||"string"!=typeof t)throw new TypeError("An ApiKey must be provided when initiating the Pexel's client.");return{typeCheckers:o,photos:i(t),videos:u(t),collections:e(t)}}__webpack_require__(/*! isomorphic-fetch */ "./node_modules/isomorphic-fetch/fetch-npm-browserify.js");
//# sourceMappingURL=main.module.js.map


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

/***/ "./node_modules/whatwg-fetch/fetch.js":
/*!********************************************!*\
  !*** ./node_modules/whatwg-fetch/fetch.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DOMException": () => (/* binding */ DOMException),
/* harmony export */   "Headers": () => (/* binding */ Headers),
/* harmony export */   "Request": () => (/* binding */ Request),
/* harmony export */   "Response": () => (/* binding */ Response),
/* harmony export */   "fetch": () => (/* binding */ fetch)
/* harmony export */ });
var global =
  (typeof globalThis !== 'undefined' && globalThis) ||
  (typeof self !== 'undefined' && self) ||
  (typeof global !== 'undefined' && global)

var support = {
  searchParams: 'URLSearchParams' in global,
  iterable: 'Symbol' in global && 'iterator' in Symbol,
  blob:
    'FileReader' in global &&
    'Blob' in global &&
    (function() {
      try {
        new Blob()
        return true
      } catch (e) {
        return false
      }
    })(),
  formData: 'FormData' in global,
  arrayBuffer: 'ArrayBuffer' in global
}

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj)
}

if (support.arrayBuffer) {
  var viewClasses = [
    '[object Int8Array]',
    '[object Uint8Array]',
    '[object Uint8ClampedArray]',
    '[object Int16Array]',
    '[object Uint16Array]',
    '[object Int32Array]',
    '[object Uint32Array]',
    '[object Float32Array]',
    '[object Float64Array]'
  ]

  var isArrayBufferView =
    ArrayBuffer.isView ||
    function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name)
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
    throw new TypeError('Invalid character in header field name: "' + name + '"')
  }
  return name.toLowerCase()
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value
}

// Build a destructive iterator for the value list
function iteratorFor(items) {
  var iterator = {
    next: function() {
      var value = items.shift()
      return {done: value === undefined, value: value}
    }
  }

  if (support.iterable) {
    iterator[Symbol.iterator] = function() {
      return iterator
    }
  }

  return iterator
}

function Headers(headers) {
  this.map = {}

  if (headers instanceof Headers) {
    headers.forEach(function(value, name) {
      this.append(name, value)
    }, this)
  } else if (Array.isArray(headers)) {
    headers.forEach(function(header) {
      this.append(header[0], header[1])
    }, this)
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function(name) {
      this.append(name, headers[name])
    }, this)
  }
}

Headers.prototype.append = function(name, value) {
  name = normalizeName(name)
  value = normalizeValue(value)
  var oldValue = this.map[name]
  this.map[name] = oldValue ? oldValue + ', ' + value : value
}

Headers.prototype['delete'] = function(name) {
  delete this.map[normalizeName(name)]
}

Headers.prototype.get = function(name) {
  name = normalizeName(name)
  return this.has(name) ? this.map[name] : null
}

Headers.prototype.has = function(name) {
  return this.map.hasOwnProperty(normalizeName(name))
}

Headers.prototype.set = function(name, value) {
  this.map[normalizeName(name)] = normalizeValue(value)
}

Headers.prototype.forEach = function(callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this)
    }
  }
}

Headers.prototype.keys = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push(name)
  })
  return iteratorFor(items)
}

Headers.prototype.values = function() {
  var items = []
  this.forEach(function(value) {
    items.push(value)
  })
  return iteratorFor(items)
}

Headers.prototype.entries = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push([name, value])
  })
  return iteratorFor(items)
}

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries
}

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'))
  }
  body.bodyUsed = true
}

function fileReaderReady(reader) {
  return new Promise(function(resolve, reject) {
    reader.onload = function() {
      resolve(reader.result)
    }
    reader.onerror = function() {
      reject(reader.error)
    }
  })
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsArrayBuffer(blob)
  return promise
}

function readBlobAsText(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsText(blob)
  return promise
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf)
  var chars = new Array(view.length)

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i])
  }
  return chars.join('')
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0)
  } else {
    var view = new Uint8Array(buf.byteLength)
    view.set(new Uint8Array(buf))
    return view.buffer
  }
}

function Body() {
  this.bodyUsed = false

  this._initBody = function(body) {
    /*
      fetch-mock wraps the Response object in an ES6 Proxy to
      provide useful test harness features such as flush. However, on
      ES5 browsers without fetch or Proxy support pollyfills must be used;
      the proxy-pollyfill is unable to proxy an attribute unless it exists
      on the object before the Proxy is created. This change ensures
      Response.bodyUsed exists on the instance, while maintaining the
      semantic of setting Request.bodyUsed in the constructor before
      _initBody is called.
    */
    this.bodyUsed = this.bodyUsed
    this._bodyInit = body
    if (!body) {
      this._bodyText = ''
    } else if (typeof body === 'string') {
      this._bodyText = body
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString()
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer)
      // IE 10-11 can't handle a DataView body.
      this._bodyInit = new Blob([this._bodyArrayBuffer])
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body)
    } else {
      this._bodyText = body = Object.prototype.toString.call(body)
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8')
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type)
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
      }
    }
  }

  if (support.blob) {
    this.blob = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob')
      } else {
        return Promise.resolve(new Blob([this._bodyText]))
      }
    }

    this.arrayBuffer = function() {
      if (this._bodyArrayBuffer) {
        var isConsumed = consumed(this)
        if (isConsumed) {
          return isConsumed
        }
        if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
          return Promise.resolve(
            this._bodyArrayBuffer.buffer.slice(
              this._bodyArrayBuffer.byteOffset,
              this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
            )
          )
        } else {
          return Promise.resolve(this._bodyArrayBuffer)
        }
      } else {
        return this.blob().then(readBlobAsArrayBuffer)
      }
    }
  }

  this.text = function() {
    var rejected = consumed(this)
    if (rejected) {
      return rejected
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob)
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text')
    } else {
      return Promise.resolve(this._bodyText)
    }
  }

  if (support.formData) {
    this.formData = function() {
      return this.text().then(decode)
    }
  }

  this.json = function() {
    return this.text().then(JSON.parse)
  }

  return this
}

// HTTP methods whose capitalization should be normalized
var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

function normalizeMethod(method) {
  var upcased = method.toUpperCase()
  return methods.indexOf(upcased) > -1 ? upcased : method
}

function Request(input, options) {
  if (!(this instanceof Request)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
  }

  options = options || {}
  var body = options.body

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read')
    }
    this.url = input.url
    this.credentials = input.credentials
    if (!options.headers) {
      this.headers = new Headers(input.headers)
    }
    this.method = input.method
    this.mode = input.mode
    this.signal = input.signal
    if (!body && input._bodyInit != null) {
      body = input._bodyInit
      input.bodyUsed = true
    }
  } else {
    this.url = String(input)
  }

  this.credentials = options.credentials || this.credentials || 'same-origin'
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers)
  }
  this.method = normalizeMethod(options.method || this.method || 'GET')
  this.mode = options.mode || this.mode || null
  this.signal = options.signal || this.signal
  this.referrer = null

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests')
  }
  this._initBody(body)

  if (this.method === 'GET' || this.method === 'HEAD') {
    if (options.cache === 'no-store' || options.cache === 'no-cache') {
      // Search for a '_' parameter in the query string
      var reParamSearch = /([?&])_=[^&]*/
      if (reParamSearch.test(this.url)) {
        // If it already exists then set the value with the current time
        this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime())
      } else {
        // Otherwise add a new '_' parameter to the end with the current time
        var reQueryString = /\?/
        this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime()
      }
    }
  }
}

Request.prototype.clone = function() {
  return new Request(this, {body: this._bodyInit})
}

function decode(body) {
  var form = new FormData()
  body
    .trim()
    .split('&')
    .forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
  return form
}

function parseHeaders(rawHeaders) {
  var headers = new Headers()
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
  // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
  // https://github.com/github/fetch/issues/748
  // https://github.com/zloirock/core-js/issues/751
  preProcessedHeaders
    .split('\r')
    .map(function(header) {
      return header.indexOf('\n') === 0 ? header.substr(1, header.length) : header
    })
    .forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
  return headers
}

Body.call(Request.prototype)

function Response(bodyInit, options) {
  if (!(this instanceof Response)) {
    throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
  }
  if (!options) {
    options = {}
  }

  this.type = 'default'
  this.status = options.status === undefined ? 200 : options.status
  this.ok = this.status >= 200 && this.status < 300
  this.statusText = options.statusText === undefined ? '' : '' + options.statusText
  this.headers = new Headers(options.headers)
  this.url = options.url || ''
  this._initBody(bodyInit)
}

Body.call(Response.prototype)

Response.prototype.clone = function() {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  })
}

Response.error = function() {
  var response = new Response(null, {status: 0, statusText: ''})
  response.type = 'error'
  return response
}

var redirectStatuses = [301, 302, 303, 307, 308]

Response.redirect = function(url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code')
  }

  return new Response(null, {status: status, headers: {location: url}})
}

var DOMException = global.DOMException
try {
  new DOMException()
} catch (err) {
  DOMException = function(message, name) {
    this.message = message
    this.name = name
    var error = Error(message)
    this.stack = error.stack
  }
  DOMException.prototype = Object.create(Error.prototype)
  DOMException.prototype.constructor = DOMException
}

function fetch(input, init) {
  return new Promise(function(resolve, reject) {
    var request = new Request(input, init)

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'))
    }

    var xhr = new XMLHttpRequest()

    function abortXhr() {
      xhr.abort()
    }

    xhr.onload = function() {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      }
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
      var body = 'response' in xhr ? xhr.response : xhr.responseText
      setTimeout(function() {
        resolve(new Response(body, options))
      }, 0)
    }

    xhr.onerror = function() {
      setTimeout(function() {
        reject(new TypeError('Network request failed'))
      }, 0)
    }

    xhr.ontimeout = function() {
      setTimeout(function() {
        reject(new TypeError('Network request failed'))
      }, 0)
    }

    xhr.onabort = function() {
      setTimeout(function() {
        reject(new DOMException('Aborted', 'AbortError'))
      }, 0)
    }

    function fixUrl(url) {
      try {
        return url === '' && global.location.href ? global.location.href : url
      } catch (e) {
        return url
      }
    }

    xhr.open(request.method, fixUrl(request.url), true)

    if (request.credentials === 'include') {
      xhr.withCredentials = true
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false
    }

    if ('responseType' in xhr) {
      if (support.blob) {
        xhr.responseType = 'blob'
      } else if (
        support.arrayBuffer &&
        request.headers.get('Content-Type') &&
        request.headers.get('Content-Type').indexOf('application/octet-stream') !== -1
      ) {
        xhr.responseType = 'arraybuffer'
      }
    }

    if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers)) {
      Object.getOwnPropertyNames(init.headers).forEach(function(name) {
        xhr.setRequestHeader(name, normalizeValue(init.headers[name]))
      })
    } else {
      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })
    }

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr)

      xhr.onreadystatechange = function() {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr)
        }
      }
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
  })
}

fetch.polyfill = true

if (!global.fetch) {
  global.fetch = fetch
  global.Headers = Headers
  global.Request = Request
  global.Response = Response
}


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

/***/ "./src/data/weather4.svg":
/*!*******************************!*\
  !*** ./src/data/weather4.svg ***!
  \*******************************/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSLDRFQUE0RTtBQUM1RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBNEIscUJBQXFCO0FBQ2pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0EscUNBQXFDLDBCQUEwQjtBQUMvRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkJBQTZCLDBCQUEwQixlQUFlO0FBQ3RFOztBQUVPO0FBQ1A7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3NlY3JldHMuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLWZldGNoL2ZldGNoLW5wbS1icm93c2VyaWZ5LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3BleGVscy9kaXN0L21haW4ubW9kdWxlLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9ub2RlX21vZHVsZXMvd2hhdHdnLWZldGNoL2ZldGNoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5pbXBvcnQgc2VjcmV0cyBmcm9tIFwiLi9zZWNyZXRzXCI7XG5pbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tIFwicGV4ZWxzXCI7XG5cbmNvbnN0IE9XX0FQSV9LRVkgPSBzZWNyZXRzW1wiT1BFTldFQVRIRVJcIl07XG4vLyBjb25zdCBQX0FQSV9LRVkgPSBzZWNyZXRzW1wiUEVYRUxTXCJdO1xuLy8gY29uc3QgY2xpZW50ID0gY3JlYXRlQ2xpZW50KFBfQVBJX0tFWSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWN0aW9uXCIpO1xuICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9vdGVyXCIpO1xuXG4gIC8vIEhlYWRlclxuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRpdGxlLmlubmVyVGV4dCA9IFwiVGhlLVdlYXRoZXItQXBwXCI7XG4gIHRpdGxlLmlkID0gXCJ0aXRsZVwiO1xuICBjb25zdCBzZWFyY2hDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzZWFyY2hDb250YWluZXIuaWQgPSBcInNlYXJjaC1jb250YWluZXJcIjtcbiAgY29uc3Qgc2VhcmNoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICBzZWFyY2guaWQgPSBcInNlYXJjaFwiO1xuICBzZWFyY2gucGxhY2Vob2xkZXIgPSBcIvCflI4gU2VhcmNoLi4uXCI7XG4gIGNvbnN0IHNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHNlYXJjaEJ1dHRvbi5pZCA9IFwic2VhcmNoLWJ1dHRvblwiO1xuICBcbiAgLy8gU2VjdGlvblxuICBjb25zdCB3ZWF0aGVyQ2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHdlYXRoZXJDYXJkLmlkID0gXCJ3ZWF0aGVyLWNhcmRcIjtcbiAgY29uc3QgZm9yZWNhc3RDYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAvLyBIZWFkZXI6IFRpdGxlXG4gIGhlYWRlci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gIC8vIEhlYWRlcjogU2VhcmNoIEJhclxuICAvLyBUQkQ6IEN1cnJlbnQgbG9jYXRpb24gYnV0dG9uIG5leHQgdG8gc2VhcmNoIGJ1dHRvbiBcbiAgc2VhcmNoQnV0dG9uLmlubmVyVGV4dCA9IFwiU2VhcmNoXCI7XG4gIHNlYXJjaENvbnRhaW5lci5hcHBlbmRDaGlsZChzZWFyY2gpO1xuICBzZWFyY2hDb250YWluZXIuYXBwZW5kQ2hpbGQoc2VhcmNoQnV0dG9uKTtcbiAgaGVhZGVyLmFwcGVuZENoaWxkKHNlYXJjaENvbnRhaW5lcik7XG5cbiAgLy8gU2VjdGlvbjogd2VhdGhlciBjYXJkOiB7SWNvbiwgV2VhdGhlckluZm8sIEZhY3R9XG4gIC8vIEljb25cbiAgY29uc3QgaWNvbkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGljb25Db250YWluZXIuaWQgPSBcImljb24tY29udGFpbmVyXCI7XG4gIGNvbnN0IGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICBpY29uLmlkID0gXCJpY29uXCI7XG4gIGNvbnN0IGZlZWxzTGlrZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGZlZWxzTGlrZS5pZCA9IFwiZmVlbHMtbGlrZVwiO1xuICBjb25zdCBtaW5UZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbWluVGVtcC5pZCA9IFwibWluLXRlbXBcIjtcbiAgY29uc3QgbWF4VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIG1heFRlbXAuaWQgPSBcIm1heC10ZW1wXCI7XG4gIGNvbnN0IHByZXNzdXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICBwcmVzc3VyZS5pZCA9IFwicHJlc3N1cmVcIjtcbiAgaWNvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChpY29uKTtcbiAgaWNvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChmZWVsc0xpa2UpO1xuICBpY29uQ29udGFpbmVyLmFwcGVuZENoaWxkKG1pblRlbXApO1xuICBpY29uQ29udGFpbmVyLmFwcGVuZENoaWxkKG1heFRlbXApO1xuICAvLyBXZWF0aGVySW5mb1xuICBjb25zdCB3ZWF0aGVySW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHdlYXRoZXJJbmZvLmlkID0gXCJ3ZWF0aGVyLWluZm9cIjtcbiAgY29uc3Qgd2VhdGhlckxvY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgd2VhdGhlckxvY2F0aW9uLmlkID0gXCJ3ZWF0aGVyLWxvY2F0aW9uXCI7XG4gIGNvbnN0IHdlYXRoZXJUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgd2VhdGhlclRlbXAuaWQgPSBcIndlYXRoZXItdGVtcFwiO1xuICBjb25zdCB3ZWF0aGVyRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB3ZWF0aGVyRGVzY3JpcHRpb24uaWQgPSBcIndlYXRoZXItZGVzY3JpcHRpb25cIjtcbiAgd2VhdGhlckluZm8uYXBwZW5kQ2hpbGQod2VhdGhlckxvY2F0aW9uKTtcbiAgd2VhdGhlckluZm8uYXBwZW5kQ2hpbGQod2VhdGhlclRlbXApO1xuICB3ZWF0aGVySW5mby5hcHBlbmRDaGlsZCh3ZWF0aGVyRGVzY3JpcHRpb24pO1xuICAvLyBGYWN0KHMpXG4gIGNvbnN0IGZhY3RzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgZmFjdHNDb250YWluZXIuaWQgPSBcImZhY3RzLWNvbnRhaW5lclwiO1xuICBjb25zdCBzdW5yaXNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgc3VucmlzZS5pZCA9IFwic3VucmlzZVwiO1xuICBjb25zdCBzdW5zZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBzdW5zZXQuaWQgPSBcInN1bnNldFwiO1xuICBjb25zdCB2aXNpYmlsaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdmlzaWJpbGl0eS5pZCA9IFwidmlzaWJpbGl0eVwiO1xuICBjb25zdCB3aW5kc3BlZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB3aW5kc3BlZWQuaWQgPSBcIndpbmRzcGVlZFwiO1xuICBjb25zdCBodW1pZGl0eUFuZFByZXNzdXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaHVtaWRpdHlBbmRQcmVzc3VyZS5pZCA9IFwiaHVtaWRpdHktYW5kLXByZXNzdXJlXCI7XG4gIGZhY3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKHN1bnJpc2UpO1xuICBmYWN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChzdW5zZXQpO1xuICBmYWN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZCh2aXNpYmlsaXR5KTtcbiAgZmFjdHNDb250YWluZXIuYXBwZW5kQ2hpbGQod2luZHNwZWVkKTtcbiAgZmFjdHNDb250YWluZXIuYXBwZW5kQ2hpbGQoaHVtaWRpdHlBbmRQcmVzc3VyZSk7XG5cbiAgd2VhdGhlckNhcmQuYXBwZW5kQ2hpbGQoaWNvbkNvbnRhaW5lcik7XG4gIHdlYXRoZXJDYXJkLmFwcGVuZENoaWxkKHdlYXRoZXJJbmZvKTtcbiAgd2VhdGhlckNhcmQuYXBwZW5kQ2hpbGQoZmFjdHNDb250YWluZXIpO1xuXG4gIC8vIEZvcmVjYXN0IENhcmQ6IFRCRFxuXG4gIHNlY3Rpb24uYXBwZW5kQ2hpbGQod2VhdGhlckNhcmQpO1xuICBcbiAgLy8gRm9vdGVyOiBUQkRcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2VjdGlvbik7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcblxuICBhZGRMaXN0ZW5lcnMoKTtcbn1cblxuZnVuY3Rpb24gYWRkTGlzdGVuZXJzKCkge1xuICBjb25zdCBzZWFyY2ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaFwiKTtcbiAgY29uc3Qgc2VhcmNoQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2gtYnV0dG9uXCIpO1xuICBzZWFyY2hCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAvLyBXaGlsZSB0aGUgdmFsdWUgb2Ygc2VhcmNoIGlzIDAsIGJ1dHRvbiByZW1haW5zIGRpc2FibGVkXG4gIHNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgIGlmIChzZWFyY2gudmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgc2VhcmNoQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAvLyBMaXN0ZW4gZm9yIEVOVEVSIGtleVxuICAgICAgc2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHNlYXJjaEJ1dHRvbi5jbGljaygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VhcmNoQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIHNlYXJjaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHNldExvY2F0aW9uKClcbiAgICAvLyBUbyBwcmV2ZW50IG11bHRpcGxlIGFwaSBjYWxsc1xuICAgIHNlYXJjaEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRMb2NhdGlvbigpIHtcbiAgY29uc3Qgc2VhcmNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hcIik7XG4gIGxldCBwbGFjZSA9IHNlYXJjaC52YWx1ZTtcbiAgZmV0Y2hXZWF0aGVyKHBsYWNlKVxuICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIGlmIChkYXRhLmNvZCA9PT0gJzIwMCcpIHtcbiAgICAgICAgLy8gTGVmdCBjYXJkXG4gICAgICAgIGxldCBpY29uID0gZGF0YS5saXN0WzBdLndlYXRoZXJbMF0uaWNvbjtcbiAgICAgICAgbGV0IGZlZWxzTGlrZSA9IGRhdGEubGlzdFswXS5tYWluLmZlZWxzX2xpa2U7XG4gICAgICAgIGxldCBtaW4gPSBkYXRhLmxpc3RbMF0ubWFpbi50ZW1wX21pbjtcbiAgICAgICAgbGV0IG1heCA9IGRhdGEubGlzdFswXS5tYWluLnRlbXBfbWF4O1xuICAgICAgICBsZXQgbWlubWF4ID0gW21pbiwgbWF4XTtcbiAgICAgICAgLy8gTWlkZGxlIGNhcmRcbiAgICAgICAgbGV0IGxvY2F0aW9uID0gZGF0YS5jaXR5Lm5hbWUgKyAnLCAnICsgZGF0YS5jaXR5LmNvdW50cnk7XG4gICAgICAgIGxldCB0ZW1wZXJhdHVyZSA9IGRhdGEubGlzdFswXS5tYWluLnRlbXA7IFxuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBkYXRhLmxpc3RbMF0ud2VhdGhlclswXS5tYWluICsgXCI6IFwiICsgZGF0YS5saXN0WzBdLndlYXRoZXJbMF0uZGVzY3JpcHRpb247XG4gICAgICAgIC8vIFJpZ2h0IGNhcmRcbiAgICAgICAgbGV0IHN1bnJpc2UgPSBkYXRhLmNpdHkuc3VucmlzZTtcbiAgICAgICAgbGV0IHN1bnNldCA9IGRhdGEuY2l0eS5zdW5zZXQ7XG4gICAgICAgIGxldCB2aXNpYmlsaXR5ID0gZGF0YS5saXN0WzBdLnZpc2liaWxpdHk7XG4gICAgICAgIGxldCB3aW5kc3BlZWQgPSBkYXRhLmxpc3RbMF0ud2luZC5zcGVlZDtcbiAgICAgICAgbGV0IGh1bWlkaXR5ID0gZGF0YS5saXN0WzBdLm1haW4uaHVtaWRpdHk7XG4gICAgICAgIGxldCBwcmVzc3VyZSA9IGRhdGEubGlzdFswXS5tYWluLnByZXNzdXJlO1xuICAgICAgICBsZXQgc3VuID0gW3N1bnJpc2UsIHN1bnNldF07XG4gICAgICAgIGxldCBodW1pZGl0eUFuZFByZXNzdXJlID0gW2h1bWlkaXR5LCBwcmVzc3VyZV07XG5cbiAgICAgICAgdXBkYXRlV2VhdGhlcihpY29uLCBmZWVsc0xpa2UsIG1pbm1heCwgbG9jYXRpb24sIHRlbXBlcmF0dXJlLCBkZXNjcmlwdGlvbiwgc3VuLCB2aXNpYmlsaXR5LCB3aW5kc3BlZWQsIGh1bWlkaXR5QW5kUHJlc3N1cmUpO1xuICAgICAgfSBlbHNlIGlmIChkYXRhLmNvZCA9PT0gXCI0MDRcIikge1xuICAgICAgICBhbGVydChcIlBsYWNlIG5vdCBmb3VuZC4gUGxlYXNlIHRyeSBhZ2Fpbi5cIik7XG4gICAgICB9XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGluIHNldHRpbmcgbG9jYXRpb246IFwiICsgZXJyb3IpO1xuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaFdlYXRoZXIocGxhY2UpIHtcbiAgdHJ5IHtcbiAgICBsZXQgd2VhdGhlciA9IGF3YWl0IGZldGNoKFxuICAgICAgYGh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9JHtwbGFjZX0mYXBwaWQ9JHtPV19BUElfS0VZfSZ1bml0cz1tZXRyaWNgXG4gICAgKTtcbiAgICBsZXQgZGF0YSA9IGF3YWl0IHdlYXRoZXIuanNvbigpO1xuICAgIHJldHVybiBkYXRhO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgaW4gZmV0Y2hpbmcgd2VhdGhlclwiICsgZXJyb3IpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoV2VhdGhlckljb24oY29kZSkge1xuICB0cnkge1xuICAgIGxldCBpY29uID0gYXdhaXQgZmV0Y2goYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3cvJHtjb2RlfS5wbmdgKTtcbiAgICByZXR1cm4gaWNvbjtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhcIkVycm9yIGluIGZldGNoaW5nIGljb25cIiArIGVycm9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVXZWF0aGVyKGljb24sIGZlZWxzbGlrZSwgbWlubWF4LCBsb2NhdGlvbiwgdGVtcGVyYXR1cmUsIGRlc2NyaXB0aW9uLCBzdW4sIHZpc2liaWxpdHksIHdpbmRzcGVlZCwgaHVtaWRpdHlBbmRQcmVzc3VyZSl7XG4gIC8vIFVwZGF0ZSBJQ09OXG4gIGNvbnN0IGljb25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImljb24tY29udGFpbmVyXCIpO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImljb25cIikuc3JjID0gYGh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3cvJHtpY29ufS5wbmdgO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZlZWxzLWxpa2VcIikuaW5uZXJUZXh0ID0gYEZlZWxzIGxpa2U6ICR7ZmVlbHNsaWtlfSDCsEMgLyAkeyhmZWVsc2xpa2UgKiA5LzUgKyAzMikudG9GaXhlZCgyKX0gwrBGYDtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtaW4tdGVtcFwiKS5pbm5lclRleHQgPSBgTWluOiAke21pbm1heFswXX0gwrBDIC8gJHsobWlubWF4WzBdICogOS81ICsgMzIpLnRvRml4ZWQoMil9IMKwRmA7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWF4LXRlbXBcIikuaW5uZXJUZXh0ID0gYE1heDogJHttaW5tYXhbMV19IMKwQyAvICR7KG1pbm1heFsxXSAqIDkvNSArIDMyKS50b0ZpeGVkKDIpfSDCsEZgO1xuICBcbiAgLy8gVXBkYXRlIHdlYXRoZXIgaW5mb1xuICBjb25zdCB3ZWF0aGVySW5mbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2VhdGhlci1pbmZvXCIpO1xuICAvLyBVcGRhdGUgd2VhdGhlciBpbmZvIGNvbG91clxuICAvLyBTZXQgdGhlIGJhY2tncm91bmQgY29sb3VyICgrZ3JhZGllbnQpIG9mIHdlYXRoZXJJbmZvIGJhc2VkIG9uIHRlbXBlcmF0dXJlIHZhbHVlXG4gIC8vIE9wdGltYWwgaHVtYW4gdGVtcGVyYXR1cmU6IDI2LTI4IENcbiAgLy8gQlVHIFdJVEggTkVHQVRJVkUgVEVNUEVSQVRVUkVTXG4gIGlmIChNYXRoLmZsb29yKHRlbXBlcmF0dXJlKSA8IDI2KSB7XG4gICAgd2VhdGhlckluZm8uc3R5bGUuYmFja2dyb3VuZCA9IGBsaW5lYXItZ3JhZGllbnQocmdiYSgwLCAwLCAyNTUsICR7dGVtcGVyYXR1cmUvMjZ9KSwgcmdiYSgwLCAwLCAyNTUsICR7dGVtcGVyYXR1cmUvMjZ9KSlgO1xuICB9IGVsc2UgaWYgKE1hdGguZmxvb3IodGVtcGVyYXR1cmUpID4gMjgpIHtcbiAgICB3ZWF0aGVySW5mby5zdHlsZS5iYWNrZ3JvdW5kID0gYGxpbmVhci1ncmFkaWVudChyZ2JhKDI1NSwgMCwgMCwgJHt0ZW1wZXJhdHVyZS8yOH0pLCByZ2JhKDI1NSwgMCwgMCwgJHt0ZW1wZXJhdHVyZS8yOH0pKWA7XG4gIH0gZWxzZSB7XG4gICAgd2VhdGhlckluZm8uc3R5bGUuYmFja2dyb3VuZCA9IGBsaW5lYXItZ3JhZGllbnQocmdiYSgyNTUsIDI1NSwgMjU1LCAxKSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAxKSlgO1xuICAgIHdlYXRoZXJJbmZvLnN0eWxlLmNvbG9yID0gYHJnYmEoMCwgMCwgMCwgMSlgO1xuICB9XG4gIC8vIFVwZGF0ZSBsb2NhdGlvbiwgdGVtcCwgZGVzY3JpcHRpb25cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWF0aGVyLWxvY2F0aW9uXCIpLmlubmVyVGV4dCA9IGxvY2F0aW9uO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXRoZXItdGVtcFwiKS5pbm5lclRleHQgPSB0ZW1wZXJhdHVyZSArIFwiIMKwQyAvIFwiICsgKHRlbXBlcmF0dXJlICogOS81ICsgMzIpLnRvRml4ZWQoMikgKyBcIiDCsEZcIjtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWF0aGVyLWRlc2NyaXB0aW9uXCIpLmlubmVyVGV4dCA9IGRlc2NyaXB0aW9uO1xuICAvLyBVcGRhdGUgZmFjdHNcbiAgY29uc3QgZmFjdHNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZhY3RzLWNvbnRhaW5lclwiKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdW5yaXNlXCIpLmlubmVyVGV4dCA9IGBTdW5yaXNlOiAke25ldyBEYXRlKHN1blswXSAqIDEwMDApLnRvTG9jYWxlVGltZVN0cmluZygpfSBFU1RgO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1bnNldFwiKS5pbm5lclRleHQgPSBgU3Vuc2V0OiAke25ldyBEYXRlKHN1blsxXSAqIDEwMDApLnRvTG9jYWxlVGltZVN0cmluZygpfSBFU1RgO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbmRzcGVlZFwiKS5pbm5lclRleHQgPSBgV2luZHNwZWVkOiAke3dpbmRzcGVlZH0gbS9zYDtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpYmlsaXR5XCIpLmlubmVyVGV4dCA9IGBWaXNpYmlsaXR5OiAke3Zpc2liaWxpdHl9IG1gO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImh1bWlkaXR5LWFuZC1wcmVzc3VyZVwiKS5pbm5lclRleHQgPSBgSHVtaWRpdHk6ICR7aHVtaWRpdHlBbmRQcmVzc3VyZVswXX0gJSwgUHJlc3N1cmU6ICR7aHVtaWRpdHlBbmRQcmVzc3VyZVsxXX0gaFBhYDtcbiAgLy8gSURFQTogYGxpbmVhci1ncmFkaWVudChyZ2JhKDAsIDAsIDAsIDAuNSksIHJnYmEoMCwgMCwgMCwgMC41KSksIHVybChcImh0dHBzOi8vc291cmNlLnVuc3BsYXNoLmNvbS8xNjAweDkwMC8/JHtsb2NhdGlvbn1cIilgO1xuICAvLyBUQkRcbiAgLy8gSURFQSAyOiBBZGQgbW9yZSBpbmZvcm1hdGlvbiBpbiBhbm90aGVyIGNhcmQgcmVsYXRpbmcgdG8gaHVtaWRpdHksIHByZXNzdXJlLCB3aW5kc3BlZWQsIHN1bnJpc2UsIHN1bnNldCwgZXRjXG4gIGljb25Db250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICB3ZWF0aGVySW5mby5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gIGZhY3RzQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbn1cblxuLy8gSURFQTogSW5zdGVhZCBvZiBpbWFnZSwgd2Ugd2lsbCBjaGFuZ2UgYmFja2dyb3VuZCBjb2xvdXIgYmFzZWQgb24gdGVtcGVyYXR1cmVcbmFzeW5jIGZ1bmN0aW9uIGZldGNoSW1hZ2UocXVlcnkpIHtcbiAgdHJ5IHtcbiAgICBsZXQgaW1hZ2VzID0gYXdhaXQgY2xpZW50LnBob3Rvcy5zZWFyY2goe1xuICAgICAgcXVlcnksXG4gICAgICBvcmllbnRhdGlvbjogXCJsYW5kc2NhcGVcIixcbiAgICB9KTtcbiAgICByZXR1cm4gaW1hZ2VzO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRJbWFnZShyZXNwb25zZSkge1xuICBsZXQgaW1hZ2UgPSByZXNwb25zZS5waG90b3NbMF0uc3JjLm1lZGl1bTtcbiAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7aW1hZ2V9KWA7XG59XG5cbmNyZWF0ZUxheW91dCgpOyIsIi8vIEFQSSBLZXlzIGZvciBPcGVuIFdlYXRoZXIgYW5kIFBFWEVMUyBBUEkgKEZyZWUgZm9yIGFsbClcbmNvbnN0IHNlY3JldHMgPSB7XG4gICAgJ09QRU5XRUFUSEVSJzogJycsXG4gICAgJ1BFWEVMUyc6ICcnXG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2VjcmV0czsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiZGF0YS9DaGVhcCBQaW5lIFJlZ3VsYXIudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18gPSBuZXcgVVJMKFwiZGF0YS9FbHphIFJlZ3VsYXIudHRmXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18gPSBuZXcgVVJMKFwiZGF0YS93ZWF0aGVyNC5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdDaGVhcCBQaW5lJztcXG4gIHNyYzogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKTtcXG59XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0VsemEgUmVndWxhcic7XFxuICBzcmM6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gKyBcIik7XFxufVxcblxcbjpyb290IHtcXG4gIC0tYm94LXNoYWRvdzogMHB4IDRweCA2cHggMHB4IHJnYmEoNTAsIDUwLCA5MywgMC4xMSksXFxuICAgIDBweCAxcHggM3B4IDBweCByZ2JhKDAsIDAsIDAsIDAuMDgpO1xcbiAgLS1wdXJwbGU6ICM5MTQ3ZmY7XFxufVxcblxcbmh0bWwsXFxuYm9keSB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbmJvZHkge1xcbiAgLyogR3JpZDogaGVhZGVyWzE1JV0sIHNlY3Rpb25bNzAlXSwgZm9vdGVyWyMlXSovXFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAzMCUgNzAlIDEwJTtcXG4gIGdhcDogMTBweDtcXG59XFxuXFxuaGVhZGVyLFxcbnNlY3Rpb24ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGJveC1zaGFkb3c6IHZhcigtLWJveC1zaGFkb3cpO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyArIFwiKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMnB4O1xcbn1cXG5cXG4jdGl0bGUge1xcbiAgZm9udC1zaXplOiA1cmVtO1xcbiAgZm9udC1mYW1pbHk6ICdDaGVhcCBQaW5lJywgY3Vyc2l2ZTtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XFxufVxcblxcbiNzZWFyY2gtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGdhcDogMTBweDtcXG59XFxuXFxuI3NlYXJjaCB7XFxuICBmb250LXNpemU6IDEzcHg7XFxuICBmb250LWZhbWlseTogJ0NvdXJpZXIgTmV3JywgQ291cmllciwgbW9ub3NwYWNlO1xcbiAgcGFkZGluZy1sZWZ0OiA1cHg7XFxuICB3aWR0aDogMjB2dztcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBsaW5lLWhlaWdodDogMS41O1xcbiAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAxMDBtcyBlYXNlLWluLCBib3JkZXIgMTAwbXMgZWFzZS1pbiwgYmFja2dyb3VuZC1jb2xvciAxMDBtcyBlYXNlLWluO1xcbiAgYm9yZGVyOiAycHggc29saWQgI2RlZTFlMjtcXG4gIGNvbG9yOiByZ2IoMTQsIDE0LCAxNik7XFxuICBiYWNrZ3JvdW5kOiAjZGVlMWUyO1xcbiAgb3BhY2l0eTogOTAlO1xcbn1cXG5cXG4jc2VhcmNoOmhvdmVyIHtcXG4gIGJvcmRlci1jb2xvcjogI2NjYztcXG59XFxuI3NlYXJjaDpmb2N1cyB7XFxuICBvdXRsaW5lOiBub25lO1xcbiAgYm9yZGVyLWNvbG9yOiB2YXIoLS1wdXJwbGUpO1xcbiAgYmFja2dyb3VuZDogI2ZmZjtcXG4gIG9wYWNpdHk6IDEwMCU7XFxufVxcblxcbiNzZWFyY2g6OnBsYWNlaG9sZGVyIHtcXG4gIGNvbG9yOiAjY2NjO1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG59XFxuXFxuI3NlYXJjaC1idXR0b24geyAgXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgb3V0bGluZTogMDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgIGZvbnQtc2l6ZTogMTNweDtcXG4gICAgaGVpZ2h0OiAzMHB4O1xcbiAgICB3aWR0aDogMTB2dztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcHVycGxlKTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbiAgICBwYWRkaW5nOiAwIDEwcHg7XFxuICAgIG9wYWNpdHk6IDkwJTtcXG59XFxuXFxuI3NlYXJjaC1idXR0b246aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wdXJwbGUpO1xcbiAgICBvcGFjaXR5OiAxMDAlO1xcbn1cXG5cXG4jc2VhcmNoLWJ1dHRvbjpkaXNhYmxlZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XFxuICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7XFxufVxcblxcbnNlY3Rpb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4jd2VhdGhlci1jYXJke1xcbiAgd2lkdGg6IDkwJTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xcbiAgZ2FwOiAxMHB4O1xcbiAgaGVpZ2h0OiBmaXQtY29udGVudDtcXG59XFxuXFxuI3dlYXRoZXItaW5mbywgI2ljb24tY29udGFpbmVyLCAjZmFjdHMtY29udGFpbmVye1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogNXB4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBtYXJnaW46IDVweDtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIGZvbnQtZmFtaWx5OiAnRWx6YSBSZWd1bGFyJywgY3Vyc2l2ZTtcXG4gIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuODUpO1xcbiAgYm94LXNoYWRvdzogdmFyKC0tYm94LXNoYWRvdyk7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDEuMnJlbTtcXG59XFxuXFxuI2ljb24tY29udGFpbmVyLCAjZmFjdHMtY29udGFpbmVye1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzkxNDdmZmQyO1xcbn1cXG5cXG4jd2VhdGhlci1sb2NhdGlvbiwgI3dlYXRoZXItdGVtcHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG59XFxuXFxuZm9vdGVyIHtcXG4gIC8qIGJvcmRlcjogMnB4IGJsdWUgc29saWQ7ICovXFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XFxuICBib2R5e1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LWhlaWdodDogNjYwcHgpIHtcXG4gIGJvZHl7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSx5QkFBeUI7RUFDekIsNENBQXVDO0FBQ3pDOztBQUVBO0VBQ0UsMkJBQTJCO0VBQzNCLDRDQUFnQztBQUNsQzs7QUFFQTtFQUNFO3VDQUNxQztFQUNyQyxpQkFBaUI7QUFDbkI7O0FBRUE7O0VBRUUsWUFBWTtFQUNaLFNBQVM7QUFDWDs7QUFFQTtFQUNFLCtDQUErQztFQUMvQyxhQUFhO0VBQ2IsK0JBQStCO0VBQy9CLFNBQVM7QUFDWDs7QUFFQTs7RUFFRSxzQkFBc0I7RUFDdEIsNkJBQTZCO0FBQy9COztBQUVBO0VBQ0UseURBQXdDO0VBQ3hDLHNCQUFzQjtFQUN0QixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixzQkFBc0I7RUFDdEIsUUFBUTtBQUNWOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGtDQUFrQztFQUNsQyxlQUFlO0VBQ2YsbUJBQW1CO0FBQ3JCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsdUJBQXVCO0lBQ3ZCLFNBQVM7QUFDYjs7QUFFQTtFQUNFLGVBQWU7RUFDZiw4Q0FBOEM7RUFDOUMsaUJBQWlCO0VBQ2pCLFdBQVc7RUFDWCxtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLDBGQUEwRjtFQUMxRix5QkFBeUI7RUFDekIsc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGFBQWE7RUFDYiwyQkFBMkI7RUFDM0IsZ0JBQWdCO0VBQ2hCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxnQkFBZ0I7QUFDbEI7O0FBRUE7SUFDSSxxQkFBcUI7SUFDckIsVUFBVTtJQUNWLFlBQVk7SUFDWixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixlQUFlO0lBQ2YsWUFBWTtJQUNaLFdBQVc7SUFDWCwrQkFBK0I7SUFDL0IsWUFBWTtJQUNaLGVBQWU7SUFDZixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksK0JBQStCO0lBQy9CLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxzQkFBc0I7SUFDdEIsbUJBQW1CO0FBQ3ZCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxVQUFVO0VBQ1YsYUFBYTtFQUNiLGtDQUFrQztFQUNsQyxTQUFTO0VBQ1QsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsUUFBUTtFQUNSLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsV0FBVztFQUNYLFlBQVk7RUFDWixvQ0FBb0M7RUFDcEMsZ0NBQWdDO0VBQ2hDLDZCQUE2QjtFQUM3QixrQkFBa0I7RUFDbEIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFO0lBQ0UsYUFBYTtFQUNmO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLGFBQWE7RUFDZjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICdDaGVhcCBQaW5lJztcXG4gIHNyYzogdXJsKGRhdGEvQ2hlYXBcXFxcIFBpbmVcXFxcIFJlZ3VsYXIudHRmKTtcXG59XFxuXFxuQGZvbnQtZmFjZSB7XFxuICBmb250LWZhbWlseTogJ0VsemEgUmVndWxhcic7XFxuICBzcmM6IHVybChkYXRhL0VsemFcXFxcIFJlZ3VsYXIudHRmKTtcXG59XFxuXFxuOnJvb3Qge1xcbiAgLS1ib3gtc2hhZG93OiAwcHggNHB4IDZweCAwcHggcmdiYSg1MCwgNTAsIDkzLCAwLjExKSxcXG4gICAgMHB4IDFweCAzcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4wOCk7XFxuICAtLXB1cnBsZTogIzkxNDdmZjtcXG59XFxuXFxuaHRtbCxcXG5ib2R5IHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuYm9keSB7XFxuICAvKiBHcmlkOiBoZWFkZXJbMTUlXSwgc2VjdGlvbls3MCVdLCBmb290ZXJbIyVdKi9cXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDMwJSA3MCUgMTAlO1xcbiAgZ2FwOiAxMHB4O1xcbn1cXG5cXG5oZWFkZXIsXFxuc2VjdGlvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgYm94LXNoYWRvdzogdmFyKC0tYm94LXNoYWRvdyk7XFxufVxcblxcbmhlYWRlciB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoZGF0YS93ZWF0aGVyNC5zdmcpO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiAycHg7XFxufVxcblxcbiN0aXRsZSB7XFxuICBmb250LXNpemU6IDVyZW07XFxuICBmb250LWZhbWlseTogJ0NoZWFwIFBpbmUnLCBjdXJzaXZlO1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbiAgbWFyZ2luLWJvdHRvbTogNDBweDtcXG59XFxuXFxuI3NlYXJjaC1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgZ2FwOiAxMHB4O1xcbn1cXG5cXG4jc2VhcmNoIHtcXG4gIGZvbnQtc2l6ZTogMTNweDtcXG4gIGZvbnQtZmFtaWx5OiAnQ291cmllciBOZXcnLCBDb3VyaWVyLCBtb25vc3BhY2U7XFxuICBwYWRkaW5nLWxlZnQ6IDVweDtcXG4gIHdpZHRoOiAyMHZ3O1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDEwMG1zIGVhc2UtaW4sIGJvcmRlciAxMDBtcyBlYXNlLWluLCBiYWNrZ3JvdW5kLWNvbG9yIDEwMG1zIGVhc2UtaW47XFxuICBib3JkZXI6IDJweCBzb2xpZCAjZGVlMWUyO1xcbiAgY29sb3I6IHJnYigxNCwgMTQsIDE2KTtcXG4gIGJhY2tncm91bmQ6ICNkZWUxZTI7XFxuICBvcGFjaXR5OiA5MCU7XFxufVxcblxcbiNzZWFyY2g6aG92ZXIge1xcbiAgYm9yZGVyLWNvbG9yOiAjY2NjO1xcbn1cXG4jc2VhcmNoOmZvY3VzIHtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBib3JkZXItY29sb3I6IHZhcigtLXB1cnBsZSk7XFxuICBiYWNrZ3JvdW5kOiAjZmZmO1xcbiAgb3BhY2l0eTogMTAwJTtcXG59XFxuXFxuI3NlYXJjaDo6cGxhY2Vob2xkZXIge1xcbiAgY29sb3I6ICNjY2M7XFxuICBmb250LXdlaWdodDogOTAwO1xcbn1cXG5cXG4jc2VhcmNoLWJ1dHRvbiB7ICBcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBvdXRsaW5lOiAwO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgZm9udC1zaXplOiAxM3B4O1xcbiAgICBoZWlnaHQ6IDMwcHg7XFxuICAgIHdpZHRoOiAxMHZ3O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wdXJwbGUpO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIHBhZGRpbmc6IDAgMTBweDtcXG4gICAgb3BhY2l0eTogOTAlO1xcbn1cXG5cXG4jc2VhcmNoLWJ1dHRvbjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXB1cnBsZSk7XFxuICAgIG9wYWNpdHk6IDEwMCU7XFxufVxcblxcbiNzZWFyY2gtYnV0dG9uOmRpc2FibGVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcXG4gICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcXG59XFxuXFxuc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbiN3ZWF0aGVyLWNhcmR7XFxuICB3aWR0aDogOTAlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XFxuICBnYXA6IDEwcHg7XFxuICBoZWlnaHQ6IGZpdC1jb250ZW50O1xcbn1cXG5cXG4jd2VhdGhlci1pbmZvLCAjaWNvbi1jb250YWluZXIsICNmYWN0cy1jb250YWluZXJ7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiA1cHg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIG1hcmdpbjogNXB4O1xcbiAgcGFkZGluZzogNXB4O1xcbiAgZm9udC1mYW1pbHk6ICdFbHphIFJlZ3VsYXInLCBjdXJzaXZlO1xcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44NSk7XFxuICBib3gtc2hhZG93OiB2YXIoLS1ib3gtc2hhZG93KTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbn1cXG5cXG4jaWNvbi1jb250YWluZXIsICNmYWN0cy1jb250YWluZXJ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTE0N2ZmZDI7XFxufVxcblxcbiN3ZWF0aGVyLWxvY2F0aW9uLCAjd2VhdGhlci10ZW1we1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgLyogYm9yZGVyOiAycHggYmx1ZSBzb2xpZDsgKi9cXG59XFxuXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcXG4gIGJvZHl7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxufVxcblxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtaGVpZ2h0OiA2NjBweCkge1xcbiAgYm9keXtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTtcblxuICAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfVxuXG4gIC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiLy8gdGhlIHdoYXR3Zy1mZXRjaCBwb2x5ZmlsbCBpbnN0YWxscyB0aGUgZmV0Y2goKSBmdW5jdGlvblxuLy8gb24gdGhlIGdsb2JhbCBvYmplY3QgKHdpbmRvdyBvciBzZWxmKVxuLy9cbi8vIFJldHVybiB0aGF0IGFzIHRoZSBleHBvcnQgZm9yIHVzZSBpbiBXZWJwYWNrLCBCcm93c2VyaWZ5IGV0Yy5cbnJlcXVpcmUoJ3doYXR3Zy1mZXRjaCcpO1xubW9kdWxlLmV4cG9ydHMgPSBzZWxmLmZldGNoLmJpbmQoc2VsZik7XG4iLCJ2YXIgdD17cGhvdG86XCJodHRwczovL2FwaS5wZXhlbHMuY29tL3YxL1wiLHZpZGVvOlwiaHR0cHM6Ly9hcGkucGV4ZWxzLmNvbS92aWRlb3MvXCIsY29sbGVjdGlvbnM6XCJodHRwczovL2FwaS5wZXhlbHMuY29tL3YxL2NvbGxlY3Rpb25zL1wifTtmdW5jdGlvbiByKHIsZSl7dmFyIG49e21ldGhvZDpcIkdFVFwiLGhlYWRlcnM6e0FjY2VwdDpcImFwcGxpY2F0aW9uL2pzb25cIixcIkNvbnRlbnQtVHlwZVwiOlwiYXBwbGljYXRpb24vanNvblwiLFwiVXNlci1BZ2VudFwiOlwiUGV4ZWxzL0phdmFTY3JpcHRcIixBdXRob3JpemF0aW9uOnJ9fSxvPXRbZV07cmV0dXJuIGZ1bmN0aW9uKHQscil7cmV0dXJuIGZldGNoKFwiXCIrbyt0K1wiP1wiK2Z1bmN0aW9uKHQpe3JldHVybiBPYmplY3Qua2V5cyh0KS5tYXAoZnVuY3Rpb24ocil7cmV0dXJuIHIrXCI9XCIrdFtyXX0pLmpvaW4oXCImXCIpfShyfHx7fSksbikudGhlbihmdW5jdGlvbih0KXtpZighdC5vayl0aHJvdyBuZXcgRXJyb3IodC5zdGF0dXNUZXh0KTtyZXR1cm4gdC5qc29uKCl9KX19ZnVuY3Rpb24gZSh0KXt2YXIgZT1yKHQsXCJjb2xsZWN0aW9uc1wiKTtyZXR1cm57YWxsOmZ1bmN0aW9uKHQpe3JldHVybiB2b2lkIDA9PT10JiYodD17fSksZShcIlwiLHQpfSxtZWRpYTpmdW5jdGlvbih0KXt2YXIgcj10LmlkLG49ZnVuY3Rpb24odCxyKXtpZihudWxsPT10KXJldHVybnt9O3ZhciBlLG4sbz17fSxpPU9iamVjdC5rZXlzKHQpO2ZvcihuPTA7bjxpLmxlbmd0aDtuKyspci5pbmRleE9mKGU9aVtuXSk+PTB8fChvW2VdPXRbZV0pO3JldHVybiBvfSh0LFtcImlkXCJdKTtyZXR1cm4gZShcIlwiK3Isbil9LGZlYXR1cmVkOmZ1bmN0aW9uKHQpe3JldHVybiB2b2lkIDA9PT10JiYodD17fSksZShcImZlYXR1cmVkXCIsdCl9fX1mdW5jdGlvbiBuKHQpe3JldHVybiEoIXR8fCF0LnBob3Rvcyl9dmFyIG89e19fcHJvdG9fXzpudWxsLGlzUGhvdG9zOm4saXNWaWRlb3M6ZnVuY3Rpb24odCl7cmV0dXJuISghdHx8IXQudmlkZW9zKX0saXNFcnJvcjpmdW5jdGlvbih0KXtyZXR1cm4hIXQuZXJyb3J9fTtmdW5jdGlvbiBpKHQpe3ZhciBlPXIodCxcInBob3RvXCIpO3JldHVybntzZWFyY2g6ZnVuY3Rpb24odCl7cmV0dXJuIGUoXCIvc2VhcmNoXCIsdCl9LGN1cmF0ZWQ6ZnVuY3Rpb24odCl7cmV0dXJuIHZvaWQgMD09PXQmJih0PXt9KSxlKFwiL2N1cmF0ZWRcIix0KX0sc2hvdzpmdW5jdGlvbih0KXtyZXR1cm4gZShcIi9waG90b3MvXCIrdC5pZCl9LHJhbmRvbTpmdW5jdGlvbigpe3RyeXt2YXIgdD1NYXRoLmZsb29yKDFlMypNYXRoLnJhbmRvbSgpKTtyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuY3VyYXRlZCh7cGFnZTp0LHBlcl9wYWdlOjF9KSkudGhlbihmdW5jdGlvbih0KXtyZXR1cm4gbih0KT90LnBob3Rvc1swXTp0fSl9Y2F0Y2godCl7cmV0dXJuIFByb21pc2UucmVqZWN0KHQpfX19fWZ1bmN0aW9uIHUodCl7dmFyIGU9cih0LFwidmlkZW9cIik7cmV0dXJue3NlYXJjaDpmdW5jdGlvbih0KXtyZXR1cm4gZShcIi9zZWFyY2hcIix0KX0scG9wdWxhcjpmdW5jdGlvbih0KXtyZXR1cm4gdm9pZCAwPT09dCYmKHQ9e30pLGUoXCIvcG9wdWxhclwiLHQpfSxzaG93OmZ1bmN0aW9uKHQpe3JldHVybiBlKFwiL3ZpZGVvcy9cIit0LmlkKX19fWZ1bmN0aW9uIGModCl7aWYoIXR8fFwic3RyaW5nXCIhPXR5cGVvZiB0KXRocm93IG5ldyBUeXBlRXJyb3IoXCJBbiBBcGlLZXkgbXVzdCBiZSBwcm92aWRlZCB3aGVuIGluaXRpYXRpbmcgdGhlIFBleGVsJ3MgY2xpZW50LlwiKTtyZXR1cm57dHlwZUNoZWNrZXJzOm8scGhvdG9zOmkodCksdmlkZW9zOnUodCksY29sbGVjdGlvbnM6ZSh0KX19cmVxdWlyZShcImlzb21vcnBoaWMtZmV0Y2hcIik7ZXhwb3J0e2MgYXMgY3JlYXRlQ2xpZW50fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1haW4ubW9kdWxlLmpzLm1hcFxuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsInZhciBnbG9iYWwgPVxuICAodHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbFRoaXMpIHx8XG4gICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZikgfHxcbiAgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnICYmIGdsb2JhbClcblxudmFyIHN1cHBvcnQgPSB7XG4gIHNlYXJjaFBhcmFtczogJ1VSTFNlYXJjaFBhcmFtcycgaW4gZ2xvYmFsLFxuICBpdGVyYWJsZTogJ1N5bWJvbCcgaW4gZ2xvYmFsICYmICdpdGVyYXRvcicgaW4gU3ltYm9sLFxuICBibG9iOlxuICAgICdGaWxlUmVhZGVyJyBpbiBnbG9iYWwgJiZcbiAgICAnQmxvYicgaW4gZ2xvYmFsICYmXG4gICAgKGZ1bmN0aW9uKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3IEJsb2IoKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KSgpLFxuICBmb3JtRGF0YTogJ0Zvcm1EYXRhJyBpbiBnbG9iYWwsXG4gIGFycmF5QnVmZmVyOiAnQXJyYXlCdWZmZXInIGluIGdsb2JhbFxufVxuXG5mdW5jdGlvbiBpc0RhdGFWaWV3KG9iaikge1xuICByZXR1cm4gb2JqICYmIERhdGFWaWV3LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKG9iailcbn1cblxuaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIpIHtcbiAgdmFyIHZpZXdDbGFzc2VzID0gW1xuICAgICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICAnW29iamVjdCBVaW50MzJBcnJheV0nLFxuICAgICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nXG4gIF1cblxuICB2YXIgaXNBcnJheUJ1ZmZlclZpZXcgPVxuICAgIEFycmF5QnVmZmVyLmlzVmlldyB8fFxuICAgIGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB2aWV3Q2xhc3Nlcy5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSA+IC0xXG4gICAgfVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVOYW1lKG5hbWUpIHtcbiAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgIG5hbWUgPSBTdHJpbmcobmFtZSlcbiAgfVxuICBpZiAoL1teYS16MC05XFwtIyQlJicqKy5eX2B8fiFdL2kudGVzdChuYW1lKSB8fCBuYW1lID09PSAnJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lOiBcIicgKyBuYW1lICsgJ1wiJylcbiAgfVxuICByZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpXG4gIH1cbiAgcmV0dXJuIHZhbHVlXG59XG5cbi8vIEJ1aWxkIGEgZGVzdHJ1Y3RpdmUgaXRlcmF0b3IgZm9yIHRoZSB2YWx1ZSBsaXN0XG5mdW5jdGlvbiBpdGVyYXRvckZvcihpdGVtcykge1xuICB2YXIgaXRlcmF0b3IgPSB7XG4gICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdmFsdWUgPSBpdGVtcy5zaGlmdCgpXG4gICAgICByZXR1cm4ge2RvbmU6IHZhbHVlID09PSB1bmRlZmluZWQsIHZhbHVlOiB2YWx1ZX1cbiAgICB9XG4gIH1cblxuICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgIGl0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvclxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpdGVyYXRvclxufVxuXG5leHBvcnQgZnVuY3Rpb24gSGVhZGVycyhoZWFkZXJzKSB7XG4gIHRoaXMubWFwID0ge31cblxuICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKVxuICAgIH0sIHRoaXMpXG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShoZWFkZXJzKSkge1xuICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgIHRoaXMuYXBwZW5kKGhlYWRlclswXSwgaGVhZGVyWzFdKVxuICAgIH0sIHRoaXMpXG4gIH0gZWxzZSBpZiAoaGVhZGVycykge1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGhlYWRlcnMpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgdGhpcy5hcHBlbmQobmFtZSwgaGVhZGVyc1tuYW1lXSlcbiAgICB9LCB0aGlzKVxuICB9XG59XG5cbkhlYWRlcnMucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpXG4gIHZhbHVlID0gbm9ybWFsaXplVmFsdWUodmFsdWUpXG4gIHZhciBvbGRWYWx1ZSA9IHRoaXMubWFwW25hbWVdXG4gIHRoaXMubWFwW25hbWVdID0gb2xkVmFsdWUgPyBvbGRWYWx1ZSArICcsICcgKyB2YWx1ZSA6IHZhbHVlXG59XG5cbkhlYWRlcnMucHJvdG90eXBlWydkZWxldGUnXSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgZGVsZXRlIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldXG59XG5cbkhlYWRlcnMucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgcmV0dXJuIHRoaXMuaGFzKG5hbWUpID8gdGhpcy5tYXBbbmFtZV0gOiBudWxsXG59XG5cbkhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgcmV0dXJuIHRoaXMubWFwLmhhc093blByb3BlcnR5KG5vcm1hbGl6ZU5hbWUobmFtZSkpXG59XG5cbkhlYWRlcnMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldID0gbm9ybWFsaXplVmFsdWUodmFsdWUpXG59XG5cbkhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICBmb3IgKHZhciBuYW1lIGluIHRoaXMubWFwKSB7XG4gICAgaWYgKHRoaXMubWFwLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXMubWFwW25hbWVdLCBuYW1lLCB0aGlzKVxuICAgIH1cbiAgfVxufVxuXG5IZWFkZXJzLnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBpdGVtcyA9IFtdXG4gIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgIGl0ZW1zLnB1c2gobmFtZSlcbiAgfSlcbiAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxufVxuXG5IZWFkZXJzLnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGl0ZW1zID0gW11cbiAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgaXRlbXMucHVzaCh2YWx1ZSlcbiAgfSlcbiAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxufVxuXG5IZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBpdGVtcyA9IFtdXG4gIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgIGl0ZW1zLnB1c2goW25hbWUsIHZhbHVlXSlcbiAgfSlcbiAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxufVxuXG5pZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICBIZWFkZXJzLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gSGVhZGVycy5wcm90b3R5cGUuZW50cmllc1xufVxuXG5mdW5jdGlvbiBjb25zdW1lZChib2R5KSB7XG4gIGlmIChib2R5LmJvZHlVc2VkKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICB9XG4gIGJvZHkuYm9keVVzZWQgPSB0cnVlXG59XG5cbmZ1bmN0aW9uIGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJlc29sdmUocmVhZGVyLnJlc3VsdClcbiAgICB9XG4gICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJlamVjdChyZWFkZXIuZXJyb3IpXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiByZWFkQmxvYkFzQXJyYXlCdWZmZXIoYmxvYikge1xuICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICB2YXIgcHJvbWlzZSA9IGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpXG4gIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxuICByZXR1cm4gcHJvbWlzZVxufVxuXG5mdW5jdGlvbiByZWFkQmxvYkFzVGV4dChibG9iKSB7XG4gIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgcmVhZGVyLnJlYWRBc1RleHQoYmxvYilcbiAgcmV0dXJuIHByb21pc2Vcbn1cblxuZnVuY3Rpb24gcmVhZEFycmF5QnVmZmVyQXNUZXh0KGJ1Zikge1xuICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1ZilcbiAgdmFyIGNoYXJzID0gbmV3IEFycmF5KHZpZXcubGVuZ3RoKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdmlldy5sZW5ndGg7IGkrKykge1xuICAgIGNoYXJzW2ldID0gU3RyaW5nLmZyb21DaGFyQ29kZSh2aWV3W2ldKVxuICB9XG4gIHJldHVybiBjaGFycy5qb2luKCcnKVxufVxuXG5mdW5jdGlvbiBidWZmZXJDbG9uZShidWYpIHtcbiAgaWYgKGJ1Zi5zbGljZSkge1xuICAgIHJldHVybiBidWYuc2xpY2UoMClcbiAgfSBlbHNlIHtcbiAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zi5ieXRlTGVuZ3RoKVxuICAgIHZpZXcuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZikpXG4gICAgcmV0dXJuIHZpZXcuYnVmZmVyXG4gIH1cbn1cblxuZnVuY3Rpb24gQm9keSgpIHtcbiAgdGhpcy5ib2R5VXNlZCA9IGZhbHNlXG5cbiAgdGhpcy5faW5pdEJvZHkgPSBmdW5jdGlvbihib2R5KSB7XG4gICAgLypcbiAgICAgIGZldGNoLW1vY2sgd3JhcHMgdGhlIFJlc3BvbnNlIG9iamVjdCBpbiBhbiBFUzYgUHJveHkgdG9cbiAgICAgIHByb3ZpZGUgdXNlZnVsIHRlc3QgaGFybmVzcyBmZWF0dXJlcyBzdWNoIGFzIGZsdXNoLiBIb3dldmVyLCBvblxuICAgICAgRVM1IGJyb3dzZXJzIHdpdGhvdXQgZmV0Y2ggb3IgUHJveHkgc3VwcG9ydCBwb2xseWZpbGxzIG11c3QgYmUgdXNlZDtcbiAgICAgIHRoZSBwcm94eS1wb2xseWZpbGwgaXMgdW5hYmxlIHRvIHByb3h5IGFuIGF0dHJpYnV0ZSB1bmxlc3MgaXQgZXhpc3RzXG4gICAgICBvbiB0aGUgb2JqZWN0IGJlZm9yZSB0aGUgUHJveHkgaXMgY3JlYXRlZC4gVGhpcyBjaGFuZ2UgZW5zdXJlc1xuICAgICAgUmVzcG9uc2UuYm9keVVzZWQgZXhpc3RzIG9uIHRoZSBpbnN0YW5jZSwgd2hpbGUgbWFpbnRhaW5pbmcgdGhlXG4gICAgICBzZW1hbnRpYyBvZiBzZXR0aW5nIFJlcXVlc3QuYm9keVVzZWQgaW4gdGhlIGNvbnN0cnVjdG9yIGJlZm9yZVxuICAgICAgX2luaXRCb2R5IGlzIGNhbGxlZC5cbiAgICAqL1xuICAgIHRoaXMuYm9keVVzZWQgPSB0aGlzLmJvZHlVc2VkXG4gICAgdGhpcy5fYm9keUluaXQgPSBib2R5XG4gICAgaWYgKCFib2R5KSB7XG4gICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keVxuICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgIHRoaXMuX2JvZHlCbG9iID0gYm9keVxuICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5mb3JtRGF0YSAmJiBGb3JtRGF0YS5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keVxuICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHkudG9TdHJpbmcoKVxuICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiBzdXBwb3J0LmJsb2IgJiYgaXNEYXRhVmlldyhib2R5KSkge1xuICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyID0gYnVmZmVyQ2xvbmUoYm9keS5idWZmZXIpXG4gICAgICAvLyBJRSAxMC0xMSBjYW4ndCBoYW5kbGUgYSBEYXRhVmlldyBib2R5LlxuICAgICAgdGhpcy5fYm9keUluaXQgPSBuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSlcbiAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgKEFycmF5QnVmZmVyLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpIHx8IGlzQXJyYXlCdWZmZXJWaWV3KGJvZHkpKSkge1xuICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyID0gYnVmZmVyQ2xvbmUoYm9keSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5ID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGJvZHkpXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkge1xuICAgICAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JylcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUJsb2IgJiYgdGhpcy5fYm9keUJsb2IudHlwZSkge1xuICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCB0aGlzLl9ib2R5QmxvYi50eXBlKVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04JylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoc3VwcG9ydC5ibG9iKSB7XG4gICAgdGhpcy5ibG9iID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlBcnJheUJ1ZmZlcl0pKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIGJsb2InKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmFycmF5QnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgIHZhciBpc0NvbnN1bWVkID0gY29uc3VtZWQodGhpcylcbiAgICAgICAgaWYgKGlzQ29uc3VtZWQpIHtcbiAgICAgICAgICByZXR1cm4gaXNDb25zdW1lZFxuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcodGhpcy5fYm9keUFycmF5QnVmZmVyKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoXG4gICAgICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIuYnVmZmVyLnNsaWNlKFxuICAgICAgICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIuYnl0ZU9mZnNldCxcbiAgICAgICAgICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyLmJ5dGVPZmZzZXQgKyB0aGlzLl9ib2R5QXJyYXlCdWZmZXIuYnl0ZUxlbmd0aFxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcilcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmxvYigpLnRoZW4ocmVhZEJsb2JBc0FycmF5QnVmZmVyKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMudGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgIHJldHVybiByZWFkQmxvYkFzVGV4dCh0aGlzLl9ib2R5QmxvYilcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZWFkQXJyYXlCdWZmZXJBc1RleHQodGhpcy5fYm9keUFycmF5QnVmZmVyKSlcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlGb3JtRGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlUZXh0KVxuICAgIH1cbiAgfVxuXG4gIGlmIChzdXBwb3J0LmZvcm1EYXRhKSB7XG4gICAgdGhpcy5mb3JtRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oZGVjb2RlKVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuanNvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKEpTT04ucGFyc2UpXG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbnZhciBtZXRob2RzID0gWydERUxFVEUnLCAnR0VUJywgJ0hFQUQnLCAnT1BUSU9OUycsICdQT1NUJywgJ1BVVCddXG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZU1ldGhvZChtZXRob2QpIHtcbiAgdmFyIHVwY2FzZWQgPSBtZXRob2QudG9VcHBlckNhc2UoKVxuICByZXR1cm4gbWV0aG9kcy5pbmRleE9mKHVwY2FzZWQpID4gLTEgPyB1cGNhc2VkIDogbWV0aG9kXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZXF1ZXN0KGlucHV0LCBvcHRpb25zKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSZXF1ZXN0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1BsZWFzZSB1c2UgdGhlIFwibmV3XCIgb3BlcmF0b3IsIHRoaXMgRE9NIG9iamVjdCBjb25zdHJ1Y3RvciBjYW5ub3QgYmUgY2FsbGVkIGFzIGEgZnVuY3Rpb24uJylcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5XG5cbiAgaWYgKGlucHV0IGluc3RhbmNlb2YgUmVxdWVzdCkge1xuICAgIGlmIChpbnB1dC5ib2R5VXNlZCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJylcbiAgICB9XG4gICAgdGhpcy51cmwgPSBpbnB1dC51cmxcbiAgICB0aGlzLmNyZWRlbnRpYWxzID0gaW5wdXQuY3JlZGVudGlhbHNcbiAgICBpZiAoIW9wdGlvbnMuaGVhZGVycykge1xuICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMoaW5wdXQuaGVhZGVycylcbiAgICB9XG4gICAgdGhpcy5tZXRob2QgPSBpbnB1dC5tZXRob2RcbiAgICB0aGlzLm1vZGUgPSBpbnB1dC5tb2RlXG4gICAgdGhpcy5zaWduYWwgPSBpbnB1dC5zaWduYWxcbiAgICBpZiAoIWJvZHkgJiYgaW5wdXQuX2JvZHlJbml0ICE9IG51bGwpIHtcbiAgICAgIGJvZHkgPSBpbnB1dC5fYm9keUluaXRcbiAgICAgIGlucHV0LmJvZHlVc2VkID0gdHJ1ZVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLnVybCA9IFN0cmluZyhpbnB1dClcbiAgfVxuXG4gIHRoaXMuY3JlZGVudGlhbHMgPSBvcHRpb25zLmNyZWRlbnRpYWxzIHx8IHRoaXMuY3JlZGVudGlhbHMgfHwgJ3NhbWUtb3JpZ2luJ1xuICBpZiAob3B0aW9ucy5oZWFkZXJzIHx8ICF0aGlzLmhlYWRlcnMpIHtcbiAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gIH1cbiAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2Qob3B0aW9ucy5tZXRob2QgfHwgdGhpcy5tZXRob2QgfHwgJ0dFVCcpXG4gIHRoaXMubW9kZSA9IG9wdGlvbnMubW9kZSB8fCB0aGlzLm1vZGUgfHwgbnVsbFxuICB0aGlzLnNpZ25hbCA9IG9wdGlvbnMuc2lnbmFsIHx8IHRoaXMuc2lnbmFsXG4gIHRoaXMucmVmZXJyZXIgPSBudWxsXG5cbiAgaWYgKCh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgfHwgdGhpcy5tZXRob2QgPT09ICdIRUFEJykgJiYgYm9keSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JvZHkgbm90IGFsbG93ZWQgZm9yIEdFVCBvciBIRUFEIHJlcXVlc3RzJylcbiAgfVxuICB0aGlzLl9pbml0Qm9keShib2R5KVxuXG4gIGlmICh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgfHwgdGhpcy5tZXRob2QgPT09ICdIRUFEJykge1xuICAgIGlmIChvcHRpb25zLmNhY2hlID09PSAnbm8tc3RvcmUnIHx8IG9wdGlvbnMuY2FjaGUgPT09ICduby1jYWNoZScpIHtcbiAgICAgIC8vIFNlYXJjaCBmb3IgYSAnXycgcGFyYW1ldGVyIGluIHRoZSBxdWVyeSBzdHJpbmdcbiAgICAgIHZhciByZVBhcmFtU2VhcmNoID0gLyhbPyZdKV89W14mXSovXG4gICAgICBpZiAocmVQYXJhbVNlYXJjaC50ZXN0KHRoaXMudXJsKSkge1xuICAgICAgICAvLyBJZiBpdCBhbHJlYWR5IGV4aXN0cyB0aGVuIHNldCB0aGUgdmFsdWUgd2l0aCB0aGUgY3VycmVudCB0aW1lXG4gICAgICAgIHRoaXMudXJsID0gdGhpcy51cmwucmVwbGFjZShyZVBhcmFtU2VhcmNoLCAnJDFfPScgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE90aGVyd2lzZSBhZGQgYSBuZXcgJ18nIHBhcmFtZXRlciB0byB0aGUgZW5kIHdpdGggdGhlIGN1cnJlbnQgdGltZVxuICAgICAgICB2YXIgcmVRdWVyeVN0cmluZyA9IC9cXD8vXG4gICAgICAgIHRoaXMudXJsICs9IChyZVF1ZXJ5U3RyaW5nLnRlc3QodGhpcy51cmwpID8gJyYnIDogJz8nKSArICdfPScgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5SZXF1ZXN0LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFJlcXVlc3QodGhpcywge2JvZHk6IHRoaXMuX2JvZHlJbml0fSlcbn1cblxuZnVuY3Rpb24gZGVjb2RlKGJvZHkpIHtcbiAgdmFyIGZvcm0gPSBuZXcgRm9ybURhdGEoKVxuICBib2R5XG4gICAgLnRyaW0oKVxuICAgIC5zcGxpdCgnJicpXG4gICAgLmZvckVhY2goZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGlmIChieXRlcykge1xuICAgICAgICB2YXIgc3BsaXQgPSBieXRlcy5zcGxpdCgnPScpXG4gICAgICAgIHZhciBuYW1lID0gc3BsaXQuc2hpZnQoKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICB2YXIgdmFsdWUgPSBzcGxpdC5qb2luKCc9JykucmVwbGFjZSgvXFwrL2csICcgJylcbiAgICAgICAgZm9ybS5hcHBlbmQoZGVjb2RlVVJJQ29tcG9uZW50KG5hbWUpLCBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpKVxuICAgICAgfVxuICAgIH0pXG4gIHJldHVybiBmb3JtXG59XG5cbmZ1bmN0aW9uIHBhcnNlSGVhZGVycyhyYXdIZWFkZXJzKSB7XG4gIHZhciBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKVxuICAvLyBSZXBsYWNlIGluc3RhbmNlcyBvZiBcXHJcXG4gYW5kIFxcbiBmb2xsb3dlZCBieSBhdCBsZWFzdCBvbmUgc3BhY2Ugb3IgaG9yaXpvbnRhbCB0YWIgd2l0aCBhIHNwYWNlXG4gIC8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM3MjMwI3NlY3Rpb24tMy4yXG4gIHZhciBwcmVQcm9jZXNzZWRIZWFkZXJzID0gcmF3SGVhZGVycy5yZXBsYWNlKC9cXHI/XFxuW1xcdCBdKy9nLCAnICcpXG4gIC8vIEF2b2lkaW5nIHNwbGl0IHZpYSByZWdleCB0byB3b3JrIGFyb3VuZCBhIGNvbW1vbiBJRTExIGJ1ZyB3aXRoIHRoZSBjb3JlLWpzIDMuNi4wIHJlZ2V4IHBvbHlmaWxsXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9naXRodWIvZmV0Y2gvaXNzdWVzLzc0OFxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNzUxXG4gIHByZVByb2Nlc3NlZEhlYWRlcnNcbiAgICAuc3BsaXQoJ1xccicpXG4gICAgLm1hcChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgIHJldHVybiBoZWFkZXIuaW5kZXhPZignXFxuJykgPT09IDAgPyBoZWFkZXIuc3Vic3RyKDEsIGhlYWRlci5sZW5ndGgpIDogaGVhZGVyXG4gICAgfSlcbiAgICAuZm9yRWFjaChmdW5jdGlvbihsaW5lKSB7XG4gICAgICB2YXIgcGFydHMgPSBsaW5lLnNwbGl0KCc6JylcbiAgICAgIHZhciBrZXkgPSBwYXJ0cy5zaGlmdCgpLnRyaW0oKVxuICAgICAgaWYgKGtleSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBwYXJ0cy5qb2luKCc6JykudHJpbSgpXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKGtleSwgdmFsdWUpXG4gICAgICB9XG4gICAgfSlcbiAgcmV0dXJuIGhlYWRlcnNcbn1cblxuQm9keS5jYWxsKFJlcXVlc3QucHJvdG90eXBlKVxuXG5leHBvcnQgZnVuY3Rpb24gUmVzcG9uc2UoYm9keUluaXQsIG9wdGlvbnMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJlc3BvbnNlKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1BsZWFzZSB1c2UgdGhlIFwibmV3XCIgb3BlcmF0b3IsIHRoaXMgRE9NIG9iamVjdCBjb25zdHJ1Y3RvciBjYW5ub3QgYmUgY2FsbGVkIGFzIGEgZnVuY3Rpb24uJylcbiAgfVxuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge31cbiAgfVxuXG4gIHRoaXMudHlwZSA9ICdkZWZhdWx0J1xuICB0aGlzLnN0YXR1cyA9IG9wdGlvbnMuc3RhdHVzID09PSB1bmRlZmluZWQgPyAyMDAgOiBvcHRpb25zLnN0YXR1c1xuICB0aGlzLm9rID0gdGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwXG4gIHRoaXMuc3RhdHVzVGV4dCA9IG9wdGlvbnMuc3RhdHVzVGV4dCA9PT0gdW5kZWZpbmVkID8gJycgOiAnJyArIG9wdGlvbnMuc3RhdHVzVGV4dFxuICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJydcbiAgdGhpcy5faW5pdEJvZHkoYm9keUluaXQpXG59XG5cbkJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpXG5cblJlc3BvbnNlLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFJlc3BvbnNlKHRoaXMuX2JvZHlJbml0LCB7XG4gICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICBzdGF0dXNUZXh0OiB0aGlzLnN0YXR1c1RleHQsXG4gICAgaGVhZGVyczogbmV3IEhlYWRlcnModGhpcy5oZWFkZXJzKSxcbiAgICB1cmw6IHRoaXMudXJsXG4gIH0pXG59XG5cblJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXNwb25zZSA9IG5ldyBSZXNwb25zZShudWxsLCB7c3RhdHVzOiAwLCBzdGF0dXNUZXh0OiAnJ30pXG4gIHJlc3BvbnNlLnR5cGUgPSAnZXJyb3InXG4gIHJldHVybiByZXNwb25zZVxufVxuXG52YXIgcmVkaXJlY3RTdGF0dXNlcyA9IFszMDEsIDMwMiwgMzAzLCAzMDcsIDMwOF1cblxuUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICBpZiAocmVkaXJlY3RTdGF0dXNlcy5pbmRleE9mKHN0YXR1cykgPT09IC0xKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgc3RhdHVzIGNvZGUnKVxuICB9XG5cbiAgcmV0dXJuIG5ldyBSZXNwb25zZShudWxsLCB7c3RhdHVzOiBzdGF0dXMsIGhlYWRlcnM6IHtsb2NhdGlvbjogdXJsfX0pXG59XG5cbmV4cG9ydCB2YXIgRE9NRXhjZXB0aW9uID0gZ2xvYmFsLkRPTUV4Y2VwdGlvblxudHJ5IHtcbiAgbmV3IERPTUV4Y2VwdGlvbigpXG59IGNhdGNoIChlcnIpIHtcbiAgRE9NRXhjZXB0aW9uID0gZnVuY3Rpb24obWVzc2FnZSwgbmFtZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2VcbiAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgdmFyIGVycm9yID0gRXJyb3IobWVzc2FnZSlcbiAgICB0aGlzLnN0YWNrID0gZXJyb3Iuc3RhY2tcbiAgfVxuICBET01FeGNlcHRpb24ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpXG4gIERPTUV4Y2VwdGlvbi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBET01FeGNlcHRpb25cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZldGNoKGlucHV0LCBpbml0KSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KVxuXG4gICAgaWYgKHJlcXVlc3Quc2lnbmFsICYmIHJlcXVlc3Quc2lnbmFsLmFib3J0ZWQpIHtcbiAgICAgIHJldHVybiByZWplY3QobmV3IERPTUV4Y2VwdGlvbignQWJvcnRlZCcsICdBYm9ydEVycm9yJykpXG4gICAgfVxuXG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICBmdW5jdGlvbiBhYm9ydFhocigpIHtcbiAgICAgIHhoci5hYm9ydCgpXG4gICAgfVxuXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIHN0YXR1czogeGhyLnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgfHwgJycpXG4gICAgICB9XG4gICAgICBvcHRpb25zLnVybCA9ICdyZXNwb25zZVVSTCcgaW4geGhyID8geGhyLnJlc3BvbnNlVVJMIDogb3B0aW9ucy5oZWFkZXJzLmdldCgnWC1SZXF1ZXN0LVVSTCcpXG4gICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShuZXcgUmVzcG9uc2UoYm9keSwgb3B0aW9ucykpXG4gICAgICB9LCAwKVxuICAgIH1cblxuICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfSwgMClcbiAgICB9XG5cbiAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfSwgMClcbiAgICB9XG5cbiAgICB4aHIub25hYm9ydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBET01FeGNlcHRpb24oJ0Fib3J0ZWQnLCAnQWJvcnRFcnJvcicpKVxuICAgICAgfSwgMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaXhVcmwodXJsKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gdXJsID09PSAnJyAmJiBnbG9iYWwubG9jYXRpb24uaHJlZiA/IGdsb2JhbC5sb2NhdGlvbi5ocmVmIDogdXJsXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiB1cmxcbiAgICAgIH1cbiAgICB9XG5cbiAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgZml4VXJsKHJlcXVlc3QudXJsKSwgdHJ1ZSlcblxuICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlXG4gICAgfSBlbHNlIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnb21pdCcpIHtcbiAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSBmYWxzZVxuICAgIH1cblxuICAgIGlmICgncmVzcG9uc2VUeXBlJyBpbiB4aHIpIHtcbiAgICAgIGlmIChzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgc3VwcG9ydC5hcnJheUJ1ZmZlciAmJlxuICAgICAgICByZXF1ZXN0LmhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKSAmJlxuICAgICAgICByZXF1ZXN0LmhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKS5pbmRleE9mKCdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nKSAhPT0gLTFcbiAgICAgICkge1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJ1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpbml0ICYmIHR5cGVvZiBpbml0LmhlYWRlcnMgPT09ICdvYmplY3QnICYmICEoaW5pdC5oZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykpIHtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGluaXQuaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIG5vcm1hbGl6ZVZhbHVlKGluaXQuaGVhZGVyc1tuYW1lXSkpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3Quc2lnbmFsKSB7XG4gICAgICByZXF1ZXN0LnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0WGhyKVxuXG4gICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIERPTkUgKHN1Y2Nlc3Mgb3IgZmFpbHVyZSlcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgcmVxdWVzdC5zaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydFhocilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHhoci5zZW5kKHR5cGVvZiByZXF1ZXN0Ll9ib2R5SW5pdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogcmVxdWVzdC5fYm9keUluaXQpXG4gIH0pXG59XG5cbmZldGNoLnBvbHlmaWxsID0gdHJ1ZVxuXG5pZiAoIWdsb2JhbC5mZXRjaCkge1xuICBnbG9iYWwuZmV0Y2ggPSBmZXRjaFxuICBnbG9iYWwuSGVhZGVycyA9IEhlYWRlcnNcbiAgZ2xvYmFsLlJlcXVlc3QgPSBSZXF1ZXN0XG4gIGdsb2JhbC5SZXNwb25zZSA9IFJlc3BvbnNlXG59XG4iXSwibmFtZXMiOlsic2VjcmV0cyIsImNyZWF0ZUNsaWVudCIsIk9XX0FQSV9LRVkiLCJjcmVhdGVMYXlvdXQiLCJoZWFkZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzZWN0aW9uIiwiZm9vdGVyIiwidGl0bGUiLCJpbm5lclRleHQiLCJpZCIsInNlYXJjaENvbnRhaW5lciIsInNlYXJjaCIsInBsYWNlaG9sZGVyIiwic2VhcmNoQnV0dG9uIiwid2VhdGhlckNhcmQiLCJmb3JlY2FzdENhcmQiLCJhcHBlbmRDaGlsZCIsImljb25Db250YWluZXIiLCJpY29uIiwiZmVlbHNMaWtlIiwibWluVGVtcCIsIm1heFRlbXAiLCJwcmVzc3VyZSIsIndlYXRoZXJJbmZvIiwid2VhdGhlckxvY2F0aW9uIiwid2VhdGhlclRlbXAiLCJ3ZWF0aGVyRGVzY3JpcHRpb24iLCJmYWN0c0NvbnRhaW5lciIsInN1bnJpc2UiLCJzdW5zZXQiLCJ2aXNpYmlsaXR5Iiwid2luZHNwZWVkIiwiaHVtaWRpdHlBbmRQcmVzc3VyZSIsImJvZHkiLCJhZGRMaXN0ZW5lcnMiLCJnZXRFbGVtZW50QnlJZCIsImRpc2FibGVkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInZhbHVlIiwibGVuZ3RoIiwiZXZlbnQiLCJrZXkiLCJwcmV2ZW50RGVmYXVsdCIsImNsaWNrIiwic2V0TG9jYXRpb24iLCJwbGFjZSIsImZldGNoV2VhdGhlciIsInRoZW4iLCJkYXRhIiwiY29uc29sZSIsImxvZyIsImNvZCIsImxpc3QiLCJ3ZWF0aGVyIiwibWFpbiIsImZlZWxzX2xpa2UiLCJtaW4iLCJ0ZW1wX21pbiIsIm1heCIsInRlbXBfbWF4IiwibWlubWF4IiwibG9jYXRpb24iLCJjaXR5IiwibmFtZSIsImNvdW50cnkiLCJ0ZW1wZXJhdHVyZSIsInRlbXAiLCJkZXNjcmlwdGlvbiIsIndpbmQiLCJzcGVlZCIsImh1bWlkaXR5Iiwic3VuIiwidXBkYXRlV2VhdGhlciIsImFsZXJ0IiwiY2F0Y2giLCJlcnJvciIsImZldGNoIiwianNvbiIsImZldGNoV2VhdGhlckljb24iLCJjb2RlIiwiZmVlbHNsaWtlIiwic3JjIiwidG9GaXhlZCIsIk1hdGgiLCJmbG9vciIsInN0eWxlIiwiYmFja2dyb3VuZCIsImNvbG9yIiwiRGF0ZSIsInRvTG9jYWxlVGltZVN0cmluZyIsImRpc3BsYXkiLCJmZXRjaEltYWdlIiwicXVlcnkiLCJpbWFnZXMiLCJjbGllbnQiLCJwaG90b3MiLCJvcmllbnRhdGlvbiIsInNldEltYWdlIiwicmVzcG9uc2UiLCJpbWFnZSIsIm1lZGl1bSIsImJhY2tncm91bmRJbWFnZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlUm9vdCI6IiJ9