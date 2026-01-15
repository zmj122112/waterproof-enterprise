## 修改计划

### 1. 标签替换
- 将所有 `<div>` 替换为 `<view>`
- 将所有 `<span>` 替换为 `<text>`
- 将 `<img>` 替换为 `<image>`

### 2. 组件替换
- 该文件中未使用Element Plus组件，无需删除
- 无轮播图，无需替换为 `<swiper>` 和 `<swiper-item>`

### 3. 样式调整
- 将所有px单位替换为rpx（2px≈1rpx）
- 移除hover效果（小程序不支持mouseenter和mouseleave事件）
- 调整颜色和字体大小，确保在小程序中显示正常

### 4. 路由逻辑替换
- 删除 `import { useRouter } from 'vue-router'`
- 将 `router.push` 替换为uni-app导航方法：
  - 查看全部订单：使用 `uni.navigateTo`
  - 查看特定状态订单：使用 `uni.navigateTo`
  - 功能菜单跳转：使用 `uni.navigateTo`

### 5. 其他调整
- 确保事件处理符合小程序规范
- 调整图片路径，确保能在小程序中正确访问

### 6. 最终检查
- 确保所有修改符合uni-app和微信小程序规范
- 确保代码结构清晰，易于维护