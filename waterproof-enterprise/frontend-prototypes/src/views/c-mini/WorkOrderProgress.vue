<script setup>
import { ref } from 'vue'
import { ArrowDown, ArrowRight, Check, Loading, InfoFilled, Search, User, House, List, Calendar, Tools } from '@element-plus/icons-vue'

// 工单列表数据
const workOrders = ref([
  {
    id: 'WD20231015001',
    status: '待分配',
    type: '上门检测',
    createTime: '2023-10-15',
    progress: [
      { step: 1, title: '提交报修', status: 'completed', time: '2023-10-15 10:30' },
      { step: 2, title: '师傅分配', status: 'pending', time: '' },
      { step: 3, title: '上门检测', status: 'pending', time: '' },
      { step: 4, title: '施工维修', status: 'pending', time: '' },
      { step: 5, title: '完工验收', status: 'pending', time: '' }
    ]
  },
  {
    id: 'WD20231010001',
    status: '施工中',
    type: '直接施工',
    createTime: '2023-10-10',
    progress: [
      { step: 1, title: '提交报修', status: 'completed', time: '2023-10-10 14:20' },
      { step: 2, title: '师傅分配', status: 'completed', time: '2023-10-10 15:00' },
      { step: 3, title: '上门检测', status: 'completed', time: '2023-10-11 09:30' },
      { step: 4, title: '施工维修', status: 'processing', time: '2023-10-12 10:00' },
      { step: 5, title: '完工验收', status: 'pending', time: '' }
    ]
  },
  {
    id: 'WD20230925001',
    status: '已完成',
    type: '屋顶补漏',
    createTime: '2023-09-25',
    progress: [
      { step: 1, title: '提交报修', status: 'completed', time: '2023-09-25 16:45' },
      { step: 2, title: '师傅分配', status: 'completed', time: '2023-09-26 08:30' },
      { step: 3, title: '上门检测', status: 'completed', time: '2023-09-27 14:00' },
      { step: 4, title: '施工维修', status: 'completed', time: '2023-09-28 11:00' },
      { step: 5, title: '完工验收', status: 'completed', time: '2023-09-29 15:30' }
    ]
  }
])

// 展开的工单ID
const expandedWorkOrderId = ref(null)

// 切换工单展开状态
const toggleWorkOrder = (workOrderId) => {
  if (expandedWorkOrderId.value === workOrderId) {
    expandedWorkOrderId.value = null
  } else {
    expandedWorkOrderId.value = workOrderId
  }
}
</script>

<template>
  <div class="work-order-progress-page" style="background-color: #f3f4f6; min-height: 100vh;">
    <!-- 红色底部舞台 Header -->
    <div style="background-color: #CC0010; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding: 40px 20px 20px; text-align: center;">
      <div style="color: white; font-size: 20px; font-weight: 700; margin: 0;">工单进度</div>
    </div>

    <div style="padding: 20px;">
      <div 
        v-for="workOrder in workOrders" 
        :key="workOrder.id" 
        style="background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; margin-bottom: 20px; transition: all 0.3s ease;"
      >
        <div @click="toggleWorkOrder(workOrder.id)" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;">
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="font-size: 14px; font-weight: 600; color: #111827;">工单编号：{{ workOrder.id }}</div>
            <div style="font-size: 12px; color: #6b7280;">{{ workOrder.type }}</div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <el-tag 
              :type="workOrder.status === '待分配' ? 'warning' : 
                     workOrder.status === '施工中' ? 'danger' : 
                     workOrder.status === '已完成' ? 'success' : 'info'"
            >
              {{ workOrder.status }}
            </el-tag>
            <el-icon :style="{ 
              transform: expandedWorkOrderId === workOrder.id ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.3s ease'
            }">
              <ArrowDown />
            </el-icon>
          </div>
        </div>
        
        <!-- 工单进度详情 -->
        <transition name="fade">
          <div v-if="expandedWorkOrderId === workOrder.id" style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
            <el-timeline>
              <el-timeline-item 
                v-for="(item, index) in workOrder.progress" 
                :key="item.step"
                :timestamp="item.time"
                :type="item.status === 'completed' ? 'success' : 
                       item.status === 'processing' ? 'primary' : 'info'"
                :icon="item.status === 'completed' ? Check : 
                       item.status === 'processing' ? Loading : InfoFilled"
              >
                {{ item.title }}
              </el-timeline-item>
            </el-timeline>
            
            <div style="display: flex; justify-content: flex-end; margin-top: 16px;">
              <el-button type="primary" round size="small" @click="$router.push('/c-mini/work-order-detail/' + workOrder.id)">
                查看详情
              </el-button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.work-order-progress-page {
  padding-bottom: 80px; /* 为底部导航栏留出空间 */
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>