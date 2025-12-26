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
  <div class="score-mall-page">
    <div class="page-header">
      <h1 class="page-title">积分商城</h1>
      <div class="header-actions">
        <el-button type="text" @click="viewScoreHistory" class="header-action-btn">
          <el-icon><Document /></el-icon>
          积分流水
        </el-button>
        <el-button type="text" @click="viewExchangeRecord" class="header-action-btn">
          <el-icon><List /></el-icon>
          兑换记录
        </el-button>
      </div>
    </div>

    <!-- 积分信息 -->
    <el-card class="score-info-card">
      <div class="score-info-content">
        <div class="score-main-info">
          <div class="score-label">当前积分</div>
          <div class="score-value">
            <Coin class="coin-icon" />
            {{ scoreInfo.currentScore }}
          </div>
        </div>
        <div class="score-actions">
          <el-button type="primary" @click="viewScoreHistory" class="detail-btn">
            查看积分详情
          </el-button>
        </div>
      </div>
    </el-card>

    <!-- 分类标签 -->
    <div class="category-tabs">
      <el-tabs v-model="currentCategory" class="category-tab" type="border-card" @tab-change="handleTabChange">
        <el-tab-pane 
          v-for="category in categories" 
          :key="category" 
          :label="category" 
          :name="category"
        >
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 商品列表 -->
    <div class="product-list-container">
      <div class="product-list" v-if="filteredProducts.length > 0">
        <el-card 
          v-for="product in filteredProducts" 
          :key="product.id" 
          class="product-card"
          @click="viewProductDetail(product)"
        >
          <div class="product-image">
            <img :src="product.image" :alt="product.name" class="product-img" />
            <div class="product-badge" v-if="product.status === '上架'">
              {{ product.status }}
            </div>
          </div>
          <div class="product-info">
            <div class="product-category">
              <el-tag size="small">{{ product.category }}</el-tag>
            </div>
            <div class="product-name">{{ product.name }}</div>
            <div class="product-description">{{ product.description }}</div>
            <div class="product-price">
              <div class="score-price">
                <Coin class="price-coin-icon" />
                {{ product.score }}
              </div>
              <div class="original-price">¥{{ product.originalPrice }}</div>
            </div>
            <div class="product-footer">
              <div class="product-stock" :class="{ 'low-stock': product.stock <= 10 }">
                库存：{{ product.stock }}
              </div>
              <el-button 
                type="primary" 
                @click.stop="exchangeProduct(product)" 
                class="exchange-btn"
                :disabled="product.stock <= 0"
              >
                <ShoppingCart class="btn-icon" />
                立即兑换
              </el-button>
            </div>
          </div>
        </el-card>
      </div>
      <div class="empty-state" v-else>
        <el-empty description="当前分类下暂无商品" />
      </div>
    </div>

    <!-- 商品详情弹窗 -->
    <el-dialog
      v-model="productDialogVisible"
      :title="selectedProduct?.name || '商品详情'"
      width="80%"
      :before-close="() => productDialogVisible = false"
    >
      <div class="product-detail-container" v-if="selectedProduct">
        <div class="product-detail-main">
          <div class="product-detail-image">
            <img :src="selectedProduct.image" :alt="selectedProduct.name" />
          </div>
          <div class="product-detail-info">
            <div class="detail-category">
              <el-tag size="large">{{ selectedProduct.category }}</el-tag>
            </div>
            <h2 class="detail-name">{{ selectedProduct.name }}</h2>
            <div class="detail-description">{{ selectedProduct.description }}</div>
            <div class="detail-price-section">
              <div class="detail-score-price">
                <Coin class="detail-coin-icon" />
                <span class="score-value">{{ selectedProduct.score }}</span>
                <span class="score-unit">积分</span>
              </div>
              <div class="detail-original-price">原价：¥{{ selectedProduct.originalPrice }}</div>
            </div>
            <div class="detail-stock">
              <span class="stock-label">库存：</span>
              <span class="stock-value" :class="{ 'low-stock': selectedProduct.stock <= 10 }">
                {{ selectedProduct.stock }}
              </span>
            </div>
            <div class="detail-status">
              <span class="status-label">状态：</span>
              <el-tag :type="selectedProduct.status === '上架' ? 'success' : 'danger'">
                {{ selectedProduct.status }}
              </el-tag>
            </div>
          </div>
        </div>
        <div class="product-detail-footer">
          <div class="user-score-info">
            <span class="score-tip">您当前有</span>
            <span class="user-score">{{ scoreInfo.currentScore }}</span>
            <span class="score-tip">积分，</span>
            <span v-if="scoreInfo.currentScore >= selectedProduct.score" class="enough-score">
              积分充足，可以兑换
            </span>
            <span v-else class="not-enough-score">
              积分不足，无法兑换
            </span>
          </div>
          <el-button 
            type="primary" 
            size="large" 
            @click="exchangeProduct(selectedProduct)" 
            :disabled="scoreInfo.currentScore < selectedProduct.score || selectedProduct.stock <= 0"
            class="detail-exchange-btn"
          >
            <ShoppingCart class="btn-icon" />
            立即兑换
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.score-mall-page {
  padding: 0;
  background-color: $bg-primary;
  min-height: 100vh;
}

