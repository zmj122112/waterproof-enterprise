-- 创建数据库
CREATE DATABASE IF NOT EXISTS waterproof_enterprise DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE waterproof_enterprise;

-- =========================================
-- 1. 客户与渠道域
-- =========================================

-- 客户表
CREATE TABLE IF NOT EXISTS `customer` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '客户ID',
  `customer_type` ENUM('B', 'C') NOT NULL COMMENT '客户类型：B-企业客户，C-个人客户',
  `customer_name` VARCHAR(255) NOT NULL COMMENT '客户名称',
  `contact_name` VARCHAR(100) DEFAULT NULL COMMENT '联系人姓名',
  `contact_phone` VARCHAR(20) DEFAULT NULL COMMENT '联系人电话',
  `contact_email` VARCHAR(100) DEFAULT NULL COMMENT '联系人邮箱',
  `address` VARCHAR(500) DEFAULT NULL COMMENT '地址',
  `customer_level` ENUM('VIP', 'NORMAL', 'NEW') DEFAULT 'NEW' COMMENT '客户等级',
  `status` ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE' COMMENT '状态',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_customer_name` (`customer_name`),
  INDEX `idx_customer_type` (`customer_type`),
  INDEX `idx_customer_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='客户表';

-- 线索表
CREATE TABLE IF NOT EXISTS `lead` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '线索ID',
  `source` VARCHAR(100) NOT NULL COMMENT '线索来源',
  `customer_name` VARCHAR(255) NOT NULL COMMENT '客户名称',
  `contact_phone` VARCHAR(20) DEFAULT NULL COMMENT '联系电话',
  `contact_email` VARCHAR(100) DEFAULT NULL COMMENT '联系邮箱',
  `description` TEXT DEFAULT NULL COMMENT '线索描述',
  `status` ENUM('NEW', 'QUALIFIED', 'CONVERTED', 'DISQUALIFIED') DEFAULT 'NEW' COMMENT '线索状态',
  `assigned_to` BIGINT DEFAULT NULL COMMENT '分配给',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  INDEX `idx_lead_status` (`status`),
  INDEX `idx_lead_source` (`source`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='线索表';

-- =========================================
-- 2. 工单/项目域
-- =========================================

-- 工单表
CREATE TABLE IF NOT EXISTS `workorder` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '工单ID',
  `workorder_no` VARCHAR(50) NOT NULL COMMENT '工单号',
  `customer_id` BIGINT NOT NULL COMMENT '客户ID',
  `project_id` BIGINT DEFAULT NULL COMMENT '关联项目ID（B端项目）',
  `workorder_type` VARCHAR(100) NOT NULL COMMENT '工单类型：卫生间漏水、屋顶补漏等',
  `leak_type` VARCHAR(100) DEFAULT NULL COMMENT '漏水类型',
  `leak_area` DECIMAL(10, 2) DEFAULT NULL COMMENT '漏水面积',
  `description` TEXT DEFAULT NULL COMMENT '问题描述',
  `address` VARCHAR(500) NOT NULL COMMENT '服务地址',
  `status` ENUM('CREATED', 'ASSIGNED', 'SURVEYING', 'QUOTING', 'APPROVED', 'CONSTRUCTING', 'INSPECTING', 'COMPLETED', 'CANCELLED') DEFAULT 'CREATED' COMMENT '工单状态',
  `created_by` BIGINT NOT NULL COMMENT '创建人',
  `assigned_to` BIGINT DEFAULT NULL COMMENT '分配给（师傅/班组）',
  `estimate_price` DECIMAL(10, 2) DEFAULT NULL COMMENT '预估价格',
  `actual_price` DECIMAL(10, 2) DEFAULT NULL COMMENT '实际价格',
  `start_time` DATETIME DEFAULT NULL COMMENT '开工时间',
  `end_time` DATETIME DEFAULT NULL COMMENT '完工时间',
  `warranty_start` DATETIME DEFAULT NULL COMMENT '质保开始时间',
  `warranty_end` DATETIME DEFAULT NULL COMMENT '质保结束时间',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_workorder_no` (`workorder_no`),
  INDEX `idx_customer_id` (`customer_id`),
  INDEX `idx_project_id` (`project_id`),
  INDEX `idx_workorder_status` (`status`),
  INDEX `idx_assigned_to` (`assigned_to`),
  CONSTRAINT `fk_workorder_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='工单表';

-- 项目表
CREATE TABLE IF NOT EXISTS `project` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '项目ID',
  `project_no` VARCHAR(50) NOT NULL COMMENT '项目编号',
  `customer_id` BIGINT NOT NULL COMMENT '客户ID',
  `project_name` VARCHAR(255) NOT NULL COMMENT '项目名称',
  `project_type` VARCHAR(100) NOT NULL COMMENT '项目类型',
  `contract_id` BIGINT DEFAULT NULL COMMENT '关联合同ID',
  `status` ENUM('PLANNING', 'EXECUTING', 'COMPLETED', 'CANCELLED') DEFAULT 'PLANNING' COMMENT '项目状态',
  `estimated_cost` DECIMAL(10, 2) DEFAULT NULL COMMENT '预估成本',
  `actual_cost` DECIMAL(10, 2) DEFAULT NULL COMMENT '实际成本',
  `estimated_revenue` DECIMAL(10, 2) DEFAULT NULL COMMENT '预估收入',
  `actual_revenue` DECIMAL(10, 2) DEFAULT NULL COMMENT '实际收入',
  `start_date` DATE DEFAULT NULL COMMENT '开始日期',
  `end_date` DATE DEFAULT NULL COMMENT '结束日期',
  `created_by` BIGINT NOT NULL COMMENT '创建人',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_project_no` (`project_no`),
  INDEX `idx_customer_id` (`customer_id`),
  INDEX `idx_project_status` (`status`),
  CONSTRAINT `fk_project_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='项目表';

-- 工单勘察记录表
CREATE TABLE IF NOT EXISTS `workorder_survey` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '勘察记录ID',
  `workorder_id` BIGINT NOT NULL COMMENT '工单ID',
  `surveyor_id` BIGINT NOT NULL COMMENT '勘察人ID',
  `survey_time` DATETIME NOT NULL COMMENT '勘察时间',
  `leak_point` VARCHAR(255) DEFAULT NULL COMMENT '漏水点',
  `leak_cause` TEXT DEFAULT NULL COMMENT '漏水原因',
  `solution` TEXT DEFAULT NULL COMMENT '解决方案',
  `photos` JSON DEFAULT NULL COMMENT '勘察照片（JSON数组）',
  `videos` JSON DEFAULT NULL COMMENT '勘察视频（JSON数组）',
  `notes` TEXT DEFAULT NULL COMMENT '备注',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_workorder_id` (`workorder_id`),
  CONSTRAINT `fk_survey_workorder` FOREIGN KEY (`workorder_id`) REFERENCES `workorder` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='工单勘察记录表';

