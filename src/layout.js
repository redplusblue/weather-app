// Import setlocation function
import "./style.css";
import { setLocation } from "./content.js";
// To make the app responsive
import "./responsive.js";

export function createLayout() {
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
  credits.innerHTML =
    "Weather data provided by <a href='https://openweathermap.org/'>OpenWeatherMap</a><br>" +
    "Fonts & Images provided by <a href='https://adobe.com'>Adobe" +
    " And <a href='https://www.unsplash.com'>Unsplash</a>";
  purple.innerHTML =
    "<div> red + blue = </div><a href='https://www.github.com/redplusblue'><div id='github-image'></div></a>";
  info.innerHTML =
    "<a href='https://github.com/redplusblue/weather-app/tree/main/src'>Source code</a><br>" +
    "<div id='usage'><div id='info-image'></div><div>Usage Info</div></div>";

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
  const currentLocationButton = document.getElementById(
    "current-location-button"
  );
  const darkMode = document.getElementById("dark-mode");
  const darkModeText = document.getElementById("dark-mode-text");
  const title = document.getElementById("title");
  darkMode.addEventListener("click", () => {
    let dark = darkModeText.innerHTML === "Dark Mode" ? true : false;
    let primaryColor = dark
      ? "rgba(255, 255, 255, 0.85)"
      : "rgba(0, 0, 0, 0.85)";
    let fontColor = dark ? "rgba(0, 0, 0, 0.85)" : "rgba(255, 255, 255, 0.85)";
    let titleColor = dark ? "white" : "black";
    // Dark mode button
    darkModeText.innerHTML =
      darkModeText.innerHTML === "Dark Mode" ? "Light Mode" : "Dark Mode";
    // Change value of css variables related to font and bg
    document
      .querySelector(":root")
      .style.setProperty("--font-color", fontColor);
    document
      .querySelector(":root")
      .style.setProperty("--light-black", primaryColor);
    // Body background color
    document.body.style.backgroundColor =
      document.body.style.backgroundColor === "rgba(0, 0, 0, 0.9)"
        ? "white"
        : "rgba(0, 0, 0, 0.9)";
    title.style.color = titleColor;
  });

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
    setLocation("search");
    // To prevent multiple api calls
    searchButton.disabled = true;
    currentLocationButton.disabled = false;
    section.style.display = "flex";
    footer.style.display = "grid";
  });

  currentLocationButton.addEventListener("click", () => {
    setLocation("current");
    // If no location access
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
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