.page-header {
  margin-bottom: $spacing-lg;
  padding: $spacing-lg $spacing-md 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
}

.page-title {
  font-size: $font-size-xl;
  font-weight: $font-weight-semibold;
  color: $primary-color;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: $spacing-sm;
}

.header-action-btn {
  display: flex;
  align-items: center;
  font-size: $font-size-sm;
  color: $primary-color;
}

.header-action-btn:hover {
  color: $primary-hover-color;
}

.header-action-btn .el-icon {
  margin-right: 4px;
}

/* 积分信息卡片 */
.score-info-card {
  margin: 0 $spacing-md $spacing-lg;
  box-shadow: $shadow-sm;
  border-radius: $border-radius-lg;
  overflow: hidden;
}

.score-info-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-lg;
}

.score-main-info {
  display: flex;
  flex-direction: column;
}

.score-label {
  font-size: $font-size-sm;
  color: $text-secondary;
  margin-bottom: $spacing-xs;
}

.score-value {
  font-size: 28px;
  font-weight: $font-weight-bold;
  color: $secondary-color;
  display: flex;
  align-items: center;
}

.coin-icon {
  margin-right: 6px;
  font-size: 20px;
}

.score-actions {
  display: flex;
  gap: $spacing-sm;
}

.detail-btn {
  display: flex;
  align-items: center;
  background-color: $primary-color;
  border-color: $primary-color;
  color: white;
}

.detail-btn:hover {
  background-color: $primary-hover-color;
  border-color: $primary-hover-color;
}

/* 分类标签 */
.category-tabs {
  margin: 0 $spacing-md $spacing-lg;
}

.category-tab {
  background-color: transparent;
  border-bottom: 1px solid $border-color;
}

:deep(.el-tabs__nav) {
  margin-bottom: 0;
}

:deep(.el-tabs__item) {
  color: $text-secondary;
  font-size: $font-size-sm;
}

:deep(.el-tabs__item.is-active) {
  color: $primary-color;
  font-weight: $font-weight-medium;
}

:deep(.el-tabs__active-bar) {
  background-color: $primary-color;
}

/* 商品列表容器 */
.product-list-container {
  margin: 0 $spacing-md $spacing-lg;
}

/* 商品列表 */
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: $spacing-md;
  padding: 0 $spacing-xs;
}

/* 商品卡片 */
.product-card {
  border-radius: $border-radius-lg;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: $shadow-sm;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: $shadow-md;
}

.product-image {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $spacing-lg 0;
  background-color: $bg-secondary;
}

.product-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: $border-radius-md;
}

.product-info {
  padding: $spacing-md;
}

.product-category {
  font-size: $font-size-xs;
  color: $primary-color;
  margin-bottom: $spacing-xs;
  font-weight: $font-weight-medium;
}

