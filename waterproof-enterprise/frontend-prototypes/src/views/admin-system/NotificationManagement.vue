<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

// 搜索表单数据
const searchForm = reactive({
  title: '',
  type: '',
  status: ''
})

// 通知列表数据
const notificationList = ref([
  {
    id: 1,
    title: '系统维护通知',
    content: '系统将于2024-06-20 00:00-02:00进行维护，请提前做好准备。',
    type: '系统通知',
    status: '已发布',
    publisher: '管理员',
    publishTime: '2024-06-15 14:30:00',
    readCount: 15
  },
  {
    id: 2,
    title: '工单提醒',
    content: '您有新的工单需要处理，请及时查看。',
    type: '工单提醒',
    status: '已发布',
    publisher: '系统',
    publishTime: '2024-06-15 10:15:00',
    readCount: 8
  },
  {
    id: 3,
    title: '合同到期提醒',
    content: '合同HT20240001将于30天后到期，请及时处理。',
    type: '合同提醒',
    status: '已发布',
    publisher: '系统',
    publishTime: '2024-06-14 16:45:00',
    readCount: 5
  },
  {
    id: 4,
    title: '新功能上线通知',
    content: '系统已上线新功能，欢迎体验。',
    type: '系统通知',
    status: '草稿',
    publisher: '管理员',
    publishTime: '2024-06-13 09:30:00',
    readCount: 0
  }
])

// 通知类型选项
const notificationTypeOptions = [
  { label: '全部', value: '' },
  { label: '系统通知', value: '系统通知' },
  { label: '工单提醒', value: '工单提醒' },
  { label: '合同提醒', value: '合同提醒' }
]

// 通知状态选项
const notificationStatusOptions = [
  { label: '全部', value: '' },
  { label: '已发布', value: '已发布' },
  { label: '草稿', value: '草稿' }
]

// 状态颜色映射
const statusColorMap = {
  '已发布': 'success',
  '草稿': 'warning'
}

// 分页参数
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 4
})

// 搜索表单重置
const resetForm = () => {
  Object.assign(searchForm, {
    title: '',
    type: '',
    status: ''
  })
  handleSearch()
}

// 搜索处理
const handleSearch = () => {
  console.log('搜索条件:', searchForm)
  // 这里可以添加实际的搜索逻辑
}

// 新增通知
const addNotification = () => {
  // 这里可以添加新增通知的逻辑
  ElMessage.success('新增通知功能待实现')
}

// 编辑通知
const editNotification = (id) => {
  // 这里可以添加编辑通知的逻辑
  console.log('编辑通知:', id)
}

// 删除通知
const deleteNotification = (id) => {
  // 这里可以添加删除通知的逻辑
  console.log('删除通知:', id)
}

// 发布通知
const publishNotification = (id) => {
  // 这里可以添加发布通知的逻辑
  ElMessage.success('通知发布成功')
  console.log('发布通知:', id)
}
</script>

<template>
  <div class="notification-management-container">
    <el-card class="notification-management-card">
      <template #header>
        <div class="card-header">
          <h2 class="card-title">通知管理</h2>
          <el-button type="primary" class="action-btn" @click="addNotification">新增通知</el-button>
        </div>
      </template>
      
      <!-- 搜索区域 -->
      <div class="search-area">
        <el-form :model="searchForm" label-position="left" inline>
          <el-form-item label="通知标题">
            <el-input v-model="searchForm.title" placeholder="请输入通知标题" clearable />
          </el-form-item>
          <el-form-item label="通知类型">
            <el-select v-model="searchForm.type" placeholder="请选择通知类型" clearable>
              <el-option 
                v-for="option in notificationTypeOptions" 
                :key="option.value" 
                :label="option.label" 
                :value="option.value" 
              />
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
              <el-option 
                v-for="option in notificationStatusOptions" 
                :key="option.value" 
                :label="option.label" 
                :value="option.value" 
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      
      <!-- 通知列表 -->
      <div class="notification-list">
        <el-table :data="notificationList" stripe style="width: 100%">
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="title" label="通知标题" />
          <el-table-column prop="content" label="通知内容" show-overflow-tooltip>
            <template #default="scope">
              <span class="notification-content">{{ scope.row.content }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="通知类型" width="120">
            <template #default="scope">
              <el-tag type="info">{{ scope.row.type }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <el-tag :type="statusColorMap[scope.row.status]">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="readCount" label="阅读数" width="100" />
          <el-table-column prop="publisher" label="发布人" width="120" />
          <el-table-column prop="publishTime" label="发布时间" width="150" />
          <el-table-column label="操作" width="240" fixed="right">
            <template #default="scope">
              <el-button type="primary" size="small" link @click="editNotification(scope.row.id)">编辑</el-button>
              <el-button 
                v-if="scope.row.status === '草稿'"
                type="success" 
                size="small" 
                link 
                @click="publishNotification(scope.row.id)"
              >
                发布
              </el-button>
              <el-button type="danger" size="small" link @click="deleteNotification(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
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
.notification-management-container {
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

.notification-list {
  margin-top: 20px;
}

.notification-content {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>