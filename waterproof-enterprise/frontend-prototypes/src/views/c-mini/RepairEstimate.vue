<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

// 表单数据
const formData = ref({
  appointmentTime: '',
  contactName: '',
  phoneNumber: '',
  houseAddress: '',
  remark: ''
})

// 提交表单
const submitForm = () => {
  // 表单验证
  if (!formData.value.appointmentTime) {
    ElMessage.error('请选择预约时间')
    return
  }
  if (!formData.value.contactName) {
    ElMessage.error('请输入联系人姓名')
    return
  }
  if (!formData.value.phoneNumber) {
    ElMessage.error('请输入联系电话')
    return
  }
  if (!formData.value.houseAddress) {
    ElMessage.error('请输入房屋地址')
    return
  }
  
  // 提交成功
  ElMessage.success('预约信息提交成功，项目经理将尽快与您联系！')
  console.log('提交表单:', formData.value)
  
  // 清空表单
  formData.value = {
    appointmentTime: '',
    contactName: '',
    phoneNumber: '',
    houseAddress: '',
    remark: ''
  }
}
</script>

<template>
  <div class="repair-estimate-page" style="min-height: 100vh; background-color: #f5f7fa;">
    <!-- 顶部导航 -->
    <div class="top-nav" style="background-color: #CC0010; padding: 16px 20px; display: flex; align-items: center; color: white; position: sticky; top: 0; z-index: 100;">
      <div class="back-button" style="cursor: pointer; margin-right: 16px;" @click="router.back()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="white"/>
        </svg>
      </div>
      <div class="page-title" style="font-size: 18px; font-weight: bold; flex: 1; text-align: center; margin-right: 40px; color: white;">预约上门</div>
    </div>

    <!-- 表单容器 -->
    <div class="form-container" style="background: white; margin: 20px 16px; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <!-- 预约时间 -->
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; color: #333; font-size: 14px; font-weight: medium;">
          <span style="color: #E60012;">*</span> 预约时间
        </label>
        <select v-model="formData.appointmentTime" style="width: 100%; padding: 12px 16px; border: 1px solid #E5E7EB; border-radius: 8px; font-size: 14px; background: white;">
          <option value="">请选择预约时间</option>
          <option value="today">今天</option>
          <option value="tomorrow">明天</option>
          <option value="day_after_tomorrow">后天</option>
          <option value="custom">自定义时间</option>
        </select>
      </div>

      <!-- 联系人 -->
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; color: #333; font-size: 14px; font-weight: medium;">
          <span style="color: #E60012;">*</span> 联系人
        </label>
        <input v-model="formData.contactName" type="text" placeholder="请输入联系人姓名" style="width: 100%; padding: 12px 16px; border: 1px solid #E5E7EB; border-radius: 8px; font-size: 14px;">
      </div>

      <!-- 联系电话 -->
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; color: #333; font-size: 14px; font-weight: medium;">
          <span style="color: #E60012;">*</span> 联系电话
        </label>
        <input v-model="formData.phoneNumber" type="tel" placeholder="请输入联系电话" style="width: 100%; padding: 12px 16px; border: 1px solid #E5E7EB; border-radius: 8px; font-size: 14px;">
      </div>

      <!-- 房屋地址 -->
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; color: #333; font-size: 14px; font-weight: medium;">
          <span style="color: #E60012;">*</span> 房屋地址
        </label>
        <input v-model="formData.houseAddress" type="text" placeholder="请输入房屋地址" style="width: 100%; padding: 12px 16px; border: 1px solid #E5E7EB; border-radius: 8px; font-size: 14px;">
      </div>

      <!-- 备注 -->
      <div style="margin-bottom: 24px;">
        <label style="display: block; margin-bottom: 8px; color: #333; font-size: 14px; font-weight: medium;">备注</label>
        <input v-model="formData.remark" type="text" placeholder="请输入备注信息 (选填)" style="width: 100%; padding: 12px 16px; border: 1px solid #E5E7EB; border-radius: 8px; font-size: 14px;">
      </div>

      <!-- 提交按钮 -->
      <button @click="submitForm" style="width: 100%; background-color: #E60012; color: white; border: none; border-radius: 8px; padding: 16px; font-size: 16px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">
        提交预约
      </button>
    </div>

    <!-- 联系我们信息 -->
    <div class="contact-info" style="background: #FFF5F5; margin: 0 16px 20px; border-radius: 12px; padding: 20px; border: 1px solid #FEE2E2;">
      <h3 style="color: #111827; font-weight: 700; margin-bottom: 12px; font-size: 16px;">如何联系我们</h3>
      <p style="color: #6b7280; line-height: 1.6; margin-bottom: 12px; font-size: 14px;">提交成功后，项目经理将通过企业微信与您联系，请保持手机畅通</p>
      <p style="color: #6b7280; line-height: 1.6; margin-bottom: 16px; font-size: 14px;">您也可以直接扫码添加我们的企业微信，更快获得服务</p>
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12.5L6.75 14.75L13 9.5L8 8.25L3 12.5Z" fill="#10b981"/>
        </svg>
        <span style="color: #6b7280; font-size: 14px;">企业认证，安全可靠</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.repair-estimate-page {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding-bottom: 80px; /* 为底部导航栏留出空间 */
}
</style>