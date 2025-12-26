<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Calendar, Clock, ShoppingCart, InfoFilled } from '@element-plus/icons-vue'

// 兑换记录列表数据
const exchangeRecords = ref([
  {
    id: 'E001',
    productId: 'P001',
    productName: '防水工具箱',
    productImage: 'https://via.placeholder.com/100',
    score: 500,
    exchangeTime: '2023-10-15 10:30:00',
    status: '已完成',
    orderId: 'WO001',
    description: '专业防水施工工具箱，包含各种常用工具'
  },
  {
    id: 'E002',
    productId: 'P002',
    productName: '防水手套',
    productImage: 'https://via.placeholder.com/100',
    score: 100,
    exchangeTime: '2023-10-16 09:15:00',
    status: '已完成',
    orderId: 'WO002',
    description: '耐用防水手套，保护双手安全'
  },
  {
    id: 'E003',
    productId: 'P003',
    productName: '积分兑换券',
    productImage: 'https://via.placeholder.com/100',
    score: 200,
    exchangeTime: '2023-10-17 14:20:00',
    status: '待审核',
    orderId: 'WO003',
    description: '50元现金兑换券，可用于购买防水材料'
  },
  {
    id: 'E004',
    productId: 'P004',
    productName: '防水施工鞋',
    productImage: 'https://via.placeholder.com/100',
    score: 300,
    exchangeTime: '2023-10-18 16:20:00',
    status: '已拒绝',
    orderId: 'WO004',
    description: '专业防水施工鞋，防滑耐磨'
  },
  {
    id: 'E005',
    productId: 'P005',
    productName: '防水工作服',
    productImage: 'https://via.placeholder.com/100',
    score: 400,
    exchangeTime: '2023-10-19 08:45:00',
    status: '已完成',
    orderId: 'WO005',
    description: '专业防水工作服，透气舒适'
  },
  {
    id: 'E006',
    productId: 'P006',
    productName: '防水胶枪',
    productImage: 'https://via.placeholder.com/100',
    score: 250,
    exchangeTime: '2023-10-20 10:30:00',
    status: '待审核',
    orderId: 'WO006',
    description: '专业防水胶枪，操作简单'
  }
])

// 状态选项
const statusOptions = ['全部', '待审核', '已完成', '已拒绝']

// 当前选中的状态
const currentStatus = ref('全部')

// 筛选后的兑换记录
const filteredRecords = computed(() => {
  if (currentStatus.value === '全部') {
    return exchangeRecords.value
  }
  return exchangeRecords.value.filter(record => record.status === currentStatus.value)
})

// 分页配置
const pagination = ref({
  currentPage: 1,
  pageSize: 5,
  total: filteredRecords.value.length
})

// 监听筛选条件变化，重置分页
const handleStatusChange = () => {
  pagination.value.currentPage = 1
  pagination.value.total = filteredRecords.value.length
}

// 监听筛选后的记录变化，更新分页总数
const updateTotal = () => {
  pagination.value.total = filteredRecords.value.length
}

// 查看兑换记录详情
const viewRecordDetail = (record) => {
  ElMessage.info(`查看兑换记录详情：${record.id}`)
  console.log('查看兑换记录详情:', record)
}

// 格式化日期时间
const formatDateTime = (dateTime) => {
  return dateTime
}
</script>

