const http = require('./http');

async function fetchWeather() {
  return http.get(`/weather/query?city=${encodeURIComponent('重庆')}`);
}

module.exports = fetchWeather;
