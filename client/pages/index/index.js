// index.js
var config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cons:{
      name:'',
      date:'',
      all:'',
      love:'',
      work:'',
      money:'',
      health:'',
      qfriend:'',
      color:'',
      number:'',
      summary:''
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this
    wx.request({
      url: config.client.getConstellation,
      data: {
        consname:'处女座',
        type:'today',
        date:'20180326'
      },
      success: function (res) {
        console.log(res.data.data[0])
        let cons = res.data.data[0]
        that.setData({
          cons: {
            name: cons.name + ' (01.11-.2.11)',
            date: cons.date,
            all: cons.allthing,
            love: cons.love,
            work: cons.work,
            money: cons.money,
            health: cons.health,
            qfriend: cons.qfriend,
            color: cons.color,
            number: cons.number,
            summary: cons.summary,
          }
        })
      },
      fail: function (err) {
        
      }
    })
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