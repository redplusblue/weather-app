import { secrets, decrypt } from "./secrets.js";

const OW_API_KEY = decrypt(secrets.OPENWEATHER);

export async function fetchWeather(place) {
  // If number of params is 2, then it is lat and lon
  if (arguments.length === 2) {
    try {
      let weather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${arguments[0]}&lon=${arguments[1]}&appid=${OW_API_KEY}&units=metric`, 
        { mode: 'cors'}
      );
      let data = await weather.json();
      return data;
    } catch (error) {
      console.log("Error in fetching weather " + error);
    }
  } else if (arguments.length === 1) {
    try {
      let weather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${OW_API_KEY}&units=metric`, 
        { mode: 'cors'}
      );
      let data = await weather.json();
      return data;
    } catch (error) {
      console.log("Error in fetching weather " + error);
    }
  }
}

export async function fetchForecast(place) {
  if (arguments.length === 2) {
    try {
      let forecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${arguments[0]}&lon=${arguments[1]}&appid=${OW_API_KEY}&units=metric`,
        { mode: 'cors'}
      );
      let data = await forecast.json();
      return data;
    } catch (error) {
      console.log("Error in fetching forecast " + error);
    }
  } else if (arguments.length === 1) {
    try {
      let forecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${OW_API_KEY}&units=metric`, 
        { mode: 'cors'}
      );
      let data = await forecast.json();
      return data;
    } catch (error) {
      console.log("Error in fetching forecast " + error);
    }
  }
}

export async function fetchWeatherIcon(code) {
  try {
    let icon = await fetch(`https://openweathermap.org/img/w/${code}.png`, 
      { mode: 'cors'});
    return icon;
  } catch (error) {
    console.log("Error in fetching icon " + error);
  }
}

export async function fetchCountryName(code) {
  try {
    let country = await fetch(
      `https://api.worldbank.org/v2/country/${code}?format=json`,
      { mode: 'cors'}
    );
    let data = await country.json();
    return data[1][0].name;
  } catch (error) {
    console.log("Error in fetching country name " + error);
  }
}

export async function fetchWeatherBackground(place) {
  try {
    let background = await fetch(
      `https://source.unsplash.com/1600x450/?Monuments,Tourism,Places,${place}`
    );
    return background;
  } catch (error) {
    console.log("Error in fetching background " + error);
  }
}
