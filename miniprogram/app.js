//app.js
App({
  globalData: {
    pixelRatio : 3,
    isHeightIp : '',
    curMapList : [false,false],
    isPlay : false
  },
  onLaunch: function () {
    wx.getSystemInfo({
      success: (res) => {
        console.log(res.model)
        console.log(res.pixelRatio,'pix')
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        this.globalData.pixelRatio = res.pixelRatio
        
        if(res.model == 'iPhone XR' || res.model == 'iPhone 11'){
          this.globalData.pixelRatio = 3
        }
        // console.log(res.statusBarHeight)
        // this.globalData.statusBar = res.statusBarHeight; //状态栏高度
        // let custom = wx.getMenuButtonBoundingClientRect();//菜单按钮
        // this.globalData.custom = custom;
        // this.globalData.customBar = custom.bottom + custom.top - res.statusBarHeight;
      }
    })
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
  }
})
