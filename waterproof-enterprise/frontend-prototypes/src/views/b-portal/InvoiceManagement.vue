<script setup>
import { ref } from 'vue'

// 发票列表数据
const invoiceList = ref([
  {
    id: 1,
    invoiceNo: 'FP202406001',
    contractNo: 'HT20240001',
    amount: 100000,
    issueDate: '2024-06-10',
    status: '已开具',
    downloadUrl: '#'
  },
  {
    id: 2,
    invoiceNo: 'FP202405002',
    contractNo: 'HT20240002',
    amount: 50000,
    issueDate: '2024-05-20',
    status: '已开具',
    downloadUrl: '#'
  },
  {
    id: 3,
    invoiceNo: 'FP202404001',
    contractNo: 'HT20240003',
    amount: 80000,
    issueDate: '2024-04-15',
    status: '已开具',
    downloadUrl: '#'
  }
])

// 发票状态颜色映射
const statusColorMap = {
  '已开具': 'success',
  '未开具': 'warning',
  '已作废': 'danger'
}

// 查看发票详情
const viewInvoiceDetail = (id) => {
  // 跳转到发票详情页面
  ElMessage.info('发票详情功能待实现')
}

// 下载发票
const downloadInvoice = (url) => {
  // 这里可以添加下载发票的逻辑
  ElMessage.success('发票下载成功')
  console.log('下载发票:', url)
}
</script>

<template>
  <div class="invoice-management-container">
    <div class="page-header">
      <h1 class="page-title">发票管理</h1>
    </div>
    
    <!-- 发票列表 -->
    <div class="invoice-list">
      <div v-if="invoiceList.length === 0" class="empty-invoice">
        <el-icon class="empty-icon"><document /></el-icon>
        <p>暂无发票记录</p>
      </div>
      
      <el-card 
        v-else
        v-for="invoice in invoiceList" 
        :key="invoice.id" 
        class="invoice-card"
      >
        <div class="card-header">
          <div class="invoice-info">
            <div class="invoice-no">{{ invoice.invoiceNo }}</div>
            <div class="invoice-meta">
              <span class="contract-no">合同编号：{{ invoice.contractNo }}</span>
              <el-tag :type="statusColorMap[invoice.status]">{{ invoice.status }}</el-tag>
            </div>
          </div>
          <div class="invoice-amount">¥{{ invoice.amount.toLocaleString() }}</div>
        </div>
        
        <div class="card-content">
          <div class="invoice-dates">
            <div class="date-item">
              <span class="label">开票日期：</span>
              <span class="value">{{ invoice.issueDate }}</span>
            </div>
          </div>
        </div>
        
        <div class="card-actions">
          <el-button
            type="primary"
            size="small"
            @click="viewInvoiceDetail(invoice.id)"
            class="action-btn"
          >
            查看详情
          </el-button>
          <el-button
            type="success"
            size="small"
            @click="downloadInvoice(invoice.downloadUrl)"
            class="action-btn"
          >
            <el-icon><download /></el-icon> 下载
          </el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.invoice-management-container {
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

.invoice-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.empty-invoice {
  text-align: center;
  padding: 40px 0;
  color: #909399;
}

.empty-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.invoice-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  border-radius: 8px;
  overflow: hidden;
}

.invoice-card:hover {
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

.invoice-info {
  flex: 1;
}

.invoice-no {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin: 0 0 4px 0;
}

.invoice-meta {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: #666666;
}

.invoice-amount {
  font-size: 18px;
  font-weight: 600;
  color: #f56c6c;
}

.card-content {
  margin-bottom: 16px;
}

.invoice-dates {
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

.card-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.action-btn {
  flex: 1;
  height: 32px;
  font-size: 12px;
}
</style>