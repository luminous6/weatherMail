const axios = require('axios');

const http = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: 'APPCODE ecc71c3983304c3ea876b1cc62acfb4e',
  },
});

module.exports = http;
