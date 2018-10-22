// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindGetUserInfo: function (e) {
    // console.log(e.detail.errMsg)
    // console.log(e.detail.userInfo.nickName)
    // console.log(e.detail.rawData)
    getApp().globalData.username = e.detail.userInfo.nickName
    getApp().globalData.user_img = e.detail.userInfo.avatarUrl
    if (e.detail.userInfo){
    wx.navigateTo({
      url: '/pages/index/index',
    })}
    else{
                    wx.showModal({
                title: '提示',
                content: '您未授权，是否打开授权',
                // success: function (e) {
                //   if (e.cancel) {
                //     wx.showToast({
                //       title: '部分功能受限',
                //       icon: "loading"
                     })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              //用户已经授权过
            }
          })
        }
      }
    })

  },
  getSomeData() {
            // 这里我们每次调用接口时，都要先去调用app.js中的ready方法
             // 在app中ready会返回一个promise对象，只有其返回的状态时resolved状态时才会触发.then()方法
            app.ready().then(() => {
                   // 获取服务端数据
      
    })
    
  }
,

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