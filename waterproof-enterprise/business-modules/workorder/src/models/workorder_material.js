const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 工单物料使用模型定义
const WorkorderMaterial = sequelize.define('WorkorderMaterial', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    comment: 'ID'
  },
  workorder_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '工单ID'
  },
  material_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '物料ID'
  },
  quantity: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '使用数量'
  },
  unit_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '单价'
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '总金额'
  },
  used_at: {
    type: DataTypes.DATETIME,
    allowNull: false,
    comment: '使用时间'
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    comment: '创建时间'
  }
}, {
  tableName: 'workorder_material',
  timestamps: false,
  indexes: [
    { name: 'idx_workorder_id', fields: ['workorder_id'] },
    { name: 'idx_material_id', fields: ['material_id'] },
    { name: 'idx_used_at', fields: ['used_at'] }
  ]
});

module.exports = WorkorderMaterial;
