// index.js - 微信小程序首页逻辑
Page({
  data: {
    // 轮播图数据
    carouselItems: [
      {
        id: 1,
        image: '/images/waterproof-1.png',
        title: '月星防水 始于1954',
        subtitle: '70年国企担当 专业坚守',
        link: '/c-mini/trust/background'
      },
      {
        id: 2,
        image: '/images/waterproof-2.png',
        title: '标准化工艺 · 拒绝复漏',
        subtitle: '9大施工流程，ISO质量认证',
        link: '/c-mini/trust/standard'
      },
      {
        id: 3,
        image: '/images/waterproof-3.jpg',
        title: '万千工程案例 · 见证实力',
        subtitle: '服务上海2000+小区，真实记录',
        link: '/c-mini/trust/cases'
      }
    ],
    // 核心服务数据
    coreServices: [
      { id: 1, title: '卫生间漏水', icon: '💧' },
      { id: 2, title: '厨房漏水', icon: '🍳' },
      { id: 3, title: '屋顶补漏', icon: '🏠' },
      { id: 4, title: '阳台漏水', icon: '☀️' },
      { id: 5, title: '外墙防水', icon: '🏢' },
      { id: 6, title: '其他修缮', icon: '🔨' }
    ],
    // 客户评价
    customerReviews: [
      { id: 1, name: '张先生', content: '师傅很专业，服务态度好。', rating: 5, project: '卫生间维修' },
      { id: 2, name: '李女士', content: '国企背景果然不一样，推荐！', rating: 5, project: '屋顶补漏' }
    ]
  },

  onLoad() {
    // 页面加载时执行
    console.log('首页加载');
  },

  // 跳转到报修/预约页面
  goToRepairEstimate() {
    wx.navigateTo({
      url: '/pages/repair-estimate/index'
    });
  },

  // 跳转到个人中心
  goToUserCenter() {
    wx.navigateTo({
      url: '/pages/user-center/index'
    });
  },

  // 跳转到链接
  goToLink(e) {
    const link = e.currentTarget.dataset.link;
    // 简单处理链接跳转，实际需要根据链接类型进行处理
    wx.navigateTo({
      url: '/pages/trust-detail/index'
    });
  },

  // 跳转到师傅列表
  goToMasterList() {
    wx.navigateTo({
      url: '/pages/master-list/index'
    });
  },

  // 跳转到产品列表
  goToProductList() {
    wx.navigateTo({
      url: '/pages/product-list/index'
    });
  },

  // 跳转到客户评价列表
  goToCustomerReviewList() {
    wx.navigateTo({
      url: '/pages/order-list/index'
    });
  }
});