<template>
  <div class="exchange-record-page">
    <div class="page-header">
      <h1 class="page-title">兑换记录</h1>
    </div>

    <!-- 筛选区域 -->
    <el-card class="filter-card">
      <div class="filter-content">
        <div class="filter-item">
          <span class="filter-label">状态筛选：</span>
          <el-select 
            v-model="currentStatus" 
            placeholder="请选择状态" 
            class="status-select"
            @change="handleStatusChange"
          >
            <el-option
              v-for="option in statusOptions"
              :key="option"
              :label="option"
              :value="option"
            />
          </el-select>
        </div>
      </div>
    </el-card>

    <!-- 兑换记录列表 -->
    <el-card class="record-list-card">
      <template #header>
        <div class="card-header">
          <span>兑换记录列表</span>
          <span class="record-count">共 {{ pagination.total }} 条记录</span>
        </div>
      </template>
      
      <!-- 记录列表 -->
      <div class="record-list" v-if="filteredRecords.length > 0">
        <el-table
          :data="filteredRecords"
          style="width: 100%"
          stripe
          @row-click="viewRecordDetail"
        >
          <!-- 商品信息 -->
          <el-table-column prop="productName" label="兑换商品" min-width="200">
            <template #default="scope">
              <div class="product-info">
                <img :src="scope.row.productImage" alt="" class="product-image" />
                <div class="product-details">
                  <div class="product-name">{{ scope.row.productName }}</div>
                  <div class="product-desc">{{ scope.row.description }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          
          <!-- 消耗积分 -->
          <el-table-column prop="score" label="消耗积分" width="120">
            <template #default="scope">
              <div class="score-info">
                <span class="score-value">{{ scope.row.score }}</span>
                <span class="score-unit">积分</span>
              </div>
            </template>
          </el-table-column>
          
          <!-- 兑换时间 -->
          <el-table-column prop="exchangeTime" label="兑换时间" width="180">
            <template #default="scope">
              <div class="time-info">
                <div class="time-item">
                  <Calendar class="time-icon" />
                  <span>{{ formatDateTime(scope.row.exchangeTime).split(' ')[0] }}</span>
                </div>
                <div class="time-item">
                  <Clock class="time-icon" />
                  <span>{{ formatDateTime(scope.row.exchangeTime).split(' ')[1] }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          
          <!-- 状态 -->
          <el-table-column prop="status" label="状态" width="120">
            <template #default="scope">
              <el-tag
                type="primary"
                size="large"
              >
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          
          <!-- 操作 -->
          <el-table-column label="操作" width="150" fixed="right">
            <template #default="scope">
              <el-button
                type="primary"
                size="small"
                @click.stop="viewRecordDetail(scope.row)"
              >
                <InfoFilled class="btn-icon" />
                查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        
        <!-- 分页 -->
        <div class="pagination-container">
          <el-pagination
            v-model:current-page="pagination.currentPage"
            v-model:page-size="pagination.pageSize"
            :page-sizes="[5, 10, 20, 50]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      
      <!-- 空状态 -->
      <div class="empty-state" v-else>
        <el-empty description="暂无兑换记录" />
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.exchange-record-page {
  padding: 0;
  background-color: $bg-primary;
  min-height: 100vh;
}

.page-header {
  margin-bottom: $spacing-lg;
  padding: $spacing-lg $spacing-md 0;
  background-color: white;
  box-shadow: $shadow-sm;
}

.page-title {
  font-size: $font-size-xl;
  font-weight: $font-weight-semibold;
  color: $primary-color;
  margin: 0;
}

/* 筛选卡片 */
.filter-card {
  margin: 0 $spacing-md $spacing-lg;
  box-shadow: $shadow-sm;
  border-radius: $border-radius-lg;
  overflow: hidden;
}

.filter-content {
  display: flex;
  align-items: center;
  padding: $spacing-md;
}

.filter-item {
  display: flex;
  align-items: center;
  margin-right: $spacing-lg;
}

.filter-label {
  font-size: $font-size-sm;
  color: $text-secondary;
  margin-right: $spacing-sm;
}

.status-select {
  width: 150px;
}

/* 记录列表卡片 */
.record-list-card {
  margin: 0 $spacing-md $spacing-lg;
  box-shadow: $shadow-sm;
  border-radius: $border-radius-lg;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.record-count {
  font-size: $font-size-sm;
  color: $text-secondary;
}

/* 记录列表 */
.record-list {
  overflow: hidden;
}

/* 商品信息 */
.product-info {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.product-image {
  width: 60px;
  height: 60px;
  border-radius: $border-radius-sm;
  object-fit: cover;
}

.product-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.product-name {
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $text-primary;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-desc {
  font-size: $font-size-xs;
  color: $text-secondary;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 积分信息 */
.score-info {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.score-value {
  font-size: $font-size-lg;
  font-weight: $font-weight-bold;
  color: $primary-color;
}

.score-unit {
  font-size: $font-size-sm;
  color: $text-secondary;
}

/* 时间信息 */
.time-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.time-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: $font-size-sm;
  color: $text-secondary;
}

.time-icon {
  font-size: $font-size-xs;
}

/* 操作按钮 */
:deep(.el-table__row) {
  cursor: pointer;
  transition: all 0.3s ease;
}

:deep(.el-table__row:hover) {
  background-color: $bg-secondary;
}

.btn-icon {
  margin-right: 4px;
  font-size: $font-size-xs;
}

/* 分页 */
.pagination-container {
  margin-top: $spacing-lg;
  display: flex;
  justify-content: flex-end;
  padding: 0 $spacing-md $spacing-md;
}

/* 空状态 */
.empty-state {
  padding: $spacing-xl;
  text-align: center;
  color: $text-tertiary;
}
</style>