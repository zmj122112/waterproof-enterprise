<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 人员列表数据
const staffList = ref([
  {
    id: 'S001',
    name: '李师傅',
    phone: '13800138001',
    role: '师傅',
    status: '在职',
    skill: '防水施工',
    currentScore: 150,
    totalScore: 200,
    ranking: 1
  },
  {
    id: 'S002',
    name: '王师傅',
    phone: '13900139001',
    role: '师傅',
    status: '在职',
    skill: '防水检测',
    currentScore: 120,
    totalScore: 180,
    ranking: 2
  },
  {
    id: 'S003',
    name: '张管理员',
    phone: '13700137001',
    role: '管理员',
    status: '在职',
    skill: '系统管理',
    currentScore: 0,
    totalScore: 0,
    ranking: 0
  }
])

// 查看积分详情
const viewScoreDetail = (staff) => {
  ElMessage.info(`查看${staff.name}的积分详情`)
  console.log('查看积分详情:', staff)
}

// 新增人员
const addStaff = () => {
  ElMessage.info('新增人员功能')
  console.log('新增人员')
}

// 查看人员详情
const viewStaff = (staff) => {
  ElMessage.info(`查看人员：${staff.id}`)
  console.log('查看人员:', staff)
}

// 编辑人员
const editStaff = (staff) => {
  ElMessage.info(`编辑人员：${staff.id}`)
  console.log('编辑人员:', staff)
}
</script>

<template>
  <div class="staff-management-page">
    <div class="page-header">
      <h1 class="page-title">人员管理</h1>
      <el-button type="primary" @click="addStaff">
        <el-icon><Plus /></el-icon>
        新增人员
      </el-button>
    </div>

    <el-card class="staff-table-card">
      <el-table
        :data="staffList"
        style="width: 100%"
        stripe
      >
        <el-table-column
          prop="id"
          label="人员编号"
          width="100"
        />
        <el-table-column
          prop="name"
          label="姓名"
          width="100"
        />
        <el-table-column
          prop="phone"
          label="联系电话"
          width="150"
        />
        <el-table-column
          prop="role"
          label="角色"
          width="100"
        >
          <template #default="scope">
            <el-tag
              :type="scope.row.role === '师傅' ? 'success' : 'primary'"
            >
              {{ scope.row.role }}
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
              :type="scope.row.status === '在职' ? 'success' : 'danger'"
            >
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="skill"
          label="技能"
          width="120"
        />
        <el-table-column
          prop="currentScore"
          label="当前积分"
          width="120"
          v-if="scope.row.role === '师傅'"
        >
          <template #default="scope">
            <span class="score-text">{{ scope.row.currentScore }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="totalScore"
          label="累计积分"
          width="120"
          v-if="scope.row.role === '师傅'"
        >
          <template #default="scope">
            <span class="score-text">{{ scope.row.totalScore }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="ranking"
          label="排名"
          width="100"
          v-if="scope.row.role === '师傅'"
        >
          <template #default="scope">
            <el-tag
              :type="scope.row.ranking <= 3 ? 'success' : 'primary'"
              size="small"
            >
              {{ scope.row.ranking > 0 ? scope.row.ranking : '-' }}
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
              @click="viewStaff(scope.row)"
            >
              查看
            </el-button>
            <el-button
              type="success"
              size="small"
              @click="editStaff(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="warning"
              size="small"
              @click="viewScoreDetail(scope.row)"
              v-if="scope.row.role === '师傅'"
            >
              积分详情
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
.staff-management-page {
  padding: 0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-lg;
}

.page-title {
  font-size: $font-size-xl;
  font-weight: $font-weight-semibold;
  color: $text-primary;
  margin: 0;
}

/* 人员表格 */
.staff-table-card {
  box-shadow: $shadow-sm;
}

/* 积分相关样式 */
.score-text {
  color: $secondary-color;
  font-weight: $font-weight-medium;
}

/* 排名样式 */
.ranking-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: $border-radius-sm;
  font-size: $font-size-xs;
  font-weight: $font-weight-medium;
  margin-right: $spacing-xs;
}

.ranking-gold {
  background-color: #ffd700;
  color: white;
}

.ranking-silver {
  background-color: #c0c0c0;
  color: white;
}

.ranking-bronze {
  background-color: #cd7f32;
  color: white;
}

/* 分页 */
.pagination-container {
  margin-top: $spacing-md;
  display: flex;
  justify-content: flex-end;
}
</style>