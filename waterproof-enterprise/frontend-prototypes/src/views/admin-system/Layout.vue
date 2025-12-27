<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Menu, Bell, ArrowDown } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

// 侧边栏折叠状态
const isCollapsed = ref(false)

// 侧边导航项
const menuItems = [
  // 核心业务管理
  { name: '工单管理', path: '/admin-system/work-order-management', icon: 'el-icon-s-order' },
  { name: '合同管理', path: '/admin-system/contract-management', icon: 'el-icon-document' },
  { name: '项目管理', path: '/admin-system/project-management', icon: 'el-icon-s-management' },
  { name: '财务管理', path: '/admin-system/finance-management', icon: 'el-icon-money' },
  // 资源管理
  { name: '设备管理', path: '/admin-system/equipment-management', icon: 'el-icon-s-tools' },
  { name: '知识库管理', path: '/admin-system/knowledge-base', icon: 'el-icon-collection' },
  { name: '供应商管理', path: '/admin-system/supplier-management', icon: 'el-icon-s-cooperation' },
  { name: '客户管理', path: '/admin-system/customer-management', icon: 'el-icon-user' },
  { name: '人员管理', path: '/admin-system/staff-management', icon: 'el-icon-s-custom' },
  { name: '物料管理', path: '/admin-system/material-management', icon: 'el-icon-box' },
  // 数据中心
  { name: '数据统计', path: '/admin-system/data-statistics', icon: 'el-icon-data-line' },
  { name: '报表中心', path: '/admin-system/report-center', icon: 'el-icon-document-copy' },
  { name: '日志管理', path: '/admin-system/log-management', icon: 'el-icon-document-checked' },
  // 系统配置
  { name: '角色权限', path: '/admin-system/role-permission', icon: 'el-icon-key' },
  { name: '系统配置', path: '/admin-system/system-config', icon: 'el-icon-setting' },
  { name: '通知管理', path: '/admin-system/notification-management', icon: 'el-icon-bell' }
]

// 检查当前路由是否激活
const isActive = (path) => {
  return route.path === path
}

// 导航跳转
const navigate = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="admin-system-layout">
    <!-- 侧边导航栏 -->
    <aside class="admin-system-sidebar">
      <div class="sidebar-header">
        <img src="/images/moon-star-logo.svg" alt="logo" class="logo">
        <h2 class="sidebar-title">月星防水管理系统</h2>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li
            v-for="item in menuItems"
            :key="item.path"
            :class="{ active: isActive(item.path) }"
            @click="navigate(item.path)"
          >
            <el-icon class="nav-icon"><component :is="item.icon" /></el-icon>
            <span class="nav-text">{{ item.name }}</span>
          </li>
        </ul>
      </nav>
    </aside>
    
    <!-- 主内容区 -->
    <div class="admin-system-main">
      <!-- 顶部导航栏 -->
      <header class="admin-system-header">
        <div class="header-left">
          <el-button type="text" class="menu-toggle-btn" @click="isCollapsed = !isCollapsed">
            <el-icon><Menu /></el-icon>
          </el-button>
          <h3 class="page-title">{{ menuItems.find(item => isActive(item.path))?.name || '管理系统' }}</h3>
        </div>
        <div class="header-right">
          <el-button type="text" class="header-btn">
            <el-icon><Bell /></el-icon>
          </el-button>
          <el-dropdown>
            <el-button type="text" class="header-btn user-btn">
              <img src="/images/moon-star-placeholder.svg" alt="user" class="user-avatar">
              <span class="user-name">管理员</span>
              <el-icon class="el-icon--right"><ArrowDown /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>系统设置</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>
      
      <!-- 页面内容 -->
      <div class="admin-system-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-system-layout {
  display: flex;
  height: 100%;
  background-color: $bg-secondary;
}

/* 侧边导航栏 */
.admin-system-sidebar {
  width: 220px;
  background-color: $primary-color;
  color: #ffffff;
  transition: all $transition-normal;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  align-items: center;
  padding: $spacing-md;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: $spacing-sm;
}

.sidebar-title {
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: #ffffff;
  margin: 0;
}

.sidebar-nav {
  flex: 1;
  padding: $spacing-md 0;
}

.sidebar-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sidebar-nav li {
  display: flex;
  align-items: center;
  padding: $spacing-sm $spacing-lg;
  cursor: pointer;
  transition: all $transition-normal;
  color: rgba(255, 255, 255, 0.8);
}

.sidebar-nav li:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.sidebar-nav li.active {
  background-color: #ffffff;
  color: $primary-color;
  border-right: 3px solid $secondary-color;
}

.nav-icon {
  font-size: $font-size-md;
  margin-right: $spacing-sm;
}

.nav-text {
  font-size: $font-size-sm;
}

/* 主内容区 */
.admin-system-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 顶部导航栏 */
.admin-system-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 $spacing-lg;
  background-color: $bg-primary;
  box-shadow: $shadow-sm;
  height: 60px;
}

.header-left {
  display: flex;
  align-items: center;
}

.menu-toggle-btn {
  margin-right: $spacing-md;
  color: $text-secondary;
}

.page-title {
  font-size: $font-size-lg;
  font-weight: $font-weight-medium;
  color: $text-primary;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
}

.header-btn {
  margin-left: $spacing-md;
  color: $text-secondary;
}

.user-btn {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: $spacing-xs;
}

.user-name {
  font-size: $font-size-sm;
  color: $text-primary;
  margin-right: $spacing-xs;
}

/* 页面内容 */
.admin-system-content {
  flex: 1;
  padding: $spacing-lg;
  overflow: auto;
  background-color: $bg-secondary;
}
</style>