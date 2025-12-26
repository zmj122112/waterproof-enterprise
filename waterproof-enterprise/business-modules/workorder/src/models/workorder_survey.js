const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// 工单勘察记录模型定义
const WorkorderSurvey = sequelize.define('WorkorderSurvey', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    comment: '勘察记录ID'
  },
  workorder_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '工单ID'
  },
  surveyor_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    comment: '勘察人ID'
  },
  survey_time: {
    type: DataTypes.DATETIME,
    allowNull: false,
    comment: '勘察时间'
  },
  leak_point: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '漏水点'
  },
  leak_cause: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '漏水原因'
  },
  solution: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '解决方案'
  },
  photos: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: '勘察照片（JSON数组）'
  },
  videos: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: '勘察视频（JSON数组）'
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
  tableName: 'workorder_survey',
  timestamps: false,
  indexes: [
    { name: 'idx_workorder_id', fields: ['workorder_id'] },
    { name: 'idx_surveyor_id', fields: ['surveyor_id'] }
  ]
});

module.exports = WorkorderSurvey;
