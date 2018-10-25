// pages/index/show.js
// var shiyan = getApp().globalData.oathGlobal;
var app=getApp();
var util=require('../../utils/util.js')
var imageSource = new Array(
'https://s1.ax1x.com/2018/07/03/PEelvQ.jpg','https://s1.ax1x.com/2018/07/03/PEelvQ.jpg','https://s1.ax1x.com/2018/07/03/PEeGbn.jpg','https://s1.ax1x.com/2018/07/03/PEed8U.jpg','https://s1.ax1x.com/2018/07/03/PEe0v4.jpg'
)
var imgNum= util.RandomNumBoth(0, 4)

var imageUrl = imageSource[imgNum] 
function formatTime2(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('/')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

Page({
     
  /**
   * 页面的初始数据
   */
  data: {
   imageUrl:imageUrl,
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var time = formatTime2(new Date)
    this.setData({
      time: time
    });
      },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('new',getApp().globalData.oathGlobal.oathInput)
    this.setData({
    shiyan: getApp().globalData.oathGlobal.oathInput
    })


      console.log(imgNum, imageUrl)
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
