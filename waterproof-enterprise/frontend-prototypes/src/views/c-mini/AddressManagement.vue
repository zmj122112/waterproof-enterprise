<script setup>
// 地址管理页面
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Plus, Edit, Delete } from '@element-plus/icons-vue'

const router = useRouter()

// 地址列表数据
const addresses = ref([
  {
    id: 1,
    name: '张三',
    phone: '13800138000',
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    detail: '建国路88号现代城A座1501室',
    isDefault: true
  },
  {
    id: 2,
    name: '李四',
    phone: '13900139000',
    province: '上海市',
    city: '上海市',
    district: '浦东新区',
    detail: '陆家嘴环路166号平安金融中心3801室',
    isDefault: false
  }
])

// 返回上一页
const goBack = () => {
  history.back()
}

// 添加新地址
const addAddress = () => {
  alert('添加新地址功能开发中')
}

// 编辑地址
const editAddress = (addressId) => {
  alert('编辑地址功能开发中，地址ID: ' + addressId)
}

// 删除地址
const deleteAddress = (addressId) => {
  alert('删除地址功能开发中，地址ID: ' + addressId)
}

// 设置默认地址
const setDefaultAddress = (addressId) => {
  addresses.value.forEach(address => {
    address.isDefault = address.id === addressId
  })
  alert('已设置为默认地址')
}

onMounted(() => {
  console.log('地址管理页面加载')
})
</script>

<template>
  <div class="address-management-page" style="min-height: 100vh; background-color: #f5f7fa; padding-bottom: 100px;">
    <!-- 页面标题栏 -->
    <div style="background-color: #CC0010; border-bottom-left-radius: 32px; border-bottom-right-radius: 32px; padding: 20px 20px 30px; text-align: center; position: relative;">
      <a href="/c-mini/user-center" style="position: absolute; left: 10px; top: 10px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; cursor: pointer; z-index: 99999; background: rgba(255,255,255,0.1); border-radius: 50%; text-decoration: none;">
        <el-icon><ArrowLeft /></el-icon>
      </a>
      <div style="color: white; font-size: 20px; font-weight: 700; margin: 0;">地址管理</div>
    </div>

    <!-- 地址列表 -->
    <div style="padding: 16px;">
      <!-- 添加新地址按钮 -->
      <div style="background: white; border: 1px dashed #E5E7EB; border-radius: 16px; padding: 16px; text-align: center; cursor: pointer; margin-bottom: 16px;" @click="addAddress">
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; color: #6b7280; font-size: 14px;">
          <el-icon><Plus /></el-icon>
          <span>添加新地址</span>
        </div>
      </div>
      
      <!-- 地址列表项 -->
      <div v-for="address in addresses" :key="address.id" style="background: white; border: 1px solid #E5E7EB; border-radius: 16px; padding: 16px; margin-bottom: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
        <!-- 地址头部 -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="font-weight: 500; font-size: 16px; color: #111827;">{{ address.name }}</div>
            <div style="font-size: 14px; color: #6b7280;">{{ address.phone }}</div>
            <div v-if="address.isDefault" style="background: #FEE2E2; color: #CC0010; font-size: 12px; padding: 2px 8px; border-radius: 12px;">默认地址</div>
          </div>
          <div style="display: flex; gap: 8px;">
            <div style="width: 32px; height: 32px; background: #F3F4F6; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;" @click="editAddress(address.id)">
              <el-icon style="color: #6b7280;"><Edit /></el-icon>
            </div>
            <div style="width: 32px; height: 32px; background: #FEE2E2; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;" @click="deleteAddress(address.id)">
              <el-icon style="color: #CC0010;"><Delete /></el-icon>
            </div>
          </div>
        </div>
        
        <!-- 地址内容 -->
        <div style="color: #6b7280; font-size: 14px; line-height: 1.6; margin-bottom: 12px;">
          {{ address.province }}{{ address.city }}{{ address.district }}{{ address.detail }}
        </div>
        
        <!-- 地址操作 -->
        <div v-if="!address.isDefault" style="text-align: right;">
          <button @click="setDefaultAddress(address.id)" style="background: white; border: 1px solid #CC0010; color: #CC0010; font-size: 12px; padding: 4px 12px; border-radius: 16px; cursor: pointer;">
            设置为默认地址
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.address-management-page {
  padding-bottom: 100px;
}
</style>