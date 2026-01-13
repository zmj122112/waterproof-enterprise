// pages/user-center/index.js - 个人中心页面逻辑
Page({
  data: {
    // 用户信息
    userInfo: null,
    hasLogin: false
  },

  onLoad() {
    // 页面加载时执行
    console.log('个人中心页面加载');
    // 检查登录状态
    this.checkLoginStatus();
  },

  // 检查登录状态
  checkLoginStatus() {
    // 实际项目中应该从本地存储或全局状态获取
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        hasLogin: true
      });
    }
  },

  // 登录/注册
  login() {
    // 实际项目中应该调用微信登录API
    wx.showModal({
      title: '提示',
      content: '登录功能正在开发中，敬请期待',
      showCancel: false
    });
  },

  // 跳转到订单列表
  goToOrderList(e) {
    const type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: `/pages/order-list/index?type=${type}`
    });
  },

  // 跳转到地址管理
  goToAddress() {
    wx.showModal({
      title: '提示',
      content: '地址管理功能正在开发中，敬请期待',
      showCancel: false
    });
  },

  // 跳转到优惠券中心
  goToCoupon() {
    wx.showModal({
      title: '提示',
      content: '优惠券功能正在开发中，敬请期待',
      showCancel: false
    });
  },

  // 跳转到发票中心
  goToInvoice() {
    wx.showModal({
      title: '提示',
      content: '发票功能正在开发中，敬请期待',
      showCancel: false
    });
  },

  // 跳转到设置
  goToSettings() {
    wx.showModal({
      title: '提示',
      content: '设置功能正在开发中，敬请期待',
      showCancel: false
    });
  }
});