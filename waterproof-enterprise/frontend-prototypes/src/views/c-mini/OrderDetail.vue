<script setup>
// 订单详情页面
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Document, User, Phone, Location } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const orderId = ref(route.params.id || 'WD20231015001')

// 订单详情数据
const orderDetail = ref({
  id: orderId.value,
  status: '待分配',
  type: '上门检测',
  createTime: '2023-10-15',
  amount: '¥200',
  category: '屋顶补漏',
  customerName: '张三',
  customerPhone: '13800138000',
  address: '上海市浦东新区张杨路1000号',
  description: '屋顶漏水，需要上门检测和维修',
  assignedMaster: '',
  masterPhone: '',
  scheduleTime: '',
  progress: [
    { step: 1, title: '提交订单', status: 'completed', time: '2023-10-15 10:30' },
    { step: 2, title: '订单审核', status: 'completed', time: '2023-10-15 10:35' },
    { step: 3, title: '师傅分配', status: 'pending', time: '' },
    { step: 4, title: '上门服务', status: 'pending', time: '' },
    { step: 5, title: '服务完成', status: 'pending', time: '' },
    { step: 6, title: '评价完成', status: 'pending', time: '' }
  ]
})

// 返回订单列表
const goBack = () => {
  router.push('/c-mini/order-list')
}

onMounted(() => {
  console.log('订单详情页面加载，订单ID:', orderId.value)
})
</script>

<template>
  <div class="order-detail-page" style="background-color: #f3f4f6; min-height: 100vh;">
    <!-- 红色底部舞台 Header -->
    <div style="background-color: #E60012; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding: 20px 20px 30px; text-align: center; position: relative;">
      <a href="/c-mini/order-list" style="position: absolute; left: 10px; top: 10px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; cursor: pointer; z-index: 99999; background: rgba(255,255,255,0.1); border-radius: 50%; text-decoration: none;">
        <el-icon><ArrowLeft /></el-icon>
      </a>
      <div style="color: white; font-size: 20px; font-weight: 700; margin: 0;">订单详情</div>
    </div>

    <!-- 订单基本信息 -->
    <div style="padding: 20px;">
      <!-- 订单状态 -->
      <div style="background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; margin-bottom: 20px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 48px; height: 48px; background: #E60012; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;">📋</div>
          <div>
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 4px;">{{ orderDetail.status }}</div>
            <div style="font-size: 14px; color: #6b7280;">订单编号：{{ orderDetail.id }}</div>
          </div>
        </div>
      </div>
      
      <!-- 订单信息 -->
      <div style="background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; margin-bottom: 20px;">
        <div style="font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 16px;">订单信息</div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="font-size: 14px; color: #6b7280;">服务类型</div>
          </div>
          <div style="font-size: 14px; font-weight: 500; color: #111827;">{{ orderDetail.type }}</div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="font-size: 14px; color: #6b7280;">服务项目</div>
          </div>
          <div style="font-size: 14px; font-weight: 500; color: #111827;">{{ orderDetail.category }}</div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="font-size: 14px; color: #6b7280;">创建时间</div>
          </div>
          <div style="font-size: 14px; font-weight: 500; color: #111827;">{{ orderDetail.createTime }}</div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="font-size: 14px; color: #6b7280;">服务金额</div>
          </div>
          <div style="font-size: 20px; font-weight: bold; color: #E60012;">{{ orderDetail.amount }}</div>
        </div>
      </div>
      
      <!-- 客户信息 -->
      <div style="background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; margin-bottom: 20px;">
        <div style="font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 16px;">客户信息</div>
        
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <el-icon color="#6b7280"><User /></el-icon>
          <div style="font-size: 14px; color: #111827;">{{ orderDetail.customerName }}</div>
        </div>
        
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <el-icon color="#6b7280"><Phone /></el-icon>
          <div style="font-size: 14px; color: #111827;">{{ orderDetail.customerPhone }}</div>
        </div>
        
        <div style="display: flex; align-items: flex-start; gap: 12px;">
          <el-icon color="#6b7280" style="margin-top: 2px;"><Location /></el-icon>
          <div style="font-size: 14px; color: #111827; flex: 1;">{{ orderDetail.address }}</div>
        </div>
      </div>
      
      <!-- 订单进度 -->
      <div style="background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px;">
        <div style="font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 16px;">订单进度</div>
        
        <el-timeline>
          <el-timeline-item 
            v-for="(item, index) in orderDetail.progress" 
            :key="item.step"
            :timestamp="item.time"
            :type="item.status === 'completed' ? 'success' : 'info'"
          >
            {{ item.title }}
          </el-timeline-item>
        </el-timeline>
      </div>
      
      <!-- 底部操作按钮 -->
      <div style="margin-top: 20px; display: flex; gap: 12px;">
        <el-button type="info" round style="flex: 1;">
          <Phone style="margin-right: 8px;" />
          联系客服
        </el-button>
        <el-button 
          v-if="orderDetail.status === '待分配'" 
          type="primary" 
          round 
          style="flex: 1;"
        >
          取消订单
        </el-button>
        <el-button 
          v-if="orderDetail.status === '已完成'" 
          type="success" 
          round 
          style="flex: 1;"
        >
          评价订单
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-detail-page {
  padding-bottom: 80px; /* 为底部导航栏留出空间 */
}
</style>