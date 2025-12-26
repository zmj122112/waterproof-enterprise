<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ShoppingCart, Document, Star } from '@element-plus/icons-vue'

const router = useRouter()

// 积分信息
const scoreInfo = ref({
  currentScore: 150,
  totalScore: 200,
  ranking: 1,
  level: '钻石师傅'
})

// 积分等级配置
const levelConfig = [
  { name: '初级师傅', minScore: 0, maxScore: 99 },
  { name: '铜牌师傅', minScore: 100, maxScore: 199 },
  { name: '银牌师傅', minScore: 200, maxScore: 299 },
  { name: '金牌师傅', minScore: 300, maxScore: 499 },
  { name: '钻石师傅', minScore: 500, maxScore: Infinity }
]

// 计算当前等级的进度
const currentLevelInfo = computed(() => {
  const level = levelConfig.find(l => scoreInfo.value.currentScore >= l.minScore && scoreInfo.value.currentScore <= l.maxScore)
  const nextLevel = levelConfig[levelConfig.indexOf(level) + 1] || level
  const progress = level.maxScore === Infinity ? 100 : ((scoreInfo.value.currentScore - level.minScore) / (level.maxScore - level.minScore)) * 100
  return {
    currentLevel: level,
    nextLevel: nextLevel,
    progress: Math.min(100, progress),
    nextScore: nextLevel.minScore
  }
})

// 积分规则，按类型分组
const scoreRules = ref([
  { id: 1, type: '接单', action: '接单', score: '+30', description: '成功接受派单' },
  { id: 2, type: '接单', action: '派单后不接单', score: '-10', description: '派单后拒绝接单' },
  { id: 3, type: '施工拍照', action: '施工前拍照', score: '+10', description: '上传施工前照片' },
  { id: 4, type: '施工拍照', action: '不拍', score: '-5', description: '未上传施工前照片' },
  { id: 5, type: '施工拍照', action: '施工中拍照', score: '+10', description: '上传施工中照片' },
  { id: 6, type: '施工拍照', action: '不拍', score: '-5', description: '未上传施工中照片' },
  { id: 7, type: '施工拍照', action: '完工后拍照', score: '+10', description: '上传完工后照片' },
  { id: 8, type: '施工拍照', action: '不拍', score: '-5', description: '未上传完工后照片' },
  { id: 9, type: '评价', action: '好评', score: '+30', description: '获得客户好评' },
  { id: 10, type: '评价', action: '中评', score: '+10', description: '获得客户中评' },
  { id: 11, type: '评价', action: '差评', score: '-30', description: '获得客户差评' }
])

// 积分规则分组
const groupedRules = computed(() => {
  const groups = {}
  scoreRules.value.forEach(rule => {
    if (!groups[rule.type]) {
      groups[rule.type] = []
    }
    groups[rule.type].push(rule)
  })
  return groups
})

// 积分流水
const scoreHistory = ref([
  { id: 1, type: '接单', action: '接单', score: '+30', time: '2023-10-15 10:30:00', orderId: 'WO001' },
  { id: 2, type: '施工拍照', action: '施工前拍照', score: '+10', time: '2023-10-16 09:15:00', orderId: 'WO001' },
  { id: 3, type: '施工拍照', action: '施工中拍照', score: '+10', time: '2023-10-16 14:20:00', orderId: 'WO001' },
  { id: 4, type: '施工拍照', action: '完工后拍照', score: '+10', time: '2023-10-17 11:45:00', orderId: 'WO001' },
  { id: 5, type: '评价', action: '好评', score: '+30', time: '2023-10-18 16:20:00', orderId: 'WO001' },
  { id: 6, type: '接单', action: '接单', score: '+30', time: '2023-10-19 08:45:00', orderId: 'WO002' },
  { id: 7, type: '施工拍照', action: '施工前拍照', score: '+10', time: '2023-10-19 10:30:00', orderId: 'WO002' }
])

// 跳转到积分商城
const goToScoreMall = () => {
  router.push('/master-app/score-mall')
}

// 跳转到积分排名
const goToRanking = () => {
  router.push('/master-app/ranking')
}

// 跳转到兑换记录
const goToExchangeRecord = () => {
  router.push('/master-app/exchange-record')
}
</script>

