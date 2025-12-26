<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 工单列表数据
const workOrderList = ref([
  {
    id: 'WD20231015001',
    customer: '企业客户A',
    contact: '张三',
    type: '上门检测',
    status: '待分配',
    staff: '未分配',
    appointment: '2023-10-15',
    createTime: '2023-10-15'
  },
  {
    id: 'WD20231016002',
    customer: '个人客户B',
    contact: '李四',
    type: '直接施工',
    status: '施工中',
    staff: '李师傅',
    appointment: '2023-10-16',
    createTime: '2023-10-16'
  },
  {
    id: 'WD20231017003',
    customer: '企业客户C',
    contact: '王五',
    type: '上门检测',
    status: '已完成',
    staff: '王师傅',
    appointment: '2023-10-17',
    createTime: '2023-10-17'
  }
])

// 选中的工单
const selectedWorkOrders = ref([])

// 筛选条件
const filters = ref({
  status: '',
  type: '',
  dateRange: []
})

// 工单状态选项
const statusOptions = [
  { label: '全部', value: '' },
  { label: '待分配', value: '待分配' },
  { label: '待上门', value: '待上门' },
  { label: '检测中', value: '检测中' },
  { label: '施工中', value: '施工中' },
  { label: '已完成', value: '已完成' },
  { label: '已取消', value: '已取消' }
]

// 服务类型选项
const typeOptions = [
  { label: '全部', value: '' },
  { label: '上门检测', value: '上门检测' },
  { label: '直接施工', value: '直接施工' }
]

// 新增工单
const addWorkOrder = () => {
  ElMessage.info('新增工单功能')
  console.log('新增工单')
}

// 批量操作
const batchOperation = () => {
  if (selectedWorkOrders.value.length === 0) {
    ElMessage.warning('请选择要操作的工单')
    return
  }
  ElMessage.info(`批量操作 ${selectedWorkOrders.value.length} 个工单`)
  console.log('批量操作:', selectedWorkOrders.value)
}

// 导入工单
const importWorkOrder = () => {
  ElMessage.success('工单导入成功')
  console.log('导入工单')
}

// 导出工单
const exportWorkOrder = () => {
  ElMessage.success('工单导出成功')
  console.log('导出工单')
}

// 搜索工单
const searchWorkOrder = () => {
  ElMessage.info('搜索工单')
  console.log('搜索工单:', filters.value)
}

// 查看工单详情
const viewWorkOrderDetail = (item) => {
  ElMessage.info(`查看工单详情：${item.id}`)
  console.log('查看工单详情:', item)
}

// 编辑工单
const editWorkOrder = (item) => {
  ElMessage.info(`编辑工单：${item.id}`)
  console.log('编辑工单:', item)
}

// 分配工单
const assignWorkOrder = (item) => {
  ElMessage.info(`分配工单：${item.id}`)
  console.log('分配工单:', item)
}

// 删除工单
const deleteWorkOrder = (item) => {
  ElMessageBox.confirm('确定要删除该工单吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    workOrderList.value = workOrderList.value.filter(order => order.id !== item.id)
    ElMessage.success('删除成功')
  }).catch(() => {
    // 取消删除
  })
}
</script>

<template>
  <div class="work-order-management-page">
    <div class="page-header">
      <h1 class="page-title">工单管理</h1>
    </div>

    <!-- 操作按钮组 -->
    <div class="operation-buttons">
      <el-button type="primary" @click="addWorkOrder" class="operation-btn">
        <el-icon><Plus /></el-icon>
        新增工单
      </el-button>
      <el-button type="warning" @click="batchOperation" class="operation-btn">
        <el-icon><More /></el-icon>
        批量操作
      </el-button>
      <el-button type="success" @click="importWorkOrder" class="operation-btn">
        <el-icon><Upload /></el-icon>
        导入工单
      </el-button>
      <el-button type="info" @click="exportWorkOrder" class="operation-btn">
        <el-icon><Download /></el-icon>
        导出工单
      </el-button>
    </div>

    <!-- 筛选条件区 -->
    <el-card class="filter-card">
      <el-row :gutter="[16, 16]">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="工单状态">
            <el-select v-model="filters.status" placeholder="请选择工单状态">
              <el-option
                v-for="option in statusOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="服务类型">
            <el-select v-model="filters.type" placeholder="请选择服务类型">
              <el-option
                v-for="option in typeOptions"
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
            <el-button type="primary" @click="searchWorkOrder" class="search-btn">
              <el-icon><Search /></el-icon>
              搜索
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <!-- 工单列表 -->
    <el-card class="work-order-card">
      <template #header>
        <div class="card-header">
          <span>工单列表</span>
          <el-badge :value="workOrderList.length" type="primary" class="work-order-count" />
        </div>
      </template>
      <el-table
        v-loading="false"
        :data="workOrderList"
        @selection-change="selectedWorkOrders = $event"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="id"
          label="工单编号"
          min-width="150"
        />
        <el-table-column
          prop="customer"
          label="客户名称"
          min-width="120"
        />
        <el-table-column
          prop="contact"
          label="联系人"
          width="100"
        />
        <el-table-column
          prop="type"
          label="服务类型"
          width="120"
        />
        <el-table-column
          prop="status"
          label="工单状态"
          width="100"
        >
          <template #default="scope">
            <el-tag
              :type="scope.row.status === '待分配' ? 'warning' : 
                     scope.row.status === '待上门' ? 'info' : 
                     scope.row.status === '检测中' ? 'primary' : 
                     scope.row.status === '施工中' ? 'success' : 
                     scope.row.status === '已完成' ? 'success' : 'danger'"
            >
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="staff"
          label="分配人员"
          width="100"
        />
        <el-table-column
          prop="appointment"
          label="预约时间"
          width="120"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="120"
        />
        <el-table-column
          label="操作"
          width="200"
          fixed="right"
        >
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="viewWorkOrderDetail(scope.row)"
            >
              查看
            </el-button>
            <el-button
              type="success"
              size="small"
              @click="editWorkOrder(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="warning"
              size="small"
              @click="assignWorkOrder(scope.row)"
            >
              分配
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="deleteWorkOrder(scope.row)"
            >
              删除
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
.work-order-management-page {
  padding: 0;
}

.page-header {
  margin-bottom: $spacing-lg;
}

.page-title {
  font-size: $font-size-xl;
  font-weight: $font-weight-semibold;
  color: $text-primary;
  margin: 0;
}

/* 操作按钮组 */
.operation-buttons {
  display: flex;
  gap: $spacing-md;
  margin-bottom: $spacing-lg;
  flex-wrap: wrap;
}

.operation-btn {
  display: flex;
  align-items: center;
}

.operation-btn .el-icon {
  margin-right: 6px;
}

/* 筛选条件区 */
.filter-card {
  margin-bottom: $spacing-lg;
  box-shadow: $shadow-sm;
}

.search-btn {
  display: flex;
  align-items: center;
}

.search-btn .el-icon {
  margin-right: 6px;
}

/* 工单列表 */
.work-order-card {
  box-shadow: $shadow-sm;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.work-order-count {
  margin-left: $spacing-sm;
}

/* 分页 */
.pagination-container {
  margin-top: $spacing-md;
  display: flex;
  justify-content: flex-end;
}
</style>