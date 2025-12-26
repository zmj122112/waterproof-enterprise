<script setup>
import { ref } from 'vue'

// 报表列表数据
const reportList = ref([
  {
    id: 1,
    name: '月度工单统计报表',
    type: '工单报表',
    createTime: '2024-06-15',
    status: '已生成',
    downloadUrl: '#',
    description: '包含月度工单数量、完成率、趋势等数据'
  },
  {
    id: 2,
    name: '季度财务报表',
    type: '财务报表',
    createTime: '2024-06-10',
    status: '已生成',
    downloadUrl: '#',
    description: '包含季度收入、支出、利润等财务数据'
  },
  {
    id: 3,
    name: '项目进度报表',
    type: '项目报表',
    createTime: '2024-06-05',
    status: '已生成',
    downloadUrl: '#',
    description: '包含所有项目的进度、完成情况等数据'
  },
  {
    id: 4,
    name: '供应商合作报表',
    type: '供应商报表',
    createTime: '2024-06-01',
    status: '已生成',
    downloadUrl: '#',
    description: '包含供应商合作情况、采购金额等数据'
  }
])

// 报表类型选项
const reportTypeOptions = [
  { label: '全部', value: '' },
  { label: '工单报表', value: '工单报表' },
  { label: '财务报表', value: '财务报表' },
  { label: '项目报表', value: '项目报表' },
  { label: '供应商报表', value: '供应商报表' }
]

// 生成新报表
const generateReport = () => {
  // 这里可以添加生成报表的逻辑
  console.log('生成新报表')
}

// 下载报表
const downloadReport = (url) => {
  // 这里可以添加下载报表的逻辑
  console.log('下载报表:', url)
}
</script>

<template>
  <div class="report-center-container">
    <el-card class="report-center-card">
      <template #header>
        <div class="card-header">
          <h2 class="card-title">报表中心</h2>
          <el-button type="primary" class="action-btn" @click="generateReport">生成新报表</el-button>
        </div>
      </template>
      
      <!-- 报表列表 -->
      <div class="report-list">
        <el-table :data="reportList" stripe style="width: 100%">
          <el-table-column prop="name" label="报表名称" />
          <el-table-column prop="type" label="报表类型" width="120">
            <template #default="scope">
              <el-tag type="primary">{{ scope.row.type }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="150" />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <el-tag type="success">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="描述" show-overflow-tooltip />
          <el-table-column label="操作" width="180" fixed="right">
            <template #default="scope">
              <el-button type="primary" size="small" link @click="downloadReport(scope.row.downloadUrl)">下载</el-button>
              <el-button type="warning" size="small" link>预览</el-button>
              <el-button type="danger" size="small" link>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      
      <!-- 快速生成报表区域 -->
      <el-card class="quick-generate-card" style="margin-top: 20px;">
        <template #header>
          <h3 class="card-title">快速生成报表</h3>
        </template>
        
        <div class="quick-generate-content">
          <el-row :gutter="24">
            <el-col :xs="24" :sm="8">
              <el-form-item label="报表类型" label-position="top">
                <el-select placeholder="请选择报表类型" style="width: 100%">
                  <el-option label="月度工单统计报表" value="work_order_monthly" />
                  <el-option label="季度财务报表" value="finance_quarterly" />
                  <el-option label="项目进度报表" value="project_progress" />
                  <el-option label="供应商合作报表" value="supplier_cooperation" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8">
              <el-form-item label="时间范围" label-position="top">
                <el-date-picker
                  v-model="dateRange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" style="display: flex; align-items: flex-end;">
              <el-button type="primary" style="width: 100%">立即生成</el-button>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-card>
  </div>
</template>

<style scoped>
.report-center-container {
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

.report-list {
  margin-top: 20px;
}

.quick-generate-card {
  margin-top: 20px;
}

.quick-generate-content {
  padding: 20px 0;
}
</style>