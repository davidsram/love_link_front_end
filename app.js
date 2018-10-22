
App({
  onLaunch: function () {
    // 展示本地存储能力
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    
           },
    
    // 获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             // 可以将 res 发送给后台解码出 unionId
  //             this.globalData.userInfo = res.userInfo
  //             wx.setStorageSync("login_info", res.userInfo);

  //             this.getUser()
  //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //             // 所以此处加入 callback 以防止这种情况
  //             if (this.userInfoReadyCallback) {
  //               this.userInfoReadyCallback(res)
  //             }
  //           }
  //         })
  //       } else {
  //         this.userinfo();

  //         // if (that.userInfoReadyCallback) {
  //         //   that.userInfoReadyCallback(res)
  //         // }
  //       }
  //     }
  //   })
 
   

  toLogin: function () {
            // 前往授权登录界面
            wx.navigateTo({
              url: '/pages/login/login',
           })
  },
  ready: function () {
             return Promise((resolve, reject) => {
                  const userkey = wx.getStorageSync('userkey')
                  const userId = wx.getStorageSync('userId')
                   const sessionData = wx.getStorageSync('sessionData')
                   // 检查用户是否具有登陆态
                   if (!userkey || !userId || !sessionData) {
                         // 如果未登录就前往登录界面
                         this.toLogin()
        
      } else {
                         // 如果有就只要更改一下Promise，以继续执行后续操作
                         resolve()
        
      }
    
    })
    
  },

  // // 获取用户授权
  // userinfo: function () {
  //   var that = this;
  //   wx.getUserInfo({
  //     success: function (res) {
  //       // 可以将 res 发送给后台解码出 unionId
  //       that.globalData.userInfo = res.userInfo;
  //       wx.setStorageSync("login_info", res.userInfo);
  //       that.getUser()
  //       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //       // 所以此处加入 callback 以防止这种情况
  //       if (that.userInfoReadyCallback) {
  //         that.userInfoReadyCallback(res)
  //       }
  //     }, fail: function (res) {
  //       wx.getSetting({
  //         success: function (e) {
  //           var user = e.authSetting['scope.userInfo'];
  //           if (!user) {
  //             wx.showModal({
  //               title: '提示',
  //               content: '您未授权，是否打开授权',
  //               success: function (e) {
  //                 if (e.cancel) {
  //                   wx.showToast({
  //                     title: '部分功能受限',
  //                     icon: "loading"
  //                   })
  //                 } else {
  //                   wx.openSetting({
  //                     success: function (r) {
  //                       console.log(r)
  //                       if (r.authSetting["scope.userInfo"]) {
  //                         that.getUser()
  //                         wx.getUserInfo({
  //                           success: function (e) {
  //                             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //                             // 所以此处加入 callback 以防止这种情况
  //                             if (that.userInfoReadyCallback) {
  //                               that.userInfoReadyCallback(e)
  //                             }
  //                             // 可以将 res 发送给后台解码出 unionId
  //                             that.globalData.userInfo = res.userInfo;
  //                           }
  //                         })
  //                       }


  //                     },
  //                     fail: function () {
  //                       wx.showToast({
  //                         title: '授权失败',
  //                         icon: "loading"
  //                       })
  //                     }
  //                   })
  //                 }
  //               },

  //             })
  //           }
  //         }
  //       })
  //     }
  //   })

  // },

  // // 后台获取个人信息
  // getUser: function () {
  //   var _this = this;
  //   wx.login({
  //     success: function (res) {
  //       var user = _this.globalData.userInfo;
  //       // var muban_id = _this.globalData.muban_id;
  //       var code = res.code;
  //       console.log('获取到的code：', code)
  //       if (!user ) {
  //         _this.userinfo();//登陆获取不了凭证调userinfo()
  //       }
  //       wx.request({
  //         //获取openid
  //         url: "http://www.test.com/payTest",
  //         //需要的参数
  //         data: {
  //           js_code: code,
  //           grant_type: "authorization_code",
  //           // moban_id: muban_id
  //         },
  //         success: function (res) {
  //           _this.globalData.openid = res.data.openid
  //           console.log('openid:', openid)
  //           wx.request({
  //             url: '"http://www.test.com/payTest"',
  //             data: {
  //               openId: e.data.openid,
  //               // moban_id: muban_id,
  //               nickName: user.nickName,
  //               identifyimg: user.avatarUrl,
  //             },
  //             success: function (res) {
  //               wx.setStorageSync('userInfo', res.data)//将用户信息缓存起来
  //               _this.globalData.user_img = res.data.identifyimg
  //               // console.log(res, '第二次回来')
  //             }

  //           })
  //         }
  //       })

  //     }
  //   })

  //   console.log('能直接到这个方法里')
//  },
getUser:function(cb){
  var that = this;
  if (this.globalData.openid) {
  typeof cb == "function" && cb(this.globalData.openid)
  console.log('if')
}else{
  console.log('else')
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      var wxcode = res.code;
      if (wxcode) {
        console.log(wxcode, ':code')
        wx.request({
          url: 'https://www.lovechain.store/lovelink/personId',
          data: { code: wxcode },
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            if (res.statusCode == 200) {
              console.log("获取到的openid为：" + res.data)
              that.globalData.openid = res.data
              wx.setStorageSync('openid', res.data)
              typeof cb == "function" && cb(that.globalData.openid)
              console.log('openid sucess')
            } else {
              console.log(res.errMsg)
            }
          },
        })
      }
    }
  })
}
},
  
  globalData: {
    openid:'',
    userInfo: null,
    user_img: "",
    muban_id: 5155,
    gwords:'',
    listDataRom:[],
    username:'',
    activeIndex: 0,
    isCheck:false,
  },
})