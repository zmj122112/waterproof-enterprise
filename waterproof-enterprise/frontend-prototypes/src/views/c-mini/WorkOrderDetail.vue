<script setup>
// 工单详情页面
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Check, Loading, InfoFilled, Phone, Location, Calendar, Clock, User } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const workOrderId = ref(route.params.id || 'WD20231015001')

// 工单详情数据
const workOrderDetail = ref({
  id: workOrderId.value,
  status: '待分配',
  type: '上门检测',
  createTime: '2023-10-15',
  customerName: '张三',
  customerPhone: '13800138000',
  address: '上海市浦东新区张杨路1000号',
  description: '屋顶漏水，需要上门检测和维修',
  estimatedPrice: '¥800-1200',
  assignedMaster: '',
  masterPhone: '',
  progress: [
    { step: 1, title: '提交报修', status: 'completed', time: '2023-10-15 10:30', description: '用户提交了报修申请' },
    { step: 2, title: '师傅分配', status: 'pending', time: '', description: '系统正在分配合适的师傅' },
    { step: 3, title: '上门检测', status: 'pending', time: '', description: '师傅将上门进行检测' },
    { step: 4, title: '施工维修', status: 'pending', time: '', description: '师傅进行施工维修' },
    { step: 5, title: '完工验收', status: 'pending', time: '', description: '用户验收完工' }
  ],
  attachments: []
})

// 返回工单列表
const goBack = () => {
  router.push('/c-mini/work-order-progress')
}

onMounted(() => {
  console.log('工单详情页面加载，工单ID:', workOrderId.value)
})
</script>

<template>
  <div class="work-order-detail-page" style="background-color: #f3f4f6; min-height: 100vh;">
    <!-- 红色底部舞台 Header -->
    <div style="background-color: #CC0010; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding: 20px 20px 30px; text-align: center; position: relative;">
      <a href="/c-mini/work-order-progress" style="position: absolute; left: 10px; top: 10px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; cursor: pointer; z-index: 99999; background: rgba(255,255,255,0.1); border-radius: 50%; text-decoration: none;">
        <el-icon><ArrowLeft /></el-icon>
      </a>
      <div style="color: white; font-size: 20px; font-weight: 700; margin: 0;">工单详情</div>
    </div>

    <!-- 工单基本信息 -->
    <div style="padding: 20px;">
      <div style="background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; margin-bottom: 20px;">
        <div style="font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 16px;">基本信息</div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="font-size: 14px; color: #6b7280;">工单编号</div>
          </div>
          <div style="font-size: 14px; font-weight: 500; color: #111827;">{{ workOrderDetail.id }}</div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="font-size: 14px; color: #6b7280;">工单类型</div>
          </div>
          <div style="font-size: 14px; font-weight: 500; color: #111827;">{{ workOrderDetail.type }}</div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="font-size: 14px; color: #6b7280;">创建时间</div>
          </div>
          <div style="font-size: 14px; font-weight: 500; color: #111827;">{{ workOrderDetail.createTime }}</div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="font-size: 14px; color: #6b7280;">当前状态</div>
          </div>
          <el-tag 
            :type="workOrderDetail.status === '待分配' ? 'warning' : 
                   workOrderDetail.status === '施工中' ? 'danger' : 
                   workOrderDetail.status === '已完成' ? 'success' : 'info'"
          >
            {{ workOrderDetail.status }}
          </el-tag>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="font-size: 14px; color: #6b7280;">客户姓名</div>
          </div>
          <div style="font-size: 14px; font-weight: 500; color: #111827;">{{ workOrderDetail.customerName }}</div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <el-icon><Phone /></el-icon>
            <div style="font-size: 14px; color: #6b7280;">联系电话</div>
          </div>
          <div style="font-size: 14px; font-weight: 500; color: #111827;">{{ workOrderDetail.customerPhone }}</div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
          <div style="display: flex; align-items: flex-start; gap: 8px; margin-top: 4px;">
            <el-icon><Location /></el-icon>
            <div style="font-size: 14px; color: #6b7280;">服务地址</div>
          </div>
          <div style="font-size: 14px; font-weight: 500; color: #111827; text-align: right; max-width: 200px;">{{ workOrderDetail.address }}</div>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div style="display: flex; align-items: flex-start; gap: 8px; margin-top: 4px;">
            <div style="font-size: 14px; color: #6b7280;">报修描述</div>
          </div>
          <div style="font-size: 14px; font-weight: 500; color: #111827; text-align: right; max-width: 200px;">{{ workOrderDetail.description }}</div>
        </div>
      </div>
      
      <!-- 师傅信息 -->
      <div v-if="workOrderDetail.assignedMaster" style="background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; margin-bottom: 20px;">
        <div style="font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 16px;">分配师傅</div>
        
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 56px; height: 56px; background: #E60012; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;">{{ workOrderDetail.assignedMaster.substring(0, 1) }}</div>
          <div style="flex: 1;">
            <div style="font-size: 16px; font-weight: bold; margin-bottom: 4px;">{{ workOrderDetail.assignedMaster }}</div>
            <div style="font-size: 14px; color: #6b7280; display: flex; align-items: center; gap: 8px;">
              <el-icon><Phone /></el-icon>
              {{ workOrderDetail.masterPhone }}
            </div>
          </div>
          <el-button type="primary" round>
            <Phone style="margin-right: 4px;" />
            联系师傅
          </el-button>
        </div>
      </div>
      
      <!-- 工单进度 -->
      <div style="background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px;">
        <div style="font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 16px;">工单进度</div>
        
        <el-timeline>
          <el-timeline-item 
            v-for="(item, index) in workOrderDetail.progress" 
            :key="item.step"
            :timestamp="item.time"
            :type="item.status === 'completed' ? 'success' : 
                   item.status === 'processing' ? 'primary' : 'info'"
            :icon="item.status === 'completed' ? Check : 
                   item.status === 'processing' ? Loading : InfoFilled"
          >
            <div style="font-size: 14px; font-weight: 500; color: #111827;">{{ item.title }}</div>
            <div v-if="item.description" style="font-size: 12px; color: #6b7280; margin-top: 4px;">{{ item.description }}</div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<style scoped>
.work-order-detail-page {
  padding-bottom: 80px; /* 为底部导航栏留出空间 */
}
</style>