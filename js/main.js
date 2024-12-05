const cityInput = document.getElementById("city-input");
const weatherCards = document.getElementById("weather-cards");


async function getWeather(city) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1eb3a747af1d42d6b10140944240512&q=${city}&days=3`);
    const data = await response.json();
    if (data.error) {
      console.log(data.error.message);
      return;
    }
    displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}


function displayWeather(data) {
  weatherCards.innerHTML = ""; 
  const forecast = data.forecast.forecastday;

  forecast.forEach(day => {
    const date = new Date(day.date);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const formattedDate = `${date.getDate()}${date.toLocaleDateString("en-US", { month: "long" })}`;


    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
     <div class="card-head d-flex justify-content-between">
         <h2>${dayName}</h2>
         <h2 class="date">${formattedDate}</h2>
     </div>
      <p class="mt-4 fs-4">${data.location.name}</p>
      <div class="icon"><img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}"/></div>
      <p class="maxtemp">${day.day.maxtemp_c}°C</p>
      <p class="mintemp">${day.day.mintemp_c}°C</p>
      <p>${day.day.condition.text}</p>
     
    `;

    weatherCards.appendChild(card);
  
  });
}


// function getLocationWeather() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           getWeather(`${latitude},${longitude}`);
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           switch (error.code) {
//             case error.PERMISSION_DENIED:
//               alert("Location access denied by user. Please enter a city manually.");
//               break;
//             case error.POSITION_UNAVAILABLE:
//               alert("Location information is unavailable. Please try again later.");
//               break;
//             case error.TIMEOUT:
//               alert("Location request timed out. Please try again.");
//               break;
//             default:
//               alert("An unknown error occurred while fetching your location.");
//           }
//         }
//       );
//     } else {
     
//       alert("Geolocation is not supported by your browser. Please enter a city manually.");
//     }
//   }
  

cityInput.addEventListener("keyup", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } 
});

// window.addEventListener("load", getLocationWeather);

getWeather("cairo")


