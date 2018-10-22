var app = getApp();

var util = require('../../utils/util.js')

var imageSource = new Array(
'/images/flower.jpg', 
'/images/lightleaf.jpg', 
'/images/rose.jpg', 
'/images/love.jpg', 
'/images/leaf.jpg'

)

var imgNum = util.RandomNumBoth(0, 4)
var imageUrl = imageSource[imgNum]
function formatTime2(date) {

  var year = date.getFullYear()

  var month = date.getMonth() + 1

  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('/')

}
function strToJson(str) {
  return JSON.parse(str);
}
const formatNumber = n => {

  n = n.toString()

  return n[1] ? n : '0' + n

}

Page({
  data: {
    tabs: ["创建誓言", "查询誓言"],
    activeIndex: 0,
    imageUrl: imageUrl,
    sliderOffset: 0,
    sliderLeft: 0,
   // words: "",
    isWords: true,
    isAd: true,
    canvasOn:false,
    imageTempPath:'',
    title: "关于爱链",
    // icontent1: `以为会忘了 微风中漂浮着 夏天要过去了  一想你会心痛无声的  天空好像要说话了  时间它告诉我  我爱你全是真的`,
    icontent:'',
    pNum:'',
    pyNum: '',
    username: app.globalData.username,
    pathtest:'',
    avatarUrl: '',

  listData: [{

  }]

  },
  
onReady:function(){
  
},
  onLoad: function () {
    console.log('gword-detail',app.globalData.gwords)
    console.log(imageUrl,'image')
    console.log(app.globalData.user_img)
    console.log(username)
    var that = this;
    // 获得缓存的用户头像和昵称
    // var res = wx.getStorageSync("login_info");
    var avatarUrl = app.globalData.user_img;
    var username = app.globalData.username;
    var oath = app.globalData.gwords
    var oathTitle
    var oathTitle = oath.substring(0, 4) + '...';
    console.log('res', app.globalData.username)
    this.setData({
      avatarUrl: avatarUrl,
      username: username,
      icontent:oath,
    })
    console.log('on load')
    console.log('avaterurl',avatarUrl)
    wx.request({
      //将数据传输到后台
      url: 'https://www.lovechain.store/lovelink/personInfoIn',
      method: 'POST',
      data: {
        text: app.globalData.gwords,
        oathTitle: oathTitle,
        // blockNum:'123',
        image: imageUrl,
        time: formatTime2(new Date),
        username: app.globalData.username,
        avatarUrl: app.globalData.user_img,
        openid:app.globalData.openid,
    
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      //  header:{'content-type': 'application/json'},
      success: function (res) {
        console.log(res.data, 'success');
        console.log(res)
        console.log('type',typeof(res.data))
        var v = (res.data).replace(/'/g, '"');  //单引号转化为双引号
        console.log(v)
        console.log(typeof(strToJson(v)))
        v = strToJson(v)
        // this.data.pNum= res.pNum
        // this.data.pyNum= res.data
        that.setData({
          pNum:v.num,
          pyNum:v.hash,
        })
      },
      fail: function () {
        console.log('This is fail function')
      }
    })
    wx.getImageInfo({
      src: app.globalData.user_img,
      success(res) {
        console.log("img path", res.path)
        //ctx.drawImage(res.path, 10, 560, 72, 72);
        that.setData({
          pathtest: res.path
        })
        console.log("pathrest", res.path)
      },
      fail(res) {
        console.log(res)
      }
    });
   },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    })
  },
  // onBindfocus: function (e) {
  //   this.setData({
  //     isWords: false
  //   })
  // },
  // onBindblur: function (e) {
  //   if (e.detail.value == '') {
  //     console.log(e.detail.value)
  //     this.setData({
  //       isWords: true
  //     })
  //   }
  // },
  tapClose: function (e) {
    this.setData({
      isAd: false
    })
  },
  // queryitem: function (e) {
  //   wx.navigateTo({
  //     url: '/pages/detail2/detail2',
  //   })
  // },
  // onShareAppMessage: function () {
  //   // let positionId = this.data.positionId
  //   // return {
  //   //   // title: dataMsg.title,
  //   //   path: 'pages/index/index?positionId=' + positionId  // 当打开分享链接的时候跳转到小程序首页，并设置参数positionId
  //   // }

  // },
  onShareAppMessage:function(res){
    if (res.from === 'button') {
      console.log("来自页面内转发按钮");
      console.log(res.target);
    }
    else { console.log("来自右上角转发菜单") } 

     return {
      title: '快加入爱链，永久记录你的爱情誓言！',
     // path: '/pages/search/search?id=' + this.data.id ,
      path: '/pages/login/login',
      imageUrl:'/images/shareimg2.jpg',
      desc:'一起来吧',
       success: (res) => {
         console.log("转发成功", res);
       },
       fail: (res) => {
         console.log("转发失败", res);
       }
     }
  },
  fetchId: function () {
    // fetch id and set to data
  },
  copy: function (e) {
    var that = this;
    console.log(e);
    wx.setClipboardData({
      data: that.data.pyNum,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    })
  },
  goback: function () {
    wx.navigateTo({
      url: "/pages/index/index"
    })
      app.globalData.activeIndex=1

  },
  tapKnow: function () {
    wx.navigateTo({
      url: '/pages/know/know',
    })
  },
  
  /**
   * 保存图片到相册
   */
  bindSave: function () {
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 1500,
    })
    var that = this;
    // 使用 wx.createContext 获取绘图上下文 context
    console.log('canvas')

    let ctx = wx.createCanvasContext('myCanvas')
    ctx.setFillStyle('white')
    ctx.fillRect(0, 0, 900, 900)
    ctx.setFontSize(20);

    ctx.setFillStyle('#662');
    var text = app.globalData.gwords
    var chr = text.split("");//这个方法是将一个字符串分割成字符串数组
    var temp = "";
    var row = [];

    for (var a = 0; a < chr.length; a++) {
      if (ctx.measureText(temp).width < 260) {
        temp += chr[a];
      }
      else {
        a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
        row.push(temp);
        temp = "";
      }
    }
    row.push(temp);
    if (row.length > 8) {
      var rowCut = row.slice(0, 8);
      var rowPart = rowCut[1];
      var test = "";
      var empty = [];
      for (var a = 0; a < rowPart.length; a++) {
        if (ctx.measureText(test).width < 280) {
          test += rowPart[a];
        }
        else {
          break;
        }
      }
      empty.push(test);
      var group = empty[0] + "..."//这里只显示两行，超出的用...表示
      rowCut.splice(1, 1, group);
      row = rowCut;
    }
    console.log('userimg', app.globalData.user_img)
  
    var name = "——" + this.data.username
    console.log('canvas username', this.data.username)
    for (var b = 0; b < row.length; b++) {
      ctx.fillText(row[b], (375 - ctx.measureText(row[b]).width) / 2, 300 + b * 30, 300)
      if (b == row.length - 1) {
        ctx.fillText(name, (375 - ctx.measureText(name).width) / 2+50, 300 + (b + 1) * 30, 300)
        //ctx.fillText(name, 375-(ctx.measureText(name).width + 20), 320 + (b + 1) * 30, 300)
          
      }
    }
    ctx.drawImage('/images/13.png', 10, 10, 120, 50)
    // logo图片

    ctx.drawImage(imageUrl, 105, 80, 165, 165)//装饰图片

    ctx.setFillStyle('#eaeaea')
    ctx.fillRect(0, 550, 600, 900)
    ctx.drawImage('/images/timg.jpg', 295, 560, 72, 72)
   

     ctx.drawImage(this.data.pathtest, 10, 560, 72, 72)
    // wx.downloadFile({
    //   url: app.globalData.user_img,

    //   success: function (res) {

    //     ctx.drawImage(res.tempFilePath, 10, 560, 72, 72);
    //     console.log('tempimg', res.tempFilePath)
    //     ctx.draw();

    //   },
    //   fail: function (err) {
    //     console.log(err)
    //   }
    // })

    ctx.setFillStyle('#662');
    ctx.setFontSize(12);
    var buttonName = "恭喜你，" + that.data.username + '!'
 
    var buttonNum = '你是第' + that.data.pNum  + "个把誓言上链的人。"
    var hash = this.data.pyNum
    var hashNum = '你的交易号是：' + hash.substring(0, 18)
    var hashNum1 = hash.substring(18, 47)
    var hashNum2 = hash.substring(47, 65)
    var cons = '将你的爱情作为礼物送给你的爱人。'

    ctx.fillText(buttonName, 85, 570);
    ctx.fillText(buttonNum, 85, 585);
    ctx.fillText(hashNum, 85, 600)
    ctx.fillText(hashNum1, 85, 615)
    ctx.fillText(hashNum2, 85, 630)
    ctx.fillText(cons, 85, 645)
    //  ctx.draw();

    ctx.draw(false, setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function (res) {
         
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
          })
       
          console.log('tem', that.data.imageTempPath)
        }
      })
    }, 50));
 }
});
