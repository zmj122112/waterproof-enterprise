<script setup>
// 工程案例详情页面
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const caseId = ref(route.params.id || '1')

// 工程案例详情数据
const caseDetail = ref({
  id: caseId.value,
  title: '某小区屋顶补漏工程',
  category: '屋顶补漏',
  date: '2025-12-01',
  location: '上海市浦东新区',
  client: '某小区物业',
  duration: '15天',
  description: '该工程主要解决小区20栋楼的屋顶漏水问题。通过专业的检测和评估，我们采用了先进的防水材料和施工工艺，对每栋楼的屋顶进行了全面的防水处理。工程完成后，经过多次暴雨考验，所有楼栋均未出现漏水情况，得到了小区居民和物业的一致好评。',
  images: [
    '/src/assets/images/waterproof-1.jpg',
    '/src/assets/images/waterproof-2.jpg',
    '/src/assets/images/waterproof-1.jpg'
  ],
  challenges: [
    '屋顶结构复杂，施工难度大',
    '天气变化影响施工进度',
    '需要协调多栋楼的居民',
    '原有防水层老化严重'
  ],
  solutions: [
    '采用分层防水设计，确保全面覆盖',
    '制定灵活的施工计划，应对天气变化',
    '提前与居民沟通，减少施工影响',
    '彻底清除老化防水层，重新做防水'
  ],
  results: [
    '解决了20栋楼的屋顶漏水问题',
    '提高了屋顶的防水性能，延长了使用寿命',
    '得到了客户的高度认可',
    '树立了良好的企业形象'
  ]
})

// 返回工程案例列表
const goBack = () => {
  router.push('/c-mini/project-case-list')
}

onMounted(() => {
  console.log('工程案例详情页面加载，案例ID:', caseId.value)
})
</script>

<template>
  <div class="project-case-detail-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 80px;">
    <!-- 页面标题栏 -->
    <div style="background-color: #E60012; padding: 20px 20px 40px; text-align: center; position: relative; z-index: 30; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px;">
      <!-- 返回按钮 -->
      <a href="/c-mini/project-case-list" style="position: absolute; left: 10px; top: 10px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; cursor: pointer; z-index: 99999; background: rgba(255,255,255,0.1); border-radius: 50%; text-decoration: none;">
        <el-icon><ArrowLeft /></el-icon>
      </a>
      
      <!-- 空div用于占位，确保标题栏高度足够 -->
      <div style="height: 20px;"></div>
    </div>

    <!-- 案例标题 -->
    <div style="padding: 16px 20px 0; text-align: center;">
      <h1 style="font-size: 20px; font-weight: bold; color: #111827; margin: 0 0 8px 0;">{{ caseDetail.title }}</h1>
      <div style="display: flex; justify-content: center; gap: 12px; align-items: center;">
        <div style="background: #FFF0F0; color: #E60012; font-size: 12px; padding: 4px 12px; border-radius: 16px;">{{ caseDetail.category }}</div>
        <div style="color: #6b7280; font-size: 12px;">{{ caseDetail.date }}</div>
      </div>
    </div>

    <!-- 案例图片轮播 -->
    <div style="padding: 16px;">
      <div style="background: white; border: 1px solid #E5E7EB; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <el-carousel trigger="click" height="200px" :interval="4000" arrow="always" style="border-radius: 20px;">
          <el-carousel-item v-for="(image, index) in caseDetail.images" :key="index">
            <img :src="image" style="width: 100%; height: 200px; object-fit: cover; border-radius: 20px;">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <!-- 案例基本信息 -->
    <div style="padding: 0 20px 16px;">
      <div style="background: white; border: 1px solid #E5E7EB; border-radius: 20px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">项目地点</div>
            <div style="font-size: 16px; color: #111827; font-weight: 500;">{{ caseDetail.location }}</div>
          </div>
          <div>
            <div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">客户单位</div>
            <div style="font-size: 16px; color: #111827; font-weight: 500;">{{ caseDetail.client }}</div>
          </div>
          <div>
            <div style="font-size: 14px; color: #6b7280; margin-bottom: 4px;">施工周期</div>
            <div style="font-size: 16px; color: #111827; font-weight: 500;">{{ caseDetail.duration }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 案例描述 -->
    <div style="padding: 0 20px 16px;">
      <div style="background: white; border: 1px solid #E5E7EB; border-radius: 20px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="font-size: 16px; font-weight: bold; color: #111827; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #E5E7EB;">项目概述</div>
        <div style="color: #6b7280; line-height: 1.6; font-size: 14px; white-space: pre-line;">
          {{ caseDetail.description }}
        </div>
      </div>
    </div>

    <!-- 项目挑战 -->
    <div style="padding: 0 20px 16px;">
      <div style="background: white; border: 1px solid #E5E7EB; border-radius: 20px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="font-size: 16px; font-weight: bold; color: #111827; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #E5E7EB;">项目挑战</div>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div v-for="(challenge, index) in caseDetail.challenges" :key="index" style="display: flex; align-items: flex-start; gap: 8px;">
            <div style="width: 24px; height: 24px; background: #FEE2E2; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #E60012; font-size: 12px; font-weight: bold; flex-shrink: 0; margin-top: 2px;">{{ index + 1 }}</div>
            <div style="color: #6b7280; line-height: 1.5; font-size: 14px;">{{ challenge }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 解决方案 -->
    <div style="padding: 0 20px 16px;">
      <div style="background: white; border: 1px solid #E5E7EB; border-radius: 20px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="font-size: 16px; font-weight: bold; color: #111827; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #E5E7EB;">解决方案</div>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div v-for="(solution, index) in caseDetail.solutions" :key="index" style="display: flex; align-items: flex-start; gap: 8px;">
            <div style="width: 24px; height: 24px; background: #DBEAFE; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #2563EB; font-size: 12px; font-weight: bold; flex-shrink: 0; margin-top: 2px;">{{ index + 1 }}</div>
            <div style="color: #6b7280; line-height: 1.5; font-size: 14px;">{{ solution }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 项目成果 -->
    <div style="padding: 0 20px 16px;">
      <div style="background: white; border: 1px solid #E5E7EB; border-radius: 20px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="font-size: 16px; font-weight: bold; color: #111827; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #E5E7EB;">项目成果</div>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div v-for="(result, index) in caseDetail.results" :key="index" style="display: flex; align-items: flex-start; gap: 8px;">
            <div style="width: 24px; height: 24px; background: #D1FAE5; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #059669; font-size: 12px; font-weight: bold; flex-shrink: 0; margin-top: 2px;">{{ index + 1 }}</div>
            <div style="color: #6b7280; line-height: 1.5; font-size: 14px;">{{ result }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-case-detail-page {
  padding-bottom: 80px;
}
</style>