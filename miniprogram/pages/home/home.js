// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spotImageUrl : {
      '1-3号楼' : 'https://7365-severless-om62w-1302847609.tcb.qcloud.la/backImage/1-3%E5%8F%B7%E6%A5%BC1.png?sign=a96371ebdf017c4adebfd4a33c846ee8&t=1598171361',
      '湖心亭' : 'https://7365-severless-om62w-1302847609.tcb.qcloud.la/backImage/%E6%B9%96%E5%BF%83%E4%BA%AD1.png?sign=23fe688e624bbeec7722bf7643fa1617&t=1598172912',
      '扬帆' : 'https://7365-severless-om62w-1302847609.tcb.qcloud.la/backImage/%E6%89%AC%E5%B8%86%E9%9B%95%E5%A1%911.png?sign=f4b79070889f471d48098b29136198e2&t=1598284824',
      '法治天下' : 'https://7365-severless-om62w-1302847609.tcb.qcloud.la/backImage/%E6%B3%95%E6%B2%BB%E5%A4%A9%E4%B8%8B%E7%A2%911.png?sign=edfc02958110c0b018b3f94c66313622&t=1598283996',
      '钱端升' : 'https://7365-severless-om62w-1302847609.tcb.qcloud.la/backImage/%E9%92%B1%E7%AB%AF%E5%8D%87%E7%BA%AA%E5%BF%B5%E9%A6%86%201.png?sign=0889f0f047befebede8f65856de5e3b9&t=1598284086'
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var appInst =  getApp();
    console.log(appInst,'app')
    this.setData({
      pixelRatio : appInst.globalData.pixelRatio
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