import "./style.css";
import secrets from "./secrets";
import { createClient } from "pexels";

const OW_API_KEY = secrets["OPENWEATHER"];
const P_API_KEY = secrets["PEXELS"];
const client = createClient(P_API_KEY);

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

fetchWeather("Canada").then((data) => {
  console.log(data);
  //let weather = data.list[0].weather[0].description;
  let weather = data.weather[0].description;
  let icon = data.weather[0].icon;
  fetchWeatherIcon(icon).then((response) => {
    let icon = response.url;
    document.body.innerHTML += `<img src=${icon} />`;
  });
  document.body.innerText += weather;
  // Use city name instead
  // fetchImage("weather with " + weather)
  //   .then((response) => {
  //     setImage(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
});
