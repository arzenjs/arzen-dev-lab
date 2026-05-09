let city;
const cityInput = document.querySelector(".city-name");
const cityElement = document.getElementById("city");
const countryElement = document.getElementById("country");
const weatherIcon = document.getElementById("weather-icon");
const conditionElement = document.getElementById("condition");
const temperatureElement = document.getElementById("temp");
const templikeElement = document.getElementById("temp-like");
const humidityElement = document.getElementById("humidity")
const pressureElement = document.getElementById("pressure")
const windElement = document.getElementById("wind")
const windGustElement = document.getElementById("wind-gust")
const visibilityElement = document.getElementById("visibility")
const UVElement = document.getElementById("uv")

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        city = cityInput.value;
        fetchWeather();
        cityInput.value = "";
    }
})

const apiKey = "362d1330b8974fa8a8960317250908";

async function fetchWeather() {

    try {
        let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`);
        response = await response.json();
        cityElement.textContent = response.location.name;
        countryElement.textContent = response.location.country;
        weatherIcon.src = response.current.condition.icon;
        conditionElement.textContent = response.current.condition.text;
        temperatureElement.textContent = response.current.temp_c + "°";
        templikeElement.textContent = response.current.feelslike_c + "°";
        humidityElement.textContent = response.current.humidity + "%";
        pressureElement.textContent = response.current.pressure_mb + " hPa";
        windElement.textContent = response.current.wind_kph + " km/h";
        windGustElement.textContent = response.current.gust_kph + " km/h";
        visibilityElement.textContent = response.current.vis_km + " km/h";
        UVElement.textContent = response.current.uv;
    } catch (error) {
        alert("Unable to Fetch Weather, Plz Check Your Network Connection...")
    }
}