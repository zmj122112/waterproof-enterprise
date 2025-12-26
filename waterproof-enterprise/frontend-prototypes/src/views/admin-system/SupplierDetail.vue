<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const supplierId = route.params.id

// 供应商详情数据
const supplierDetail = ref({
  id: supplierId,
  name: '防水材料有限公司',
  contactPerson: '张三',
  phone: '13800138001',
  email: 'contact@waterproof.com',
  address: '北京市朝阳区建国路88号',
  status: '合作中',
  rating: 5,
  createTime: '2024-01-10',
  description: '专业的防水材料供应商，提供各类防水卷材、防水涂料等产品',
  cooperationHistory: [
    {
      id: 1,
      contractNo: 'HT20240001',
      productName: '防水卷材',
      amount: 100000,
      startDate: '2024-01-15',
      endDate: '2025-01-14'
    },
    {
      id: 2,
      contractNo: 'HT20240002',
      productName: '防水涂料',
      amount: 50000,
      startDate: '2024-03-01',
      endDate: '2025-02-28'
    }
  ]
})

// 供应商状态颜色映射
const statusColorMap = {
  '合作中': 'success',
  '已终止': 'danger',
  '待审核': 'warning'
}

// 模拟从API获取数据
onMounted(() => {
  // 这里可以添加实际的API调用
  console.log('获取供应商详情:', supplierId)
})
</script>

<template>
  <div class="supplier-detail-container">
    <el-card class="supplier-detail-card">
      <template #header>
        <div class="card-header">
          <h2 class="card-title">供应商详情</h2>
          <el-button type="primary" class="action-btn">编辑供应商</el-button>
        </div>
      </template>
      
      <!-- 供应商基本信息 -->
      <div class="supplier-info">
        <el-row :gutter="24">
          <el-col :span="12">
            <div class="info-item">
              <label class="info-label">供应商名称：</label>
              <span class="info-value">{{ supplierDetail.name }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="info-item">
              <label class="info-label">联系人：</label>
              <span class="info-value">{{ supplierDetail.contactPerson }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="info-item">
              <label class="info-label">联系电话：</label>
              <span class="info-value">{{ supplierDetail.phone }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="info-item">
              <label class="info-label">邮箱：</label>
              <span class="info-value">{{ supplierDetail.email }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="info-item">
              <label class="info-label">地址：</label>
              <span class="info-value">{{ supplierDetail.address }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="info-item">
              <label class="info-label">状态：</label>
              <el-tag :type="statusColorMap[supplierDetail.status]" class="status-tag">
                {{ supplierDetail.status }}
              </el-tag>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="info-item">
              <label class="info-label">评分：</label>
              <el-rate v-model="supplierDetail.rating" disabled />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="info-item">
              <label class="info-label">创建时间：</label>
              <span class="info-value">{{ supplierDetail.createTime }}</span>
            </div>
          </el-col>
        </el-row>
        
        <!-- 供应商描述 -->
        <div class="supplier-description">
          <h3 class="section-title">供应商描述</h3>
          <p class="description-content">{{ supplierDetail.description }}</p>
        </div>
      </div>
    </el-card>
    
    <!-- 合作历史 -->
    <el-card class="cooperation-history-card" style="margin-top: 20px;">
      <template #header>
        <h3 class="card-title">合作历史</h3>
      </template>
      
      <div class="cooperation-list">
        <el-table :data="supplierDetail.cooperationHistory" stripe style="width: 100%">
          <el-table-column prop="contractNo" label="合同编号" width="180"></el-table-column>
          <el-table-column prop="productName" label="产品名称"></el-table-column>
          <el-table-column prop="amount" label="合同金额" width="120" formatter="(row) => `¥${row.amount}`"></el-table-column>
          <el-table-column prop="startDate" label="开始日期" width="150"></el-table-column>
          <el-table-column prop="endDate" label="结束日期" width="150"></el-table-column>
          <el-table-column label="操作" width="120" fixed="right">
            <template #default="scope">
              <el-button type="primary" size="small" link>查看合同</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.supplier-detail-container {
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

.supplier-info {
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

.supplier-description {
  margin-top: 24px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #303133;
}

.description-content {
  color: #606266;
  line-height: 1.6;
  margin: 0;
}

.cooperation-list {
  margin-top: 20px;
}
</style>