// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spotImageUrl : {
      '孔子神像' : 'https://7365-severless-om62w-1302847609.tcb.qcloud.la/backImage/%E5%AD%94%E5%AD%90%E5%9C%A3%E5%83%8F1.png?sign=d9fb6dde3dfcbb9e535c28b7d285f818&t=1597720357',
      '拓荒牛' : 'https://7365-severless-om62w-1302847609.tcb.qcloud.la/backImage/%E6%8B%93%E8%8D%92%E7%89%9B1.png?sign=4341d44066e259e1bdc509270743903b&t=1597720399',
      '法镜' : 'https://7365-severless-om62w-1302847609.tcb.qcloud.la/backImage/%E6%B3%95%E9%95%9C1.png?sign=7481147a5506b795166209c7ebe44672&t=1597721400',
      '铜像' : 'https://7365-severless-om62w-1302847609.tcb.qcloud.la/backImage/%E9%92%B1%E7%AB%AF%E5%8D%87%E9%93%9C%E5%83%8F1.png?sign=6b866701a16d148f2161e82ebcc83c56&t=1597721441',
      '宝鼎' : 'https://7365-severless-om62w-1302847609.tcb.qcloud.la/backImage/%E6%A0%A1%E8%AE%AD%E5%AE%9D%E9%BC%8E1.png?sign=e86c718f1747145c73a7c8378d996652&t=1597721511',
      '谢觉哉' : 'https://7365-severless-om62w-1302847609.tcb.qcloud.la/backImage/%E8%B0%A2%E8%A7%89%E5%93%89%E9%93%9C%E5%83%8F1.png?sign=4c558a8ca47ff8551129b4a4673a23d8&t=1597806259',
      '海子石' : 'https://7365-severless-om62w-1302847609.tcb.qcloud.la/backImage/%E6%B5%B7%E5%AD%90%E7%9F%B31.png?sign=361ae0f85783ca8fd5f1ef4ce7f073a3&t=1598169442',
      '彭真' : 'https://7365-severless-om62w-1302847609.tcb.qcloud.la/backImage/%E5%BD%AD%E7%9C%9F%E9%9B%95%E5%83%8F%201.png?sign=cdf2ca99dbd72859485fa78fe0a3b00f&t=1598169553',
      '雷洁琼' : 'https://7365-severless-om62w-1302847609.tcb.qcloud.la/backImage/%E9%9B%B7%E6%B4%81%E7%90%BC1.png?sign=4a8fcfd1ace286599a6a2a6fda70b029&t=1598169623',
      '法治广场' : 'https://7365-severless-om62w-1302847609.tcb.qcloud.la/backImage/%E6%B3%95%E6%B2%BB%E5%B9%BF%E5%9C%BA1.png?sign=041aab6de8baf92d8bbba6c8eda755db&t=1599552591'
    },
    pixelRatio : 3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var appInst =  getApp();
    // console.log(appInst,'app')
    this.setData({
      pixelRatio : appInst.globalData.pixelRatio
    })
  },
  goDetail(event){
    // console.log(event.target.id); 
    let currentId = event.target.id
    wx.navigateTo({
      url: `/pages/detail/detail?currentId=${currentId}&curArea=2`,
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
      selected: 1
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