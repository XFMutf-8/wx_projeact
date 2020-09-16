// pages/spotList/spotList.js
var dataList = require('./spotMain.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curIndex : '1',
    haidian : 'cloud://severless-om62w.7365-severless-om62w-1302847609/backImage/列表，海淀图标背景.png',
    changping : 'cloud://severless-om62w.7365-severless-om62w-1302847609/backImage/列表，昌平图标背景.png',
    itemList : [1,2,3,4,4,3,3],
    mainInfo: []
  },
  changeTab(e){
    let index = e.currentTarget.dataset.index
    // console.log(index)
    this.setData({
      curIndex : index
    })
    if(index == '1'){
      this.setData({
        mainInfo : dataList.dataList[0].dataList
      })
    }else{
      this.setData({
        mainInfo : dataList.dataList[1].dataList
      })
    }
  },
  goDetail(event){
    // console.log(event)
    let currentId = event.target.id
    wx.navigateTo({
      url: `/pages/detail/detail?currentId=${currentId}&curArea=${this.data.curIndex}`,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(dataList.dataList)
    this.setData({
      mainInfo : dataList.dataList[0].dataList
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
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 2
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

  }
})