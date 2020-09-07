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
      let map = e.currentTarget.dataset.url
      let _this = this
      wx.downloadFile({
        url: map, //仅为示例，并非真实的资源
        success (res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            _this._hideModal()
            wx.saveImageToPhotosAlbum({　
              filePath: res.tempFilePath,
              success:(res) => {
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 2000
                })
          }
        })



          }
        }
      })

    }

  }
})