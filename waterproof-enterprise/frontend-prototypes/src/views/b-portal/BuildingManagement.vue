<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 建筑列表数据
const buildingList = ref([
  {
    id: 1,
    name: '科技园区A栋',
    address: '北京市朝阳区科技园区1号',
    type: '办公楼',
    area: 5000,
    constructionDate: '2020-01-15',
    lastInspectionDate: '2024-05-20',
    status: '正常'
  },
  {
    id: 2,
    name: '住宅小区B区',
    address: '北京市海淀区住宅路2号',
    type: '住宅',
    area: 10000,
    constructionDate: '2018-06-30',
    lastInspectionDate: '2024-04-10',
    status: '待检查'
  },
  {
    id: 3,
    name: '商业中心C座',
    address: '北京市东城区商业街3号',
    type: '商业',
    area: 8000,
    constructionDate: '2019-12-20',
    lastInspectionDate: '2024-03-15',
    status: '正常'
  }
])

// 建筑状态颜色映射
const statusColorMap = {
  '正常': 'success',
  '待检查': 'warning',
  '需要维修': 'danger'
}

// 查看建筑详情
const viewBuildingDetail = (id) => {
  // 跳转到建筑详情页面
  window.location.href = `/b-portal/building-detail/${id}`
}

// 新增建筑（企业用户可能没有此权限，仅作为示例）
const addBuilding = () => {
  ElMessage.info('新增建筑功能仅管理员可用')
}
</script>

<template>
  <div class="building-management-container">
    <div class="page-header">
      <h1 class="page-title">建筑管理</h1>
    </div>
    
    <!-- 建筑列表 -->
    <div class="building-list">
      <el-card 
        v-for="building in buildingList" 
        :key="building.id" 
        class="building-card"
      >
        <div class="card-header">
          <div class="building-info">
            <h3 class="building-name">{{ building.name }}</h3>
            <p class="building-address">{{ building.address }}</p>
          </div>
          <el-tag :type="statusColorMap[building.status]">{{ building.status }}</el-tag>
        </div>
        
        <div class="card-content">
          <el-row :gutter="16">
            <el-col :xs="12">
              <div class="info-item">
                <span class="label">建筑类型：</span>
                <span class="value">{{ building.type }}</span>
              </div>
            </el-col>
            <el-col :xs="12">
              <div class="info-item">
                <span class="label">建筑面积：</span>
                <span class="value">{{ building.area }}㎡</span>
              </div>
            </el-col>
            <el-col :xs="12">
              <div class="info-item">
                <span class="label">建成日期：</span>
                <span class="value">{{ building.constructionDate }}</span>
              </div>
            </el-col>
            <el-col :xs="12">
              <div class="info-item">
                <span class="label">上次检查：</span>
                <span class="value">{{ building.lastInspectionDate }}</span>
              </div>
            </el-col>
          </el-row>
        </div>
        
        <div class="card-actions">
          <el-button
            type="primary"
            size="large"
            block
            @click="viewBuildingDetail(building.id)"
          >
            查看详情
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.building-management-container {
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

.building-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.building-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  border-radius: 8px;
  overflow: hidden;
}

.building-card:hover {
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

.building-info {
  flex: 1;
}

.building-name {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin: 0 0 4px 0;
}

.building-address {
  font-size: 13px;
  color: #666666;
  margin: 0;
  line-height: 1.4;
}

.card-content {
  margin-bottom: 16px;
}

.info-item {
  display: flex;
  margin-bottom: 8px;
  font-size: 13px;
  flex-wrap: wrap;
  align-items: center;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-item .label {
  width: 70px;
  font-weight: 500;
  color: #333333;
  margin-right: 8px;
}

.info-item .value {
  flex: 1;
  color: #666666;
  line-height: 1.5;
}

.card-actions {
  margin-top: 16px;
}

.card-actions .el-button {
  height: 40px;
  font-size: 14px;
}
</style>