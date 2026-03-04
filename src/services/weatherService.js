const axios = require("axios");

/**
 * Fetches current weather data from OpenWeatherMap API for a given city.
 * Returns weather description and temperature in Celsius.
 */
async function getWeather(city) {
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey || apiKey === "your_openweathermap_api_key_here") {
    throw new Error("WEATHER_API_KEY is not configured");
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  const response = await axios.get(url);
  const data = response.data;

  return {
    weather: data.weather[0]?.description || "unknown",
    temperature: data.main?.temp ?? null,
  };
}

module.exports = { getWeather };
