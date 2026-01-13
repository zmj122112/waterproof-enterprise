// app.js - 微信小程序入口文件
App({
  onLaunch() {
    // 小程序启动时执行
    console.log('小程序启动')
    
    // 初始化全局数据
    this.globalData = {
      userInfo: null,
      hasLogin: false
    }
  },
  
  globalData: {
    userInfo: null,
    hasLogin: false
  }
})