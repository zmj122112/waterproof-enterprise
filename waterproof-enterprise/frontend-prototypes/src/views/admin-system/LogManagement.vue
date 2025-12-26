<script setup>
import { ref, reactive } from 'vue'

// 搜索表单数据
const searchForm = reactive({
  operator: '',
  operationType: '',
  dateRange: []
})

// 日志列表数据
const logList = ref([
  {
    id: 1,
    operator: '管理员',
    operationType: '登录',
    operationContent: '用户登录系统',
    ipAddress: '192.168.1.1',
    operationTime: '2024-06-15 10:30:25'
  },
  {
    id: 2,
    operator: '管理员',
    operationType: '工单管理',
    operationContent: '创建新工单',
    ipAddress: '192.168.1.1',
    operationTime: '2024-06-15 09:15:42'
  },
  {
    id: 3,
    operator: '张三',
    operationType: '合同管理',
    operationContent: '编辑合同信息',
    ipAddress: '192.168.1.2',
    operationTime: '2024-06-14 16:45:18'
  },
  {
    id: 4,
    operator: '李四',
    operationType: '项目管理',
    operationContent: '更新项目进度',
    ipAddress: '192.168.1.3',
    operationTime: '2024-06-14 14:20:33'
  },
  {
    id: 5,
    operator: '王五',
    operationType: '财务管理',
    operationContent: '添加财务记录',
    ipAddress: '192.168.1.4',
    operationTime: '2024-06-14 11:05:59'
  }
])

// 分页参数
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 5
})

// 搜索表单重置
const resetForm = () => {
  Object.assign(searchForm, {
    operator: '',
    operationType: '',
    dateRange: []
  })
  handleSearch()
}

// 搜索处理
const handleSearch = () => {
  console.log('搜索条件:', searchForm)
  // 这里可以添加实际的搜索逻辑
}

// 导出日志
const exportLogs = () => {
  // 这里可以添加导出日志的逻辑
  console.log('导出日志')
}
</script>

<template>
  <div class="log-management-container">
    <el-card class="log-management-card">
      <template #header>
        <div class="card-header">
          <h2 class="card-title">日志管理</h2>
          <el-button type="primary" class="action-btn" @click="exportLogs">导出日志</el-button>
        </div>
      </template>
      
      <!-- 搜索区域 -->
      <div class="search-area">
        <el-form :model="searchForm" label-position="left" inline>
          <el-form-item label="操作人">
            <el-input v-model="searchForm.operator" placeholder="请输入操作人" clearable />
          </el-form-item>
          <el-form-item label="操作类型">
            <el-select v-model="searchForm.operationType" placeholder="请选择操作类型" clearable>
              <el-option label="登录" value="登录" />
              <el-option label="工单管理" value="工单管理" />
              <el-option label="合同管理" value="合同管理" />
              <el-option label="项目管理" value="项目管理" />
              <el-option label="财务管理" value="财务管理" />
            </el-select>
          </el-form-item>
          <el-form-item label="操作时间">
            <el-date-picker
              v-model="searchForm.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 320px"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      
      <!-- 日志列表 -->
      <div class="log-list">
        <el-table :data="logList" stripe style="width: 100%">
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="operator" label="操作人" width="120" />
          <el-table-column prop="operationType" label="操作类型" width="120">
            <template #default="scope">
              <el-tag type="info">{{ scope.row.operationType }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="operationContent" label="操作内容" show-overflow-tooltip />
          <el-table-column prop="ipAddress" label="IP地址" width="150" />
          <el-table-column prop="operationTime" label="操作时间" width="200" />
        </el-table>
        
        <!-- 分页 -->
        <div class="pagination-container">
          <el-pagination
            v-model:current-page="pagination.currentPage"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.log-management-container {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.action-btn {
  margin: 0;
}

.search-area {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 8px;
}

.log-list {
  margin-top: 20px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>