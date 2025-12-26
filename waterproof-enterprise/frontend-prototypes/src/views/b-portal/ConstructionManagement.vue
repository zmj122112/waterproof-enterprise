<script setup>
import { ref } from 'vue'

// 施工项目列表数据
const constructionList = ref([
  {
    id: 1,
    buildingName: '科技园区A栋',
    projectName: '屋顶防水维修工程',
    type: '防水维修',
    status: '处理中',
    startDate: '2024-06-10',
    estimatedEndDate: '2024-06-20',
    actualEndDate: '',
    progress: 60
  },
  {
    id: 2,
    buildingName: '住宅小区B区',
    projectName: '卫生间防水改造工程',
    type: '防水改造',
    status: '已完成',
    startDate: '2024-05-20',
    estimatedEndDate: '2024-06-05',
    actualEndDate: '2024-06-03',
    progress: 100
  },
  {
    id: 3,
    buildingName: '商业中心C座',
    projectName: '外墙防水施工工程',
    type: '防水施工',
    status: '准备中',
    startDate: '2024-06-25',
    estimatedEndDate: '2024-07-15',
    actualEndDate: '',
    progress: 0
  }
])

// 施工状态颜色映射
const statusColorMap = {
  '准备中': 'info',
  '处理中': 'primary',
  '已完成': 'success',
  '已暂停': 'warning',
  '已取消': 'danger'
}

// 查看施工详情
const viewConstructionDetail = (id) => {
  // 跳转到施工详情页面
  window.location.href = `/b-portal/construction-detail/${id}`
}
</script>

<template>
  <div class="construction-management-container">
    <div class="page-header">
      <h1 class="page-title">施工管理</h1>
    </div>
    
    <!-- 施工项目列表 -->
    <div class="construction-list">
      <div v-if="constructionList.length === 0" class="empty-construction">
        <el-icon class="empty-icon"><document /></el-icon>
        <p>暂无施工项目</p>
      </div>
      
      <el-card 
        v-else
        v-for="project in constructionList" 
        :key="project.id" 
        class="construction-card"
      >
        <div class="card-header">
          <div class="project-info">
            <h3 class="project-name">{{ project.projectName }}</h3>
            <div class="project-meta">
              <span class="building-name">{{ project.buildingName }}</span>
              <span class="project-type">{{ project.type }}</span>
            </div>
          </div>
          <el-tag :type="statusColorMap[project.status]">{{ project.status }}</el-tag>
        </div>
        
        <div class="card-content">
          <div class="project-dates">
            <div class="date-item">
              <span class="label">开始日期：</span>
              <span class="value">{{ project.startDate }}</span>
            </div>
            <div class="date-item">
              <span class="label">预计结束：</span>
              <span class="value">{{ project.estimatedEndDate }}</span>
            </div>
            <div v-if="project.actualEndDate" class="date-item">
              <span class="label">实际结束：</span>
              <span class="value">{{ project.actualEndDate }}</span>
            </div>
          </div>
          
          <!-- 进度条 -->
          <div class="progress-section">
            <div class="progress-header">
              <span class="progress-label">施工进度</span>
              <span class="progress-value">{{ project.progress }}%</span>
            </div>
            <el-progress 
              :percentage="project.progress" 
              :color="project.status === '处理中' ? '#409eff' : project.status === '已完成' ? '#67c23a' : '#909399'"
            />
          </div>
        </div>
        
        <div class="card-actions">
          <el-button
            type="primary"
            size="large"
            block
            @click="viewConstructionDetail(project.id)"
          >
            查看详情
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.construction-management-container {
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

.construction-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.empty-construction {
  text-align: center;
  padding: 40px 0;
  color: #909399;
}

.empty-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.construction-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  border-radius: 8px;
  overflow: hidden;
}

.construction-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e8e8e8;
}

.project-info {
  flex: 1;
}

.project-name {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin: 0 0 4px 0;
}

.project-meta {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: #666666;
}

.card-content {
  margin-bottom: 16px;
}

.project-dates {
  margin-bottom: 16px;
}

.date-item {
  display: flex;
  margin-bottom: 8px;
  font-size: 13px;
  align-items: center;
}

.date-item:last-child {
  margin-bottom: 0;
}

.date-item .label {
  width: 80px;
  font-weight: 500;
  color: #333333;
  margin-right: 8px;
}

.date-item .value {
  flex: 1;
  color: #666666;
  line-height: 1.5;
}

.progress-section {
  margin-top: 16px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.progress-label {
  font-size: 13px;
  font-weight: 500;
  color: #333333;
}

.progress-value {
  font-size: 13px;
  color: #409eff;
  font-weight: 600;
}

.card-actions {
  margin-top: 16px;
}

.card-actions .el-button {
  height: 40px;
  font-size: 14px;
}
</style>