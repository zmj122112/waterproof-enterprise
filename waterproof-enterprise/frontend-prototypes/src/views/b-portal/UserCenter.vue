<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 用户信息
const userInfo = ref({
  name: '企业管理员',
  companyName: '科技园区管理有限公司',
  phone: '13800138000',
  email: 'admin@example.com',
  address: '北京市朝阳区科技园区1号',
  createTime: '2024-01-10'
})

// 修改密码弹窗
const changePasswordVisible = ref(false)
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 打开修改密码弹窗
const openChangePasswordDialog = () => {
  changePasswordVisible.value = true
  passwordForm.value = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
}

// 修改密码
const changePassword = () => {
  // 这里可以添加表单验证
  changePasswordVisible.value = false
  ElMessage.success('密码修改成功')
  console.log('修改密码:', passwordForm.value)
}

// 保存用户信息
const saveUserInfo = () => {
  // 这里可以添加表单验证
  ElMessage.success('用户信息保存成功')
  console.log('保存用户信息:', userInfo.value)
}

// 退出登录
const logout = () => {
  ElMessage.info('退出登录功能待实现')
}
</script>

<template>
  <div class="user-center-container">
    <div class="page-header">
      <h1 class="page-title">个人中心</h1>
    </div>
    
    <!-- 用户信息卡片 -->
    <el-card class="user-info-card">
      <template #header>
        <h3 class="card-title">用户信息</h3>
      </template>
      
      <div class="user-info">
        <div class="user-avatar">
          <img src="https://picsum.photos/100/100?random=60" alt="user" class="avatar">
        </div>
        <div class="user-details">
          <div class="user-name">{{ userInfo.name }}</div>
          <div class="company-name">{{ userInfo.companyName }}</div>
        </div>
      </div>
      
      <div class="user-info-form">
        <el-row :gutter="16">
          <el-col :xs="12">
            <div class="info-item">
              <span class="label">联系电话：</span>
              <span class="value">{{ userInfo.phone }}</span>
            </div>
          </el-col>
          <el-col :xs="12">
            <div class="info-item">
              <span class="label">邮箱：</span>
              <span class="value">{{ userInfo.email }}</span>
            </div>
          </el-col>
          <el-col :xs="24">
            <div class="info-item">
              <span class="label">公司地址：</span>
              <span class="value">{{ userInfo.address }}</span>
            </div>
          </el-col>
          <el-col :xs="12">
            <div class="info-item">
              <span class="label">注册时间：</span>
              <span class="value">{{ userInfo.createTime }}</span>
            </div>
          </el-col>
        </el-row>
        
        <div class="action-buttons">
          <el-button type="primary" @click="saveUserInfo">保存修改</el-button>
        </div>
      </div>
    </el-card>
    
    <!-- 功能菜单 -->
    <el-card class="function-menu-card" style="margin-top: 16px;">
      <template #header>
        <h3 class="card-title">功能菜单</h3>
      </template>
      
      <div class="menu-list">
        <div class="menu-item" @click="openChangePasswordDialog">
          <el-icon class="menu-icon"><lock /></el-icon>
          <span class="menu-text">修改密码</span>
          <el-icon class="arrow-icon"><arrow-right /></el-icon>
        </div>
        <div class="menu-item">
          <el-icon class="menu-icon"><document-copy /></el-icon>
          <span class="menu-text">我的合同</span>
          <el-icon class="arrow-icon"><arrow-right /></el-icon>
        </div>
        <div class="menu-item">
          <el-icon class="menu-icon"><document-checked /></el-icon>
          <span class="menu-text">我的发票</span>
          <el-icon class="arrow-icon"><arrow-right /></el-icon>
        </div>
        <div class="menu-item">
          <el-icon class="menu-icon"><message /></el-icon>
          <span class="menu-text">消息中心</span>
          <el-icon class="arrow-icon"><arrow-right /></el-icon>
        </div>
        <div class="menu-item">
          <el-icon class="menu-icon"><info /></el-icon>
          <span class="menu-text">关于我们</span>
          <el-icon class="arrow-icon"><arrow-right /></el-icon>
        </div>
      </div>
    </el-card>
    
    <!-- 退出登录 -->
    <div class="logout-section" style="margin-top: 16px;">
      <el-button type="danger" block @click="logout">退出登录</el-button>
    </div>
    
    <!-- 修改密码弹窗 -->
    <el-dialog
      title="修改密码"
      v-model="changePasswordVisible"
      width="90%"
      :fullscreen="false"
    >
      <el-form
        :model="passwordForm"
        label-width="80px"
        size="large"
      >
        <el-form-item label="旧密码" required>
          <el-input v-model="passwordForm.oldPassword" type="password" placeholder="请输入旧密码" size="large" />
        </el-form-item>
        <el-form-item label="新密码" required>
          <el-input v-model="passwordForm.newPassword" type="password" placeholder="请输入新密码" size="large" />
        </el-form-item>
        <el-form-item label="确认密码" required>
          <el-input v-model="passwordForm.confirmPassword" type="password" placeholder="请确认新密码" size="large" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="large" @click="changePasswordVisible = false">取消</el-button>
          <el-button type="primary" size="large" @click="changePassword">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.user-center-container {
  padding: 0;
}

.page-header {
  margin-bottom: 16px;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  margin: 0;
}

.user-info-card {
  margin-bottom: 16px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 16px 0;
  margin-bottom: 16px;
  border-bottom: 1px solid #e8e8e8;
}

.user-avatar {
  margin-right: 16px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 4px;
}

.company-name {
  font-size: 14px;
  color: #666666;
}

.user-info-form {
  padding: 16px 0;
}

.info-item {
  display: flex;
  margin-bottom: 12px;
  font-size: 13px;
  align-items: center;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-item .label {
  width: 80px;
  font-weight: 500;
  color: #333333;
  margin-right: 8px;
}

.info-item .value {
  flex: 1;
  color: #666666;
  line-height: 1.5;
}

.action-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.function-menu-card {
  margin-bottom: 16px;
}

.menu-list {
  padding: 16px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #e8e8e8;
  cursor: pointer;
  transition: all 0.3s;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background-color: #f5f7fa;
  padding-left: 8px;
}

.menu-icon {
  font-size: 18px;
  color: #409eff;
  margin-right: 12px;
}

.menu-text {
  flex: 1;
  font-size: 14px;
  color: #333333;
}

.arrow-icon {
  font-size: 14px;
  color: #909399;
}

.logout-section {
  margin-top: 16px;
}

.logout-section .el-button {
  height: 44px;
  font-size: 14px;
}

.dialog-footer {
  display: flex;
  justify-content: stretch;
  gap: 8px;
}

.dialog-footer .el-button {
  flex: 1;
  height: 44px;
}
</style>