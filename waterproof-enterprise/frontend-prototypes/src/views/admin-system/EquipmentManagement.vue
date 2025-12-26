<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 设备列表数据
const equipmentList = ref([
  {
    id: 'SB20231001',
    name: '防水测试仪',
    model: 'FT-100',
    serialNumber: 'FT20231001001',
    purchaseDate: '2023-01-15',
    status: '正常',
    location: '仓库',
    responsiblePerson: '张三',
    lastMaintenance: '2023-09-15',
    nextMaintenance: '2024-03-15'
  },
  {
    id: 'SB20231002',
    name: '高压注浆机',
    model: 'GP-200',
    serialNumber: 'GP20231002001',
    purchaseDate: '2023-02-20',
    status: '正常',
    location: 'XX工地',
    responsiblePerson: '李四',
    lastMaintenance: '2023-10-01',
    nextMaintenance: '2024-04-01'
  },
  {
    id: 'SB20231003',
    name: '防水喷涂机',
    model: 'SP-300',
    serialNumber: 'SP20231003001',
    purchaseDate: '2023-03-10',
    status: '维修中',
    location: '维修车间',
    responsiblePerson: '王五',
    lastMaintenance: '2023-08-20',
    nextMaintenance: ''
  },
  {
    id: 'SB20231004',
    name: '电动搅拌器',
    model: 'EB-50',
    serialNumber: 'EB20231004001',
    purchaseDate: '2023-04-05',
    status: '正常',
    location: '仓库',
    responsiblePerson: '赵六',
    lastMaintenance: '2023-09-30',
    nextMaintenance: '2024-03-30'
  }
])

// 筛选条件
const filters = ref({
  status: '',
  location: '',
  name: ''
})

// 状态选项
const statusOptions = [
  { label: '全部', value: '' },
  { label: '正常', value: '正常' },
  { label: '维修中', value: '维修中' },
  { label: '闲置', value: '闲置' },
  { label: '报废', value: '报废' }
]

// 新增设备
const addEquipment = () => {
  ElMessage.info('新增设备功能')
  console.log('新增设备')
}

// 搜索设备
const searchEquipment = () => {
  ElMessage.info('搜索设备')
  console.log('搜索设备:', filters.value)
}

// 查看设备详情
const viewEquipmentDetail = (item) => {
  ElMessage.info(`查看设备详情：${item.id}`)
  console.log('查看设备详情:', item)
}

// 编辑设备
const editEquipment = (item) => {
  ElMessage.info(`编辑设备：${item.id}`)
  console.log('编辑设备:', item)
}

// 设备维修
const maintainEquipment = (item) => {
  ElMessage.info(`设备维修：${item.id}`)
  console.log('设备维修:', item)
}

// 删除设备
const deleteEquipment = (item) => {
  ElMessageBox.confirm('确定要删除该设备吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    equipmentList.value = equipmentList.value.filter(equipment => equipment.id !== item.id)
    ElMessage.success('删除成功')
  }).catch(() => {
    // 取消删除
  })
}
</script>

<template>
  <div class="equipment-management-page">
    <div class="page-header">
      <h1 class="page-title">设备管理</h1>
      <div class="header-actions">
        <el-button type="primary" @click="addEquipment" class="action-btn">
          <el-icon><Plus /></el-icon>
          新增设备
        </el-button>
      </div>
    </div>

    <!-- 筛选条件区 -->
    <el-card class="filter-card">
      <el-row :gutter="[16, 16]">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="设备状态">
            <el-select v-model="filters.status" placeholder="请选择设备状态">
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
          <el-form-item label="设备名称">
            <el-input v-model="filters.name" placeholder="请输入设备名称" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-form-item label="存放位置">
            <el-input v-model="filters.location" placeholder="请输入存放位置" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="12">
          <el-form-item>
            <el-button type="primary" @click="searchEquipment" class="search-btn">
              <el-icon><Search /></el-icon>
              搜索
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <!-- 设备列表 -->
    <el-card class="equipment-card">
      <template #header>
        <div class="card-title">设备列表</div>
      </template>
      <el-table
        v-loading="false"
        :data="equipmentList"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="设备编号"
          min-width="150"
        />
        <el-table-column
          prop="name"
          label="设备名称"
          min-width="150"
        />
        <el-table-column
          prop="model"
          label="型号规格"
          min-width="120"
        />
        <el-table-column
          prop="serialNumber"
          label="序列号"
          min-width="180"
        />
        <el-table-column
          prop="status"
          label="状态"
          width="100"
        >
          <template #default="scope">
            <el-tag
              :type="scope.row.status === '正常' ? 'success' : 
                     scope.row.status === '维修中' ? 'warning' : 
                     scope.row.status === '闲置' ? 'info' : 'danger'"
            >
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="location"
          label="存放位置"
          min-width="120"
        />
        <el-table-column
          prop="responsiblePerson"
          label="负责人"
          width="100"
        />
        <el-table-column
          prop="nextMaintenance"
          label="下次维护"
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
              @click="viewEquipmentDetail(scope.row)"
            >
              查看
            </el-button>
            <el-button
              type="success"
              size="small"
              @click="editEquipment(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="warning"
              size="small"
              @click="maintainEquipment(scope.row)"
            >
              维护
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="deleteEquipment(scope.row)"
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
.equipment-management-page {
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

/* 设备列表 */
.equipment-card {
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