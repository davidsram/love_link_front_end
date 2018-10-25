//index.js
//获取应用实例
const app = getApp()
var flag = false;             //勾选的标签变量，若勾选上则为真

Page({
  data: {
     
  },
  gotoser: function (e) { //《誓言条款》的按压事件
    console.log(e)
    
    wx.navigateTo({
      url: "../intro/intro",
    })
    
  },
  add_oath: function (e) {//支付按钮的按压事件
    console.log(e)
    // console.log(oath)
    if (flag)
  {wx.navigateTo({
    url: '../index/show',
  })}
    else
    { console.log('select') 
    wx.showToast({
      title: '请阅读服务条款',
      icon:'loading',
      duration: 900
    })
    }

    
  },
  listenCheckboxChange:function(e){ //勾选框的勾选事件
    console.log(e)
    flag=!flag                   
    console.log(flag)
    
  },
 
  bindFormSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var oath=getApp
    app.globalData.oathGlobal = e.detail.value
  
  
    // wx.setStorageSync('formtext', oath.oathInput)
    
    
  },
  onShareAppMessage:function(){

  }
})
