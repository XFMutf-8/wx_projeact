// myModal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    url: {
      type: String,
      value: ''
    },
    // 是否自适应高度
    isAutoHeight : {
      type : Boolean,
      value : false
    }

  },
  attached: function () {
    // 在组件实例进入页面节点树时执行
    this._initAnimation()

  },

  /**
   * 组件的初始数据
   */
  data: {
    visible: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _initAnimation() {
      this.ani_Modal = wx.createAnimation({
        duration: 260,
        timingFunction: 'linear',
        delay: 0
      })
    },
    _hideModal: function () {
      this.ani_Modal.opacity(0).translate3d(0, 0, 0).step();
      this.setData({
        ModalAni: this.ani_Modal.export()
      },() =>{
        let timer = setTimeout(() =>{
          clearTimeout(timer)
          this.setData({
            visible : false
          })

        },260)
      })
      
    },
    _getElementSize(element) {
      return new Promise((resolve, reject) => {
        this.createSelectorQuery().select(element).boundingClientRect(res => {
          console.log('当前元素大小')
          console.log(res)
          resolve(res)
        }).exec()
      })
    },
    _showModal: function () {
      this.setData({
        visible: true
      })

      this._getElementSize('#Modal').then(res => {
        console.log(res.height, 'height----')

        this.setData({
          curHeight: res.height / 2 || 100,
        })
        console.log(this.data.curHeight)
        this.ani_Modal.opacity(1).translate3d(0, -res.height/2, 0).step();
        this.setData({
          ModalAni: this.ani_Modal.export()
        })

      })
    },
    downLoad(e){
      let map = e.currentTarget.dataset.url;
      let that = this;
      // 获取用户是否开启用户授权相册
      wx.getSetting({
          success(res) {
            // 如果没有则获取授权
            if (!res.authSetting['scope.writePhotosAlbum']) {
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success() {
                  wx.saveImageToPhotosAlbum({
                    filePath: map,
                    success() {
                      wx.showToast({
                        title: '保存成功'
                      })
                    },
                    fail() {
                      wx.showToast({
                        title: '保存失败',
                        icon: 'none'
                      })
                    }
                  })
                },
                fail() {
                // 如果用户拒绝过或没有授权，则再次打开授权窗口
                //（ps：微信api又改了现在只能通过button才能打开授权设置，以前通过openSet就可打开，下面有打开授权的button弹窗代码）
                  that.setData({
                    openSet: true
                  })
                }
              })
            } else {
              // 有则直接保存
              wx.saveImageToPhotosAlbum({
                filePath: map,
                success() {
                  wx.showToast({
                    title: '保存成功'
                  })
                },
                fail() {
                  wx.showToast({
                    title: '保存失败',
                    icon: 'none'
                  })
                }
              })
            }
          }
        });
    },
  }
})