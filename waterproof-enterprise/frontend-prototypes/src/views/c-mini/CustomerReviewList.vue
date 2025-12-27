<script setup>
// 客户评价列表页面
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Search, Star } from '@element-plus/icons-vue'

const router = useRouter()

// 客户评价数据
const customerReviews = ref([
  {
    id: 1, 
    name: '张先生', 
    avatar: '张', 
    content: '师傅很专业，服务态度好，维修后没有再出现漏水问题，非常满意！', 
    rating: 5, 
    project: '卫生间维修', 
    date: '2025-12-20',
    tags: ['专业', '态度好', '效果佳']
  },
  {
    id: 2, 
    name: '李女士', 
    avatar: '李', 
    content: '国企背景果然不一样，服务规范，价格透明，维修质量高，推荐！', 
    rating: 5, 
    project: '屋顶补漏', 
    date: '2025-12-18',
    tags: ['规范', '透明', '推荐']
  },
  {
    id: 3, 
    name: '王先生', 
    avatar: '王', 
    content: '师傅上门很及时，检测仔细，维修工艺精湛，解决了困扰我多年的漏水问题。', 
    rating: 5, 
    project: '阳台防水', 
    date: '2025-12-15',
    tags: ['及时', '仔细', '精湛']
  },
  {
    id: 4, 
    name: '赵女士', 
    avatar: '赵', 
    content: '服务很好，价格合理，维修后效果不错，值得信赖。', 
    rating: 4, 
    project: '厨房漏水', 
    date: '2025-12-10',
    tags: ['服务好', '价格合理', '信赖']
  },
  {
    id: 5, 
    name: '刘先生', 
    avatar: '刘', 
    content: '师傅技术专业，工作认真负责，维修后还主动清理现场，非常贴心。', 
    rating: 5, 
    project: '外墙防水', 
    date: '2025-12-05',
    tags: ['专业', '认真', '贴心']
  }
])

// 搜索关键词
const searchKeyword = ref('')

// 过滤后的评价
const filteredReviews = ref([...customerReviews.value])

// 返回首页
const goBack = () => {
  router.push('/c-mini/home')
}

// 跳转到评价详情
const goToReviewDetail = (reviewId) => {
  router.push('/c-mini/customer-review-detail/' + reviewId)
}

// 搜索评价
const searchReviews = () => {
  console.log('搜索评价:', searchKeyword.value)
  // 这里可以添加搜索逻辑
  if (searchKeyword.value) {
    filteredReviews.value = customerReviews.value.filter(review => 
      review.content.includes(searchKeyword.value) || 
      review.name.includes(searchKeyword.value) ||
      review.project.includes(searchKeyword.value)
    )
  } else {
    filteredReviews.value = [...customerReviews.value]
  }
}

onMounted(() => {
  console.log('客户评价列表页面加载')
})
</script>

