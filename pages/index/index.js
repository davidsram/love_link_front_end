var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util = require('../../utils/util.js')
var app=getApp()
function strToJson(str) {
  return JSON.parse(str);
}
var that = this
Page({
  data: {
    tabs: ["创建誓言", "查询誓言"],
    activeIndex: app.globalData.activeIndex,
    sliderOffset: 0,
    sliderLeft: 0,
    //words: "",
    isWords: true,
    isAd: true,
    istk: false,
    isCheck: false,
    isAgain: false,
    isSearch:true,
    thead1: "我的誓言",
    thead2: "区块",
    thead3: "创建时间",
    thead4: '创建者',
    theadRam:'',
    param1:  {
      "timeStamp":'',
      "package": '',
      "paySign":'',
      "signType": "MD5",
      "nonceStr": ''
    },
    title: '',
    content: '',
    title1: "关于爱链",
    content1: `让爱情可见，将誓言上链 

将你的爱情誓言作为礼物送给你的爱人。 \n

“爱链”小程序会将你的誓言记录在区块链上，利用分布式账本的特性，让每一个链上的人，都成为你们爱情的见证人。上链的誓言将会被永久保存，不可篡改。让区块链变成你们的爱情锁桥。 \n

虽然区块链、分布式账本这些东西，听起来跟爱情没有半毛钱关系，但是……

它是个什么原理，我懒得解释，你也不用明白，你用了就知道了。（如果你非要弄明白，请联系我们，请我们吃顿饭，可以跟你慢慢说） \n

在这个小程序里面，你只要输入你对爱人的爱情宣言，点击上链，就可以把你的誓言永久的保存在区块链上。你会拿到一个密钥，用来在区块链上查询被你刻在上面的爱情宣言。同时小程序内会生成一个页面。拿去秀吧，不仅秀恩爱，还可以透露出一丝科技感的内涵。 \n

你说你不相信什么天长地久、海枯石烂？没关系，你要相信科学。爱情有时来来去去，但你要知道区块链就在那里。 \n

怎么样，试试看吧？我们的爱链小程序。 \n

让地老天荒停留在俯仰之间。
  `,
    title2: '《“爱链”小程序用户与服务协议》',
    content2: `
    请仔细阅读“浙江遇趣网络科技有限公司”“爱链”小程序产品的服务协议(下称“本协议”)，“爱链”小程序将依据以下条件和条款为您提供服务。本协议阐述之条款和条件适用于您使用“爱链”小程序所提供的各种工具和服务(以下简称“服务”)。浙江遇趣网络科技有限公司（以下简称“遇趣公司”）在此提醒您（用户）在使用“爱链”小程序服务之前，请认真阅读此《用户与服务协议》确保您充分理解本协议中个条款。本协议是用户（自然人、法人、或社会团体）与浙江遇趣网络科技有限公司关于本公司“爱链”小程序产品及服务的法律协议。
服务条款的确认

1.1“爱链”小程序根据本服务条款及对该条款的修改向用户提供服务。本服务条款具有合同法上的法律效力。
1.2如果用户不同意本协议的任何条件，请不要使用“爱链”小程序。一旦您以任何方式使用本产品，即表示同意并接受协议各项条款的约束。用户在使用“爱链”小程序的同时，同意接受“爱链”小程序提供的各类信息服务。
2．服务内容及修改、中断、终止

2.1 “爱链”小程序的具体内容由遇趣公司根据实际情况提供，并对所提供之服务拥有最终解释权。
2.2 “爱链”小程序仅向其用户提供相关服务，与相关服务有关的设备（如个人电脑、手机、及其他与接入互联网或移动网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费）均由用户自行负担。
2.3  本公司鉴于网络服务的特殊性，用户同意遇趣公司有权不经事先通知，随时变更、中断或终止部分或全部的网络服务（包括收费网络服务）。遇趣公司不担保网络服务不会中断，对网络服务的及时性、安全性、准确性也都不作担保。
2.4 “爱链”小程序需要定期或不定期地对提供网络服务的平台或相关的设备进行检修或者维护，如因此类情况而造成网络服务（包括收费网络服务）在合理时间内的中断，遇趣公司无需为此承担任何责任。遇趣公司保留不经事先通知为维修保养、升级或其它目的暂停全部或部分的网络服务的权利。
    `,
    listData2: [
  
    ],
    listData1: [{

    }],
   
    listDataRam:[],
  },
  onLoad: function (options) {
    var that = this;
    var title = this.data.title1;
    var content = this.data.content1;
    var res = wx.getStorageSync("login_info");//获得缓存用户信息
   
    // if (options.positionId) {
    //   setTimeout(function () {
    //     wx.navigateTo({
    //       url: '../positionDetail/positionDetail?id=' + options.positionId
    //     })
    //   }, 800)
    // }
    this.setData({
      title: title,
      content: content,
    })

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
        console.log(res.windowWidth / that.data.tabs.length - sliderWidth)
      }
    });
  },
  
  onShow: function () {  
    var that = this
    that.setData({
      isCheck:app.globalData.isCheck
    })
    console.log('onshow函数开始执行')
    app.getUser(function (oqpenid) {
      that.setData({
        openid: oqpenid
      })
      wx.request({
        url: 'https://www.lovechain.store/lovelink/personInfoOut',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: { openid: app.globalData.openid },
        success: function (res) {

          console.log('app.globalData.openid', app.globalData.openid)
          console.log('person info', res)
          var v = (res.data).replace(/'/g, '"');
          v = v.replace(/\(/g, '')
          v = v.replace(/\)/g, '')
          v = v.substr(0, v.length - 1)
          v = '[' + v
          v = v.concat(']')
          console.log('v', v)
          v = strToJson(v)
          console.log('person info', v)
          that.setData({
            listDataRam: v,
            // name: res.data[1].oath,
          })
          console.log('text', v.oathText)
          console.log('time', v[0].name)

          getApp().globalData.listDataRom = that.data.listDataRam
        },
        fail: function (res) {
          console.log('fail', res)
        }
      })
    })
    
  },
    

  tabClick: function (e) {   //跳转查询誓言界面
    var that=this
    console.log('tapclose', this.data.isAd)
    if (!app.globalData.username) {
      // 如果未登录就前往登录界面
      app.toLogin()
    }
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    
    // for (var i = 0, len = Object.keys(that.data.listData2).length; i < len; i++) {
    //   console.log('list data', that.data.listData1[i]);
    //   if (that.data.listData2[i].time == '2018/07/31') {
    //     console.log('match')
    //     that.data.listData1.push(that.data.listData2[i])
    //   }
    //   that.setData({
    //     listDataRam: that.data.listData1
    //   })
    //   console.log('lDram', that.data.listDataRam)
    // }
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
      path: '/pages/index/index',
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
  onBindfocus: function (e) {
    this.setData({
      isWords: false
    })
  },
  onBindblur: function (e) {
    if (e.detail.value == '') {
      console.log('no value',e.detail.value)
      this.setData({
        isWords: true,
      })
    }
    
      console.log('test',e.detail.value)
      app.globalData.gwords = e.detail.value
  
  },
  tapClose: function () {  //关闭说明
  
    this.setData({
      isAd: false
    })

  },
  // 付款
  tapEnter: function (e) {
    // wx.navigateTo({
    //   url: '/pages/detail/detail',
    // })
    var param
    if (this.data.isCheck === true) {
      var that = this;
        wx.request({
          url: 'https://www.lovechain.store/lovelink/prepayId',
            method: 'POST',
            header: {
                  'content-type': 'application/x-www-form-urlencoded'
                  },
            data: {openid: app.globalData.openid },
                success: function(res) {
          var pay = res.data
        //发起支付
        console.log('pay',pay.timeStamp)
        console.log('pay',typeof(pay))
          var timeStamp = pay.timeStamp;
          var packages = pay.package;
          var paySign = pay.paySign;
          var nonceStr = pay.nonceStr;
           param = {
            "timeStamp": timeStamp,
            "package": packages,
            "paySign": paySign,
            "signType": "MD5",
            "nonceStr": nonceStr
          };
          that.pay(param)
          console.log(typeof(param.timeStamp),"leixing")
          console.log(param, 'tsin')
          },
      })
     }
    
    else {
      wx.showToast({

        title: '请阅读服务条款',

        icon: 'loading',

        duration: 900
      })
    }
  },
pay:function (param) {
          wx.requestPayment({
          timeStamp:param.timeStamp+'',
          nonceStr: param.nonceStr,
          package:param.package,
          signType: param.signType,
          paySign: param.paySign,
          success: function (res) {
            // success
            // wx.navigateBack({
            //   delta: 1, // 回退前 delta(默认为1) 页面
            //   success: function(res) {
                wx.showToast({
                  title: '支付成功',
                  icon: 'success',
                  duration: 2000
                })
                wx.navigateTo({
              url: '/pages/detail/detail',
            })
              },
              fail: function() {
                // fail

              },
              complete: function() {
                // complete
              }
            })
          },
        //   fail: function(res) {
        //     // fail
        //   },
        //   complete: function() {
        //     // complete
        //   }
        //})
        // },
  // 查询
  queryitem: function (e) {
    console.log('searchlist')
    console.log(e.currentTarget.dataset.id)

    console.log(e.currentTarget.dataset.info)
    wx.navigateTo({
      url: '/pages/search/search?id=' + e.currentTarget.dataset.id,
    })
  },
  // 同意
  tapAgree: function (e) {

    // var isCheck = !app.globalData.isCheck
    app.globalData.isCheck = !app.globalData.isCheck
    this.setData({
      isCheck: app.globalData.isCheck
    })
    if (!app.globalData.username) {
      // 如果未登录就前往登录界面
      app.toLogin()
    }
    console.log('agree',this.data.isCheck)
  },

  // searchOthers: function () {
  //   var thead = this.data.thead4;
  //   var listData = this.data.listData2;
  //   this.setData({
  //     theadRam: this.data.thead1,
  //     thead1: thead,
  //     listDataRam: listData,
  //     isSearch:false
  //   })
  //   console.log('search', thead, listData)
  // },

  // backToPerson:function(){
  //   var thead = this.data.theadRam;
  //   var listData = this.data.listData1;
  //   // this.data.listData1=[];
  //   this.setData({
  //     thead1: thead,
  //     listDataRam: listData,
  //     isSearch: true
  //   })
  //   console.log('back',listData)
  // },

  tapTk: function () {
    var content = this.data.content2;
    var title = this.data.title2;
    this.setData({
      isAd: true,
      content: content,
      title: title,
      isAgain: true
    })
    console.log('tk',this.data.isAd)
  },
  tapAd: function () {
    var content = this.data.content1;
    var title = this.data.title1;
    this.setData({
      isAd: true,
      content: content,
      title: title,
      isAgain: false
    })
    console.log('ad', this.data.isAd)
  },



});