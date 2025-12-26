<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Crown, Medal, User } from '@element-plus/icons-vue'

// 师傅列表数据
const masterList = ref([
  {
    id: 'S001',
    name: '李师傅',
    avatar: 'https://via.placeholder.com/60',
    currentScore: 580,
    level: '钻石师傅',
    isCurrentUser: false
  },
  {
    id: 'S002',
    name: '王师傅',
    avatar: 'https://via.placeholder.com/60',
    currentScore: 520,
    level: '钻石师傅',
    isCurrentUser: false
  },
  {
    id: 'S003',
    name: '张师傅',
    avatar: 'https://via.placeholder.com/60',
    currentScore: 480,
    level: '金牌师傅',
    isCurrentUser: false
  },
  {
    id: 'S004',
    name: '刘师傅',
    avatar: 'https://via.placeholder.com/60',
    currentScore: 420,
    level: '金牌师傅',
    isCurrentUser: false
  },
  {
    id: 'S005',
    name: '陈师傅',
    avatar: 'https://via.placeholder.com/60',
    currentScore: 380,
    level: '金牌师傅',
    isCurrentUser: false
  },
  {
    id: 'S006',
    name: '杨师傅',
    avatar: 'https://via.placeholder.com/60',
    currentScore: 320,
    level: '银牌师傅',
    isCurrentUser: true
  },
  {
    id: 'S007',
    name: '赵师傅',
    avatar: 'https://via.placeholder.com/60',
    currentScore: 280,
    level: '银牌师傅',
    isCurrentUser: false
  },
  {
    id: 'S008',
    name: '孙师傅',
    avatar: 'https://via.placeholder.com/60',
    currentScore: 220,
    level: '银牌师傅',
    isCurrentUser: false
  },
  {
    id: 'S009',
    name: '周师傅',
    avatar: 'https://via.placeholder.com/60',
    currentScore: 180,
    level: '铜牌师傅',
    isCurrentUser: false
  },
  {
    id: 'S010',
    name: '吴师傅',
    avatar: 'https://via.placeholder.com/60',
    currentScore: 150,
    level: '铜牌师傅',
    isCurrentUser: false
  }
])

// 搜索关键词
const searchKeyword = ref('')

// 分页配置
const pagination = ref({
  currentPage: 1,
  pageSize: 10,
  total: masterList.value.length
})

// 当前登录用户
const currentUser = computed(() => {
  return masterList.value.find(master => master.isCurrentUser)
})

// 前三名师傅
const topThreeMasters = computed(() => {
  return [...masterList.value].sort((a, b) => b.currentScore - a.currentScore).slice(0, 3)
})

// 筛选后的师傅列表（排除前三名）
const filteredMasters = computed(() => {
  let filtered = [...masterList.value].sort((a, b) => b.currentScore - a.currentScore)
  
  // 排除前三名
  filtered = filtered.slice(3)
  
  // 搜索筛选
  if (searchKeyword.value) {
    filtered = filtered.filter(master => master.name.includes(searchKeyword.value))
  }
  
  return filtered
})

// 计算当前用户的排名
const currentUserRanking = computed(() => {
  const sortedList = [...masterList.value].sort((a, b) => b.currentScore - a.currentScore)
  const index = sortedList.findIndex(master => master.isCurrentUser)
  return index + 1
})

// 格式化排名样式
const getRankingClass = (ranking) => {
  if (ranking === 1) return 'rank-gold'
  if (ranking === 2) return 'rank-silver'
  if (ranking === 3) return 'rank-bronze'
  return 'rank-normal'
}

// 查看师傅详情
const viewMasterDetail = (master) => {
  ElMessage.info(`查看师傅详情：${master.name}`)
  console.log('查看师傅详情:', master)
}

// 搜索师傅
const handleSearch = () => {
  pagination.value.currentPage = 1
  pagination.value.total = filteredMasters.value.length
}
</script>

