// pages/spotList/spotList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curIndex : '1',
    haidian : 'cloud://severless-om62w.7365-severless-om62w-1302847609/backImage/列表，海淀图标背景.png',
    changping : 'cloud://severless-om62w.7365-severless-om62w-1302847609/backImage/列表，昌平图标背景.png',
    itemList : [1,2,3,4,4,3,3]
  },
  changeTab(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      curIndex : index
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