<template>
  <div class="score-center-page">
    <!-- 红色顶部区域 -->
    <div class="red-top-section">
      <h1 class="page-title">积分中心</h1>
      <div class="score-overview">
        <div class="score-main-info">
          <div class="score-label">当前积分</div>
          <div class="score-value">{{ scoreInfo.currentScore }}</div>
          <div class="score-subtitle">累计获得积分：{{ scoreInfo.totalScore }}</div>
        </div>
        <div class="score-ranking">
          <div class="ranking-label">当前排名</div>
          <div class="ranking-value">
            <span class="ranking-number">{{ scoreInfo.ranking }}</span>
            <span class="ranking-text">名</span>
          </div>
          <div class="ranking-subtitle">{{ scoreInfo.level }}</div>
        </div>
      </div>
    </div>

    <!-- 积分等级进度条卡片 -->
    <el-card class="floating-card level-progress-card">
      <div class="level-progress-section">
        <div class="level-info">
          <span class="current-level">{{ currentLevelInfo.currentLevel.name }}</span>
          <span class="progress-text">距离{{ currentLevelInfo.nextLevel.name }}还差{{ currentLevelInfo.nextScore - scoreInfo.currentScore }}分</span>
        </div>
        <el-progress 
          :percentage="currentLevelInfo.progress" 
          :stroke-width="8" 
          :color="['#d4af37', '#003366']" 
        />
        <div class="level-range">
          <span>{{ currentLevelInfo.currentLevel.minScore }}分</span>
          <span>{{ currentLevelInfo.currentLevel.maxScore === Infinity ? '∞' : currentLevelInfo.currentLevel.maxScore }}分</span>
        </div>
      </div>
    </el-card>

    <!-- 操作按钮组卡片 -->
    <el-card class="floating-card action-buttons-card">
      <div class="score-actions">
        <el-button type="primary" @click="goToScoreMall" class="action-btn">
          <ShoppingCart class="btn-icon" />
          积分商城
        </el-button>
        <el-button type="primary" @click="goToExchangeRecord" class="action-btn">
          <Document class="btn-icon" />
          兑换记录
        </el-button>
        <el-button type="primary" @click="goToRanking" class="action-btn">
          <Star class="btn-icon" />
          积分排名
        </el-button>
      </div>
    </el-card>

    <!-- 积分规则 -->
    <el-card class="score-rules-card">
      <template #header>
        <div class="card-header">
          <span>积分规则</span>
        </div>
      </template>
      
      <div class="rules-container">
        <div 
          v-for="(rules, type) in groupedRules" 
          :key="type" 
          class="rule-group"
        >
          <div class="group-title">{{ type }}</div>
          <div class="rules-list">
            <div 
              v-for="rule in rules" 
              :key="rule.id" 
              class="rule-item"
            >
              <div class="rule-content">
                <span class="rule-action">{{ rule.description }}</span>
                <span 
                  class="rule-score" 
                  :class="rule.score.startsWith('+') ? 'score-positive' : 'score-negative'"
                >
                  {{ rule.score }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 积分流水 -->
    <el-card class="score-history-card">
      <template #header>
        <div class="card-header">
          <span>积分流水</span>
        </div>
      </template>
      
      <div class="history-container">
        <el-table
          :data="scoreHistory"
          style="width: 100%"
          stripe
          :show-header="false"
        >
          <el-table-column prop="time" width="160">
            <template #default="scope">
              <div class="history-time">{{ scope.row.time }}</div>
              <div class="history-type">{{ scope.row.type }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="action" min-width="180">
            <template #default="scope">
              <div class="history-action">{{ scope.row.action }}</div>
              <div class="history-order-id">工单：{{ scope.row.orderId }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="score" width="100" align="right">
            <template #default="scope">
              <span 
                class="history-score" 
                :class="scope.row.score.startsWith('+') ? 'score-positive' : 'score-negative'"
              >
                {{ scope.row.score }}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.score-center-page {
  padding: 0;
  background-color: $bg-primary;
  min-height: 100vh;
}

/* 红色顶部区域 */
.red-top-section {
  background-color: $primary-color;
  color: white;
  padding: $spacing-xl $spacing-md $spacing-2xl;
  border-radius: 0 0 20px 20px;
  box-shadow: $shadow-md;
}

.page-title {
  font-size: $font-size-xl;
  font-weight: $font-weight-semibold;
  margin: 0 0 $spacing-lg;
  text-align: center;
}

.score-overview {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.score-main-info {
  text-align: center;
}

.score-label {
  font-size: $font-size-sm;
  opacity: 0.9;
  margin-bottom: $spacing-xs;
}

.score-value {
  font-size: 42px;
  font-weight: $font-weight-bold;
  margin-bottom: $spacing-xs;
}

.score-subtitle {
  font-size: $font-size-xs;
  opacity: 0.8;
}

.score-ranking {
  text-align: center;
}

.ranking-label {
  font-size: $font-size-sm;
  opacity: 0.9;
  margin-bottom: $spacing-xs;
}

.ranking-value {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: $spacing-xs;
}

.ranking-number {
  font-size: 36px;
  font-weight: $font-weight-bold;
}

.ranking-text {
  font-size: $font-size-md;
  opacity: 0.9;
}

.ranking-subtitle {
  font-size: $font-size-xs;
  opacity: 0.8;
}

/* 浮动白色卡片 */
.floating-card {
  margin: -$spacing-lg $spacing-md $spacing-lg;
  box-shadow: $shadow-md;
  border-radius: $border-radius-lg;
  overflow: hidden;
  background-color: white;
  position: relative;
  z-index: 10;
}

/* 积分等级进度条卡片 */
.level-progress-card {
  padding: $spacing-lg;
}

.level-progress-section {
  padding: 0;
}

.level-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-sm;
}

.current-level {
  font-size: $font-size-md;
  font-weight: $font-weight-medium;
  color: $primary-color;
}

.progress-text {
  font-size: $font-size-sm;
  color: $text-secondary;
}

.level-range {
  display: flex;
  justify-content: space-between;
  margin-top: $spacing-xs;
  font-size: $font-size-xs;
  color: $text-tertiary;
}

/* 操作按钮组卡片 */
.action-buttons-card {
  margin-top: $spacing-sm;
  padding: $spacing-lg;
}

/* 操作按钮组 */
.score-actions {
  display: flex;
  justify-content: space-around;
  gap: $spacing-sm;
}

.action-btn {
  flex: 1;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  font-weight: $font-weight-medium;
  background-color: $primary-color;
  border-color: $primary-color;
  color: white;
}

.action-btn:hover {
  background-color: $primary-hover-color;
  border-color: $primary-hover-color;
}

.btn-icon {
  margin-right: 6px;
  font-size: $font-size-md;
}

/* 积分规则卡片 */
.score-rules-card {
  margin: $spacing-sm $spacing-md $spacing-lg;
  box-shadow: $shadow-sm;
  border-radius: $border-radius-lg;
  background-color: white;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header span {
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: $text-primary;
}

.rules-container {
  padding: $spacing-sm 0;
}

.rule-group {
  margin-bottom: $spacing-lg;
}

.group-title {
  font-size: $font-size-md;
  font-weight: $font-weight-medium;
  color: $primary-color;
  margin-bottom: $spacing-sm;
  padding: 0 $spacing-sm;
}

.rules-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
}

.rule-item {
  padding: $spacing-sm;
  background-color: $bg-secondary;
  border-radius: $border-radius-sm;
  transition: all 0.3s ease;
}

.rule-item:hover {
  background-color: $bg-tertiary;
  transform: translateY(-2px);
  box-shadow: $shadow-sm;
}

.rule-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.rule-action {
  font-size: $font-size-sm;
  color: $text-primary;
  flex: 1;
}

.rule-score {
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  min-width: 60px;
  text-align: right;
}

.score-positive {
  color: $success-color;
}

.score-negative {
  color: $error-color;
}

/* 积分流水卡片 */
.score-history-card {
  margin: 0 $spacing-md $spacing-lg;
  box-shadow: $shadow-sm;
  border-radius: $border-radius-lg;
  background-color: white;
}

.history-container {
  padding: $spacing-sm 0;
}

/* 积分流水表格样式 */
:deep(.el-table__row) {
  cursor: pointer;
  transition: all 0.3s ease;
}

:deep(.el-table__row:hover) {
  background-color: $bg-secondary;
}

:deep(.el-table__body-wrapper) {
  border-radius: $border-radius-sm;
}

:deep(.el-table__cell) {
  padding: $spacing-sm $spacing-md;
  border-bottom: 1px solid $border-color;
}

.history-time {
  font-size: $font-size-xs;
  color: $text-tertiary;
  margin-bottom: 2px;
}

.history-type {
  font-size: $font-size-xs;
  color: $primary-color;
  font-weight: $font-weight-medium;
}

.history-action {
  font-size: $font-size-sm;
  color: $text-primary;
  margin-bottom: 2px;
}

.history-order-id {
  font-size: $font-size-xs;
  color: $text-secondary;
}

.history-score {
  font-size: $font-size-md;
  font-weight: $font-weight-medium;
}
</style>