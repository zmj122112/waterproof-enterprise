<script setup>
// 客户评价详情页面
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const reviewId = ref(route.params.id || '1')

// 客户评价详情数据
const reviewDetail = ref({
  id: reviewId.value,
  name: '张先生',
  avatar: '张',
  content: '师傅很专业，服务态度好，维修后没有再出现漏水问题，非常满意！',
  rating: 5,
  project: '卫生间维修',
  date: '2025-12-20',
  tags: ['专业', '态度好', '效果佳'],
  master: '李师傅',
  masterId: '1',
  orderNumber: 'YX20251220001',
  serviceTime: '2025-12-18 14:00-16:00',
  serviceAddress: '上海市浦东新区张杨路1000号',
  followUp: '维修后一周，师傅主动回访，询问使用情况，非常贴心。',
  images: [
    '/images/waterproof-1.jpg',
    '/images/waterproof-2.jpg'
  ]
})

// 返回评价列表
const goBack = () => {
  router.push('/c-mini/customer-review-list')
}

// 跳转到师傅详情
const goToMasterDetail = () => {
  router.push('/c-mini/master-detail/' + reviewDetail.masterId)
}

onMounted(() => {
  console.log('客户评价详情页面加载，评价ID:', reviewId.value)
})
</script>

<template>
  <div class="customer-review-detail-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 80px;">
    <!-- 页面标题栏 -->
    <div style="background-color: #E60012; padding: 20px 20px 40px; text-align: center; position: relative; z-index: 30; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px;">
      <!-- 返回按钮 -->
      <a href="/c-mini/customer-review-list" style="position: absolute; left: 10px; top: 10px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; cursor: pointer; z-index: 99999; background: rgba(255,255,255,0.1); border-radius: 50%; text-decoration: none;">
        <el-icon><ArrowLeft /></el-icon>
      </a>
      
      <!-- 空div用于占位，确保标题栏高度足够 -->
      <div style="height: 20px;"></div>
    </div>

    <!-- 评价基本信息 -->
    <div style="padding: 16px 20px;">
      <div style="background: white; border: 1px solid #E5E7EB; border-radius: 20px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <!-- 评价头部 -->
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
          <div style="width: 60px; height: 60px; background: #E60012; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;">{{ reviewDetail.avatar }}</div>
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <div style="font-weight: bold; font-size: 16px;">{{ reviewDetail.name }}</div>
              <el-rate :model-value="reviewDetail.rating" disabled size="small" show-score score-template="{value}" />
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 12px;">
              <div style="font-size: 12px; color: #6b7280;">{{ reviewDetail.project }}</div>
              <div style="font-size: 12px; color: #6b7280;">{{ reviewDetail.date }}</div>
              <div style="font-size: 12px; color: #6b7280;">订单号: {{ reviewDetail.orderNumber }}</div>
            </div>
          </div>
        </div>
        
        <!-- 评价标签 -->
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
          <div v-for="(tag, index) in reviewDetail.tags" :key="index" style="background: #FFF0F0; color: #E60012; font-size: 12px; padding: 4px 12px; border-radius: 16px;">{{ tag }}</div>
        </div>
        
        <!-- 评价内容 -->
        <div style="font-size: 14px; color: #6b7280; line-height: 1.6; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #E5E7EB;">
          {{ reviewDetail.content }}
        </div>
        
        <!-- 服务信息 -->
        <div style="margin-bottom: 16px;">
          <div style="font-size: 16px; font-weight: bold; color: #111827; margin: 0 0 12px 0;">服务信息</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div>
              <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">服务师傅</div>
              <div style="font-size: 14px; color: #111827; display: flex; align-items: center; gap: 8px;">
                {{ reviewDetail.master }}
                <span style="font-size: 12px; color: #E60012; cursor: pointer; text-decoration: underline;" @click="goToMasterDetail">查看详情</span>
              </div>
            </div>
            <div>
              <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">服务时间</div>
              <div style="font-size: 14px; color: #111827;">{{ reviewDetail.serviceTime }}</div>
            </div>
            <div style="grid-column: 1 / -1;">
              <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">服务地址</div>
              <div style="font-size: 14px; color: #111827;">{{ reviewDetail.serviceAddress }}</div>
            </div>
          </div>
        </div>
        
        <!-- 追评内容 -->
        <div v-if="reviewDetail.followUp" style="padding: 16px; background: #F9FAFB; border-radius: 12px;">
          <div style="font-size: 14px; font-weight: bold; color: #111827; margin: 0 0 8px 0;">追加评价</div>
          <div style="font-size: 14px; color: #6b7280; line-height: 1.6;">{{ reviewDetail.followUp }}</div>
        </div>
      </div>
    </div>

    <!-- 评价图片 -->
    <div style="padding: 0 20px 16px;">
      <div style="background: white; border: 1px solid #E5E7EB; border-radius: 20px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="font-size: 16px; font-weight: bold; color: #111827; margin: 0 0 16px 0;">评价图片</div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
          <div v-for="(image, index) in reviewDetail.images" :key="index" style="border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <img :src="image" style="width: 100%; height: 150px; object-fit: cover; border-radius: 12px;">
          </div>
        </div>
      </div>
    </div>

    <!-- 推荐评价 -->
    <div style="padding: 0 20px 16px;">
      <div style="background: white; border: 1px solid #E5E7EB; border-radius: 20px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="font-size: 16px; font-weight: bold; color: #111827; margin: 0 0 16px 0;">相关推荐</div>
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #F9FAFB; border-radius: 12px; margin-bottom: 12px;">
          <div style="width: 40px; height: 40px; background: #E60012; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; font-weight: bold;">李</div>
          <div style="flex: 1;">
            <div style="font-weight: bold; font-size: 14px;">李女士</div>
            <div style="font-size: 12px; color: #6b7280;">屋顶补漏 | 2025-12-18</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">国企背景果然不一样，服务规范，价格透明，维修质量高，推荐！</div>
          </div>
          <el-rate :model-value="5" disabled size="small" />
        </div>
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #F9FAFB; border-radius: 12px;">
          <div style="width: 40px; height: 40px; background: #E60012; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; font-weight: bold;">王</div>
          <div style="flex: 1;">
            <div style="font-weight: bold; font-size: 14px;">王先生</div>
            <div style="font-size: 12px; color: #6b7280;">阳台防水 | 2025-12-15</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">师傅上门很及时，检测仔细，维修工艺精湛，解决了困扰我多年的漏水问题。</div>
          </div>
          <el-rate :model-value="5" disabled size="small" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.customer-review-detail-page {
  padding-bottom: 80px;
}
</style>