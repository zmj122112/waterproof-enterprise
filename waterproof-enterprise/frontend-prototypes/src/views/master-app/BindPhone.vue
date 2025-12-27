<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

// 绑定手机表单
const bindPhoneForm = reactive({
  phone: '',
  verificationCode: ''
})

// 倒计时
const countdown = ref(0)
const isCounting = ref(false)

// 表单验证规则
const rules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  verificationCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 6, message: '验证码长度为6位', trigger: 'blur' }
  ]
}

// 表单引用
const formRef = ref(null)

// 发送验证码
const sendVerificationCode = async () => {
  if (!formRef.value) return
  
  await formRef.value.validateField('phone', (valid) => {
    if (valid === '') {
      // 模拟发送验证码
      ElMessage.success('验证码发送成功')
      startCountdown()
    }
  })
}

// 开始倒计时
const startCountdown = () => {
  countdown.value = 60
  isCounting.value = true
  
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      isCounting.value = false
    }
  }, 1000)
}

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid) => {
    if (valid) {
      // 模拟提交
      ElMessage.success('手机绑定成功')
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
  <div class="bind-phone-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
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
        
        <div class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">绑定手机</div>
      </div>
    </div>

    <!-- 绑定手机表单卡片 - 浮动白色卡片 -->
    <div style="margin: -20px 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 20px; position: relative; z-index: 10;">
      <el-form 
        ref="formRef" 
        :model="bindPhoneForm" 
        :rules="rules" 
        label-position="top"
        style="width: 100%;"
      >
        <!-- 手机号 -->
        <el-form-item label="手机号" prop="phone">
          <el-input 
            v-model="bindPhoneForm.phone" 
            placeholder="请输入手机号" 
            maxlength="11"
            style="width: 100%;"
          >
            <template #prepend>+86</template>
          </el-input>
        </el-form-item>
        
        <!-- 验证码 -->
        <el-form-item label="验证码" prop="verificationCode">
          <div style="display: flex; gap: 12px;">
            <el-input 
              v-model="bindPhoneForm.verificationCode" 
              placeholder="请输入验证码" 
              maxlength="6"
              style="flex: 1;"
            />
            <el-button 
              type="primary" 
              :disabled="isCounting" 
              @click="sendVerificationCode"
              style="width: 120px; height: 40px;"
            >
              {{ isCounting ? `${countdown}s后重发` : '发送验证码' }}
            </el-button>
          </div>
          <div style="font-size: 12px; color: #9ca3af; margin-top: 8px;">
            验证码将发送至您的手机，请注意查收
          </div>
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
            确认绑定
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

    <!-- 注意事项卡片 -->
    <div style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <div style="font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 12px;">注意事项</div>
      <div style="font-size: 14px; color: #6b7280; line-height: 1.6;">
        <p style="margin-bottom: 8px;">• 一个账号只能绑定一个手机号</p>
        <p style="margin-bottom: 8px;">• 绑定手机号后可用于登录和接收重要通知</p>
        <p style="margin-bottom: 8px;">• 如需要更换绑定手机号，请联系管理员</p>
        <p>• 验证码有效期为5分钟，请及时输入</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 移除旧样式，使用内联样式替代 */
</style>