-- 工单施工记录表
CREATE TABLE IF NOT EXISTS `workorder_construction` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '施工记录ID',
  `workorder_id` BIGINT NOT NULL COMMENT '工单ID',
  `constructor_id` BIGINT NOT NULL COMMENT '施工人ID',
  `construction_date` DATE NOT NULL COMMENT '施工日期',
  `start_time` TIME NOT NULL COMMENT '开工时间',
  `end_time` TIME NOT NULL COMMENT '完工时间',
  `process` TEXT NOT NULL COMMENT '施工过程',
  `materials_used` JSON DEFAULT NULL COMMENT '使用材料（JSON数组）',
  `photos` JSON DEFAULT NULL COMMENT '施工照片（JSON数组）',
  `videos` JSON DEFAULT NULL COMMENT '施工视频（JSON数组）',
  `weather` VARCHAR(50) DEFAULT NULL COMMENT '天气情况',
  `notes` TEXT DEFAULT NULL COMMENT '备注',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  INDEX `idx_workorder_id` (`workorder_id`),
  INDEX `idx_constructor_id` (`constructor_id`),
  CONSTRAINT `fk_construction_workorder` FOREIGN KEY (`workorder_id`) REFERENCES `workorder` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='工单施工记录表';

-- 工单验收记录表
CREATE TABLE IF NOT EXISTS `workorder_inspection` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '验收记录ID',
  `workorder_id` BIGINT NOT NULL COMMENT '工单ID',
  `inspector_id` BIGINT NOT NULL COMMENT '验收人ID',
  `inspection_time` DATETIME NOT NULL COMMENT '验收时间',
  `result` ENUM('PASS', 'FAIL') NOT NULL COMMENT '验收结果',
  `comments` TEXT DEFAULT NULL COMMENT '验收意见',
  `photos` JSON DEFAULT NULL COMMENT '验收照片（JSON数组）',
  `customer_signature` VARCHAR(255) DEFAULT NULL COMMENT '客户签字（图片路径）',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_workorder_id` (`workorder_id`),
  CONSTRAINT `fk_inspection_workorder` FOREIGN KEY (`workorder_id`) REFERENCES `workorder` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='工单验收记录表';

-- =========================================
-- 3. 人员与班组域
-- =========================================

-- 人员表
CREATE TABLE IF NOT EXISTS `employee` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '人员ID',
  `employee_type` ENUM('STAFF', 'MASTER', 'TEAM') NOT NULL COMMENT '人员类型：STAFF-自有员工，MASTER-外包师傅，TEAM-施工班组',
  `name` VARCHAR(100) NOT NULL COMMENT '姓名/班组名称',
  `phone` VARCHAR(20) NOT NULL COMMENT '电话',
  `id_card` VARCHAR(18) DEFAULT NULL COMMENT '身份证号',
  `skills` JSON DEFAULT NULL COMMENT '技能标签（JSON数组）',
  `qualifications` JSON DEFAULT NULL COMMENT '资质证照（JSON数组）',
  `status` ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE' COMMENT '状态',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_phone` (`phone`),
  INDEX `idx_employee_type` (`employee_type`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='人员表';

-- 班组人员关联表
CREATE TABLE IF NOT EXISTS `team_employee` (
  `team_id` BIGINT NOT NULL COMMENT '班组ID',
  `employee_id` BIGINT NOT NULL COMMENT '人员ID',
  `role` VARCHAR(50) NOT NULL COMMENT '在班组中的角色',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`team_id`, `employee_id`),
  CONSTRAINT `fk_team_employee_team` FOREIGN KEY (`team_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_team_employee_employee` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='班组人员关联表';

-- =========================================
-- 4. 物料与设备域
-- =========================================

-- 物料表
CREATE TABLE IF NOT EXISTS `material` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '物料ID',
  `material_code` VARCHAR(50) NOT NULL COMMENT '物料编码',
  `material_name` VARCHAR(255) NOT NULL COMMENT '物料名称',
  `specification` VARCHAR(255) DEFAULT NULL COMMENT '规格型号',
  `unit` VARCHAR(20) NOT NULL COMMENT '计量单位',
  `material_type` VARCHAR(100) NOT NULL COMMENT '物料类型',
  `brand` VARCHAR(100) DEFAULT NULL COMMENT '品牌',
  `status` ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE' COMMENT '状态',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_material_code` (`material_code`),
  INDEX `idx_material_type` (`material_type`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='物料表';

-- 物料库存表
CREATE TABLE IF NOT EXISTS `material_inventory` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '库存ID',
  `material_id` BIGINT NOT NULL COMMENT '物料ID',
  `warehouse_id` BIGINT NOT NULL COMMENT '仓库ID',
  `quantity` DECIMAL(10, 2) NOT NULL DEFAULT 0 COMMENT '库存数量',
  `unit_price` DECIMAL(10, 2) DEFAULT NULL COMMENT '单位成本',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_material_warehouse` (`material_id`, `warehouse_id`),
  CONSTRAINT `fk_inventory_material` FOREIGN KEY (`material_id`) REFERENCES `material` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='物料库存表';

-- 工单物料使用表
CREATE TABLE IF NOT EXISTS `workorder_material` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `workorder_id` BIGINT NOT NULL COMMENT '工单ID',
  `material_id` BIGINT NOT NULL COMMENT '物料ID',
  `quantity` DECIMAL(10, 2) NOT NULL COMMENT '使用数量',
  `unit_price` DECIMAL(10, 2) NOT NULL COMMENT '单价',
  `total_amount` DECIMAL(10, 2) NOT NULL COMMENT '总金额',
  `used_at` DATETIME NOT NULL COMMENT '使用时间',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  INDEX `idx_workorder_id` (`workorder_id`),
  INDEX `idx_material_id` (`material_id`),
  CONSTRAINT `fk_workorder_material_workorder` FOREIGN KEY (`workorder_id`) REFERENCES `workorder` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_workorder_material_material` FOREIGN KEY (`material_id`) REFERENCES `material` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='工单物料使用表';

-- =========================================
-- 5. 财务与结算域
-- =========================================

-- 合同表
CREATE TABLE IF NOT EXISTS `contract` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '合同ID',
  `contract_no` VARCHAR(50) NOT NULL COMMENT '合同编号',
  `project_id` BIGINT NOT NULL COMMENT '项目ID',
  `contract_name` VARCHAR(255) NOT NULL COMMENT '合同名称',
  `contract_amount` DECIMAL(10, 2) NOT NULL COMMENT '合同金额',
  `sign_date` DATE NOT NULL COMMENT '签订日期',
  `start_date` DATE NOT NULL COMMENT '合同开始日期',
  `end_date` DATE NOT NULL COMMENT '合同结束日期',
  `status` ENUM('DRAFT', 'SIGNED', 'EXECUTING', 'COMPLETED', 'TERMINATED') DEFAULT 'DRAFT' COMMENT '合同状态',
  `created_by` BIGINT NOT NULL COMMENT '创建人',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_contract_no` (`contract_no`),
  INDEX `idx_project_id` (`project_id`),
  INDEX `idx_contract_status` (`status`),
  CONSTRAINT `fk_contract_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='合同表';

-- 报价表
CREATE TABLE IF NOT EXISTS `quote` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '报价ID',
  `quote_no` VARCHAR(50) NOT NULL COMMENT '报价编号',
  `workorder_id` BIGINT NOT NULL COMMENT '工单ID',
  `quote_type` ENUM('RANGE', 'EXACT') NOT NULL COMMENT '报价类型：RANGE-区间价，EXACT-精确价',
  `min_price` DECIMAL(10, 2) DEFAULT NULL COMMENT '最低价格（区间价）',
  `max_price` DECIMAL(10, 2) DEFAULT NULL COMMENT '最高价格（区间价）',
  `exact_price` DECIMAL(10, 2) DEFAULT NULL COMMENT '精确价格',
  `description` TEXT DEFAULT NULL COMMENT '报价说明',
  `status` ENUM('DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED') DEFAULT 'DRAFT' COMMENT '报价状态',
  `created_by` BIGINT NOT NULL COMMENT '创建人',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_quote_no` (`quote_no`),
  UNIQUE KEY `uk_workorder_id` (`workorder_id`),
  INDEX `idx_quote_status` (`status`),
  CONSTRAINT `fk_quote_workorder` FOREIGN KEY (`workorder_id`) REFERENCES `workorder` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='报价表';

-- 收款记录表
CREATE TABLE IF NOT EXISTS `payment_receipt` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '收款记录ID',
  `receipt_no` VARCHAR(50) NOT NULL COMMENT '收款单号',
  `workorder_id` BIGINT DEFAULT NULL COMMENT '工单ID',
  `project_id` BIGINT DEFAULT NULL COMMENT '项目ID',
  `customer_id` BIGINT NOT NULL COMMENT '客户ID',
  `amount` DECIMAL(10, 2) NOT NULL COMMENT '收款金额',
  `payment_method` ENUM('CASH', 'TRANSFER', 'WECHAT', 'ALIPAY') NOT NULL COMMENT '支付方式',
  `payment_date` DATETIME NOT NULL COMMENT '收款日期',
  `status` ENUM('SUCCESS', 'FAILED', 'REFUNDED') DEFAULT 'SUCCESS' COMMENT '收款状态',
  `notes` TEXT DEFAULT NULL COMMENT '备注',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_receipt_no` (`receipt_no`),
  INDEX `idx_customer_id` (`customer_id`),
  INDEX `idx_workorder_id` (`workorder_id`),
  INDEX `idx_project_id` (`project_id`),
  CONSTRAINT `fk_receipt_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_receipt_workorder` FOREIGN KEY (`workorder_id`) REFERENCES `workorder` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_receipt_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='收款记录表';

-- 成本记录表
CREATE TABLE IF NOT EXISTS `cost_record` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '成本记录ID',
  `cost_no` VARCHAR(50) NOT NULL COMMENT '成本单号',
  `workorder_id` BIGINT DEFAULT NULL COMMENT '工单ID',
  `project_id` BIGINT DEFAULT NULL COMMENT '项目ID',
  `cost_type` VARCHAR(100) NOT NULL COMMENT '成本类型：材料成本、人工成本、设备成本等',
  `amount` DECIMAL(10, 2) NOT NULL COMMENT '成本金额',
  `description` TEXT DEFAULT NULL COMMENT '成本描述',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_cost_no` (`cost_no`),
  INDEX `idx_workorder_id` (`workorder_id`),
  INDEX `idx_project_id` (`project_id`),
  INDEX `idx_cost_type` (`cost_type`),
  CONSTRAINT `fk_cost_workorder` FOREIGN KEY (`workorder_id`) REFERENCES `workorder` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_cost_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='成本记录表';

-- =========================================
-- 6. 质保域
-- =========================================

-- 质保信息表
CREATE TABLE IF NOT EXISTS `warranty` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '质保ID',
  `workorder_id` BIGINT NOT NULL COMMENT '工单ID',
  `customer_id` BIGINT NOT NULL COMMENT '客户ID',
  `warranty_type` VARCHAR(100) NOT NULL COMMENT '质保类型',
  `warranty_period` INT NOT NULL COMMENT '质保期限（月）',
  `start_date` DATETIME NOT NULL COMMENT '质保开始时间',
  `end_date` DATETIME NOT NULL COMMENT '质保结束时间',
  `status` ENUM('ACTIVE', 'EXPIRED', 'TERMINATED') DEFAULT 'ACTIVE' COMMENT '质保状态',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_workorder_id` (`workorder_id`),
  INDEX `idx_customer_id` (`customer_id`),
  INDEX `idx_warranty_status` (`status`),
  CONSTRAINT `fk_warranty_workorder` FOREIGN KEY (`workorder_id`) REFERENCES `workorder` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_warranty_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='质保信息表';

-- 质保维修记录表
CREATE TABLE IF NOT EXISTS `warranty_repair` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '质保维修ID',
  `warranty_id` BIGINT NOT NULL COMMENT '质保ID',
  `workorder_id` BIGINT NOT NULL COMMENT '原工单ID',
  `repair_workorder_id` BIGINT DEFAULT NULL COMMENT '维修工单ID',
  `problem_description` TEXT NOT NULL COMMENT '问题描述',
  `repair_result` TEXT DEFAULT NULL COMMENT '维修结果',
  `status` ENUM('CREATED', 'PROCESSING', 'COMPLETED', 'REJECTED') DEFAULT 'CREATED' COMMENT '维修状态',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  INDEX `idx_warranty_id` (`warranty_id`),
  INDEX `idx_workorder_id` (`workorder_id`),
  INDEX `idx_status` (`status`),
  CONSTRAINT `fk_warranty_repair_warranty` FOREIGN KEY (`warranty_id`) REFERENCES `warranty` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_warranty_repair_workorder` FOREIGN KEY (`workorder_id`) REFERENCES `workorder` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='质保维修记录表';

-- =========================================
-- 7. 系统管理域
-- =========================================

-- 系统用户表
CREATE TABLE IF NOT EXISTS `sys_user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` VARCHAR(50) NOT NULL COMMENT '用户名',
  `password` VARCHAR(255) NOT NULL COMMENT '密码',
  `real_name` VARCHAR(100) NOT NULL COMMENT '真实姓名',
  `phone` VARCHAR(20) NOT NULL COMMENT '电话',
  `email` VARCHAR(100) DEFAULT NULL COMMENT '邮箱',
  `status` ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE' COMMENT '状态',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_username` (`username`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统用户表';

-- 系统角色表
CREATE TABLE IF NOT EXISTS `sys_role` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `role_name` VARCHAR(100) NOT NULL COMMENT '角色名称',
  `role_code` VARCHAR(50) NOT NULL COMMENT '角色编码',
  `description` VARCHAR(255) DEFAULT NULL COMMENT '角色描述',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_role_code` (`role_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统角色表';

-- 用户角色关联表
CREATE TABLE IF NOT EXISTS `sys_user_role` (
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `role_id` BIGINT NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`user_id`, `role_id`),
  CONSTRAINT `fk_user_role_user` FOREIGN KEY (`user_id`) REFERENCES `sys_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_role_role` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户角色关联表';

-- 系统菜单表
CREATE TABLE IF NOT EXISTS `sys_menu` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `parent_id` BIGINT DEFAULT NULL COMMENT '父菜单ID',
  `menu_name` VARCHAR(100) NOT NULL COMMENT '菜单名称',
  `menu_type` ENUM('MENU', 'BUTTON', 'API') NOT NULL COMMENT '菜单类型',
  `path` VARCHAR(255) DEFAULT NULL COMMENT '路径',
  `component` VARCHAR(255) DEFAULT NULL COMMENT '组件',
  `permission` VARCHAR(100) DEFAULT NULL COMMENT '权限标识',
  `icon` VARCHAR(50) DEFAULT NULL COMMENT '图标',
  `order_num` INT DEFAULT 0 COMMENT '排序',
  `status` ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE' COMMENT '状态',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  INDEX `idx_parent_id` (`parent_id`),
  INDEX `idx_menu_type` (`menu_type`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统菜单表';

-- 角色菜单关联表
CREATE TABLE IF NOT EXISTS `sys_role_menu` (
  `role_id` BIGINT NOT NULL COMMENT '角色ID',
  `menu_id` BIGINT NOT NULL COMMENT '菜单ID',
  PRIMARY KEY (`role_id`, `menu_id`),
  CONSTRAINT `fk_role_menu_role` FOREIGN KEY (`role_id`) REFERENCES `sys_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_role_menu_menu` FOREIGN KEY (`menu_id`) REFERENCES `sys_menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色菜单关联表';

-- =========================================
-- 8. 基础数据
-- =========================================

-- 插入系统管理员用户
INSERT INTO `sys_user` (`username`, `password`, `real_name`, `phone`, `email`, `status`) 
VALUES ('admin', '$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2', '系统管理员', '13800138000', 'admin@waterproof.com', 'ACTIVE') 
ON DUPLICATE KEY UPDATE `password` = VALUES(`password`);

-- 插入管理员角色
INSERT INTO `sys_role` (`role_name`, `role_code`, `description`) 
VALUES ('系统管理员', 'ADMIN', '系统最高权限角色') 
ON DUPLICATE KEY UPDATE `role_name` = VALUES(`role_name`), `description` = VALUES(`description`);

-- 关联用户和角色
INSERT INTO `sys_user_role` (`user_id`, `role_id`) 
SELECT u.id, r.id FROM `sys_user` u, `sys_role` r WHERE u.username = 'admin' AND r.role_code = 'ADMIN'
ON DUPLICATE KEY UPDATE `user_id` = VALUES(`user_id`), `role_id` = VALUES(`role_id`);

-- 插入基础菜单
INSERT INTO `sys_menu` (`parent_id`, `menu_name`, `menu_type`, `path`, `component`, `permission`, `icon`, `order_num`, `status`) 
VALUES 
(0, '系统管理', 'MENU', '/system', 'System', NULL, 'setting', 1, 'ACTIVE'),
(1, '用户管理', 'MENU', '/system/user', 'User', 'system:user:view', 'user', 1, 'ACTIVE'),
(1, '角色管理', 'MENU', '/system/role', 'Role', 'system:role:view', 'team', 2, 'ACTIVE'),
(1, '菜单管理', 'MENU', '/system/menu', 'Menu', 'system:menu:view', 'menu', 3, 'ACTIVE'),
(0, '客户管理', 'MENU', '/customer', 'Customer', NULL, 'customer', 2, 'ACTIVE'),
(5, '客户列表', 'MENU', '/customer/list', 'CustomerList', 'customer:list:view', 'list', 1, 'ACTIVE'),
(5, '线索管理', 'MENU', '/customer/lead', 'LeadList', 'customer:lead:view', 'opportunity', 2, 'ACTIVE'),
(0, '工单管理', 'MENU', '/workorder', 'Workorder', NULL, 'file-done', 3, 'ACTIVE'),
(8, '工单列表', 'MENU', '/workorder/list', 'WorkorderList', 'workorder:list:view', 'list', 1, 'ACTIVE'),
(8, '工单统计', 'MENU', '/workorder/statistics', 'WorkorderStatistics', 'workorder:statistics:view', 'bar-chart', 2, 'ACTIVE'),
(0, '项目管理', 'MENU', '/project', 'Project', NULL, 'project', 4, 'ACTIVE'),
(11, '项目列表', 'MENU', '/project/list', 'ProjectList', 'project:list:view', 'list', 1, 'ACTIVE'),
(11, '合同管理', 'MENU', '/project/contract', 'ContractList', 'project:contract:view', 'file-text', 2, 'ACTIVE'),
(0, '人员管理', 'MENU', '/hr', 'HR', NULL, 'user', 5, 'ACTIVE'),
(14, '人员列表', 'MENU', '/hr/list', 'HRList', 'hr:list:view', 'list', 1, 'ACTIVE'),
(14, '班组管理', 'MENU', '/hr/team', 'TeamList', 'hr:team:view', 'team', 2, 'ACTIVE'),
(0, '物料管理', 'MENU', '/material', 'Material', NULL, 'box', 6, 'ACTIVE'),
(17, '物料列表', 'MENU', '/material/list', 'MaterialList', 'material:list:view', 'list', 1, 'ACTIVE'),
(17, '库存管理', 'MENU', '/material/inventory', 'InventoryList', 'material:inventory:view', 'database', 2, 'ACTIVE'),
(0, '财务管理', 'MENU', '/finance', 'Finance', NULL, 'money', 7, 'ACTIVE'),
(20, '收款管理', 'MENU', '/finance/receipt', 'ReceiptList', 'finance:receipt:view', 'dollar', 1, 'ACTIVE'),
(20, '成本管理', 'MENU', '/finance/cost', 'CostList', 'finance:cost:view', 'calculator', 2, 'ACTIVE'),
(0, '质保管理', 'MENU', '/warranty', 'Warranty', NULL, 'shield', 8, 'ACTIVE'),
(23, '质保列表', 'MENU', '/warranty/list', 'WarrantyList', 'warranty:list:view', 'list', 1, 'ACTIVE'),
(23, '质保维修', 'MENU', '/warranty/repair', 'WarrantyRepairList', 'warranty:repair:view', 'tool', 2, 'ACTIVE'),
(0, '数据分析', 'MENU', '/analysis', 'Analysis', NULL, 'pie-chart', 9, 'ACTIVE'),
(26, '经营报表', 'MENU', '/analysis/report', 'Report', 'analysis:report:view', 'file-text', 1, 'ACTIVE'),
(26, '驾驶舱', 'MENU', '/analysis/dashboard', 'Dashboard', 'analysis:dashboard:view', 'dashboard', 2, 'ACTIVE') 
ON DUPLICATE KEY UPDATE `menu_name` = VALUES(`menu_name`), `path` = VALUES(`path`), `component` = VALUES(`component`), `permission` = VALUES(`permission`), `icon` = VALUES(`icon`), `order_num` = VALUES(`order_num`), `status` = VALUES(`status`);
