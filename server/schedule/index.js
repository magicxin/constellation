const schedule = require('node-schedule')

var getAvatar = function(){
  // let startTime = new Date(Date.now())
  let startTime = new Date(2018, 1, 1, 0, 0, 0)
  let endTime = new Date(2100, 2, 23, 13, 58, 0)
  let rule = new schedule.RecurrenceRule()
  let time = [0,24]
  rule.hour   = time
  var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: rule }, function () {
    console.log(Date.now())
  });
}
module.export = getAvatar()