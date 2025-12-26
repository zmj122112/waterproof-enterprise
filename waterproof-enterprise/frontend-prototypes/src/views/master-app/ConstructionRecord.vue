<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

// 施工记录列表数据
const constructionRecords = ref([
  {
    id: 'CR20231015001',
    workOrderId: 'WD20231015001',
    date: '2023-10-15',
    content: '完成卫生间防水施工',
    status: '已提交',
    photos: 3
  },
  {
    id: 'CR20231014001',
    workOrderId: 'WD20231014001',
    date: '2023-10-14',
    content: '完成厨房防水检测',
    status: '已提交',
    photos: 2
  }
])

// 新增施工记录
const addConstructionRecord = () => {
  ElMessage.info('新增施工记录功能')
  console.log('新增施工记录')
}

// 查看施工记录详情
const viewConstructionRecord = (record) => {
  ElMessage.info(`查看施工记录：${record.id}`)
  console.log('查看施工记录:', record)
}
</script>

<template>
  <div class="construction-record-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
    <!-- 红色顶部区域 -->
    <div style="background-color: #E60012; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding-top: 40px; padding-bottom: 30px; position: relative; z-index: 0;">
      <div style="padding: 0 20px;">
        <div class="brand-info" style="display: flex; align-items: center; margin-bottom: 16px;">
          <img src="/logo.png" class="logo-img" style="width: 40px; height: 40px; border-radius: 50%; background-color: white; padding: 2px; margin-right: 10px; object-fit: contain;" />
          <div class="brand-text">
            <div class="brand-name" style="color: white; font-size: 18px; font-weight: bold;">月星防水</div>
            <div class="brand-slogan" style="color: rgba(255,255,255,0.8); font-size: 12px;">Since 1947</div>
          </div>
        </div>
        
        <div class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">施工记录</div>
      </div>
    </div>

    <!-- 操作按钮 - 浮动白色卡片 -->
    <div style="margin: -20px 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <el-button type="danger" round size="small" style="width: 100%; height: 44px; font-size: 16px;" @click="addConstructionRecord">
        <el-icon><Plus /></el-icon>
        新增施工记录
      </el-button>
    </div>

    <!-- 施工记录列表 - 浮动白色卡片 -->
    <div style="margin: 0 20px; position: relative; z-index: 10;">
      <div 
        v-for="record in constructionRecords" 
        :key="record.id" 
        style="background-color: white; border: 1px solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 16px; margin-bottom: 16px; transition: all 0.3s ease;"
      >
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0;">
          <div style="font-size: 14px; font-weight: 600; color: #111827;">记录编号：{{ record.id }}</div>
          <el-tag :type="record.status === '已提交' ? 'success' : 'warning'" size="small" style="font-size: 12px; padding: 4px 12px;">
            {{ record.status }}
          </el-tag>
        </div>
        
        <div style="margin-bottom: 16px;">
          <div style="display: flex; flex-wrap: wrap; margin-bottom: 8px;">
            <span style="width: 80px; font-weight: 500; color: #111827; margin-right: 16px;">关联工单：</span>
            <span style="flex: 1; color: #6b7280; line-height: 1.5;">{{ record.workOrderId }}</span>
          </div>
          <div style="display: flex; flex-wrap: wrap; margin-bottom: 8px;">
            <span style="width: 80px; font-weight: 500; color: #111827; margin-right: 16px;">施工日期：</span>
            <span style="flex: 1; color: #6b7280; line-height: 1.5;">{{ record.date }}</span>
          </div>
          <div style="display: flex; flex-wrap: wrap; margin-bottom: 8px;">
            <span style="width: 80px; font-weight: 500; color: #111827; margin-right: 16px;">施工内容：</span>
            <span style="flex: 1; color: #6b7280; line-height: 1.5;">{{ record.content }}</span>
          </div>
          <div style="display: flex; flex-wrap: wrap;">
            <span style="width: 80px; font-weight: 500; color: #111827; margin-right: 16px;">施工照片：</span>
            <el-tag type="info" size="small">{{ record.photos }}张</el-tag>
          </div>
        </div>
        
        <div style="display: flex; justify-content: flex-end;">
          <el-button
            type="primary"
            round
            size="small"
            @click="viewConstructionRecord(record)"
          >
            查看详情
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 空样式标签，确保Vue SFC格式正确 */
</style>