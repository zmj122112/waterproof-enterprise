<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 报修列表数据
const repairList = ref([
  {
    id: 1,
    company: '某企业A',
    contact: '张三',
    phone: '13800138000',
    location: '卫生间',
    type: '渗水',
    time: '2023-10-15',
    status: '待审核'
  },
  {
    id: 2,
    company: '某企业B',
    contact: '李四',
    phone: '13900139000',
    location: '屋顶',
    type: '漏水',
    time: '2023-10-15',
    status: '已通过'
  },
  {
    id: 3,
    company: '某企业C',
    contact: '王五',
    phone: '13700137000',
    location: '阳台',
    type: '渗水',
    time: '2023-10-16',
    status: '已驳回'
  }
])

// 选中的报修项
const selectedRepairs = ref([])

// 在线填写弹窗
const onlineFormVisible = ref(false)

// 表单数据
const formData = ref({
  company: '',
  contact: '',
  phone: '',
  location: '',
  type: ''
})

// 表单验证规则
const formRules = ref({
  company: [{ required: true, message: '请输入报修单位', trigger: 'blur' }],
  contact: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  location: [{ required: true, message: '请选择漏水位置', trigger: 'change' }],
  type: [{ required: true, message: '请选择漏水类型', trigger: 'change' }]
})

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

// 下载Excel模板
const downloadTemplate = () => {
  ElMessage.success('模板下载成功')
  console.log('下载Excel模板')
}

// 导入Excel
const importExcel = () => {
  ElMessage.success('Excel导入成功')
  console.log('导入Excel')
}

// 打开在线填写弹窗
const openOnlineForm = () => {
  onlineFormVisible.value = true
  formData.value = {
    company: '',
    contact: '',
    phone: '',
    location: '',
    type: ''
  }
}

// 提交在线填写表单
const submitOnlineForm = () => {
  // 这里可以添加表单验证
  repairList.value.unshift({
    id: repairList.value.length + 1,
    ...formData.value,
    time: new Date().toISOString().split('T')[0],
    status: '待审核'
  })
  onlineFormVisible.value = false
  ElMessage.success('报修信息提交成功')
}

// 批量删除
const batchDelete = () => {
  if (selectedRepairs.value.length === 0) {
    ElMessage.warning('请选择要删除的报修项')
    return
  }
  ElMessageBox.confirm('确定要删除选中的报修项吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    repairList.value = repairList.value.filter(item => !selectedRepairs.value.includes(item.id))
    selectedRepairs.value = []
    ElMessage.success('删除成功')
  }).catch(() => {
    // 取消删除
  })
}

// 查看详情
const viewDetail = (item) => {
  ElMessage.info(`查看报修详情：${item.id}`)
  console.log('查看详情:', item)
}

// 编辑报修
const editRepair = (item) => {
  ElMessage.info(`编辑报修：${item.id}`)
  console.log('编辑报修:', item)
}
</script>

<template>
  <div class="batch-repair-page">
    <div class="page-header">
      <h1 class="page-title">批量报修</h1>
    </div>

    <!-- 操作按钮组 -->
    <div class="operation-buttons">
      <el-button type="primary" size="large" block @click="openOnlineForm" class="operation-btn">
        <el-icon><Edit /></el-icon>
        在线填写
      </el-button>
      <div class="operation-row">
        <el-button type="success" size="large" @click="downloadTemplate" class="operation-btn-small">
          <el-icon><Download /></el-icon>
          下载模板
        </el-button>
        <el-button type="warning" size="large" @click="importExcel" class="operation-btn-small">
          <el-icon><Upload /></el-icon>
          导入Excel
        </el-button>
      </div>
    </div>

    <!-- 报修列表 -->
    <div class="repair-list">
      <el-card 
        v-for="repair in repairList" 
        :key="repair.id" 
        class="repair-card"
      >
        <div class="card-header">
          <div class="repair-company">{{ repair.company }}</div>
          <el-tag :type="repair.status === '待审核' ? 'warning' : repair.status === '已通过' ? 'success' : 'danger'" size="small">
            {{ repair.status }}
          </el-tag>
        </div>
        
        <div class="card-content">
          <div class="info-item">
            <span class="label">联系人：</span>
            <span class="value">{{ repair.contact }}</span>
          </div>
          <div class="info-item">
            <span class="label">手机号：</span>
            <span class="value">{{ repair.phone }}</span>
          </div>
          <div class="info-item">
            <span class="label">漏水位置：</span>
            <span class="value">{{ repair.location }}</span>
          </div>
          <div class="info-item">
            <span class="label">漏水类型：</span>
            <span class="value">{{ repair.type }}</span>
          </div>
          <div class="info-item">
            <span class="label">报修时间：</span>
            <span class="value">{{ repair.time }}</span>
          </div>
        </div>
        
        <div class="card-actions">
          <el-button
            type="primary"
            size="large"
            block
            @click="viewDetail(repair)"
          >
            查看详情
          </el-button>
          <el-button
            type="success"
            size="large"
            block
            @click="editRepair(repair)"
          >
            编辑
          </el-button>
        </div>
      </el-card>
    </div>

    <!-- 在线填写弹窗 -->
    <el-dialog
      title="在线填写报修信息"
      v-model="onlineFormVisible"
      width="90%"
      :fullscreen="false"
    >
      <el-form
        :model="formData"
        label-width="80px"
        size="large"
      >
        <el-form-item label="单位" prop="company">
          <el-input v-model="formData.company" placeholder="请输入报修单位" size="large" />
        </el-form-item>
        <el-form-item label="联系人" prop="contact">
          <el-input v-model="formData.contact" placeholder="请输入联系人" size="large" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入手机号" size="large" />
        </el-form-item>
        <el-form-item label="位置" prop="location">
          <el-select v-model="formData.location" placeholder="请选择漏水位置" size="large">
            <el-option
              v-for="option in locationOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="formData.type" placeholder="请选择漏水类型" size="large">
            <el-option
              v-for="option in typeOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="large" @click="onlineFormVisible = false">取消</el-button>
          <el-button type="primary" size="large" @click="submitOnlineForm">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.batch-repair-page {
  padding: 0;
}

.page-header {
  margin-bottom: 16px;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  margin: 0;
}

/* 操作按钮组 */
.operation-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.operation-row {
  display: flex;
  gap: 12px;
}

.operation-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  font-size: 14px;
}

.operation-btn-small {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 44px;
  font-size: 14px;
}

.operation-btn .el-icon,
.operation-btn-small .el-icon {
  margin-right: 6px;
}

/* 报修列表 */
.repair-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
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
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e8e8e8;
}

.repair-company {
  font-size: 16px;
  font-weight: 500;
  color: #333333;
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

.card-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-actions .el-button {
  height: 40px;
  font-size: 14px;
}

/* 弹窗 */
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