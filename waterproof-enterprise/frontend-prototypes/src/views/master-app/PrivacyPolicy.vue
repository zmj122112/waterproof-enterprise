<script setup>
import { ref } from 'vue'
</script>

<template>
  <div class="privacy-policy-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
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
        
        <div class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">隐私政策</div>
      </div>
    </div>

    <!-- 隐私政策内容卡片 - 浮动白色卡片 -->
    <div style="margin: -20px 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 20px; position: relative; z-index: 10;">
      <!-- 政策更新日期 -->
      <div style="font-size: 14px; color: #9ca3af; text-align: center; margin-bottom: 24px;">
        本政策更新于：{{ new Date().getFullYear() }}年{{ new Date().getMonth() + 1 }}月{{ new Date().getDate() }}日
      </div>
      
      <!-- 政策正文 -->
      <div style="font-size: 14px; color: #6b7280; line-height: 1.8;">
        <h2 style="font-size: 18px; font-weight: 600; color: #111827; margin-top: 20px; margin-bottom: 12px;">1. 引言</h2>
        <p style="margin-bottom: 16px;">欢迎使用月星防水师傅端应用（以下简称"本应用"）。我们非常重视您的隐私保护和个人信息安全。本隐私政策旨在向您说明我们如何收集、使用、存储和保护您在使用本应用时提供的个人信息，以及您享有的权利。</p>
        
        <h2 style="font-size: 18px; font-weight: 600; color: #111827; margin-top: 20px; margin-bottom: 12px;">2. 信息收集与使用</h2>
        <p style="margin-bottom: 12px;">2.1 我们收集的信息</p>
        <p style="margin-bottom: 12px;">在您使用本应用的过程中，我们可能会收集以下信息：</p>
        <ul style="margin-bottom: 16px; padding-left: 20px;">
          <li style="margin-bottom: 8px;">个人身份信息：姓名、性别、年龄、身份证号码等；</li>
          <li style="margin-bottom: 8px;">联系方式：手机号码、邮箱地址等；</li>
          <li style="margin-bottom: 8px;">账户信息：用户名、密码、登录记录等；</li>
          <li style="margin-bottom: 8px;">位置信息：GPS定位、IP地址等；</li>
          <li style="margin-bottom: 8px;">设备信息：设备型号、操作系统版本、设备标识符等；</li>
          <li style="margin-bottom: 8px;">使用信息：浏览记录、操作日志、工单记录等。</li>
        </ul>
        
        <p style="margin-bottom: 12px;">2.2 信息使用目的</p>
        <p style="margin-bottom: 12px;">我们收集的信息将用于以下目的：</p>
        <ul style="margin-bottom: 16px; padding-left: 20px;">
          <li style="margin-bottom: 8px;">提供和改进我们的服务；</li>
          <li style="margin-bottom: 8px;">处理您的工单请求和服务需求；</li>
          <li style="margin-bottom: 8px;">与您沟通和联系；</li>
          <li style="margin-bottom: 8px;">验证您的身份和权限；</li>
          <li style="margin-bottom: 8px;">分析和统计服务使用情况；</li>
          <li style="margin-bottom: 8px;">保障服务安全和防止欺诈行为；</li>
          <li style="margin-bottom: 8px;">遵守法律法规和监管要求。</li>
        </ul>
        
        <h2 style="font-size: 18px; font-weight: 600; color: #111827; margin-top: 20px; margin-bottom: 12px;">3. 信息共享与披露</h2>
        <p style="margin-bottom: 12px;">我们不会向第三方出售、出租或共享您的个人信息，除非：</p>
        <ul style="margin-bottom: 16px; padding-left: 20px;">
          <li style="margin-bottom: 8px;">获得您的明确同意；</li>
          <li style="margin-bottom: 8px;">遵守法律法规和监管要求；</li>
          <li style="margin-bottom: 8px;">保护我们的合法权益；</li>
          <li style="margin-bottom: 8px;">与我们的关联公司、合作伙伴共享，用于提供和改进服务；</li>
          <li style="margin-bottom: 8px;">在合并、收购或破产清算时转移。</li>
        </ul>
        
        <h2 style="font-size: 18px; font-weight: 600; color: #111827; margin-top: 20px; margin-bottom: 12px;">4. 信息安全</h2>
        <p style="margin-bottom: 16px;">我们采取多种安全措施保护您的个人信息，包括但不限于：</p>
        <ul style="margin-bottom: 16px; padding-left: 20px;">
          <li style="margin-bottom: 8px;">使用加密技术保护数据传输；</li>
          <li style="margin-bottom: 8px;">定期进行安全审计和漏洞扫描；</li>
          <li style="margin-bottom: 8px;">限制访问权限和实施访问控制；</li>
          <li style="margin-bottom: 8px;">员工培训和保密协议；</li>
          <li style="margin-bottom: 8px;">建立应急响应机制。</li>
        </ul>
        
        <h2 style="font-size: 18px; font-weight: 600; color: #111827; margin-top: 20px; margin-bottom: 12px;">5. 您的权利</h2>
        <p style="margin-bottom: 12px;">您有权：</p>
        <ul style="margin-bottom: 16px; padding-left: 20px;">
          <li style="margin-bottom: 8px;">访问和查询您的个人信息；</li>
          <li style="margin-bottom: 8px;">修改和更新您的个人信息；</li>
          <li style="margin-bottom: 8px;">删除您的个人信息；</li>
          <li style="margin-bottom: 8px;">撤回同意和拒绝处理；</li>
          <li style="margin-bottom: 8px;">注销账户；</li>
          <li style="margin-bottom: 8px;">投诉和举报；</li>
          <li style="margin-bottom: 8px;">获取个人信息副本。</li>
        </ul>
        
        <h2 style="font-size: 18px; font-weight: 600; color: #111827; margin-top: 20px; margin-bottom: 12px;">6. 政策更新</h2>
        <p style="margin-bottom: 16px;">我们可能会不时更新本隐私政策。更新后的政策将在应用内公告或通过其他方式通知您。继续使用本应用即表示您同意更新后的隐私政策。</p>
        
        <h2 style="font-size: 18px; font-weight: 600; color: #111827; margin-top: 20px; margin-bottom: 12px;">7. 联系我们</h2>
        <p style="margin-bottom: 16px;">如果您对本隐私政策有任何疑问或建议，或需要行使您的权利，请通过以下方式联系我们：</p>
        <ul style="margin-bottom: 16px; padding-left: 20px;">
          <li style="margin-bottom: 8px;">客服电话：400-123-4567；</li>
          <li style="margin-bottom: 8px;">邮箱：privacy@yuexingfs.com；</li>
          <li style="margin-bottom: 8px;">地址：XX市XX区XX街道XX号。</li>
        </ul>
        
        <h2 style="font-size: 18px; font-weight: 600; color: #111827; margin-top: 20px; margin-bottom: 12px;">8. 附则</h2>
        <p style="margin-bottom: 16px;">本隐私政策适用中华人民共和国法律。如果您与我们之间发生任何与隐私相关的争议，应首先通过友好协商解决；协商不成的，您同意将争议提交至本应用运营公司所在地有管辖权的人民法院诉讼解决。</p>
      </div>
    </div>
    
    <!-- 版权信息 -->
    <div style="text-align: center; font-size: 14px; color: #9ca3af; margin: 20px 0;">
      © {{ new Date().getFullYear() }} 月星防水. All rights reserved.
    </div>
  </div>
</template>

<style scoped>
/* 移除旧样式，使用内联样式替代 */
</style>