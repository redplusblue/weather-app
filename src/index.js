import "./style.css";
import secrets from "./secrets";
import Icon from "./img/search.svg"
import { createClient } from "pexels";

const OW_API_KEY = secrets["OPENWEATHER"];
const P_API_KEY = secrets["PEXELS"];
const client = createClient(P_API_KEY);

function createLayout() {
  const header = document.createElement("header");
  const section = document.createElement("section");
  const footer = document.createElement("footer");
  // Header
  const search = document.createElement("input");
  search.id = "search";
  search.placeholder = "🔎 Search...";
  const searchButton = document.createElement("button");
  searchButton.id = "search-button";
  const searchForm = document.createElement("form");
  const searchContainer = document.createElement("div");
  searchContainer.id = "search-container";
  // Section
  const weatherCard = document.createElement("div");
  weatherCard.id = "weather-card";
  const forecastCard = document.createElement("div");
  
  // Header: Search Bar
  searchButton.innerText = "Search";
  searchContainer.appendChild(search);
  searchContainer.appendChild(searchButton);
  header.appendChild(searchContainer);

  // Weather Card: Name of place, Icon, Temperature, Description
  const weatherCardName = document.createElement("h1");
  const weatherCardIcon = document.createElement("img");
  const weatherCardTemp = document.createElement("h2");
  const weatherCardDesc = document.createElement("h3");
  weatherCard.appendChild(weatherCardName);
  weatherCard.appendChild(weatherCardIcon);
  weatherCard.appendChild(weatherCardTemp);
  section.appendChild(weatherCard);

  // Forecast Card: TBD

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
    } else {
      searchButton.disabled = true;
    }
  });
  
  searchButton.addEventListener("click", setLocation);
}

function setLocation() {
  const search = document.getElementById("search");
  let place = search.value;
  fetchWeather(place)
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    }
);
}

async function fetchWeather(place){
    try{
        let weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${OW_API_KEY}&units=metric`);
        let data = await weather.json();
        return data;
    } catch(error){
        console.log("Error in fetching weather" + error);
    }
}

async function fetchWeatherIcon(code) {
  try {
    let icon = await fetch(
      `http://openweathermap.org/img/w/${code}.png`
    );
    return icon;
  }
  catch (error) {
    console.log("Error in fetching icon" + error);
  }
}

async function fetchImage(query) {
  try {
    let images = await client.photos.search({ query, orientation: "landscape" });
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


// fetchWeather("Canada").then((data) => {
//   console.log(data);
//   //let weather = data.list[0].weather[0].description;
//   let weather = data.weather[0].description;
//   let icon = data.weather[0].icon;
//   fetchWeatherIcon(icon).then((response) => {
//     let icon = response.url;
//     document.body.innerHTML += `<img src=${icon} />`;
//   });
//   document.body.innerText += weather;
//   // Use city name instead
//   // fetchImage("weather with " + weather)
//   //   .then((response) => {
//   //     setImage(response);
//   //   })
//   //   .catch((error) => {
//   //     console.log(error);
//   //   });
// });