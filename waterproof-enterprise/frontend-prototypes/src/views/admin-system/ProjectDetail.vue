<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowLeft, DataLine, Edit, Close, Document, Download, Picture } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

// 项目详情数据
const projectDetail = ref(null)
const isLoading = ref(true)

// 模拟获取项目详情
const fetchProjectDetail = () => {
  isLoading.value = true
  // 模拟API请求延迟
  setTimeout(() => {
    // 模拟数据
    projectDetail.value = {
      id: route.params.id || 'XM20231001',
      name: 'XX大厦防水工程',
      contractId: 'HT20231001',
      customer: 'XX企业',
      customerContact: '张三',
      customerPhone: '13800138000',
      amount: 500000,
      status: '进行中',
      progress: 30,
      startDate: '2023-10-01',
      endDate: '2023-12-31',
      createTime: '2023-09-25',
      // 项目团队
      team: [
        { id: 1, name: '项目经理', role: '李经理', phone: '13900139000' },
        { id: 2, name: '施工队长', role: '张队长', phone: '13700137000' },
        { id: 3, name: '技术员', role: '王工', phone: '13600136000' },
        { id: 4, name: '施工人员', role: '刘师傅', phone: '13500135000' },
        { id: 5, name: '施工人员', role: '赵师傅', phone: '13400134000' }
      ],
      // 施工记录
      constructionRecords: [
        {
          id: 1,
          date: '2023-10-05',
          content: '完成现场勘测和施工方案制定',
          operator: '李经理',
          photos: 3
        },
        {
          id: 2,
          date: '2023-10-10',
          content: '材料进场，开始基层处理',
          operator: '张队长',
          photos: 5
        },
        {
          id: 3,
          date: '2023-10-15',
          content: '完成防水涂层施工第一遍',
          operator: '张队长',
          photos: 4
        }
      ],
      // 物料使用情况
      materialUsage: [
        { id: 1, name: '防水卷材', spec: '1.5mm厚', unit: '平方米', planned: 500, used: 200, remaining: 300 },
        { id: 2, name: '防水涂料', spec: '双组份', unit: '桶', planned: 20, used: 8, remaining: 12 },
        { id: 3, name: '密封胶', spec: '中性硅酮', unit: '支', planned: 50, used: 20, remaining: 30 },
        { id: 4, name: '基层处理剂', spec: '水性', unit: '桶', planned: 10, used: 4, remaining: 6 }
      ],
      // 项目文档
      documents: [
        { id: 1, name: '施工方案.docx', size: '1.8MB', uploadTime: '2023-09-28 10:30:00' },
        { id: 2, name: '安全交底记录.pdf', size: '500KB', uploadTime: '2023-10-01 09:00:00' },
        { id: 3, name: '材料检验报告.pdf', size: '2.2MB', uploadTime: '2023-10-08 14:30:00' }
      ],
      // 备注
      remark: '项目位于市中心，施工时间需避开早晚高峰期，注意噪音控制'
    }
    isLoading.value = false
  }, 500)
}

// 编辑项目
const editProject = () => {
  ElMessage.info('编辑项目功能')
  console.log('编辑项目:', projectDetail.value.id)
}

// 更新项目进度
const updateProjectProgress = () => {
  ElMessage.info('更新项目进度功能')
  console.log('更新项目进度:', projectDetail.value.id)
}

// 暂停项目
const pauseProject = () => {
  ElMessage.info('暂停项目功能')
  console.log('暂停项目:', projectDetail.value.id)
}

// 返回项目列表
const backToList = () => {
  router.push('/admin-system/project-management')
}

// 生命周期钩子，组件挂载时获取数据
onMounted(() => {
  fetchProjectDetail()
})
</script>

