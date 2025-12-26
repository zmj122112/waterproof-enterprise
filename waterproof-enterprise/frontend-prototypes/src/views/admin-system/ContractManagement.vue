<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 合同列表数据
const contractList = ref([
  {
    id: 'HT20231001',
    name: 'XX大厦防水工程',
    customer: 'XX企业',
    contact: '张三',
    amount: 500000,
    status: '执行中',
    startDate: '2023-10-01',
    endDate: '2023-12-31',
    createTime: '2023-09-25'
  },
  {
    id: 'HT20230901',
    name: 'XX小区防水维修',
    customer: 'XX物业公司',
    contact: '李四',
    amount: 200000,
    status: '已完成',
    startDate: '2023-09-01',
    endDate: '2023-09-30',
    createTime: '2023-08-25'
  },
  {
    id: 'HT20230801',
    name: 'XX商场防水改造',
    customer: 'XX商业公司',
    contact: '王五',
    amount: 350000,
    status: '已完成',
    startDate: '2023-08-01',
    endDate: '2023-08-31',
    createTime: '2023-07-25'
  }
])

// 选中的合同
const selectedContracts = ref([])

// 筛选条件
const filters = ref({
  status: '',
  customer: '',
  dateRange: []
})

// 合同状态选项
const statusOptions = [
  { label: '全部', value: '' },
  { label: '待审核', value: '待审核' },
  { label: '已通过', value: '已通过' },
  { label: '执行中', value: '执行中' },
  { label: '已完成', value: '已完成' },
  { label: '已终止', value: '已终止' }
]

// 新增合同
const addContract = () => {
  ElMessage.info('新增合同功能')
  console.log('新增合同')
}

// 批量操作
const batchOperation = () => {
  if (selectedContracts.value.length === 0) {
    ElMessage.warning('请选择要操作的合同')
    return
  }
  ElMessage.info(`批量操作 ${selectedContracts.value.length} 个合同`)
  console.log('批量操作:', selectedContracts.value)
}

// 导入合同
const importContract = () => {
  ElMessage.success('合同导入成功')
  console.log('导入合同')
}

// 导出合同
const exportContract = () => {
  ElMessage.success('合同导出成功')
  console.log('导出合同')
}

// 搜索合同
const searchContract = () => {
  ElMessage.info('搜索合同')
  console.log('搜索合同:', filters.value)
}

// 查看合同详情
const viewContractDetail = (item) => {
  ElMessage.info(`查看合同详情：${item.id}`)
  console.log('查看合同详情:', item)
}

// 编辑合同
const editContract = (item) => {
  ElMessage.info(`编辑合同：${item.id}`)
  console.log('编辑合同:', item)
}

// 删除合同
const deleteContract = (item) => {
  ElMessageBox.confirm('确定要删除该合同吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    contractList.value = contractList.value.filter(contract => contract.id !== item.id)
    ElMessage.success('删除成功')
  }).catch(() => {
    // 取消删除
  })
}
</script>

<template>
  <div class="contract-management-page">
    <div class="page-header">
      <h1 class="page-title">合同管理</h1>
    </div>

    <!-- 操作按钮组 -->
    <div class="operation-buttons">
      <el-button type="primary" @click="addContract" class="operation-btn">
        <el-icon><Plus /></el-icon>
        新增合同
      </el-button>
      <el-button type="warning" @click="batchOperation" class="operation-btn">
        <el-icon><More /></el-icon>
        批量操作
      </el-button>
      <el-button type="success" @click="importContract" class="operation-btn">
        <el-icon><Upload /></el-icon>
        导入合同
      </el-button>
      <el-button type="info" @click="exportContract" class="operation-btn">
        <el-icon><Download /></el-icon>
        导出合同
      </el-button>
    </div>

    <!-- 筛选条件区 -->
    <el-card class="filter-card">
      <el-row :gutter="[16, 16]">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="合同状态">
            <el-select v-model="filters.status" placeholder="请选择合同状态">
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
          <el-form-item label="客户名称">
            <el-input v-model="filters.customer" placeholder="请输入客户名称" />
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
            <el-button type="primary" @click="searchContract" class="search-btn">
              <el-icon><Search /></el-icon>
              搜索
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <!-- 合同列表 -->
    <el-card class="contract-card">
      <template #header>
        <div class="card-header">
          <span>合同列表</span>
          <el-badge :value="contractList.length" type="primary" class="contract-count" />
        </div>
      </template>
      <el-table
        v-loading="false"
        :data="contractList"
        @selection-change="selectedContracts = $event"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="id"
          label="合同编号"
          min-width="150"
        />
        <el-table-column
          prop="name"
          label="项目名称"
          min-width="200"
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
          prop="amount"
          label="合同金额"
          width="120"
          :formatter="(row) => `¥${row.amount.toLocaleString()}`"
        />
        <el-table-column
          prop="status"
          label="合同状态"
          width="100"
        >
          <template #default="scope">
            <el-tag
              :type="scope.row.status === '待审核' ? 'warning' : 
                     scope.row.status === '已通过' ? 'primary' : 
                     scope.row.status === '执行中' ? 'success' : 
                     scope.row.status === '已完成' ? 'success' : 'danger'"
            >
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="startDate"
          label="开始日期"
          width="120"
        />
        <el-table-column
          prop="endDate"
          label="结束日期"
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
              @click="viewContractDetail(scope.row)"
            >
              查看
            </el-button>
            <el-button
              type="success"
              size="small"
              @click="editContract(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="deleteContract(scope.row)"
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
.contract-management-page {
  padding: 0;
}

.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #333333;
  margin: 0;
}

/* 操作按钮组 */
.operation-buttons {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
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

/* 合同列表 */
.contract-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.contract-count {
  margin-left: 12px;
}

/* 分页 */
.pagination-container {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>