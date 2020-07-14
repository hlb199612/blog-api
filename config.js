const config = {                              // 默认的dev配置
  DEBUG: true,                                    // 是否调试模式
  // MySQL数据库连接配置
  MYSQL: {
    host: 'localhost',
    database: 'blog',
    username: 'root',
    password: 'root'
  }
};
if (process.env.NODE_ENV === 'production') {
  // 生产环境的MySQL数据库连接配置
  config.MYSQL = {
    host: '121.196.126.70',
      database: 'blog',
      username: 'root',
      password: 'hlb199612'
  };
}
module.exports = config;                  // 导出配置