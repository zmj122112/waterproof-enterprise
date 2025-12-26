<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()

// 合同详情数据
const contractDetail = ref(null)
const isLoading = ref(true)

// 模拟获取合同详情
const fetchContractDetail = () => {
  isLoading.value = true
  // 模拟API请求延迟
  setTimeout(() => {
    // 模拟数据
    contractDetail.value = {
      id: route.params.id || 'HT20231001',
      name: 'XX大厦防水工程',
      customer: 'XX企业',
      customerContact: '张三',
      customerPhone: '13800138000',
      amount: 500000,
      status: '执行中',
      startDate: '2023-10-01',
      endDate: '2023-12-31',
      createTime: '2023-09-25',
      signDate: '2023-09-30',
      // 合同条款摘要
      termsSummary: [
        { name: '付款方式', value: '合同签订后付30%，施工完成付60%，质保期结束付10%' },
        { name: '质保期', value: '5年' },
        { name: '施工标准', value: 'GB 50345-2012 屋面工程技术规范' },
        { name: '违约责任', value: '按合同金额的0.1%/天支付违约金' }
      ],
      // 合同附件
      attachments: [
        { id: 1, name: '合同原件.pdf', size: '2.5MB', uploadTime: '2023-09-30 14:30:00' },
        { id: 2, name: '工程预算表.xlsx', size: '1.2MB', uploadTime: '2023-09-30 14:35:00' }
      ],
      // 合同执行进度
      executionProgress: {
        totalAmount: 500000,
        paidAmount: 150000,
        progress: 30,
        milestone: [
          { name: '合同签订', status: '已完成', date: '2023-09-30' },
          { name: '预付款到账', status: '已完成', date: '2023-10-05' },
          { name: '材料进场', status: '已完成', date: '2023-10-10' },
          { name: '施工中', status: '进行中', date: '2023-10-15' },
          { name: '施工完成', status: '未开始', date: '' },
          { name: '验收通过', status: '未开始', date: '' },
          { name: '质保期开始', status: '未开始', date: '' }
        ]
      },
      // 备注
      remark: '客户要求施工期间尽量减少噪音影响'
    }
    isLoading.value = false
  }, 500)
}

// 编辑合同
const editContract = () => {
  ElMessage.info('编辑合同功能')
  console.log('编辑合同:', contractDetail.value.id)
}

// 终止合同
const terminateContract = () => {
  ElMessage.info('终止合同功能')
  console.log('终止合同:', contractDetail.value.id)
}

// 下载合同
const downloadContract = () => {
  ElMessage.info('下载合同功能')
  console.log('下载合同:', contractDetail.value.id)
}

// 返回合同列表
const backToList = () => {
  router.push('/admin-system/contract-management')
}

// 生命周期钩子，组件挂载时获取数据
onMounted(() => {
  fetchContractDetail()
})
</script>

