import {
  fetchWeather,
  fetchWeatherIcon,
  fetchWeatherBackground,
  fetchCountryName,
  fetchForecast,
} from "./async.js";

// Loading bar
const topbar = require("topbar");
topbar.config({
  autoRun: false,
  barThickness: 3,
  barColors: {
    0: "rgba(26,  188, 156, .9)",
    ".25": "rgba(52,  152, 219, .9)",
    ".50": "rgba(241, 196, 15,  .9)",
    ".75": "rgba(230, 126, 34,  .9)",
    "1.0": "rgba(211, 84,  0,   .9)",
  },
  shadowBlur: 10,
  shadowColor: "rgba(0,   0,   0,   .6)",
});

export function setLocation(type) {
  const search = document.getElementById("search");
  let place = search.value;
  if (type === "search") {
    topbar.show();
    fetchWeather(place)
      .then((data) => {
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
          let description =
            data.weather[0].main +
            ": " +
            data.weather[0].description.charAt(0).toUpperCase() +
            data.weather[0].description.slice(1);
          // Right card
          let sunrise = data.sys.sunrise;
          let sunset = data.sys.sunset;
          let visibility = data.visibility;
          let windspeed = data.wind.speed;
          let humidity = data.main.humidity;
          let pressure = data.main.pressure;
          let sun = [sunrise, sunset];
          let humidityAndPressure = [humidity, pressure];
          updateWeather(
            icon,
            feelsLike,
            minmax,
            location,
            temperature,
            description,
            sun,
            visibility,
            windspeed,
            humidityAndPressure
          );
          // Fetch forecast
          fetchForecast(place)
            .then((data) => {
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
            })
            .catch((error) => {
              console.log("Error in setting location for forecast: " + error);
            });
        } else if (data.cod === "404") {
          topbar.hide();
          document.getElementById("section").style.display = "none";
          document.getElementById("footer").style.display = "none";
          alert("Place not found. Please try again.");
        }
      })
      .catch((error) => {
        console.log("Error in setting location for weather: " + error);
      });
  } else if (type === "current") {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        topbar.show();
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude)
          .then((data) => {
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
              let description =
                data.weather[0].main +
                ": " +
                data.weather[0].description.charAt(0).toUpperCase() +
                data.weather[0].description.slice(1);
              // Right card
              let sunrise = data.sys.sunrise;
              let sunset = data.sys.sunset;
              let visibility = data.visibility;
              let windspeed = data.wind.speed;
              let humidity = data.main.humidity;
              let pressure = data.main.pressure;
              let sun = [sunrise, sunset];
              let humidityAndPressure = [humidity, pressure];
              updateWeather(
                icon,
                feelsLike,
                minmax,
                location,
                temperature,
                description,
                sun,
                visibility,
                windspeed,
                humidityAndPressure
              );
              topbar.progress(0.5);
            } else if (data.cod === 404) {
              topbar.hide();
              alert("Place not found. Please try again.");
            } else {
              topbar.hide();
              alert("Something went wrong. Please try again.");
            }
          })
          .catch((error) => {
            console.log("Error in setting location for weather: " + error);
          });
        // Fetch forecast
        fetchForecast(latitude, longitude)
          .then((data) => {
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
          })
          .catch((error) => {
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

function updateWeather(
  icon,
  feelslike,
  minmax,
  location,
  temperature,
  description,
  sun,
  visibility,
  windspeed,
  humidityAndPressure
) {
  // Update ICON
  const iconContainer = document.getElementById("icon-container");
  fetchWeatherIcon(icon).then((data) => {
    document.getElementById("icon").src = data.url;
  });
  document.getElementById(
    "feels-like"
  ).innerText = `Feels like: ${feelslike} °C / ${(
    (feelslike * 9) / 5 +
    32
  ).toFixed(2)} °F`;
  document.getElementById("min-temp").innerText = `Min: ${minmax[0]} °C / ${(
    (minmax[0] * 9) / 5 +
    32
  ).toFixed(2)} °F`;
  document.getElementById("max-temp").innerText = `Max: ${minmax[1]} °C / ${(
    (minmax[1] * 9) / 5 +
    32
  ).toFixed(2)} °F`;

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
    document.getElementById("additional-info").innerText =
      "Optimal temperature!";
  }
  // Update location, temp, description
  fetchCountryName(location[1]).then((name) => {
    document.getElementById(
      "weather-location"
    ).innerText = `${location[0]}, ${name}`;
  });
  document.getElementById("weather-temp").innerText =
    temperature + " °C / " + ((temperature * 9) / 5 + 32).toFixed(2) + " °F";
  document.getElementById("weather-description").innerText = description;
  // Update facts
  const factsContainer = document.getElementById("facts-container");
  document.getElementById("sunrise").innerText = `Sunrise: ${new Date(
    sun[0] * 1000
  ).toLocaleTimeString()} EST`;
  document.getElementById("sunset").innerText = `Sunset: ${new Date(
    sun[1] * 1000
  ).toLocaleTimeString()} EST`;
  document.getElementById(
    "windspeed"
  ).innerText = `Windspeed: ${windspeed} m/s = ${(windspeed / 1.609).toFixed(
    2
  )} mph`;
  document.getElementById(
    "visibility"
  ).innerText = `Visibility: ${visibility} m`;
  document.getElementById(
    "humidity-and-pressure"
  ).innerText = `Humidity: ${humidityAndPressure[0]} %, Pressure: ${humidityAndPressure[1]} hPa`;
  iconContainer.style.display = "flex";
  weatherInfo.style.display = "flex";
  factsContainer.style.display = "flex";
  // While background is fetched, section has a dark background for readability
  document.querySelector("section").style.background = `#b4b4b4`;
  // Add a background image based on location
  fetchWeatherBackground(description).then((response) => {
    if (response === undefined) {
      return;
    }
    // Reset section background
    document.querySelector("section").style.background = `#fff`;
    // Get section element
    document.getElementById(
      "section"
    ).style.backgroundImage = `url(${response.url})`;
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
    fetchWeatherIcon(forecasts[index].weather[0].icon).then((data) => {
      forecast.querySelector(".forecast-icon").src = data.url;
    });
    // Update forecast temperature
    forecast.querySelector(".forecast-temp").innerText = `${
      forecasts[index].main.temp
    } °C / ${((forecasts[index].main.temp * 9) / 5 + 32).toFixed(2)} °F`;
    // Update forecast description
    forecast.querySelector(".forecast-description").innerText =
      forecasts[index].weather[0].description;
    // Update forecast date and time
    forecast.querySelector(".forecast-date").innerText =
      new Date(forecasts[index].dt * 1000).toLocaleDateString() +
      " " +
      new Date(forecasts[index].dt * 1000).toLocaleTimeString();
    forecast.style.display = "flex";
  });
}
