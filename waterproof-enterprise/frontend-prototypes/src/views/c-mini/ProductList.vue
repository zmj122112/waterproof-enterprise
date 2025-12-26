<script setup>
// 产品列表页面
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Search } from '@element-plus/icons-vue'

const router = useRouter()

// 产品分类
const categories = ref([
  '全部',
  '防水涂料',
  '卷材维修',
  '瓷砖胶',
  '美缝剂',
  '堵漏王'
])

// 当前选中的分类
const selectedCategory = ref('全部')

// 产品列表数据
const products = ref([
  {
    id: 1,
    name: '月星御盾K11通用型防水浆料',
    category: '防水涂料',
    specification: '20kg/桶',
    icon: '🪣',
    isHot: true
  },
  {
    id: 2,
    name: '高弹柔韧性丙烯酸防水涂料',
    category: '防水涂料',
    specification: '18kg/桶',
    icon: '💧',
    isHot: true
  },
  {
    id: 3,
    name: '水不漏（速凝型）',
    category: '建材维修',
    specification: '5kg/袋',
    icon: '🧱',
    isHot: true
  }
])

// 搜索关键词
const searchKeyword = ref('')

// 返回首页
const goBack = () => {
  router.push('/c-mini/home')
}

// 跳转到产品详情
const goToProductDetail = (productId) => {
  console.log('跳转到产品详情，ID:', productId)
  router.push('/c-mini/product-detail/' + productId)
}

// 搜索产品
const searchProducts = () => {
  console.log('搜索产品:', searchKeyword.value)
  // 这里可以添加搜索逻辑
}

// 切换分类
const switchCategory = (category) => {
  selectedCategory.value = category
  console.log('切换分类:', category)
  // 这里可以添加分类筛选逻辑
}

onMounted(() => {
  console.log('产品列表页面加载')
})
</script>

<template>
  <div class="product-list-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
    <!-- 页面标题栏 -->
    <div style="background-color: #E60012; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding: 20px 20px 30px; text-align: center; position: relative;">
      <a href="/c-mini/home" style="position: absolute; left: 10px; top: 10px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; cursor: pointer; z-index: 99999; background: rgba(255,255,255,0.1); border-radius: 50%; text-decoration: none;">
        <el-icon><ArrowLeft /></el-icon>
      </a>
      <div style="color: white; font-size: 20px; font-weight: 700; margin: 0;">找产品</div>
    </div>

    <!-- 搜索栏 -->
    <div style="padding: 16px;">
      <div style="background: white; border: 1px solid #E5E7EB; border-radius: 20px; padding: 8px 16px; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <el-icon style="color: #6b7280;"><Search /></el-icon>
        <input 
          v-model="searchKeyword" 
          type="text" 
          placeholder="搜索产品" 
          style="flex: 1; border: none; outline: none; font-size: 14px; color: #111827;"
          @keyup.enter="searchProducts"
        >
        <button 
          @click="searchProducts" 
          style="background: #E60012; color: white; border: none; padding: 6px 16px; border-radius: 12px; font-size: 14px; font-weight: 500; cursor: pointer;"
        >
          搜索
        </button>
      </div>
    </div>

    <!-- 分类标签 -->
    <div style="padding: 0 16px 16px; overflow-x: auto; white-space: nowrap;">
      <div style="display: flex; gap: 12px; padding-bottom: 8px;">
        <div 
          v-for="category in categories" 
          :key="category" 
          @click="switchCategory(category)"
          :style="{
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: selectedCategory === category ? 'bold' : 'normal',
            color: selectedCategory === category ? '#E60012' : '#6b7280',
            backgroundColor: selectedCategory === category ? '#FFF0F0' : '#f3f4f6',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: selectedCategory === category ? '1px solid #E60012' : '1px solid #e5e7eb'
          }"
        >
          {{ category }}
        </div>
      </div>
    </div>

    <!-- 优化后的横幅 -->
    <div style="padding: 0 16px 16px;">
      <div style="background: linear-gradient(135deg, #E60012 0%, #FF4D4F 100%); border-radius: 20px; padding: 20px; display: flex; align-items: center; gap: 16px; color: white; box-shadow: 0 6px 20px rgba(0,0,0,0.15);">
        <div style="font-size: 48px;">🛡️</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: bold; margin-bottom: 4px;">专业防水解决方案</div>
          <div style="font-size: 12px; opacity: 0.9;">国企品质 · 安全可靠 · 环保健康</div>
        </div>
        <div style="background: rgba(255,255,255,0.2); border-radius: 12px; padding: 8px 16px; font-size: 12px; font-weight: 500;">
          立即了解
        </div>
      </div>
    </div>

    <!-- 产品列表 -->
    <div style="padding: 0 16px;">
      <div style="font-size: 14px; color: #6b7280; margin-bottom: 12px;">当前有 {{ products.length }} 个产品</div>
      
      <!-- 产品列表项 -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
        <div 
          v-for="product in products" 
          :key="product.id" 
          @click="goToProductDetail(product.id)"
          style="background: white; border: 1px solid #E5E7EB; border-radius: 20px; padding: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); cursor: pointer; transition: all 0.3s ease; display: flex; flex-direction: column; align-items: center;"
          @mouseenter="$event.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)'"
          @mouseleave="$event.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'"
        >
          <!-- 热销标签 -->
          <div v-if="product.isHot" style="position: absolute; top: 12px; right: 12px; background: #E60012; color: white; font-size: 10px; padding: 2px 8px; border-radius: 10px; z-index: 10;">热销</div>
          
          <!-- 产品图标 -->
          <div style="position: relative; margin-bottom: 12px; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; font-size: 40px;">
            {{ product.icon }}
          </div>
          
          <!-- 产品名称 -->
          <div style="font-weight: 500; font-size: 14px; color: #111827; margin-bottom: 4px; text-align: center; line-height: 1.4;">{{ product.name }}</div>
          
          <!-- 产品分类 -->
          <div style="font-size: 12px; color: #6b7280; margin-bottom: 2px;">{{ product.category }}</div>
          
          <!-- 产品规格 -->
          <div style="font-size: 12px; color: #9ca3af;">规格：{{ product.specification }}</div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-if="products.length === 0" style="background: white; border-radius: 20px; padding: 40px 20px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="font-size: 48px; margin-bottom: 16px;">📦</div>
        <div style="font-size: 16px; color: #6b7280; margin-bottom: 8px;">暂无产品信息</div>
        <div style="font-size: 14px; color: #9ca3af;">请尝试其他搜索条件</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-list-page {
  padding-bottom: 100px;
}
</style>
