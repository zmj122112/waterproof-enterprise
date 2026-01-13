<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 用户信息
const userInfo = ref({
  name: '张三',
  phone: '13800138000',
  avatar: '/logo.png'
})

// 核心订单状态 - 统一分类
const orderStats = [
  { name: '待上门', icon: '⏰', type: 'pending-visit' },
  { name: '服务中', icon: '🛠️', type: 'in-progress' },
  { name: '待验收', icon: '📝', type: 'pending-inspection' },
  { name: '已完成', icon: '✅', type: 'completed' }
]

// 功能菜单 - 精简版
const tools = [
  { name: '地址管理', icon: '📍', path: '/c-mini/address-management' },
  { name: '联系客服', icon: '🎧', path: '/c-mini/exclusive-customer-service' },
  { name: '问题反馈', icon: '📝', path: '/c-mini/feedback' },
  { name: '设置', icon: '⚙️', path: '/c-mini/settings' }
]

// 查看全部订单
const viewAllOrders = () => {
  router.push('/c-mini/order-list')
}

// 查看特定状态订单
const viewOrdersByStatus = (type) => {
  router.push(`/c-mini/order-list?type=${type}`)
}

// 退出登录
const logout = () => {
  console.log('退出登录')
}
</script>

<template>
  <div class="user-center-page" style="background-color: #f3f4f6; min-height: 100vh;">
    <!-- 头部区域 - 统一风格设计 -->
    <div style="background-color: #CC0010; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding: 40px 20px 24px; display: flex; flex-direction: column; align-items: center; gap: 16px;">
      <div style="display: flex; align-items: center; gap: 12px;">
        <img :src="userInfo.avatar" alt="用户头像" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 2px solid white; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
        <div style="font-size: 18px; font-weight: 600; color: white;">{{ userInfo.name }}</div>
      </div>
    </div>

    <!-- 核心订单区 - 头部下方第一个卡片 -->
    <div style="margin: 16px 20px; background-color: white; border-radius: 12px; padding: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <div style="font-size: 16px; font-weight: 600; color: #111827;">我的订单</div>
        <div @click="viewAllOrders" style="font-size: 14px; color: #6b7280; cursor: pointer; display: flex; align-items: center; gap: 4px;">
          全部订单 <span style="font-size: 16px;">›</span>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
        <div 
          v-for="stat in orderStats" 
          :key="stat.name" 
          style="text-align: center; display: flex; flex-direction: column; align-items: center; cursor: pointer; padding: 8px 0; transition: all 0.3s ease;"
          @click="viewOrdersByStatus(stat.type)"
          @mouseenter="$event.target.style.backgroundColor = '#f9fafb'"
          @mouseleave="$event.target.style.backgroundColor = 'transparent'"
        >
          <div style="font-size: 24px; margin-bottom: 4px;">{{ stat.icon }}</div>
          <div style="font-size: 12px; color: #6b7280;">{{ stat.name }}</div>
        </div>
      </div>
    </div>

    <!-- 功能菜单区 - 瘦身版 -->
    <div style="margin: 0 20px 16px; background-color: white; border-radius: 12px; padding: 16px;">
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
        <div 
          v-for="tool in tools" 
          :key="tool.name" 
          style="display: flex; align-items: center; gap: 12px; cursor: pointer; padding: 12px; border-radius: 8px; transition: all 0.3s ease;"
          @click="router.push(tool.path)"
          @mouseenter="$event.target.style.backgroundColor = '#f9fafb'"
          @mouseleave="$event.target.style.backgroundColor = 'transparent'"
        >
          <div style="font-size: 20px; width: 24px; text-align: center;">{{ tool.icon }}</div>
          <div style="font-size: 14px; color: #111827; font-weight: 500;">{{ tool.name }}</div>
          <div style="margin-left: auto; font-size: 16px; color: #d1d5db;">›</div>
        </div>
      </div>
    </div>

    <!-- 底部操作 - 简化版 -->
    <div style="padding: 0 20px 24px;">
      <button 
        type="button" 
        style="width: 100%; background-color: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; font-size: 14px; color: #6b7280; cursor: pointer; transition: all 0.3s ease;"
        @click="logout"
        @mouseenter="$event.target.style.backgroundColor = '#f9fafb'"
        @mouseleave="$event.target.style.backgroundColor = 'white'"
      >
        退出登录
      </button>
    </div>
  </div>
</template>

<style scoped>
.user-center-page {
  padding-bottom: 80px; /* 为底部导航栏留出空间 */
}
</style>