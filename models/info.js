const Sequelize = require('sequelize');            // 引入Sequelize模块
const db = require('../db');                              // 引入数据库实例
// 定义model
const Info = db.define('Info', {
  id: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
    autoIncrement: true},                                          // 主键
  title: {type: Sequelize.STRING(20), allowNull: false},      // 博客名称
  subtitle: {type: Sequelize.STRING(30), allowNull: false},      // 副标题
  about: {type: Sequelize.TEXT, allowNull: false}                  // 关于我们
}, {
  underscored: true,                                          // 是否支持驼峰
  tableName: 'info',                                          // MySQL数据库表名
});
module.exports = Info;                                          // 导出model