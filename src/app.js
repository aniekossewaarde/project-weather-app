//search engine and changing city/current weather


function formatDate(timestamp) {
let date = new Date(timestamp);

let hours = date.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}

let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`
}


function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateTimeElement = document.querySelector("#dateTime");
    let iconElement = document.querySelector("#icon");

   
    celciusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celciusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateTimeElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function search(city) {
    let apiKey = "ab69138d433c5c85edafefc09e466c07";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);

}

// units conversion


function showFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celciusTemperature * 9/5) + 32;

temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
   
}

function showCelcius(event) {
    event.preventDefault();
    celciusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celciusTemperature);
}


// forecast

function showForecast() {
let forecastElement = document.querySelector("#forecast");
let forecastHTML = `<div class="row">`;
let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
days.forEach(function(day) {
    forecastHTML =  forecastHTML + `

    <div class="col-2"> <div class="forecast-day">${day}</div> 
        <img src="http://openweathermap.org/img/wn/01n@2x.png" alt="icons"  width="42px"/> 
    <div class="forecast-temp"><span class="forecast-temp-max">18°</span> <span class="forecast-temp-min">12°</span></div>
    </div>
`;
});
   
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML; 
}




// global variables

let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelcius);

showForecast();




search("Barcelona");