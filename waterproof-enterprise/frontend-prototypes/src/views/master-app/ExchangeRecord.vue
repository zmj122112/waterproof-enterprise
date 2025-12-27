<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 兑换记录数据
const exchangeRecords = ref([
  {
    id: 'ER20231015001',
    productName: '科顺定制外套',
    score: 399,
    date: '2023-10-15',
    status: '已兑换',
    orderId: 'WO20231015001'
  },
  {
    id: 'ER20230928001',
    productName: '防水手套',
    score: 100,
    date: '2023-09-28',
    status: '已兑换',
    orderId: 'WO20230928001'
  },
  {
    id: 'ER20230915001',
    productName: '得力手持激光测距仪',
    score: 299,
    date: '2023-09-15',
    status: '已兑换',
    orderId: 'WO20230915001'
  }
])
</script>

<template>
  <div class="exchange-record-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
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
        
        <div class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">兑换记录</div>
      </div>
    </div>

    <!-- 兑换记录列表 - 浮动白色卡片 -->
    <div style="margin: -20px 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <!-- 记录列表 -->
      <div v-if="exchangeRecords.length > 0">
        <div 
          v-for="record in exchangeRecords" 
          :key="record.id" 
          style="background-color: white; border: 1px solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 16px; margin-bottom: 16px; transition: all 0.3s ease;"
        >
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0;">
            <div style="font-size: 14px; font-weight: 600; color: #111827;">兑换编号：{{ record.id }}</div>
            <div :style="record.status === '已兑换' ? 'font-size: 12px; color: #10B981; background-color: #D1FAE5; padding: 4px 12px; border-radius: 16px;' : 'font-size: 12px; color: #E60012; background-color: #fef2f2; padding: 4px 12px; border-radius: 16px;'">
              {{ record.status }}
            </div>
          </div>
          
          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div style="font-size: 16px; font-weight: 500; color: #111827;">{{ record.productName }}</div>
              <div style="font-size: 14px; color: #E60012; font-weight: 600;">-{{ record.score }} 积分</div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="font-size: 13px; color: #6b7280;">兑换时间：{{ record.date }}</div>
              <div style="font-size: 13px; color: #6b7280;">关联工单：{{ record.orderId }}</div>
            </div>
          </div>
          
          <div style="display: flex; justify-content: flex-end;">
            <el-button 
              type="primary" 
              round 
              size="small" 
              style="height: 36px; font-size: 14px;"
            >
              查看详情
            </el-button>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-else style="text-align: center; padding: 60px 0;">
        <div style="font-size: 16px; color: #9ca3af; margin-bottom: 16px;">暂无兑换记录</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 移除旧样式，使用内联样式替代 */
</style>