<template>
  <div class="project-detail-page">
    <div class="page-header">
      <div class="header-left">
        <el-button type="primary" @click="backToList" class="back-btn">
          <el-icon><ArrowLeft /></el-icon>
          返回列表
        </el-button>
        <h1 class="page-title">项目详情</h1>
      </div>
      <div class="header-actions">
        <el-button type="success" @click="updateProjectProgress" class="action-btn">
          <el-icon><DataLine /></el-icon>
          更新进度
        </el-button>
        <el-button type="warning" @click="editProject" class="action-btn">
          <el-icon><Edit /></el-icon>
          编辑
        </el-button>
        <el-button type="danger" @click="pauseProject" class="action-btn" :disabled="projectDetail?.status === '已完成' || projectDetail?.status === '已终止'">
          <el-icon><Close /></el-icon>
          {{ projectDetail?.status === '已暂停' ? '恢复' : '暂停' }}
        </el-button>
      </div>
    </div>

    <el-card v-if="!isLoading" class="detail-card">
      <!-- 项目基本信息 -->
      <template #header>
        <div class="card-title">项目基本信息</div>
      </template>
      <el-row :gutter="[24, 24]">
        <el-col :span="12">
          <div class="info-item">
            <span class="label">项目编号：</span>
            <span class="value">{{ projectDetail.id }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-item">
            <span class="label">项目状态：</span>
            <el-tag
              :type="projectDetail.status === '未开始' ? 'info' : 
                     projectDetail.status === '进行中' ? 'success' : 
                     projectDetail.status === '已完成' ? 'success' : 
                     projectDetail.status === '已暂停' ? 'warning' : 'danger'"
            >
              {{ projectDetail.status }}
            </el-tag>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="info-item">
            <span class="label">项目名称：</span>
            <span class="value">{{ projectDetail.name }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-item">
            <span class="label">合同编号：</span>
            <span class="value">{{ projectDetail.contractId }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-item">
            <span class="label">项目金额：</span>
            <span class="value amount">{{ `¥${projectDetail.amount.toLocaleString()}` }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-item">
            <span class="label">客户名称：</span>
            <span class="value">{{ projectDetail.customer }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-item">
            <span class="label">联系人：</span>
            <span class="value">{{ projectDetail.customerContact }} ({{ projectDetail.customerPhone }})</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-item">
            <span class="label">开始日期：</span>
            <span class="value">{{ projectDetail.startDate }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-item">
            <span class="label">结束日期：</span>
            <span class="value">{{ projectDetail.endDate }}</span>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="info-item">
            <span class="label">创建时间：</span>
            <span class="value">{{ projectDetail.createTime }}</span>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="info-item">
            <span class="label">项目进度：</span>
            <el-progress 
              :percentage="projectDetail.progress" 
              :format="(percentage) => `${percentage}%`" 
              class="progress-bar"
            />
          </div>
        </el-col>
      </el-row>
    </el-card>

    <!-- 项目团队 -->
    <el-card v-if="!isLoading" class="detail-card">
      <template #header>
        <div class="card-title">项目团队</div>
      </template>
      <div class="team-list">
        <div 
          v-for="member in projectDetail.team" 
          :key="member.id" 
          class="team-member-item"
        >
          <div class="member-info">
            <div class="member-name">{{ member.name }}</div>
            <div class="member-role">{{ member.role }}</div>
          </div>
          <div class="member-contact">{{ member.phone }}</div>
        </div>
      </div>
    </el-card>

    <!-- 施工记录 -->
    <el-card v-if="!isLoading" class="detail-card">
      <template #header>
        <div class="card-title">施工记录</div>
      </template>
      <div class="construction-records">
        <div 
          v-for="record in projectDetail.constructionRecords" 
          :key="record.id" 
          class="construction-record-item"
        >
          <div class="record-header">
            <div class="record-date">{{ record.date }}</div>
            <div class="record-operator">{{ record.operator }}</div>
          </div>
          <div class="record-content">
            <span class="content-text">{{ record.content }}</span>
            <div class="record-photos" v-if="record.photos > 0">
              <el-icon><Picture /></el-icon>
              <span>{{ record.photos }}张照片</span>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 物料使用情况 -->
    <el-card v-if="!isLoading" class="detail-card">
      <template #header>
        <div class="card-title">物料使用情况</div>
      </template>
      <div class="material-usage">
        <el-table
          :data="projectDetail.materialUsage"
          style="width: 100%"
          :border="false"
        >
          <el-table-column
            prop="name"
            label="物料名称"
            min-width="150"
          />
          <el-table-column
            prop="spec"
            label="规格型号"
            min-width="120"
          />
          <el-table-column
            prop="unit"
            label="单位"
            width="80"
          />
          <el-table-column
            prop="planned"
            label="计划用量"
            width="100"
          />
          <el-table-column
            prop="used"
            label="已用量"
            width="100"
          />
          <el-table-column
            prop="remaining"
            label="剩余量"
            width="100"
          />
        </el-table>
      </div>
    </el-card>

    <!-- 项目文档 -->
    <el-card v-if="!isLoading" class="detail-card">
      <template #header>
        <div class="card-title">项目文档</div>
      </template>
      <div class="documents-list">
        <div 
          v-for="doc in projectDetail.documents" 
          :key="doc.id" 
          class="document-item"
        >
          <div class="document-info">
            <el-icon class="file-icon"><Document /></el-icon>
            <div class="file-info">
              <div class="file-name">{{ doc.name }}</div>
              <div class="file-meta">{{ doc.size }} | {{ doc.uploadTime }}</div>
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
    <el-card v-if="!isLoading && projectDetail.remark" class="detail-card">
      <template #header>
        <div class="card-title">备注</div>
      </template>
      <div class="remark-content">{{ projectDetail.remark }}</div>
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
.project-detail-page {
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

.progress-bar {
  flex: 1;
}

/* 项目团队 */
.team-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.team-member-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #fafafa;
  border-radius: 6px;
}

.member-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.member-name {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
}

.member-role {
  font-size: 12px;
  color: #666666;
}

.member-contact {
  font-size: 14px;
  color: #333333;
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

.record-operator {
  font-size: 12px;
  color: #666666;
}

.record-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content-text {
  flex: 1;
  font-size: 14px;
  color: #333333;
  line-height: 1.5;
}

.record-photos {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #1890ff;
  gap: 4px;
}

/* 物料使用情况 */
.material-usage {
  margin: 0;
}

/* 项目文档 */
.documents-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.document-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #fafafa;
  border-radius: 6px;
}

.document-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.file-icon {
  color: #1890ff;
  font-size: 24px;
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
  color: #666666;
}

.download-btn {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 备注 */
.remark-content {
  padding: 12px;
  background-color: #fafafa;
  border-radius: 6px;
  font-size: 14px;
  color: #333333;
  line-height: 1.5;
}

/* 加载状态 */
.loading-skeleton {
  margin-bottom: 24px;
}
</style>