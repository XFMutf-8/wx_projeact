// pages/userCenter/userCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay : false,
    curMap : '',
    map1 : 'https://7365-severless-om62w-1302847609.tcb.qcloud.la/backImage/%E6%B5%B7%E6%B7%80%E8%AE%BE%E8%AE%A1%E5%9B%BE.png?sign=73d8ad3bd4b7d02566191059aef72dc9&t=1599358489',
    map2 : 'https://7365-severless-om62w-1302847609.tcb.qcloud.la/backImage/%E6%98%8C%E5%B9%B3%E8%AE%BE%E8%AE%A1%E5%9B%BE.png?sign=786b3f1c42066b36ada10725bd969ce4&t=1599358544'

  },
  changePlayStatus(){
    this.setData({
       isPlay: !this.data.isPlay
    })
  },
  showMapModal(e){
    console.log(e)
    let map = e.currentTarget.dataset.url
    this.setData({
      curMap : map
    })
    this.selectComponent('#myModal')._showModal()
   
  },
  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        getApp().globalData.openid = res.result.openid
        this.setData({
          openid : res.result.openid
        })
        this.onQuery()
  
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  onQuery: function() {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('my_spot_image').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2),
          dataList : res.data
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  getAllUrls(){
    
    let list = this.data.dataList.map(item => item.imageUrl)
    wx.cloud.getTempFileURL({
      fileList: list,
      success: res => {
        // get temp file URL
        console.log(res.fileList)
        this.setData({
          fileList : res.fileList.map(item => item.tempFileURL)
        })
        this.downloadImgs()
      },
      fail: err => {
        // handle error
      }
    })

  },

  // 下载图片
 downloadImgs() {
  var _this = this
  // 获取保存到相册权限
  this.writePhotosAlbum(
   function success() {
    wx.showLoading({
     title: '加载中',
     mask: true
    })
    // 调用保存图片promise队列
    console.log(_this.data.fileList,'1111')
    _this
     .queue(_this.data.fileList)
     .then(res => {
      wx.hideLoading()
      wx.showToast({
       title: '下载完成'
      })
     })
     .catch(err => {
      wx.hideLoading()
      console.log(err)
     })
   },
   function fail() {
    wx.showToast({
     title: '您拒绝了保存到相册'
    })
   }
  )
 },
 // 队列
 queue(urls) {
  let promise = Promise.resolve()
  urls.forEach((url, index) => {
   promise = promise.then(() => {
    return this.download(url)
   })
  })
  return promise
 },
 // 下载
 download(url) {
  return new Promise((resolve, reject) => {
   wx.downloadFile({
    url: url,
    success: function(res) {
     var temp = res.tempFilePath
     wx.saveImageToPhotosAlbum({
      filePath: temp,
      success: function(res) {
       resolve(res)
      },
      fail: function(err) {
       reject(res)
      }
     })
    },
    fail: function(err) {
     reject(err)
    }
   })
  })
 },
 //保存图片到相册
writePhotosAlbum(successFun,failFun){
  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success: function () {
            successFun && successFun()
          },
          fail: function (res) {
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: "小程序需要您的微信授权保存图片，是否重新授权？",
              showCancel: true,
              cancelText: "否",
              confirmText: "是",
              success: function (res2) {
                if (res2.confirm) { //用户点击确定'
                  wx.openSetting({
                    success: (res3) => {
                      if (res3.authSetting['scope.writePhotosAlbum']) {
                        //已授权
                        successFun && successFun()
                      } else {
                        failFun && failFun()
                      }
                    }
                  })
                } else {
                  failFun && failFun()
                }
              }
            });
          }
        })
      } else {
        successFun && successFun()
      }
    }
  })
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
    this.onGetOpenid()

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