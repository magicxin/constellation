// index.js
var config = require('../../config')
var { formatTime} = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cons_name:[{
      name:'摩羯座',
      time:'12.22-01.19'
    }, {
      name: '水瓶座',
      time: '1.20-02.18'
      }, {
        name: '双鱼座',
        time: '02.19-03.20'
    }, {
      name: '白羊座',
      time: '03.21-04.19'
      }, {
        name: '金牛座',
        time: '04.20-05.20'
    }, {
      name: '双子座',
      time: '05.21-06.21'
      }, {
        name: '巨蟹座',
        time: '06.22-07.22'
    }, {
      name: '狮子座',
      time: '07.23-08.22'
      }, {
        name: '处女座',
        time: '08.23-09.22'
    }, {
      name: '天秤座',
      time: '09.23-10.23'
      }, {
        name: '天蝎座',
        time: '10.24-11.22'
    }, {
      name: '射手座',
      time: '11.23-12.21'
    }],
    pick_val:'摩羯座',
    picker_val_show:'摩羯座',
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
    },
    picker: 'picker_hidden'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCons()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(formatTime(new Date()).slice(0,10).replace(/\//g,''))
    
  },
  getCons(){
    let that = this
    wx.request({
      url: config.client.getConstellation,
      data: {
        consname: this.data.picker_val_show,
        type: 'today',
        date: formatTime(new Date()).slice(0, 10).replace(/\//g, '')
      },
      success: function (res) {
        console.log(res.data.data[0])
        let cons = res.data.data[0]
        // this.data.cons_name.forEach((item,index)=>{

        // })
        console.log(cons.datetime)
        that.setData({
          cons: {
            // name: cons.name + ' (01.11-.2.11)',
            date: cons.datetime,
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
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      pick_val: this.data.cons_name[val[0]].name
    })
    console.log(this.data.pick_val)
  },
  showPicker(type){
      this.setData({
        picker: 'picker_show'
      })
  },
  confirmCons(){
    let that = this
    setTimeout(function () {
      that.setData({
        picker: that.data.picker === 'picker_show' ? 'picker_hidden' : 'picker_show',
        picker_val_show: that.data.pick_val
      })

      that.getCons()
    }, 300)
  }
})