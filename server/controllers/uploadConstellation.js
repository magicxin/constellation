const {mysql} = require('../qcloud')

module.exports = async ctx => {
  let res = ctx.request.body.result1
  await mysql('constellation')
    .insert({
      qfriend: res.QFriend ? res.QFriend:'',
      allthing: res.all ? res.all : '',
      color: res.color ? res.color : '',
      date: res.date ? res.date : '',
      datetime: res.datetime ? res.datetime : '',
      health: res.health ? res.health : '',
      love: res.love ? res.love : '',
      money: res.money ? res.money : '',
      name: res.name ? res.name : '',
      number: res.number ? res.number : '',
      summary: res.summary ? res.summary : '',
      work: res.work,
      consname: '金牛座',
      type: 'nextweek'
    })
  ctx.state.data = ctx.request.body
}
