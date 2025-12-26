<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search, User } from '@element-plus/icons-vue'
// 移除 Lucide 图标依赖，暂时用 emoji 或 element 图标代替，防止报错
// 如果你确认环境里有 lucide，可以保留导入，但下方模板里我改用了更通用的写法

const router = useRouter()

// 轮播图数据
const carouselItems = [
  { id: 1, image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80', title: '国企品质' },
  { id: 2, image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&q=80', title: '专业防水' }
]

// 核心服务数据
const coreServices = [
  { id: 1, title: '卫生间漏水', icon: '💧' },
  { id: 2, title: '厨房漏水', icon: '🍳' },
  { id: 3, title: '屋顶补漏', icon: '🏠' },
  { id: 4, title: '阳台漏水', icon: '☀️' },
  { id: 5, title: '外墙防水', icon: '🏢' },
  { id: 6, title: '其他修缮', icon: '🔨' }
]

// 工程案例数据
const projectCases = [
  { id: 1, title: '某小区屋顶补漏工程', description: '解决了小区20栋楼的屋顶漏水问题', image: '/src/assets/images/waterproof-1.jpg', category: '屋顶补漏' },
  { id: 2, title: '某酒店卫生间防水改造', description: '全面改造酒店100间客房的卫生间防水', image: '/src/assets/images/waterproof-2.jpg', category: '卫生间漏水' }
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
    
    <div class="header-section" style="background-color: #E60012; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding-top: 40px; padding-bottom: 100px; position: relative; z-index: 0;">
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
        
        <div class="search-box" style="background-color: rgba(255,255,255,0.2); backdrop-filter: blur(5px); border-radius: 20px; height: 40px; display: flex; align-items: center; padding: 0 15px;">
          <el-icon class="search-icon" style="color: white; margin-right: 8px; font-size: 16px;"><Search /></el-icon>
          <span class="search-placeholder" style="color: rgba(255,255,255,0.9); font-size: 14px;">搜索服务或问题...</span>
        </div>
      </div>
    </div>

    <div class="banner-container" style="margin-top: -60px; margin-left: 16px; margin-right: 16px; position: relative; z-index: 10; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 16px rgba(0,0,0,0.1);">
      <el-carousel trigger="click" height="160px" :interval="4000" arrow="always" style="border-radius: 16px; overflow: hidden;">
        <el-carousel-item v-for="item in carouselItems" :key="item.id">
          <img :src="item.image" class="banner-img" style="width: 100%; height: 160px; object-fit: cover; border-radius: 16px;" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="nav-capsule" style="margin-top: 24px; background: white; margin-left: 20px; margin-right: 20px; border-radius: 20px; padding: 20px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 12px rgba(0,0,0,0.1); position: relative; z-index: 10;">
      <div class="nav-item" @click="goToRepairEstimate" style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
        <div class="nav-icon" style="font-size: 24px; margin-bottom: 5px;">⚡</div>
        <div class="nav-title text-red" style="font-size: 16px; font-weight: bold; color: #E60012;">快速报修</div>
        <div class="nav-desc" style="font-size: 12px; color: #999; margin-top: 2px;">免费上门估价</div>
      </div>
      <div class="divider" style="width: 1px; height: 40px; background-color: #eee; margin: 0 10px;"></div>
      <div class="nav-item" @click="goToAppointment" style="flex: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
        <div class="nav-icon" style="font-size: 24px; margin-bottom: 5px;">📅</div>
        <div class="nav-title text-gold" style="font-size: 16px; font-weight: bold; color: #F59E0B;">预约上门</div>
        <div class="nav-desc" style="font-size: 12px; color: #999; margin-top: 2px;">专业师傅检测</div>
      </div>
    </div>

    <div class="section-card" style="margin-top: 15px; background: white; margin-left: 20px; margin-right: 20px; border-radius: 20px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); position: relative; z-index: 10;">
      <h2 class="section-title" style="font-size: 18px; font-weight: bold; color: #333; margin: 0 0 15px 0; border-left: 4px solid #E60012; padding-left: 10px;">核心服务</h2>
      <div class="service-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
        <div v-for="service in coreServices" :key="service.id" class="service-item" style="display: flex; flex-direction: column; align-items: center; cursor: pointer;">
          <div class="service-icon-bg" style="width: 44px; height: 44px; background-color: #FFF0F0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 8px;">{{ service.icon }}</div>
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
         @click="router.push('/c-mini/project-case-list')"
         @mouseenter="$event.target.style.backgroundColor = '#F9FAFB'; $event.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.12)'"
         @mouseleave="$event.target.style.backgroundColor = 'white'; $event.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'">
      <h2 class="section-title" style="font-size: 18px; font-weight: bold; color: #333; margin: 0 0 15px 0; border-left: 4px solid #E60012; padding-left: 10px;">工程案例</h2>
      <div class="case-list" style="display: flex; flex-direction: column; gap: 15px;">
        <div v-for="caseItem in projectCases" :key="caseItem.id" class="case-item" style="display: flex; background: #f9f9f9; border-radius: 8px; overflow: hidden;">
          <img :src="caseItem.image" class="case-img" style="width: 100px; height: 80px; object-fit: cover;">
          <div class="case-info" style="padding: 10px; flex: 1;">
            <div class="case-tag" style="font-size: 10px; color: #E60012; background: #FFF0F0; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-bottom: 4px;">{{ caseItem.category }}</div>
            <div class="case-title" style="font-size: 14px; font-weight: bold; margin-bottom: 4px;">{{ caseItem.title }}</div>
            <div class="case-desc" style="font-size: 12px; color: #666; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">{{ caseItem.description }}</div>
          </div>
        </div>
      </div>
      <div style="text-align: right; margin-top: 10px; font-size: 12px; color: #E60012;">查看更多案例 →</div>
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
/* 空样式标签，确保Vue SFC格式正确 */
</style>

