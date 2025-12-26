<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const repairId = route.params.id

// 报修详情数据
const repairDetail = ref({
  id: repairId,
  buildingName: '科技园区A栋',
  location: '5楼卫生间',
  type: '渗水',
  description: '5楼男卫生间顶部渗水',
  status: '已受理',
  createTime: '2024-06-15 14:30:00',
  updateTime: '2024-06-15 15:00:00',
  // 处理进度
  process: [
    {
      time: '2024-06-15 14:30:00',
      content: '报修提交成功'
    },
    {
      time: '2024-06-15 15:00:00',
      content: '报修已受理，正在安排师傅'
    }
  ],
  // 处理人员
  handler: {
    name: '张三',
    phone: '13800138001',
    role: '客户经理'
  }
})

// 报修状态颜色映射
const statusColorMap = {
  '待受理': 'warning',
  '已受理': 'info',
  '处理中': 'primary',
  '已完成': 'success',
  '已取消': 'danger'
}

// 模拟从API获取数据
onMounted(() => {
  // 这里可以添加实际的API调用
  console.log('获取报修详情:', repairId)
})
</script>

<template>
  <div class="repair-detail-container">
    <div class="page-header">
      <el-button type="text" @click="window.history.back()" class="back-btn">
        <el-icon><arrow-left /></el-icon> 返回
      </el-button>
      <h1 class="page-title">报修详情</h1>
    </div>
    
    <!-- 报修基本信息 -->
    <el-card class="repair-info-card">
      <template #header>
        <h3 class="card-title">基本信息</h3>
      </template>
      
      <div class="repair-info">
        <el-row :gutter="16">
          <el-col :xs="12">
            <div class="info-item">
              <span class="label">建筑名称：</span>
              <span class="value">{{ repairDetail.buildingName }}</span>
            </div>
          </el-col>
          <el-col :xs="12">
            <div class="info-item">
              <span class="label">漏水位置：</span>
              <span class="value">{{ repairDetail.location }}</span>
            </div>
          </el-col>
          <el-col :xs="12">
            <div class="info-item">
              <span class="label">漏水类型：</span>
              <span class="value">{{ repairDetail.type }}</span>
            </div>
          </el-col>
          <el-col :xs="12">
            <div class="info-item">
              <span class="label">报修状态：</span>
              <el-tag :type="statusColorMap[repairDetail.status]">{{ repairDetail.status }}</el-tag>
            </div>
          </el-col>
          <el-col :xs="12">
            <div class="info-item">
              <span class="label">提交时间：</span>
              <span class="value">{{ repairDetail.createTime }}</span>
            </div>
          </el-col>
          <el-col :xs="12">
            <div class="info-item">
              <span class="label">更新时间：</span>
              <span class="value">{{ repairDetail.updateTime }}</span>
            </div>
          </el-col>
        </el-row>
        
        <div class="repair-description">
          <h4 class="description-title">漏水描述</h4>
          <p class="description-content">{{ repairDetail.description }}</p>
        </div>
      </div>
    </el-card>
    
    <!-- 处理人员信息 -->
    <el-card class="handler-info-card" style="margin-top: 16px;">
      <template #header>
        <h3 class="card-title">处理人员</h3>
      </template>
      
      <div class="handler-info">
        <div class="handler-avatar">
          <img src="https://picsum.photos/60/60?random=50" alt="handler" class="avatar">
        </div>
        <div class="handler-details">
          <div class="handler-name">{{ repairDetail.handler.name }}</div>
          <div class="handler-role">{{ repairDetail.handler.role }}</div>
          <div class="handler-phone">{{ repairDetail.handler.phone }}</div>
        </div>
      </div>
    </el-card>
    
    <!-- 处理进度 -->
    <el-card class="process-card" style="margin-top: 16px;">
      <template #header>
        <h3 class="card-title">处理进度</h3>
      </template>
      
      <div class="process-timeline">
        <el-timeline>
          <el-timeline-item 
            v-for="(item, index) in repairDetail.process" 
            :key="index"
            :timestamp="item.time"
            placement="top"
          >
            <div class="timeline-content">
              <p class="process-content">{{ item.content }}</p>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>
    
    <!-- 操作按钮 -->
    <div class="action-buttons" style="margin-top: 16px;">
      <el-button type="primary" size="large" block>
        <el-icon><phone /></el-icon> 联系客服
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.repair-detail-container {
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

.repair-info-card {
  margin-bottom: 16px;
}

.repair-info {
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

.repair-description {
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

.handler-info-card {
  margin-bottom: 16px;
}

.handler-info {
  display: flex;
  align-items: center;
  padding: 16px 0;
}

.handler-avatar {
  margin-right: 16px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.handler-details {
  flex: 1;
}

.handler-name {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin-bottom: 4px;
}

.handler-role {
  font-size: 13px;
  color: #666666;
  margin-bottom: 4px;
}

.handler-phone {
  font-size: 13px;
  color: #409eff;
}

.process-card {
  margin-bottom: 16px;
}

.process-timeline {
  padding: 16px 0;
}

.timeline-content {
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.process-content {
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