.product-name {
  font-size: $font-size-md;
  font-weight: $font-weight-semibold;
  color: $text-primary;
  margin-bottom: $spacing-xs;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-description {
  font-size: $font-size-xs;
  color: $text-secondary;
  margin-bottom: $spacing-md;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: $spacing-sm;
}

.score-price {
  display: flex;
  align-items: center;
  font-size: $font-size-md;
  font-weight: $font-weight-medium;
  color: $primary-color;
}

.price-coin-icon {
  margin-right: 6px;
  font-size: $font-size-sm;
}

.original-price {
  font-size: $font-size-xs;
  color: $text-tertiary;
  text-decoration: line-through;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: $spacing-sm;
}

.product-stock {
  font-size: $font-size-xs;
  color: $text-secondary;
}

.product-stock.low-stock {
  color: $error-color;
  font-weight: $font-weight-medium;
}

.exchange-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 36px;
  background-color: $primary-color;
  border-color: $primary-color;
  color: white;
  font-weight: $font-weight-medium;
}

.exchange-btn:hover {
  background-color: $primary-hover-color;
  border-color: $primary-hover-color;
}

.exchange-btn:disabled {
  background-color: $bg-tertiary;
  border-color: $border-color;
  color: $text-tertiary;
  cursor: not-allowed;
}

.btn-icon {
  margin-right: 6px;
  font-size: $font-size-sm;
}

/* 空状态 */
.empty-state {
  padding: $spacing-xl;
  text-align: center;
  color: $text-tertiary;
}

/* 商品详情弹窗样式 */
.product-detail-container {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.product-detail-main {
  display: flex;
  gap: $spacing-lg;
}

.product-detail-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-detail-image img {
  max-width: 100%;
  height: auto;
  border-radius: $border-radius-md;
  box-shadow: $shadow-md;
}

.product-detail-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.detail-category {
  font-size: $font-size-sm;
  color: $primary-color;
  font-weight: $font-weight-medium;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-name {
  font-size: $font-size-xl;
  font-weight: $font-weight-semibold;
  color: $text-primary;
  line-height: 1.3;
}

.detail-description {
  font-size: $font-size-md;
  color: $text-secondary;
  line-height: 1.5;
}

.detail-price-section {
  margin: $spacing-md 0;
}

.detail-score-price {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  font-size: $font-size-xxl;
  font-weight: $font-weight-bold;
  color: $primary-color;
  margin-bottom: $spacing-sm;
}

.detail-coin-icon {
  font-size: 32px;
}

.detail-original-price {
  font-size: $font-size-md;
  color: $text-tertiary;
  text-decoration: line-through;
}

.detail-stock {
  font-size: $font-size-sm;
  color: $text-secondary;
  margin-bottom: $spacing-md;
}

.stock-value.low-stock {
  color: $error-color;
  font-weight: $font-weight-medium;
}

.detail-status {
  font-size: $font-size-sm;
}

.product-detail-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $spacing-lg;
  background-color: $bg-secondary;
  border-radius: $border-radius-md;
  margin-top: $spacing-lg;
}

.user-score-info {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
}

.score-tip {
  font-size: $font-size-sm;
  color: $text-secondary;
}

.user-score {
  font-size: $font-size-lg;
  font-weight: $font-weight-medium;
  color: $primary-color;
}

.enough-score {
  color: $success-color;
  font-weight: $font-weight-medium;
}

.not-enough-score {
  color: $error-color;
  font-weight: $font-weight-medium;
}

.detail-exchange-btn {
  min-width: 160px;
  height: 48px;
  font-size: $font-size-md;
  font-weight: $font-weight-medium;
  background-color: $primary-color;
  border-color: $primary-color;
  color: white;
}

.detail-exchange-btn:hover {
  background-color: $primary-hover-color;
  border-color: $primary-hover-color;
}

.detail-exchange-btn:disabled {
  background-color: $bg-tertiary;
  border-color: $border-color;
  color: $text-tertiary;
  cursor: not-allowed;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .product-list {
    grid-template-columns: 1fr;
    gap: $spacing-md;
  }
  
  .product-detail-main {
    flex-direction: column;
  }
  
  .product-detail-image {
    margin-bottom: $spacing-lg;
  }
  
  .product-detail-footer {
    flex-direction: column;
    gap: $spacing-md;
    align-items: stretch;
  }
  
  .detail-exchange-btn {
    width: 100%;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .product-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1025px) {
  .product-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>