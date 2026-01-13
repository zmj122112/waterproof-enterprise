// pages/repair-estimate/index.js - 一键报修页面逻辑
Page({
  data: {
    // 选中的服务类型
    selectedServiceType: 'repair',
    // 时间选择数组
    timeArray: ['今天', '明天', '后天', '自定义时间'],
    timeIndex: 0,
    // 表单数据
    contactName: '',
    phoneNumber: '',
    houseAddress: '',
    remark: ''
  },

  onLoad() {
    // 页面加载时执行
    console.log('一键报修页面加载');
  },

  // 返回上一页
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  // 选择服务类型
  selectServiceType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      selectedServiceType: type
    });
  },

  // 时间选择器改变事件
  bindTimeChange(e) {
    this.setData({
      timeIndex: e.detail.value
    });
  },

  // 联系人输入事件
  bindContactNameInput(e) {
    this.setData({
      contactName: e.detail.value
    });
  },

  // 联系电话输入事件
  bindPhoneNumberInput(e) {
    this.setData({
      phoneNumber: e.detail.value
    });
  },

  // 房屋地址输入事件
  bindHouseAddressInput(e) {
    this.setData({
      houseAddress: e.detail.value
    });
  },

  // 备注输入事件
  bindRemarkInput(e) {
    this.setData({
      remark: e.detail.value
    });
  },

  // 提交表单
  submitForm() {
    // 表单验证
    if (!this.data.contactName) {
      wx.showToast({
        title: '请输入联系人姓名',
        icon: 'none'
      });
      return;
    }

    if (!this.data.phoneNumber) {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none'
      });
      return;
    }

    if (!this.data.houseAddress) {
      wx.showToast({
        title: '请输入房屋地址',
        icon: 'none'
      });
      return;
    }

    // 提交成功
    wx.showToast({
      title: '预约信息提交成功，项目经理将尽快与您联系！',
      icon: 'success',
      duration: 2000
    });

    // 清空表单
    this.setData({
      contactName: '',
      phoneNumber: '',
      houseAddress: '',
      remark: ''
    });

    console.log('提交的表单数据:', this.data);
  }
});