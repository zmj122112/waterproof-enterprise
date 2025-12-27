<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { User, Setting, Document, Location, Ticket, Service } from '@element-plus/icons-vue'

const router = useRouter()

// 用户信息
const userInfo = ref({
  name: '张三',
  phone: '13800138000',
  avatar: '/logo.png'
})

// 订单数据
const orderStats = [
  { name: '待付款', count: 0, icon: Document },
  { name: '待上门', count: 1, icon: Document },
  { name: '施工中', count: 0, icon: Document },
  { name: '待评价', count: 2, icon: Document }
]

// 常用工具
const tools = [
  { name: '我的工单', icon: Document, path: '/c-mini/work-order-progress' },
  { name: '地址管理', icon: Location, path: '/c-mini/address-management' },
  { name: '优惠券', icon: Ticket, path: '/c-mini/coupon-center' },
  { name: '专属客服', icon: Service, path: '/c-mini/exclusive-customer-service' },
  { name: '发票中心', icon: Document, path: '/c-mini/invoice-center' },
  { name: '设置', icon: Setting, path: '/c-mini/settings' }
]

// 查看全部订单
const viewAllOrders = () => {
  router.push('/c-mini/work-order-progress')
}

// 退出登录
const logout = () => {
  // 这里可以添加退出登录逻辑
  console.log('退出登录')
}
</script>

<template>
  <div class="user-center-page" style="background-color: #f3f4f6; min-height: 100vh; position: relative;">
    <!-- 红色底部舞台 Header -->
    <div style="background-color: #CC0010; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding: 20px 20px 30px; text-align: center; position: relative; overflow: hidden;">
      <!-- 用户信息 -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <div style="width: 24px;"></div> <!-- 占位 -->
        <div style="color: white; font-size: 20px; font-weight: 700;">个人中心</div>
        <div style="width: 24px;"></div> <!-- 占位 -->
      </div>
      
      <div style="display: flex; align-items: center; gap: 12px; justify-content: center;">
        <img :src="userInfo.avatar" alt="用户头像" style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid white; background-color: white; object-fit: cover; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <div style="font-size: 18px; font-weight: 700; color: white;">{{ userInfo.name }}</div>
          <div style="font-size: 12px; background-color: rgba(255, 255, 255, 0.2); padding: 2px 10px; border-radius: 12px; color: white; display: inline-block;">70年品牌见证官</div>
        </div>
      </div>
    </div>

    <!-- 订单状态栏 - 浮动白色卡片 -->
    <div style="position: relative; z-index: 10; margin: -20px 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <div style="font-size: 16px; font-weight: 600; color: #111827;">我的订单</div>
        <div @click="viewAllOrders" style="font-size: 14px; color: #E60012; cursor: pointer; display: flex; align-items: center; gap: 4px;">
          全部订单 <span style="font-size: 16px;">›</span>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
        <div 
          v-for="stat in orderStats" 
          :key="stat.name" 
          style="text-align: center; display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: all 0.3s ease;"
          @click="() => {
            let type = '';
            if (stat.name === '待付款') type = 'pending-payment';
            if (stat.name === '待上门') type = 'pending-visit';
            if (stat.name === '施工中') type = 'in-progress';
            if (stat.name === '待评价') type = 'pending-review';
            $router.push(`/c-mini/order-list?type=${type}`);
          }"
          @mouseenter="$event.target.style.transform = 'translateY(-2px)'"
          @mouseleave="$event.target.style.transform = ''"
        >
          <div style="width: 48px; height: 48px; border-radius: 12px; background-color: #fef2f2; display: flex; align-items: center; justify-content: center; color: #E60012; margin-bottom: 8px; transition: all 0.3s ease;">
            <component :is="stat.icon" size="24" />
          </div>
          <div style="font-size: 18px; font-weight: 700; color: #111827; margin-bottom: 4px;">{{ stat.count }}</div>
          <div style="font-size: 14px; color: #6b7280;">{{ stat.name }}</div>
        </div>
      </div>
    </div>

    <!-- 常用工具网格 - 浮动白色卡片 -->
    <div style="background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 24px; margin: 0 20px 20px;">
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
        <div 
          v-for="tool in tools" 
          :key="tool.name" 
          style="display: flex; flex-direction: column; align-items: center; gap: 12px; cursor: pointer; transition: all 0.3s ease; padding: 16px 8px; border-radius: 12px; min-width: 80px;"
          @click="$router.push(tool.path)"
          @mouseenter="$event.target.style.backgroundColor = '#fef2f2'; $event.target.style.transform = 'translateY(-2px)'"
          @mouseleave="$event.target.style.backgroundColor = ''; $event.target.style.transform = ''"
        >
          <div style="width: 48px; height: 48px; border-radius: 12px; background-color: #fef2f2; display: flex; align-items: center; justify-content: center; color: #E60012; transition: all 0.3s ease;">
            <component :is="tool.icon" size="24" />
          </div>
          <div style="font-size: 14px; color: #111827; font-weight: 500;">{{ tool.name }}</div>
        </div>
      </div>
    </div>

    <!-- 底部操作 -->
    <div style="padding: 0 20px 24px;">
      <el-button type="danger" size="large" round style="width: 100%; display: block;" @click="logout">
        退出登录
      </el-button>
    </div>

    <!-- 品牌植入区 -->
    <div style="text-align: center; padding: 24px 20px;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 12px;">
        <div style="width: 64px; height: 64px; border-radius: 50%; background-color: #f3f4f6; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #9ca3af; font-weight: 700; font-size: 18px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);">
          <span>月星</span>
          <span style="font-size: 12px; font-weight: 400; margin-top: 2px;">1947</span>
        </div>
        <div style="font-size: 14px; color: #9ca3af; font-weight: 500;">月星防水 · 70年的历练</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-center-page {
  padding-bottom: 80px; /* 为底部导航栏留出空间 */
}
</style>