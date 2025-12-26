<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 合同项目列表数据
const contractProjects = ref([
  {
    id: 'HT20231001',
    name: 'XX大厦防水工程',
    customer: 'XX企业',
    status: '进行中',
    startDate: '2023-10-01',
    endDate: '2023-12-31',
    amount: 500000
  },
  {
    id: 'HT20230901',
    name: 'XX小区防水维修',
    customer: 'XX物业公司',
    status: '已完成',
    startDate: '2023-09-01',
    endDate: '2023-09-30',
    amount: 200000
  },
  {
    id: 'HT20230801',
    name: 'XX商场防水改造',
    customer: 'XX商业公司',
    status: '已完成',
    startDate: '2023-08-01',
    endDate: '2023-08-31',
    amount: 350000
  }
])

// 新增合同项目
const addContractProject = () => {
  ElMessage.info('新增合同项目功能')
  console.log('新增合同项目')
}

// 查看合同项目详情
const viewContractProject = (contract) => {
  ElMessage.info(`查看合同项目：${contract.id}`)
  console.log('查看合同项目:', contract)
}

// 编辑合同项目
const editContractProject = (contract) => {
  ElMessage.info(`编辑合同项目：${contract.id}`)
  console.log('编辑合同项目:', contract)
}
</script>

<template>
  <div class="contract-project-page">
    <div class="page-header">
      <h1 class="page-title">合同项目管理</h1>
      <el-button type="primary" size="large" block @click="addContractProject" class="add-contract-btn">
        <el-icon><Plus /></el-icon>
        新增合同项目
      </el-button>
    </div>

    <div class="contract-list">
      <el-card 
        v-for="contract in contractProjects" 
        :key="contract.id" 
        class="contract-card"
      >
        <div class="card-header">
          <div class="contract-name">{{ contract.name }}</div>
          <el-tag :type="contract.status === '进行中' ? 'success' : 'info'" size="small">
            {{ contract.status }}
          </el-tag>
        </div>
        
        <div class="card-content">
          <div class="info-item">
            <span class="label">合同编号：</span>
            <span class="value">{{ contract.id }}</span>
          </div>
          <div class="info-item">
            <span class="label">客户名称：</span>
            <span class="value">{{ contract.customer }}</span>
          </div>
          <div class="info-item">
            <span class="label">合同金额：</span>
            <span class="value amount">{{ `¥${contract.amount.toLocaleString()}` }}</span>
          </div>
          <div class="info-item">
            <span class="label">工期：</span>
            <span class="value">{{ contract.startDate }} 至 {{ contract.endDate }}</span>
          </div>
        </div>
        
        <div class="card-actions">
          <el-button
            type="primary"
            size="large"
            block
            @click="viewContractProject(contract)"
          >
            查看详情
          </el-button>
          <el-button
            type="success"
            size="large"
            block
            @click="editContractProject(contract)"
          >
            编辑
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.contract-project-page {
  padding: 0;
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  margin: 0;
}

.add-contract-btn {
  height: 44px;
  font-size: 14px;
}

/* 合同列表 */
.contract-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.contract-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  border-radius: 8px;
  overflow: hidden;
}

.contract-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e8e8e8;
}

.contract-name {
  font-size: 16px;
  font-weight: 500;
  color: #333333;
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

.info-item .value.amount {
  color: #1890ff;
  font-weight: 500;
}

.card-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-actions .el-button {
  height: 40px;
  font-size: 14px;
}
</style>