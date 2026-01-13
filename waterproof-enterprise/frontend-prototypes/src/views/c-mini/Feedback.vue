<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 反馈表单数据
const feedbackForm = ref({
  type: '',
  content: '',
  contact: ''
})

// 反馈类型选项
const feedbackTypes = [
  { label: '服务质量', value: 'service-quality' },
  { label: '技术问题', value: 'technical-issue' },
  { label: '价格问题', value: 'price-issue' },
  { label: '投诉建议', value: 'complaint-suggestion' },
  { label: '其他问题', value: 'other' }
]

// 提交反馈
const submitFeedback = () => {
  // 简单验证
  if (!feedbackForm.value.type) {
    alert('请选择反馈类型')
    return
  }
  if (!feedbackForm.value.content.trim()) {
    alert('请填写反馈内容')
    return
  }
  if (!feedbackForm.value.contact.trim()) {
    alert('请填写联系方式')
    return
  }

  // 模拟提交
  console.log('提交反馈:', feedbackForm.value)
  alert('反馈提交成功，感谢您的意见！')
  router.back()
}
</script>

<template>
  <div class="feedback-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-actions" @click="router.back()">
        &lt;
      </div>
      <h1 class="page-title">问题反馈</h1>
    </div>

    <!-- 反馈表单 -->
    <div class="feedback-form-container">
      <form @submit.prevent="submitFeedback" class="feedback-form">
        <!-- 反馈类型 -->
        <div class="form-item">
          <label class="form-label">反馈类型</label>
          <div class="type-selector">
            <span
              v-for="type in feedbackTypes"
              :key="type.value"
              @click="feedbackForm.type = type.value"
              :class="['type-item', { active: feedbackForm.type === type.value }]"
            >
              {{ type.label }}
            </span>
          </div>
        </div>

        <!-- 反馈内容 -->
        <div class="form-item">
          <label class="form-label">反馈内容</label>
          <textarea
            v-model="feedbackForm.content"
            placeholder="请详细描述您遇到的问题或建议"
            class="content-textarea"
            rows="6"
          ></textarea>
        </div>

        <!-- 联系方式 -->
        <div class="form-item">
          <label class="form-label">联系方式</label>
          <input
            v-model="feedbackForm.contact"
            type="text"
            placeholder="请留下您的手机号或邮箱，方便我们联系您"
            class="contact-input"
          />
        </div>

        <!-- 提交按钮 -->
        <div class="submit-container">
          <button type="submit" class="submit-btn">
            提交反馈
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.feedback-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 80px;
}

.page-header {
  background-color: #CC0010;
  color: white;
  padding: 20px 16px;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 2px 12px rgba(204, 0, 16, 0.3);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  text-align: center;
  color: white;
}

.header-actions {
  position: absolute;
  left: 16px;
  top: 20px;
  font-size: 20px;
  cursor: pointer;
}

.feedback-form-container {
  padding: 16px;
}

.feedback-form {
  background-color: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.form-item {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.type-selector {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.type-item {
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.type-item.active {
  border-color: #CC0010;
  background-color: rgba(204, 0, 16, 0.1);
  color: #CC0010;
  font-weight: 500;
}

.content-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  resize: none;
  outline: none;
  font-family: inherit;
  box-sizing: border-box;
}

.content-textarea:focus {
  border-color: #CC0010;
  box-shadow: 0 0 0 2px rgba(204, 0, 16, 0.1);
}

.contact-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.contact-input:focus {
  border-color: #CC0010;
  box-shadow: 0 0 0 2px rgba(204, 0, 16, 0.1);
}

.submit-container {
  margin-top: 24px;
}

.submit-btn {
  width: 100%;
  background-color: #CC0010;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background-color: #A60010;
  box-shadow: 0 4px 12px rgba(204, 0, 16, 0.3);
}

.submit-btn:active {
  transform: translateY(1px);
}
</style>