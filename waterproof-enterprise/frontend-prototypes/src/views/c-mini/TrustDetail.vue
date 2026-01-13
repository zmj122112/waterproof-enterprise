<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

// 获取路由参数
const type = ref(route.params.type || 'background')

// 根据类型定义页面标题
const pageTitle = computed(() => {
  const titleMap = {
    background: '国企背景',
    standard: '标准化工艺',
    cases: '工程案例'
  }
  return titleMap[type.value] || '信任详情'
})

// 根据类型定义页面内容
const pageContent = computed(() => {
  const contentMap = {
    background: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <!-- 企业资质 -->
        <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h3 style="font-size: 18px; font-weight: bold; color: #333; margin-bottom: 16px;">企业资质</h3>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
            <div style="background: #f9f9f9; border-radius: 8px; padding: 16px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 8px;">🏅</div>
              <div style="font-size: 14px; color: #666;">国企资质证书</div>
            </div>
            <div style="background: #f9f9f9; border-radius: 8px; padding: 16px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 8px;">📜</div>
              <div style="font-size: 14px; color: #666;">建筑防水工程资质</div>
            </div>
          </div>
        </div>
        
        <!-- 70年历史 -->
        <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h3 style="font-size: 18px; font-weight: bold; color: #333; margin-bottom: 16px;">70年历史沿革</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; gap: 12px; align-items: flex-start;">
              <div style="width: 60px; font-size: 14px; font-weight: bold; color: #CC0010;">1956年</div>
              <div style="flex: 1; font-size: 14px; color: #666;">公司成立，隶属于国有建筑集团，专业从事防水工程</div>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start;">
              <div style="width: 60px; font-size: 14px; font-weight: bold; color: #CC0010;">1980年</div>
              <div style="flex: 1; font-size: 14px; color: #666;">成为行业标准制定参与者，推动防水行业规范化发展</div>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start;">
              <div style="width: 60px; font-size: 14px; font-weight: bold; color: #CC0010;">2000年</div>
              <div style="flex: 1; font-size: 14px; color: #666;">通过ISO9001质量管理体系认证，服务覆盖全国</div>
            </div>
            <div style="display: flex; gap: 12px; align-items: flex-start;">
              <div style="width: 60px; font-size: 14px; font-weight: bold; color: #CC0010;">2026年</div>
              <div style="flex: 1; font-size: 14px; color: #666;">70年坚守，累计完成10000+防水工程，客户满意度98%+</div>
            </div>
          </div>
        </div>
        
        <!-- 信任保障 -->
        <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h3 style="font-size: 18px; font-weight: bold; color: #333; margin-bottom: 16px;">信任保障</h3>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; gap: 10px; align-items: flex-start;">
              <div style="font-size: 18px; margin-top: 2px;">✅</div>
              <div style="flex: 1; font-size: 14px; color: #666;">国企背景，稳定经营70年，拒绝"打一枪换一个地方"</div>
            </div>
            <div style="display: flex; gap: 10px; align-items: flex-start;">
              <div style="font-size: 18px; margin-top: 2px;">✅</div>
              <div style="flex: 1; font-size: 14px; color: #666;">正规合同保障，清晰的服务条款和售后承诺</div>
            </div>
            <div style="display: flex; gap: 10px; align-items: flex-start;">
              <div style="font-size: 18px; margin-top: 2px;">✅</div>
              <div style="flex: 1; font-size: 14px; color: #666;">完善的售后服务体系，24小时响应，随叫随到</div>
            </div>
            <div style="display: flex; gap: 10px; align-items: flex-start;">
              <div style="font-size: 18px; margin-top: 2px;">✅</div>
              <div style="flex: 1; font-size: 14px; color: #666;">专业团队，持证上岗，严格的施工标准和质量管控</div>
            </div>
          </div>
        </div>
      </div>
    `,
    standard: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <!-- 服务流程 -->
        <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h3 style="font-size: 18px; font-weight: bold; color: #333; margin-bottom: 16px;">标准化服务流程</h3>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; gap: 16px; align-items: center;">
              <div style="width: 32px; height: 32px; background: #CC0010; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</div>
              <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                <div style="font-weight: bold; color: #333;">免费上门检测</div>
                <div style="font-size: 12px; color: #666;">专业师傅携带检测设备上门，全面检查漏水情况</div>
              </div>
            </div>
            <div style="display: flex; gap: 16px; align-items: center;">
              <div style="width: 32px; height: 32px; background: #CC0010; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</div>
              <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                <div style="font-weight: bold; color: #333;">制定施工方案</div>
                <div style="font-size: 12px; color: #666;">根据检测结果，定制个性化防水解决方案</div>
              </div>
            </div>
            <div style="display: flex; gap: 16px; align-items: center;">
              <div style="width: 32px; height: 32px; background: #CC0010; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</div>
              <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                <div style="font-weight: bold; color: #333;">签订正规合同</div>
                <div style="font-size: 12px; color: #666;">明确服务内容、价格、工期和售后保障</div>
              </div>
            </div>
            <div style="display: flex; gap: 16px; align-items: center;">
              <div style="width: 32px; height: 32px; background: #CC0010; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">4</div>
              <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                <div style="font-weight: bold; color: #333;">标准化施工</div>
                <div style="font-size: 12px; color: #666;">严格按照施工标准执行，确保施工质量</div>
              </div>
            </div>
            <div style="display: flex; gap: 16px; align-items: center;">
              <div style="width: 32px; height: 32px; background: #CC0010; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">5</div>
              <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                <div style="font-weight: bold; color: #333;">验收交付</div>
                <div style="font-size: 12px; color: #666;">施工完成后进行全面验收，确保无漏水隐患</div>
              </div>
            </div>
            <div style="display: flex; gap: 16px; align-items: center;">
              <div style="width: 32px; height: 32px; background: #CC0010; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">6</div>
              <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
                <div style="font-weight: bold; color: #333;">售后保障</div>
                <div style="font-size: 12px; color: #666;">提供10年质保，定期回访，24小时响应</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 检测设备 -->
        <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h3 style="font-size: 18px; font-weight: bold; color: #333; margin-bottom: 16px;">专业检测设备</h3>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
            <div style="background: #f9f9f9; border-radius: 8px; padding: 16px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 8px;">🔍</div>
              <div style="font-weight: bold; margin-bottom: 4px;">红外热成像仪</div>
              <div style="font-size: 12px; color: #666;">精准检测墙体内部漏水点</div>
            </div>
            <div style="background: #f9f9f9; border-radius: 8px; padding: 16px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 8px;">💧</div>
              <div style="font-weight: bold; margin-bottom: 4px;"> moisture meter</div>
              <div style="font-size: 12px; color: #666;">检测墙体湿度，定位漏水源头</div>
            </div>
            <div style="background: #f9f9f9; border-radius: 8px; padding: 16px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 8px;">📏</div>
              <div style="font-weight: bold; margin-bottom: 4px;">激光测距仪</div>
              <div style="font-size: 12px; color: #666;">精确测量施工面积，避免浪费</div>
            </div>
          </div>
        </div>
        
        <!-- 施工标准 -->
        <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h3 style="font-size: 18px; font-weight: bold; color: #333; margin-bottom: 16px;">严格施工标准</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div style="display: flex; gap: 8px; align-items: flex-start;">
              <div style="font-size: 16px; margin-top: 2px;">📌</div>
              <div style="font-size: 13px; color: #666;">基层处理必须平整、干净、干燥</div>
            </div>
            <div style="display: flex; gap: 8px; align-items: flex-start;">
              <div style="font-size: 16px; margin-top: 2px;">📌</div>
              <div style="font-size: 13px; color: #666;">防水材料必须符合国家标准</div>
            </div>
            <div style="display: flex; gap: 8px; align-items: flex-start;">
              <div style="font-size: 16px; margin-top: 2px;">📌</div>
              <div style="font-size: 13px; color: #666;">涂刷厚度均匀，不少于1.5mm</div>
            </div>
            <div style="display: flex; gap: 8px; align-items: flex-start;">
              <div style="font-size: 16px; margin-top: 2px;">📌</div>
              <div style="font-size: 13px; color: #666;">施工环境温度≥5℃，湿度≤85%</div>
            </div>
            <div style="display: flex; gap: 8px; align-items: flex-start;">
              <div style="font-size: 16px; margin-top: 2px;">📌</div>
              <div style="font-size: 13px; color: #666;">阴阳角必须做加强处理</div>
            </div>
            <div style="display: flex; gap: 8px; align-items: flex-start;">
              <div style="font-size: 16px; margin-top: 2px;">📌</div>
              <div style="font-size: 13px; color: #666;">闭水试验≥24小时，无渗漏</div>
            </div>
          </div>
        </div>
      </div>
    `,
    cases: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <!-- 案例介绍 -->
        <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h3 style="font-size: 18px; font-weight: bold; color: #333; margin-bottom: 12px;">成功案例展示</h3>
          <p style="font-size: 14px; color: #666;">多年来，我们累计完成10000+防水工程，以下是部分典型案例：</p>
        </div>
        
        <!-- 案例列表 -->
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <!-- 案例1 -->
          <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <div>
                <h4 style="font-weight: bold; color: #333; margin-bottom: 4px;">某小区屋顶补漏工程</h4>
                <div style="font-size: 12px; color: #999;">类型：屋顶补漏 | 面积：2000㎡ | 工期：7天</div>
              </div>
              <div style="background: #CC0010; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">已完成</div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
              <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 8px;">📉</div>
                <div style="font-weight: bold; margin-bottom: 4px;">施工前</div>
                <div style="font-size: 12px; color: #666;">屋顶多处渗漏，墙体发霉，影响居民生活</div>
              </div>
              <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 8px;">📈</div>
                <div style="font-weight: bold; margin-bottom: 4px;">施工后</div>
                <div style="font-size: 12px; color: #666;">屋顶全面修复，无渗漏，居民满意度100%</div>
              </div>
            </div>
            
            <div style="font-size: 13px; color: #666; line-height: 1.5;">
              该小区建成于2005年，屋顶防水层老化严重，导致多处渗漏。我们采用了SBS改性沥青防水卷材+防水涂料的双层防水方案，彻底解决了渗漏问题，并提供10年质保。
            </div>
          </div>
          
          <!-- 案例2 -->
          <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <div>
                <h4 style="font-weight: bold; color: #333; margin-bottom: 4px;">某酒店卫生间防水改造</h4>
                <div style="font-size: 12px; color: #999;">类型：卫生间防水 | 面积：1200㎡ | 工期：15天</div>
              </div>
              <div style="background: #CC0010; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">已完成</div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
              <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 8px;">📉</div>
                <div style="font-weight: bold; margin-bottom: 4px;">施工前</div>
                <div style="font-size: 12px; color: #666;">卫生间地面和墙面渗漏，影响酒店正常运营</div>
              </div>
              <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 8px;">📈</div>
                <div style="font-weight: bold; margin-bottom: 4px;">施工后</div>
                <div style="font-size: 12px; color: #666;">防水效果良好，酒店恢复正常运营</div>
              </div>
            </div>
            
            <div style="font-size: 13px; color: #666; line-height: 1.5;">
              该酒店共有100间客房，因长期使用导致卫生间防水失效。我们采用了JS防水涂料+丙纶防水卷材的复合防水方案，对所有卫生间进行了全面改造，解决了渗漏问题，确保酒店正常运营。
            </div>
          </div>
          
          <!-- 案例3 -->
          <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <div>
                <h4 style="font-weight: bold; color: #333; margin-bottom: 4px;">某办公楼外墙防水工程</h4>
                <div style="font-size: 12px; color: #999;">类型：外墙防水 | 面积：3000㎡ | 工期：10天</div>
              </div>
              <div style="background: #CC0010; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">已完成</div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
              <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 8px;">📉</div>
                <div style="font-weight: bold; margin-bottom: 4px;">施工前</div>
                <div style="font-size: 12px; color: #666;">外墙瓷砖脱落，墙面渗漏，影响办公环境</div>
              </div>
              <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 8px;">📈</div>
                <div style="font-weight: bold; margin-bottom: 4px;">施工后</div>
                <div style="font-size: 12px; color: #666;">外墙焕然一新，无渗漏，提升了办公楼形象</div>
              </div>
            </div>
            
            <div style="font-size: 13px; color: #666; line-height: 1.5;">
              该办公楼建成于2010年，外墙因长期风吹日晒导致防水失效。我们采用了外墙专用防水涂料+保温层修复的方案，不仅解决了渗漏问题，还提升了外墙的保温性能，受到了客户的高度认可。
            </div>
          </div>
        </div>
        
        <!-- 客户反馈 -->
        <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h3 style="font-size: 18px; font-weight: bold; color: #333; margin-bottom: 16px;">客户反馈</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div style="background: #f9f9f9; border-radius: 8px; padding: 16px;">
              <div style="color: #FFD700; margin-bottom: 8px;">⭐⭐⭐⭐⭐</div>
              <div style="font-size: 13px; color: #666; margin-bottom: 8px;">"师傅很专业，检测仔细，施工规范，修复后再也没有漏水了！"</div>
              <div style="font-weight: bold; color: #333;">— 张女士</div>
            </div>
            <div style="background: #f9f9f9; border-radius: 8px; padding: 16px;">
              <div style="color: #FFD700; margin-bottom: 8px;">⭐⭐⭐⭐⭐</div>
              <div style="font-size: 13px; color: #666; margin-bottom: 8px;">"国企就是不一样，服务有保障，10年质保让我很放心。"</div>
              <div style="font-weight: bold; color: #333;">— 李先生</div>
            </div>
          </div>
        </div>
      </div>
    `
  }
  return contentMap[type.value] || '<div style="text-align: center; padding: 60px 20px; color: #666;">暂无内容</div>'
})

// 返回上一页
const goBack = () => {
  router.back()
}

// 跳转到预约页
const goToAppointment = () => {
  router.push('/c-mini/appointment')
}
</script>

<template>
  <div class="trust-detail-container" style="min-height: 100vh; background-color: #f5f7fa; position: relative;">
    <!-- 顶部导航 -->
    <div class="top-nav" style="background-color: #CC0010; padding: 16px 20px; display: flex; align-items: center; color: white;">
      <div class="back-button" style="cursor: pointer; margin-right: 16px;" @click="goBack">
        <el-icon size="24" color="#fff"><ArrowLeft /></el-icon>
      </div>
      <div class="page-title" style="font-size: 18px; font-weight: bold; color: white;">{{ pageTitle }}</div>
    </div>

    <!-- 内容区域 -->
    <div class="content-area" style="padding: 24px 20px; background-color: white; margin: 16px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <div class="content-placeholder" v-html="pageContent"></div>
    </div>

    <!-- 悬浮转化底栏 -->
    <div class="floating-bottom-bar" style="position: fixed; bottom: 0; left: 0; right: 0; background-color: white; padding: 16px 20px; box-shadow: 0 -4px 12px rgba(0,0,0,0.08);">
      <button class="appointment-button" style="width: 100%; height: 50px; background-color: #CC0010; color: white; border: none; border-radius: 25px; font-size: 18px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;" 
              @click="goToAppointment" 
              @mouseenter="$event.target.style.backgroundColor = '#B3000E'; $event.target.style.transform = 'translateY(-2px)'; $event.target.style.boxShadow = '0 4px 12px rgba(204,0,16,0.3)';" 
              @mouseleave="$event.target.style.backgroundColor = '#CC0010'; $event.target.style.transform = 'translateY(0)'; $event.target.style.boxShadow = 'none';">
        立即预约上门
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 空样式标签，确保Vue SFC格式正确 */
</style>