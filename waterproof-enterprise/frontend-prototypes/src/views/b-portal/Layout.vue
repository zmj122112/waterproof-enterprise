<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Bell, ArrowDown } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

// 底部导航项
const menuItems = [
  { name: '建筑列表', path: '/b-portal/building-management', icon: 'el-icon-office-building' },
  { name: '报修中心', path: '/b-portal/repair-center', icon: 'el-icon-circle-plus' },
  { name: '施工管理', path: '/b-portal/construction-management', icon: 'el-icon-s-order' },
  { name: '财务管理', path: '/b-portal/contract-management', icon: 'el-icon-money' },
  { name: '个人中心', path: '/b-portal/user-center', icon: 'el-icon-user' }
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
  <div class="b-portal-layout">
    <!-- 顶部导航栏 -->
    <header class="b-portal-header">
      <div class="header-left">
        <img src="/src/assets/images/moon-star-logo.svg" alt="月星防水logo" class="logo">
        <h3 class="page-title">{{ menuItems.find(item => isActive(item.path))?.name || 'B端门户' }}</h3>
      </div>
      <div class="header-right">
        <el-button type="text" class="header-btn">
          <el-icon><Bell /></el-icon>
        </el-button>
        <el-dropdown>
            <el-button type="text" class="header-btn user-btn">
              <img src="/src/assets/images/moon-star-placeholder.svg" alt="user" class="user-avatar">
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
    <div class="b-portal-content">
      <router-view />
    </div>
    
    <!-- 底部导航栏 -->
    <nav class="b-portal-nav">
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
  </div>
</template>

<style scoped>
.b-portal-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: $bg-secondary;
}

/* 顶部导航栏 */
.b-portal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 $spacing-md;
  background-color: $bg-primary;
  box-shadow: $shadow-sm;
  height: 50px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: $spacing-sm;
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
  margin-left: $spacing-sm;
  color: $text-secondary;
  padding: 6px;
}

.user-btn {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

/* 页面内容 */
.b-portal-content {
  flex: 1;
  padding: $spacing-md;
  overflow: auto;
  background-color: $bg-secondary;
  padding-bottom: 70px; /* 为底部导航预留空间 */
}

/* 底部导航栏 */
.b-portal-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: $bg-primary;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.b-portal-nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
}

.b-portal-nav li {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all $transition-normal;
  color: $text-secondary;
}

.b-portal-nav li:hover {
  background-color: $bg-hover;
}

.b-portal-nav li.active {
  color: $primary-color;
}

.nav-icon {
  font-size: 22px;
  margin-bottom: $spacing-xs;
}

.nav-text {
  font-size: $font-size-xs;
}
</style>