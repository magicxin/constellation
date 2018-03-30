const schedule = require('node-schedule')
const $ = require('../tools/util')
const { mysql } = require('../qcloud')
// var http = require("http")
// var querystring = require('querystring')
//查询参数
var otherArr = [
  { type: 'today', consName: '摩羯座' }, { type: 'today', consName: '水瓶座' }, { type: 'today', consName: '双鱼座' },
  { type: 'today', consName: '白羊座' }, { type: 'today', consName: '金牛座' }, { type: 'today', consName: '双子座' },
  { type: 'today', consName: '巨蟹座' }, { type: 'today', consName: '狮子座' }, { type: 'today', consName: '处女座' },
  { type: 'today', consName: '天秤座' }, { type: 'today', consName: '天蝎座' }, { type: 'today', consName: '射手座' },

  { type: 'tomorrow', consName: '摩羯座' }, { type: 'tomorrow', consName: '水瓶座' }, { type: 'tomorrow', consName: '双鱼座' },
  { type: 'tomorrow', consName: '白羊座' }, { type: 'tomorrow', consName: '金牛座' }, { type: 'tomorrow', consName: '双子座' },
  { type: 'tomorrow', consName: '巨蟹座' }, { type: 'tomorrow', consName: '狮子座' }, { type: 'tomorrow', consName: '处女座' },
  { type: 'tomorrow', consName: '天秤座' }, { type: 'tomorrow', consName: '天蝎座' }, { type: 'tomorrow', consName: '射手座' },

  { type: 'week', consName: '摩羯座' }, { type: 'week', consName: '水瓶座' }, { type: 'week', consName: '双鱼座' },
  { type: 'week', consName: '白羊座' }, { type: 'week', consName: '金牛座' }, { type: 'week', consName: '双子座' },
  { type: 'week', consName: '巨蟹座' }, { type: 'week', consName: '狮子座' }, { type: 'week', consName: '处女座' },
  { type: 'week', consName: '天秤座' }, { type: 'week', consName: '天蝎座' }, { type: 'week', consName: '射手座' },

  // { type: 'nextweek', consName: '摩羯座' }, { type: 'nextweek', consName: '水瓶座' }, { type: 'nextweek', consName: '双鱼座' },
  // { type: 'nextweek', consName: '白羊座' }, { type: 'nextweek', consName: '金牛座' }, { type: 'nextweek', consName: '双子座' },
  // { type: 'nextweek', consName: '巨蟹座' }, { type: 'nextweek', consName: '狮子座' }, { type: 'nextweek', consName: '处女座' },
  // { type: 'nextweek', consName: '天秤座' }, { type: 'nextweek', consName: '天蝎座' }, { type: 'nextweek', consName: '射手座' },

  { type: 'month', consName: '摩羯座' }, { type: 'month', consName: '水瓶座' }, { type: 'month', consName: '双鱼座' },
  { type: 'month', consName: '白羊座' }, { type: 'month', consName: '金牛座' }, { type: 'month', consName: '双子座' },
  { type: 'month', consName: '巨蟹座' }, { type: 'month', consName: '狮子座' }, { type: 'month', consName: '处女座' },
  { type: 'month', consName: '天秤座' }, { type: 'month', consName: '天蝎座' }, { type: 'month', consName: '射手座' }
]
//阿凡达api查询接口
var constellation = function (type, consName) {
  return new Promise((resolve, reject) => {
    $.post({
      'key': 'bef1d4393c894a9f82ec55d4bc179307',
      'type': type,
      'consname': consName,
      'hostname': 'api.avatardata.cn',
      'path': '/Constellation/Query'
    })
    .then(res=>{
      resolve(res)
    })
    .catch(err=>{
      reject(err)
    })
  })
}

var getAvatar = function(){
  let consarr = []
  let startTime = new Date(2018, 1, 1, 0, 0, 0)
  let endTime = new Date(2100, 2, 23, 13, 58, 0)
  //测试代码
  // let data = {
  //   'key': '81ac0219dfde43348e91b7ab008dfca6',
  //   'time': '1418816972',
  //   'sort': 'desc',
  //   'hostname': 'api.avatardata.cn',
  //   'path': '/Joke/QueryJokeByTime'
  // }
  
  // consarr = [constellation('today', '处女座') ,constellation('today', '金牛座')]
  otherArr.forEach(item => {
    consarr.push(constellation(item.type, item.consName))
  })
  //node.schedule定时器任务，corn规则设定每日0点更新数据
  var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: '0 0 0 * * *' }, function () {
    var d = new Date();
    var yy = d.getFullYear();
    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    var hh = d.getHours();
    var MM = d.getMinutes();
    var ss = d.getSeconds();
    console.log(yy+'/'+mm+'/'+dd+' '+hh+':'+MM+':'+ss)

    //同时插入星座数据到腾讯云数据库，并校验唯一性
    Promise.all(consarr)
      .then(res => {
        let result = JSON.parse(res)

        result && result.length && result.forEach(item => {
          console.log(item)
          arr.push({
            qfriend: item.QFriend ? item.QFriend : '',
            allthing: item.all ? item.all : '',
            color: item.color ? item.color : '',
            date: item.date ? item.date : '',
            datetime: item.datetime ? item.datetime : '',
            health: item.health ? item.health : '',
            love: item.love ? item.love : '',
            money: item.money ? item.money : '',
            name: item.name ? item.name : '',
            number: item.number ? item.number : '',
            summary: item.summary ? item.summary : '',
            work: item.work ? item.work : '',
            consname: item.consName,
            type: item.type
          })
        })
        mysql.raw(mysql('constellation').insert(arr).toString().replace('insert', 'INSERT IGNORE'));
      })
  })
  
}
module.export = getAvatar()