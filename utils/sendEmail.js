const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const data = {
  title: 'nice to meet you!',
  desc: '今天又是充满希望的一天',
  week: '星期一',
  weather: '晴',
  detail: '天气热，建议着短裙、短裤、短薄外套、T恤等夏季服装',
  today: '2020-04-27',
  temphigh: '29',
  templow: '15',
  daily:
    '命名是编程中最困难的事情之一开始的减肥是十多个你拉看电视沙龙课的讲个速度快宫角孕是膨松剂',
};

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
      pass: 'hjpebxxslsdmbhbd', // smtp授权码，到邮箱设置下获取
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

module.exports = sendEmail;
