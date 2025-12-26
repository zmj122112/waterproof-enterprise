<script setup>
import { ref } from 'vue'

// 角色列表数据
const roleList = ref([
  {
    id: 1,
    name: '管理员',
    description: '系统最高权限',
    status: '启用',
    createTime: '2024-01-10',
    userCount: 1
  },
  {
    id: 2,
    name: '部门经理',
    description: '部门管理权限',
    status: '启用',
    createTime: '2024-01-15',
    userCount: 3
  },
  {
    id: 3,
    name: '普通员工',
    description: '普通操作权限',
    status: '启用',
    createTime: '2024-01-20',
    userCount: 15
  }
])

// 状态颜色映射
const statusColorMap = {
  '启用': 'success',
  '禁用': 'danger'
}

// 新增角色
const addRole = () => {
  // 这里可以添加新增角色的逻辑
  console.log('新增角色')
}

// 编辑角色
const editRole = (id) => {
  // 这里可以添加编辑角色的逻辑
  console.log('编辑角色:', id)
}

// 分配权限
const assignPermission = (id) => {
  // 这里可以添加分配权限的逻辑
  console.log('分配权限:', id)
}

// 删除角色
const deleteRole = (id) => {
  // 这里可以添加删除角色的逻辑
  console.log('删除角色:', id)
}
</script>

<template>
  <div class="role-permission-container">
    <el-card class="role-permission-card">
      <template #header>
        <div class="card-header">
          <h2 class="card-title">角色权限管理</h2>
          <el-button type="primary" class="action-btn" @click="addRole">新增角色</el-button>
        </div>
      </template>
      
      <!-- 角色列表 -->
      <div class="role-list">
        <el-table :data="roleList" stripe style="width: 100%">
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="name" label="角色名称" />
          <el-table-column prop="description" label="描述" show-overflow-tooltip />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <el-tag :type="statusColorMap[scope.row.status]">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="userCount" label="用户数量" width="100" />
          <el-table-column prop="createTime" label="创建时间" width="150" />
          <el-table-column label="操作" width="240" fixed="right">
            <template #default="scope">
              <el-button type="primary" size="small" link @click="editRole(scope.row.id)">编辑</el-button>
              <el-button type="warning" size="small" link @click="assignPermission(scope.row.id)">分配权限</el-button>
              <el-button type="danger" size="small" link @click="deleteRole(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      
      <!-- 权限树示例 -->
      <el-card class="permission-tree-card" style="margin-top: 20px;">
        <template #header>
          <h3 class="card-title">权限树示例</h3>
        </template>
        
        <div class="permission-tree-content">
          <p class="permission-tree-placeholder">权限树组件示例：可在此处选择和分配具体权限</p>
          <el-tree
            :data="[]"
            :props="{ label: 'label' }"
            show-checkbox
            node-key="id"
            default-expand-all
            style="margin-top: 20px;"
          >
            <template #default="{ node, data }">
              <span class="custom-tree-node">
                <span>{{ node.label }}</span>
              </span>
            </template>
          </el-tree>
        </div>
      </el-card>
    </el-card>
  </div>
</template>

<style scoped>
.role-permission-container {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.action-btn {
  margin: 0;
}

.role-list {
  margin-top: 20px;
}

.permission-tree-card {
  margin-top: 20px;
}

.permission-tree-content {
  padding: 20px 0;
}

.permission-tree-placeholder {
  color: #909399;
  text-align: center;
  margin-bottom: 20px;
}
</style>