<template>
  <div class="ranking-page">
    <div class="page-header">
      <h1 class="page-title">积分排名</h1>
    </div>

    <!-- 个人排名信息 -->
    <el-card class="personal-ranking-card" v-if="currentUser">
      <div class="personal-ranking-content">
        <div class="personal-avatar">
          <img :src="currentUser.avatar" alt="" class="avatar-img" />
        </div>
        <div class="personal-info">
          <div class="personal-name">{{ currentUser.name }}</div>
          <div class="personal-level">
            <el-tag :type="'primary'">{{ currentUser.level }}</el-tag>
          </div>
        </div>
        <div class="personal-ranking">
          <div class="ranking-label">我的排名</div>
          <div class="ranking-value">{{ currentUserRanking }}</div>
        </div>
        <div class="personal-score">
          <div class="score-label">我的积分</div>
          <div class="score-value">{{ currentUser.currentScore }}</div>
        </div>
      </div>
    </el-card>

    <!-- 前三名展示 -->
    <div class="top-three-section">
      <h2 class="section-title">积分排行榜</h2>
      <div class="top-three-container">
        <!-- 第二名 -->
        <div class="top-master-item second" v-if="topThreeMasters[1]">
          <div class="master-ranking rank-silver">
            <Medal class="ranking-icon" />
            <span class="ranking-number">2</span>
          </div>
          <div class="master-avatar">
            <img :src="topThreeMasters[1].avatar" alt="" class="avatar-img" />
          </div>
          <div class="master-info">
            <div class="master-name">{{ topThreeMasters[1].name }}</div>
            <div class="master-level">{{ topThreeMasters[1].level }}</div>
          </div>
          <div class="master-score">{{ topThreeMasters[1].currentScore }}</div>
        </div>
        
        <!-- 第一名 -->
        <div class="top-master-item first" v-if="topThreeMasters[0]">
          <div class="master-ranking rank-gold">
            <Crown class="ranking-icon" />
            <span class="ranking-number">1</span>
          </div>
          <div class="master-avatar">
            <img :src="topThreeMasters[0].avatar" alt="" class="avatar-img" />
          </div>
          <div class="master-info">
            <div class="master-name">{{ topThreeMasters[0].name }}</div>
            <div class="master-level">{{ topThreeMasters[0].level }}</div>
          </div>
          <div class="master-score">{{ topThreeMasters[0].currentScore }}</div>
        </div>
        
        <!-- 第三名 -->
        <div class="top-master-item third" v-if="topThreeMasters[2]">
          <div class="master-ranking rank-bronze">
            <Medal class="ranking-icon" />
            <span class="ranking-number">3</span>
          </div>
          <div class="master-avatar">
            <img :src="topThreeMasters[2].avatar" alt="" class="avatar-img" />
          </div>
          <div class="master-info">
            <div class="master-name">{{ topThreeMasters[2].name }}</div>
            <div class="master-level">{{ topThreeMasters[2].level }}</div>
          </div>
          <div class="master-score">{{ topThreeMasters[2].currentScore }}</div>
        </div>
      </div>
    </div>

    <!-- 搜索和排名列表 -->
    <el-card class="ranking-list-card">
      <!-- 搜索区域 -->
      <div class="search-section">
        <el-input
          v-model="searchKeyword"
          placeholder="输入师傅姓名搜索"
          class="search-input"
          clearable
          @input="handleSearch"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><Search /></el-icon>
          </template>
        </el-input>
      </div>
      
      <!-- 排名列表 -->
      <div class="ranking-list">
        <div class="ranking-list-header">
          <div class="header-item ranking-header">排名</div>
          <div class="header-item info-header">师傅信息</div>
          <div class="header-item level-header">等级</div>
          <div class="header-item score-header">积分</div>
          <div class="header-item action-header">操作</div>
        </div>
        
        <!-- 排名列表项 -->
        <div 
          v-for="(master, index) in filteredMasters" 
          :key="master.id"
          class="ranking-item"
          :class="{ 'is-current-user': master.isCurrentUser }"
          @click="viewMasterDetail(master)"
        >
          <div class="item-content">
            <div class="ranking-item-content">
              <div :class="['ranking-number', getRankingClass(index + 4)]">{{ index + 4 }}</div>
            </div>
            <div class="info-item-content">
              <div class="master-avatar-small">
                <img :src="master.avatar" alt="" class="avatar-img-small" />
              </div>
              <div class="master-name-small">{{ master.name }}</div>
            </div>
            <div class="level-item-content">
              <el-tag size="small">{{ master.level }}</el-tag>
            </div>
            <div class="score-item-content">{{ master.currentScore }}</div>
            <div class="action-item-content">
              <el-button type="primary" size="small" @click.stop="viewMasterDetail(master)">
                查看
              </el-button>
            </div>
          </div>
        </div>
        
        <!-- 空状态 -->
        <div class="empty-state" v-if="filteredMasters.length === 0">
          <el-empty description="暂无师傅数据" />
        </div>
      </div>
      
      <!-- 分页 -->
      <div class="pagination-container" v-if="filteredMasters.length > 0">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="filteredMasters.length"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.ranking-page {
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

/* 个人排名信息卡片 */
.personal-ranking-card {
  margin: 0 $spacing-md $spacing-lg;
  box-shadow: $shadow-sm;
  border-radius: $border-radius-lg;
  overflow: hidden;
}

.personal-ranking-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: $spacing-lg;
}

.personal-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid $border-color;
}

.personal-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-xs;
}

.personal-name {
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: $text-primary;
}

.personal-level {
  margin-top: $spacing-xs;
}

.personal-ranking, .personal-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-xs;
}

.ranking-label, .score-label {
  font-size: $font-size-sm;
  color: $text-secondary;
}

.ranking-value, .score-value {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
  color: $primary-color;
}

/* 前三名展示区域 */
.top-three-section {
  margin: 0 $spacing-md $spacing-lg;
}

.section-title {
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: $text-primary;
  margin-bottom: $spacing-lg;
  padding: 0 $spacing-xs;
}

