const Sequelize = require('sequelize');            // 引入Sequelize模块
const db = require('../db');                              // 引入数据库实例
// 定义model
const Cate = db.define('Cate', {
  id: {type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
    autoIncrement: true},                                          // 分类id
  name: {type: Sequelize.STRING(20), allowNull: false},      // 分类名称
  imgSrc: {type: Sequelize.STRING(255), allowNull: false},   //图片地址
  describe: {type: Sequelize.STRING(255), allowNull: false},   //网页描述
  borderColor: {type: Sequelize.STRING(25), allowNull: false},   //边框颜色
  tag: {type: Sequelize.STRING(30), allowNull: false},   //分类
  linkUrl: {type: Sequelize.STRING(255), allowNull: false}   //链接
}, {
  underscored: true,                                                // 是否支持驼峰
  tableName: 'cate',                                                // MySQL数据库表名
});
module.exports = Cate;                                                // 导出model