<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 当前选中的索引（支持外部设置）
const selected = ref(0)

// 获取当前路由
const getCurrentRoute = () => {
  return getCurrentPages()[getCurrentPages().length - 1].route
}

// 底部导航项
const tabBarItems = [
  {
    pagePath: '/pages/index/index',
    text: '首页',
    icon: '🏠',
    selectedIcon: '🏠'
  },
  {
    pagePath: '/pages/repair/estimate',
    text: '一键报修',
    icon: '📞',
    selectedIcon: '📞'
  },
  {
    pagePath: '/pages/user/index',
    text: '我的',
    icon: '👤',
    selectedIcon: '👤'
  }
]

// 计算当前选中的索引
const currentIndex = computed(() => {
  // 优先使用外部设置的selected值
  if (selected.value >= 0 && selected.value < tabBarItems.length) {
    return selected.value
  }
  
  // 否则根据当前路由计算
  const currentRoute = getCurrentRoute()
  const index = tabBarItems.findIndex(item => item.pagePath === `/${currentRoute}`)
  return index !== -1 ? index : 0
})

// 导航跳转
const switchTab = (index) => {
  const item = tabBarItems[index]
  if (item) {
    uni.switchTab({
      url: item.pagePath
    })
  }
}

// 一键报修跳转
const goToRepair = () => {
  uni.switchTab({
    url: '/pages/repair/estimate'
  })
}

// 支持外部调用的setData方法（必须命名为setData）
const setData = (data) => {
  if (data.selected !== undefined) {
    selected.value = data.selected
  }
}

// 暴露setData方法，供页面调用
defineExpose({
  setData
})
</script>

<template>
  <view class="custom-tab-bar">
    <!-- 左侧：首页 -->
    <view 
      class="tab-bar-item" 
      :class="{ active: currentIndex === 0 }"
      @click="switchTab(0)"
    >
      <text class="tab-bar-icon">{{ tabBarItems[0].icon }}</text>
      <text class="tab-bar-text">{{ tabBarItems[0].text }}</text>
    </view>

    <!-- 中间占位 -->
    <view class="tab-bar-middle"></view>

    <!-- 右侧：我的 -->
    <view 
      class="tab-bar-item" 
      :class="{ active: currentIndex === 2 }"
      @click="switchTab(2)"
    >
      <text class="tab-bar-icon">{{ tabBarItems[2].icon }}</text>
      <text class="tab-bar-text">{{ tabBarItems[2].text }}</text>
    </view>

    <!-- 凸起的一键报修按钮 -->
    <view class="repair-button" @click="goToRepair">
      <text class="repair-icon">{{ tabBarItems[1].icon }}</text>
      <text class="repair-text">{{ tabBarItems[1].text }}</text>
    </view>
  </view>
</template>

<style scoped>
.custom-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  padding: 0 20px;
  box-sizing: border-box;
}

.tab-bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex: 1;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-bar-item.active .tab-bar-icon,
.tab-bar-item.active .tab-bar-text {
  color: #E60012;
  font-weight: bold;
}

.tab-bar-icon {
  font-size: 24px;
  color: #9CA3AF;
}

.tab-bar-text {
  font-size: 12px;
  color: #9CA3AF;
}

.tab-bar-middle {
  flex: 1;
}

/* 凸起的一键报修按钮 */
.repair-button {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%) translateY(-50%);
  width: 64px;
  height: 64px;
  background-color: #E60012;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(230, 0, 18, 0.4);
  cursor: pointer;
  gap: 0px;
  transition: all 0.3s ease;
}

.repair-button:hover {
  transform: translateX(-50%) translateY(-55%) !important;
}

.repair-icon {
  font-size: 28px;
  color: white;
}

.repair-text {
  font-size: 12px;
  color: white;
  font-weight: bold;
  margin-top: -2px;
}
</style>