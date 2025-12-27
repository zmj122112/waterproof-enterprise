<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

// 工单状态
const tabs = [
  { label: '全部', value: 'all' },
  { label: '待接收', value: 'pending' },
  { label: '已接收', value: 'received' },
  { label: '已完成', value: 'completed' }
]

// 当前选中的标签
const activeTab = ref('all')

// 工单数据
const workOrders = ref([
  {
    id: 'WD20231015001',
    customerName: '企业客户A',
    phone: '13800138000',
    address: 'XX区XX街道XX小区XX号楼XX单元XX室',
    type: '上门检测（免费）',
    status: 'pending',
    date: '2023-10-15',
    time: '09:00-12:00',
    description: '卫生间漏水，持续时间1周，需要上门检测'
  },
  {
    id: 'WD20231016002',
    customerName: '个人客户B',
    phone: '13900139000',
    address: 'XX区XX街道XX小区XX号楼XX单元XX室',
    type: '直接施工（已报价）',
    status: 'received',
    date: '2023-10-16',
    time: '14:00-17:00',
    description: '厨房漏水，需要直接施工维修'
  },
  {
    id: 'WD20231014001',
    customerName: '个人客户C',
    phone: '13700137000',
    address: 'XX区XX街道XX小区XX号楼XX单元XX室',
    type: '上门检测（免费）',
    status: 'completed',
    date: '2023-10-14',
    time: '09:00-12:00',
    description: '阳台漏水，需要上门检测'
  },
  {
    id: 'WD20231013001',
    customerName: '企业客户D',
    phone: '13600136000',
    address: 'XX区XX街道XX小区XX号楼XX单元XX室',
    type: '直接施工（已报价）',
    status: 'completed',
    date: '2023-10-13',
    time: '14:00-17:00',
    description: '卫生间漏水，已完成施工'
  }
])

// 筛选后的工单列表
const filteredWorkOrders = computed(() => {
  if (activeTab.value === 'all') {
    return workOrders.value
  }
  return workOrders.value.filter(order => order.status === activeTab.value)
})

// 查看工单详情
const viewWorkOrderDetail = (order) => {
  ElMessage.info(`查看工单详情：${order.id}`)
}
</script>

<template>
  <div class="my-orders-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
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
        
        <div class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">我的工单</div>
      </div>
    </div>

    <!-- 筛选标签卡片 - 浮动白色卡片 -->
    <div style="margin: -20px 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <!-- 标签页切换 -->
      <el-tabs v-model="activeTab" class="work-order-tabs" type="border-card" style="--el-tabs-nav-height: 40px;">
        <el-tab-pane 
          v-for="tab in tabs" 
          :key="tab.value" 
          :label="tab.label" 
          :name="tab.value"
        >
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 工单列表卡片 - 浮动白色卡片 -->
    <div style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <!-- 工单列表 -->
      <div v-if="filteredWorkOrders.length > 0">
        <div 
          v-for="order in filteredWorkOrders" 
          :key="order.id" 
          style="background-color: white; border: 1px solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 16px; margin-bottom: 16px; transition: all 0.3s ease; cursor: pointer;"
          @click="viewWorkOrderDetail(order)"
        >
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0;">
            <div style="font-size: 14px; font-weight: 600; color: #111827;">工单编号：{{ order.id }}</div>
            <div :style="order.status === 'pending' ? 'font-size: 12px; color: #E60012; background-color: #fef2f2; padding: 4px 12px; border-radius: 16px;' : 
                         order.status === 'received' ? 'font-size: 12px; color: #F59E0B; background-color: #FEF3C7; padding: 4px 12px; border-radius: 16px;' : 
                         'font-size: 12px; color: #10B981; background-color: #D1FAE5; padding: 4px 12px; border-radius: 16px;'">
              {{ order.status === 'pending' ? '待接收' : order.status === 'received' ? '已接收' : '已完成' }}
            </div>
          </div>
          
          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div style="font-size: 16px; font-weight: 500; color: #111827;">{{ order.customerName }}</div>
              <div style="font-size: 13px; color: #6b7280;">{{ order.date }} {{ order.time }}</div>
            </div>
            <div style="font-size: 13px; color: #6b7280; margin-bottom: 8px;">
              <span style="font-weight: 500; color: #111827;">地址：</span>{{ order.address }}
            </div>
            <div style="font-size: 13px; color: #6b7280; margin-bottom: 8px;">
              <span style="font-weight: 500; color: #111827;">类型：</span>{{ order.type }}
            </div>
            <div style="font-size: 13px; color: #6b7280; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              <span style="font-weight: 500; color: #111827;">描述：</span>{{ order.description }}
            </div>
          </div>
          
          <div style="display: flex; justify-content: flex-end;">
            <el-button 
              type="primary" 
              round 
              size="small" 
              style="height: 36px; font-size: 14px;"
              @click.stop="viewWorkOrderDetail(order)"
            >
              查看详情
            </el-button>
          </div>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-else style="text-align: center; padding: 60px 0;">
        <div style="font-size: 16px; color: #9ca3af; margin-bottom: 16px;">当前暂无工单</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 移除旧样式，使用内联样式替代 */
</style>