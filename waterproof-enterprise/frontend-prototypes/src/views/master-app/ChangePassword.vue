<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

// 密码表单
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 表单验证规则
const validateNewPassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('新密码长度不能少于6位'))
  } else if (value === passwordForm.oldPassword) {
    callback(new Error('新密码不能与原密码相同'))
  } else {
    callback()
  }
}

const validateConfirmPassword = (rule, value, callback) => {
  if (value !== passwordForm.newPassword) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const rules = {
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { validator: validateNewPassword, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
}

// 表单引用
const formRef = ref(null)

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid) => {
    if (valid) {
      // 模拟提交
      ElMessage.success('密码修改成功')
      // 重置表单
      formRef.value.resetFields()
    } else {
      ElMessage.error('请检查表单信息')
    }
  })
}

// 重置表单
const resetForm = () => {
  formRef.value?.resetFields()
}
</script>

<template>
  <div class="change-password-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
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
        
        <div class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">修改密码</div>
      </div>
    </div>

    <!-- 密码修改表单卡片 - 浮动白色卡片 -->
    <div style="margin: -20px 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 20px; position: relative; z-index: 10;">
      <el-form 
        ref="formRef" 
        :model="passwordForm" 
        :rules="rules" 
        label-position="top"
        style="width: 100%;"
      >
        <!-- 原密码 -->
        <el-form-item label="原密码" prop="oldPassword">
          <el-input 
            v-model="passwordForm.oldPassword" 
            type="password" 
            placeholder="请输入原密码" 
            show-password
            style="width: 100%;"
          />
        </el-form-item>
        
        <!-- 新密码 -->
        <el-form-item label="新密码" prop="newPassword">
          <el-input 
            v-model="passwordForm.newPassword" 
            type="password" 
            placeholder="请输入新密码" 
            show-password
            style="width: 100%;"
          />
          <div style="font-size: 12px; color: #9ca3af; margin-top: 8px;">
            密码长度不能少于6位，建议包含字母和数字
          </div>
        </el-form-item>
        
        <!-- 确认新密码 -->
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input 
            v-model="passwordForm.confirmPassword" 
            type="password" 
            placeholder="请再次输入新密码" 
            show-password
            style="width: 100%;"
          />
        </el-form-item>
        
        <!-- 操作按钮 -->
        <div style="display: flex; gap: 12px; margin-top: 24px;">
          <el-button 
            type="primary" 
            round 
            size="default" 
            style="flex: 1; height: 44px; font-size: 16px; background-color: #E60012; border-color: #E60012;"
            @click="submitForm"
          >
            确认修改
          </el-button>
          <el-button 
            type="danger" 
            round 
            size="default" 
            style="flex: 1; height: 44px; font-size: 16px;"
            @click="resetForm"
          >
            重置
          </el-button>
        </div>
      </el-form>
    </div>

    <!-- 安全提示卡片 -->
    <div style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <div style="font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 12px;">安全提示</div>
      <div style="font-size: 14px; color: #6b7280; line-height: 1.6;">
        <p style="margin-bottom: 8px;">• 密码修改后请妥善保管，不要向他人泄露</p>
        <p style="margin-bottom: 8px;">• 建议定期更换密码，保持账号安全</p>
        <p style="margin-bottom: 8px;">• 避免使用简单密码，如123456、生日等</p>
        <p>• 如忘记密码，请联系管理员重置</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 移除旧样式，使用内联样式替代 */
</style>