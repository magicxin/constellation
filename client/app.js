//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)

        // 调用登录接口
        qcloud.login({
          success(res){
            if(res){
              // wx.setStorageSync('user', res.data.data)
            }else {
              // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
              qcloud.request({
                url: config.service.requestUrl,
                login: true,
                success(res) {
                  // util.showSuccess('登录成功')
                  wx.setStorageSync('user', res.data.data)
                },

                fail(error) {
                  // util.showModel('请求失败', error)
                  console.log('request fail', error)
                }
              })
            }
          }
        })
        // wx.login({
        //   success: function (res) {
        //     if (res.code) {
        //       //发起网络请求
        //       console.log(res.code)
        //       wx.request({
        //         url: 'https://api.weixin.qq.com/sns/jscode2session',
        //         data: {
        //           code: res.code,
        //           appid:'wx9c73a5702f617e8b',
        //           secret:'3c68587d5042fd32e6bf3b8f04e401f6',
        //           js_code: res.code,
        //           grant_type:'authorization_code'
        //         }
        //       })
        //     } else {
        //       console.log('登录失败！' + res.errMsg)
        //     }
        //   }
        // });
    }
})