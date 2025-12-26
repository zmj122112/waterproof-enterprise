const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

// 创建Sequelize实例
const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'waterproof_enterprise',
  username: process.env.DB_USER || 'waterproof_user',
  password: process.env.DB_PASSWORD || 'waterproof_password',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    connectTimeout: 60000,
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 60000,
    idle: 10000,
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  timezone: '+08:00', // 设置时区为北京时间
});

// 测试数据库连接
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ 工单管理模块 - 数据库连接成功');
  } catch (error) {
    console.error('❌ 工单管理模块 - 数据库连接失败:', error);
    // 开发环境下继续运行，生产环境下退出
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

// 初始化数据库模型
const initModels = () => {
  // 导入所有模型
  const models = require('../models');
  
  // 如果需要同步模型到数据库（开发环境）
  if (process.env.NODE_ENV === 'development') {
    sequelize.sync({ alter: true })
      .then(() => console.log('✅ 工单管理模块 - 数据库模型同步成功'))
      .catch((error) => console.error('❌ 工单管理模块 - 数据库模型同步失败:', error));
  }
};

module.exports = {
  sequelize,
  testConnection,
  initModels,
};
