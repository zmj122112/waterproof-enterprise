<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 报修列表数据
const repairList = ref([
  {
    id: 1,
    buildingName: '科技园区A栋',
    location: '5楼卫生间',
    type: '渗水',
    description: '5楼男卫生间顶部渗水',
    status: '已受理',
    createTime: '2024-06-15 14:30:00',
    updateTime: '2024-06-15 15:00:00'
  },
  {
    id: 2,
    buildingName: '科技园区A栋',
    location: '屋顶',
    type: '漏水',
    description: '屋顶东南角漏水',
    status: '处理中',
    createTime: '2024-06-10 09:15:00',
    updateTime: '2024-06-10 10:30:00'
  },
  {
    id: 3,
    buildingName: '住宅小区B区',
    location: '2号楼3单元卫生间',
    type: '渗水',
    description: '2号楼3单元201室卫生间渗水',
    status: '已完成',
    createTime: '2024-06-05 16:45:00',
    updateTime: '2024-06-08 14:00:00'
  }
])

// 报修状态颜色映射
const statusColorMap = {
  '待受理': 'warning',
  '已受理': 'info',
  '处理中': 'primary',
  '已完成': 'success',
  '已取消': 'danger'
}

// 漏水位置选项
const locationOptions = [
  { label: '卫生间', value: '卫生间' },
  { label: '厨房', value: '厨房' },
  { label: '屋顶', value: '屋顶' },
  { label: '阳台', value: '阳台' },
  { label: '外墙', value: '外墙' },
  { label: '其他', value: '其他' }
]

// 漏水类型选项
const typeOptions = [
  { label: '渗水', value: '渗水' },
  { label: '漏水', value: '漏水' },
  { label: '裂缝', value: '裂缝' },
  { label: '其他', value: '其他' }
]

// 弹窗相关
const dialogVisible = ref(false)
const formData = ref({
  buildingId: '',
  buildingName: '',
  location: '',
  type: '',
  description: ''
})

// 查看报修详情
const viewRepairDetail = (id) => {
  // 跳转到报修详情页面
  window.location.href = `/b-portal/repair-detail/${id}`
}

// 打开报修弹窗
const openRepairDialog = () => {
  dialogVisible.value = true
  // 重置表单
  formData.value = {
    buildingId: '',
    buildingName: '',
    location: '',
    type: '',
    description: ''
  }
}

// 提交报修
const submitRepair = () => {
  // 这里可以添加表单验证
  repairList.value.unshift({
    id: repairList.value.length + 1,
    ...formData.value,
    status: '待受理',
    createTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
    updateTime: new Date().toISOString().replace('T', ' ').substring(0, 19)
  })
  dialogVisible.value = false
  ElMessage.success('报修信息提交成功')
}
</script>

<template>
  <div class="repair-center-container">
    <div class="page-header">
      <h1 class="page-title">报修中心</h1>
      <el-button type="primary" @click="openRepairDialog" class="add-repair-btn">
        <el-icon><circle-plus /></el-icon> 新增报修
      </el-button>
    </div>
    
    <!-- 报修列表 -->
    <div class="repair-list">
      <div v-if="repairList.length === 0" class="empty-repair">
        <el-icon class="empty-icon"><document /></el-icon>
        <p>暂无报修记录</p>
      </div>
      
      <el-card 
        v-else
        v-for="repair in repairList" 
        :key="repair.id" 
        class="repair-card"
      >
        <div class="card-header">
          <div class="repair-info">
            <h3 class="building-name">{{ repair.buildingName }}</h3>
            <p class="repair-location">{{ repair.location }}</p>
          </div>
          <el-tag :type="statusColorMap[repair.status]">{{ repair.status }}</el-tag>
        </div>
        
        <div class="card-content">
          <el-row :gutter="16">
            <el-col :xs="12">
              <div class="info-item">
                <span class="label">漏水类型：</span>
                <span class="value">{{ repair.type }}</span>
              </div>
            </el-col>
            <el-col :xs="12">
              <div class="info-item">
                <span class="label">提交时间：</span>
                <span class="value">{{ repair.createTime }}</span>
              </div>
            </el-col>
          </el-row>
          
          <div class="repair-description">
            <p class="description-content">{{ repair.description }}</p>
          </div>
        </div>
        
        <div class="card-actions">
          <el-button
            type="primary"
            size="large"
            block
            @click="viewRepairDetail(repair.id)"
          >
            查看详情
          </el-button>
        </div>
      </el-card>
    </div>
    
    <!-- 新增报修弹窗 -->
    <el-dialog
      title="新增报修"
      v-model="dialogVisible"
      width="90%"
      :fullscreen="false"
    >
      <el-form
        :model="formData"
        label-width="80px"
        size="large"
      >
        <el-form-item label="建筑" required>
          <el-select v-model="formData.buildingName" placeholder="请选择建筑" size="large">
            <el-option label="科技园区A栋" value="科技园区A栋" />
            <el-option label="住宅小区B区" value="住宅小区B区" />
            <el-option label="商业中心C座" value="商业中心C座" />
          </el-select>
        </el-form-item>
        <el-form-item label="位置" required>
          <el-select v-model="formData.location" placeholder="请选择漏水位置" size="large">
            <el-option
              v-for="option in locationOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="类型" required>
          <el-select v-model="formData.type" placeholder="请选择漏水类型" size="large">
            <el-option
              v-for="option in typeOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="描述" required>
          <el-input
            v-model="formData.description"
            type="textarea"
            :rows="4"
            placeholder="请详细描述漏水情况"
            size="large"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="large" @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" size="large" @click="submitRepair">提交报修</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.repair-center-container {
  padding: 0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  margin: 0;
}

.add-repair-btn {
  display: flex;
  align-items: center;
  gap: 6px;
}

.repair-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.empty-repair {
  text-align: center;
  padding: 40px 0;
  color: #909399;
}

.empty-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.repair-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  border-radius: 8px;
  overflow: hidden;
}

.repair-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e8e8e8;
}

.repair-info {
  flex: 1;
}

.building-name {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  margin: 0 0 4px 0;
}

.repair-location {
  font-size: 13px;
  color: #666666;
  margin: 0;
  line-height: 1.4;
}

.card-content {
  margin-bottom: 16px;
}

.info-item {
  display: flex;
  margin-bottom: 8px;
  font-size: 13px;
  flex-wrap: wrap;
  align-items: center;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-item .label {
  width: 70px;
  font-weight: 500;
  color: #333333;
  margin-right: 8px;
}

.info-item .value {
  flex: 1;
  color: #666666;
  line-height: 1.5;
}

.repair-description {
  margin-top: 12px;
  padding: 12px;
  background-color: #f5f7fa;
  border-radius: 6px;
}

.description-content {
  font-size: 13px;
  color: #666666;
  line-height: 1.6;
  margin: 0;
}

.card-actions {
  margin-top: 16px;
}

.card-actions .el-button {
  height: 40px;
  font-size: 14px;
}

.dialog-footer {
  display: flex;
  justify-content: stretch;
  gap: 8px;
}

.dialog-footer .el-button {
  flex: 1;
  height: 44px;
}
</style>