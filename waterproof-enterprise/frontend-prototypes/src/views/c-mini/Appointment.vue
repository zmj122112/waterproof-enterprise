<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Check, CircleCheck, User, ChatDotRound, Search, House, List, Calendar } from '@element-plus/icons-vue'

// 预约时间选项
const appointmentTimeOptions = [
  { label: '明天 上午（9:00-12:00）', value: 'tomorrow-morning' },
  { label: '明天 下午（14:00-17:00）', value: 'tomorrow-afternoon' },
  { label: '后天 上午（9:00-12:00）', value: 'day-after-morning' },
  { label: '后天 下午（14:00-17:00）', value: 'day-after-afternoon' }
]

// 表单数据
const formData = ref({
  appointmentTime: '',
  contactName: '',
  contactPhone: '',
  address: '',
  remark: ''
})

// 提交预约
const submitAppointment = () => {
  ElMessage.success('预约提交成功')
  console.log('提交预约:', formData.value)
}
</script>

<template>
  <div class="appointment-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
    <!-- 页面标题 -->
    <div style="background-color: #CC0010; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding: 40px 20px 20px; text-align: center;">
      <div style="color: white; font-size: 20px; font-weight: 700; margin: 0;">预约上门</div>
    </div>

    <!-- 预约表单 -->
    <div style="background: white; margin: 20px 16px 16px; border-radius: 16px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
      <el-form :model="formData" label-width="100px">
          <el-form-item label="预约时间" required>
            <el-select v-model="formData.appointmentTime" placeholder="请选择预约时间" style="width: 100%">
              <el-option
                v-for="option in appointmentTimeOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="联系人" required>
            <el-input v-model="formData.contactName" placeholder="请输入联系人姓名" />
          </el-form-item>
          <el-form-item label="联系电话" required>
            <el-input v-model="formData.contactPhone" placeholder="请输入联系电话" />
          </el-form-item>
          <el-form-item label="房屋地址" required>
            <el-input
              v-model="formData.address"
              type="textarea"
              :rows="3"
              placeholder="请输入房屋地址"
            />
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model="formData.remark"
              type="textarea"
              :rows="3"
              placeholder="请输入备注信息（选填）"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="large" @click="submitAppointment" style="width: 100%; background-color: #E60012; border-color: #E60012;" round>
            <el-icon><Check /></el-icon>
            提交预约
          </el-button>
          </el-form-item>
        </el-form>
    </div>

    <!-- 企业微信联系卡片 -->
    <div style="background: #FFF0F0; border: 1px solid #FEE2E2; margin: 0 16px 16px; border-radius: 16px; padding: 20px;">
        <div style="display: flex; flex-direction: column;">
          <h3 style="color: #111827; font-weight: 700; margin-bottom: 12px;">如何联系我们</h3>
          <p style="color: #6b7280; line-height: 1.6; margin-bottom: 8px;">提交成功后，项目经理将通过企业微信与您联系，请保持手机畅通</p>
          <p style="color: #6b7280; line-height: 1.6; margin-bottom: 12px;">您也可以直接扫码添加我们的企业微信，更快获得服务</p>
          <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
            <div style="display: flex; align-items: center; gap: 8px; color: #6b7280;">
              <el-icon style="color: #10b981;"><CircleCheck /></el-icon>
              <span>✔ 企业认证，安全可靠</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; color: #6b7280;">
              <el-icon style="color: #E60012;"><User /></el-icon>
              <span>💼 专属项目经理，一对一服务</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; color: #6b7280;">
              <el-icon style="color: #3b82f6;"><ChatDotRound /></el-icon>
              <span>📝 沟通记录可追溯</span>
            </div>
          </div>
          <div style="display: flex; justify-content: center;">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MoonStarCS" alt="企业微信二维码" style="border: 2px solid white; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); border-radius: 8px; width: 120px; height: 120px;" />
              <p style="color: #111827; font-weight: 500; text-align: center; margin: 0; font-size: 14px;">扫码加客服</p>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
/* 空样式标签，确保Vue SFC格式正确 */
</style>