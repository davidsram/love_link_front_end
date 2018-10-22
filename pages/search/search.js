var app = getApp();
Page({
  data: {
    tabs: ["创建誓言", "查询誓言"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    words: "",
    isWords: true,
    isAd: true,
    title: "关于爱链",
    icontent: '',
    pNum: '1',
    pyNum: '01234567890123456789',
    username: getApp().globalData.username,
    avatarUrl: '',
    imageUrl:'',
    pathtest:'',
    listData: [
    ]

  },
  onLoad: function (options) {
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
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
    console.log("options:", options.id)
    var optionId = options.id;
    // that.data.listData=getApp().globalData.listDataRom[optionId];
   
    var res = wx.getStorageSync("login_info");
    var avatarUrl = app.globalData.user_img;
    var username = app.globalData.username;
    this.setData({
      avatarUrl: avatarUrl,
      username: username,
      listData: getApp().globalData.listDataRom[optionId],
      icontent: getApp().globalData.listDataRom[optionId].oathText,
      imageUrl: getApp().globalData.listDataRom[optionId].image,
      pNum: getApp().globalData.listDataRom[optionId].pNum,
      pyNum: getApp().globalData.listDataRom[optionId].tx_hash
      // pNum: optionId  //这行仅演示使用，实际项目请注销
    })
    console.log(that.data.listData.time)
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  onBindfocus: function (e) {
    this.setData({
      isWords: false
    })
  },
  onBindblur: function (e) {
    if (e.detail.value == '') {
      console.log(e.detail.value)
      this.setData({
        isWords: true
      })
    }
  },
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
  goback: function () {
    wx.navigateBack({
      url: "/pages/index/index"
    })
  },
  tapKnow: function () {
    wx.navigateTo({
      url: '/pages/know/know',
    })
  },
  copy:function(e){
    var that=this;
    console.log(e);
    wx.setClipboardData({
      data: that.data.pyNum,
      success:function(res){
        wx.showToast({
          title: '复制成功',
        });
      }
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log("来自页面内转发按钮");
      console.log(res.target);
    }
    else { console.log("来自右上角转发菜单") }

    return {
      title: '快加入爱链，永久记录你的爱情誓言！',
      // path: '/pages/search/search?id=' + this.data.id ,
      path: '/pages/login/login',
      imageUrl: '/images/shareimg2.jpg',
      desc: '一起来吧',
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
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

    // var text = '这是一段文字用于文本自动换行文本长度自行设置欢迎大家指出缺陷';//这是要绘制的文本
    var text = this.data.icontent
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

    var name = "——" + app.globalData.username
    console.log('search username', app.globalData.username)
    for (var b = 0; b < row.length; b++) {
      ctx.fillText(row[b], (375 - ctx.measureText(row[b]).width) / 2, 300 + b * 30, 300)
      if (b == row.length - 1) {
        ctx.fillText(name, (375 - ctx.measureText(name).width) / 2 + 50, 300 + (b + 1) * 30, 300)
        //ctx.fillText(name, 375-(ctx.measureText(name).width + 20), 320 + (b + 1) * 30, 300)

      }
    }
    ctx.drawImage('/images/13.png', 10, 10, 120, 50)
    // logo图片

    ctx.drawImage(this.data.imageUrl, 105, 80, 165, 165)//装饰图片

    ctx.setFillStyle('#eaeaea')
    ctx.fillRect(0, 550, 600, 900)
    ctx.drawImage('/images/timg.jpg', 295, 560, 72, 72)


    ctx.drawImage(this.data.pathtest, 10, 560, 72, 72)

    ctx.setFillStyle('#662');
    ctx.setFontSize(12);
    var buttonName = "恭喜你，" + app.globalData.username + '!'
    var buttonNum = '你是第' + that.data.pNum + "个把誓言上链的人。"
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

    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.record']) {
    //       wx.authorize({
    //         scope: 'scope.record',
    //         success() {
    //           // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //           wx.startRecord()
    //         }
    //       })
    //     }
    //   }
    // })    
    // this.setData({
    //   canvasOn: true
    // })
    //   wx.saveImageToPhotosAlbum({
    //     // 分享图片的地址
    //     filePath: "/images/33.jpg",
    //     success: function (res) {
    //       wx.showToast({
    //         title: '保存成功',
    //         duration: 1500,
    //       })
    //     },
    //     fail: function (res) {
    //       console.log(res)
    //       if (res.errMsg === "saveImageToPhotosAlbum:fail:auth denied") {
    //         console.log("打开设置窗口");
    //         wx.openSetting({
    //           success(settingdata) {
    //             console.log(settingdata)
    //             if (settingdata.authSetting["scope.writePhotosAlbum"]) {
    //               console.log("获取权限成功，再次点击图片保存到相册")
    //             } else {
    //               console.log("获取权限失败")
    //             }
    //           }
    //         })
    //       }
    //     }
    //   })
  }


});