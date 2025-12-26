<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()

// 工单详情数据
const workOrderDetail = ref(null)
const isLoading = ref(true)

// 模拟获取工单详情
const fetchWorkOrderDetail = () => {
  isLoading.value = true
  // 模拟API请求延迟
  setTimeout(() => {
    // 模拟数据
    workOrderDetail.value = {
      id: route.params.id || 'WD20231015001',
      customer: '企业客户A',
      contact: '张三',
      phone: '13800138000',
      type: '上门检测',
      status: '待分配',
      staff: '未分配',
      staffName: '',
      appointment: '2023-10-15 上午（9:00-12:00）',
      createTime: '2023-10-15 10:30:00',
      address: 'XX区XX街道XX小区XX号楼XX单元XX室',
      description: '卫生间漏水，持续时间1周，需要上门检测',
      remark: '客户要求尽快安排',
      // 工单流程记录
      processRecords: [
        { id: 1, time: '2023-10-15 10:30:00', operator: '系统', content: '工单创建成功' },
        { id: 2, time: '2023-10-15 10:35:00', operator: '客服小李', content: '工单已审核' }
      ],
      // 检测报告（如果有）
      inspectionReport: null,
      // 施工记录（如果有）
      constructionRecords: [],
      // 完工验收（如果有）
      completionAcceptance: null
    }
    isLoading.value = false
  }, 500)
}

// 分配工单
const assignWorkOrder = () => {
  ElMessage.info('分配工单功能')
  console.log('分配工单:', workOrderDetail.value.id)
}

// 编辑工单
const editWorkOrder = () => {
  ElMessage.info('编辑工单功能')
  console.log('编辑工单:', workOrderDetail.value.id)
}

// 取消工单
const cancelWorkOrder = () => {
  ElMessage.info('取消工单功能')
  console.log('取消工单:', workOrderDetail.value.id)
}

// 返回工单列表
const backToList = () => {
  router.push('/admin-system/work-order-management')
}

// 生命周期钩子，组件挂载时获取数据
onMounted(() => {
  fetchWorkOrderDetail()
})
</script>

