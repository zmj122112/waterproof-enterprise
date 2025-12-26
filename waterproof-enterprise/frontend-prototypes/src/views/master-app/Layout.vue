<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Bell, Message, Document, Check, Medal } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

// 底部导航项
const menuItems = [
  { name: '工单接收', path: '/master-app/work-order-receive', icon: Message },
  { name: '施工记录', path: '/master-app/construction-record', icon: Document },
  { name: '完工确认', path: '/master-app/completion-confirmation', icon: Check },
  { name: '积分中心', path: '/master-app/score-center', icon: Medal }
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
  <div class="master-app-layout">
    <!-- 页面内容 -->
    <div class="master-app-content">
      <router-view />
    </div>
    
    <!-- 底部导航栏 -->
    <div class="tab-bar" style="position: fixed; bottom: 0; left: 0; width: 100%; z-index: 9999; background: white; border-top: 1px solid #eee; display: flex; justify-content: space-around; padding: 8px 0 env(safe-area-inset-bottom); height: auto; min-height: 56px; box-shadow: 0 -2px 10px rgba(0,0,0,0.05); box-sizing: border-box; overflow: visible;">
      <div v-for="item in menuItems" :key="item.path" @click="navigate(item.path)" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; gap: 3px; padding: 0;">
        <!-- 图标 -->
        <component :is="item.icon" :style="isActive(item.path) ? 'width: 24px; height: 24px; color: #E60012; flex-shrink: 0;' : 'width: 24px; height: 24px; color: #9CA3AF; flex-shrink: 0;'" />
        <!-- 文字 -->
        <span :style="isActive(item.path) ? 'color: #E60012; font-size: 10px; font-weight: bold; line-height: 14px; display: block;' : 'color: #9CA3AF; font-size: 10px; font-weight: normal; line-height: 14px; display: block;'">
          {{ item.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.master-app-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f5f7fa;
}

/* 页面内容 */
.master-app-content {
  flex: 1;
  overflow: auto;
  padding: 0 16px 80px; /* 为底部菜单留出空间 */
  box-sizing: border-box;
  background-color: #f5f7fa;
}
</style>