# 企业微信联系功能设计方案

## 1. 功能概述

企业微信联系功能旨在实现项目经理或营销人员通过企业微信与客户建立联系，确保沟通专业性，并支持员工离职时的工作交接。

## 2. 系统架构

### 2.1 前端架构
- Vue.js 3 + Composition API
- Element Plus UI组件库
- 企业微信JS-SDK集成

### 2.2 后端架构
- 企业微信API对接
- 联系记录存储
- 员工权限管理

## 3. 功能流程设计

### 3.1 企业微信配置流程

1. **管理员配置企业微信**
   - 登录管理系统，进入企业微信配置页面
   - 输入企业微信CorpID、AgentID、Secret等信息
   - 配置企业微信联系规则（如自动回复、欢迎语等）
   - 保存配置并测试连接

2. **员工绑定企业微信**
   - 员工登录系统，进入个人设置
   - 绑定企业微信账号
   - 系统验证绑定关系
   - 绑定成功后，员工可以通过企业微信联系客户

### 3.2 客户联系流程

1. **客户提交预约/报修**
   - 客户在小程序提交预约或报修表单
   - 系统生成工单
   - 系统触发企业微信通知

2. **系统分配项目经理**
   - 系统自动或手动分配项目经理
   - 项目经理收到工单通知

3. **项目经理联系客户**
   - 项目经理查看工单详情
   - 点击"企业微信联系"按钮
   - 系统生成企业微信联系卡片
   - 项目经理通过企业微信添加客户
   - 系统记录联系时间和方式

4. **客户与项目经理沟通**
   - 客户通过企业微信发送漏水照片
   - 项目经理根据照片给出初步预估报价
   - 双方沟通具体服务细节
   - 系统记录沟通内容（可选，需企业微信API支持）

5. **确认服务方案**
   - 双方确认服务方案
   - 项目经理在系统中更新工单状态
   - 系统生成服务合同（可选）

### 3.3 工作交接流程

1. **员工离职申请**
   - 员工提交离职申请
   - 管理员审核离职申请

2. **系统触发工作交接**
   - 系统检测到员工离职
   - 生成工作交接清单
   - 包括未完成工单、客户联系人、联系记录等

3. **选择交接人员**
   - 管理员选择接收工作的员工
   - 系统向接收员工发送交接通知

4. **企业微信数据移交**
   - 管理员通过企业微信管理后台完成客户联系人移交
   - 客户联系人从离职员工转移到接收员工
   - 聊天记录根据企业微信政策进行处理

5. **系统数据更新**
   - 系统更新客户联系人信息
   - 更新工单负责人信息
   - 记录工作交接日志

## 4. 页面设计

### 4.1 管理端页面修改

#### 4.1.1 企业微信配置页面
- 新增页面：`EnterpriseWechatConfig.vue`
- 功能：配置企业微信API参数
- 元素：
  - CorpID输入框
  - AgentID输入框
  - Secret输入框
  - 测试连接按钮
  - 保存配置按钮

#### 4.1.2 人员管理页面
- 修改页面：`StaffManagement.vue`
- 功能：添加企业微信账号字段
- 元素：
  - 企业微信账号列
  - 绑定企业微信按钮
  - 解绑企业微信按钮

#### 4.1.3 客户管理页面
- 修改页面：`CustomerManagement.vue`
- 功能：添加企业微信联系记录
- 元素：
  - 企业微信联系人列
  - 联系记录列表
  - 查看联系详情按钮

#### 4.1.4 工单详情页面
- 修改页面：`WorkOrderDetail.vue`
- 功能：添加企业微信联系按钮
- 元素：
  - 企业微信联系按钮
  - 联系记录显示
  - 联系状态更新

### 4.2 客户端页面修改

#### 4.2.1 首页
- 修改页面：`Home.vue`
- 功能：添加企业微信联系方式展示
- 元素：
  - 企业微信二维码
  - 扫码添加企业微信提示
  - 企业微信联系方式

#### 4.2.2 报修页面
- 修改页面：`RepairEstimate.vue`
- 功能：添加企业微信联系选项
- 元素：
  - 企业微信联系选项
  - 扫码添加企业微信提示
  - 提交后企业微信联系提示

## 5. 数据模型设计

### 5.1 企业微信配置表
```sql
CREATE TABLE `enterprise_wechat_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `corpid` varchar(255) NOT NULL COMMENT '企业微信CorpID',
  `agentid` varchar(255) NOT NULL COMMENT '应用AgentID',
  `secret` varchar(255) NOT NULL COMMENT '应用Secret',
  `welcome_message` text COMMENT '欢迎语',
  `status` tinyint(1) DEFAULT 1 COMMENT '状态：0-禁用，1-启用',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='企业微信配置表';
