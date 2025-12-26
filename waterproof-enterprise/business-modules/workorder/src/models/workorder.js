const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 工单模型定义
const Workorder = sequelize.define('Workorder', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    comment: '工单ID'
  },
  workorder_no: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    comment: '工单号'
  },
  customer_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '客户ID'
  },
  project_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '关联项目ID（B端项目）'
  },
  workorder_type: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '工单类型：卫生间漏水、屋顶补漏等'
  },
  leak_type: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: '漏水类型'
  },
  leak_area: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: '漏水面积'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '问题描述'
  },
  address: {
    type: DataTypes.STRING(500),
    allowNull: false,
    comment: '服务地址'
  },
  status: {
    type: DataTypes.ENUM(
      'CREATED',
      'ASSIGNED',
      'SURVEYING',
      'QUOTING',
      'APPROVED',
      'CONSTRUCTING',
      'INSPECTING',
      'COMPLETED',
      'CANCELLED'
    ),
    allowNull: false,
    defaultValue: 'CREATED',
    comment: '工单状态'
  },
  created_by: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '创建人'
  },
  assigned_to: {
    type: DataTypes.BIGINT,
    allowNull: true,
    comment: '分配给（师傅/班组）'
  },
  estimate_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: '预估价格'
  },
  actual_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: '实际价格'
  },
  start_time: {
    type: DataTypes.DATETIME,
    allowNull: true,
    comment: '开工时间'
  },
  end_time: {
    type: DataTypes.DATETIME,
    allowNull: true,
    comment: '完工时间'
  },
  warranty_start: {
    type: DataTypes.DATETIME,
    allowNull: true,
    comment: '质保开始时间'
  },
  warranty_end: {
    type: DataTypes.DATETIME,
    allowNull: true,
    comment: '质保结束时间'
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    comment: '创建时间'
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
    comment: '更新时间'
  }
}, {
  tableName: 'workorder',
  timestamps: false,
  indexes: [
    { name: 'idx_customer_id', fields: ['customer_id'] },
    { name: 'idx_project_id', fields: ['project_id'] },
    { name: 'idx_workorder_status', fields: ['status'] },
    { name: 'idx_assigned_to', fields: ['assigned_to'] }
  ]
});

module.exports = Workorder;
