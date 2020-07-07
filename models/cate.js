const Sequelize = require('sequelize');            // 引入Sequelize模块
const db = require('../db');                              // 引入数据库实例
// 定义model
const Cate = db.define('Cate', {
  id: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
    autoIncrement: true},                                          // 分类id
  name: {type: Sequelize.STRING(20), allowNull: false},      // 分类名称
}, {
  underscored: true,                                                // 是否支持驼峰
  tableName: 'cate',                                                // MySQL数据库表名
});
module.exports = Cate;                                                // 导出model