<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Coin, ShoppingCart, Document, List } from '@element-plus/icons-vue'

const router = useRouter()

// 积分信息
const scoreInfo = ref({
  currentScore: 150
})

// 商品列表
const productList = ref([
  {
    id: 1,
    name: '科顺定制外套',
    score: 399,
    originalPrice: 99,
    image: 'https://picsum.photos/200/200?random=1',
    category: '商品',
    description: '防水施工专用外套，防风防水，保暖舒适',
    stock: 50,
    status: '上架'
  },
  {
    id: 2,
    name: '东成角磨机WSM710',
    score: 499,
    originalPrice: 259,
    image: 'https://picsum.photos/200/200?random=2',
    category: '工具',
    description: '专业角磨机，适合防水施工切割打磨',
    stock: 30,
    status: '上架'
  },
  {
    id: 3,
    name: '得力手持激光测距仪',
    score: 299,
    originalPrice: 129,
    image: 'https://picsum.photos/200/200?random=3',
    category: '工具',
    description: '高精度激光测距仪，适合现场测量',
    stock: 40,
    status: '上架'
  },
  {
    id: 4,
    name: '东成电动美缝胶枪双管',
    score: 599,
    originalPrice: 329,
    image: 'https://picsum.photos/200/200?random=4',
    category: '工具',
    description: '电动美缝胶枪，省力高效',
    stock: 25,
    status: '上架'
  },
  {
    id: 5,
    name: '防水工具箱',
    score: 500,
    originalPrice: 199,
    image: 'https://picsum.photos/200/200?random=5',
    category: '工具',
    description: '专业防水施工工具箱，包含各种常用工具',
    stock: 10,
    status: '上架'
  },
  {
    id: 6,
    name: '防水手套',
    score: 100,
    originalPrice: 29,
    image: 'https://picsum.photos/200/200?random=6',
    category: '防护类',
    description: '耐用防水手套，保护双手安全',
    stock: 50,
    status: '上架'
  }
])

// 商品分类
const categories = ref(['全部', '工具', '商品', '防护类', '礼券'])

// 当前选中分类
const currentCategory = ref('全部')

// 筛选后的商品列表
const filteredProducts = computed(() => {
  if (currentCategory.value === '全部') {
    return productList.value
  }
  return productList.value.filter(product => product.category === currentCategory.value)
})

// 商品详情弹窗显示状态
const productDialogVisible = ref(false)

// 当前选中的商品
const selectedProduct = ref(null)

// 查看商品详情
const viewProductDetail = (product) => {
  selectedProduct.value = product
  productDialogVisible.value = true
}

// 兑换商品
const exchangeProduct = (product) => {
  if (scoreInfo.currentScore < product.score) {
    ElMessage.error('积分不足，无法兑换该商品')
    return
  }
  
  ElMessage.confirm(`确定要兑换商品 "${product.name}" 吗？`, '兑换确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'primary'
  }).then(() => {
    ElMessage.success(`成功兑换 ${product.name}，消耗 ${product.score} 积分`)
    // 这里可以添加兑换逻辑，比如调用API
    console.log('兑换商品:', product)
  }).catch(() => {
    ElMessage.info('已取消兑换')
  })
}

// 查看兑换记录
const viewExchangeRecord = () => {
  router.push('/master-app/exchange-record')
}

// 查看积分流水
const viewScoreHistory = () => {
  router.push('/master-app/score-center')
}
</script>

