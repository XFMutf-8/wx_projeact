// components/tabBar/tabBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // tabbar
    selected: 0,
    tabBar: {
      activeIndex: 0,
      "list": [
        {
          "pagePath": "/pages/home/home",
          "iconPath": "/images/tab_icon11.png",
          "selectedIconPath": "/images/tab_icon1.png"
      },
      {
          "pagePath": "/pages/map/map",
          "iconPath": "/images/tab_icon22.png",
          "selectedIconPath": "/images/tab_icon2.png"
      },
      {
          "pagePath": "/pages/spotList/spotList",
          "iconPath": "/images/tab_icon33.png",
          "selectedIconPath": "/images/tab_icon3.png"
      },
      {
          "pagePath": "/pages/userCenter/userCenter",
          "iconPath": "/images/tab_icon44.png",
          "selectedIconPath": "/images/tab_icon4.png"
      }
      ]
    }, 
  },
  // observers: {
  //   'tabCartNumber': function (res) {
  //     wx.setStorageSync('__cartNumber__', res);
  //   }
  // },
  attached: function () {
    // 在组件实例进入页面节点树时执行
    // this.getCartNumber()
    this._getElementSize('.tabBarWrap').then(res => {
      let height = res.height
      wx.setStorageSync('__tabbarHeight__', height);
    })
    // this.resetCartNumber()
  },
 
  

  /**
   * 组件的方法列表
   */
  methods: {

    switchTab(e) {
      const data = e.currentTarget.dataset
      console.log(data,'eeoeee')
      const url = data.url
      this.setData({
        selected: data.index
      })
      wx.switchTab({
        url
      })
    },
    _getElementSize(element) {
      return new Promise((resolve, reject) => {
        this.createSelectorQuery().select(element).boundingClientRect(res => {
          console.log('----', res)
          resolve(res)
        }).exec()
      })

    },

  }
})