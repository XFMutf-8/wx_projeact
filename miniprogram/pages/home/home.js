// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spotImageUrl : {
      '1、2、3号楼' : 'https://7365-severless-om62w-1302847609.tcb.qcloud.la/wordImg/1-3%E5%8F%B7%E6%A5%BC1.png?sign=d04d0be1b5f35be7bca1ec254660e5cd&t=1600741110',
      '湖心亭' : 'https://7365-severless-om62w-1302847609.tcb.qcloud.la/wordImg/%E6%B9%96%E5%BF%83%E4%BA%AD1.png?sign=26e0f9ee72e10f6db4609c0c8cf3aeb5&t=1600740973',
      '扬帆' : 'https://7365-severless-om62w-1302847609.tcb.qcloud.la/wordImg/%E6%89%AC%E5%B8%86%E9%9B%95%E5%A1%911.png?sign=6f323a64f3197e8d69b6d726ca9f42bd&t=1600740153',
      '法治天下' : 'https://7365-severless-om62w-1302847609.tcb.qcloud.la/wordImg/%E6%B3%95%E6%B2%BB%E5%A4%A9%E4%B8%8B%E7%A2%911.png?sign=b8e3fc29a674a5c70d28915eff7014e4&t=1600741013',
      '钱端升' : 'https://7365-severless-om62w-1302847609.tcb.qcloud.la/wordImg/%E9%92%B1%E7%AB%AF%E5%8D%87%E7%BA%AA%E5%BF%B5%E9%A6%86%201.png?sign=a47df073815a08f574c4249831679f01&t=1600740904',
      '博物馆' : 'https://7365-severless-om62w-1302847609.tcb.qcloud.la/wordImg/%E6%B3%95%E5%BA%AD%E7%A7%91%E5%AD%A6%E5%8D%9A%E7%89%A9%E9%A6%861.png?sign=2a3d4ade592fca2b2aaf900a3aa28239&t=1600741057'
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

  goDetail(event){
    // console.log(event.target.id); 
    let currentId = event.target.id
    wx.navigateTo({
      url: `/pages/detail/detail?currentId=${currentId}&curArea=1`,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
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
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      selected: 0
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