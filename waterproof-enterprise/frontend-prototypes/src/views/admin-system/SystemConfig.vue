<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

// 系统配置数据
const systemConfig = reactive({
  systemName: '防水工程管理系统',
  systemVersion: 'v1.0.0',
  companyName: '防水工程有限公司',
  contactPhone: '400-123-4567',
  contactEmail: 'support@waterproof.com',
  defaultLanguage: 'zh-CN',
  themeColor: '#409EFF',
  sessionTimeout: 30,
  enableCaptcha: true,
  enableTwoFactorAuth: false
})

// 配置分组选项
const configGroups = [
  { label: '基本配置', value: 'basic' },
  { label: '安全配置', value: 'security' },
  { label: '邮件配置', value: 'email' },
  { label: '短信配置', value: 'sms' }
]

// 当前激活的配置分组
const activeGroup = ref('basic')

// 保存配置
const saveConfig = () => {
  // 这里可以添加保存配置的逻辑
  ElMessage.success('配置保存成功')
  console.log('保存系统配置:', systemConfig)
}

// 重置配置
const resetConfig = () => {
  // 这里可以添加重置配置的逻辑
  ElMessage.warning('配置重置功能待实现')
}
</script>

<template>
  <div class="system-config-container">
    <el-card class="system-config-card">
      <template #header>
        <div class="card-header">
          <h2 class="card-title">系统配置管理</h2>
          <div class="header-buttons">
            <el-button @click="resetConfig">重置</el-button>
            <el-button type="primary" @click="saveConfig">保存配置</el-button>
          </div>
        </div>
      </template>
      
      <!-- 配置分组标签页 -->
      <div class="config-tabs">
        <el-tabs v-model="activeGroup" type="card">
          <el-tab-pane 
            v-for="group in configGroups" 
            :key="group.value" 
            :label="group.label" 
            :name="group.value"
          >
            <!-- 基本配置 -->
            <el-form 
              v-if="activeGroup === 'basic'" 
              :model="systemConfig" 
              label-position="top" 
              style="max-width: 600px;"
            >
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="系统名称" required>
                    <el-input v-model="systemConfig.systemName" placeholder="请输入系统名称" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="系统版本">
                    <el-input v-model="systemConfig.systemVersion" placeholder="请输入系统版本" disabled />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="公司名称" required>
                    <el-input v-model="systemConfig.companyName" placeholder="请输入公司名称" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系电话" required>
                    <el-input v-model="systemConfig.contactPhone" placeholder="请输入联系电话" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系邮箱" required>
                    <el-input v-model="systemConfig.contactEmail" placeholder="请输入联系邮箱" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="默认语言">
                    <el-select v-model="systemConfig.defaultLanguage" placeholder="请选择默认语言">
                      <el-option label="中文(简体)" value="zh-CN" />
                      <el-option label="中文(繁体)" value="zh-TW" />
                      <el-option label="English" value="en" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="主题颜色">
                    <div class="theme-color-picker">
                      <el-color-picker v-model="systemConfig.themeColor" show-alpha />
                      <span class="color-value">{{ systemConfig.themeColor }}</span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            
            <!-- 安全配置 -->
            <el-form 
              v-if="activeGroup === 'security'" 
              :model="systemConfig" 
              label-position="top" 
              style="max-width: 600px;"
            >
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="会话超时时间(分钟)" required>
                    <el-input-number 
                      v-model="systemConfig.sessionTimeout" 
                      :min="5" 
                      :max="120" 
                      :step="5" 
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="启用验证码">
                    <el-switch v-model="systemConfig.enableCaptcha" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="启用双因素认证">
                    <el-switch v-model="systemConfig.enableTwoFactorAuth" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            
            <!-- 邮件配置 -->
            <div v-if="activeGroup === 'email'" class="config-placeholder">
              <el-icon class="placeholder-icon"><message /></el-icon>
              <p>邮件配置功能待实现</p>
            </div>
            
            <!-- 短信配置 -->
            <div v-if="activeGroup === 'sms'" class="config-placeholder">
              <el-icon class="placeholder-icon"><comment /></el-icon>
              <p>短信配置功能待实现</p>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.system-config-container {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.header-buttons {
  display: flex;
  gap: 12px;
}

.config-tabs {
  margin-top: 20px;
}

.theme-color-picker {
  display: flex;
  align-items: center;
  gap: 12px;
}

.color-value {
  font-family: monospace;
  color: #606266;
}

.config-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  color: #909399;
}

.placeholder-icon {
  font-size: 48px;
  margin-bottom: 16px;
}
</style>