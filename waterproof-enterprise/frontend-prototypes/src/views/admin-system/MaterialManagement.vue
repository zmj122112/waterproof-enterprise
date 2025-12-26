<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 物料列表数据
const materialList = ref([
  {
    id: 'M001',
    name: '防水材料A',
    type: '防水材料',
    unit: '桶',
    stock: 50,
    price: 200
  },
  {
    id: 'M002',
    name: '防水卷材B',
    type: '防水卷材',
    unit: '卷',
    stock: 30,
    price: 300
  },
  {
    id: 'M003',
    name: '防水工具C',
    type: '施工工具',
    unit: '套',
    stock: 10,
    price: 150
  }
])

// 新增物料
const addMaterial = () => {
  ElMessage.info('新增物料功能')
  console.log('新增物料')
}

// 查看物料详情
const viewMaterial = (material) => {
  ElMessage.info(`查看物料：${material.id}`)
  console.log('查看物料:', material)
}

// 编辑物料
const editMaterial = (material) => {
  ElMessage.info(`编辑物料：${material.id}`)
  console.log('编辑物料:', material)
}
</script>

<template>
  <div class="material-management-page">
    <div class="page-header">
      <h1 class="page-title">物料管理</h1>
      <el-button type="primary" @click="addMaterial">
        <el-icon><Plus /></el-icon>
        新增物料
      </el-button>
    </div>

    <el-card class="material-table-card">
      <el-table
        :data="materialList"
        style="width: 100%"
        stripe
      >
        <el-table-column
          prop="id"
          label="物料编号"
          width="100"
        />
        <el-table-column
          prop="name"
          label="物料名称"
          min-width="150"
        />
        <el-table-column
          prop="type"
          label="物料类型"
          width="120"
        >
          <template #default="scope">
            <el-tag
              :type="scope.row.type === '防水材料' ? 'primary' : 
                     scope.row.type === '防水卷材' ? 'success' : 'info'"
            >
              {{ scope.row.type }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="unit"
          label="单位"
          width="80"
        />
        <el-table-column
          prop="stock"
          label="库存"
          width="100"
        >
          <template #default="scope">
            <span :style="scope.row.stock < 20 ? 'color: #f5222d;' : ''">
              {{ scope.row.stock }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价"
          width="100"
          formatter="(row) => `¥${row.price}`"
        />
        <el-table-column
          label="操作"
          width="150"
          fixed="right"
        >
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="viewMaterial(scope.row)"
            >
              查看
            </el-button>
            <el-button
              type="success"
              size="small"
              @click="editMaterial(scope.row)"
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
.material-management-page {
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

/* 物料表格 */
.material-table-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* 分页 */
.pagination-container {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>