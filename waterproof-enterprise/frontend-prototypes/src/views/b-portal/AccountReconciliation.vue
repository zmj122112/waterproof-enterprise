<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 台账列表数据
const accountList = ref([
  {
    id: 1,
    date: '2023-10-01',
    type: '收入',
    amount: 50000,
    description: 'XX项目工程款',
    status: '已对账'
  },
  {
    id: 2,
    date: '2023-10-05',
    type: '支出',
    amount: 10000,
    description: '购买防水材料',
    status: '已对账'
  },
  {
    id: 3,
    date: '2023-10-10',
    type: '收入',
    amount: 30000,
    description: 'XX项目尾款',
    status: '待对账'
  }
])

// 导出台账
const exportAccount = () => {
  ElMessage.success('台账导出成功')
  console.log('导出台账')
}

// 开始对账
const startReconciliation = () => {
  ElMessage.info('开始对账功能')
  console.log('开始对账')
}

// 查看详情
const viewDetail = (account) => {
  ElMessage.info(`查看台账详情：${account.id}`)
  console.log('查看台账详情:', account)
}
</script>

<template>
  <div class="account-reconciliation-page">
    <div class="page-header">
      <h1 class="page-title">台账与对账</h1>
      <div class="header-actions">
        <el-button type="primary" size="large" block @click="startReconciliation" class="action-btn">
          <el-icon><Check /></el-icon>
          开始对账
        </el-button>
        <el-button type="success" size="large" block @click="exportAccount" class="action-btn">
          <el-icon><Download /></el-icon>
          导出台账
        </el-button>
      </div>
    </div>

    <div class="account-list">
      <el-card 
        v-for="account in accountList" 
        :key="account.id" 
        class="account-card"
      >
        <div class="card-header">
          <div class="account-date">{{ account.date }}</div>
          <div class="status-tag">
            <el-tag :type="account.status === '已对账' ? 'success' : 'warning'" size="small">
              {{ account.status }}
            </el-tag>
          </div>
        </div>
        
        <div class="card-content">
          <div class="info-item main-info">
            <el-tag :type="account.type === '收入' ? 'success' : 'danger'" size="small" class="type-tag">
              {{ account.type }}
            </el-tag>
            <span class="amount">{{ `${account.type === '收入' ? '+' : '-' }¥${account.amount.toLocaleString()}` }}</span>
          </div>
          <div class="info-item description">
            <span class="label">描述：</span>
            <span class="value">{{ account.description }}</span>
          </div>
        </div>
        
        <div class="card-actions">
          <el-button
            type="primary"
            size="large"
            block
            @click="viewDetail(account)"
          >
            查看详情
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.account-reconciliation-page {
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

.header-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-btn {
  height: 44px;
  font-size: 14px;
}

.action-btn .el-icon {
  margin-right: 6px;
}

/* 台账列表 */
.account-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.account-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  border-radius: 8px;
  overflow: hidden;
}

.account-card:hover {
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

.account-date {
  font-size: 14px;
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

.info-item.main-info {
  margin-bottom: 12px;
  align-items: flex-start;
}

.type-tag {
  margin-right: 12px;
}

.amount {
  font-size: 18px;
  font-weight: 600;
  color: #333333;
}

.amount.income {
  color: #67c23a;
}

.amount.expense {
  color: #f56c6c;
}

.info-item.description {
  margin-bottom: 0;
}

.info-item .label {
  width: 40px;
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
  display: flex;
}

.card-actions .el-button {
  height: 40px;
  font-size: 14px;
  flex: 1;
}
</style>