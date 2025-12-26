<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

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
  ElMessage.info(`查看完工确认详情：${confirmation.id}`)
  console.log('查看完工确认详情:', confirmation)
}
</script>

<template>
  <div class="completion-confirmation-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
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
        
        <div class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">完工确认</div>
      </div>
    </div>

    <!-- 完工确认列表 - 浮动白色卡片 -->
    <div style="margin: -20px 20px 20px; position: relative; z-index: 10;">
      <div 
        v-for="confirmation in completionConfirmations" 
        :key="confirmation.id" 
        style="background-color: white; border: 1px solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 16px; margin-bottom: 16px; transition: all 0.3s ease;"
      >
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0;">
          <div style="font-size: 14px; font-weight: 600; color: #111827;">确认编号：{{ confirmation.id }}</div>
          <el-tag :type="confirmation.status === '已确认' ? 'success' : 'warning'" size="small" style="font-size: 12px; padding: 4px 12px;">
            {{ confirmation.status }}
          </el-tag>
        </div>
        
        <div style="margin-bottom: 16px;">
          <div style="display: flex; flex-wrap: wrap; margin-bottom: 8px;">
            <span style="width: 80px; font-weight: 500; color: #111827; margin-right: 16px;">关联工单：</span>
            <span style="flex: 1; color: #6b7280; line-height: 1.5;">{{ confirmation.workOrderId }}</span>
          </div>
          <div style="display: flex; flex-wrap: wrap; margin-bottom: 8px;">
            <span style="width: 80px; font-weight: 500; color: #111827; margin-right: 16px;">客户名称：</span>
            <span style="flex: 1; color: #6b7280; line-height: 1.5;">{{ confirmation.customerName }}</span>
          </div>
          <div style="display: flex; flex-wrap: wrap;">
            <span style="width: 80px; font-weight: 500; color: #111827; margin-right: 16px;">施工地址：</span>
            <span style="flex: 1; color: #6b7280; line-height: 1.5;">{{ confirmation.address }}</span>
          </div>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <el-button
            type="primary"
            round
            size="small"
            block
            @click="viewDetail(confirmation)"
          >
            查看详情
          </el-button>
          <el-button
            v-if="confirmation.status === '待确认'"
            type="success"
            round
            size="small"
            block
            @click="confirmCompletion(confirmation)"
          >
            确认完工
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 空样式标签，确保Vue SFC格式正确 */
</style>