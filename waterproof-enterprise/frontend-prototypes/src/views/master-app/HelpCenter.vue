<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

// 帮助中心数据
const faqs = [
  {
    id: 1,
    category: '账号问题',
    questions: [
      { id: 1, title: '如何注册师傅账号？', answer: '您可以通过平台邀请链接注册师傅账号，或者联系平台管理员进行开通。注册时需要提供真实的个人信息和资质证明。' },
      { id: 2, title: '忘记密码怎么办？', answer: '在登录页面点击“忘记密码”，按照提示输入手机号获取验证码，然后重置密码即可。' },
      { id: 3, title: '如何修改个人信息？', answer: '登录后进入“个人中心”，点击“个人信息”进行修改，修改后点击保存即可。' }
    ]
  },
  {
    id: 2,
    category: '工单问题',
    questions: [
      { id: 4, title: '如何接收工单？', answer: '登录后进入“工单接收”页面，查看待接收工单，点击“接收工单”即可接收。' },
      { id: 5, title: '如何查看工单详情？', answer: '在工单列表中点击任意工单，即可查看工单详情，包括客户信息、地址、时间等。' },
      { id: 6, title: '如何提交施工记录？', answer: '在“施工记录”页面点击“新增施工记录”，填写施工信息并上传照片，然后提交即可。' }
    ]
  },
  {
    id: 3,
    category: '积分问题',
    questions: [
      { id: 7, title: '如何获得积分？', answer: '通过接收工单、完成施工、获得客户好评等方式可以获得积分。' },
      { id: 8, title: '积分有什么用？', answer: '积分可以在积分商城兑换商品，或者参与平台活动等。' },
      { id: 9, title: '积分如何查询？', answer: '登录后进入“积分中心”，即可查看当前积分和积分明细。' }
    ]
  },
  {
    id: 4,
    category: '其他问题',
    questions: [
      { id: 10, title: '如何联系客服？', answer: '可以通过平台内的“联系客服”功能，或者拨打客服电话：400-123-4567。' },
      { id: 11, title: '平台工作时间？', answer: '平台客服工作时间为周一至周日 9:00-18:00，工单派单时间为24小时服务。' }
    ]
  }
]

// 搜索关键词
const searchKeyword = ref('')

// 筛选后的FAQ列表
const filteredFaqs = computed(() => {
  if (!searchKeyword.value) {
    return faqs
  }
  return faqs.map(category => ({
    ...category,
    questions: category.questions.filter(question => 
      question.title.includes(searchKeyword.value) || 
      question.answer.includes(searchKeyword.value)
    )
  })).filter(category => category.questions.length > 0)
})

// 展开状态
const expandedIds = ref([])

// 切换展开/折叠
const toggleExpand = (id) => {
  const index = expandedIds.value.indexOf(id)
  if (index > -1) {
    expandedIds.value.splice(index, 1)
  } else {
    expandedIds.value.push(id)
  }
}

// 查看答案
const viewAnswer = (question) => {
  ElMessage.info(`查看答案：${question.title}`)
}
</script>

<template>
  <div class="help-center-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
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
        
        <div class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">帮助中心</div>
      </div>
    </div>

    <!-- 搜索框卡片 - 浮动白色卡片 -->
    <div style="margin: -20px 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <el-input 
        v-model="searchKeyword" 
        placeholder="请输入您的问题" 
        prefix-icon="Search" 
        clearable
      />
    </div>

    <!-- 帮助内容卡片 - 浮动白色卡片 -->
    <div style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <!-- FAQ列表 -->
      <div v-if="filteredFaqs.length > 0">
        <div 
          v-for="category in filteredFaqs" 
          :key="category.id" 
          style="margin-bottom: 24px;"
        >
          <div style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #e5e7eb;">
            {{ category.category }}
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div 
              v-for="question in category.questions" 
              :key="question.id" 
              style="background-color: #f9fafb; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden; transition: all 0.3s ease;"
            >
              <div 
                style="display: flex; justify-content: space-between; align-items: center; padding: 16px; cursor: pointer;" 
                @click="toggleExpand(question.id)"
              >
                <div style="font-size: 16px; font-weight: 500; color: #111827;">{{ question.title }}</div>
                <div style="font-size: 16px; color: #9ca3af; transition: transform 0.3s ease;">
                  <span v-if="expandedIds.includes(question.id)">▼</span>
                  <span v-else>▶</span>
                </div>
              </div>
              <div 
                v-if="expandedIds.includes(question.id)" 
                style="padding: 0 16px 16px; font-size: 14px; color: #6b7280; line-height: 1.6;"
              >
                {{ question.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 搜索结果为空 -->
      <div v-else style="text-align: center; padding: 60px 0;">
        <div style="font-size: 16px; color: #9ca3af; margin-bottom: 16px;">未找到相关问题</div>
        <div style="font-size: 14px; color: #6b7280;">请尝试更换关键词搜索，或联系客服咨询</div>
      </div>
    </div>

    <!-- 联系客服卡片 -->
    <div style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <div style="display: flex; align-items: center; margin-bottom: 12px;">
        <div style="width: 40px; height: 40px; background-color: #fef2f2; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E60012" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </div>
        <div style="font-size: 16px; font-weight: 600; color: #111827;">联系客服</div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px; padding-left: 52px;">
        <div style="font-size: 14px; color: #6b7280;">• 客服电话：400-123-4567</div>
        <div style="font-size: 14px; color: #6b7280;">• 工作时间：周一至周日 9:00-18:00</div>
        <div style="font-size: 14px; color: #6b7280;">• 平台内“联系客服”功能</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 移除旧样式，使用内联样式替代 */
</style>