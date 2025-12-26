<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 客户列表数据
const customerList = ref([
  {
    id: 'C001',
    name: '企业客户A',
    contact: '张三',
    phone: '13800138000',
    type: '企业客户',
    status: '活跃'
  },
  {
    id: 'C002',
    name: '个人客户B',
    contact: '李四',
    phone: '13900139000',
    type: '个人客户',
    status: '活跃'
  },
  {
    id: 'C003',
    name: '企业客户C',
    contact: '王五',
    phone: '13700137000',
    type: '企业客户',
    status: '休眠'
  }
])

// 新增客户
const addCustomer = () => {
  ElMessage.info('新增客户功能')
  console.log('新增客户')
}

// 查看客户详情
const viewCustomer = (customer) => {
  ElMessage.info(`查看客户：${customer.id}`)
  console.log('查看客户:', customer)
}

// 编辑客户
const editCustomer = (customer) => {
  ElMessage.info(`编辑客户：${customer.id}`)
  console.log('编辑客户:', customer)
}
</script>

<template>
  <div class="customer-management-page">
    <div class="page-header">
      <h1 class="page-title">客户管理</h1>
      <el-button type="primary" @click="addCustomer">
        <el-icon><Plus /></el-icon>
        新增客户
      </el-button>
    </div>

    <el-card class="customer-table-card">
      <el-table
        :data="customerList"
        style="width: 100%"
        stripe
      >
        <el-table-column
          prop="id"
          label="客户编号"
          width="100"
        />
        <el-table-column
          prop="name"
          label="客户名称"
          min-width="150"
        />
        <el-table-column
          prop="contact"
          label="联系人"
          width="100"
        />
        <el-table-column
          prop="phone"
          label="联系电话"
          width="150"
        />
        <el-table-column
          prop="type"
          label="客户类型"
          width="120"
        >
          <template #default="scope">
            <el-tag
              :type="scope.row.type === '企业客户' ? 'primary' : 'success'"
            >
              {{ scope.row.type }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="100"
        >
          <template #default="scope">
            <el-tag
              :type="scope.row.status === '活跃' ? 'success' : 'info'"
            >
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="150"
          fixed="right"
        >
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="viewCustomer(scope.row)"
            >
              查看
            </el-button>
            <el-button
              type="success"
              size="small"
              @click="editCustomer(scope.row)"
            >
              编辑
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
.customer-management-page {
  padding: 0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #333333;
  margin: 0;
}

/* 客户表格 */
.customer-table-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 分页 */
.pagination-container {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>