<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { User } from '@element-plus/icons-vue'
// 移除 Lucide 图标依赖，暂时用 emoji 或 element 图标代替，防止报错
// 如果你确认环境里有 lucide，可以保留导入，但下方模板里我改用了更通用的写法

const router = useRouter()

// 轮播图数据
const carouselItems = [
  { 
    id: 1, 
    image: '/images/waterproof-1.png', 
    title: '月星防水 始于1954', 
    subtitle: '70年国企担当 专业坚守',
    link: '/c-mini/trust/background'
  },
  { 
    id: 2, 
    image: '/images/waterproof-2.png', 
    title: '标准化工艺 · 拒绝复漏', 
    subtitle: '9大施工流程，ISO质量认证',
    link: '/c-mini/trust/standard'
  },
  { 
    id: 3, 
    image: '/images/waterproof-3.jpg', 
    title: '万千工程案例 · 见证实力', 
    subtitle: '服务上海2000+小区，真实记录',
    link: '/c-mini/trust/cases'
  }
]

// 当前轮播索引
const currentSlide = ref(0)

// 跳转到指定幻灯片
const goToSlide = (index) => {
  currentSlide.value = index
  const carouselInner = document.querySelector('.carousel-inner')
  if (carouselInner) {
    // 直接设置位置，不中断动画
    carouselInner.style.transform = `translateX(-${index * 33.333}%)`
    // 移除CSS动画，改用JavaScript控制
    carouselInner.style.animation = 'none'
  }
}

// 自动滚动轮播图
const autoSlide = () => {
  const carouselInner = document.querySelector('.carousel-inner')
  if (carouselInner) {
    // 计算下一张幻灯片索引
    currentSlide.value = (currentSlide.value + 1) % carouselItems.length
    // 设置新位置
    carouselInner.style.transform = `translateX(-${currentSlide.value * 33.333}%)`
  }
}

// 组件挂载时启动自动滚动
onMounted(() => {
  // 每3秒自动切换一次幻灯片
  setInterval(autoSlide, 3000)
})

// 核心服务数据
const coreServices = [
  { id: 1, title: '卫生间漏水', icon: '💧' },
  { id: 2, title: '厨房漏水', icon: '🍳' },
  { id: 3, title: '屋顶补漏', icon: '🏠' },
  { id: 4, title: '阳台漏水', icon: '☀️' },
  { id: 5, title: '外墙防水', icon: '🏢' },
  { id: 6, title: '其他修缮', icon: '🔨' }
]

// 客户评价
const customerReviews = [
  { id: 1, name: '张先生', content: '师傅很专业，服务态度好。', rating: 5, project: '卫生间维修' },
  { id: 2, name: '李女士', content: '国企背景果然不一样，推荐！', rating: 5, project: '屋顶补漏' }
]

const goToRepairEstimate = () => router.push('/c-mini/repair-estimate')
const goToAppointment = () => router.push('/c-mini/appointment')
</script>

