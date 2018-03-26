const { mysql } = require('../qcloud')

module.exports = async ctx => {
  let query = await mysql('constellation')
    .where({ consname: ctx.request.query.consname, type: ctx.request.query.type, date: ctx.request.query.date })
  ctx.state.data = query
}
