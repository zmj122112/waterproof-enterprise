<script setup>
// 工程案例列表页面
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Search } from '@element-plus/icons-vue'

const router = useRouter()

// 工程案例数据
const projectCases = ref([
  { id: 1, title: '某小区屋顶补漏工程', description: '解决了小区20栋楼的屋顶漏水问题', image: '/images/waterproof-1.jpg', category: '屋顶补漏', date: '2025-12-01' },
  { id: 2, title: '某酒店卫生间防水改造', description: '全面改造酒店100间客房的卫生间防水', image: '/images/waterproof-2.jpg', category: '卫生间漏水', date: '2025-11-20' },
  { id: 3, title: '某商业综合体外墙防水工程', description: '为大型商业综合体提供外墙防水解决方案', image: '/images/waterproof-1.jpg', category: '外墙防水', date: '2025-11-10' },
  { id: 4, title: '某别墅地下室防水处理', description: '解决别墅地下室潮湿漏水问题', image: '/images/waterproof-2.jpg', category: '地下室防水', date: '2025-10-25' },
  { id: 5, title: '某学校厨房防水翻新', description: '为学校食堂厨房进行防水翻新工程', image: '/images/waterproof-1.jpg', category: '厨房漏水', date: '2025-10-15' },
  { id: 6, title: '某写字楼阳台防水维修', description: '维修写字楼多个阳台的防水问题', image: '/images/waterproof-2.jpg', category: '阳台漏水', date: '2025-10-05' }
])

// 搜索关键词
const searchKeyword = ref('')

// 返回首页
const goBack = () => {
  router.push('/c-mini/home')
}

// 跳转到案例详情
const goToCaseDetail = (caseId) => {
  router.push('/c-mini/project-case-detail/' + caseId)
}

// 搜索案例
const searchCases = () => {
  console.log('搜索案例:', searchKeyword.value)
  // 这里可以添加搜索逻辑
}

onMounted(() => {
  console.log('工程案例列表页面加载')
})
</script>

<template>
  <div class="project-case-list-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
    <!-- 页面标题栏 -->
    <div style="background-color: #E60012; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding: 20px 20px 30px; text-align: center; position: relative;">
      <a href="/c-mini/home" style="position: absolute; left: 10px; top: 10px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; cursor: pointer; z-index: 99999; background: rgba(255,255,255,0.1); border-radius: 50%; text-decoration: none;">
        <el-icon><ArrowLeft /></el-icon>
      </a>
      <div style="color: white; font-size: 20px; font-weight: 700; margin: 0;">工程案例</div>
    </div>

    <!-- 搜索栏 -->
    <div style="padding: 16px;">
      <div style="background: white; border: 1px solid #E5E7EB; border-radius: 20px; padding: 8px 16px; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <el-icon style="color: #6b7280;"><Search /></el-icon>
        <input 
          v-model="searchKeyword" 
          type="text" 
          placeholder="搜索工程案例" 
          style="flex: 1; border: none; outline: none; font-size: 14px; color: #111827;"
          @keyup.enter="searchCases"
        >
        <button 
          @click="searchCases" 
          style="background: #E60012; color: white; border: none; padding: 6px 16px; border-radius: 12px; font-size: 14px; font-weight: 500; cursor: pointer;"
        >
          搜索
        </button>
      </div>
    </div>

    <!-- 工程案例列表 -->
    <div style="padding: 0 16px;">
      <div style="font-size: 14px; color: #6b7280; margin-bottom: 12px;">共 {{ projectCases.length }} 个工程案例</div>
      
      <!-- 案例列表项 -->
      <div style="display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 16px;">
        <div 
          v-for="caseItem in projectCases" 
          :key="caseItem.id" 
          @click="goToCaseDetail(caseItem.id)"
          style="background: white; border: 1px solid #E5E7EB; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); cursor: pointer; transition: all 0.3s ease;"
          @mouseenter="$event.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)'"
          @mouseleave="$event.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'"
        >
          <!-- 案例图片 -->
          <div style="width: 100%; height: 160px; overflow: hidden;">
            <img :src="caseItem.image" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;"
                 @mouseenter="$event.target.style.transform = 'scale(1.05)'"
                 @mouseleave="$event.target.style.transform = 'scale(1)'">
          </div>
          
          <!-- 案例信息 -->
          <div style="padding: 16px;">
            <!-- 分类和日期 -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div style="font-size: 12px; color: #E60012; background: #FFF0F0; padding: 2px 8px; border-radius: 12px; display: inline-block;">
                {{ caseItem.category }}
              </div>
              <div style="font-size: 12px; color: #9ca3af;">{{ caseItem.date }}</div>
            </div>
            
            <!-- 案例标题 -->
            <div style="font-size: 16px; font-weight: bold; color: #111827; margin-bottom: 8px;">
              {{ caseItem.title }}
            </div>
            
            <!-- 案例描述 -->
            <div style="font-size: 14px; color: #6b7280; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              {{ caseItem.description }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-if="projectCases.length === 0" style="background: white; border-radius: 20px; padding: 40px 20px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="font-size: 48px; margin-bottom: 16px;">🏗️</div>
        <div style="font-size: 16px; color: #6b7280; margin-bottom: 8px;">暂无工程案例</div>
        <div style="font-size: 14px; color: #9ca3af;">请尝试其他搜索条件</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-case-list-page {
  padding-bottom: 100px;
}
</style>