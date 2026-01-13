<script setup>
// 师傅详情页面
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const masterId = ref(route.params.id || '1')

console.log('师傅详情页加载，ID:', masterId.value)

// 师傅数据
const master = ref({
  id: masterId.value,
  name: '张建国',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  jobNumber: 'YX20250001',
  title: '金牌工长',
  rating: 4.9,
  reviewCount: 286,
  experience: '15年',
  completedOrders: 1280,
  specialties: ['屋顶补漏', '卫生间防水', '外墙防水', '擅长疑难杂症'],
  introduction: '从事防水行业15年，曾参与多个市级重点工程防水项目。经验丰富，对各种渗漏水源头判断精准，施工细致。',
  certifications: [
    '实名认证',
    '金牌工长',
    '持证上岗',
    '国企背景'
  ],
  serviceArea: '上海市·浦东新区'
})

// 返回上一页
const goBack = () => {
  router.push('/c-mini/master-list')
}

onMounted(() => {
  console.log('师傅详情页面完全加载')
})
</script>

<template>
  <div class="master-detail-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 80px;">
    <!-- 师傅基本信息 - 红色顶部背景 -->
    <div style="background-color: #CC0010; padding: 20px 20px 40px; text-align: center; position: relative; z-index: 30; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px;">
      <!-- 返回按钮 -->
      <a href="/c-mini/master-list" style="position: absolute; left: 10px; top: 10px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; cursor: pointer; z-index: 99999; background: rgba(255,255,255,0.1); border-radius: 50%; text-decoration: none;">
        <el-icon><ArrowLeft /></el-icon>
      </a>
      <div style="width: 80px; height: 80px; border-radius: 50%; background: white; border: 3px solid white; margin-bottom: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; color: #E60012; font-size: 32px; font-weight: bold;">
        {{ master.name.charAt(0) }}
      </div>
      <h1 style="font-size: 20px; font-weight: bold; color: white; margin: 0 0 2px 0;">{{ master.name }}</h1>
      <div style="font-size: 12px; color: rgba(255,255,255,0.9); margin-bottom: 12px;">工号：{{ master.jobNumber }}</div>
      
      <!-- 经验、评分、服务数据 -->
      <div style="display: flex; justify-content: center; gap: 24px; margin-bottom: 15px;">
        <div>
          <div style="font-size: 18px; font-weight: bold; color: white;">{{ master.experience }}</div>
          <div style="font-size: 11px; color: rgba(255,255,255,0.8);">经验</div>
        </div>
        <div>
          <div style="font-size: 18px; font-weight: bold; color: white;">{{ master.rating }}</div>
          <div style="font-size: 11px; color: rgba(255,255,255,0.8);">评分</div>
        </div>
        <div>
          <div style="font-size: 18px; font-weight: bold; color: white;">{{ master.completedOrders }}</div>
          <div style="font-size: 11px; color: rgba(255,255,255,0.8);">服务</div>
        </div>
      </div>
    </div>

    <!-- 认证信息 -->
    <div style="background: white; margin: 0 20px 20px; border-radius: 20px; padding: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); position: relative; z-index: 20;">
      <div style="font-size: 14px; font-weight: 500; color: #111827; margin-bottom: 12px;">认证信息</div>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        <div v-for="(cert, index) in master.certifications" :key="index" style="background: #D1FAE5; color: #059669; font-size: 12px; padding: 4px 12px; border-radius: 16px; border: 1px solid #A7F3D0;">{{ cert }}</div>
        <div style="background: #BFDBFE; color: #2563EB; font-size: 12px; padding: 4px 12px; border-radius: 16px; border: 1px solid #93C5FD;">月星防水官方认证</div>
      </div>
    </div>

    <!-- 个人简介 -->
    <div style="background: white; margin: 0 20px 20px; border-radius: 20px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); position: relative; z-index: 10;">
      <div style="font-size: 16px; font-weight: bold; color: #111827; margin: 0 0 16px 0;">个人简介</div>
      <div style="color: #6b7280; line-height: 1.6; font-size: 14px;">
        {{ master.introduction }}
      </div>
    </div>

    <!-- 专长标签 -->
    <div style="background: white; margin: 0 20px 20px; border-radius: 20px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); position: relative; z-index: 10;">
      <div style="font-size: 16px; font-weight: bold; color: #111827; margin: 0 0 16px 0;">专长领域</div>
      <div style="display: flex; flex-wrap: wrap; gap: 12px;">
        <div v-for="(specialty, index) in master.specialties" :key="index" style="background: #FEE2E2; color: #E60012; font-size: 14px; padding: 6px 16px; border-radius: 20px;">{{ specialty }}</div>
      </div>
    </div>

    <!-- 服务区域 -->
    <div style="background: white; margin: 0 20px 20px; border-radius: 20px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); position: relative; z-index: 10;">
      <div style="font-size: 16px; font-weight: bold; color: #111827; margin: 0 0 12px 0;">服务区域</div>
      <div style="color: #6b7280; line-height: 1.6; font-size: 14px;">
        {{ master.serviceArea }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.master-detail-page {
  min-height: 100vh;
  background-color: #f5f7fa;
  padding-bottom: 80px;
}
</style>