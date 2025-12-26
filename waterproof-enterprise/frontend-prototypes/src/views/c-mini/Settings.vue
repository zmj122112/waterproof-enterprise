<script setup>
// 设置页面
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Setting, User, Document, Lock, Bell, Help } from '@element-plus/icons-vue'

const router = useRouter()

// 用户信息
const userInfo = ref({
  name: '张三',
  phone: '13800138000',
  avatar: '/logo.png'
})

// 设置选项
const settings = [
  {
    category: '账号设置',
    items: [
      { name: '个人信息', icon: User, path: '/c-mini/user-profile' },
      { name: '修改密码', icon: Lock, path: '/c-mini/change-password' },
      { name: '绑定手机', icon: Lock, path: '/c-mini/bind-phone' }
    ]
  },
  {
    category: '通知设置',
    items: [
      { name: '消息通知', icon: Bell, path: '/c-mini/notification-settings' },
      { name: '工单提醒', icon: Bell, path: '/c-mini/work-order-notifications' }
    ]
  },
  {
    category: '关于我们',
    items: [
      { name: '帮助中心', icon: Help, path: '/c-mini/help-center' },
      { name: '关于月星', icon: Document, path: '/c-mini/about-us' },
      { name: '隐私政策', icon: Lock, path: '/c-mini/privacy-policy' },
      { name: '用户协议', icon: Document, path: '/c-mini/user-agreement' }
    ]
  }
]

// 返回个人中心
const goBack = () => {
  router.push('/c-mini/user-center')
}

// 退出登录
const logout = () => {
  // 这里可以添加退出登录逻辑
  console.log('退出登录')
}

onMounted(() => {
  console.log('设置页面加载')
})
</script>

<template>
  <div class="settings-page" style="background-color: #f3f4f6; min-height: 100vh;">
    <!-- 红色底部舞台 Header -->
    <div style="background-color: #E60012; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding: 20px 20px 30px; text-align: center; position: relative;">
      <a href="/c-mini/user-center" style="position: absolute; left: 10px; top: 10px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; cursor: pointer; z-index: 99999; background: rgba(255,255,255,0.1); border-radius: 50%; text-decoration: none;">
        <el-icon><ArrowLeft /></el-icon>
      </a>
      <div style="color: white; font-size: 20px; font-weight: 700; margin: 0;">设置</div>
    </div>

    <!-- 设置选项 - 浮动白色卡片 -->
    <div style="padding: 20px;">
      <div 
        v-for="category in settings" 
        :key="category.category" 
        style="background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; margin-bottom: 20px;"
      >
        <div style="font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #e5e7eb;">{{ category.category }}</div>
        
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div 
            v-for="item in category.items" 
            :key="item.name" 
            @click="$router.push(item.path)" 
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
      
      <!-- 退出登录按钮 -->
      <div style="margin-top: 40px;">
        <el-button type="danger" round style="width: 100%;" @click="logout">
          退出登录
        </el-button>
      </div>
      
      <!-- 版本信息 -->
      <div style="text-align: center; margin-top: 24px; font-size: 12px; color: #9ca3af;">
        版本号：v1.0.0<br>
        © 2025 月星防水 · 70年专业防水经验
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-page {
  padding-bottom: 80px; /* 为底部导航栏留出空间 */
}
</style>