```

### 5.2 员工企业微信绑定表
```sql
CREATE TABLE `staff_wechat_bind` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `staff_id` varchar(255) NOT NULL COMMENT '员工ID',
  `wechat_userid` varchar(255) NOT NULL COMMENT '企业微信用户ID',
  `wechat_name` varchar(255) COMMENT '企业微信名称',
  `wechat_avatar` varchar(255) COMMENT '企业微信头像',
  `status` tinyint(1) DEFAULT 1 COMMENT '绑定状态：0-解绑，1-绑定',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='员工企业微信绑定表';
```

### 5.3 客户企业微信联系表
```sql
CREATE TABLE `customer_wechat_contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` varchar(255) NOT NULL COMMENT '客户ID',
  `staff_id` varchar(255) NOT NULL COMMENT '负责员工ID',
  `wechat_openid` varchar(255) COMMENT '客户企业微信OpenID',
  `wechat_nickname` varchar(255) COMMENT '客户企业微信昵称',
  `contact_time` datetime COMMENT '首次联系时间',
  `last_contact_time` datetime COMMENT '最后联系时间',
  `status` tinyint(1) DEFAULT 1 COMMENT '联系状态：0-未联系，1-已联系',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='客户企业微信联系表';
```

### 5.4 企业微信联系记录表
```sql
CREATE TABLE `wechat_contact_record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` varchar(255) NOT NULL COMMENT '客户ID',
  `staff_id` varchar(255) NOT NULL COMMENT '员工ID',
  `content` text COMMENT '联系内容摘要',
  `contact_type` varchar(50) COMMENT '联系类型：text-文本，image-图片，voice-语音',
  `contact_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '联系时间',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='企业微信联系记录表';
```

## 6. 接口设计

### 6.1 企业微信配置接口
- `GET /api/enterprise-wechat/config` - 获取企业微信配置
- `POST /api/enterprise-wechat/config` - 保存企业微信配置
- `POST /api/enterprise-wechat/test-connection` - 测试企业微信连接

### 6.2 员工绑定接口
- `GET /api/enterprise-wechat/staff-bind` - 获取员工绑定信息
- `POST /api/enterprise-wechat/staff-bind` - 绑定企业微信
- `DELETE /api/enterprise-wechat/staff-bind` - 解绑企业微信

### 6.3 客户联系接口
- `POST /api/enterprise-wechat/customer-contact` - 创建客户联系
- `GET /api/enterprise-wechat/customer-contact/:customerId` - 获取客户联系信息
- `GET /api/enterprise-wechat/contact-records/:customerId` - 获取联系记录

### 6.4 工作交接接口
- `POST /api/enterprise-wechat/transfer` - 转移客户联系人
- `GET /api/enterprise-wechat/transfer-history` - 获取转移历史

## 7. 安全性设计

1. **数据加密**：企业微信API密钥加密存储
2. **权限控制**：只有管理员可以配置企业微信
3. **访问日志**：记录所有企业微信相关操作
4. **数据备份**：定期备份联系记录
5. **离职处理**：确保离职员工无法访问企业微信数据

## 8. 实施计划

### 8.1 阶段一：基础配置
- 完成企业微信配置页面开发
- 实现员工企业微信绑定功能

### 8.2 阶段二：客户联系功能
- 实现工单详情页面的企业微信联系按钮
- 实现客户管理页面的联系记录展示

### 8.3 阶段三：工作交接功能
- 实现客户联系人转移功能
- 实现联系记录转移功能

### 8.4 阶段四：测试和优化
- 测试企业微信联系功能
- 优化UI/UX设计
- 完善文档

## 9. 预期效果

1. **专业性提升**：通过企业微信建立联系，提升企业形象
2. **工作效率提高**：简化客户联系流程，减少沟通成本
3. **数据安全保障**：员工离职时，客户联系人可快速转移
4. **沟通记录可追溯**：所有联系记录可查询，便于管理和分析
5. **客户体验优化**：提供多种联系方式，方便客户选择

## 10. 风险评估

1. **企业微信API限制**：需遵守企业微信API使用规范
2. **数据隐私问题**：需确保客户数据符合隐私保护法规
3. **员工培训**：需对员工进行企业微信使用培训
4. **系统兼容性**：需确保与现有系统兼容

## 11. 后续优化方向

1. 集成企业微信会话存档功能
2. 实现智能回复和自动分配功能
3. 增加数据分析功能，提供沟通效率分析
4. 支持多种联系方式的统一管理
5. 实现移动端企业微信联系功能

## 12. 结论

企业微信联系功能的实现将显著提升公司的专业性和工作效率，同时保障数据安全。通过合理的设计和实施，可以确保功能的顺利上线和使用。