<template>
  <div class="page-container" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
    
    <div class="header-section" style="background-color: #CC0010; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding-top: 40px; padding-bottom: 80px; position: relative; z-index: 0;">
      <div class="header-content" style="padding: 0 20px;">
        <div class="top-bar" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div class="brand-info" style="display: flex; align-items: center;">
            <img src="/logo.png" class="logo-img" style="width: 40px; height: 40px; border-radius: 50%; background-color: white; padding: 2px; margin-right: 10px; object-fit: contain;" />
            <div class="brand-text">
              <div class="brand-name" style="color: white; font-size: 18px; font-weight: bold;">月星防水</div>
              <div class="brand-slogan" style="color: rgba(255,255,255,0.8); font-size: 12px;">Since 1947</div>
            </div>
          </div>
          <div class="user-icon">
             <el-icon size="24" color="#fff"><User /></el-icon>
          </div>
        </div>
        

      </div>
    </div>

    <div class="banner-container" style="margin-top: -60px; margin-left: 16px; margin-right: 16px; position: relative; z-index: 10; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 16px rgba(0,0,0,0.1);">
      <div class="carousel" style="width: 100%; height: 160px; position: relative; overflow: hidden;">
        <div class="carousel-inner" style="display: flex; transition: transform 0.5s ease; width: 300%; height: 100%;">
          <div 
            v-for="(item, index) in carouselItems" 
            :key="item.id"
            class="carousel-item" 
            @click="router.push(item.link)"
            style="flex: 1 0 33.333%; height: 100%; position: relative; cursor: pointer;"
          >
            <img :src="item.image" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
            <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 20px 16px; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); color: white;">
              <h2 style="font-size: 18px; font-weight: bold; margin: 0 0 4px 0;">{{ item.title }}</h2>
              <p style="font-size: 12px; margin: 0; opacity: 0.9;">{{ item.subtitle }}</p>
            </div>
          </div>
        </div>
        <!-- 指示器 -->
        <div class="carousel-indicators" style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px;">
          <span 
            v-for="(item, index) in carouselItems" 
            :key="item.id"
            :class="['indicator', { active: currentSlide === index }]"
            style="width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s ease;"
            @click="goToSlide(index)"
          ></span>
        </div>
      </div>
    </div>

    <div class="nav-capsule" style="margin-top: 24px; background: white; margin-left: 20px; margin-right: 20px; border-radius: 20px; padding: 20px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 12px rgba(0,0,0,0.1); position: relative; z-index: 10;">
      <div class="nav-item" @click="goToRepairEstimate" style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
        <div class="nav-icon" style="font-size: 24px; margin-bottom: 5px;">💧</div>
        <div class="nav-title text-red" style="font-size: 16px; font-weight: bold; color: #E60012;">漏水维修</div>
        <div class="nav-desc" style="font-size: 12px; color: #999; margin-top: 2px;">上门检测/快速止漏</div>
      </div>
      <div class="divider" style="width: 1px; height: 40px; background-color: #eee; margin: 0 10px;"></div>
      <div class="nav-item" @click="goToAppointment" style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
        <div class="nav-icon" style="font-size: 24px; margin-bottom: 5px;">🏠</div>
        <div class="nav-title text-gold" style="font-size: 16px; font-weight: bold; color: #F59E0B;">新房防水</div>
        <div class="nav-desc" style="font-size: 12px; color: #999; margin-top: 2px;">全屋防水/十年质保</div>
      </div>
    </div>

    <div class="section-card" style="margin-top: 15px; background: white; margin-left: 20px; margin-right: 20px; border-radius: 20px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); position: relative; z-index: 10;">
      <h2 class="section-title" style="font-size: 18px; font-weight: bold; color: #333; margin: 0 0 15px 0; border-left: 4px solid #E60012; padding-left: 10px;">核心服务</h2>
      <div class="service-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
        <div v-for="service in coreServices" :key="service.id" class="service-item" style="display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: all 0.3s ease;" @click="goToRepairEstimate" @mouseenter="$event.target.style.transform = 'translateY(-2px)'; $event.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'; $event.target.style.backgroundColor = '#FFF5F5';" @mouseleave="$event.target.style.transform = 'translateY(0)'; $event.target.style.boxShadow = 'none'; $event.target.style.backgroundColor = 'transparent';">
          <div class="service-icon-bg" style="width: 44px; height: 44px; background-color: #FFF0F0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 8px; transition: all 0.3s ease;">{{ service.icon }}</div>
          <span class="service-name" style="font-size: 12px; color: #333;">{{ service.title }}</span>
        </div>
      </div>
    </div>

    <!-- 找师傅和找产品入口 -->
    <div style="margin: 15px 20px 0; display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
      <!-- 找师傅 -->
      <div style="background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 20px; padding: 20px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.1); position: relative; z-index: 10;" 
           @mouseenter="$event.target.style.backgroundColor = '#F3F4F6'; $event.target.style.transform = 'translateY(-2px)'; $event.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.12)';"
           @mouseleave="$event.target.style.backgroundColor = '#F9FAFB'; $event.target.style.transform = 'translateY(0)'; $event.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';"
           @click="router.push('/c-mini/master-list')">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <div style="font-size: 18px; font-weight: bold; color: #374151;">找师傅</div>
          <div style="width: 40px; height: 40px; background: #FEE2E2; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px;">👷</div>
        </div>
        <div style="color: #6B7280; font-size: 13px;">金牌工长，经验丰富</div>
      </div>
      
      <!-- 找产品 -->
      <div style="background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 20px; padding: 20px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.1); position: relative; z-index: 10;" 
           @mouseenter="$event.target.style.backgroundColor = '#F3F4F6'; $event.target.style.transform = 'translateY(-2px)'; $event.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.12)';"
           @mouseleave="$event.target.style.backgroundColor = '#F9FAFB'; $event.target.style.transform = 'translateY(0)'; $event.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';"
           @click="router.push('/c-mini/product-list')">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <div style="font-size: 18px; font-weight: bold; color: #374151;">找产品</div>
          <div style="width: 40px; height: 40px; background: #DBEAFE; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px;">🧱</div>
        </div>
        <div style="color: #6B7280; font-size: 13px;">国标材料，环保安全</div>
      </div>
    </div>



    <div class="section-card" style="margin-top: 15px; background: white; margin-left: 20px; margin-right: 20px; border-radius: 20px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); position: relative; z-index: 10; cursor: pointer; transition: all 0.3s ease;" 
         @click="router.push('/c-mini/customer-review-list')"
         @mouseenter="$event.target.style.backgroundColor = '#F9FAFB'; $event.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.12)'"
         @mouseleave="$event.target.style.backgroundColor = 'white'; $event.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'">
      <h2 class="section-title" style="font-size: 18px; font-weight: bold; color: #333; margin: 0 0 15px 0; border-left: 4px solid #E60012; padding-left: 10px;">客户评价</h2>
      <div class="review-list" style="display: flex; flex-direction: column; gap: 10px;">
        <div v-for="review in customerReviews" :key="review.id" class="review-item" style="border-bottom: 1px solid #f0f0f0; padding-bottom: 10px;">
          <div class="review-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
            <div class="reviewer-name" style="font-weight: bold; font-size: 14px;">{{ review.name }}</div>
            <el-rate v-model="review.rating" disabled size="small" />
          </div>
          <div class="review-content" style="font-size: 13px; color: #666;">{{ review.content }}</div>
        </div>
      </div>
      <div style="text-align: right; margin-top: 10px; font-size: 12px; color: #E60012;">查看更多评价 →</div>
    </div>

  </div>
</template>

<style scoped>
/* 轮播图动画 */
@keyframes carousel-slide {
  0%, 25% {
    transform: translateX(0);
  }
  33%, 58% {
    transform: translateX(-33.333%);
  }
  66%, 91% {
    transform: translateX(-66.666%);
  }
  100% {
    transform: translateX(0);
  }
}

/* 激活指示器样式 */
.carousel-indicators .indicator.active {
  background: white;
  transform: scale(1.2);
}

/* 页面容器 */
.page-container {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding-bottom: 100px;
}
</style>

