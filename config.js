const config = {                              // 默认的dev配置
  DEBUG: true,                                    // 是否调试模式
  // MySQL数据库连接配置
  MYSQL: {
    host: 'http://121.196.126.70',
    database: 'blog',
    username: 'root',
    password: 'root'
  }
};
if (process.env.NODE_ENV === 'production') {
  // 生产环境的MySQL数据库连接配置
  config.MYSQL = {
    host: 'aaa.mysql.rds.aliyuncs.com',
    database: 'aaa',
    username: 'aaa',
    password: 'aaa'
  };
}
module.exports = config;                  // 导出配置