const { getWeather } = require("../services/weatherService");

// POST /api/weather?city=London — fetch weather for a city
async function fetchWeather(req, res) {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: "City query parameter is required" });
    }

    const weatherData = await getWeather(city);
    res.json(weatherData);
  } catch (err) {
    console.error("Error fetching weather:", err.message);

    if (err.response?.status === 404) {
      return res.status(404).json({ error: "City not found" });
    }
    if (err.message.includes("not configured")) {
      return res.status(503).json({ error: err.message });
    }

    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}

module.exports = { fetchWeather };
