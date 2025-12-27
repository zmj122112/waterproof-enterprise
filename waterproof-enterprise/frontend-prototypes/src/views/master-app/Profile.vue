<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 用户信息
const userInfo = ref({
  name: '李师傅',
  phone: '13800138000',
  avatar: '李',
  level: '金牌师傅',
  score: 1250,
  completedOrders: 89,
  joinDate: '2022-01-15'
})

// 编辑模式
const isEditing = ref(false)

// 保存修改
const saveChanges = () => {
  isEditing.value = false
  ElMessage.success('个人信息修改成功')
}

// 取消编辑
const cancelEdit = () => {
  isEditing.value = false
}

// 开始编辑
const startEdit = () => {
  isEditing.value = true
}
</script>

<template>
  <div class="profile-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
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
        
        <div class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">个人信息</div>
      </div>
    </div>

    <!-- 个人信息卡片 - 浮动白色卡片 -->
    <div style="margin: -20px 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <!-- 头像和基本信息 -->
      <div style="display: flex; align-items: center; margin-bottom: 24px;">
        <div style="width: 80px; height: 80px; background-color: #E60012; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: bold; margin-right: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          {{ userInfo.avatar }}
        </div>
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <div v-if="!isEditing" style="font-size: 20px; font-weight: 600; color: #111827; margin-right: 8px;">{{ userInfo.name }}</div>
            <el-input 
              v-else 
              v-model="userInfo.name" 
              placeholder="请输入姓名" 
              style="width: 160px;"
            />
          </div>
          <div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">{{ userInfo.phone }}</div>
          <div :style="{
            'font-size': '14px',
            'padding': '2px 8px',
            'border-radius': '10px',
            'display': 'inline-block',
            'font-weight': '500',
            'color': userInfo.level === '钻石师傅' ? '#D4AF37' : 
                     userInfo.level === '金牌师傅' ? '#FFD700' : 
                     userInfo.level === '银牌师傅' ? '#C0C0C0' : 
                     userInfo.level === '铜牌师傅' ? '#CD7F32' : '#A9A9A9',
            'background-color': userInfo.level === '钻石师傅' ? '#FFF8DC' : 
                                 userInfo.level === '金牌师傅' ? '#FFF3E0' : 
                                 userInfo.level === '银牌师傅' ? '#F5F5F5' : 
                                 userInfo.level === '铜牌师傅' ? '#FFF0E6' : '#F9F9F9'
          }">
            {{ userInfo.level }}
          </div>
        </div>
      </div>

      <!-- 个人信息详情 -->
      <div style="margin-bottom: 24px;">
        <div style="margin-bottom: 16px;">
          <div style="font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 16px;">基本信息</div>
          
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <!-- 手机号 -->
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center;">
                <div style="width: 80px; font-weight: 500; color: #111827;">手机号：</div>
                <div v-if="!isEditing" style="font-size: 14px; color: #6b7280;">{{ userInfo.phone }}</div>
                <el-input 
                  v-else 
                  v-model="userInfo.phone" 
                  placeholder="请输入手机号" 
                  style="width: 200px;"
                />
              </div>
            </div>
            
            <!-- 积分 -->
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center;">
                <div style="width: 80px; font-weight: 500; color: #111827;">积分：</div>
                <div style="font-size: 14px; color: #E60012; font-weight: 600;">{{ userInfo.score }}</div>
              </div>
            </div>
            
            <!-- 已完成工单 -->
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center;">
                <div style="width: 80px; font-weight: 500; color: #111827;">已完成工单：</div>
                <div style="font-size: 14px; color: #6b7280;">{{ userInfo.completedOrders }} 单</div>
              </div>
            </div>
            
            <!-- 加入日期 -->
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center;">
                <div style="width: 80px; font-weight: 500; color: #111827;">加入日期：</div>
                <div style="font-size: 14px; color: #6b7280;">{{ userInfo.joinDate }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div style="display: flex; gap: 12px;">
        <el-button 
          v-if="!isEditing" 
          type="primary" 
          round 
          size="default" 
          style="flex: 1; height: 44px; font-size: 16px; background-color: #E60012; border-color: #E60012;"
          @click="startEdit"
        >
          编辑信息
        </el-button>
        <div v-else style="display: flex; gap: 12px; width: 100%;">
          <el-button 
            type="primary" 
            round 
            size="default" 
            style="flex: 1; height: 44px; font-size: 16px; background-color: #E60012; border-color: #E60012;"
            @click="saveChanges"
          >
            保存修改
          </el-button>
          <el-button 
            type="danger" 
            round 
            size="default" 
            style="flex: 1; height: 44px; font-size: 16px;"
            @click="cancelEdit"
          >
            取消编辑
          </el-button>
        </div>
      </div>
    </div>

    <!-- 账号安全提示卡片 -->
    <div style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <div style="display: flex; align-items: center; margin-bottom: 12px;">
        <div style="width: 40px; height: 40px; background-color: #fef2f2; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E60012" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        </div>
        <div style="font-size: 16px; font-weight: 600; color: #111827;">账号安全</div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px; padding-left: 52px;">
        <div style="font-size: 14px; color: #6b7280;">为了保障您的账号安全，建议您：</div>
        <div style="font-size: 14px; color: #6b7280;">• 定期修改密码</div>
        <div style="font-size: 14px; color: #6b7280;">• 绑定常用手机号</div>
        <div style="font-size: 14px; color: #6b7280;">• 不要向他人泄露账号信息</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 移除旧样式，使用内联样式替代 */
</style>