<template>
  <div class="work-order-detail-page">
    <div class="page-header">
      <div class="header-left">
        <el-button type="primary" @click="backToList" class="back-btn">
          <el-icon><ArrowLeft /></el-icon>
          返回列表
        </el-button>
        <h1 class="page-title">工单详情</h1>
      </div>
      <div class="header-actions">
        <el-button type="success" @click="editWorkOrder" class="action-btn">
          <el-icon><Edit /></el-icon>
          编辑
        </el-button>
        <el-button type="warning" @click="assignWorkOrder" class="action-btn">
          <el-icon><User /></el-icon>
          分配
        </el-button>
        <el-button type="danger" @click="cancelWorkOrder" class="action-btn">
          <el-icon><Close /></el-icon>
          取消
        </el-button>
      </div>
    </div>

    <el-card v-if="!isLoading" class="detail-card">
      <!-- 工单基本信息 -->
      <template #header>
        <div class="card-title">工单基本信息</div>
      </template>
      <el-row :gutter="[24, 24]">
        <el-col :span="12">
          <div class="info-item">
            <span class="label">工单编号：</span>
            <span class="value">{{ workOrderDetail.id }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-item">
            <span class="label">工单状态：</span>
            <el-tag
              :type="workOrderDetail.status === '待分配' ? 'warning' : 
                     workOrderDetail.status === '待上门' ? 'info' : 
                     workOrderDetail.status === '检测中' ? 'primary' : 
                     workOrderDetail.status === '施工中' ? 'success' : 
                     workOrderDetail.status === '已完成' ? 'success' : 'danger'"
            >
              {{ workOrderDetail.status }}
            </el-tag>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-item">
            <span class="label">服务类型：</span>
            <span class="value">{{ workOrderDetail.type }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-item">
            <span class="label">创建时间：</span>
            <span class="value">{{ workOrderDetail.createTime }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-item">
            <span class="label">预约时间：</span>
            <span class="value">{{ workOrderDetail.appointment }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-item">
            <span class="label">分配人员：</span>
            <span class="value">{{ workOrderDetail.staff }}</span>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 客户信息 -->
    <el-card v-if="!isLoading" class="detail-card">
      <template #header>
        <div class="card-title">客户信息</div>
      </template>
      <el-row :gutter="[24, 24]">
        <el-col :span="12">
          <div class="info-item">
            <span class="label">客户名称：</span>
            <span class="value">{{ workOrderDetail.customer }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-item">
            <span class="label">联系人：</span>
            <span class="value">{{ workOrderDetail.contact }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-item">
            <span class="label">联系电话：</span>
            <span class="value">{{ workOrderDetail.phone }}</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="info-item">
            <span class="label">服务地址：</span>
            <span class="value">{{ workOrderDetail.address }}</span>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 工单描述 -->
    <el-card v-if="!isLoading" class="detail-card">
      <template #header>
        <div class="card-title">工单描述</div>
      </template>
      <div class="description-content">{{ workOrderDetail.description }}</div>
      <div class="remark-content" v-if="workOrderDetail.remark">
        <span class="remark-label">备注：</span>
        <span class="remark-text">{{ workOrderDetail.remark }}</span>
      </div>
    </el-card>

    <!-- 工单流程记录 -->
    <el-card v-if="!isLoading" class="detail-card">
      <template #header>
        <div class="card-title">工单流程记录</div>
      </template>
      <div class="process-records">
        <div 
          v-for="record in workOrderDetail.processRecords" 
          :key="record.id" 
          class="process-record-item"
        >
          <div class="record-time">{{ record.time }}</div>
          <div class="record-content">
            <span class="operator">{{ record.operator }}：</span>
            <span class="content">{{ record.content }}</span>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 检测报告（如果有） -->
    <el-card v-if="!isLoading && workOrderDetail.inspectionReport" class="detail-card">
      <template #header>
        <div class="card-title">检测报告</div>
      </template>
      <div class="report-content">
        <el-button type="primary" link @click="" class="view-report-btn">
          <el-icon><Document /></el-icon>
          查看完整报告
        </el-button>
      </div>
    </el-card>

    <!-- 施工记录（如果有） -->
    <el-card v-if="!isLoading && workOrderDetail.constructionRecords.length > 0" class="detail-card">
      <template #header>
        <div class="card-title">施工记录</div>
      </template>
      <div class="construction-records">
        <div 
          v-for="record in workOrderDetail.constructionRecords" 
          :key="record.id" 
          class="construction-record-item"
        >
          <div class="record-header">
            <div class="record-date">{{ record.date }}</div>
            <div class="record-status">
              <el-tag type="success">已完成</el-tag>
            </div>
          </div>
          <div class="record-description">{{ record.description }}</div>
        </div>
      </div>
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
.work-order-detail-page {
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

/* 描述内容 */
.description-content {
  font-size: 14px;
  color: #333333;
  line-height: 1.6;
  margin-bottom: 16px;
}

.remark-content {
  display: flex;
  align-items: flex-start;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed #e8e8e8;
}

.remark-label {
  font-weight: 500;
  color: #666666;
  margin-right: 8px;
  min-width: 40px;
}

.remark-text {
  flex: 1;
  font-size: 14px;
  color: #333333;
  line-height: 1.6;
}

/* 流程记录 */
.process-records {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.process-record-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  background-color: #fafafa;
  border-radius: 6px;
}

.record-time {
  font-size: 12px;
  color: #999999;
}

.record-content {
  font-size: 14px;
  color: #333333;
  line-height: 1.5;
}

.record-content .operator {
  font-weight: 500;
  color: #1890ff;
}

/* 报告内容 */
.report-content {
  display: flex;
  justify-content: flex-start;
  padding: 12px 0;
}

.view-report-btn {
  display: flex;
  align-items: center;
}

.view-report-btn .el-icon {
  margin-right: 6px;
}

/* 施工记录 */
.construction-records {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.construction-record-item {
  padding: 16px;
  background-color: #fafafa;
  border-radius: 6px;
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.record-date {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
}

.record-description {
  font-size: 14px;
  color: #666666;
  line-height: 1.5;
}

/* 加载骨架 */
.loading-skeleton {
  margin-bottom: 24px;
}
</style>