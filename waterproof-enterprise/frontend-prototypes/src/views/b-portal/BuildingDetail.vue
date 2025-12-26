<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const buildingId = route.params.id

// 建筑详情数据
const buildingDetail = ref({
  id: buildingId,
  name: '科技园区A栋',
  address: '北京市朝阳区科技园区1号',
  type: '办公楼',
  area: 5000,
  constructionDate: '2020-01-15',
  lastInspectionDate: '2024-05-20',
  status: '正常',
  description: '科技园区A栋是一栋现代化办公楼，共15层，总建筑面积5000平方米。',
  // 历史防水情况
  waterproofHistory: [
    {
      id: 1,
      repairType: '屋顶防水',
      repairDate: '2023-08-15',
      repairContent: '屋顶防水卷材更换',
      contractor: '防水工程有限公司',
      status: '已完成'
    },
    {
      id: 2,
      repairType: '卫生间防水',
      repairDate: '2023-03-20',
      repairContent: '3楼卫生间防水维修',
      contractor: '防水工程有限公司',
      status: '已完成'
    },
    {
      id: 3,
      repairType: '外墙防水',
      repairDate: '2022-11-10',
      repairContent: '外墙渗水维修',
      contractor: '防水工程有限公司',
      status: '已完成'
    }
  ]
})

// 建筑状态颜色映射
const statusColorMap = {
  '正常': 'success',
  '待检查': 'warning',
  '需要维修': 'danger'
}

// 模拟从API获取数据
onMounted(() => {
  // 这里可以添加实际的API调用
  console.log('获取建筑详情:', buildingId)
})

// 立即报修
const repairNow = () => {
  // 跳转到报修页面
  window.location.href = '/b-portal/repair-center'
}
</script>

<template>
  <div class="building-detail-container">
    <div class="page-header">
      <el-button type="text" @click="window.history.back()" class="back-btn">
        <el-icon><arrow-left /></el-icon> 返回
      </el-button>
      <h1 class="page-title">{{ buildingDetail.name }}</h1>
    </div>
    
    <!-- 建筑基本信息 -->
    <el-card class="building-info-card">
      <template #header>
        <h3 class="card-title">基本信息</h3>
      </template>
      
      <div class="building-info">
        <el-row :gutter="16">
          <el-col :xs="12">
            <div class="info-item">
              <span class="label">建筑类型：</span>
              <span class="value">{{ buildingDetail.type }}</span>
            </div>
          </el-col>
          <el-col :xs="12">
            <div class="info-item">
              <span class="label">建筑面积：</span>
              <span class="value">{{ buildingDetail.area }}㎡</span>
            </div>
          </el-col>
          <el-col :xs="12">
            <div class="info-item">
              <span class="label">建成日期：</span>
              <span class="value">{{ buildingDetail.constructionDate }}</span>
            </div>
          </el-col>
          <el-col :xs="12">
            <div class="info-item">
              <span class="label">上次检查：</span>
              <span class="value">{{ buildingDetail.lastInspectionDate }}</span>
            </div>
          </el-col>
          <el-col :xs="12">
            <div class="info-item">
              <span class="label">当前状态：</span>
              <el-tag :type="statusColorMap[buildingDetail.status]">{{ buildingDetail.status }}</el-tag>
            </div>
          </el-col>
        </el-row>
        
        <div class="building-description">
          <h4 class="description-title">建筑描述</h4>
          <p class="description-content">{{ buildingDetail.description }}</p>
        </div>
        
        <div class="action-buttons">
          <el-button type="primary" size="large" block @click="repairNow">
            <el-icon><circle-plus /></el-icon> 立即报修
          </el-button>
        </div>
      </div>
    </el-card>
    
    <!-- 历史防水情况 -->
    <el-card class="waterproof-history-card" style="margin-top: 16px;">
      <template #header>
        <h3 class="card-title">历史防水情况</h3>
      </template>
      
      <div class="waterproof-history-list">
        <div v-if="buildingDetail.waterproofHistory.length === 0" class="empty-history">
          <el-icon class="empty-icon"><document /></el-icon>
          <p>暂无防水历史记录</p>
        </div>
        
        <el-timeline v-else>
          <el-timeline-item 
            v-for="item in buildingDetail.waterproofHistory" 
            :key="item.id"
            :timestamp="item.repairDate"
            placement="top"
          >
            <div class="timeline-content">
              <div class="timeline-header">
                <span class="repair-type">{{ item.repairType }}</span>
                <el-tag type="success">{{ item.status }}</el-tag>
              </div>
              <p class="repair-content">{{ item.repairContent }}</p>
              <div class="repair-info">
                <span class="contractor">施工单位：{{ item.contractor }}</span>
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.building-detail-container {
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

.building-info-card {
  margin-bottom: 16px;
}

.building-info {
  padding: 16px 0;
}

.info-item {
  display: flex;
  margin-bottom: 12px;
  font-size: 13px;
  flex-wrap: wrap;
  align-items: center;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-item .label {
  width: 80px;
  font-weight: 500;
  color: #333333;
  margin-right: 8px;
}

.info-item .value {
  flex: 1;
  color: #666666;
  line-height: 1.5;
}

.building-description {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #e8e8e8;
}

.description-title {
  font-size: 14px;
  font-weight: 600;
  color: #333333;
  margin: 0 0 8px 0;
}

.description-content {
  font-size: 13px;
  color: #666666;
  line-height: 1.6;
  margin: 0;
}

.action-buttons {
  margin-top: 20px;
}

.action-buttons .el-button {
  height: 44px;
  font-size: 14px;
}

.waterproof-history-card {
  margin-top: 16px;
}

.empty-history {
  text-align: center;
  padding: 40px 0;
  color: #909399;
}

.empty-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.timeline-content {
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.repair-type {
  font-weight: 600;
  color: #333333;
}

.repair-content {
  font-size: 13px;
  color: #666666;
  line-height: 1.5;
  margin: 0 0 8px 0;
}

.repair-info {
  font-size: 12px;
  color: #909399;
}
</style>