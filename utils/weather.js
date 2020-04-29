const http = require('./http');

async function fetchWeather() {
  return http.get(
    `http://jisutqybmf.market.alicloudapi.com/weather/query?city=${encodeURIComponent(
      '重庆'
    )}`
  );
}
async function fetchSentence() {
  return http.get('http://155.94.151.5:7001/queryLatelySentence');
}
//

http: module.exports = { fetchWeather, fetchSentence };
