<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 财务统计概览数据
const financeOverview = ref({
  totalIncome: 1500000,
  totalExpense: 800000,
  totalProfit: 700000,
  unpaidAmount: 250000,
  pendingReimbursement: 50000
})

// 收支明细数据
const financeDetailList = ref([
  { id: 1, date: '2023-10-15', type: '收入', category: '工程款', amount: 100000, description: 'XX大厦防水工程进度款', status: '已到账' },
  { id: 2, date: '2023-10-10', type: '支出', category: '材料费', amount: 50000, description: '购买防水卷材', status: '已支付' },
  { id: 3, date: '2023-10-08', type: '收入', category: '工程款', amount: 50000, description: 'XX小区防水维修尾款', status: '已到账' },
  { id: 4, date: '2023-10-05', type: '支出', category: '人工费', amount: 30000, description: '支付施工人员工资', status: '已支付' },
  { id: 5, date: '2023-10-01', type: '支出', category: '杂费', amount: 10000, description: '工地水电费', status: '已支付' }
])

// 筛选条件
const filters = ref({
  type: '',
  category: '',
  dateRange: [],
  status: ''
})

// 类型选项
const typeOptions = [
  { label: '全部', value: '' },
  { label: '收入', value: '收入' },
  { label: '支出', value: '支出' }
]

// 分类选项
const categoryOptions = [
  { label: '全部', value: '' },
  { label: '工程款', value: '工程款' },
  { label: '材料费', value: '材料费' },
  { label: '人工费', value: '人工费' },
  { label: '杂费', value: '杂费' },
  { label: '其他', value: '其他' }
]

// 状态选项
const statusOptions = [
  { label: '全部', value: '' },
  { label: '已到账', value: '已到账' },
  { label: '已支付', value: '已支付' },
  { label: '待到账', value: '待到账' },
  { label: '待支付', value: '待支付' }
]

// 新增财务记录
const addFinanceRecord = () => {
  ElMessage.info('新增财务记录功能')
  console.log('新增财务记录')
}

// 搜索财务记录
const searchFinanceRecord = () => {
  ElMessage.info('搜索财务记录')
  console.log('搜索财务记录:', filters.value)
}

// 导出财务报表
const exportFinanceReport = () => {
  ElMessage.success('财务报表导出成功')
  console.log('导出财务报表')
}

// 查看财务详情
const viewFinanceDetail = (item) => {
  ElMessage.info(`查看财务详情：${item.id}`)
  console.log('查看财务详情:', item)
}
</script>

<template>
  <div class="finance-management-page">
    <div class="page-header">
      <h1 class="page-title">财务管理</h1>
      <div class="header-actions">
        <el-button type="primary" @click="addFinanceRecord" class="action-btn">
          <el-icon><Plus /></el-icon>
          新增记录
        </el-button>
        <el-button type="success" @click="exportFinanceReport" class="action-btn">
          <el-icon><Download /></el-icon>
          导出报表
        </el-button>
      </div>
    </div>

    <!-- 财务统计概览 -->
    <el-card class="overview-card">
      <template #header>
        <div class="card-title">财务统计概览</div>
      </template>
      <div class="finance-overview">
        <div class="overview-item">
          <div class="overview-label">总收入</div>
          <div class="overview-value income">{{ `¥${financeOverview.totalIncome.toLocaleString()}` }}</div>
        </div>
        <div class="overview-item">
          <div class="overview-label">总支出</div>
          <div class="overview-value expense">{{ `¥${financeOverview.totalExpense.toLocaleString()}` }}</div>
        </div>
        <div class="overview-item">
          <div class="overview-label">总利润</div>
          <div class="overview-value profit">{{ `¥${financeOverview.totalProfit.toLocaleString()}` }}</div>
        </div>
        <div class="overview-item">
          <div class="overview-label">未收款项</div>
          <div class="overview-value unpaid">{{ `¥${financeOverview.unpaidAmount.toLocaleString()}` }}</div>
        </div>
        <div class="overview-item">
          <div class="overview-label">待报销</div>
          <div class="overview-value pending">{{ `¥${financeOverview.pendingReimbursement.toLocaleString()}` }}</div>
        </div>
      </div>
    </el-card>

    <!-- 筛选条件区 -->
    <el-card class="filter-card">
      <el-row :gutter="[16, 16]">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="收支类型">
            <el-select v-model="filters.type" placeholder="请选择收支类型">
              <el-option
                v-for="option in typeOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="分类">
            <el-select v-model="filters.category" placeholder="请选择分类">
              <el-option
                v-for="option in categoryOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="状态">
            <el-select v-model="filters.status" placeholder="请选择状态">
              <el-option
                v-for="option in statusOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="16" :lg="12">
          <el-form-item label="日期范围">
            <el-date-picker
              v-model="filters.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="12">
          <el-form-item>
            <el-button type="primary" @click="searchFinanceRecord" class="search-btn">
              <el-icon><Search /></el-icon>
              搜索
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <!-- 收支明细列表 -->
    <el-card class="finance-detail-card">
      <template #header>
        <div class="card-title">收支明细</div>
      </template>
      <el-table
        v-loading="false"
        :data="financeDetailList"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="日期"
          width="120"
        />
        <el-table-column
          prop="type"
          label="类型"
          width="80"
        >
          <template #default="scope">
            <el-tag :type="scope.row.type === '收入' ? 'success' : 'danger'">
              {{ scope.row.type }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="category"
          label="分类"
          width="100"
        />
        <el-table-column
          prop="amount"
          label="金额"
          width="120"
          :formatter="(row) => `${row.type === '收入' ? '+' : '-' }¥${row.amount.toLocaleString()}`"
        >
          <template #default="scope">
            <span :class="scope.row.type === '收入' ? 'amount-income' : 'amount-expense'">
              {{ scope.row.type === '收入' ? '+' : '-' }}{{ `¥${scope.row.amount.toLocaleString()}` }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          min-width="200"
        />
        <el-table-column
          prop="status"
          label="状态"
          width="100"
        >
          <template #default="scope">
            <el-tag
              :type="scope.row.status === '已到账' || scope.row.status === '已支付' ? 'success' : 'warning'"
            >
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
          fixed="right"
        >
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="viewFinanceDetail(scope.row)"
            >
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="100"
          :page-size="10"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.finance-management-page {
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

/* 财务统计概览卡片 */
.overview-card {
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.card-title {
  font-size: 16px;
  font-weight: 500;
  color: #333333;
}

.finance-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.overview-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: #fafafa;
  border-radius: 8px;
  transition: all 0.3s;
}

.overview-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.overview-label {
  font-size: 14px;
  color: #666666;
  margin-bottom: 8px;
}

.overview-value {
  font-size: 24px;
  font-weight: 600;
  color: #333333;
}

.overview-value.income {
  color: #67c23a;
}

.overview-value.expense {
  color: #f56c6c;
}

.overview-value.profit {
  color: #1890ff;
}

.overview-value.unpaid {
  color: #e6a23c;
}

.overview-value.pending {
  color: #909399;
}

/* 筛选条件区 */
.filter-card {
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.search-btn {
  display: flex;
  align-items: center;
}

.search-btn .el-icon {
  margin-right: 6px;
}

/* 收支明细卡片 */
.finance-detail-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
}

/* 金额样式 */
.amount-income {
  color: #67c23a;
  font-weight: 500;
}

.amount-expense {
  color: #f56c6c;
  font-weight: 500;
}

/* 分页 */
.pagination-container {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>