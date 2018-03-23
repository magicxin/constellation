// pages/userCenter/userCenter.js
var config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cons: [],
    otherArr: [
     { type: 'today', consName: '摩羯座' }, { type: 'today', consName: '水瓶座' }, { type: 'today', consName: '双鱼座' },
     { type: 'today', consName: '白羊座' }, { type: 'today', consName: '金牛座' }, { type: 'today', consName: '双子座' },
     { type: 'today', consName: '巨蟹座' }, { type: 'today', consName: '狮子座' }, {type: 'today', consName: '处女座' },
     {type: 'today',consName: '天秤座'}, {type: 'today', consName: '天蝎座'}, {type: 'today',consName: '射手座'},
     
     { type: 'tomorrow', consName: '摩羯座' }, { type: 'tomorrow', consName: '水瓶座' }, { type: 'tomorrow', consName: '双鱼座' },
     { type: 'tomorrow', consName: '白羊座' }, { type: 'tomorrow', consName: '金牛座' }, { type: 'tomorrow', consName: '双子座' },
     { type: 'tomorrow', consName: '巨蟹座' }, { type: 'tomorrow', consName: '狮子座' }, { type: 'tomorrow', consName: '处女座' },
     { type: 'tomorrow', consName: '天秤座' }, { type: 'tomorrow', consName: '天蝎座' }, { type: 'tomorrow', consName: '射手座' },

     { type: 'week', consName: '摩羯座' }, { type: 'week', consName: '水瓶座' }, { type: 'week', consName: '双鱼座' },
     { type: 'week', consName: '白羊座' }, { type: 'week', consName: '金牛座' }, { type: 'week', consName: '双子座' },
     { type: 'week', consName: '巨蟹座' }, { type: 'week', consName: '狮子座' }, { type: 'week', consName: '处女座' },
     { type: 'week', consName: '天秤座' }, { type: 'week', consName: '天蝎座' }, { type: 'week', consName: '射手座' },

     { type: 'nextweek', consName: '摩羯座' }, { type: 'nextweek', consName: '水瓶座' }, { type: 'nextweek', consName: '双鱼座' },
     { type: 'nextweek', consName: '白羊座' }, { type: 'nextweek', consName: '金牛座' }, { type: 'nextweek', consName: '双子座' },
     { type: 'nextweek', consName: '巨蟹座' }, { type: 'nextweek', consName: '狮子座' }, { type: 'nextweek', consName: '处女座' },
     { type: 'nextweek', consName: '天秤座' }, { type: 'nextweek', consName: '天蝎座' }, { type: 'nextweek', consName: '射手座' },

     { type: 'month', consName: '摩羯座' }, { type: 'month', consName: '水瓶座' }, { type: 'month', consName: '双鱼座' },
     { type: 'month', consName: '白羊座' }, { type: 'month', consName: '金牛座' }, { type: 'month', consName: '双子座' },
     { type: 'month', consName: '巨蟹座' }, { type: 'month', consName: '狮子座' }, { type: 'month', consName: '处女座' },
     { type: 'month', consName: '天秤座' }, { type: 'month', consName: '天蝎座' }, { type: 'month', consName: '射手座' },
     ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
     * 数据处理
     */
  makeData(res) {
    let data = []
    res.forEach((item,index) => {
      console.log(item.data)
      data.push(Object.assign({}, item.data.result1, this.data.otherArr[index]))
    })
    console.log(data)
    return data
  },
  /**
     * 获取数据
     */

  getData() {
    let that = this
    let consarr = []
    let constellation = function (type, consName) {
      return new Promise((resolve, reject) => {
        wx.request({
          url: config.service.getConstellation,
          data: {
            key: config.avatarkey,
            type: type,
            consName: consName
          },
          success: function (res) {
            resolve(res)
          },
          fail:function(err){
            reject(err)
          }
        })
      })
    }

    that.data.otherArr.forEach(item=>{
      consarr.push(constellation(item.type, item.consName))
    })
    Promise.all(consarr)
      .then(res => {
        //存储星座数据
        wx.request({
          url: config.service.uploadConstellation,
          data: this.makeData(res),
          method: 'POST',
          success: function (resp) {
            console.log(resp.data)
          }
        })
  })
  .catch(err=>{
    console.log(err)
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})