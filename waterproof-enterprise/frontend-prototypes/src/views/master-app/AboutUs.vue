<script setup>
import { ref } from 'vue'

// 公司信息
const companyInfo = {
  name: '月星防水',
  slogan: '专业防水解决方案提供商',
  establishYear: '1947',
  description: '月星防水成立于1947年，是一家专业从事防水工程、防水材料销售和防水技术服务的企业。经过多年的发展，我们已成为行业领先的防水解决方案提供商，为客户提供高品质的防水产品和专业的施工服务。',
  vision: '成为中国防水行业的领先品牌，为客户提供最优质的防水解决方案。',
  mission: '以科技创新为动力，以质量为核心，以服务为宗旨，为客户创造价值。',
  contact: {
    phone: '400-123-4567',
    email: 'info@yuexingfs.com',
    address: 'XX市XX区XX街道XX号',
    website: 'www.yuexingfs.com'
  }
}
</script>

<template>
  <div class="about-us-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
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
        
        <div class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">关于月星</div>
      </div>
    </div>

    <!-- 公司介绍卡片 - 浮动白色卡片 -->
    <div style="margin: -20px 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 20px; position: relative; z-index: 10;">
      <!-- 公司名称和标语 -->
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="font-size: 24px; font-weight: 600; color: #111827; margin-bottom: 8px;">{{ companyInfo.name }}</div>
        <div style="font-size: 16px; color: #6b7280; margin-bottom: 8px;">{{ companyInfo.slogan }}</div>
        <div style="font-size: 14px; color: #9ca3af;">成立于 {{ companyInfo.establishYear }} 年</div>
      </div>
      
      <!-- 公司介绍 -->
      <div style="margin-bottom: 20px;">
        <div style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 12px;">公司介绍</div>
        <div style="font-size: 14px; color: #6b7280; line-height: 1.6;">{{ companyInfo.description }}</div>
      </div>
      
      <!-- 公司愿景和使命 -->
      <div style="margin-bottom: 20px;">
        <div style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 12px;">愿景与使命</div>
        <div style="margin-bottom: 16px;">
          <div style="font-size: 16px; font-weight: 500; color: #111827; margin-bottom: 8px;">愿景</div>
          <div style="font-size: 14px; color: #6b7280; line-height: 1.6;">{{ companyInfo.vision }}</div>
        </div>
        <div>
          <div style="font-size: 16px; font-weight: 500; color: #111827; margin-bottom: 8px;">使命</div>
          <div style="font-size: 14px; color: #6b7280; line-height: 1.6;">{{ companyInfo.mission }}</div>
        </div>
      </div>
    </div>

    <!-- 联系我们卡片 - 浮动白色卡片 -->
    <div style="margin: 0 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 20px; position: relative; z-index: 10;">
      <div style="font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 20px;">联系我们</div>
      
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <!-- 电话 -->
        <div style="display: flex; align-items: center;">
          <div style="width: 40px; height: 40px; background-color: #fef2f2; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E60012" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          </div>
          <div style="font-size: 16px; color: #111827;">{{ companyInfo.contact.phone }}</div>
        </div>
        
        <!-- 邮箱 -->
        <div style="display: flex; align-items: center;">
          <div style="width: 40px; height: 40px; background-color: #fef2f2; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E60012" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </div>
          <div style="font-size: 16px; color: #111827;">{{ companyInfo.contact.email }}</div>
        </div>
        
        <!-- 地址 -->
        <div style="display: flex; align-items: flex-start;">
          <div style="width: 40px; height: 40px; background-color: #fef2f2; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 12px; margin-top: 2px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E60012" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
          <div style="font-size: 16px; color: #111827; line-height: 1.4;">{{ companyInfo.contact.address }}</div>
        </div>
        
        <!-- 网站 -->
        <div style="display: flex; align-items: center;">
          <div style="width: 40px; height: 40px; background-color: #fef2f2; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E60012" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
          </div>
          <div style="font-size: 16px; color: #111827;">{{ companyInfo.contact.website }}</div>
        </div>
      </div>
    </div>

    <!-- 版权信息 -->
    <div style="text-align: center; font-size: 14px; color: #9ca3af; margin: 20px 0;">
      © {{ new Date().getFullYear() }} {{ companyInfo.name }}. All rights reserved.
    </div>
  </div>
</template>

<style scoped>
/* 移除旧样式，使用内联样式替代 */
</style>