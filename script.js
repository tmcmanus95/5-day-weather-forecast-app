var favIcon = document.querySelector("#favicon");
var citySearch = document.querySelector("#city-search");
var submitButton = document.querySelector("#submit-button");
var resultsContainer = document.querySelector("#results-container");
var pastSearchesList = document.querySelector("#past-searches");
APIKEY = "83f9c9c59334c37ba0de435f5a0fc823";

function updatePastSearches() {
  //Resets search list
  pastSearchesList.textContent = "";

  //Grabs the cities saved in Local Storage under "Past Searches"
  var pastCities = JSON.parse(localStorage.getItem("Past Searches")) || [];

  //Loop to create a list item for each city saved in the "Past Searches" array.
  pastCities.forEach(function (pastCity) {
    var pastSearch = document.createElement("li");
    pastSearch.className = "list-group-item";
    pastSearch.textContent = pastCity;

    //Event listener for each list item that sets the search bar value to that city, and runs the getWeatherData function.
    pastSearch.addEventListener("click", function () {
      citySearch.value = pastCity;
      getWeatherData(pastCity.trim());
    });
    pastSearchesList.appendChild(pastSearch);
  });
}

function saveToLocalStorage(city) {
  //Saves the cities searched into local storage. Allows the posibility for an empty array.
  var pastCities = JSON.parse(localStorage.getItem("Past Searches")) || [];
  //Checks to see if the city is already present into the past cities array.
  if (!pastCities.includes(city)) {
    //If the city is not already present, adds it to the past cities array in local storage.
    pastCities.push(city);
    localStorage.setItem("Past Searches", JSON.stringify(pastCities));
  }
}

function getWeatherData(city) {
  //Reset results
  resultsContainer.textContent = "";
  city = citySearch.value;
  //Get city search, put it into Geolocation API to grab latitude and longitude values for that city.
  latLonRequestURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKEY}`;
  saveToLocalStorage(city);

  fetch(latLonRequestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //Save latitude and longitude values and input them into the OpenWeather API
      lat = data[0].lat;
      lon = data[0].lon;
      weatherRequestURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}`;

      fetch(weatherRequestURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          //Get the id for the icon
          todaysIcon = data.list[0].weather[0].id;

          //Change the icon in the corner to match today's weather icon.
          if (todaysIcon >= 200 && todaysIcon < 300) {
            favIcon.href = "./icons/11d@2x.png";
          } else if (todaysIcon >= 300 && todaysIcon < 500) {
            favIcon.href = "./icons/09d@2x.png";
          } else if (todaysIcon >= 500 && todaysIcon < 505) {
            favIcon.href = "./icons/10d@2x.png";
          } else if (todaysIcon >= 510 && todaysIcon < 532) {
            favIcon.href = "./icons/09d@2x.png";
          } else if (todaysIcon >= 600 && todaysIcon < 700) {
            favIcon.href = "./icons/13d@2x.png";
          } else if (todaysIcon >= 700 && todaysIcon < 782) {
            favIcon.href = "./icons/50d@2x.png";
          } else if (todaysIcon === 800) {
            favIcon.href = "./icons/01d@2x.png";
          } else if (todaysIcon > 800 && todaysIcon < 803) {
            favIcon.href = "./icons/02d@2x.png";
          } else if (todaysIcon > 802 && todaysIcon < 805) {
            favIcon.href = "./icons/04d@2x.png";
          }
          cityValue = data.city.name;

          for (i = 0; i <= 120; i += 8) {
            //Gets date, description, temperature, humidity, and wind speed values from the API
            dateValue = data.list[i].dt;

            iconId = data.list[i].weather[0].id;
            weatherDescription = data.list[i].weather[0].description;
            var temperatureKelvin = data.list[i].main.temp;
            var temperatureFahrenheitValue = (
              ((temperatureKelvin - 273.15) * 9) / 5 +
              32
            ).toFixed(0);
            humidityValue = data.list[i].main.humidity;
            windSpeedValue = data.list[i].wind.speed;

            //Create elements for different data fetched
            var dayDivContainer = document.createElement("div");
            dayDivContainer.className += "col";

            var dayDiv = document.createElement("div");
            dayDiv.className += "card";

            var dayCardbody = document.createElement("div");
            dayCardbody.className += "card-body";

            var cityNameLine = document.createElement("h1");
            var dateLine = document.createElement("h2");
            var weatherDescriptionLine = document.createElement("h2");
            var temperatureLine = document.createElement("h4");
            var humidityLine = document.createElement("h4");
            var windSpeedLine = document.createElement("h4");
            var iconImg = document.createElement("img");

            //add bootsrap classes to those items
            cityNameLine.clasName += "card-title";
            dateLine.className += "card-text";
            weatherDescriptionLine.className += "card-text";
            temperatureLine.className += "card-text";
            humidityLine.className += "card-text";

            //Set the text content for those elements
            cityNameLine.textContent = cityValue;
            dateLine.textContent = dayjs.unix(dateValue).format("MMMM D, YYYY");
            weatherDescriptionLine.textContent = weatherDescription;
            temperatureLine.textContent =
              "Temperature: " + temperatureFahrenheitValue + "°F";
            humidityLine.textContent = "Humidity: " + humidityValue;
            windSpeedLine.textContent = "Wind Speed: " + windSpeedValue;

            //If else statement for icon that accompanies the weather description
            if (iconId >= 200 && iconId < 300) {
              iconImg.src = "./icons/11d@2x.png";
            } else if (iconId >= 300 && iconId < 500) {
              iconImg.src = "./icons/09d@2x.png";
            } else if (iconId >= 500 && iconId < 505) {
              iconImg.src = "./icons/10d@2x.png";
            } else if (iconId >= 510 && iconId < 532) {
              iconImg.src = "./icons/09d@2x.png";
            } else if (iconId >= 600 && iconId < 700) {
              iconImg.src = "./icons/13d@2x.png";
            } else if (iconId >= 700 && iconId < 782) {
              iconImg.src = "./icons/50d@2x.png";
            } else if (iconId === 800) {
              iconImg.src = "./icons/01d@2x.png";
            } else if (iconId > 800 && iconId < 803) {
              iconImg.src = "./icons/02d@2x.png";
            } else if (iconId > 802 && iconId < 805) {
              iconImg.src = "./icons/04d@2x.png";
            }

            //Append elements to the container div, add the container div to the results container.
            dayCardbody.appendChild(cityNameLine);
            dayCardbody.appendChild(dateLine);
            dayCardbody.appendChild(iconImg);
            dayCardbody.appendChild(weatherDescriptionLine);
            dayCardbody.appendChild(temperatureLine);
            dayCardbody.appendChild(humidityLine);
            dayCardbody.appendChild(windSpeedLine);
            dayDiv.appendChild(dayCardbody);
            dayDivContainer.appendChild(dayDiv);
            resultsContainer.appendChild(dayDivContainer);
          }
        });
    });
  updatePastSearches();
  citySearch.value = "";
}
updatePastSearches();

//Event listener for the submit button.
submitButton.addEventListener("click", getWeatherData);
