<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { User, Setting, Document, Lock, Bell, Help } from '@element-plus/icons-vue'

const router = useRouter()

// 用户信息
const userInfo = ref({
  name: '李师傅',
  phone: '13800138000',
  avatar: '李',
  level: '金牌师傅',
  score: 1250,
  completedOrders: 89
})

// 设置选项
const settings = [
  {
    category: '账号设置',
    items: [
      { name: '个人信息', icon: User, path: '/master-app/profile' },
      { name: '修改密码', icon: Lock, path: '/master-app/change-password' },
      { name: '绑定手机', icon: Lock, path: '/master-app/bind-phone' }
    ]
  },
  {
    category: '工单管理',
    items: [
      { name: '我的工单', icon: Document, path: '/master-app/my-orders' },
      { name: '施工记录', icon: Document, path: '/master-app/construction-records' },
      { name: '完工确认', icon: Document, path: '/master-app/completion-records' }
    ]
  },
  {
    category: '积分管理',
    items: [
      { name: '积分中心', icon: Bell, path: '/master-app/score-center' },
      { name: '积分商城', icon: Bell, path: '/master-app/score-mall' },
      { name: '兑换记录', icon: Bell, path: '/master-app/exchange-record' }
    ]
  },
  {
    category: '关于我们',
    items: [
      { name: '帮助中心', icon: Help, path: '/master-app/help-center' },
      { name: '关于月星', icon: Document, path: '/master-app/about-us' },
      { name: '隐私政策', icon: Lock, path: '/master-app/privacy-policy' },
      { name: '用户协议', icon: Document, path: '/master-app/user-agreement' }
    ]
  }
]

// 退出登录
const logout = () => {
  console.log('退出登录')
  // 这里可以添加退出登录逻辑
}
</script>

<template>
  <div class="personal-center-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
    <!-- 红色顶部区域 -->
    <div class="header-section" style="background-color: #CC0010; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding-top: 40px; padding-bottom: 30px; position: relative; z-index: 0;">
      <div class="header-content" style="padding: 0 20px;">
        <div class="brand-info" style="display: flex; align-items: center; margin-bottom: 16px;">
          <img src="/logo.png" class="logo-img" style="width: 40px; height: 40px; border-radius: 50%; background-color: white; padding: 2px; margin-right: 10px; object-fit: contain;" />
          <div class="brand-text">
            <div class="brand-name" style="color: white; font-size: 18px; font-weight: bold;">月星防水</div>
            <div class="brand-slogan" style="color: rgba(255,255,255,0.8); font-size: 12px;">Since 1947</div>
          </div>
        </div>
        
        <div class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">个人中心</div>
      </div>
    </div>

    <!-- 用户统计信息 - 浮动白色卡片 -->
    <div style="position: relative; z-index: 10; margin: -40px 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px;">
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
        <div style="text-align: center;">
          <div style="font-size: 24px; font-weight: 700; color: #111827; margin-bottom: 4px;">{{ userInfo.completedOrders }}</div>
          <div style="font-size: 14px; color: #6b7280;">已完成工单</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 24px; font-weight: 700; color: #111827; margin-bottom: 4px;">{{ userInfo.score }}</div>
          <div style="font-size: 14px; color: #6b7280;">积分</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 24px; font-weight: 700; color: #111827; margin-bottom: 4px;">{{ userInfo.level }}</div>
          <div style="font-size: 14px; color: #6b7280;">等级</div>
        </div>
      </div>
    </div>

    <!-- 设置选项 - 浮动白色卡片 -->
    <div style="background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; margin: 0 20px 20px;">
      <div 
        v-for="category in settings" 
        :key="category.category" 
        style="margin-bottom: 20px;"
      >
        <div style="font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #e5e7eb;">{{ category.category }}</div>
        
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div 
            v-for="item in category.items" 
            :key="item.name" 
            @click="router.push(item.path)" 
            style="display: flex; align-items: center; justify-content: space-between; padding: 12px; border-radius: 12px; transition: all 0.3s ease; cursor: pointer;"
            @mouseenter="$event.target.style.backgroundColor = '#fef2f2'"
            @mouseleave="$event.target.style.backgroundColor = ''"
          >
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 40px; height: 40px; background-color: #fef2f2; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #E60012;">
                <component :is="item.icon" size="20" />
              </div>
              <div style="font-size: 14px; font-weight: 500; color: #111827;">{{ item.name }}</div>
            </div>
            <div style="font-size: 16px; color: #9ca3af;">›</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 退出登录按钮 -->
    <div style="margin: 20px;">
      <el-button type="danger" round style="width: 100%;">
        退出登录
      </el-button>
    </div>
  </div>
</template>

<style scoped>
/* 空样式标签，确保Vue SFC格式正确 */
</style>