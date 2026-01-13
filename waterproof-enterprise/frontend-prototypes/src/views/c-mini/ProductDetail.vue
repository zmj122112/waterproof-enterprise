<script setup>
// 产品详情页面
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Check } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const productId = ref(route.params.id || '1')

// 产品数据
const product = ref({
  id: productId.value,
  name: '月星御盾K11通用型防水浆料',
  icon: '🪣',
  features: [
    '法国A+环保认证',
    '超强抗渗',
    '长期水泡',
    '施工便捷'
  ],
  certifications: [
    { name: '法国A+', icon: '🌍' },
    { name: '绿色认证', icon: '🌱' }
  ],
  standard: 'JC/T 2090-2011 (DM型)',
  specification: '20kg/桶',
  introduction: '专为家庭厨卫设计，具有极强的渗透结晶能力，刚柔相济。\n\n月星防水以此产品致敬匠心，采用进口原材料，经过28道工序严格检测。具有超强的粘结力和柔韧性，是家庭防水的理想选择。'
})

// 返回产品列表
const goBack = () => {
  console.log('返回按钮点击事件触发');
  console.log('当前路由:', route.path);
  // 直接使用window.location.href跳转，确保能够返回
  window.location.href = '/c-mini/product-list';
}

onMounted(() => {
  console.log('产品详情页面加载，产品ID:', productId.value)
})
</script>

<template>
  <div class="product-detail-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 80px;">
    <!-- 页面标题栏 - 包含返回按钮和分享图标 -->
    <div style="background-color: #CC0010; padding: 20px 20px 40px; text-align: center; position: relative; z-index: 30; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px;">
      <!-- 返回按钮 -->
      <a href="/c-mini/product-list" style="position: absolute; left: 10px; top: 10px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; cursor: pointer; z-index: 99999; background: rgba(255,255,255,0.1); border-radius: 50%; text-decoration: none;">
        <el-icon><ArrowLeft /></el-icon>
      </a>
      
      <!-- 分享图标 -->
      <div style="position: absolute; right: 20px; top: 20px; color: white; font-size: 18px; cursor: pointer; z-index: 99999;">
        <span style="font-size: 18px;">🔗</span>
      </div>
      
      <!-- 空div用于占位，确保标题栏高度足够 -->
      <div style="height: 20px;"></div>
    </div>

    <!-- 产品图标 -->
    <div style="display: flex; justify-content: center; align-items: center; padding: 20px 0; position: relative; z-index: 20; margin-top: -60px;">
      <div style="background: white; border-radius: 50%; padding: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; font-size: 60px;">
        {{ product.icon }}
      </div>
    </div>

    <!-- 产品名称 -->
    <div style="padding: 0 20px 16px; text-align: center;">
      <h1 style="font-size: 20px; font-weight: bold; color: #111827; margin: 0 0 8px 0;">{{ product.name }}</h1>
    </div>

    <!-- 产品特点 -->
    <div style="padding: 0 20px 16px;">
      <div style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;">
        <div v-for="(feature, index) in product.features" :key="index" style="display: flex; align-items: center; gap: 4px; background: #FFF0F0; color: #E60012; padding: 6px 12px; border-radius: 16px; font-size: 13px; font-weight: 500;">
          <el-icon style="font-size: 14px;"><Check /></el-icon>
          {{ feature }}
        </div>
      </div>
    </div>

    <!-- 认证信息 -->
    <div style="padding: 0 20px 20px;">
      <div style="display: flex; gap: 16px; justify-content: center;">
        <div v-for="(cert, index) in product.certifications" :key="index" style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <div style="width: 48px; height: 48px; background: #F0F9FF; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px;">
            {{ cert.icon }}
          </div>
          <div style="font-size: 12px; color: #6b7280;">{{ cert.name }}</div>
        </div>
      </div>
    </div>

    <!-- 产品标准和规格 -->
    <div style="background: white; margin: 0 20px 20px; border-radius: 20px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); position: relative; z-index: 10;">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #E5E7EB;">
        <div style="font-size: 14px; color: #6b7280;">执行标准</div>
        <div style="font-size: 14px; color: #111827; font-weight: 500;">{{ product.standard }}</div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0;">
        <div style="font-size: 14px; color: #6b7280;">包装规格</div>
        <div style="font-size: 14px; color: #111827; font-weight: 500;">{{ product.specification }}</div>
      </div>
    </div>

    <!-- 产品简介 -->
    <div style="background: white; margin: 0 20px 20px; border-radius: 20px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); position: relative; z-index: 10;">
      <div style="font-size: 16px; font-weight: bold; color: #111827; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 1px solid #E5E7EB;">产品简介</div>
      <div style="color: #6b7280; line-height: 1.6; font-size: 14px; white-space: pre-line;">
        {{ product.introduction }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-detail-page {
  padding-bottom: 80px;
}
</style>