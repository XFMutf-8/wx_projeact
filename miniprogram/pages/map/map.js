// pages/map/map.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    spotImageUrl: {
      "孔子神像": "https://7365-severless-om62w-1302847609.tcb.qcloud.la/wordImg/%E5%AD%94%E5%AD%90%E5%9C%A3%E5%83%8F1.png?sign=a5aae0d91328edb992b7bea422634d47&t=1600740957",
      "拓荒牛":"https://7365-severless-om62w-1302847609.tcb.qcloud.la/wordImg/%E6%8B%93%E8%8D%92%E7%89%9B1.png?sign=ec284dd1bb93e8d4d2cf173c47d84788&t=1600740837",
      "法镜":"https://7365-severless-om62w-1302847609.tcb.qcloud.la/wordImg/%E6%B3%95%E9%95%9C1.png?sign=e449e14bc50f605c2948d37f3689e33f&t=1600741073",
      "铜像":"https://7365-severless-om62w-1302847609.tcb.qcloud.la/wordImg/%E9%92%B1%E7%AB%AF%E5%8D%87%E9%93%9C%E5%83%8F1.png?sign=dd980b57e445fb9ad930b22ad9ca140e&t=1600740852",
      "宝鼎":"https://7365-severless-om62w-1302847609.tcb.qcloud.la/wordImg/%E6%B3%95%E9%BC%8E1.png?sign=f4783b0660fd33cbd9ea75cfae026628&t=1600741092",
      "谢觉哉":"https://7365-severless-om62w-1302847609.tcb.qcloud.la/wordImg/%E8%B0%A2%E8%A7%89%E5%93%89%E9%93%9C%E5%83%8F1.png?sign=dd1fa2631ec5b481a6f76ff8428bc2e4&t=1600740331",
      "海子石":"https://7365-severless-om62w-1302847609.tcb.qcloud.la/wordImg/%E6%B5%B7%E5%AD%90%E7%9F%B31.png?sign=f4cddf132619a63697c79221a561e4e6&t=1600740991",
      "彭真":"https://7365-severless-om62w-1302847609.tcb.qcloud.la/wordImg/%E5%BD%AD%E7%9C%9F%E9%9B%95%E5%83%8F%201.png?sign=4d9b7dfe9551c51feb486a6e147cfa03&t=1600740921",
      "雷洁琼":"https://7365-severless-om62w-1302847609.tcb.qcloud.la/wordImg/%E9%9B%B7%E6%B4%81%E7%90%BC1.png?sign=61eec6d15e63a0461c49d867222c95d4&t=1600740941",
      "法治广场":"https://7365-severless-om62w-1302847609.tcb.qcloud.la/wordImg/%E6%B3%95%E6%B2%BB%E5%B9%BF%E5%9C%BA1.png?sign=d3e74a57fad6b995f601695b2ea4a871&t=1600741039",
    },
    pixelRatio: 3,
    bg_top: "https://qny.shabula.com/src/resource/changping_bg_top.png",
    bg_bottom: "https://qny.shabula.com/src/resource/changping_shanshui.png",
    bg_front_cloud:"https://qny.shabula.com/src/resouce/changping_bottom_front.png",
    bg_school_map:"https://qny.shabula.com/src/resource/changping_xiaoyuan.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var appInst = getApp();
    // console.log(appInst,'app')
    this.setData({
      pixelRatio: appInst.globalData.pixelRatio,
    });
  },
  goDetail(event) {
    // console.log(event.target.id);
    let currentId = event.target.id;
    wx.navigateTo({
      url: `/pages/detail/detail?currentId=${currentId}&curArea=2`,
      success: (result) => {},
      fail: () => {},
      complete: () => {},
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1,
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
