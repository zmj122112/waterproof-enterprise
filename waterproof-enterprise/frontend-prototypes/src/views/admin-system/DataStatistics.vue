<script setup>
import { ref } from 'vue'

// 统计数据
const statisticsData = ref({
  workOrderCount: 125,
  completedWorkOrders: 102,
  pendingWorkOrders: 23,
  contractCount: 45,
  projectCount: 32,
  totalRevenue: 1250000
})

// 工单趋势数据
const workOrderTrendData = [
  { month: '1月', count: 8 },
  { month: '2月', count: 12 },
  { month: '3月', count: 15 },
  { month: '4月', count: 18 },
  { month: '5月', count: 22 },
  { month: '6月', count: 25 },
  { month: '7月', count: 20 },
  { month: '8月', count: 18 },
  { month: '9月', count: 15 },
  { month: '10月', count: 22 },
  { month: '11月', count: 28 },
  { month: '12月', count: 30 }
]

// 项目类型分布数据
const projectTypeData = [
  { name: '防水施工', value: 45 },
  { name: '防水维修', value: 30 },
  { name: '防水检测', value: 15 },
  { name: '其他', value: 10 }
]
</script>

<template>
  <div class="data-statistics-container">
    <el-card class="data-statistics-card">
      <template #header>
        <div class="card-header">
          <h2 class="card-title">数据统计</h2>
        </div>
      </template>
      
      <!-- 统计卡片 -->
      <div class="statistics-cards">
        <el-row :gutter="20">
          <el-col :xs="12" :sm="6">
            <el-card shadow="hover" class="statistic-card">
              <div class="statistic-item">
                <div class="statistic-info">
                  <div class="statistic-value">{{ statisticsData.workOrderCount }}</div>
                  <div class="statistic-label">总工单数</div>
                </div>
                <div class="statistic-icon work-order-icon">
                  <el-icon><s-order /></el-icon>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="12" :sm="6">
            <el-card shadow="hover" class="statistic-card">
              <div class="statistic-item">
                <div class="statistic-info">
                  <div class="statistic-value">{{ statisticsData.completedWorkOrders }}</div>
                  <div class="statistic-label">已完成工单</div>
                </div>
                <div class="statistic-icon completed-icon">
                  <el-icon><check /></el-icon>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="12" :sm="6">
            <el-card shadow="hover" class="statistic-card">
              <div class="statistic-item">
                <div class="statistic-info">
                  <div class="statistic-value">{{ statisticsData.pendingWorkOrders }}</div>
                  <div class="statistic-label">待处理工单</div>
                </div>
                <div class="statistic-icon pending-icon">
                  <el-icon><time /></el-icon>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="12" :sm="6">
            <el-card shadow="hover" class="statistic-card">
              <div class="statistic-item">
                <div class="statistic-info">
                  <div class="statistic-value">{{ statisticsData.contractCount }}</div>
                  <div class="statistic-label">合同数量</div>
                </div>
                <div class="statistic-icon contract-icon">
                  <el-icon><document /></el-icon>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="12" :sm="6">
            <el-card shadow="hover" class="statistic-card">
              <div class="statistic-item">
                <div class="statistic-info">
                  <div class="statistic-value">{{ statisticsData.projectCount }}</div>
                  <div class="statistic-label">项目数量</div>
                </div>
                <div class="statistic-icon project-icon">
                  <el-icon><s-management /></el-icon>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="12" :sm="6">
            <el-card shadow="hover" class="statistic-card">
              <div class="statistic-item">
                <div class="statistic-info">
                  <div class="statistic-value">¥{{ statisticsData.totalRevenue.toLocaleString() }}</div>
                  <div class="statistic-label">总收入</div>
                </div>
                <div class="statistic-icon revenue-icon">
                  <el-icon><money /></el-icon>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      
      <!-- 图表区域 -->
      <div class="charts-area">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-card shadow="hover" class="chart-card">
              <template #header>
                <h3 class="chart-title">工单趋势</h3>
              </template>
              <div class="chart-content">
                <div class="chart-placeholder">
                  <el-icon class="chart-icon"><data-line /></el-icon>
                  <p>工单趋势图表</p>
                </div>
                <div class="chart-data">
                  <el-table :data="workOrderTrendData" size="small" style="width: 100%">
                    <el-table-column prop="month" label="月份" width="80"></el-table-column>
                    <el-table-column prop="count" label="数量"></el-table-column>
                  </el-table>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-card shadow="hover" class="chart-card">
              <template #header>
                <h3 class="chart-title">项目类型分布</h3>
              </template>
              <div class="chart-content">
                <div class="chart-placeholder">
                  <el-icon class="chart-icon"><pie-chart /></el-icon>
                  <p>项目类型分布图表</p>
                </div>
                <div class="chart-data">
                  <el-table :data="projectTypeData" size="small" style="width: 100%">
                    <el-table-column prop="name" label="类型"></el-table-column>
                    <el-table-column prop="value" label="占比"></el-table-column>
                  </el-table>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.data-statistics-container {
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

.statistics-cards {
  margin-bottom: 20px;
}

.statistic-card {
  margin-bottom: 20px;
}

.statistic-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
}

.statistic-info {
  flex: 1;
}

.statistic-value {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 4px;
}

.statistic-label {
  font-size: 14px;
  color: #909399;
}

.statistic-icon {
  font-size: 32px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
}

.work-order-icon {
  background-color: #409eff;
}

.completed-icon {
  background-color: #67c23a;
}

.pending-icon {
  background-color: #e6a23c;
}

.contract-icon {
  background-color: #909399;
}

.project-icon {
  background-color: #f56c6c;
}

.revenue-icon {
  background-color: #722ed1;
}

.charts-area {
  margin-top: 20px;
}

.chart-card {
  margin-bottom: 20px;
}

.chart-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.chart-content {
  padding: 20px 0;
}

.chart-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #909399;
}

.chart-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.chart-data {
  margin-top: 20px;
}
</style>