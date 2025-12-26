<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const equipmentId = route.params.id

// 设备详情数据
const equipmentDetail = ref({
  id: equipmentId,
  name: '高压注浆机',
  model: 'GZ-800',
  serialNumber: 'GZ20240001',
  purchaseDate: '2024-01-15',
  manufacturer: '防水设备有限公司',
  status: '正常使用',
  location: '仓库A区',
  responsiblePerson: '张三',
  maintenanceRecord: [
    {
      id: 1,
      maintenanceDate: '2024-03-10',
      content: '常规保养，更换密封圈',
      maintenancePerson: '李四',
      cost: 200
    },
    {
      id: 2,
      maintenanceDate: '2024-06-15',
      content: '更换压力表，检查液压系统',
      maintenancePerson: '王五',
      cost: 500
    }
  ]
})

// 设备状态颜色映射
const statusColorMap = {
  '正常使用': 'success',
  '维修中': 'warning',
  '停用': 'danger'
}

// 模拟从API获取数据
onMounted(() => {
  // 这里可以添加实际的API调用
  console.log('获取设备详情:', equipmentId)
})
</script>

<template>
  <div class="equipment-detail-container">
    <el-card class="equipment-detail-card">
      <template #header>
        <div class="card-header">
          <h2 class="card-title">设备详情</h2>
          <el-button type="primary" class="action-btn">编辑设备</el-button>
        </div>
      </template>
      
      <!-- 设备基本信息 -->
      <div class="equipment-info">
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="info-item">
              <label class="info-label">设备名称：</label>
              <span class="info-value">{{ equipmentDetail.name }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="info-item">
              <label class="info-label">设备型号：</label>
              <span class="info-value">{{ equipmentDetail.model }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="info-item">
              <label class="info-label">设备编号：</label>
              <span class="info-value">{{ equipmentDetail.serialNumber }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="info-item">
              <label class="info-label">购买日期：</label>
              <span class="info-value">{{ equipmentDetail.purchaseDate }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="info-item">
              <label class="info-label">生产厂商：</label>
              <span class="info-value">{{ equipmentDetail.manufacturer }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="info-item">
              <label class="info-label">设备状态：</label>
              <el-tag :type="statusColorMap[equipmentDetail.status]" class="status-tag">
                {{ equipmentDetail.status }}
              </el-tag>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="info-item">
              <label class="info-label">存放位置：</label>
              <span class="info-value">{{ equipmentDetail.location }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="info-item">
              <label class="info-label">负责人：</label>
              <span class="info-value">{{ equipmentDetail.responsiblePerson }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    
    <!-- 设备维护记录 -->
    <el-card class="maintenance-record-card" style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <h3 class="card-title">维护记录</h3>
          <el-button type="primary" class="action-btn">添加维护记录</el-button>
        </div>
      </template>
      
      <div class="maintenance-list">
        <el-table :data="equipmentDetail.maintenanceRecord" stripe style="width: 100%">
          <el-table-column prop="maintenanceDate" label="维护日期" width="180"></el-table-column>
          <el-table-column prop="content" label="维护内容"></el-table-column>
          <el-table-column prop="maintenancePerson" label="维护人员" width="120"></el-table-column>
          <el-table-column prop="cost" label="维护费用" width="120" formatter="(row) => `¥${row.cost}`"></el-table-column>
          <el-table-column label="操作" width="120" fixed="right">
            <template #default="scope">
              <el-button type="primary" size="small" link>查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.equipment-detail-container {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.action-btn {
  margin: 0;
}

.equipment-info {
  padding: 20px 0;
}

.info-item {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}

.info-label {
  font-weight: 500;
  color: #606266;
  width: 100px;
  margin-right: 12px;
}

.info-value {
  color: #303133;
}

.status-tag {
  margin-left: 8px;
}

.maintenance-list {
  margin-top: 20px;
}
</style>