const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 工单施工记录模型定义
const WorkorderConstruction = sequelize.define('WorkorderConstruction', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    comment: '施工记录ID'
  },
  workorder_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '工单ID'
  },
  constructor_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '施工人ID'
  },
  construction_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    comment: '施工日期'
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: false,
    comment: '开工时间'
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: false,
    comment: '完工时间'
  },
  process: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: '施工过程'
  },
  materials_used: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: '使用材料（JSON数组）'
  },
  photos: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: '施工照片（JSON数组）'
  },
  videos: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: '施工视频（JSON数组）'
  },
  weather: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: '天气情况'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '备注'
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
  tableName: 'workorder_construction',
  timestamps: false,
  indexes: [
    { name: 'idx_workorder_id', fields: ['workorder_id'] },
    { name: 'idx_constructor_id', fields: ['constructor_id'] },
    { name: 'idx_construction_date', fields: ['construction_date'] }
  ]
});

module.exports = WorkorderConstruction;
