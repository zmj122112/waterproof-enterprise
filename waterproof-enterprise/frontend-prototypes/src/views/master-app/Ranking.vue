<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

// 当前用户信息
const currentUser = ref({
  name: '李师傅',
  avatar: '李',
  level: '金牌师傅',
  score: 1250,
  ranking: 5
})

// 排名列表数据
const rankingList = ref([
  {
    id: 1,
    name: '王师傅',
    avatar: '王',
    level: '钻石师傅',
    score: 2580,
    ranking: 1
  },
  {
    id: 2,
    name: '张师傅',
    avatar: '张',
    level: '钻石师傅',
    score: 2340,
    ranking: 2
  },
  {
    id: 3,
    name: '刘师傅',
    avatar: '刘',
    level: '金牌师傅',
    score: 1890,
    ranking: 3
  },
  {
    id: 4,
    name: '陈师傅',
    avatar: '陈',
    level: '金牌师傅',
    score: 1560,
    ranking: 4
  },
  {
    id: 5,
    name: '李师傅',
    avatar: '李',
    level: '金牌师傅',
    score: 1250,
    ranking: 5
  },
  {
    id: 6,
    name: '周师傅',
    avatar: '周',
    level: '银牌师傅',
    score: 980,
    ranking: 6
  },
  {
    id: 7,
    name: '吴师傅',
    avatar: '吴',
    level: '银牌师傅',
    score: 870,
    ranking: 7
  },
  {
    id: 8,
    name: '郑师傅',
    avatar: '郑',
    level: '铜牌师傅',
    score: 650,
    ranking: 8
  }
])
</script>

<template>
  <div class="ranking-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
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
        
        <div class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">积分排名</div>
      </div>
    </div>

    <!-- 当前用户排名卡片 - 浮动白色卡片 -->
    <div style="margin: -20px 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <div style="text-align: center; padding: 8px 0;">
        <div style="font-size: 16px; font-weight: 500; color: #111827; margin-bottom: 16px;">我的排名</div>
        <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 16px;">
          <div style="width: 80px; height: 80px; background-color: #E60012; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: bold; margin-right: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
            {{ currentUser.ranking }}
          </div>
          <div style="text-align: left;">
            <div style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 4px;">{{ currentUser.name }}</div>
            <div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">{{ currentUser.level }}</div>
            <div style="font-size: 16px; color: #E60012; font-weight: 600;">{{ currentUser.score }} 积分</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 排名列表卡片 - 浮动白色卡片 -->
    <div style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <div style="font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 16px;">师傅排名榜</div>
      
      <!-- 排名列表 -->
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div 
          v-for="(item, index) in rankingList" 
          :key="item.id" 
          :class="['ranking-item', { 'current-user': item.name === currentUser.name }]"
          style="display: flex; align-items: center; padding: 12px; border-radius: 12px; transition: all 0.3s ease; border: 1px solid #E5E7EB; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);"
          :style="item.name === currentUser.name ? 'background-color: #fef2f2; border-color: #E60012;' : ''"
        >
          <!-- 排名 -->
          <div 
            class="ranking-number"
            :style="{
              'width': '40px',
              'height': '40px',
              'border-radius': '50%',
              'display': 'flex',
              'align-items': 'center',
              'justify-content': 'center',
              'font-size': '16px',
              'font-weight': 'bold',
              'color': '#111827',
              'margin-right': '12px'
            }"
          >
            {{ item.ranking }}
          </div>
          
          <!-- 头像 -->
          <div 
            class="avatar"
            :style="{
              'width': '48px',
              'height': '48px',
              'border-radius': '50%',
              'background-color': '#f3f4f6',
              'display': 'flex',
              'align-items': 'center',
              'justify-content': 'center',
              'font-size': '20px',
              'font-weight': 'bold',
              'color': '#E60012',
              'margin-right': '12px',
              'border': item.name === currentUser.name ? '2px solid #E60012' : 'none'
            }"
          >
            {{ item.avatar }}
          </div>
          
          <!-- 信息 -->
          <div class="info" style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <div style="font-size: 16px; font-weight: 500; color: #111827;">{{ item.name }}</div>
              <div :style="{
                'font-size': '12px',
                'padding': '2px 8px',
                'border-radius': '10px',
                'font-weight': '500',
                'color': item.level === '钻石师傅' ? '#D4AF37' : 
                         item.level === '金牌师傅' ? '#FFD700' : 
                         item.level === '银牌师傅' ? '#C0C0C0' : 
                         item.level === '铜牌师傅' ? '#CD7F32' : '#A9A9A9',
                'background-color': item.level === '钻石师傅' ? '#FFF8DC' : 
                                     item.level === '金牌师傅' ? '#FFF3E0' : 
                                     item.level === '银牌师傅' ? '#F5F5F5' : 
                                     item.level === '铜牌师傅' ? '#FFF0E6' : '#F9F9F9'
              }">
                {{ item.level }}
              </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="font-size: 14px; color: #6b7280;">积分</div>
              <div style="font-size: 16px; font-weight: 600; color: #E60012;">{{ item.score }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 移除旧样式，使用内联样式替代 */
</style>