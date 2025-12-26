<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const projectId = route.params.id

// 施工项目详情数据
const projectDetail = ref({
  id: projectId,
  buildingName: '科技园区A栋',
  projectName: '屋顶防水维修工程',
  type: '防水维修',
  status: '处理中',
  startDate: '2024-06-10',
  estimatedEndDate: '2024-06-20',
  actualEndDate: '',
  progress: 60,
  description: '科技园区A栋屋顶防水卷材老化，需要更换新的防水卷材',
  // 工程准备情况
  preparation: {
    materials: [
      { name: '防水卷材', quantity: '1000㎡', status: '已准备' },
      { name: '防水涂料', quantity: '50桶', status: '已准备' },
      { name: '密封胶', quantity: '20支', status: '已准备' }
    ],
    equipment: [
      { name: '高压清洗机', status: '已准备' },
      { name: '热风枪', status: '已准备' },
      { name: '搅拌器', status: '已准备' }
    ],
    staff: [
      { name: '张三', role: '项目经理', status: '已到位' },
      { name: '李四', role: '施工师傅', status: '已到位' },
      { name: '王五', role: '施工师傅', status: '已到位' }
    ]
  },
  // 施工进度
  constructionProgress: [
    {
      stage: '准备阶段',
      progress: 100,
      description: '材料、设备、人员已全部准备就绪'
    },
    {
      stage: '旧材料拆除',
      progress: 100,
      description: '已完成旧防水卷材拆除'
    },
    {
      stage: '基层处理',
      progress: 100,
      description: '已完成屋顶基层清理和修补'
    },
    {
      stage: '防水卷材铺设',
      progress: 50,
      description: '正在进行防水卷材铺设'
    },
    {
      stage: '竣工验收',
      progress: 0,
      description: '尚未开始'
    }
  ],
  // 施工记录
  constructionRecords: [
    {
      date: '2024-06-10',
      content: '施工队伍进场，开始准备工作'
    },
    {
      date: '2024-06-11',
      content: '开始拆除旧防水卷材'
    },
    {
      date: '2024-06-13',
      content: '完成旧材料拆除，开始基层处理'
    },
    {
      date: '2024-06-15',
      content: '完成基层处理，开始铺设新防水卷材'
    }
  ]
})

// 施工状态颜色映射
const statusColorMap = {
  '准备中': 'info',
  '处理中': 'primary',
  '已完成': 'success',
  '已暂停': 'warning',
  '已取消': 'danger'
}

// 准备状态颜色映射
const preparationStatusColorMap = {
  '已准备': 'success',
  '未准备': 'warning',
  '已到位': 'success',
  '未到位': 'warning'
}

// 模拟从API获取数据
onMounted(() => {
  // 这里可以添加实际的API调用
  console.log('获取施工详情:', projectId)
})

// 去评价
const goToEvaluate = () => {
  // 跳转到评价页面
  window.location.href = `/b-portal/project-evaluation/${projectId}`
}
</script>