<template>
  <div class="score-mall-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
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
        
        <div class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">积分商城</div>
        
        <!-- 积分信息 -->
        <div class="score-overview" style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
          <div class="score-main-info" style="display: flex; align-items: center;">
            <div class="score-label" style="font-size: 14px; color: rgba(255,255,255,0.9); margin-right: 8px;">当前积分：</div>
            <div class="score-value" style="font-size: 24px; font-weight: bold; color: white; display: flex; align-items: center;">
              <Coin style="margin-right: 6px;" />
              {{ scoreInfo.currentScore }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分类标签卡片 - 浮动白色卡片 -->
    <div style="margin: -20px 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <!-- 分类标签 -->
      <div class="category-tabs" style="display: flex; gap: 12px; overflow-x: auto; padding-bottom: 8px; -webkit-overflow-scrolling: touch;">
        <div 
          v-for="category in categories" 
          :key="category" 
          :class="['category-tab', { active: currentCategory === category }]" 
          @click="currentCategory = category" 
          style="flex-shrink: 0; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.3s ease;"
          :style="currentCategory === category ? 'background-color: #E60012; color: white;' : 'background-color: #f3f4f6; color: #6b7280;'"
        >
          {{ category }}
        </div>
      </div>
    </div>

    <!-- 商品列表卡片 - 浮动白色卡片 -->
    <div style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <!-- 商品列表 -->
      <div class="product-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 16px;">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id" 
          @click="viewProductDetail(product)" 
          style="background-color: #f9fafb; border: 1px solid #E5E7EB; border-radius: 12px; padding: 12px; transition: all 0.3s ease; cursor: pointer;"
        >
          <div class="product-image" style="display: flex; justify-content: center; align-items: center; margin-bottom: 12px; background-color: white; border-radius: 8px; padding: 8px; height: 120px;">
            <img :src="product.image" :alt="product.name" style="max-width: 100%; max-height: 100%; object-fit: cover; border-radius: 4px;" />
          </div>
          <div class="product-info" style="padding: 0;">
            <div class="product-name" style="font-size: 14px; font-weight: 500; color: #111827; margin-bottom: 4px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              {{ product.name }}
            </div>
            <div class="product-price" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <div class="score-price" style="display: flex; align-items: center; font-size: 16px; font-weight: 600; color: #E60012;">
                <Coin style="margin-right: 4px; font-size: 14px;" />
                {{ product.score }}
              </div>
              <div class="original-price" style="font-size: 12px; color: #9ca3af; text-decoration: line-through;">
                ¥{{ product.originalPrice }}
              </div>
            </div>
            <div class="product-stock" :style="product.stock <= 10 ? 'font-size: 12px; color: #EF4444;' : 'font-size: 12px; color: #6b7280;'">
              库存：{{ product.stock }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-if="filteredProducts.length === 0" style="text-align: center; padding: 40px 0;">
        <div style="font-size: 16px; color: #9ca3af; margin-bottom: 16px;">当前分类下暂无商品</div>
      </div>
    </div>

    <!-- 商品详情弹窗 -->
    <el-dialog
      v-model="productDialogVisible"
      :title="selectedProduct?.name || '商品详情'"
      width="80%"
      :before-close="() => productDialogVisible = false"
      style="border-radius: 16px;"
    >
      <div class="product-detail-container" v-if="selectedProduct" style="padding: 16px 0;">
        <div class="product-detail-main" style="display: flex; flex-direction: column; gap: 16px;">
          <div class="product-detail-image" style="display: flex; justify-content: center; align-items: center; background-color: #f9fafb; border-radius: 12px; padding: 16px;">
            <img :src="selectedProduct.image" :alt="selectedProduct.name" style="max-width: 100%; max-height: 200px; object-fit: contain;" />
          </div>
          <div class="product-detail-info" style="display: flex; flex-direction: column; gap: 12px;">
            <div class="detail-category" style="font-size: 14px; color: #E60012; font-weight: 500;">
              {{ selectedProduct.category }}
            </div>
            <h2 class="detail-name" style="font-size: 18px; font-weight: 600; color: #111827; line-height: 1.3; margin: 0;">
              {{ selectedProduct.name }}
            </h2>
            <div class="detail-description" style="font-size: 14px; color: #6b7280; line-height: 1.5;">
              {{ selectedProduct.description }}
            </div>
            <div class="detail-price-section" style="display: flex; flex-direction: column; gap: 4px;">
              <div class="detail-score-price" style="display: flex; align-items: center; gap: 8px; font-size: 24px; font-weight: 700; color: #E60012;">
                <Coin style="font-size: 20px;" />
                <span class="score-value">{{ selectedProduct.score }}</span>
                <span class="score-unit" style="font-size: 14px; font-weight: 500;">积分</span>
              </div>
              <div class="detail-original-price" style="font-size: 14px; color: #9ca3af; text-decoration: line-through;">
                原价：¥{{ selectedProduct.originalPrice }}
              </div>
            </div>
            <div class="detail-stock" style="display: flex; align-items: center; gap: 8px;">
              <span class="stock-label" style="font-size: 14px; color: #6b7280;">库存：</span>
              <span class="stock-value" :style="selectedProduct.stock <= 10 ? 'color: #EF4444; font-weight: 500;' : 'color: #10B981; font-weight: 500;'">
                {{ selectedProduct.stock }}
              </span>
            </div>
            <div class="detail-status" style="display: flex; align-items: center; gap: 8px;">
              <span class="status-label" style="font-size: 14px; color: #6b7280;">状态：</span>
              <span :style="selectedProduct.status === '上架' ? 'color: #10B981; font-weight: 500;' : 'color: #EF4444; font-weight: 500;'">
                {{ selectedProduct.status }}
              </span>
            </div>
          </div>
        </div>
        <div class="product-detail-footer" style="display: flex; flex-direction: column; gap: 16px; padding: 16px 0; border-top: 1px solid #e5e7eb; margin-top: 16px;">
          <div class="user-score-info" style="display: flex; flex-direction: column; gap: 4px;">
            <span class="score-tip" style="font-size: 14px; color: #6b7280;">
              您当前有 <span style="color: #E60012; font-weight: 600;">{{ scoreInfo.currentScore }}</span> 积分，
              <span :style="scoreInfo.currentScore >= selectedProduct.score ? 'color: #10B981; font-weight: 500;' : 'color: #EF4444; font-weight: 500;'">
                {{ scoreInfo.currentScore >= selectedProduct.score ? '积分充足，可以兑换' : '积分不足，无法兑换' }}
              </span>
            </span>
          </div>
          <el-button 
            type="primary" 
            size="default" 
            @click="exchangeProduct(selectedProduct)" 
            :disabled="scoreInfo.currentScore < selectedProduct.score || selectedProduct.stock <= 0"
            style="width: 100%; height: 44px; font-size: 16px; font-weight: 500; border-radius: 22px; background-color: #E60012; border-color: #E60012;"
          >
            <ShoppingCart style="margin-right: 6px;" />
            立即兑换
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
/* 移除旧样式，使用内联样式替代 */
</style>