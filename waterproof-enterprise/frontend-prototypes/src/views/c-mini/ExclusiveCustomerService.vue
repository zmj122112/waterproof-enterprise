<script setup>
// 专属客服页面
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Document, Phone, Message, Clock, Location } from '@element-plus/icons-vue'

const router = useRouter()

// 客服信息
const customerService = ref({
  name: '李客服',
  avatar: '李',
  phone: '400-888-8888',
  workingHours: '周一至周日 9:00-21:00',
  onlineStatus: '在线',
  responseTime: '平均响应时间：30秒'
})

// 常见问题
const faqs = [
  { question: '如何提交报修？', answer: '您可以在首页点击"立即报修"按钮，填写相关信息后提交即可。' },
  { question: '师傅多久能上门？', answer: '一般情况下，我们会在24小时内安排师傅上门服务。' },
  { question: '如何查看工单进度？', answer: '您可以在"工单进度"页面查看所有工单的实时进度。' },
  { question: '服务费用如何计算？', answer: '服务费用根据维修项目、材料使用和工时等因素综合计算，师傅上门检测后会给出详细报价。' }
]

// 返回个人中心
const goBack = () => {
  router.push('/c-mini/user-center')
}

onMounted(() => {
  console.log('专属客服页面加载')
})
</script>

<template>
  <div class="exclusive-customer-service-page" style="background-color: #f3f4f6; min-height: 100vh;">
    <!-- 红色底部舞台 Header -->
    <div style="background-color: #E60012; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding: 20px 20px 30px; text-align: center; position: relative;">
      <a href="/c-mini/user-center" style="position: absolute; left: 10px; top: 10px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; cursor: pointer; z-index: 99999; background: rgba(255,255,255,0.1); border-radius: 50%; text-decoration: none;">
        <el-icon><ArrowLeft /></el-icon>
      </a>
      <div style="color: white; font-size: 20px; font-weight: 700; margin: 0;">专属客服</div>
    </div>

    <!-- 客服信息卡片 -->
    <div style="padding: 20px;">
      <div style="background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 24px; margin-bottom: 20px;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 16px;">
          <div style="width: 80px; height: 80px; background: #E60012; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 32px; font-weight: bold;">{{ customerService.avatar }}</div>
          <div style="text-align: center;">
            <div style="font-size: 20px; font-weight: 700; color: #111827; margin-bottom: 8px;">{{ customerService.name }}</div>
            <div style="font-size: 14px; color: #6b7280; display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 4px;">
              <el-icon color="#10b981"><Document /></el-icon>
              <span>{{ customerService.onlineStatus }}</span>
            </div>
            <div style="font-size: 12px; color: #9ca3af;">{{ customerService.responseTime }}</div>
          </div>
          
          <!-- 联系方式 -->
          <div style="display: flex; gap: 12px; margin-top: 8px;">
            <el-button type="primary" round :icon="Phone">
              电话咨询
            </el-button>
            <el-button type="success" round :icon="Message">
              在线聊天
            </el-button>
          </div>
          
          <!-- 工作时间 -->
          <div style="display: flex; align-items: center; gap: 8px; margin-top: 12px;">
            <el-icon color="#6b7280"><Clock /></el-icon>
            <div style="font-size: 14px; color: #6b7280;">{{ customerService.workingHours }}</div>
          </div>
        </div>
      </div>
      
      <!-- 常见问题 -->
      <div style="background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 20px;">
        <div style="font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #e5e7eb;">常见问题</div>
        
        <el-collapse>
          <el-collapse-item 
            v-for="(faq, index) in faqs" 
            :key="index"
            :title="faq.question"
          >
            <div style="font-size: 14px; color: #6b7280; line-height: 1.6;">{{ faq.answer }}</div>
          </el-collapse-item>
        </el-collapse>
      </div>
      
      <!-- 联系我们 -->
      <div style="margin-top: 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 20px;">
        <div style="font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #e5e7eb;">联系我们</div>
        
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 40px; height: 40px; background-color: #fef2f2; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #E60012;">
              <Phone size="20" />
            </div>
            <div style="flex: 1;">
              <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">客服电话</div>
              <div style="font-size: 16px; font-weight: 500; color: #111827;">{{ customerService.phone }}</div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 40px; height: 40px; background-color: #fef2f2; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #E60012;">
              <Location size="20" />
            </div>
            <div style="flex: 1;">
              <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">公司地址</div>
              <div style="font-size: 14px; font-weight: 500; color: #111827;">上海市浦东新区张杨路1000号月星大厦</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.exclusive-customer-service-page {
  padding-bottom: 80px; /* 为底部导航栏留出空间 */
}
</style>