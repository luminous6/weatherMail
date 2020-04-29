const express = require('express');
const fetchWeather = require('./utils/weather');
const job = require('./utils/schedule');
// 接受邮件的邮箱数组
const receiver = require('./utils/receiver');

const sendEmail = require('./utils/sendEmail');
const app = express();

app.set('views engine', 'ejs');
app.set('views', __dirname + '/views');

// 获取数据
function getData() {
  return fetchWeather()
    .then(function (res) {
      const data = {};
      const { result } = res.data;
      // console.log(result);
      const len = result.index.length;
      data.week = result.week;
      data.weather = result.weather;
      data.detail = result.index[len - 1].detail;
      data.today = result.date;
      data.temphigh = result.temphigh;
      data.templow = result.templow;
      data.title = 'nice to meet you!';
      data.desc = '今天又是充满希望的一天';
      data.daily = '命名是编程中最困难的事情之一';
      return data;
    })
    .catch(function (err) {
      console.log(err);
    });
}

app.get('/', function (req, response) {
  getData().then((res) => {
    response.render('email.ejs', res);
  });
});

// 在服务启动后，执行定时任务
app.listen(1212, function () {
  console.log(`服务已启动`);
  job(function temp() {
    getData().then((res) => {
      // 遍历需要接受的邮箱数组
      for (const item of receiver) {
        sendEmail(item, res);
      }
    });
  });
});
