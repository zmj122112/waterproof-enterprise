<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'

const route = useRoute()

// 模拟施工记录数据
const constructionRecord = ref({
  id: 'CR20231015001',
  workOrderId: 'WD20231015001',
  date: '2023-10-15',
  content: '完成卫生间防水施工，包括地面清理、防水材料涂刷、闭水试验等步骤，施工过程顺利，符合质量标准。',
  status: '已提交',
  photos: [
    'https://picsum.photos/400/300?random=1',
    'https://picsum.photos/400/300?random=2',
    'https://picsum.photos/400/300?random=3'
  ],
  createdTime: '2023-10-15 18:30:00',
  customerName: '企业客户A',
  address: 'XX区XX街道XX小区XX号楼XX单元XX室'
})

// 当前选中的照片索引
const currentPhotoIndex = ref(0)

// 查看照片预览
const showPhotoPreview = ref(false)

// 打开照片预览
const openPhotoPreview = (index) => {
  currentPhotoIndex.value = index
  showPhotoPreview.value = true
}

// 返回上一页
const goBack = () => {
  window.history.back()
}
</script>

<template>
  <div class="construction-record-detail-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
    <!-- 红色顶部区域 -->
    <div class="header-section" style="background-color: #E60012; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding-top: 40px; padding-bottom: 30px; position: relative; z-index: 0;">
      <div class="header-content" style="padding: 0 20px;">
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
          <img src="/logo.png" class="logo-img" style="width: 40px; height: 40px; border-radius: 50%; background-color: white; padding: 2px; margin-right: 10px; object-fit: contain;" />
          <div class="brand-text">
            <div class="brand-name" style="color: white; font-size: 18px; font-weight: bold;">月星防水</div>
            <div class="brand-slogan" style="color: rgba(255,255,255,0.8); font-size: 12px;">Since 1947</div>
          </div>
        </div>
        
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <button @click="goBack" style="background: transparent; border: none; color: white; display: flex; align-items: center; cursor: pointer;">
            <ArrowLeft style="margin-right: 8px;" />
            <span style="font-size: 16px;">返回</span>
          </button>
          <div class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">施工记录详情</div>
          <div style="width: 60px;"></div> <!-- 占位，保持标题居中 -->
        </div>
      </div>
    </div>

    <!-- 施工记录详情卡片 - 浮动白色卡片 -->
    <div style="margin: -20px 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <!-- 基本信息 -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #f0f0f0;">
        <div style="font-size: 14px; font-weight: 600; color: #111827;">记录编号：{{ constructionRecord.id }}</div>
        <div :style="constructionRecord.status === '已提交' ? 'font-size: 12px; color: #10B981; background-color: #D1FAE5; padding: 4px 12px; border-radius: 16px;' : 'font-size: 12px; color: #E60012; background-color: #fef2f2; padding: 4px 12px; border-radius: 16px;'">
          {{ constructionRecord.status }}
        </div>
      </div>
      
      <div style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="font-size: 16px; font-weight: 500; color: #111827;">{{ constructionRecord.customerName }}</div>
          <div style="font-size: 13px; color: #6b7280;">{{ constructionRecord.date }}</div>
        </div>
        
        <div style="margin-bottom: 12px;">
          <div style="font-size: 13px; font-weight: 500; color: #111827; margin-bottom: 4px;">关联工单：</div>
          <div style="font-size: 14px; color: #6b7280;">{{ constructionRecord.workOrderId }}</div>
        </div>
        
        <div style="margin-bottom: 12px;">
          <div style="font-size: 13px; font-weight: 500; color: #111827; margin-bottom: 4px;">施工地址：</div>
          <div style="font-size: 14px; color: #6b7280;">{{ constructionRecord.address }}</div>
        </div>
        
        <div style="margin-bottom: 12px;">
          <div style="font-size: 13px; font-weight: 500; color: #111827; margin-bottom: 4px;">施工内容：</div>
          <div style="font-size: 14px; color: #6b7280; line-height: 1.6;">{{ constructionRecord.content }}</div>
        </div>
        
        <div style="margin-bottom: 12px;">
          <div style="font-size: 13px; font-weight: 500; color: #111827; margin-bottom: 8px;">施工照片（{{ constructionRecord.photos.length }}张）：</div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
            <div 
              v-for="(photo, index) in constructionRecord.photos" 
              :key="index" 
              @click="openPhotoPreview(index)"
              style="width: 100%; aspect-ratio: 1; background-color: #f3f4f6; border-radius: 8px; overflow: hidden; cursor: pointer;"
            >
              <img :src="photo" alt="施工照片" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: flex-end;">
          <div style="font-size: 12px; color: #9ca3af;">创建时间：{{ constructionRecord.createdTime }}</div>
        </div>
      </div>
      
      <!-- 操作按钮 -->
      <div style="display: flex; gap: 12px;">
        <el-button 
          type="primary" 
          round 
          size="default" 
          style="flex: 1; height: 44px; font-size: 16px; background-color: #E60012; border-color: #E60012;"
        >
          修改记录
        </el-button>
        <el-button 
          type="danger" 
          round 
          size="default" 
          style="flex: 1; height: 44px; font-size: 16px;"
        >
          删除记录
        </el-button>
      </div>
    </div>

    <!-- 照片预览弹窗 -->
    <el-dialog
      v-model="showPhotoPreview"
      title="施工照片预览"
      width="90%"
      :before-close="() => showPhotoPreview = false"
      style="border-radius: 16px;"
    >
      <div style="display: flex; justify-content: center; align-items: center; padding: 16px 0;">
        <img 
          :src="constructionRecord.photos[currentPhotoIndex]" 
          alt="施工照片" 
          style="max-width: 100%; max-height: 400px; object-fit: contain; border-radius: 8px;" 
        />
      </div>
      <template #footer>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 14px; color: #6b7280;">
            {{ currentPhotoIndex + 1 }} / {{ constructionRecord.photos.length }}
          </div>
          <div style="display: flex; gap: 12px;">
            <el-button @click="showPhotoPreview = false">关闭</el-button>
            <el-button type="primary" @click="
              currentPhotoIndex.value = (currentPhotoIndex.value + 1) % constructionRecord.photos.length
            ">
              下一张
            </el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
/* 移除旧样式，使用内联样式替代 */
</style>