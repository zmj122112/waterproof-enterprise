<script setup>
// 发票中心页面
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Document, Download } from '@element-plus/icons-vue'

const router = useRouter()

// 发票列表数据
const invoices = ref([
  { id: 'FP20231015001', orderNumber: 'WD20231015001', amount: 1200, status: '已开具', date: '2023-10-15', type: '增值税普通发票', pdfUrl: '#' },
  { id: 'FP20231010001', orderNumber: 'WD20231010001', amount: 800, status: '已开具', date: '2023-10-10', type: '增值税普通发票', pdfUrl: '#' },
  { id: 'FP20230925001', orderNumber: 'WD20230925001', amount: 1500, status: '已开具', date: '2023-09-25', type: '增值税普通发票', pdfUrl: '#' }
])

// 返回个人中心
const goBack = () => {
  router.push('/c-mini/user-center')
}

onMounted(() => {
  console.log('发票中心页面加载')
})
</script>

<template>
  <div class="invoice-center-page" style="background-color: #f3f4f6; min-height: 100vh;">
    <!-- 红色底部舞台 Header -->
    <div style="background-color: #CC0010; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding: 20px 20px 30px; text-align: center; position: relative;">
      <a href="/c-mini/user-center" style="position: absolute; left: 10px; top: 10px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; cursor: pointer; z-index: 99999; background: rgba(255,255,255,0.1); border-radius: 50%; text-decoration: none;">
        <el-icon><ArrowLeft /></el-icon>
      </a>
      <div style="color: white; font-size: 20px; font-weight: 700; margin: 0;">发票中心</div>
    </div>

    <!-- 发票列表 -->
    <div style="padding: 20px;">
      <div 
        v-for="invoice in invoices" 
        :key="invoice.id" 
        style="background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; margin-bottom: 20px; transition: all 0.3s ease;"
      >
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <el-icon color="#CC0010"><Document /></el-icon>
            <div style="font-size: 16px; font-weight: 600; color: #111827;">发票编号：{{ invoice.id }}</div>
          </div>
          <el-tag type="success" effect="light">
            {{ invoice.status }}
          </el-tag>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
          <div>
            <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">关联工单</div>
            <div style="font-size: 14px; font-weight: 500; color: #111827;">{{ invoice.orderNumber }}</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">发票类型</div>
            <div style="font-size: 14px; font-weight: 500; color: #111827;">{{ invoice.type }}</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">开具日期</div>
            <div style="font-size: 14px; font-weight: 500; color: #111827;">{{ invoice.date }}</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">发票金额</div>
            <div style="font-size: 18px; font-weight: bold; color: #CC0010;">¥{{ invoice.amount }}</div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: flex-end;">
          <el-button type="primary" round size="small" :icon="Download">
            下载发票
          </el-button>
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-if="invoices.length === 0" style="background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 40px 20px; text-align: center;">
        <div style="font-size: 48px; margin-bottom: 16px;">📄</div>
        <div style="font-size: 16px; color: #6b7280; margin-bottom: 8px;">暂无发票记录</div>
        <div style="font-size: 14px; color: #9ca3af;">您还没有开具过发票</div>
      </div>
      
      <!-- 开发票按钮 -->
      <div style="margin-top: 20px;">
        <el-button type="danger" round style="width: 100%; background-color: #CC0010; border-color: #CC0010;">
          <Document style="margin-right: 8px;" />
          申请开发票
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.invoice-center-page {
  padding-bottom: 80px; /* 为底部导航栏留出空间 */
}
</style>