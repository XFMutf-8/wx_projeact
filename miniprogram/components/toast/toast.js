// components/toast/toast.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    message: {
     type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    visible : false

  },

  /**
   * 组件的方法列表
   */
  methods: {
    showToast(){
      this.setData({
        visible : true
      })
      setTimeout(() => {
        this.setData({
          visible : false
        })
      },2000)
    }
    
  }
})
