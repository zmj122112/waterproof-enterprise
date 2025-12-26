<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 付款记录列表数据
const paymentList = ref([
  {
    id: 1,
    contractNo: 'HT20240001',
    projectName: '屋顶防水维修工程',
    amount: 100000,
    paymentMethod: '银行转账',
    paymentDate: '2024-06-10',
    status: '已付款',
    orderNo: 'PAY202406001'
  },
  {
    id: 2,
    contractNo: 'HT20240002',
    projectName: '卫生间防水改造工程',
    amount: 50000,
    paymentMethod: '银行转账',
    paymentDate: '2024-05-20',
    status: '已付款',
    orderNo: 'PAY202405002'
  },
  {
    id: 3,
    contractNo: 'HT20240003',
    projectName: '外墙防水施工工程',
    amount: 80000,
    paymentMethod: '银行转账',
    paymentDate: '2024-04-15',
    status: '已付款',
    orderNo: 'PAY202404001'
  }
])

// 付款状态颜色映射
const statusColorMap = {
  '已付款': 'success',
  '未付款': 'warning',
  '部分付款': 'info',
  '已退款': 'danger'
}

// 查看付款详情
const viewPaymentDetail = (id) => {
  // 跳转到付款详情页面
  ElMessage.info('付款详情功能待实现')
}
</script>

<template>
  <div class="payment-management-container">
    <div class="page-header">
      <h1 class="page-title">付款管理</h1>
    </div>
    
    <!-- 付款记录列表 -->
    <div class="payment-list">
      <div v-if="paymentList.length === 0" class="empty-payment">
        <el-icon class="empty-icon"><document /></el-icon>
        <p>暂无付款记录</p>
      </div>
      
      <el-card 
        v-else
        v-for="payment in paymentList" 
        :key="payment.id" 
        class="payment-card"
      >
        <div class="card-header">
          <div class="payment-info">
            <div class="order-no">{{ payment.orderNo }}</div>
            <div class="payment-meta">
              <span class="contract-no">合同编号：{{ payment.contractNo }}</span>
              <el-tag :type="statusColorMap[payment.status]">{{ payment.status }}</el-tag>
            </div>
          </div>
          <div class="payment-amount">¥{{ payment.amount.toLocaleString() }}</div>
        </div>
        
        <div class="card-content">
          <div class="project-info">
            <div class="project-name">{{ payment.projectName }}</div>
          </div>
          
          <div class="payment-details">
            <div class="detail-item">
              <span class="label">付款方式：</span>
              <span class="value">{{ payment.paymentMethod }}</span>
            </div>
            <div class="detail-item">
              <span class="label">付款日期：</span>
              <span class="value">{{ payment.paymentDate }}</span>
            </div>
          </div>
        </div>
        
        <div class="card-actions">
          <el-button
            type="primary"
            size="large"
            block
            @click="viewPaymentDetail(payment.id)"
          >
            查看详情
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.payment-management-container {
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

.payment-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.empty-payment {
  text-align: center;
  padding: 40px 0;
  color: #909399;
}

.empty-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.payment-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  border-radius: 8px;
  overflow: hidden;
}

.payment-card:hover {
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

.payment-info {
  flex: 1;
}

.order-no {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin: 0 0 4px 0;
}

.payment-meta {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: #666666;
}

.payment-amount {
  font-size: 18px;
  font-weight: 600;
  color: #67c23a;
}

.card-content {
  margin-bottom: 16px;
}

.project-info {
  margin-bottom: 12px;
}

.project-name {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  margin: 0;
}

.payment-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item {
  display: flex;
  font-size: 13px;
  align-items: center;
}

.detail-item .label {
  width: 80px;
  font-weight: 500;
  color: #333333;
  margin-right: 8px;
}

.detail-item .value {
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