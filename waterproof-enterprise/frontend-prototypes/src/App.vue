<script setup>
// 简化App.vue，移除平台切换导航，实现各端独立布局
</script>

<template>
  <div class="app-container">
    <!-- 主内容区 - 直接渲染当前路由组件 -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  width: 100%;
}
</style>
