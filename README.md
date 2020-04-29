## 天气预报邮件（一封暖暖的邮件）
<hr />
Nodejs实现每天定期推送今日天气预报，气温，穿衣指南 效果图

![效果图](/assets/bg.jpg)

#### 实现思路
- 获取当前天气预报
- 发送邮件
- 每天定时推送

##### 获取当前天气预报
使用阿里的接口获取天气。

```js
const axios = require('axios');

const http = axios.create({
  baseURL: 'http://jisutqybmf.market.alicloudapi.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: 'APPCODE 你的APPCODE',
  },
});
async function fetchWeather() {
  return http.get(`/weather/query?city=${encodeURIComponent('重庆')}`);
}
```
更多详情查看[地址](https://market.aliyun.com/products/57126001/cmapi014302.html?#sku=yuncode830200000)

##### 发送邮件
使用 [nodemailer](https://github.com/nodemailer/nodemailer) 模块发送邮件， nodemailer模块可以发送text, 也可以发送html, 这里使用的是配合ejs发送的html。

```js
function sendEmail(email, data) {
  const template = ejs.compile(
    fs.readFileSync(path.resolve(__dirname, '../views/email.ejs'), 'utf8')
  );

  const html = template(data);

  let transporter = nodemailer.createTransport({
    service: 'qq', // 发送者的邮箱厂商，支持列表：https://nodemailer.com/smtp/well-known/
    port: 25, // SMTP 端口
    secureConnection: true, // SSL安全链接
    auth: {
      //发送者的账户密码
      user: '491548306@qq.com', // 账户
      pass: '**********', // smtp授权码，到邮箱设置下获取
    },
  });

  let mailOptions = {
    from: 'Ming <491548306@qq.com>', // 发送者昵称和地址
    to: email, // 接收者的邮箱地址
    subject: '一封暖暖的小邮件', // 邮件主题
    // text: ``, //邮件的text
    html: html, //也可以用html发送
  };

  //发送邮件
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('邮件发送成功 ID：', info.messageId);
  });
}
```

##### 每天定时推送
配合 [node-schedule](https://github.com/node-schedule/node-schedule)，在node 服务开启后，执行一个定时任务
```js
// 开启一个定时任务
const schedule = require('node-schedule');
function job(fn) {
  // 定义规则, 这里的规则是每天早上06:50 执行fn函数参数
  let rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [0, new schedule.Range(1, 6)];
  rule.hour = 6;
  rule.minute = 50;
  // 启动任务
  let task = schedule.scheduleJob(rule, function () {
    fn();
  });
}
```
```js
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

```
这里需要谁发送邮件在utils/receiver.js 导出的数组里面添加上需要接受的邮箱即可
```js
module.exports = ['XXXXX@qq.com', 'XXXX@163.com'];
```
##### 完结
![avator](/assets/unnamed.gif)


