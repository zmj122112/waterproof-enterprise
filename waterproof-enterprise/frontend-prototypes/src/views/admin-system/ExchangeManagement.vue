<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

// 商品列表数据
const productList = ref([
  {
    id: 'P001',
    name: '防水工具箱',
    category: '工具类',
    score: 500,
    stock: 10,
    status: '上架',
    description: '专业防水施工工具箱，包含各种常用工具',
    image: 'https://via.placeholder.com/100'
  },
  {
    id: 'P002',
    name: '防水手套',
    category: '防护类',
    score: 100,
    stock: 50,
    status: '上架',
    description: '耐用防水手套，保护双手安全',
    image: 'https://via.placeholder.com/100'
  },
  {
    id: 'P003',
    name: '积分兑换券',
    category: '虚拟类',
    score: 200,
    stock: 100,
    status: '上架',
    description: '50元现金兑换券，可用于购买防水材料',
    image: 'https://via.placeholder.com/100'
  }
])

// 兑换记录数据
const exchangeRecords = ref([
  {
    id: 'E001',
    productId: 'P001',
    productName: '防水工具箱',
    masterId: 'S001',
    masterName: '李师傅',
    exchangeTime: '2023-10-15 10:30:00',
    score: 500,
    status: '已兑换'
  },
  {
    id: 'E002',
    productId: 'P002',
    productName: '防水手套',
    masterId: 'S002',
    masterName: '王师傅',
    exchangeTime: '2023-10-16 09:15:00',
    score: 100,
    status: '已兑换'
  },
  {
    id: 'E003',
    productId: 'P003',
    productName: '积分兑换券',
    masterId: 'S003',
    masterName: '张师傅',
    exchangeTime: '2023-10-17 14:20:00',
    score: 200,
    status: '待审核'
  }
])

// 商品分类选项
const categoryOptions = ['工具类', '防护类', '虚拟类', '其他']

// 商品状态选项
const statusOptions = ['上架', '下架']

// 兑换状态选项
const exchangeStatusOptions = ['待审核', '已兑换', '已拒绝']

// 表单数据
const productForm = ref({
  name: '',
  category: '',
  score: 0,
  stock: 0,
  status: '上架',
  description: '',
  image: ''
})

// 表单对话框显示状态
const dialogVisible = ref(false)

// 表单类型：add 或 edit
const formType = ref('add')

// 当前编辑的商品ID
const currentProductId = ref('')

// 新增商品
const addProduct = () => {
  formType.value = 'add'
  productForm.value = {
    name: '',
    category: '',
    score: 0,
    stock: 0,
    status: '上架',
    description: '',
    image: ''
  }
  dialogVisible.value = true
}

// 编辑商品
const editProduct = (product) => {
  formType.value = 'edit'
  currentProductId.value = product.id
  productForm.value = { ...product }
  dialogVisible.value = true
}

// 删除商品
const deleteProduct = (product) => {
  ElMessageBox.confirm(`确定要删除商品 "${product.name}" 吗？`, '删除确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const index = productList.value.findIndex(item => item.id === product.id)
    if (index !== -1) {
      productList.value.splice(index, 1)
      ElMessage.success('商品删除成功')
    }
  }).catch(() => {
    ElMessage.info('已取消删除')
  })
}

// 保存商品
const saveProduct = () => {
  if (!productForm.value.name || !productForm.value.category || productForm.value.score <= 0 || productForm.value.stock < 0) {
    ElMessage.error('请填写完整的商品信息')
    return
  }
  
  if (formType.value === 'add') {
    // 新增商品
    const newProduct = {
      id: 'P' + (productList.value.length + 1).toString().padStart(3, '0'),
      ...productForm.value
    }
    productList.value.push(newProduct)
    ElMessage.success('商品添加成功')
  } else {
    // 编辑商品
    const index = productList.value.findIndex(item => item.id === currentProductId.value)
    if (index !== -1) {
      productList.value[index] = { ...productForm.value }
      ElMessage.success('商品编辑成功')
    }
  }
  
  dialogVisible.value = false
}

// 审核兑换记录
const auditExchange = (record, status) => {
  ElMessageBox.confirm(`确定要${status === '已兑换' ? '通过' : '拒绝'}该兑换申请吗？`, '审核确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const index = exchangeRecords.value.findIndex(item => item.id === record.id)
    if (index !== -1) {
      exchangeRecords.value[index].status = status
      ElMessage.success(`兑换申请已${status === '已兑换' ? '通过' : '拒绝'}`)
    }
  }).catch(() => {
    ElMessage.info('已取消审核')
  })
}
</script>

