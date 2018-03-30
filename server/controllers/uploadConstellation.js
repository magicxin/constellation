const {mysql} = require('../qcloud')

module.exports = async ctx => {
  let res = ctx.request.body
  let arr = []
  res && res.length && res.forEach(item=>{
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
  await mysql.raw(mysql('constellation').insert(arr).toString().replace('insert', 'INSERT IGNORE'));
  ctx.state.data = ctx.request.body
}
