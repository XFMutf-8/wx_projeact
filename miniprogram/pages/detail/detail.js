// pages/detail/detail.js
var jsonData = require('./main.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoHeadImgUrl: '',
    itemList: [
      "https://qny.shabula.com/img/xiaoxunbaoding0.jpg",
      "https://qny.shabula.com/img/xiaoxunbaoding1.jpg"
    ],
    contentList: [{
        content: '2007年8月，由北京大成律师事务所捐赠的校训宝鼎落成于昌平校区礼堂南侧。校训宝鼎底座高三十公分，有九块方石拼合而成，意为三九之尊，更显其庄严厚重。总高3.2米，外径2.5米，内径宽1.9米，深1.0米，材质为锡青铜，由北京大成律师事务所捐赠。'
      },
      {
        content: '雕塑以三足鼎为基本造型，在传统鼎器的基础上改进变化，使其既具有器制的大气沉雄厚实、纹饰刻镂深重，又具有当代艺术审美上的创新。将校训“厚德、明法、格物、致公”作为其中的铭文，以铸造的方式作为雕塑的正面凸出。鼎器上方，融合中华传统文化中的龙纹、环带纹、蟠璃纹等图形，象征中国政法大学校园文化一脉相承，以及“法”在中华民族各项事业鼎盛发展中的特殊作用。.2米，外径2.5米，内径宽1.9米，深1.0米，材质为锡青铜，由北京大成律师事务所捐赠。'
      },
      {
        content: '吾学之兴历五十余载，训育之文初无所定，然大学精神，遞传不替。二〇〇二年四月，校训初成。厚德明法，格物致公。恒追高远，永为仪则。吾学之宗，由是灼然。今铸鼎勒铭，名著来者。（基座铭文摘抄）.2米，外径2.5米，内径宽1.9米，深1.0米，材质为锡青铜，由北京大成律师事务所捐赠。'
      }
    ],
    scrollUrl: 'https://7365-severless-om62w-1302847609.tcb.qcloud.la/backImage/%E5%9B%BE%E7%89%872.png?sign=d39519f845f829daa6efeb343869f25f&t=1597649915',
    normalPlay: false,
    schoolPlay: false,
    isShowSwap: false,
    isShowModal: false,
    message: ['不在地点范围内，打卡失败'],
    mainInfo: []
  },
  onAdd: function (data) {
    const db = wx.cloud.database()
    console.log(data)
    db.collection('my_spot_image').add({
      data: {
        imageUrl: data.fileID
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
        })
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.currentId) //json获取当前页面信息
    let current = options.currentId
    if (current == 'a') { //宝鼎
      this.setData({
        mainInfo: jsonData.dataList[12]
      })
    } else if (current == 'b') { //法镜
      this.setData({
        mainInfo: jsonData.dataList[0]
      })
    } else if (current == 'c') { //钱端升铜像
      this.setData({
        mainInfo: jsonData.dataList[15]
      })
    } else if (current == 'd') { //拓荒牛
      this.setData({
        mainInfo: jsonData.dataList[11]
      })
    } else if (current == 'e') { //孔子神像
      this.setData({
        mainInfo: jsonData.dataList[7]
      })
    } else if (current == 'f') { //谢觉哉
      this.setData({
        mainInfo: jsonData.dataList[13]
      })
    } else if (current == 'g') { //海子石
      this.setData({
        mainInfo: jsonData.dataList[5]
      })
    } else if (current == 'h') { //雷洁琼
      this.setData({
        mainInfo: jsonData.dataList[8]
      })
    } else if (current == 'i') { //彭真
      this.setData({
        mainInfo: jsonData.dataList[9]
      })
    } else if (current == 'j') { //1-3号楼
      this.setData({
        mainInfo: jsonData.dataList[4]
      })
    } else if (current == 'k') { //湖心亭
      this.setData({
        mainInfo: jsonData.dataList[6]
      })
    } else if (current == 'l') { //扬帆
      this.setData({
        mainInfo: jsonData.dataList[14]
      })
    } else if (current == 'm') { //法治天下
      this.setData({
        mainInfo: jsonData.dataList[3]
      })
    } else if (current == 'n') { //钱端升纪念馆
      this.setData({
        mainInfo: jsonData.dataList[10]
      })
    }
    else if(current == 'o'){ //法制广场
      this.setData({
        mainInfo: jsonData.dataList[2]
      })
    }
    else if(current == 'p'){ //法庭科学博物馆
      this.setData({
        mainInfo: jsonData.dataList[1]
      })
    }
  },
  changeNormalPlay() {
    this.setData({
      normalPlay: !this.data.normalPlay,
      schoolPlay: false
    })

  },
  showSwap() {
    this.setData({
      isShowSwap: !this.data.isShowSwap
    })
  },
  changeSchoolPlay() {
    this.setData({
      normalPlay: false,
      schoolPlay: !this.data.schoolPlay
    })

  },
  goRoutePlan() {
    let plugin = requirePlugin('routePlan');
    let key = 'GXYBZ-OOIRK-XBUJ3-AEUEK-APV7Z-5NFXS'; //使用在腾讯位置服务申请的key
    let referer = '文化景观'; //调用插件的小程序的名称
    let startPoint = JSON.stringify({ //起点
      'name': '中国技术交易大厦',
      'latitude': 39.984154,
      'longitude': 116.30749
    });
    let endPoint = JSON.stringify({ //终点
      'name': this.data.mainInfo.realName,
      'latitude': this.data.mainInfo.lat,
      'longitude': this.data.mainInfo.lon
    });
    wx.navigateTo({
      url: 'plugin://routePlan/route-plan?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });

  },
  showModal() {
    this.setData({
      isShowModal: !this.data.isShowModal
    })

  },
  startCamera() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        this.setData({
          tempFilePaths
        })
        this.showModal()
      }
    })
  },
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  },
  getPosition() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log(res);
        let curLat = res.latitude * 1000000
        let curLon = res.longitude * 1000000
        let lat = this.data.mainInfo.lat * 1000000
        let lon = this.data.mainInfo.lon * 1000000
        console.log(curLat,curLon,lon,lat,'111111')
        if (curLat < lat + 10 && curLat > lat - 10 && curLon > lon - 10 && curLon < lon + 10) {
          this.setData({
            latitude: res.latitude,
            longitude: res.longitude
          })
          const filePath = this.data.tempFilePaths[0]
          // 上传图片
          const cloudPath = 'myImage/' + new Date().getTime() + filePath.match(/\.[^.]+?$/)[0]
          wx.cloud.uploadFile({
            cloudPath,
            filePath,
            success: res => {
              console.log('[上传文件] 成功：', res)
              this.selectComponent('#toast').showToast()
              this.setData({
                message: ['打卡成功']
              })
              this.onAdd(res)
            },
            fail: e => {
              console.error('[上传文件] 失败：', e)
              this.selectComponent('#toast').showToast()
              this.setData({
                message: ['[上传文件] 失败']
              })
            },
            complete: () => {
              wx.hideLoading()
            }
          })
          // this.selectComponent('#toast').showToast()
          this.setData({
            isShowModal: false
          })
        }else{
          this.selectComponent('#toast').showToast()
              this.setData({
                message: ['不在打卡范围内'],
                isShowModal : false
              })
        }
       
      },
      fail: (res) => {
        console.log(res);
      }
    })
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