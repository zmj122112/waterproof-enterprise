<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Location, Phone } from '@element-plus/icons-vue'

// 标签页状态
const activeTab = ref('pending')

// 工单列表数据
const workOrders = ref({
  pending: [
    {
      id: 'WD20231015001',
      type: '上门检测（免费）',
      customer: '企业客户A',
      appointment: '2023-10-15 上午（9:00-12:00）',
      address: 'XX区XX街道XX小区XX号楼XX单元XX室',
      description: '卫生间漏水，持续时间1周，需要上门检测'
    },
    {
      id: 'WD20231016002',
      type: '直接施工（已报价）',
      customer: '个人客户B',
      appointment: '2023-10-16 下午（14:00-17:00）',
      address: 'XX区XX街道XX小区XX号楼XX单元XX室',
      description: '厨房漏水，需要直接施工维修'
    }
  ],
  received: [
    {
      id: 'WD20231014001',
      type: '上门检测（免费）',
      customer: '个人客户C',
      appointment: '2023-10-14 上午（9:00-12:00）',
      address: 'XX区XX街道XX小区XX号楼XX单元XX室',
      description: '阳台漏水，需要上门检测'
    }
  ],
  completed: [
    {
      id: 'WD20231013001',
      type: '直接施工（已报价）',
      customer: '企业客户D',
      appointment: '2023-10-13 下午（14:00-17:00）',
      address: 'XX区XX街道XX小区XX号楼XX单元XX室',
      description: '卫生间漏水，已完成施工'
    }
  ]
})

// 当前详情显示的工单
const currentDetail = ref(null)

// 详情弹窗显示状态
const detailVisible = ref(false)

// 接收工单
const receiveWorkOrder = (workOrder) => {
  ElMessage.success('工单接收成功')
  // 将工单从待接收移到已接收
  const index = workOrders.value.pending.findIndex(item => item.id === workOrder.id)
  if (index !== -1) {
    workOrders.value.pending.splice(index, 1)
    workOrders.value.received.push(workOrder)
  }
}

// 查看工单详情
const viewWorkOrderDetail = (workOrder) => {
  currentDetail.value = workOrder
  detailVisible.value = true
}

// 导航前往
const navigateTo = (address) => {
  ElMessage.info(`导航到：${address}`)
  console.log('导航前往:', address)
}

// 联系客户
const contactCustomer = (workOrder) => {
  ElMessage.info(`联系客户：${workOrder.customer}`)
  console.log('联系客户:', workOrder)
}
</script>

