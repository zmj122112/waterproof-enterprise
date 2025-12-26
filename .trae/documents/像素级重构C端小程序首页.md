# 像素级重构C端小程序首页

## 一、项目适配说明
- 项目使用Vue 3框架，将重构`src/views/c-mini/Home.vue`而非`App.tsx`
- 图标库使用`lucide-vue-next`（Vue 3兼容版，对应React的lucide-react）
- 保留原有业务逻辑，仅重构UI样式和布局

## 二、重构步骤

### 1. 环境准备
- 安装`lucide-vue-next`图标库
- 验证用户提供的图片资源可用性

### 2. 视觉与布局规范
- 实现色彩系统：主色`bg-blue-600`、背景`bg-gray-50`
- 各模块间添加`h-2 bg-gray-100`或`my-3`物理隔离
- 主内容容器添加`pb-24`解决底部导航遮挡问题

### 3. 顶部Header重设计
- 纯蓝色背景(`bg-blue-600`)
- 左侧显示白色Logo/文字"月星防水"
- 右侧添加白色客服/消息图标
- 第二行添加白色圆角搜索框

### 4. 图片资源优化
- 使用用户提供的Unsplash高质量链接
- 所有图片添加`object-cover`类防止变形
- 验证并替换失效图片链接

### 5. 图标系统重构
- 服务九宫格使用`lucide-vue-next`矢量图标
- 每个图标添加浅蓝色圆背景(`bg-blue-50 p-3 rounded-full text-blue-600`)

### 6. 营销宣传区重构
- 服务优势改为2x2卡片矩阵
- 每个卡片带小图标，字体精致
- 工程案例改为横向滚动布局

### 7. 细节优化
- 底部导航栏使用`fixed bottom-0 w-full bg-white border-t border-gray-100 pb-safe z-50`
- 按钮使用大圆角(`rounded-full`)和轻微阴影
- 确保无破损图片和布局问题

## 三、文件修改
- `src/views/c-mini/Home.vue`：完整重构UI样式和布局
- 可能需要更新`package.json`添加图标库依赖

## 四、验收标准
- 页面无破损图片
- 布局严谨，无内容遮挡
- 交互流畅，符合大厂App体验
- 视觉效果符合国企防水服务平台定位