.top-three-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: $spacing-md;
  padding: $spacing-lg 0;
}

.top-master-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-md;
  background-color: white;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-sm;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 180px;
}

.top-master-item:hover {
  transform: translateY(-4px);
  box-shadow: $shadow-md;
}

.top-master-item.first {
  order: 2;
  transform: scale(1.1);
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.05) 100%);
}

.top-master-item.second {
  order: 1;
  transform: scale(1.05);
  background: linear-gradient(135deg, rgba(192, 192, 192, 0.1) 0%, rgba(192, 192, 192, 0.05) 100%);
}

.top-master-item.third {
  order: 3;
  background: linear-gradient(135deg, rgba(205, 127, 50, 0.1) 0%, rgba(205, 127, 50, 0.05) 100%);
}

.master-ranking {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-xs;
}

.ranking-icon {
  font-size: 24px;
  color: $text-secondary;
}

.top-master-item.first .ranking-icon {
  color: #ffd700;
}

.top-master-item.second .ranking-icon {
  color: #c0c0c0;
}

.top-master-item.third .ranking-icon {
  color: #cd7f32;
}

.master-ranking .ranking-number {
  font-size: $font-size-xl;
  font-weight: $font-weight-bold;
}

.rank-gold {
  color: #ffd700;
}

.rank-silver {
  color: #c0c0c0;
}

.rank-bronze {
  color: #cd7f32;
}

.rank-normal {
  color: $text-secondary;
}

.master-avatar {
  margin-top: $spacing-sm;
}

.master-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-xs;
}

.master-name {
  font-size: $font-size-md;
  font-weight: $font-weight-medium;
  color: $text-primary;
}

.master-level {
  font-size: $font-size-sm;
  color: $text-secondary;
}

.master-score {
  font-size: $font-size-lg;
  font-weight: $font-weight-bold;
  color: $primary-color;
  margin-top: $spacing-xs;
}

/* 排名列表卡片 */
.ranking-list-card {
  margin: 0 $spacing-md $spacing-lg;
  box-shadow: $shadow-sm;
  border-radius: $border-radius-lg;
  overflow: hidden;
}

/* 搜索区域 */
.search-section {
  padding: $spacing-md;
  background-color: $bg-secondary;
  border-bottom: 1px solid $border-color;
}

.search-input {
  max-width: 400px;
  margin: 0 auto;
}

/* 排名列表 */
.ranking-list {
  overflow: hidden;
}

.ranking-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-md;
  background-color: $bg-secondary;
  border-bottom: 1px solid $border-color;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $text-secondary;
}

.header-item {
  display: flex;
  align-items: center;
}

.ranking-header {
  width: 80px;
  justify-content: center;
}

.info-header {
  flex: 1;
  justify-content: flex-start;
}

.level-header {
  width: 120px;
  justify-content: center;
}

.score-header {
  width: 100px;
  justify-content: center;
}

.action-header {
  width: 80px;
  justify-content: center;
}

/* 排名列表项 */
.ranking-item {
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid $border-color;
}

.ranking-item:hover {
  background-color: $bg-secondary;
}

.ranking-item.is-current-user {
  background-color: rgba(0, 51, 102, 0.05);
  border-left: 3px solid $primary-color;
}

.item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-md;
}

.ranking-item-content, .info-item-content, .level-item-content, .score-item-content, .action-item-content {
  display: flex;
  align-items: center;
}

.ranking-item-content {
  width: 80px;
  justify-content: center;
}

.ranking-number {
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: $bg-tertiary;
  color: $text-secondary;
}

.info-item-content {
  flex: 1;
  justify-content: flex-start;
  gap: $spacing-sm;
}

.master-avatar-small {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid $border-color;
}

.avatar-img-small {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.master-name-small {
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $text-primary;
}

.level-item-content {
  width: 120px;
  justify-content: center;
}

.score-item-content {
  width: 100px;
  justify-content: center;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $text-primary;
}

.action-item-content {
  width: 80px;
  justify-content: center;
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

/* 响应式设计 */
@media (max-width: 768px) {
  .personal-ranking-content {
    flex-wrap: wrap;
    gap: $spacing-md;
  }
  
  .top-three-container {
    flex-direction: column;
    align-items: center;
    gap: $spacing-md;
  }
  
  .top-master-item {
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  
  .top-master-item.first {
    order: 1;
    transform: none;
  }
  
  .top-master-item.second {
    order: 2;
    transform: none;
  }
  
  .top-master-item.third {
    order: 3;
    transform: none;
  }
  
  .ranking-list-header {
    display: none;
  }
  
  .item-content {
    flex-direction: column;
    align-items: flex-start;
    gap: $spacing-sm;
  }
  
  .ranking-item-content, .info-item-content, .level-item-content, .score-item-content, .action-item-content {
    width: 100%;
    justify-content: flex-start;
    gap: $spacing-sm;
  }
  
  .ranking-number {
    margin-right: $spacing-sm;
  }
}
</style>