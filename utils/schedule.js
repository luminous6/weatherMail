const schedule = require('node-schedule');

function job(fn) {
  // 定义规则
  //   let rule = new schedule.RecurrenceRule();
  //   rule.second = [0, 10, 20, 30, 40, 50];
  //   rule.minute = 0;
  //   rule.second = 10;
  let rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [0, new schedule.Range(1, 6)];
  rule.hour = 6;
  rule.minute = 50;
  // 启动任务
  let task = schedule.scheduleJob(rule, function () {
    fn();
  });
}

module.exports = job;
