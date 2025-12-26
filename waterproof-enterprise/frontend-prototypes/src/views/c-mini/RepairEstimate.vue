<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, ZoomIn, Delete, Check, CircleCheck, User, ChatDotRound, Search, House, List, Calendar, Tools } from '@element-plus/icons-vue'

// 报修类型选项
const repairTypeOptions = [
  { label: '卫生间漏水', value: '卫生间漏水' },
  { label: '厨房漏水', value: '厨房漏水' },
  { label: '屋顶补漏', value: '屋顶补漏' },
  { label: '阳台漏水', value: '阳台漏水' },
  { label: '外墙防水', value: '外墙防水' },
  { label: '其他修缮', value: '其他修缮' }
]

// 表单数据
const formData = ref({
  repairType: '',
  location: '',
  description: '',
  contact: '',
  phone: ''
})

// 上传的图片列表
const imageList = ref([])

// 上传前的钩子函数
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    ElMessage.error('只能上传图片文件！')
    return false
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB！')
    return false
  }
  return true
}

// 处理图片上传成功
const handleSuccess = (response, file, fileList) => {
  imageList.value = fileList
  ElMessage.success('图片上传成功')
}

// 处理图片预览
const handlePictureCardPreview = (file) => {
  // 这里可以实现图片预览功能
  console.log('预览图片:', file)
}

// 处理图片移除
const handleRemove = (file, fileList) => {
  imageList.value = fileList
}

// 提交表单
const submitForm = () => {
  ElMessage.success('预约信息提交成功，项目经理将尽快与您联系！')
  console.log('提交表单:', formData.value)
  console.log('上传图片:', imageList.value)
}
</script>

<template>
  <div class="repair-estimate-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
    <!-- 页面标题 -->
    <div style="background-color: #E60012; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding: 40px 20px 20px; text-align: center;">
      <div style="color: white; font-size: 20px; font-weight: 700; margin: 0;">预约报修</div>
    </div>

    <!-- 报修表单 -->
    <div style="background: white; margin: 20px 16px 16px; border-radius: 16px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
      <el-form :model="formData" label-width="100px">
          <el-form-item label="报修类型" required>
            <el-select v-model="formData.repairType" placeholder="请选择报修类型" style="width: 100%">
              <el-option
                v-for="option in repairTypeOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="房屋地址" required>
            <el-input v-model="formData.location" placeholder="请输入房屋地址" />
          </el-form-item>
          <el-form-item label="问题描述" required>
            <el-input
              v-model="formData.description"
              type="textarea"
              :rows="4"
              placeholder="请详细描述漏水情况"
            />
          </el-form-item>
          <el-form-item label="漏水照片">
            <el-upload
              :action="'#'"
              list-type="picture-card"
              :file-list="imageList"
              :before-upload="beforeUpload"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
            >
              <el-icon class="el-icon--plus"><Plus /></el-icon>
              <template #file="{ file }">
                <div>
                  <img :src="file.url" alt="" class="el-upload-list__item-thumbnail" />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <el-icon><ZoomIn /></el-icon>
                    </span>
                    <span
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file, imageList)"
                    >
                      <el-icon><Delete /></el-icon>
                    </span>
                  </span>
                </div>
              </template>
            </el-upload>
            <div style="margin-top: 8px; font-size: 12px; color: #999;">建议上传1-3张清晰的漏水照片，便于我们快速了解情况</div>
          </el-form-item>
          <el-form-item label="联系人" required>
            <el-input v-model="formData.contact" placeholder="请输入联系人姓名" />
          </el-form-item>
          <el-form-item label="联系电话" required>
            <el-input v-model="formData.phone" placeholder="请输入联系电话" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="large" @click="submitForm" style="width: 100%; background-color: #E60012; border-color: #E60012;" round>
            <el-icon><Check /></el-icon>
            提交预约，等待沟通
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
.repair-estimate-page {
  background-color: $bg-secondary;
  min-height: 100vh;
  padding-bottom: 80px; /* 为底部导航栏留出空间 */
}

/* 页面标题 */
.home-header {
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.page-title {
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin: 0;
  text-align: center;
}

/* 表单区域 */
.form-section {
  margin-bottom: 16px; /* mb-4 */
}

/* 上传提示 */
.upload-tip {
  margin-top: $spacing-xs;
  font-size: $font-size-xs;
  color: $text-tertiary;
}

/* 企业微信联系卡片 */
.wechat-section {
  margin-bottom: 16px; /* mb-4 */
}

/* 通用卡片样式 */
.card-section {
  background-color: white;
  border-radius: 12px; /* rounded-xl */
  padding: 16px; /* p-4 */
  margin: 0 16px 16px; /* mx-4 mb-4 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.wechat-title {
  padding-bottom: $spacing-md;
  border-bottom: 1px solid $border-color;
  margin-bottom: $spacing-md;
}

.wechat-title h3 {
  font-size: $font-size-md;
  font-weight: $font-weight-bold;
  color: $text-primary;
  margin: 0;
}

.wechat-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: $spacing-lg;
  margin-bottom: $spacing-md;
}

.wechat-info {
  max-width: 100%;
}

.wechat-info p {
  margin: 0 0 $spacing-sm;
  color: $text-secondary;
  line-height: 1.5;
}

.wechat-tip {
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $primary-color;
}

.wechat-qrcode {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-sm;
}

.qrcode-img {
  width: 160px;
  height: 160px;
  border-radius: 12px;
  border: 2px solid $border-color;
  padding: $spacing-sm;
  background-color: $bg-primary;
  object-fit: cover;
}

.qrcode-text {
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $text-primary;
  margin: 0;
}

.wechat-features {
  display: flex;
  justify-content: space-around;
  padding-top: $spacing-md;
  border-top: 1px solid $border-color;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-xs;
  max-width: 100px;
}

.feature-icon {
  font-size: 24px;
  color: $primary-color;
  margin-bottom: $spacing-xs;
}

.feature-item span {
  font-size: $font-size-xs;
  color: $text-secondary;
  text-align: center;
  line-height: 1.4;
}

/* 表单样式 */
.el-form {
  width: 100%;
}

.el-form-item {
  margin-bottom: $spacing-md;
}

.el-form-item__label {
  font-weight: $font-weight-medium;
  color: $text-primary;
}

.el-input__wrapper, .el-select__wrapper {
  border-radius: 8px;
}

.el-button {
  font-weight: $font-weight-medium;
}
</style>