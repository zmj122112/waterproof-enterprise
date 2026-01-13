<script setup>
import { ref } from 'vue'

// 知识库列表数据
const knowledgeList = ref([
  {
    id: 'KB20231001',
    title: '防水施工技术规范',
    category: '技术文档',
    publishDate: '2023-10-15',
    viewCount: 120,
    content: '<h3>防水施工技术规范</h3><p>1. 施工前必须确保基层干燥、平整、无油污...</p><p>2. 防水涂料应按照产品说明进行配比和搅拌...</p><p>3. 施工过程中应注意环境温度和湿度...</p>'
  },
  {
    id: 'KB20231002',
    title: '卫生间防水施工案例',
    category: '案例库',
    publishDate: '2023-10-10',
    viewCount: 80,
    content: '<h3>卫生间防水施工案例</h3><p>项目名称：XX小区卫生间防水改造</p><p>施工面积：12㎡</p><p>施工工艺：聚氨酯防水涂料+丙纶布...</p>'
  },
  {
    id: 'KB20231003',
    title: '屋顶防水维修解决方案',
    category: '解决方案',
    publishDate: '2023-10-05',
    viewCount: 150,
    content: '<h3>屋顶防水维修解决方案</h3><p>针对屋顶漏水问题，我们提供以下解决方案：</p><p>1. 全面检查屋顶结构和防水层...</p><p>2. 清理屋顶表面，修复裂缝...</p><p>3. 重新涂刷防水材料...</p>'
  },
  {
    id: 'KB20231004',
    title: '新型防水材料介绍',
    category: '产品知识',
    publishDate: '2023-10-01',
    viewCount: 90,
    content: '<h3>新型防水材料介绍</h3><p>1. 聚氨酯防水涂料：具有优异的弹性和粘结力...</p><p>2. 聚合物水泥防水涂料：环保无毒，施工方便...</p><p>3. 自粘防水卷材：施工简单，密封性好...</p>'
  }
])

// 筛选条件
const filters = ref({
  category: '',
  keyword: ''
})

// 分类选项
const categoryOptions = [
  { label: '全部', value: '' },
  { label: '技术文档', value: '技术文档' },
  { label: '案例库', value: '案例库' },
  { label: '解决方案', value: '解决方案' },
  { label: '产品知识', value: '产品知识' }
]

// 查看知识库详情
const activeKnowledge = ref(null)
const viewKnowledgeDetail = (item) => {
  activeKnowledge.value = item
}

// 返回列表
const backToList = () => {
  activeKnowledge.value = null
}
</script>

<template>
  <div class="knowledge-base-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1 class="page-title">{{ activeKnowledge ? activeKnowledge.title : '帮助中心' }}</h1>
      <div class="header-actions" @click="backToList" v-if="activeKnowledge">
        &lt;
      </div>
    </div>

    <!-- 内容区域 -->
    <div v-if="!activeKnowledge" class="list-content">
      <!-- 搜索框 -->
      <div class="search-container">
        <input
          v-model="filters.keyword"
          type="text"
          placeholder="请输入关键词搜索"
          class="search-input"
        />
      </div>

      <!-- 分类筛选 -->
      <div class="category-filter">
        <span
          v-for="option in categoryOptions"
          :key="option.value"
          @click="filters.category = option.value"
          :class="['category-item', { active: filters.category === option.value }]"
        >
          {{ option.label }}
        </span>
      </div>

      <!-- 知识库列表 -->
      <div class="knowledge-list">
        <div
          v-for="item in knowledgeList"
          :key="item.id"
          @click="viewKnowledgeDetail(item)"
          class="knowledge-item"
        >
          <h3 class="knowledge-title">{{ item.title }}</h3>
          <div class="knowledge-meta">
            <span>{{ item.category }}</span>
            <span>{{ item.publishDate }}</span>
          </div>
          <div class="knowledge-stats">
            <span>浏览: {{ item.viewCount }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 知识库详情 -->
    <div v-else class="detail-content">
      <div class="knowledge-detail">
        <h2 class="detail-title">{{ activeKnowledge.title }}</h2>
        <div class="detail-meta">
          <span>{{ activeKnowledge.category }}</span>
          <span>{{ activeKnowledge.publishDate }}</span>
        </div>
        <div class="detail-text" v-html="activeKnowledge.content"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.knowledge-base-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 80px;
}

.page-header {
  background-color: #CC0010;
  color: white;
  padding: 20px 16px;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 2px 12px rgba(204, 0, 16, 0.3);
  position: relative;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  text-align: center;
  color: white;
}

.header-actions {
  position: absolute;
  left: 16px;
  top: 20px;
  font-size: 20px;
  cursor: pointer;
}

.list-content {
  padding: 16px;
}

.search-container {
  margin-bottom: 16px;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 24px;
  font-size: 14px;
  outline: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.category-filter {
  margin-bottom: 16px;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 8px;
}

.category-item {
  display: inline-block;
  padding: 8px 16px;
  margin-right: 12px;
  background-color: white;
  color: #333;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.category-item.active {
  background-color: #e53935;
  color: white;
}

.knowledge-list {
  margin-top: 16px;
}

.knowledge-item {
  background-color: white;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
}

.knowledge-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #333;
}

.knowledge-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}

.knowledge-stats {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.detail-content {
  padding: 16px;
}

.knowledge-detail {
  background-color: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.detail-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #333;
}

.detail-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
  margin-bottom: 16px;
}

.detail-text {
  font-size: 14px;
  line-height: 1.6;
  color: #666;
}
</style>