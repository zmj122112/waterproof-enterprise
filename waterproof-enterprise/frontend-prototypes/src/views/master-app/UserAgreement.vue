<script setup>
import { ref } from 'vue'
</script>

<template>
  <div class="user-agreement-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
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
        
        <div class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">用户协议</div>
      </div>
    </div>

    <!-- 用户协议内容卡片 - 浮动白色卡片 -->
    <div style="margin: -20px 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 20px; position: relative; z-index: 10;">
      <!-- 协议更新日期 -->
      <div style="font-size: 14px; color: #9ca3af; text-align: center; margin-bottom: 24px;">
        本协议更新于：{{ new Date().getFullYear() }}年{{ new Date().getMonth() + 1 }}月{{ new Date().getDate() }}日
      </div>
      
      <!-- 协议正文 -->
      <div style="font-size: 14px; color: #6b7280; line-height: 1.8;">
        <h2 style="font-size: 18px; font-weight: 600; color: #111827; margin-top: 20px; margin-bottom: 12px;">1. 协议概述</h2>
        <p style="margin-bottom: 16px;">欢迎使用月星防水师傅端应用（以下简称"本应用"）。本用户协议（以下简称"本协议"）是您与月星防水之间关于您使用本应用的法律协议。请您仔细阅读本协议的全部内容，特别是加粗或下划线标注的条款。</p>
        <p style="margin-bottom: 16px;">您通过注册、登录、使用等方式使用本应用，即表示您已阅读并同意本协议的全部内容。如果您不同意本协议的任何条款，请您立即停止使用本应用。</p>
        
        <h2 style="font-size: 18px; font-weight: 600; color: #111827; margin-top: 20px; margin-bottom: 12px;">2. 服务内容</h2>
        <p style="margin-bottom: 16px;">2.1 本应用为师傅提供工单接收、施工记录、完工确认、积分管理等服务。</p>
        <p style="margin-bottom: 16px;">2.2 我们有权根据业务发展需要，随时调整、增加或减少服务内容，无需另行通知您。</p>
        
        <h2 style="font-size: 18px; font-weight: 600; color: #111827; margin-top: 20px; margin-bottom: 12px;">3. 用户权利和义务</h2>
        <p style="margin-bottom: 12px;">3.1 用户权利</p>
        <ul style="margin-bottom: 16px; padding-left: 20px;">
          <li style="margin-bottom: 8px;">有权使用本应用提供的各项服务；</li>
          <li style="margin-bottom: 8px;">有权获取服务相关的信息和支持；</li>
          <li style="margin-bottom: 8px;">有权对服务提出建议和意见；</li>
          <li style="margin-bottom: 8px;">有权维护自身合法权益。</li>
        </ul>
        
        <p style="margin-bottom: 12px;">3.2 用户义务</p>
        <ul style="margin-bottom: 16px; padding-left: 20px;">
          <li style="margin-bottom: 8px;">提供真实、准确、完整的个人信息；</li>
          <li style="margin-bottom: 8px;">遵守国家法律法规和本协议的约定；</li>
          <li style="margin-bottom: 8px;">不得利用本应用从事违法违规活动；</li>
          <li style="margin-bottom: 8px;">不得损害平台和其他用户的合法权益；</li>
          <li style="margin-bottom: 8px;">妥善保管账户信息，对账户行为负责；</li>
          <li style="margin-bottom: 8px;">不得干扰平台的正常运营；</li>
          <li style="margin-bottom: 8px;">不得复制、修改、传播本应用的任何内容。</li>
        </ul>
        
        <h2 style="font-size: 18px; font-weight: 600; color: #111827; margin-top: 20px; margin-bottom: 12px;">4. 平台权利和义务</h2>
        <p style="margin-bottom: 12px;">4.1 平台权利</p>
        <ul style="margin-bottom: 16px; padding-left: 20px;">
          <li style="margin-bottom: 8px;">有权制定和修改服务规则；</li>
          <li style="margin-bottom: 8px;">有权审核用户信息和服务内容；</li>
          <li style="margin-bottom: 8px;">有权对违规行为进行处理；</li>
          <li style="margin-bottom: 8px;">有权终止或暂停服务；</li>
          <li style="margin-bottom: 8px;">有权收集、使用和处理用户信息；</li>
          <li style="margin-bottom: 8px;">有权调整服务费用和支付方式。</li>
        </ul>
        
        <p style="margin-bottom: 12px;">4.2 平台义务</p>
        <ul style="margin-bottom: 16px; padding-left: 20px;">
          <li style="margin-bottom: 8px;">提供稳定、安全的服务；</li>
          <li style="margin-bottom: 8px;">保护用户的个人信息安全；</li>
          <li style="margin-bottom: 8px;">提供有效的客户支持；</li>
          <li style="margin-bottom: 8px;">遵守法律法规和商业道德；</li>
          <li style="margin-bottom: 8px;">履行服务承诺和约定。</li>
        </ul>
        
        <h2 style="font-size: 18px; font-weight: 600; color: #111827; margin-top: 20px; margin-bottom: 12px;">5. 服务费用</h2>
        <p style="margin-bottom: 16px;">5.1 本应用的部分服务可能需要支付费用。具体费用标准和支付方式将在服务页面或订单中明确说明。</p>
        <p style="margin-bottom: 16px;">5.2 您应按照约定支付服务费用。逾期未支付的，我们有权暂停或终止服务，并要求您承担违约责任。</p>
        
        <h2 style="font-size: 18px; font-weight: 600; color: #111827; margin-top: 20px; margin-bottom: 12px;">6. 知识产权</h2>
        <p style="margin-bottom: 16px;">6.1 本应用及其包含的所有内容（包括但不限于文字、图片、音频、视频、软件、图标、商标、专利等）的知识产权均归我们所有或已获得合法授权。</p>
        <p style="margin-bottom: 16px;">6.2 未经我们书面授权，您不得复制、修改、传播、出售、出租或利用本应用的任何内容。</p>
        
        <h2 style="font-size: 18px; font-weight: 600; color: #111827; margin-top: 20px; margin-bottom: 12px;">7. 隐私保护</h2>
        <p style="margin-bottom: 16px;">我们重视您的隐私保护，将按照《隐私政策》的约定收集、使用和保护您的个人信息。请您仔细阅读《隐私政策》，了解我们的隐私保护措施。</p>
        
        <h2 style="font-size: 18px; font-weight: 600; color: #111827; margin-top: 20px; margin-bottom: 12px;">8. 违约责任</h2>
        <p style="margin-bottom: 12px;">8.1 任何一方违反本协议的约定，应承担违约责任，赔偿对方因此遭受的损失。</p>
        <p style="margin-bottom: 16px;">8.2 因您违反本协议或法律法规的规定，导致我们或第三方遭受损失的，您应承担全部赔偿责任。</p>
        
        <h2 style="font-size: 18px; font-weight: 600; color: #111827; margin-top: 20px; margin-bottom: 12px;">9. 协议变更和终止</h2>
        <p style="margin-bottom: 12px;">9.1 我们有权根据业务发展或法律法规的变化，随时修改本协议的内容。修改后的协议将在应用内公告或通过其他方式通知您。</p>
        <p style="margin-bottom: 12px;">9.2 您有权随时终止使用本应用。您可以通过注销账户或停止使用的方式终止协议。</p>
        <p style="margin-bottom: 16px;">9.3 如您违反本协议的约定，我们有权随时终止您的账户和服务，并不承担任何责任。</p>
        
        <h2 style="font-size: 18px; font-weight: 600; color: #111827; margin-top: 20px; margin-bottom: 12px;">10. 法律适用和争议解决</h2>
        <p style="margin-bottom: 16px;">10.1 本协议适用中华人民共和国法律。</p>
        <p style="margin-bottom: 16px;">10.2 如果您与我们之间发生任何争议，应首先通过友好协商解决；协商不成的，您同意将争议提交至本应用运营公司所在地有管辖权的人民法院诉讼解决。</p>
        
        <h2 style="font-size: 18px; font-weight: 600; color: #111827; margin-top: 20px; margin-bottom: 12px;">11. 附则</h2>
        <p style="margin-bottom: 16px;">11.1 本协议自您使用本应用之日起生效，直至您停止使用本应用或协议终止。</p>
        <p style="margin-bottom: 16px;">11.2 本协议的任何条款被认定为无效或不可执行，不影响其他条款的效力。</p>
        <p style="margin-bottom: 16px;">11.3 我们未行使或延迟行使本协议项下的任何权利，不构成对该权利的放弃。</p>
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