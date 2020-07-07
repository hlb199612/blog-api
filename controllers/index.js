const Common = require ('./common');                        // 引入公共方法
const AdminModel = require ('../models/admin');      // 引入admin表的model
const Constant = require ('../constant/constant');      // 引入常量
const dateFormat = require ('dateformat');                  // 引入dateformat包
const Token = require ('./token');                              // 引入Token处理方法
const TOKEN_EXPIRE_SENCOND = 3600;            // 设定默认Token的过期时间, 单位为s
// 配置对象
let exportObj = {
  login
};
module.exports = exportObj;                        // 导出对象, 供其他模块调用
//登录方法
function login (req, res) {
  // 定义一个返回对象
  const resObj = Common.clone (Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法, 如果成功则继续后面的操作
      // 如果失败则传递错误信息到async的最终方法中
      Common.checkParams (req.body, ['username', 'password'], cb);
    },
    // 查询方法
    query: ['checkParams', (results, cb) => {
      // 通过用户名和密码到数据库中查询
      AdminModel
        .findOne ({
          where: {
            username: req.body.username,
            password: req.body.password
          }
        })
        .then (function (result) {
          // 查询结果处理
          if(result){
            // 如果查询到了结果
            // 组装数据, 将查询结果组装到成功返回的数据中
            resObj.data = {
              id: result.id,
              username: result.username,
              name: result.name,
              role: result.role,
              lastLoginAt: dateFormat (result.lastLoginAt, 'yyyy-mm-dd HH:MM:ss'),
              createdAt: dateFormat (result.createdAt, 'yyyy-mm-dd HH:MM:ss')
            };
            // 将admin的id保存在Token中
            const adminInfo = {
              id: result.id
            };
            // 生成Token
            let token = Token.encrypt(adminInfo, TOKEN_EXPIRE_SENCOND);
            resObj.data.token = token;      // 将Token保存在返回对象中, 返回前端
            cb (null, result.id);                  // 继续后续操作, 传递admin的id参数
          }else{
            // 没有查询到结果, 传递错误信息到async的最终方法
            cb (Constant.LOGIN_ERROR);
          }
        })
        .catch (function (err) {
          // 错误处理
          console.log (err);                        // 打印错误日志
          cb (Constant.DEFAULT_ERROR);      // 传递错误信息到async的最终方法中
        });
    }],
    // 写入上次登录日期
    writeLastLoginAt: ['query', (results, cb) => {
      let adminId = results['query'];      // 获取前面传递过来的参数admin的id
      // 通过id查询, 将当前时间更新为数据库中的上次登录时间
      AdminModel
        .update ({
          lastLoginAt: new Date()
        }, {
          where: {
            id: adminId
          }
        })
        .then (function (result) {
          // 更新结果处理
          if(result){
            cb (null);                              // 如果更新成功, 就继续后续操作
          }else{
            // 如果更新失败, 就传递错误信息到async最终方法
            cb (Constant.DEFAULT_ERROR);
          }
        })
        .catch (function (err) {
          // 错误处理
          console.log ('更新失败', err);                        // 打印错误日志
          cb (Constant.DEFAULT_ERROR);      // 传递错误信息到async的最终方法中
        });
    }]
  };
  Common.autoFn (tasks, res, resObj)      // 执行公共方法中的autoFn方法, 返回数据
}