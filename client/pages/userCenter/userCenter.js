// pages/userCenter/userCenter.js
var config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  /**
     * 获取数据
     */

  getData() {
    wx.request({
      url: 'https://api.avatardata.cn/Constellation/Query',
      data: {
        key: 'ff3911e2f31944b6a292daabc7d467c3',
        type: 'nextweek',
        consName: '金牛座'
      },
      // header: {
      //   'content-type': 'application/json' // 默认值
      // },
      success: function (res) {
        wx.request({
          url: config.service.uploadConstellation,
          data: res.data,
          method:'POST',
          // header: {
          //   'content-type': 'application/json' // 默认值
          // },
          success: function (resp) {
            console.log(resp.data)
          }
        })
      }
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