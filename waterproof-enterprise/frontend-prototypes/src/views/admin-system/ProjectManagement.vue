<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 项目列表数据
const projectList = ref([
  {
    id: 'XM20231001',
    name: 'XX大厦防水工程',
    contractId: 'HT20231001',
    customer: 'XX企业',
    contact: '张三',
    amount: 500000,
    status: '进行中',
    startDate: '2023-10-01',
    endDate: '2023-12-31',
    createTime: '2023-09-25',
    progress: 30
  },
  {
    id: 'XM20230901',
    name: 'XX小区防水维修',
    contractId: 'HT20230901',
    customer: 'XX物业公司',
    contact: '李四',
    amount: 200000,
    status: '已完成',
    startDate: '2023-09-01',
    endDate: '2023-09-30',
    createTime: '2023-08-25',
    progress: 100
  },
  {
    id: 'XM20230801',
    name: 'XX商场防水改造',
    contractId: 'HT20230801',
    customer: 'XX商业公司',
    contact: '王五',
    amount: 350000,
    status: '已完成',
    startDate: '2023-08-01',
    endDate: '2023-08-31',
    createTime: '2023-07-25',
    progress: 100
  }
])

// 选中的项目
const selectedProjects = ref([])

// 筛选条件
const filters = ref({
  status: '',
  customer: '',
  dateRange: []
})

// 项目状态选项
const statusOptions = [
  { label: '全部', value: '' },
  { label: '未开始', value: '未开始' },
  { label: '进行中', value: '进行中' },
  { label: '已完成', value: '已完成' },
  { label: '已暂停', value: '已暂停' },
  { label: '已终止', value: '已终止' }
]

// 新增项目
const addProject = () => {
  ElMessage.info('新增项目功能')
  console.log('新增项目')
}

// 批量操作
const batchOperation = () => {
  if (selectedProjects.value.length === 0) {
    ElMessage.warning('请选择要操作的项目')
    return
  }
  ElMessage.info(`批量操作 ${selectedProjects.value.length} 个项目`)
  console.log('批量操作:', selectedProjects.value)
}

// 搜索项目
const searchProject = () => {
  ElMessage.info('搜索项目')
  console.log('搜索项目:', filters.value)
}

// 查看项目详情
const viewProjectDetail = (item) => {
  ElMessage.info(`查看项目详情：${item.id}`)
  console.log('查看项目详情:', item)
}

// 编辑项目
const editProject = (item) => {
  ElMessage.info(`编辑项目：${item.id}`)
  console.log('编辑项目:', item)
}

// 暂停项目
const pauseProject = (item) => {
  ElMessage.info(`暂停项目：${item.id}`)
  console.log('暂停项目:', item)
}

// 删除项目
const deleteProject = (item) => {
  ElMessageBox.confirm('确定要删除该项目吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    projectList.value = projectList.value.filter(project => project.id !== item.id)
    ElMessage.success('删除成功')
  }).catch(() => {
    // 取消删除
  })
}
</script>

<template>
  <div class="project-management-page">
    <div class="page-header">
      <h1 class="page-title">项目管理</h1>
    </div>

    <!-- 操作按钮组 -->
    <div class="operation-buttons">
      <el-button type="primary" @click="addProject" class="operation-btn">
        <el-icon><Plus /></el-icon>
        新增项目
      </el-button>
      <el-button type="warning" @click="batchOperation" class="operation-btn">
        <el-icon><More /></el-icon>
        批量操作
      </el-button>
    </div>

    <!-- 筛选条件区 -->
    <el-card class="filter-card">
      <el-row :gutter="[16, 16]">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="项目状态">
            <el-select v-model="filters.status" placeholder="请选择项目状态">
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
            <el-button type="primary" @click="searchProject" class="search-btn">
              <el-icon><Search /></el-icon>
              搜索
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <!-- 项目列表 -->
    <el-card class="project-card">
      <template #header>
        <div class="card-header">
          <span>项目列表</span>
          <el-badge :value="projectList.length" type="primary" class="project-count" />
        </div>
      </template>
      <el-table
        v-loading="false"
        :data="projectList"
        @selection-change="selectedProjects = $event"
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="id"
          label="项目编号"
          min-width="150"
        />
        <el-table-column
          prop="name"
          label="项目名称"
          min-width="200"
        />
        <el-table-column
          prop="contractId"
          label="合同编号"
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
          prop="amount"
          label="项目金额"
          width="120"
          :formatter="(row) => `¥${row.amount.toLocaleString()}`"
        />
        <el-table-column
          prop="status"
          label="项目状态"
          width="100"
        >
          <template #default="scope">
            <el-tag
              :type="scope.row.status === '未开始' ? 'info' : 
                     scope.row.status === '进行中' ? 'success' : 
                     scope.row.status === '已完成' ? 'success' : 
                     scope.row.status === '已暂停' ? 'warning' : 'danger'"
            >
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="progress"
          label="项目进度"
          width="150"
        >
          <template #default="scope">
            <div class="progress-cell">
              <el-progress 
                :percentage="scope.row.progress" 
                :format="(percentage) => `${percentage}%`" 
                size="small"
              />
            </div>
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
              @click="viewProjectDetail(scope.row)"
            >
              查看
            </el-button>
            <el-button
              type="success"
              size="small"
              @click="editProject(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="warning"
              size="small"
              @click="pauseProject(scope.row)"
              :disabled="scope.row.status === '已完成' || scope.row.status === '已终止'"
            >
              {{ scope.row.status === '已暂停' ? '恢复' : '暂停' }}
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="deleteProject(scope.row)"
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
.project-management-page {
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

/* 项目列表 */
.project-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.project-count {
  margin-left: 12px;
}

/* 进度单元格 */
.progress-cell {
  padding: 4px 0;
}

/* 分页 */
.pagination-container {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>