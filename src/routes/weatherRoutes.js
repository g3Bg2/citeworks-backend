const express = require("express");
const router = express.Router();
const { fetchWeather } = require("../controllers/weatherController");

router.post("/", fetchWeather);

module.exports = router;
