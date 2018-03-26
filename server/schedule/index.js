const schedule = require('node-schedule')
var http = require("http")
var querystring = require('querystring')

var getAvatar = function(){
  // let startTime = new Date(Date.now())
  let startTime = new Date(2018, 1, 1, 0, 0, 0)
  let endTime = new Date(2100, 2, 23, 13, 58, 0)
  let rule = new schedule.RecurrenceRule()
  // let time = [0,30]
  rule.second   = 60
  //'* 1 0 * * *'
  var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: '* 1 0 * * *'}, function () {
    console.log(new Date(Date.now()))

    let data = {
      'key': '81ac0219dfde43348e91b7ab008dfca6',
      'time': '1418816972',
      'sort': 'desc'
    }
    const postData = querystring.stringify(data)

    const options = {
      hostname: 'api.avatardata.cn',
      path: '/Joke/QueryJokeByTime',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = http.request(options, (res) => {
      console.log(`状态码: ${res.statusCode}`);
      console.log(`响应头: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`响应主体: ${chunk}`);
      });
      res.on('end', () => {
        console.log('响应中已无数据。');
      });
    });

    req.on('error', (e) => {
      console.error(`请求遇到问题: ${e.message}`);
    });

    // 写入数据到请求主体
    req.write(postData);
    req.end();
  });
}
module.export = getAvatar()