<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

// 搜索表单数据
const searchForm = reactive({
  supplierName: '',
  contactPerson: '',
  status: ''
})

// 供应商列表数据
const supplierList = ref([
  {
    id: 1,
    name: '防水材料有限公司',
    contactPerson: '张三',
    phone: '13800138001',
    email: 'contact@waterproof.com',
    address: '北京市朝阳区建国路88号',
    status: '合作中',
    rating: 5,
    createTime: '2024-01-10'
  },
  {
    id: 2,
    name: '建筑设备租赁公司',
    contactPerson: '李四',
    phone: '13800138002',
    email: 'info@rental.com',
    address: '上海市浦东新区陆家嘴环路1000号',
    status: '合作中',
    rating: 4,
    createTime: '2024-02-15'
  },
  {
    id: 3,
    name: '工程服务有限公司',
    contactPerson: '王五',
    phone: '13800138003',
    email: 'service@engineering.com',
    address: '广州市天河区珠江新城珠江西路10号',
    status: '已终止',
    rating: 3,
    createTime: '2024-03-20'
  }
])

// 状态颜色映射
const statusColorMap = {
  '合作中': 'success',
  '已终止': 'danger',
  '待审核': 'warning'
}

// 分页参数
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 3
})

// 搜索表单重置
const resetForm = () => {
  Object.assign(searchForm, {
    supplierName: '',
    contactPerson: '',
    status: ''
  })
  handleSearch()
}

// 搜索处理
const handleSearch = () => {
  console.log('搜索条件:', searchForm)
  // 这里可以添加实际的搜索逻辑
}

// 新增供应商
const handleAdd = () => {
  // 这里可以添加新增供应商的逻辑
  ElMessage.success('新增供应商功能待实现')
}

// 查看详情
const handleView = (id) => {
  // 跳转到供应商详情页
  window.location.href = `/admin-system/supplier-detail/${id}`
}

// 编辑供应商
const handleEdit = (id) => {
  // 这里可以添加编辑供应商的逻辑
  console.log('编辑供应商:', id)
}

// 删除供应商
const handleDelete = (id) => {
  // 这里可以添加删除供应商的逻辑
  console.log('删除供应商:', id)
}
</script>

<template>
  <div class="supplier-management-container">
    <el-card class="supplier-management-card">
      <template #header>
        <div class="card-header">
          <h2 class="card-title">供应商管理</h2>
          <el-button type="primary" class="action-btn" @click="handleAdd">新增供应商</el-button>
        </div>
      </template>
      
      <!-- 搜索区域 -->
      <div class="search-area">
        <el-form :model="searchForm" label-position="left" inline>
          <el-form-item label="供应商名称">
            <el-input v-model="searchForm.supplierName" placeholder="请输入供应商名称" clearable />
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="searchForm.contactPerson" placeholder="请输入联系人" clearable />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
              <el-option label="合作中" value="合作中" />
              <el-option label="已终止" value="已终止" />
              <el-option label="待审核" value="待审核" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      
      <!-- 供应商列表 -->
      <div class="supplier-list">
        <el-table :data="supplierList" stripe style="width: 100%">
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="name" label="供应商名称" />
          <el-table-column prop="contactPerson" label="联系人" width="120" />
          <el-table-column prop="phone" label="联系电话" width="150" />
          <el-table-column prop="email" label="邮箱" width="200" />
          <el-table-column prop="address" label="地址" show-overflow-tooltip />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <el-tag :type="statusColorMap[scope.row.status]">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="rating" label="评分" width="80">
            <template #default="scope">
              <el-rate v-model="scope.row.rating" disabled />
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="150" />
          <el-table-column label="操作" width="200" fixed="right">
            <template #default="scope">
              <el-button type="primary" size="small" link @click="handleView(scope.row.id)">查看</el-button>
              <el-button type="warning" size="small" link @click="handleEdit(scope.row.id)">编辑</el-button>
              <el-button type="danger" size="small" link @click="handleDelete(scope.row.id)">删除</el-button>
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
.supplier-management-container {
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

.supplier-list {
  margin-top: 20px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>