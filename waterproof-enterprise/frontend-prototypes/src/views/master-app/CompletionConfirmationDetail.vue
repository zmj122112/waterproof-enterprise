<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'

const route = useRoute()

// 模拟完工确认数据
const completionConfirmation = ref({
  id: 'CC20231015001',
  workOrderId: 'WD20231015001',
  customerName: '企业客户A',
  address: 'XX区XX街道XX小区XX号楼XX单元XX室',
  status: '待确认',
  confirmTime: '',
  createTime: '2023-10-15 18:30:00',
  workContent: '完成卫生间防水施工，包括地面清理、防水材料涂刷、闭水试验等步骤，施工过程顺利，符合质量标准。',
  photos: [
    'https://picsum.photos/400/300?random=4',
    'https://picsum.photos/400/300?random=5',
    'https://picsum.photos/400/300?random=6'
  ]
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
  <div class="completion-confirmation-detail-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
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
          <div class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">完工确认详情</div>
          <div style="width: 60px;"></div> <!-- 占位，保持标题居中 -->
        </div>
      </div>
    </div>

    <!-- 完工确认详情卡片 - 浮动白色卡片 -->
    <div style="margin: -20px 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <!-- 基本信息 -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #f0f0f0;">
        <div style="font-size: 14px; font-weight: 600; color: #111827;">确认编号：{{ completionConfirmation.id }}</div>
        <div :style="completionConfirmation.status === '已确认' ? 'font-size: 12px; color: #10B981; background-color: #D1FAE5; padding: 4px 12px; border-radius: 16px;' : 'font-size: 12px; color: #E60012; background-color: #fef2f2; padding: 4px 12px; border-radius: 16px;'">
          {{ completionConfirmation.status }}
        </div>
      </div>
      
      <div style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="font-size: 16px; font-weight: 500; color: #111827;">{{ completionConfirmation.customerName }}</div>
          <div style="font-size: 13px; color: #6b7280;">{{ completionConfirmation.createTime }}</div>
        </div>
        
        <div style="margin-bottom: 12px;">
          <div style="font-size: 13px; font-weight: 500; color: #111827; margin-bottom: 4px;">关联工单：</div>
          <div style="font-size: 14px; color: #6b7280;">{{ completionConfirmation.workOrderId }}</div>
        </div>
        
        <div style="margin-bottom: 12px;">
          <div style="font-size: 13px; font-weight: 500; color: #111827; margin-bottom: 4px;">施工地址：</div>
          <div style="font-size: 14px; color: #6b7280;">{{ completionConfirmation.address }}</div>
        </div>
        
        <div style="margin-bottom: 12px;">
          <div style="font-size: 13px; font-weight: 500; color: #111827; margin-bottom: 4px;">施工内容：</div>
          <div style="font-size: 14px; color: #6b7280; line-height: 1.6;">{{ completionConfirmation.workContent }}</div>
        </div>
        
        <div style="margin-bottom: 12px;">
          <div style="font-size: 13px; font-weight: 500; color: #111827; margin-bottom: 8px;">完工照片（{{ completionConfirmation.photos.length }}张）：</div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
            <div 
              v-for="(photo, index) in completionConfirmation.photos" 
              :key="index" 
              @click="openPhotoPreview(index)"
              style="width: 100%; aspect-ratio: 1; background-color: #f3f4f6; border-radius: 8px; overflow: hidden; cursor: pointer;"
            >
              <img :src="photo" alt="完工照片" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
          </div>
        </div>
        
        <div v-if="completionConfirmation.confirmTime" style="margin-bottom: 12px;">
          <div style="font-size: 13px; font-weight: 500; color: #111827; margin-bottom: 4px;">确认时间：</div>
          <div style="font-size: 14px; color: #6b7280;">{{ completionConfirmation.confirmTime }}</div>
        </div>
        
        <div style="display: flex; justify-content: flex-end;">
          <div style="font-size: 12px; color: #9ca3af;">创建时间：{{ completionConfirmation.createTime }}</div>
        </div>
      </div>
    </div>

    <!-- 照片预览弹窗 -->
    <el-dialog
      v-model="showPhotoPreview"
      title="完工照片预览"
      width="90%"
      :before-close="() => showPhotoPreview = false"
      style="border-radius: 16px;"
    >
      <div style="display: flex; justify-content: center; align-items: center; padding: 16px 0;">
        <img 
          :src="completionConfirmation.photos[currentPhotoIndex]" 
          alt="完工照片" 
          style="max-width: 100%; max-height: 400px; object-fit: contain; border-radius: 8px;" 
        />
      </div>
      <template #footer>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 14px; color: #6b7280;">
            {{ currentPhotoIndex + 1 }} / {{ completionConfirmation.photos.length }}
          </div>
          <div style="display: flex; gap: 12px;">
            <el-button @click="showPhotoPreview = false">关闭</el-button>
            <el-button type="primary" @click="
              currentPhotoIndex.value = (currentPhotoIndex.value + 1) % completionConfirmation.photos.length
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
/* 空样式标签，确保Vue SFC格式正确 */
</style>