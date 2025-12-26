<script setup>
// 订单列表页面 - 通用模板
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Document } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

// 获取订单类型
const orderType = ref(route.query.type || 'all')

// 订单类型映射
const orderTypeMap = {
  'all': '全部订单',
  'pending-payment': '待付款',
  'pending-visit': '待上门',
  'in-progress': '施工中',
  'pending-review': '待评价'
}

// 订单数据
const orders = ref([
  {
    id: 'WD20231015001',
    status: '待分配',
    type: '上门检测',
    createTime: '2023-10-15',
    amount: '¥200',
    category: '屋顶补漏'
  },
  {
    id: 'WD20231010001',
    status: '施工中',
    type: '直接施工',
    createTime: '2023-10-10',
    amount: '¥800',
    category: '卫生间漏水'
  },
  {
    id: 'WD20230925001',
    status: '已完成',
    type: '屋顶补漏',
    createTime: '2023-09-25',
    amount: '¥1500',
    category: '屋顶补漏'
  }
])

// 返回个人中心
const goBack = () => {
  router.push('/c-mini/user-center')
}

// 跳转到订单详情
const goToOrderDetail = (orderId) => {
  router.push('/c-mini/order-detail/' + orderId)
}

onMounted(() => {
  console.log('订单列表页面加载，类型:', orderType.value)
})
</script>

<template>
  <div class="order-list-page" style="background-color: #f3f4f6; min-height: 100vh;">
    <!-- 红色底部舞台 Header -->
    <div style="background-color: #E60012; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding: 20px 20px 30px; text-align: center; position: relative;">
      <a href="/c-mini/user-center" style="position: absolute; left: 10px; top: 10px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; cursor: pointer; z-index: 99999; background: rgba(255,255,255,0.1); border-radius: 50%; text-decoration: none;">
        <el-icon><ArrowLeft /></el-icon>
      </a>
      <div style="color: white; font-size: 20px; font-weight: 700; margin: 0;">{{ orderTypeMap[orderType] }}</div>
    </div>

    <!-- 订单列表 -->
    <div style="padding: 20px;">
      <div 
        v-for="order in orders" 
        :key="order.id" 
        style="background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; margin-bottom: 20px; transition: all 0.3s ease; cursor: pointer;"
        @click="goToOrderDetail(order.id)"
      >
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="font-size: 16px; font-weight: 600; color: #111827;">订单编号：{{ order.id }}</div>
          </div>
          <el-tag 
            :type="order.status === '待分配' ? 'warning' : 
                   order.status === '施工中' ? 'danger' : 
                   order.status === '已完成' ? 'success' : 'info'"
          >
            {{ order.status }}
          </el-tag>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
          <div>
            <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">服务类型</div>
            <div style="font-size: 14px; font-weight: 500; color: #111827;">{{ order.type }}</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">创建时间</div>
            <div style="font-size: 14px; font-weight: 500; color: #111827;">{{ order.createTime }}</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">服务项目</div>
            <div style="font-size: 14px; font-weight: 500; color: #111827;">{{ order.category }}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">服务金额</div>
            <div style="font-size: 18px; font-weight: bold; color: #E60012;">{{ order.amount }}</div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: flex-end; gap: 8px;">
          <el-button type="info" round size="small">
            查看详情
          </el-button>
          <el-button 
            v-if="order.status === '待分配'" 
            type="primary" 
            round 
            size="small"
          >
            取消订单
          </el-button>
          <el-button 
            v-if="order.status === '已完成'" 
            type="success" 
            round 
            size="small"
          >
            评价
          </el-button>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-if="orders.length === 0" style="background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 40px 20px; text-align: center;">
        <div style="font-size: 48px; margin-bottom: 16px;">📋</div>
        <div style="font-size: 16px; color: #6b7280; margin-bottom: 8px;">暂无订单记录</div>
        <div style="font-size: 14px; color: #9ca3af;">您还没有相关订单</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-list-page {
  padding-bottom: 80px; /* 为底部导航栏留出空间 */
}
</style>