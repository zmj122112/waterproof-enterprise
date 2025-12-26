<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const projectId = route.params.id

// 项目信息
const projectInfo = ref({
  id: projectId,
  buildingName: '科技园区A栋',
  projectName: '卫生间防水改造工程',
  type: '防水改造',
  completionDate: '2024-06-03'
})

// 评价表单数据
const evaluationForm = ref({
  rating: 0,
  content: '',
  photos: []
})

// 评价标签选项
const tagOptions = [
  { label: '施工专业', value: '施工专业' },
  { label: '服务态度好', value: '服务态度好' },
  { label: '施工速度快', value: '施工速度快' },
  { label: '价格合理', value: '价格合理' },
  { label: '质量可靠', value: '质量可靠' }
]

// 选中的标签
const selectedTags = ref([])

// 模拟从API获取数据
onMounted(() => {
  // 这里可以添加实际的API调用
  console.log('获取项目评价页面:', projectId)
})

// 提交评价
const submitEvaluation = () => {
  // 这里可以添加表单验证
  ElMessage.success('评价提交成功')
  console.log('提交评价:', evaluationForm.value)
  // 跳回施工详情页面
  window.history.back()
}

// 取消评价
const cancelEvaluation = () => {
  window.history.back()
}
</script>

<template>
  <div class="project-evaluation-container">
    <div class="page-header">
      <el-button type="text" @click="window.history.back()" class="back-btn">
        <el-icon><arrow-left /></el-icon> 返回
      </el-button>
      <h1 class="page-title">工程评价</h1>
    </div>
    
    <!-- 项目信息 -->
    <el-card class="project-info-card">
      <div class="project-info">
        <div class="project-name">{{ projectInfo.projectName }}</div>
        <div class="project-meta">
          <span class="building-name">{{ projectInfo.buildingName }}</span>
          <span class="project-type">{{ projectInfo.type }}</span>
          <span class="completion-date">完工日期：{{ projectInfo.completionDate }}</span>
        </div>
      </div>
    </el-card>
    
    <!-- 评价表单 -->
    <el-card class="evaluation-form-card" style="margin-top: 16px;">
      <template #header>
        <h3 class="card-title">评价内容</h3>
      </template>
      
      <div class="evaluation-form">
        <!-- 评分 -->
        <div class="evaluation-section">
          <h4 class="section-title">总体评分</h4>
          <div class="rating-container">
            <el-rate 
              v-model="evaluationForm.rating" 
              :max="5" 
              allow-half 
              show-score 
              text-color="#ff9900"
              style="font-size: 24px;"
            />
          </div>
        </div>
        
        <!-- 评价标签 -->
        <div class="evaluation-section" style="margin-top: 20px;">
          <h4 class="section-title">评价标签</h4>
          <div class="tag-container">
            <el-tag 
              v-for="tag in tagOptions" 
              :key="tag.value"
              :type="selectedTags.includes(tag.value) ? 'primary' : 'info'"
              effect="plain"
              @click="selectedTags.includes(tag.value) ? selectedTags.splice(selectedTags.indexOf(tag.value), 1) : selectedTags.push(tag.value)"
              class="selectable-tag"
            >
              {{ tag.label }}
            </el-tag>
          </div>
        </div>
        
        <!-- 评价内容 -->
        <div class="evaluation-section" style="margin-top: 20px;">
          <h4 class="section-title">评价内容</h4>
          <el-input
            v-model="evaluationForm.content"
            type="textarea"
            :rows="4"
            placeholder="请输入您的评价内容"
            resize="none"
          />
        </div>
        
        <!-- 上传图片 -->
        <div class="evaluation-section" style="margin-top: 20px;">
          <h4 class="section-title">上传图片</h4>
          <el-upload
            class="image-uploader"
            action="#"
            list-type="picture-card"
            :file-list="evaluationForm.photos"
            :auto-upload="false"
          >
            <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </div>
        
        <!-- 提交按钮 -->
        <div class="evaluation-actions" style="margin-top: 24px;">
          <el-button size="large" @click="cancelEvaluation" style="margin-right: 12px;">取消</el-button>
          <el-button type="primary" size="large" @click="submitEvaluation">提交评价</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.project-evaluation-container {
  padding: 0;
}

.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.back-btn {
  margin-right: 12px;
  color: #606266;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  margin: 0;
}

.project-info-card {
  margin-bottom: 16px;
}

.project-info {
  padding: 16px 0;
}

.project-name {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin: 0 0 8px 0;
}

.project-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: #666666;
}

.evaluation-form-card {
  margin-bottom: 16px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.evaluation-form {
  padding: 16px 0;
}

.evaluation-section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #333333;
  margin: 0 0 12px 0;
}

.rating-container {
  display: flex;
  align-items: center;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.selectable-tag {
  cursor: pointer;
  transition: all 0.3s;
}

.selectable-tag:hover {
  transform: translateY(-2px);
}

.image-uploader {
  margin-top: 12px;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.evaluation-actions {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.evaluation-actions .el-button {
  width: 120px;
  height: 44px;
  font-size: 14px;
}
</style>