<template>
  <div class="construction-detail-container">
    <div class="page-header">
      <el-button type="text" @click="window.history.back()" class="back-btn">
        <el-icon><arrow-left /></el-icon> 返回
      </el-button>
      <h1 class="page-title">施工详情</h1>
    </div>
    
    <!-- 项目基本信息 -->
    <el-card class="project-info-card">
      <template #header>
        <h3 class="card-title">项目信息</h3>
      </template>
      
      <div class="project-info">
        <div class="project-name">{{ projectDetail.projectName }}</div>
        <div class="project-meta">
          <span class="building-name">{{ projectDetail.buildingName }}</span>
          <span class="project-type">{{ projectDetail.type }}</span>
          <el-tag :type="statusColorMap[projectDetail.status]">{{ projectDetail.status }}</el-tag>
        </div>
        <div class="project-dates">
          <div class="date-item">
            <span class="label">开始日期：</span>
            <span class="value">{{ projectDetail.startDate }}</span>
          </div>
          <div class="date-item">
            <span class="label">预计结束：</span>
            <span class="value">{{ projectDetail.estimatedEndDate }}</span>
          </div>
          <div v-if="projectDetail.actualEndDate" class="date-item">
            <span class="label">实际结束：</span>
            <span class="value">{{ projectDetail.actualEndDate }}</span>
          </div>
        </div>
        <div class="project-description">
          <p class="description-content">{{ projectDetail.description }}</p>
        </div>
      </div>
    </el-card>
    
    <!-- 整体进度 -->
    <el-card class="overall-progress-card" style="margin-top: 16px;">
      <template #header>
        <h3 class="card-title">整体进度</h3>
      </template>
      
      <div class="overall-progress">
        <div class="progress-header">
          <span class="progress-label">当前进度</span>
          <span class="progress-value">{{ projectDetail.progress }}%</span>
        </div>
        <el-progress 
          :percentage="projectDetail.progress" 
          :color="projectDetail.status === '处理中' ? '#409eff' : projectDetail.status === '已完成' ? '#67c23a' : '#909399'"
        />
      </div>
    </el-card>
    
    <!-- 工程准备情况 -->
    <el-card class="preparation-card" style="margin-top: 16px;">
      <template #header>
        <h3 class="card-title">工程准备情况</h3>
      </template>
      
      <div class="preparation-content">
        <!-- 材料准备 -->
        <div class="preparation-section">
          <h4 class="section-title">材料准备</h4>
          <el-table :data="projectDetail.preparation.materials" size="small" style="width: 100%">
            <el-table-column prop="name" label="材料名称"></el-table-column>
            <el-table-column prop="quantity" label="数量"></el-table-column>
            <el-table-column prop="status" label="状态">
              <template #default="scope">
                <el-tag :type="preparationStatusColorMap[scope.row.status]">{{ scope.row.status }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
        
        <!-- 设备准备 -->
        <div class="preparation-section" style="margin-top: 16px;">
          <h4 class="section-title">设备准备</h4>
          <el-table :data="projectDetail.preparation.equipment" size="small" style="width: 100%">
            <el-table-column prop="name" label="设备名称"></el-table-column>
            <el-table-column prop="status" label="状态">
              <template #default="scope">
                <el-tag :type="preparationStatusColorMap[scope.row.status]">{{ scope.row.status }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
        
        <!-- 人员准备 -->
        <div class="preparation-section" style="margin-top: 16px;">
          <h4 class="section-title">人员准备</h4>
          <el-table :data="projectDetail.preparation.staff" size="small" style="width: 100%">
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="role" label="角色"></el-table-column>
            <el-table-column prop="status" label="状态">
              <template #default="scope">
                <el-tag :type="preparationStatusColorMap[scope.row.status]">{{ scope.row.status }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
    
    <!-- 施工进度 -->
    <el-card class="construction-progress-card" style="margin-top: 16px;">
      <template #header>
        <h3 class="card-title">施工进度</h3>
      </template>
      
      <div class="progress-stages">
        <div v-for="(stage, index) in projectDetail.constructionProgress" :key="index" class="progress-stage">
          <div class="stage-header">
            <span class="stage-name">{{ stage.stage }}</span>
            <span class="stage-progress">{{ stage.progress }}%</span>
          </div>
          <el-progress 
            :percentage="stage.progress" 
            :color="stage.progress === 100 ? '#67c23a' : '#409eff'"
            style="margin-bottom: 8px;"
          />
          <div class="stage-description">{{ stage.description }}</div>
        </div>
      </div>
    </el-card>
    
    <!-- 施工记录 -->
    <el-card class="construction-records-card" style="margin-top: 16px;">
      <template #header>
        <h3 class="card-title">施工记录</h3>
      </template>
      
      <div class="records-timeline">
        <el-timeline>
          <el-timeline-item 
            v-for="(record, index) in projectDetail.constructionRecords" 
            :key="index"
            :timestamp="record.date"
            placement="top"
          >
            <div class="timeline-content">
              <p class="record-content">{{ record.content }}</p>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>
    
    <!-- 操作按钮 -->
    <div v-if="projectDetail.status === '已完成'" class="action-buttons" style="margin-top: 16px;">
      <el-button type="primary" size="large" block @click="goToEvaluate">
        <el-icon><star /></el-icon> 去评价
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.construction-detail-container {
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

.card-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.project-info-card {
  margin-bottom: 16px;
}

.project-info {
  padding: 16px 0;
}

.project-name {
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 8px;
}

.project-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #666666;
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

.project-description {
  margin-top: 16px;
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 6px;
  font-size: 13px;
  color: #666666;
  line-height: 1.6;
}

.overall-progress-card {
  margin-bottom: 16px;
}

.overall-progress {
  padding: 16px 0;
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

.preparation-card {
  margin-bottom: 16px;
}

.preparation-content {
  padding: 16px 0;
}

.preparation-section {
  margin-bottom: 16px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #333333;
  margin: 0 0 12px 0;
}

.construction-progress-card {
  margin-bottom: 16px;
}

.progress-stages {
  padding: 16px 0;
}

.progress-stage {
  margin-bottom: 20px;
}

.progress-stage:last-child {
  margin-bottom: 0;
}

.stage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #333333;
}

.stage-description {
  font-size: 12px;
  color: #666666;
  margin-bottom: 8px;
}

.construction-records-card {
  margin-bottom: 16px;
}

.records-timeline {
  padding: 16px 0;
}

.timeline-content {
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.record-content {
  font-size: 13px;
  color: #666666;
  line-height: 1.5;
  margin: 0;
}

.action-buttons {
  margin-top: 16px;
}

.action-buttons .el-button {
  height: 44px;
  font-size: 14px;
}
</style>