<template>
  <div class="customer-review-list-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
    <!-- 页面标题栏 -->
    <div style="background-color: #CC0010; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding: 20px 20px 30px; text-align: center; position: relative;">
      <a href="/c-mini/home" style="position: absolute; left: 10px; top: 10px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; cursor: pointer; z-index: 99999; background: rgba(255,255,255,0.1); border-radius: 50%; text-decoration: none;">
        <el-icon><ArrowLeft /></el-icon>
      </a>
      <div style="color: white; font-size: 20px; font-weight: 700; margin: 0;">客户评价</div>
    </div>

    <!-- 搜索栏 -->
    <div style="padding: 16px;">
      <div style="background: white; border: 1px solid #E5E7EB; border-radius: 20px; padding: 8px 16px; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <el-icon style="color: #6b7280;"><Search /></el-icon>
        <input 
          v-model="searchKeyword" 
          type="text" 
          placeholder="搜索客户评价" 
          style="flex: 1; border: none; outline: none; font-size: 14px; color: #111827;"
          @keyup.enter="searchReviews"
        >
        <button 
          @click="searchReviews" 
          style="background: #CC0010; color: white; border: none; padding: 6px 16px; border-radius: 12px; font-size: 14px; font-weight: 500; cursor: pointer;"
        >
          搜索
        </button>
      </div>
    </div>

    <!-- 评价统计 -->
    <div style="padding: 0 16px 16px;">
      <div style="background: white; border: 1px solid #E5E7EB; border-radius: 20px; padding: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center; gap: 16px;">
          <div>
            <div style="font-size: 32px; font-weight: bold; color: #CC0010;">4.9</div>
            <div style="display: flex; align-items: center; gap: 4px; margin-top: 4px;">
              <el-rate :model-value="5" disabled size="small" show-score score-template="{value}" />
            </div>
          </div>
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <div style="font-size: 14px; color: #6b7280;">5星</div>
              <div style="font-size: 14px; color: #111827;">80%</div>
            </div>
            <div style="height: 8px; background: #f3f4f6; border-radius: 4px; overflow: hidden;">
              <div style="height: 100%; width: 80%; background: #CC0010; border-radius: 4px;"></div>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin: 6px 0;">
              <div style="font-size: 14px; color: #6b7280;">4星</div>
              <div style="font-size: 14px; color: #111827;">20%</div>
            </div>
            <div style="height: 8px; background: #f3f4f6; border-radius: 4px; overflow: hidden;">
              <div style="height: 100%; width: 20%; background: #F59E0B; border-radius: 4px;"></div>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 6px;">
              <div style="font-size: 14px; color: #6b7280;">3星及以下</div>
              <div style="font-size: 14px; color: #111827;">0%</div>
            </div>
            <div style="height: 8px; background: #f3f4f6; border-radius: 4px; overflow: hidden;">
              <div style="height: 100%; width: 0%; background: #10B981; border-radius: 4px;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 客户评价列表 -->
    <div style="padding: 0 16px;">
      <div style="font-size: 14px; color: #6b7280; margin-bottom: 12px;">共 {{ filteredReviews.length }} 条客户评价</div>
      
      <!-- 评价列表项 -->
      <div style="display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 16px;">
        <div 
          v-for="review in filteredReviews" 
          :key="review.id" 
          @click="goToReviewDetail(review.id)"
          style="background: white; border: 1px solid #E5E7EB; border-radius: 20px; padding: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); cursor: pointer; transition: all 0.3s ease;"
          @mouseenter="$event.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)'"
          @mouseleave="$event.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'"
        >
          <!-- 评价头部 -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 40px; height: 40px; background: #CC0010; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; font-weight: bold;">{{ review.avatar }}</div>
              <div>
                <div style="font-weight: bold; font-size: 14px;">{{ review.name }}</div>
                <div style="font-size: 12px; color: #6b7280;">{{ review.project }} | {{ review.date }}</div>
              </div>
            </div>
            <el-rate :model-value="review.rating" disabled size="small" show-score score-template="{value}" />
          </div>
          
          <!-- 评价标签 -->
          <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;">
            <div v-for="(tag, index) in review.tags" :key="index" style="background: #FFF0F0; color: #CC0010; font-size: 12px; padding: 2px 8px; border-radius: 12px;">{{ tag }}</div>
          </div>
          
          <!-- 评价内容 -->
          <div style="font-size: 14px; color: #6b7280; line-height: 1.6; margin-bottom: 12px;">{{ review.content }}</div>
          
          <!-- 评价底部 -->
          <div style="display: flex; justify-content: flex-end;">
            <div style="font-size: 12px; color: #9ca3af;">查看详情 →</div>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-if="filteredReviews.length === 0" style="background: white; border-radius: 20px; padding: 40px 20px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="font-size: 48px; margin-bottom: 16px;">💬</div>
        <div style="font-size: 16px; color: #6b7280; margin-bottom: 8px;">暂无客户评价</div>
        <div style="font-size: 14px; color: #9ca3af;">请尝试其他搜索条件</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.customer-review-list-page {
  padding-bottom: 100px;
}
</style>