<template>
  <div class="work-order-receive-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
    <!-- 红色顶部区域 -->
    <div class="header-section" style="background-color: #E60012; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding-top: 40px; padding-bottom: 30px; position: relative; z-index: 0;">
      <div class="header-content" style="padding: 0 20px;">
        <div class="brand-info" style="display: flex; align-items: center; margin-bottom: 16px;">
          <img src="/logo.png" class="logo-img" style="width: 40px; height: 40px; border-radius: 50%; background-color: white; padding: 2px; margin-right: 10px; object-fit: contain;" />
          <div class="brand-text">
            <div class="brand-name" style="color: white; font-size: 18px; font-weight: bold;">月星防水</div>
            <div class="brand-slogan" style="color: rgba(255,255,255,0.8); font-size: 12px;">Since 1947</div>
          </div>
        </div>
        
        <div class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">工单接收</div>
      </div>
    </div>

    <!-- 工单标签页 - 浮动白色卡片 -->
    <div style="margin: -20px 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <!-- 标签页切换 -->
      <el-tabs v-model="activeTab" class="work-order-tabs" style="--el-tabs-nav-height: 40px;">
        <el-tab-pane label="待接收" name="pending">
          <!-- 待接收工单列表 -->
          <div class="work-order-list" style="margin-top: 16px;">
            <div 
              v-for="workOrder in workOrders.pending" 
              :key="workOrder.id" 
              style="background-color: white; border: 1px solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 16px; margin-bottom: 16px; transition: all 0.3s ease;"
            >
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0;">
                <div style="font-size: 14px; font-weight: 600; color: #111827;">工单编号：{{ workOrder.id }}</div>
                <div style="font-size: 12px; color: #E60012; background-color: #fef2f2; padding: 4px 12px; border-radius: 16px;">{{ workOrder.type }}</div>
              </div>
              <div style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <div style="font-size: 16px; font-weight: 500; color: #111827;">{{ workOrder.customer }}</div>
                  <div style="font-size: 13px; color: #6b7280;">{{ workOrder.appointment }}</div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <el-icon color="#6b7280"><Location /></el-icon>
                  <div style="font-size: 13px; color: #6b7280; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ workOrder.address }}</div>
                </div>
                <div style="font-size: 13px; color: #6b7280; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">
                  <span style="font-weight: 500; color: #111827;">描述：</span>{{ workOrder.description }}
                </div>
              </div>
              <div style="display: flex; gap: 12px;">
                <el-button 
                  type="danger" 
                  round 
                  size="small" 
                  @click="receiveWorkOrder(workOrder)"
                  style="flex: 1;"
                >
                  接收工单
                </el-button>
                <el-button 
                  type="primary" 
                  round 
                  size="small" 
                  @click="viewWorkOrderDetail(workOrder)"
                  style="flex: 1;"
                >
                  查看详情
                </el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已接收" name="received">
          <!-- 已接收工单列表 -->
          <div class="work-order-list" style="margin-top: 16px;">
            <div 
              v-for="workOrder in workOrders.received" 
              :key="workOrder.id" 
              style="background-color: white; border: 1px solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 16px; margin-bottom: 16px; transition: all 0.3s ease;"
            >
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0;">
                <div style="font-size: 14px; font-weight: 600; color: #111827;">工单编号：{{ workOrder.id }}</div>
                <div style="font-size: 12px; color: #E60012; background-color: #fef2f2; padding: 4px 12px; border-radius: 16px;">{{ workOrder.type }}</div>
              </div>
              <div style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <div style="font-size: 16px; font-weight: 500; color: #111827;">{{ workOrder.customer }}</div>
                  <div style="font-size: 13px; color: #6b7280;">{{ workOrder.appointment }}</div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <el-icon color="#6b7280"><Location /></el-icon>
                  <div style="font-size: 13px; color: #6b7280; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ workOrder.address }}</div>
                </div>
                <div style="font-size: 13px; color: #6b7280; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">
                  <span style="font-weight: 500; color: #111827;">描述：</span>{{ workOrder.description }}
                </div>
              </div>
              <div style="display: flex; gap: 12px;">
                <el-button 
                  type="primary" 
                  round 
                  size="small" 
                  @click="navigateTo(workOrder.address)"
                  style="flex: 1;"
                >
                  导航前往
                </el-button>
                <el-button 
                  type="success" 
                  round 
                  size="small" 
                  @click="contactCustomer(workOrder)"
                  style="flex: 1;"
                >
                  联系客户
                </el-button>
                <el-button 
                  type="info" 
                  round 
                  size="small" 
                  @click="viewWorkOrderDetail(workOrder)"
                  style="flex: 1;"
                >
                  查看详情
                </el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="completed">
          <!-- 已完成工单列表 -->
          <div class="work-order-list" style="margin-top: 16px;">
            <div 
              v-for="workOrder in workOrders.completed" 
              :key="workOrder.id" 
              style="background-color: white; border: 1px solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 16px; margin-bottom: 16px; transition: all 0.3s ease;"
            >
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0;">
                <div style="font-size: 14px; font-weight: 600; color: #111827;">工单编号：{{ workOrder.id }}</div>
                <div style="font-size: 12px; color: #E60012; background-color: #fef2f2; padding: 4px 12px; border-radius: 16px;">{{ workOrder.type }}</div>
              </div>
              <div style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <div style="font-size: 16px; font-weight: 500; color: #111827;">{{ workOrder.customer }}</div>
                  <div style="font-size: 13px; color: #6b7280;">{{ workOrder.appointment }}</div>
                </div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <el-icon color="#6b7280"><Location /></el-icon>
                  <div style="font-size: 13px; color: #6b7280; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ workOrder.address }}</div>
                </div>
                <div style="font-size: 13px; color: #6b7280; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis;">
                  <span style="font-weight: 500; color: #111827;">描述：</span>{{ workOrder.description }}
                </div>
              </div>
              <div style="display: flex; justify-content: flex-end;">
                <el-button 
                  type="info" 
                  round 
                  size="small" 
                  @click="viewWorkOrderDetail(workOrder)"
                >
                  查看详情
                </el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 工单详情弹窗 -->
    <el-dialog
      title="工单详情"
      v-model="detailVisible"
      width="80%"
      :close-on-click-modal="false"
    >
      <div class="detail-content" v-if="currentDetail" style="padding: 16px 0;">
        <div class="detail-section" style="margin-bottom: 24px;">
          <h3 class="section-title" style="font-size: 18px; font-weight: 600; color: #111827; margin: 0 0 16px 0; border-left: 4px solid #E60012; padding-left: 10px;">基本信息</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div class="detail-item" style="display: flex; flex-wrap: wrap;">
              <span class="label" style="width: 80px; font-weight: 500; color: #111827; margin-right: 16px;">工单编号：</span>
              <span class="value" style="flex: 1; color: #6b7280; line-height: 1.5;">{{ currentDetail.id }}</span>
            </div>
            <div class="detail-item" style="display: flex; flex-wrap: wrap;">
              <span class="label" style="width: 80px; font-weight: 500; color: #111827; margin-right: 16px;">服务类型：</span>
              <span class="value" style="flex: 1; color: #6b7280; line-height: 1.5;">{{ currentDetail.type }}</span>
            </div>
            <div class="detail-item" style="display: flex; flex-wrap: wrap;">
              <span class="label" style="width: 80px; font-weight: 500; color: #111827; margin-right: 16px;">客户名称：</span>
              <span class="value" style="flex: 1; color: #6b7280; line-height: 1.5;">{{ currentDetail.customer }}</span>
            </div>
            <div class="detail-item" style="display: flex; flex-wrap: wrap;">
              <span class="label" style="width: 80px; font-weight: 500; color: #111827; margin-right: 16px;">联系人：</span>
              <span class="value" style="flex: 1; color: #6b7280; line-height: 1.5;">张三</span>
            </div>
            <div class="detail-item" style="display: flex; flex-wrap: wrap;">
              <span class="label" style="width: 80px; font-weight: 500; color: #111827; margin-right: 16px;">联系电话：</span>
              <span class="value" style="flex: 1; color: #6b7280; line-height: 1.5;">13800138000</span>
            </div>
            <div class="detail-item" style="display: flex; flex-wrap: wrap;">
              <span class="label" style="width: 80px; font-weight: 500; color: #111827; margin-right: 16px;">预约时间：</span>
              <span class="value" style="flex: 1; color: #6b7280; line-height: 1.5;">{{ currentDetail.appointment }}</span>
            </div>
            <div class="detail-item" style="display: flex; flex-wrap: wrap;">
              <span class="label" style="width: 80px; font-weight: 500; color: #111827; margin-right: 16px;">地址：</span>
              <span class="value" style="flex: 1; color: #6b7280; line-height: 1.5;">{{ currentDetail.address }}</span>
            </div>
          </div>
        </div>
        <div class="detail-section" style="margin-bottom: 20px;">
          <h3 class="section-title" style="font-size: 18px; font-weight: 600; color: #111827; margin: 0 0 16px 0; border-left: 4px solid #E60012; padding-left: 10px;">工单描述</h3>
          <div style="color: #6b7280; line-height: 1.6;">{{ currentDetail.description }}</div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer" style="display: flex; justify-content: stretch; gap: 12px; width: 100%;">
          <el-button @click="detailVisible = false" style="flex: 1;">关闭</el-button>
          <el-button type="primary" @click="navigateTo(currentDetail.address)" style="flex: 1;">
            <el-icon><Location /></el-icon>
            导航前往
          </el-button>
          <el-button type="success" @click="contactCustomer(currentDetail)" style="flex: 1;">
            <el-icon><Phone /></el-icon>
            联系客户
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
/* 空样式标签，确保Vue SFC格式正确 */
</style>