<template>
  <div class="contract-detail-page">
    <div class="page-header">
      <div class="header-left">
        <el-button type="primary" @click="backToList" class="back-btn">
          <el-icon><ArrowLeft /></el-icon>
          返回列表
        </el-button>
        <h1 class="page-title">合同详情</h1>
      </div>
      <div class="header-actions">
        <el-button type="success" @click="editContract" class="action-btn">
          <el-icon><Edit /></el-icon>
          编辑
        </el-button>
        <el-button type="danger" @click="terminateContract" class="action-btn" :disabled="contractDetail?.status === '已完成' || contractDetail?.status === '已终止'">
          <el-icon><Close /></el-icon>
          终止
        </el-button>
        <el-button type="info" @click="downloadContract" class="action-btn">
          <el-icon><Download /></el-icon>
          下载
        </el-button>
      </div>
    </div>

    <el-card v-if="!isLoading" class="detail-card">
      <!-- 合同基本信息 -->
      <template #header>
        <div class="card-title">合同基本信息</div>
      </template>
      <el-row :gutter="[24, 24]">
        <el-col :span="12">
          <div class="info-item">
            <span class="label">合同编号：</span>
            <span class="value">{{ contractDetail.id }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-item">
            <span class="label">合同状态：</span>
            <el-tag
              :type="contractDetail.status === '待审核' ? 'warning' : 
                     contractDetail.status === '已通过' ? 'primary' : 
                     contractDetail.status === '执行中' ? 'success' : 
                     contractDetail.status === '已完成' ? 'success' : 'danger'"
            >
              {{ contractDetail.status }}
            </el-tag>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="info-item">
            <span class="label">项目名称：</span>
            <span class="value">{{ contractDetail.name }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-item">
            <span class="label">客户名称：</span>
            <span class="value">{{ contractDetail.customer }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-item">
            <span class="label">联系人：</span>
            <span class="value">{{ contractDetail.customerContact }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-item">
            <span class="label">联系电话：</span>
            <span class="value">{{ contractDetail.customerPhone }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-item">
            <span class="label">合同金额：</span>
            <span class="value amount">{{ `¥${contractDetail.amount.toLocaleString()}` }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-item">
            <span class="label">签订日期：</span>
            <span class="value">{{ contractDetail.signDate }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-item">
            <span class="label">创建时间：</span>
            <span class="value">{{ contractDetail.createTime }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-item">
            <span class="label">开始日期：</span>
            <span class="value">{{ contractDetail.startDate }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-item">
            <span class="label">结束日期：</span>
            <span class="value">{{ contractDetail.endDate }}</span>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 合同条款摘要 -->
    <el-card v-if="!isLoading" class="detail-card">
      <template #header>
        <div class="card-title">合同条款摘要</div>
      </template>
      <div class="terms-summary">
        <div 
          v-for="(term, index) in contractDetail.termsSummary" 
          :key="index" 
          class="term-item"
        >
          <span class="term-name">{{ term.name }}：</span>
          <span class="term-value">{{ term.value }}</span>
        </div>
      </div>
    </el-card>

    <!-- 合同执行进度 -->
    <el-card v-if="!isLoading" class="detail-card">
      <template #header>
        <div class="card-title">合同执行进度</div>
      </template>
      <div class="execution-progress">
        <div class="progress-overview">
          <div class="progress-item">
            <span class="progress-label">总体进度：</span>
            <el-progress 
              :percentage="contractDetail.executionProgress.progress" 
              :format="(percentage) => `${percentage}%`" 
              class="progress-bar"
            />
          </div>
          <div class="progress-item">
            <span class="progress-label">已付金额：</span>
            <span class="progress-value">{{ `¥${contractDetail.executionProgress.paidAmount.toLocaleString()}` }} / {{ `¥${contractDetail.executionProgress.totalAmount.toLocaleString()}` }}</span>
          </div>
        </div>
        
        <!-- 里程碑进度 -->
        <div class="milestone-progress">
          <div class="milestone-title">里程碑进度</div>
          <div class="milestone-list">
            <div 
              v-for="(milestone, index) in contractDetail.executionProgress.milestone" 
              :key="index" 
              class="milestone-item"
            >
              <div class="milestone-left">
                <div class="milestone-index">{{ index + 1 }}</div>
                <div class="milestone-line" v-if="index < contractDetail.executionProgress.milestone.length - 1"></div>
              </div>
              <div class="milestone-content">
                <div class="milestone-info">
                  <span class="milestone-name">{{ milestone.name }}</span>
                  <el-tag :type="milestone.status === '已完成' ? 'success' : milestone.status === '进行中' ? 'warning' : 'info'" size="small" class="milestone-status">
                    {{ milestone.status }}
                  </el-tag>
                </div>
                <div class="milestone-date" v-if="milestone.date">
                  {{ milestone.date }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 合同附件 -->
    <el-card v-if="!isLoading" class="detail-card">
      <template #header>
        <div class="card-title">合同附件</div>
      </template>
      <div class="attachments-list">
        <div 
          v-for="attachment in contractDetail.attachments" 
          :key="attachment.id" 
          class="attachment-item"
        >
          <div class="attachment-info">
            <el-icon class="file-icon"><Document /></el-icon>
            <div class="file-info">
              <div class="file-name">{{ attachment.name }}</div>
              <div class="file-meta">{{ attachment.size }} | {{ attachment.uploadTime }}</div>
            </div>
          </div>
          <el-button type="primary" link size="small" class="download-btn">
            <el-icon><Download /></el-icon>
            下载
          </el-button>
        </div>
      </div>
    </el-card>

    <!-- 备注 -->
    <el-card v-if="!isLoading && contractDetail.remark" class="detail-card">
      <template #header>
        <div class="card-title">备注</div>
      </template>
      <div class="remark-content">{{ contractDetail.remark }}</div>
    </el-card>

    <!-- 加载状态 -->
    <el-skeleton :loading="isLoading" :rows="10" animated class="loading-skeleton">
      <template #template>
        <el-skeleton-item variant="h1" style="margin-bottom: 24px;"></el-skeleton-item>
        <el-skeleton-item variant="p"></el-skeleton-item>
        <el-skeleton-item variant="p"></el-skeleton-item>
        <el-skeleton-item variant="p"></el-skeleton-item>
      </template>
    </el-skeleton>
  </div>
</template>

<style scoped>
.contract-detail-page {
  padding: 0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-btn {
  display: flex;
  align-items: center;
}

.back-btn .el-icon {
  margin-right: 6px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #333333;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
}

.action-btn .el-icon {
  margin-right: 6px;
}

/* 详情卡片 */
.detail-card {
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.card-title {
  font-size: 16px;
  font-weight: 500;
  color: #333333;
}

/* 信息项 */
.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.info-item .label {
  width: 100px;
  font-weight: 500;
  color: #666666;
  margin-right: 12px;
}

.info-item .value {
  flex: 1;
  font-size: 14px;
  color: #333333;
}

.info-item .value.amount {
  color: #1890ff;
  font-weight: 500;
  font-size: 16px;
}

/* 合同条款摘要 */
.terms-summary {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.term-item {
  display: flex;
  align-items: flex-start;
}

.term-name {
  width: 120px;
  font-weight: 500;
  color: #666666;
  margin-right: 12px;
  flex-shrink: 0;
}

.term-value {
  flex: 1;
  font-size: 14px;
  color: #333333;
  line-height: 1.5;
}

/* 合同执行进度 */
.execution-progress {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.progress-overview {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.progress-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-label {
  width: 100px;
  font-weight: 500;
  color: #666666;
}

.progress-bar {
  flex: 1;
}

.progress-value {
  font-size: 14px;
  color: #333333;
}

/* 里程碑进度 */
.milestone-progress {
  margin-top: 16px;
}

.milestone-title {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  margin-bottom: 16px;
}

.milestone-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.milestone-item {
  display: flex;
  position: relative;
}

.milestone-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
  position: relative;
}

.milestone-index {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #1890ff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  z-index: 2;
}

.milestone-line {
  width: 2px;
  background-color: #e8e8e8;
  flex: 1;
  margin-top: 8px;
  position: absolute;
  left: 11px;
  top: 24px;
  bottom: -24px;
}

.milestone-content {
  flex: 1;
  padding: 8px 0;
}

.milestone-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.milestone-name {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
}

.milestone-status {
  margin-left: 12px;
}

.milestone-date {
  font-size: 12px;
  color: #999999;
}

/* 合同附件 */
.attachments-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.attachment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #fafafa;
  border-radius: 6px;
}

.attachment-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.file-icon {
  font-size: 24px;
  color: #1890ff;
}

.file-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.file-name {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
}

.file-meta {
  font-size: 12px;
  color: #999999;
}

.download-btn {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 备注 */
.remark-content {
  font-size: 14px;
  color: #666666;
  line-height: 1.6;
  background-color: #fafafa;
  padding: 12px;
  border-radius: 6px;
}

/* 加载骨架 */
.loading-skeleton {
  margin-bottom: 24px;
}
</style>