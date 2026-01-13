<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { House, Phone, User } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

// 底部导航项 - 仅保留3个入口
const navItems = [
  { name: '首页', path: '/c-mini/home', icon: House },
  { name: '一键报修', path: '/c-mini/repair-estimate', icon: Phone },
  { name: '我的', path: '/c-mini/user-center', icon: User }
]

// 检查当前路由是否激活
const isActive = (path) => {
  return route.path === path
}

// 导航跳转
const navigate = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="c-mini-layout">
    <!-- 页面内容 -->
    <div class="c-mini-content">
      <router-view />
    </div>
    
    <!-- 底部导航栏：强转化设计，凸起中间按钮 -->
    <!-- 将导航栏放回主容器内，确保只有一个根节点 -->
    <div class="tab-bar" style="position: fixed; bottom: 0; left: 0; right: 0; height: 60px; background: white; display: flex; justify-content: space-around; align-items: center; box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); z-index: 9999; padding: 0 20px; box-sizing: border-box;">
      <!-- 左侧：首页 -->
      <div class="nav-item" @click="navigate(navItems[0].path)" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; cursor: pointer; flex: 1; transition: all 0.3s ease;">
        <component :is="navItems[0].icon" :style="isActive(navItems[0].path) ? { width: '24px', height: '24px', color: '#E60012' } : { width: '24px', height: '24px', color: '#9CA3AF' }" />
        <span :style="isActive(navItems[0].path) ? { color: '#E60012', fontSize: '10px', fontWeight: 'bold' } : { color: '#9CA3AF', fontSize: '10px' }">
          {{ navItems[0].name }}
        </span>
      </div>

      <!-- 中间占位符 -->
      <div class="center-placeholder" style="flex: 1;"></div>

      <!-- 右侧：我的 -->
      <div class="nav-item" @click="navigate(navItems[2].path)" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; cursor: pointer; flex: 1; transition: all 0.3s ease;">
        <component :is="navItems[2].icon" :style="isActive(navItems[2].path) ? { width: '24px', height: '24px', color: '#E60012' } : { width: '24px', height: '24px', color: '#9CA3AF' }" />
        <span :style="isActive(navItems[2].path) ? { color: '#E60012', fontSize: '10px', fontWeight: 'bold' } : { color: '#9CA3AF', fontSize: '10px' }">
          {{ navItems[2].name }}
        </span>
      </div>

      <!-- 一键报修按钮：凸起悬浮大按钮 -->
      <div class="appointment-button" @click="navigate(navItems[1].path)" style="position: absolute; left: 50%; top: 0; transform: translateX(-50%) translateY(-50%); width: 64px; height: 64px; background-color: #E60012; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(230, 0, 18, 0.4); cursor: pointer; gap: 0px; z-index: 10000; transition: all 0.3s ease;">
        <component :is="navItems[1].icon" style="width: 28px; height: 28px; color: white;" />
        <span style="color: white; font-size: 12px; font-weight: bold; margin-top: -2px;">
          {{ navItems[1].name }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 页面容器 */
.c-mini-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

/* 内容区域 */
.c-mini-content {
  flex: 1;
  overflow: auto;
  padding: 0 16px 80px; /* 为底部导航栏留出空间 */
  box-sizing: border-box;
}

/* 预约按钮悬停效果 */
.appointment-button:hover {
  transform: translateX(-50%) translateY(-55%) !important;
}
</style>