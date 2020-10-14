// pages/userCenter/userCenter.js

import WeCanvas from '../../components/we-canvas-master/canvas'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay : false,
    curMap : '',
    dataList : [],
    map1 : 'https://qny.shabula.com/src/resouce/me/haidian_download.png',
    map2 : 'https://qny.shabula.com/src/resouce/me/changping_download.png',
    mapReadyImglist: [],
    currentlist: []
  },
  changePlayStatus(){
    this.setData({
       isPlay: !this.data.isPlay
    })
    this.getTabBar().setData({
      isPlay : this.data.isPlay
    })
  },
  showMapModal(e){
    console.log(e);
    let isRight =  e.currentTarget.id == 'map2';
    this.setData({
      curMap : e.currentTarget.dataset.url,
      curSelectRight:isRight,
    });

    this.onCreateImage();

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
    wx.showLoading({
      title: 'loading',
      mask: true,
    })
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('my_spot_image').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        // console.log(res.data)
        wx.hideLoading({
          success: (res) => {},
        })
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2),
          dataList : res.data
        })
        console.log('[数据库] [查询记录] 成功: ', res)
        this.setData({
          mapReadyImglist: res.data
        })
        let currentlist = []
        this.data.mapReadyImglist.forEach(data => {
          wx.getImageInfo({
            src: data.imageUrl,
            success (ress) {
              console.log(ress)
              currentlist.push({
                placeName: data.placeName,
                imageUrl: ress.path
              })
            }
          })
        });
        this.setData({
          currentlist: currentlist
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        wx.hideLoading({
          success: (res) => {},
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
    var appInst =  getApp();
    this.setData({
      curMapList : appInst.globalData.curMapList
    });
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
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 3
    })
  }

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

  },

  /** 合成图片*/
  onCreateImage:function(){

    wx.showLoading({
      title: '图片正在合成中...',
    });
    let that = this;
    const ctx = wx.createCanvasContext('myCanvas');
    const date = new Date; 
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const time = year + '.' + month + '.' + day; 

    ctx.save();

    // 获取图片
    wx.getImageInfo({
      src: that.data.curMap,
       success: (res) => {

        let imagePath = res.path;
        let image_w = res.width;
        let image_h = res.height; 

        // 绘制底图
        ctx.drawImage(imagePath,0,0,image_w,image_h);

        //绘制logo
        ctx.drawImage('../../images/gold.png',24,24,50,50);
        if (!that.data.curSelectRight){
          that.drawHaidain(ctx);
        } else {
          that.drawChangping(ctx);
        }

        // 绘制时间
        ctx.setFillStyle('#7b5f39');
        ctx.setFontSize(40);
        ctx.setTextAlign('left');
        const metrics = ctx.measureText(time).width;   //时间文字的所占宽度
        ctx.fillText(time, image_w - metrics - 20, image_h - 40, metrics + 5);
        ctx.restore();
        ctx.draw();

        //canvas画图需要时间而且还是异步的，所以加了个定时器
        setTimeout(()=>{
          // 将生成的canvas图片，转为真实图片
          wx.canvasToTempFilePath({
            x:0,
            y:0,
            canvasId:'myCanvas',
            success:function (res) { 
              let shareImg = res.tempFilePath; 
              that.setData({
                shareImg: shareImg, 
              }); 
              that.selectComponent('#myModal')._showModal();
            },
            fail: function (res) {
            },
          });
        },500); 
       },
      fail: (err) => {
        console.log('获取校园图片失败'); 
      },
      complete: () => {
        wx.hideLoading({
          success: (res) => {},
        });
      },
    });
  },

  drawHaidain:function(ctx){ 

    console.log(this.data.currentlist)

    let rectWidth = 96;
    let arcWidth = 5;

    this.data.currentlist.forEach(element => {
      if(element.placeName == 'k'){
        // 湖心亭
        ctx.restore();
        ctx.drawImage(element.imageUrl,220,800,rectWidth,rectWidth)

        ctx.restore();
        ctx.arc(220 + rectWidth/2 , 800 , arcWidth, 0, 2 * Math.PI);
        ctx.setFillStyle('#ef837c');
        ctx.fill();
        ctx.closePath();
      }else if(element.placeName == 'y'){
        // 法庭科学博物馆
        ctx.restore();
        ctx.drawImage(element.imageUrl,380,220,rectWidth,rectWidth)

        ctx.restore();
        ctx.arc(380 + rectWidth , 220 + (rectWidth)/2 , arcWidth, 0, 2 * Math.PI);
        ctx.setFillStyle('#ef837c');
        ctx.fill();
        ctx.closePath();
      }else if(element.placeName == 'j'){
        // 1-3号楼
        ctx.restore();
        ctx.drawImage(element.imageUrl,140,380,rectWidth,rectWidth)

        ctx.restore();
        ctx.arc(140 + rectWidth/2 , 380 + rectWidth , arcWidth, 0, 2 * Math.PI);
        ctx.setFillStyle('#ef837c');
        ctx.fill();
        ctx.closePath();
      }else if(element.placeName == 'l'){
        // 杨帆雕塑
        ctx.restore();
        ctx.drawImage(element.imageUrl,320,470,rectWidth,rectWidth)

        ctx.restore();
        ctx.arc(320 + rectWidth/2 , 470 + rectWidth , arcWidth, 0, 2 * Math.PI);
        ctx.setFillStyle('#ef837c');
        ctx.fill();
        ctx.closePath();
      }else if(element.placeName == 'n'){
        // 钱端升纪念馆
        ctx.restore();
        ctx.drawImage(element.imageUrl,550,420,rectWidth,rectWidth)

        ctx.restore();
        ctx.arc(550 + rectWidth/2 , 420 + rectWidth , arcWidth, 0, 2 * Math.PI);
        ctx.setFillStyle('#ef837c');
        ctx.fill();
        ctx.closePath();
      }else if(element.placeName == 'k'){
        // 湖心亭
        ctx.restore();
        ctx.drawImage(element.imageUrl,220,800,rectWidth,rectWidth)

        ctx.restore();
        ctx.arc(220 + rectWidth/2 , 800 , arcWidth, 0, 2 * Math.PI);
        ctx.setFillStyle('#ef837c');
        ctx.fill();
        ctx.closePath();
      }else if(element.placeName == 'm'){
        // 法治天下碑
        ctx.restore();
        ctx.drawImage(element.imageUrl,580,870,rectWidth,rectWidth)

        ctx.restore();
        ctx.arc(580 + rectWidth/2 , 870 , arcWidth, 0, 2 * Math.PI);
        ctx.setFillStyle('#ef837c');
        ctx.fill();
        ctx.closePath();
      }
    });
  },

  drawChangping:function(ctx){ 
  
    let rectWidth = 96;
    let arcWidth = 5;

    this.data.currentlist.forEach(element => {
      if(element.placeName == 'k'){
        // 孔子圣象
        ctx.restore();
        ctx.drawImage(element.imageUrl,510,400,rectWidth,rectWidth)

        ctx.restore();
        ctx.arc(510, 400 + (rectWidth)/2 , arcWidth, 0, 2 * Math.PI);
        ctx.setFillStyle('#ef837c');
        ctx.fill();
        ctx.closePath();
      }else if(element.placeName == 'i'){
        // 彭真雕像
        ctx.restore();
        ctx.drawImage(element.imageUrl,80,570,rectWidth,rectWidth)

        ctx.restore();
        ctx.arc(80 + rectWidth, 570 + rectWidth/2 , arcWidth, 0, 2 * Math.PI);
        ctx.setFillStyle('#ef837c');
        ctx.fill();
        ctx.closePath();
      }else if(element.placeName == 'x'){
        // 法治广场
        ctx.restore();
        ctx.drawImage(element.imageUrl,420,620,rectWidth,rectWidth)

        ctx.restore();
        ctx.arc(420 + rectWidth/2 , 620 + rectWidth , arcWidth, 0, 2 * Math.PI);
        ctx.setFillStyle('#ef837c');
        ctx.fill();
        ctx.closePath();
      }else if(element.placeName == 'h'){
        // 雷洁琼雕像
        ctx.restore();
        ctx.drawImage(element.imageUrl,0,770,rectWidth,rectWidth)

        ctx.restore();
        ctx.arc(rectWidth, 770 + rectWidth/2 , arcWidth, 0, 2 * Math.PI);
        ctx.setFillStyle('#ef837c');
        ctx.fill();
        ctx.closePath();
      }else if(element.placeName == 'd'){
        // 拓荒牛
        ctx.restore();
        ctx.drawImage(element.imageUrl,610,760,rectWidth,rectWidth)

        ctx.restore();
        ctx.arc(610, 760 + rectWidth/2, arcWidth, 0, 2 * Math.PI);
        ctx.setFillStyle('#ef837c');
        ctx.fill();
        ctx.closePath();
      }else if(element.placeName == 'f'){
        // 谢觉哉铜像
        ctx.restore();
        ctx.drawImage(element.imageUrl,460,920,rectWidth,rectWidth)

        ctx.restore();
        ctx.arc(460 , 920 + rectWidth/2, arcWidth, 0, 2 * Math.PI);
        ctx.setFillStyle('#ef837c');
        ctx.fill();
        ctx.closePath();
      }else if(element.placeName == 'c'){
        // 钱端升铜像
        ctx.restore();
        ctx.drawImage(element.imageUrl,130,920,rectWidth,rectWidth)

        ctx.restore();
        ctx.arc(130 + rectWidth , 920 + rectWidth/2, arcWidth, 0, 2 * Math.PI);
        ctx.setFillStyle('#ef837c');
        ctx.fill();
        ctx.closePath();
      }else if(element.placeName == 'a'){
        // 校训宝鼎
        ctx.restore();
        ctx.drawImage(element.imageUrl,100,1180,rectWidth,rectWidth)

        ctx.restore();
        ctx.arc(100 + rectWidth/2 , 1180 , arcWidth, 0, 2 * Math.PI);
        ctx.setFillStyle('#ef837c');
        ctx.fill();
        ctx.closePath();
      }else if(element.placeName == 'b'){
        // 法镜
        ctx.restore();
        ctx.drawImage(element.imageUrl,300,1140,rectWidth,rectWidth)

        ctx.restore();
        ctx.arc(300 + rectWidth/2 , 1140 , arcWidth, 0, 2 * Math.PI);
        ctx.setFillStyle('#ef837c');
        ctx.fill();
        ctx.closePath();
      }else if(element.placeName == 'g'){
        // 海子石
        ctx.restore();
        ctx.drawImage(element.imageUrl,620,1110,rectWidth,rectWidth)

        ctx.restore();
        ctx.arc(620 + rectWidth/2 , 1110 , arcWidth, 0, 2 * Math.PI);
        ctx.setFillStyle('#ef837c');
        ctx.fill();
        ctx.closePath();
      }
    })
  } 
})