<template>
  <div class="exchange-management-page">
    <div class="page-header">
      <h1 class="page-title">积分兑换管理</h1>
    </div>

    <!-- 商品管理 -->
    <el-card class="product-management-card">
      <template #header>
        <div class="card-header">
          <span>商品管理</span>
          <el-button type="primary" @click="addProduct">
            <el-icon><Plus /></el-icon>
            新增商品
          </el-button>
        </div>
      </template>
      
      <!-- 商品列表 -->
      <el-table
        :data="productList"
        style="width: 100%"
        stripe
      >
        <el-table-column
          prop="id"
          label="商品编号"
          width="100"
        />
        <el-table-column
          prop="name"
          label="商品名称"
          width="150"
        >
          <template #default="scope">
            <div class="product-info">
              <img :src="scope.row.image" alt="" class="product-image" />
              <span>{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="category"
          label="商品分类"
          width="120"
        >
          <template #default="scope">
            <el-tag>{{ scope.row.category }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="score"
          label="所需积分"
          width="120"
        >
          <template #default="scope">
            <span class="score-text">{{ scope.row.score }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="stock"
          label="库存数量"
          width="120"
        />
        <el-table-column
          prop="status"
          label="状态"
          width="100"
        >
          <template #default="scope">
            <el-tag :type="scope.row.status === '上架' ? 'success' : 'danger'">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="商品描述"
        />
        <el-table-column
          label="操作"
          width="200"
          fixed="right"
        >
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="editProduct(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="deleteProduct(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 兑换记录管理 -->
    <el-card class="exchange-records-card">
      <template #header>
        <div class="card-header">
          <span>兑换记录管理</span>
        </div>
      </template>
      
      <!-- 兑换记录列表 -->
      <el-table
        :data="exchangeRecords"
        style="width: 100%"
        stripe
      >
        <el-table-column
          prop="id"
          label="记录编号"
          width="120"
        />
        <el-table-column
          prop="productName"
          label="兑换商品"
          width="150"
        />
        <el-table-column
          prop="masterName"
          label="兑换师傅"
          width="120"
        />
        <el-table-column
          prop="exchangeTime"
          label="兑换时间"
          width="180"
        />
        <el-table-column
          prop="score"
          label="消耗积分"
          width="120"
        >
          <template #default="scope">
            <span class="score-text">{{ scope.row.score }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="120"
        >
          <template #default="scope">
            <el-tag
              :type="scope.row.status === '已兑换' ? 'success' : (scope.row.status === '待审核' ? 'warning' : 'danger')"
            >
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          fixed="right"
        >
          <template #default="scope">
            <el-button
              v-if="scope.row.status === '待审核'"
              type="success"
              size="small"
              @click="auditExchange(scope.row, '已兑换')"
            >
              通过
            </el-button>
            <el-button
              v-if="scope.row.status === '待审核'"
              type="danger"
              size="small"
              @click="auditExchange(scope.row, '已拒绝')"
            >
              拒绝
            </el-button>
            <el-button
              v-else
              type="primary"
              size="small"
              disabled
            >
              已处理
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 商品表单对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="formType === 'add' ? '新增商品' : '编辑商品'"
      width="600px"
    >
      <el-form :model="productForm" label-width="100px">
        <el-form-item label="商品名称" required>
          <el-input v-model="productForm.name" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="商品分类" required>
          <el-select v-model="productForm.category" placeholder="请选择商品分类" style="width: 100%">
            <el-option
              v-for="option in categoryOptions"
              :key="option"
              :label="option"
              :value="option"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所需积分" required>
          <el-input-number v-model="productForm.score" :min="1" :step="10" style="width: 100%" />
        </el-form-item>
        <el-form-item label="库存数量" required>
          <el-input-number v-model="productForm.stock" :min="0" style="width: 100%" />
        </el-form-item>
        <el-form-item label="商品状态" required>
          <el-select v-model="productForm.status" placeholder="请选择商品状态" style="width: 100%">
            <el-option
              v-for="option in statusOptions"
              :key="option"
              :label="option"
              :value="option"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input
            v-model="productForm.description"
            type="textarea"
            :rows="4"
            placeholder="请输入商品描述"
          />
        </el-form-item>
        <el-form-item label="商品图片">
          <el-input v-model="productForm.image" placeholder="请输入商品图片URL" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveProduct">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.exchange-management-page {
  padding: 0;
}

.page-header {
  margin-bottom: $spacing-lg;
}

.page-title {
  font-size: $font-size-xl;
  font-weight: $font-weight-semibold;
  color: $text-primary;
  margin: 0;
}

/* 商品管理卡片 */
.product-management-card {
  margin-bottom: $spacing-lg;
  box-shadow: $shadow-sm;
}

/* 兑换记录卡片 */
.exchange-records-card {
  margin-bottom: $spacing-lg;
  box-shadow: $shadow-sm;
}

/* 卡片头部 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 商品信息 */
.product-info {
  display: flex;
  align-items: center;
}

.product-image {
  width: 40px;
  height: 40px;
  border-radius: $border-radius-sm;
  margin-right: 8px;
  object-fit: cover;
}

/* 积分文本 */
.score-text {
  color: $secondary-color;
  font-weight: $font-weight-medium;
}
</style>