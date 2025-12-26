const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 工单验收记录模型定义
const WorkorderInspection = sequelize.define('WorkorderInspection', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    comment: '验收记录ID'
  },
  workorder_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '工单ID'
  },
  inspector_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '验收人ID'
  },
  inspection_time: {
    type: DataTypes.DATETIME,
    allowNull: false,
    comment: '验收时间'
  },
  result: {
    type: DataTypes.ENUM('PASS', 'FAIL'),
    allowNull: false,
    comment: '验收结果'
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '验收意见'
  },
  photos: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: '验收照片（JSON数组）'
  },
  customer_signature: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '客户签字（图片路径）'
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
  tableName: 'workorder_inspection',
  timestamps: false,
  indexes: [
    { name: 'idx_workorder_id', fields: ['workorder_id'] },
    { name: 'idx_inspector_id', fields: ['inspector_id'] },
    { name: 'idx_result', fields: ['result'] }
  ]
});

module.exports = WorkorderInspection;
