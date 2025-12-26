const { sequelize } = require('../config/database');

// 导入工单相关模型
const Workorder = require('./workorder');
const WorkorderSurvey = require('./workorder_survey');
const WorkorderConstruction = require('./workorder_construction');
const WorkorderInspection = require('./workorder_inspection');
const WorkorderMaterial = require('./workorder_material');

// 定义模型之间的关系
Workorder.hasOne(WorkorderSurvey, {
  foreignKey: 'workorder_id',
  as: 'survey',
  onDelete: 'CASCADE'
});

Workorder.hasMany(WorkorderConstruction, {
  foreignKey: 'workorder_id',
  as: 'constructions',
  onDelete: 'CASCADE'
});

Workorder.hasOne(WorkorderInspection, {
  foreignKey: 'workorder_id',
  as: 'inspection',
  onDelete: 'CASCADE'
});

Workorder.hasMany(WorkorderMaterial, {
  foreignKey: 'workorder_id',
  as: 'materials',
  onDelete: 'CASCADE'
});

WorkorderSurvey.belongsTo(Workorder, {
  foreignKey: 'workorder_id',
  as: 'workorder'
});

WorkorderConstruction.belongsTo(Workorder, {
  foreignKey: 'workorder_id',
  as: 'workorder'
});

WorkorderInspection.belongsTo(Workorder, {
  foreignKey: 'workorder_id',
  as: 'workorder'
});

WorkorderMaterial.belongsTo(Workorder, {
  foreignKey: 'workorder_id',
  as: 'workorder'
});

module.exports = {
  sequelize,
  Workorder,
  WorkorderSurvey,
  WorkorderConstruction,
  WorkorderInspection,
  WorkorderMaterial
};
