<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const router = useRouter()

// 施工记录列表数据
const constructionRecords = ref([
  {
    id: 'CR20231015001',
    workOrderId: 'WD20231015001',
    date: '2023-10-15',
    content: '完成卫生间防水施工',
    status: '已提交',
    photos: 3
  },
  {
    id: 'CR20231014001',
    workOrderId: 'WD20231014001',
    date: '2023-10-14',
    content: '完成厨房防水检测',
    status: '已提交',
    photos: 2
  }
])

// 模拟工单数据
const workOrders = ref([
  { id: 'WD20231015001', name: '卫生间防水施工' },
  { id: 'WD20231014001', name: '厨房防水检测' },
  { id: 'WD20231013001', name: '阳台防水维修' }
])

// 新增施工记录弹窗状态
const dialogVisible = ref(false)

// 表单数据
const form = reactive({
  workOrderId: '',
  date: new Date(),
  content: '',
  photos: []
})

// 表单验证规则
const rules = {
  workOrderId: [
    { required: true, message: '请选择关联工单', trigger: 'change' }
  ],
  date: [
    { required: true, message: '请选择施工日期', trigger: 'change' }
  ],
  content: [
    { required: true, message: '请输入施工内容', trigger: 'blur' },
    { min: 5, message: '施工内容不能少于5个字符', trigger: 'blur' }
  ]
}

// 表单引用
const formRef = ref(null)

// 新增施工记录
const addConstructionRecord = () => {
  dialogVisible.value = true
}

// 查看施工记录详情
const viewConstructionRecord = (record) => {
  router.push(`/master-app/construction-record/${record.id}`)
}

// 表单提交
const submitForm = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    // 模拟提交数据
    const newRecord = {
      id: `CR${new Date().getTime()}`,
      workOrderId: form.workOrderId,
      date: form.date.toISOString().split('T')[0],
      content: form.content,
      status: '已提交',
      photos: form.photos.length
    }
    
    // 添加到列表
    constructionRecords.value.unshift(newRecord)
    
    // 关闭弹窗并重置表单
    dialogVisible.value = false
    resetForm()
    
    ElMessage.success('新增施工记录成功')
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

// 重置表单
const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
  form.photos = []
}

// 关闭弹窗
const closeDialog = () => {
  dialogVisible.value = false
  resetForm()
}

// 处理照片上传
const handlePhotoUpload = (file) => {
  // 这里只是模拟上传，实际项目中应该调用真实的上传接口
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = (e) => {
    form.photos.push(e.target.result)
  }
  return false // 阻止默认上传行为
}

// 删除照片
const removePhoto = (index) => {
  form.photos.splice(index, 1)
}
</script>

<template>
  <div class="construction-record-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
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
        
        <div class="page-title" style="color: white; font-size: 24px; font-weight: bold; margin: 0;">施工记录</div>
      </div>
    </div>

    <!-- 操作按钮 - 浮动白色卡片 -->
    <div style="margin: -20px 20px 20px; background-color: white; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 16px; position: relative; z-index: 10;">
      <el-button type="danger" round size="small" style="width: 100%; height: 44px; font-size: 16px;" @click="addConstructionRecord">
        <Plus style="margin-right: 8px;" />
        新增施工记录
      </el-button>
    </div>

    <!-- 施工记录列表 - 浮动白色卡片 -->
    <div style="margin: 0 20px; position: relative; z-index: 10;">
      <div 
        v-for="record in constructionRecords" 
        :key="record.id" 
        style="background-color: white; border: 1px solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); padding: 16px; margin-bottom: 16px; transition: all 0.3s ease;"
      >
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0;">
          <div style="font-size: 14px; font-weight: 600; color: #111827;">记录编号：{{ record.id }}</div>
          <el-tag :type="record.status === '已提交' ? 'success' : 'warning'" size="small" style="font-size: 12px; padding: 4px 12px;">
            {{ record.status }}
          </el-tag>
        </div>
        
        <div style="margin-bottom: 16px;">
          <div style="display: flex; flex-wrap: wrap; margin-bottom: 8px;">
            <span style="width: 80px; font-weight: 500; color: #111827; margin-right: 16px;">关联工单：</span>
            <span style="flex: 1; color: #6b7280; line-height: 1.5;">{{ record.workOrderId }}</span>
          </div>
          <div style="display: flex; flex-wrap: wrap; margin-bottom: 8px;">
            <span style="width: 80px; font-weight: 500; color: #111827; margin-right: 16px;">施工日期：</span>
            <span style="flex: 1; color: #6b7280; line-height: 1.5;">{{ record.date }}</span>
          </div>
          <div style="display: flex; flex-wrap: wrap; margin-bottom: 8px;">
            <span style="width: 80px; font-weight: 500; color: #111827; margin-right: 16px;">施工内容：</span>
            <span style="flex: 1; color: #6b7280; line-height: 1.5;">{{ record.content }}</span>
          </div>
          <div style="display: flex; flex-wrap: wrap;">
            <span style="width: 80px; font-weight: 500; color: #111827; margin-right: 16px;">施工照片：</span>
            <el-tag type="primary" size="small">{{ record.photos }}张</el-tag>
          </div>
        </div>
        
        <div style="display: flex; justify-content: flex-end;">
          <el-button
            type="primary"
            round
            size="small"
            @click="viewConstructionRecord(record)"
          >
            查看详情
          </el-button>
        </div>
      </div>
    </div>

    <!-- 新增施工记录弹窗 -->
    <el-dialog
      title="新增施工记录"
      v-model="dialogVisible"
      width="90%"
      :before-close="closeDialog"
      center
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px" style="max-height: 60vh; overflow-y: auto;">
        <el-form-item label="关联工单" prop="workOrderId">
          <el-select v-model="form.workOrderId" placeholder="请选择关联工单" style="width: 100%;">
            <el-option
              v-for="workOrder in workOrders"
              :key="workOrder.id"
              :label="workOrder.id + ' - ' + workOrder.name"
              :value="workOrder.id"
            ></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="施工日期" prop="date">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="请选择施工日期"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        
        <el-form-item label="施工内容" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="4"
            placeholder="请输入施工内容"
            style="width: 100%;"
          ></el-input>
        </el-form-item>
        
        <el-form-item label="施工照片">
          <el-upload
            :limit="9"
            :file-list="[]"
            :auto-upload="false"
            :on-change="handlePhotoUpload"
            list-type="picture-card"
            accept="image/*"
          >
            <Plus />
            <template #tip>
              <div style="margin-top: 8px; font-size: 12px; color: #909399;">
                最多上传9张照片
              </div>
            </template>
          </el-upload>
          
          <!-- 照片预览 -->
          <div v-if="form.photos.length > 0" style="margin-top: 16px;">
            <div style="font-size: 12px; color: #606266; margin-bottom: 8px;">已上传照片：</div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <div
                v-for="(photo, index) in form.photos"
                :key="index"
                style="position: relative; width: 80px; height: 80px; border-radius: 4px; overflow: hidden;"
              >
                <img :src="photo" style="width: 100%; height: 100%; object-fit: cover;" alt="施工照片" />
                <el-button
                  type="text"
                  size="small"
                  style="position: absolute; top: 0; right: 0; color: white; background: rgba(0, 0, 0, 0.5); padding: 0; width: 20px; height: 20px; line-height: 20px; border-radius: 0;"
                  @click.stop="removePhoto(index)"
                >
                  ✕
                </el-button>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
/* 空样式标签，确保Vue SFC格式正确 */
</style>