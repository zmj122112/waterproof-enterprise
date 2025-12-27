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
    progress: Math.min(100, Number(progress.toFixed(1))),
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

// 积分规则展开/折叠状态
const rulesExpanded = ref(false)

// 切换积分规则展开/折叠状态
const toggleRules = () => {
  rulesExpanded.value = !rulesExpanded.value
}
</script>

<template>
  <div class="score-center-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
    <!-- 红色顶部区域 -->
    <div class="header-section" style="background-color: #CC0010; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding-top: 40px; padding-bottom: 30px; position: relative; z-index: 0;">
      <div class="header-content" style="padding: 0 20px;">
        <div class="brand-info" style="display: flex; align-items: center; margin-bottom: 16px;">
          <img src="/logo.png" class="logo-img" style="width: 40px; height: 40px; border-radius: 50%; background-color: white; padding: 2px; margin-right: 10px; object-fit: contain;" />
          <div class="brand-text">
            <div class="brand-name" style="color: white; font-size: 18px; font-weight: bold;">月星防水</div>
            <div class="brand-slogan" style="color: rgba(255,255,255,0.8); font-size: 12px;">Since 1947</div>
          </div>
        </div>
        
        <div class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">积分中心</div>
      </div>
    </div>

    <!-- 积分概览卡片 - 浮动白色卡片 -->
    <div style="margin: -20px 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <div class="score-overview" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <!-- 当前积分 -->
        <div class="score-info" style="text-align: left;">
          <div class="score-label" style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">当前积分</div>
          <div class="score-value" style="font-size: 36px; font-weight: bold; color: #E60012; margin-bottom: 4px;">{{ scoreInfo.currentScore }}</div>
          <div class="score-subtitle" style="font-size: 12px; color: #9ca3af;">累计获得积分：{{ scoreInfo.totalScore }}</div>
        </div>
        <!-- 当前排名 -->
        <div class="ranking-info" style="text-align: right;">
          <div class="ranking-label" style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">当前排名</div>
          <div class="ranking-value" style="display: flex; align-items: baseline; justify-content: flex-end; margin-bottom: 4px;">
            <span class="ranking-number" style="font-size: 32px; font-weight: bold; color: #E60012;">{{ scoreInfo.ranking }}</span>
            <span class="ranking-text" style="font-size: 16px; color: #6b7280; margin-left: 2px;">名</span>
          </div>
          <div class="ranking-subtitle" style="font-size: 12px; color: #9ca3af;">{{ scoreInfo.level }}</div>
        </div>
      </div>
    </div>

    <!-- 积分等级进度条卡片 - 浮动白色卡片 -->
    <div style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <div class="level-progress-section">
        <div class="level-info" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span class="current-level" style="font-size: 16px; font-weight: 600; color: #E60012;">{{ currentLevelInfo.currentLevel.name }}</span>
          <span class="progress-text" style="font-size: 13px; color: #6b7280;">距离{{ currentLevelInfo.nextLevel.name }}还差{{ currentLevelInfo.nextScore - scoreInfo.currentScore }}分</span>
        </div>
        <el-progress 
          :percentage="currentLevelInfo.progress" 
          :stroke-width="8" 
          :color="['#d4af37', '#003366']" 
          style="margin-bottom: 8px;"
        />
        <div class="level-range" style="display: flex; justify-content: space-between; font-size: 12px; color: #9ca3af;">
          <span>{{ currentLevelInfo.currentLevel.minScore }}分</span>
          <span>{{ currentLevelInfo.currentLevel.maxScore === Infinity ? '∞' : currentLevelInfo.currentLevel.maxScore }}分</span>
        </div>
      </div>
    </div>

    <!-- 操作按钮组卡片 - 浮动白色卡片 -->
    <div style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px 12px; position: relative; z-index: 10; overflow: hidden;">
      <div class="score-actions" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
        <el-button type="primary" @click="goToScoreMall" style="flex: 1; height: 40px; font-size: 14px; border-radius: 20px; background-color: #E60012; border-color: #E60012; padding: 0 8px;">
          <ShoppingCart style="margin-right: 4px; font-size: 12px;" />
          积分商城
        </el-button>
        <el-button type="primary" @click="goToExchangeRecord" style="flex: 1; height: 40px; font-size: 14px; border-radius: 20px; background-color: #E60012; border-color: #E60012; padding: 0 8px;">
          <Document style="margin-right: 4px; font-size: 12px;" />
          兑换记录
        </el-button>
        <el-button type="primary" @click="goToRanking" style="flex: 1; height: 40px; font-size: 14px; border-radius: 20px; background-color: #E60012; border-color: #E60012; padding: 0 8px;">
          <Star style="margin-right: 4px; font-size: 12px;" />
          积分排名
        </el-button>
      </div>
    </div>

    <!-- 积分规则 -->
    <div style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <div 
        class="card-header" 
        style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; cursor: pointer;"
        @click="toggleRules"
      >
        <span style="font-size: 18px; font-weight: 600; color: #111827;">积分规则</span>
        <div style="transition: transform 0.3s ease;">
          <!-- 折叠状态显示向右箭头，展开状态显示向下箭头 -->
          <svg width="16" height="16" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              :d="rulesExpanded ? 'M128 384L512 768L896 384' : 'M384 128L768 512L384 896'" 
              stroke="#606266" 
              stroke-width="160" 
              stroke-linecap="round" 
              stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      
      <div 
        class="rules-container" 
        v-show="rulesExpanded"
        style="padding: 0; overflow: hidden; transition: all 0.3s ease; max-height: 1000px; opacity: 1; visibility: visible; margin-bottom: 0; transform: translateY(0);">

        <div 
          v-for="(rules, type) in groupedRules" 
          :key="type" 
          class="rule-group" 
          style="margin-bottom: 24px;"
        >
          <div class="group-title" style="font-size: 16px; font-weight: 500; color: #E60012; margin-bottom: 12px;">
            {{ type }}
          </div>
          <div class="rules-list" style="display: flex; flex-direction: column; gap: 8px;">
            <div 
              v-for="rule in rules" 
              :key="rule.id" 
              class="rule-item" 
              style="background-color: #f9fafb; border: 1px solid #E5E7EB; border-radius: 12px; padding: 12px; transition: all 0.3s ease;"
            >
              <div class="rule-content" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <span class="rule-action" style="font-size: 14px; color: #111827; flex: 1;">{{ rule.description }}</span>
                <span 
                  class="rule-score" 
                  :style="rule.score.startsWith('+') ? 'font-size: 14px; font-weight: 600; color: #10B981;' : 'font-size: 14px; font-weight: 600; color: #EF4444;'"
                >
                  {{ rule.score }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 积分流水 -->
    <div style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <span style="font-size: 18px; font-weight: 600; color: #111827;">积分流水</span>
      </div>
      
      <div class="history-container" style="padding: 0;">
        <el-table
          :data="scoreHistory"
          style="width: 100%;"
          stripe
          :show-header="false"
        >
          <el-table-column prop="time" width="140">
            <template #default="scope">
              <div class="history-time" style="font-size: 12px; color: #9ca3af; margin-bottom: 2px;">{{ scope.row.time }}</div>
              <div class="history-type" style="font-size: 12px; color: #E60012; font-weight: 500;">{{ scope.row.type }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="action" min-width="160">
            <template #default="scope">
              <div class="history-action" style="font-size: 14px; color: #111827; margin-bottom: 2px;">{{ scope.row.action }}</div>
              <div class="history-order-id" style="font-size: 12px; color: #6b7280;">工单：{{ scope.row.orderId }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="score" width="100" align="right">
            <template #default="scope">
              <span 
                class="history-score" 
                :style="scope.row.score.startsWith('+') ? 'font-size: 16px; font-weight: 600; color: #10B981;' : 'font-size: 16px; font-weight: 600; color: #EF4444;'"
              >
                {{ scope.row.score }}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 移除旧样式，使用内联样式替代 */
</style>