<script setup>
// 优惠券中心页面
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'

const router = useRouter()

// 优惠券列表数据
const coupons = ref([
  {
    id: 1,
    type: 'discount',
    name: '9折优惠券',
    value: '9折',
    minOrderAmount: 1000,
    validDate: '2025-12-31',
    description: '满1000元可用，全场通用',
    status: 'valid'
  },
  {
    id: 2,
    type: 'cash',
    name: '满减优惠券',
    value: '50',
    minOrderAmount: 500,
    validDate: '2025-12-31',
    description: '满500元减50元，防水工程可用',
    status: 'valid'
  },
  {
    id: 3,
    type: 'cash',
    name: '新人专享券',
    value: '100',
    minOrderAmount: 800,
    validDate: '2025-11-30',
    description: '新人专享，满800元减100元',
    status: 'expired'
  }
])

// 返回上一页
const goBack = () => {
  history.back()
}

// 使用优惠券
const useCoupon = (couponId) => {
  alert('使用优惠券功能开发中，优惠券ID: ' + couponId)
}

onMounted(() => {
  console.log('优惠券中心页面加载')
})
</script>

<template>
  <div class="coupon-center-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
    <!-- 页面标题栏 -->
    <div style="background-color: #E60012; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding: 20px 20px 30px; text-align: center; position: relative;">
      <a href="/c-mini/user-center" style="position: absolute; left: 10px; top: 10px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; cursor: pointer; z-index: 99999; background: rgba(255,255,255,0.1); border-radius: 50%; text-decoration: none;">
        <el-icon><ArrowLeft /></el-icon>
      </a>
      <div style="color: white; font-size: 20px; font-weight: 700; margin: 0;">优惠券中心</div>
    </div>

    <!-- 优惠券列表 -->
    <div style="padding: 16px;">
      <!-- 优惠券分类 -->
      <div style="display: flex; gap: 12px; margin-bottom: 16px;">
        <div style="flex: 1; background: white; border-radius: 12px; padding: 12px; text-align: center; font-size: 14px; font-weight: 500; color: #E60012; border: 1px solid #E60012; cursor: pointer;">全部</div>
        <div style="flex: 1; background: white; border-radius: 12px; padding: 12px; text-align: center; font-size: 14px; color: #6b7280; border: 1px solid #E5E7EB; cursor: pointer;">可用</div>
        <div style="flex: 1; background: white; border-radius: 12px; padding: 12px; text-align: center; font-size: 14px; color: #6b7280; border: 1px solid #E5E7EB; cursor: pointer;">已使用</div>
        <div style="flex: 1; background: white; border-radius: 12px; padding: 12px; text-align: center; font-size: 14px; color: #6b7280; border: 1px solid #E5E7EB; cursor: pointer;">已过期</div>
      </div>
      
      <!-- 优惠券列表项 -->
      <div v-for="coupon in coupons" :key="coupon.id" 
           :style="{
             background: coupon.status === 'expired' ? '#F9FAFB' : '#FFF8F8',
             border: coupon.status === 'expired' ? '1px solid #E5E7EB' : '1px solid #FEE2E2',
             borderRadius: '16px',
             padding: '16px',
             marginBottom: '16px',
             boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
             opacity: coupon.status === 'expired' ? 0.6 : 1
           }">
        <!-- 优惠券头部 -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <!-- 优惠券金额/折扣 -->
            <div style="display: flex; align-items: baseline;">
              <span v-if="coupon.type === 'discount'" style="font-size: 32px; font-weight: bold; color: #E60012;">{{ coupon.value }}</span>
              <span v-else style="font-size: 32px; font-weight: bold; color: #E60012;">¥{{ coupon.value }}</span>
              <span v-if="coupon.type === 'cash'" style="font-size: 14px; color: #6b7280; margin-left: 4px;">满{{ coupon.minOrderAmount }}可用</span>
            </div>
            <!-- 优惠券信息 -->
            <div style="flex: 1;">
              <div style="font-weight: 500; font-size: 16px; color: #111827; margin-bottom: 4px;">{{ coupon.name }}</div>
              <div style="font-size: 12px; color: #6b7280; margin-bottom: 8px;">{{ coupon.description }}</div>
              <div style="font-size: 12px; color: #9ca3af;">有效期至: {{ coupon.validDate }}</div>
            </div>
          </div>
          <!-- 使用按钮 -->
          <div>
            <button @click="useCoupon(coupon.id)" 
                    :style="{
                      background: coupon.status === 'expired' ? '#F3F4F6' : '#E60012',
                      color: coupon.status === 'expired' ? '#9ca3af' : 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: coupon.status === 'expired' ? 'not-allowed' : 'pointer',
                      opacity: coupon.status === 'expired' ? 0.6 : 1
                    }">
              {{ coupon.status === 'expired' ? '已过期' : '立即使用' }}
            </button>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-if="coupons.length === 0" style="background: white; border-radius: 16px; padding: 40px 20px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
        <div style="font-size: 48px; margin-bottom: 16px;">🎟️</div>
        <div style="font-size: 16px; color: #6b7280; margin-bottom: 8px;">暂无可用优惠券</div>
        <div style="font-size: 14px; color: #9ca3af;">快去参与活动获取优惠券吧</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.coupon-center-page {
  padding-bottom: 100px;
}
</style>