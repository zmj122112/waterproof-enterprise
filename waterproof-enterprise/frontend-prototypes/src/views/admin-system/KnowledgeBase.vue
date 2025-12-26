<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 知识库列表数据
const knowledgeList = ref([
  {
    id: 'KB20231001',
    title: '防水施工技术规范',
    category: '技术文档',
    author: '技术部',
    publishDate: '2023-10-15',
    viewCount: 120,
    downloadCount: 50,
    status: '已发布'
  },
  {
    id: 'KB20231002',
    title: '卫生间防水施工案例',
    category: '案例库',
    author: '技术部',
    publishDate: '2023-10-10',
    viewCount: 80,
    downloadCount: 30,
    status: '已发布'
  },
  {
    id: 'KB20231003',
    title: '屋顶防水维修解决方案',
    category: '解决方案',
    author: '技术部',
    publishDate: '2023-10-05',
    viewCount: 150,
    downloadCount: 60,
    status: '已发布'
  },
  {
    id: 'KB20231004',
    title: '新型防水材料介绍',
    category: '产品知识',
    author: '技术部',
    publishDate: '2023-10-01',
    viewCount: 90,
    downloadCount: 40,
    status: '已发布'
  }
])

// 筛选条件
const filters = ref({
  category: '',
  status: '',
  keyword: ''
})

// 分类选项
const categoryOptions = [
  { label: '全部', value: '' },
  { label: '技术文档', value: '技术文档' },
  { label: '案例库', value: '案例库' },
  { label: '解决方案', value: '解决方案' },
  { label: '产品知识', value: '产品知识' }
]

// 状态选项
const statusOptions = [
  { label: '全部', value: '' },
  { label: '已发布', value: '已发布' },
  { label: '草稿', value: '草稿' },
  { label: '已下架', value: '已下架' }
]

// 新增知识库
const addKnowledge = () => {
  ElMessage.info('新增知识库功能')
  console.log('新增知识库')
}

// 搜索知识库
const searchKnowledge = () => {
  ElMessage.info('搜索知识库')
  console.log('搜索知识库:', filters.value)
}

// 查看知识库详情
const viewKnowledgeDetail = (item) => {
  ElMessage.info(`查看知识库详情：${item.id}`)
  console.log('查看知识库详情:', item)
}

// 编辑知识库
const editKnowledge = (item) => {
  ElMessage.info(`编辑知识库：${item.id}`)
  console.log('编辑知识库:', item)
}

// 删除知识库
const deleteKnowledge = (item) => {
  ElMessageBox.confirm('确定要删除该知识库吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    knowledgeList.value = knowledgeList.value.filter(knowledge => knowledge.id !== item.id)
    ElMessage.success('删除成功')
  }).catch(() => {
    // 取消删除
  })
}
</script>

<template>
  <div class="knowledge-base-page">
    <div class="page-header">
      <h1 class="page-title">知识库管理</h1>
      <div class="header-actions">
        <el-button type="primary" @click="addKnowledge" class="action-btn">
          <el-icon><Plus /></el-icon>
          新增知识库
        </el-button>
      </div>
    </div>

    <!-- 筛选条件区 -->
    <el-card class="filter-card">
      <el-row :gutter="[16, 16]">
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
          <el-form-item label="关键词">
            <el-input v-model="filters.keyword" placeholder="请输入关键词" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="12">
          <el-form-item>
            <el-button type="primary" @click="searchKnowledge" class="search-btn">
              <el-icon><Search /></el-icon>
              搜索
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <!-- 知识库列表 -->
    <el-card class="knowledge-card">
      <template #header>
        <div class="card-title">知识库列表</div>
      </template>
      <el-table
        v-loading="false"
        :data="knowledgeList"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="编号"
          min-width="150"
        />
        <el-table-column
          prop="title"
          label="标题"
          min-width="250"
        />
        <el-table-column
          prop="category"
          label="分类"
          width="120"
        />
        <el-table-column
          prop="author"
          label="作者"
          width="100"
        />
        <el-table-column
          prop="publishDate"
          label="发布日期"
          width="120"
        />
        <el-table-column
          prop="viewCount"
          label="浏览量"
          width="100"
        />
        <el-table-column
          prop="downloadCount"
          label="下载量"
          width="100"
        />
        <el-table-column
          prop="status"
          label="状态"
          width="100"
        >
          <template #default="scope">
            <el-tag
              :type="scope.row.status === '已发布' ? 'success' : 
                     scope.row.status === '草稿' ? 'info' : 'warning'"
            >
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          fixed="right"
        >
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="viewKnowledgeDetail(scope.row)"
            >
              查看
            </el-button>
            <el-button
              type="success"
              size="small"
              @click="editKnowledge(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="deleteKnowledge(scope.row)"
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
.knowledge-base-page {
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

/* 知识库列表 */
.knowledge-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
}

.card-title {
  font-size: 16px;
  font-weight: 500;
  color: #333333;
}

/* 分页 */
.pagination-container {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>