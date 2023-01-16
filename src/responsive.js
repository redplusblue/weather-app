let x = window.matchMedia("(max-width: 1250px)");

export function checkState(x) {
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

// At H = 300 or W = 350 display error message
let y = window.matchMedia("(max-width: 350px) or (max-height: 300px)");

function displayError(y){
    if (y.matches) {
        alert("Sorry, your screen is too small to display this page 🥲");        
    }
}

y.onchange = displayError; // Attach listener function on state changes