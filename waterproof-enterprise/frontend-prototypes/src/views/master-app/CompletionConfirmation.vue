<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()

// 完工确认列表数据
const completionConfirmations = ref([
  {
    id: 'CC20231015001',
    workOrderId: 'WD20231015001',
    customerName: '企业客户A',
    address: 'XX区XX街道XX小区XX号楼XX单元XX室',
    status: '待确认'
  },
  {
    id: 'CC20231014001',
    workOrderId: 'WD20231014001',
    customerName: '个人客户B',
    address: 'XX区XX街道XX小区XX号楼XX单元XX室',
    status: '已确认'
  }
])

// 确认完工
const confirmCompletion = (confirmation) => {
  ElMessageBox.confirm('确定要提交完工确认吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    confirmation.status = '已确认'
    ElMessage.success('完工确认提交成功')
    console.log('提交完工确认:', confirmation)
  }).catch(() => {
    // 取消提交
  })
}

// 查看详情
const viewDetail = (confirmation) => {
  router.push(`/master-app/completion-confirmation/${confirmation.id}`)
}
</script>

<template>
  <div class="completion-confirmation-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
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
        
        <div class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">完工确认</div>
      </div>
    </div>

    <!-- 完工确认列表 - 浮动白色卡片 -->
    <div style="margin: -20px 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <!-- 完工确认列表 -->
      <div class="completion-confirmation-list" style="margin-top: 0;">
        <div 
          v-for="confirmation in completionConfirmations" 
          :key="confirmation.id" 
          style="background-color: white; border: 1px solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 16px; margin-bottom: 16px; transition: all 0.3s ease;"
        >
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0;">
            <div style="font-size: 14px; font-weight: 600; color: #111827;">确认编号：{{ confirmation.id }}</div>
            <div :style="confirmation.status === '已确认' ? 'font-size: 12px; color: #10B981; background-color: #D1FAE5; padding: 4px 12px; border-radius: 16px;' : 'font-size: 12px; color: #E60012; background-color: #fef2f2; padding: 4px 12px; border-radius: 16px;'">
              {{ confirmation.status }}
            </div>
          </div>
          
          <div style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div style="font-size: 16px; font-weight: 500; color: #111827;">{{ confirmation.customerName }}</div>
              <div style="font-size: 13px; color: #6b7280;">{{ confirmation.workOrderId }}</div>
            </div>
            <div style="font-size: 13px; color: #6b7280; line-height: 1.4; margin-bottom: 8px;">
              <span style="font-weight: 500; color: #111827;">关联工单：</span>{{ confirmation.workOrderId }}
            </div>
            <div style="font-size: 13px; color: #6b7280; line-height: 1.4;">
              <span style="font-weight: 500; color: #111827;">施工地址：</span>{{ confirmation.address }}
            </div>
          </div>
          
          <div style="display: flex; gap: 12px;">
            <el-button
              type="primary"
              round
              size="small"
              @click="viewDetail(confirmation)"
              style="flex: 1;"
            >
              查看详情
            </el-button>
            <el-button
              v-if="confirmation.status === '待确认'"
              type="danger"
              round
              size="small"
              @click="confirmCompletion(confirmation)"
              style="flex: 1;"
            >
              确认完工
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 空样式标签，确保Vue SFC格式正确 */
</style>