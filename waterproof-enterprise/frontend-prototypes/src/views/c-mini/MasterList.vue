<script setup>
// 师傅列表页面
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Search } from '@element-plus/icons-vue'

const router = useRouter()

// 师傅列表数据
const masters = ref([
  {
    id: 1,
    name: '张建国',
    avatar: 'https://via.placeholder.com/100/FF0000/FFFFFF?text=张建国',
    jobNumber: 'YX20250001',
    title: '金牌工长',
    rating: 4.9,
    experience: '15年',
    serviceCount: 1280,
    region: '上海市·浦东新区',
    certifications: ['实名认证', '金牌工长', '持证上岗', '国企背景', '擅长疑难杂症']
  },
  {
    id: 2,
    name: '李强',
    avatar: 'https://via.placeholder.com/100/FF0000/FFFFFF?text=李强',
    jobNumber: 'YX20250002',
    title: '高级技师',
    rating: 4.8,
    experience: '8年',
    serviceCount: 860,
    region: '上海市·浦东新区',
    certifications: ['实名认证', '高级技师', '持证上岗', '国企背景']
  },
  {
    id: 3,
    name: '王磊',
    avatar: 'https://via.placeholder.com/100/FF0000/FFFFFF?text=王磊',
    jobNumber: 'YX20250003',
    title: '资深师傅',
    rating: 4.7,
    experience: '10年',
    serviceCount: 980,
    region: '上海市·浦东新区',
    certifications: ['实名认证', '资深师傅', '持证上岗', '国企背景']
  }
])

// 搜索关键词
const searchKeyword = ref('')

// 返回首页
const goBack = () => {
  router.push('/c-mini/home')
}

// 跳转到师傅详情
const goToMasterDetail = (masterId) => {
  console.log('跳转到师傅详情，ID:', masterId)
  router.push('/c-mini/master-detail/' + masterId)
}

// 搜索师傅
const searchMasters = () => {
  console.log('搜索师傅:', searchKeyword.value)
  // 这里可以添加搜索逻辑
}

onMounted(() => {
  console.log('师傅列表页面加载')
})
</script>

<template>
  <div class="master-list-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
    <!-- 页面标题栏 -->
    <div style="background-color: #CC0010; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding: 20px 20px 30px; text-align: center; position: relative;">
      <a href="/c-mini/home" style="position: absolute; left: 10px; top: 10px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; cursor: pointer; z-index: 99999; background: rgba(255,255,255,0.1); border-radius: 50%; text-decoration: none;">
        <el-icon><ArrowLeft /></el-icon>
      </a>
      <div style="color: white; font-size: 20px; font-weight: 700; margin: 0;">找师傅</div>
    </div>

    <!-- 搜索栏 -->
    <div style="padding: 16px;">
      <div style="background: white; border: 1px solid #E5E7EB; border-radius: 20px; padding: 8px 16px; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <el-icon style="color: #6b7280;"><Search /></el-icon>
        <input 
          v-model="searchKeyword" 
          type="text" 
          placeholder="请输入姓名或工号查询" 
          style="flex: 1; border: none; outline: none; font-size: 14px; color: #111827;"
          @keyup.enter="searchMasters"
        >
        <button 
          @click="searchMasters" 
          style="background: #CC0010; color: white; border: none; padding: 6px 16px; border-radius: 12px; font-size: 14px; font-weight: 500; cursor: pointer;"
        >
          搜索
        </button>
      </div>
    </div>

    <!-- 师傅列表 -->
    <div style="padding: 0 16px;">
      <div style="font-size: 14px; color: #6b7280; margin-bottom: 12px;">查询结果：({{ masters.length }}条信息)</div>
      
      <!-- 师傅列表项 -->
      <div v-for="master in masters" :key="master.id" 
           style="background: white; border: 1px solid #E5E7EB; border-radius: 20px; padding: 16px; margin-bottom: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); cursor: pointer; transition: all 0.3s ease;" 
           @click="goToMasterDetail(master.id)"
           @mouseenter="$event.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)'"
           @mouseleave="$event.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'">
        <!-- 师傅基本信息 -->
        <div style="display: flex; gap: 16px; margin-bottom: 12px;">
          <div style="width: 60px; height: 60px; border-radius: 50%; background: #CC0010; border: 2px solid #CC0010; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;">
            {{ master.name.charAt(0) }}
          </div>
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <div style="font-weight: 500; font-size: 16px; color: #111827;">{{ master.name }}</div>
              <div style="background: #CC0010; color: white; font-size: 12px; padding: 2px 8px; border-radius: 10px;">{{ master.title }}</div>
            </div>
            <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">工号：{{ master.jobNumber }}</div>
            <div style="display: flex; gap: 16px;">
              <div style="font-size: 12px; color: #9ca3af;">所在区域：{{ master.region }}</div>
              <div style="font-size: 12px; color: #9ca3af;">从业年限：{{ master.experience }}</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 4px;">
              <span style="font-size: 14px; color: #CC0010; font-weight: 500;">{{ master.rating }}</span>
              <span style="font-size: 12px; color: #6b7280;">评分</span>
            </div>
          </div>
        </div>
        
        <!-- 认证标签 -->
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          <div v-for="(cert, index) in master.certifications" :key="index" 
               :style="{
                 background: cert === '金牌工长' ? '#FEE2E2' : '#DBEAFE',
                 color: cert === '金牌工长' ? '#CC0010' : '#3B82F6',
                 fontSize: '12px',
                 padding: '2px 8px',
                 borderRadius: '12px',
                 border: '1px solid ' + (cert === '金牌工长' ? '#FECACA' : '#BFDBFE')
               }">
            {{ cert }}
          </div>
          <div style="background: #D1FAE5; color: #059669; font-size: 12px; padding: 2px 8px; border-radius: 12px; border: 1px solid #A7F3D0;">
            月星防水官方认证
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-if="masters.length === 0" style="background: white; border-radius: 20px; padding: 40px 20px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="font-size: 48px; margin-bottom: 16px;">👷</div>
        <div style="font-size: 16px; color: #6b7280; margin-bottom: 8px;">暂无师傅信息</div>
        <div style="font-size: 14px; color: #9ca3af;">请尝试其他搜索条件</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.master-list-page {
  padding-bottom: 100px;
}
</style>