const Common = require('./common'); //引入公共方法
const CateModel = require('../models/cate'); //引入cate表的model数据映射
const Constant = require('../constant/constant'); //引入常量
const dateFormat = require('dateformat'); //引入dateform时间格式处理包

// 配置对象
let exportObj = {
  list,
  add
};

// 导出对象, 供其他模块调用
module.exports = exportObj;

// 获取分类列表方法
function list(req, res) {
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS);
  // 定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: (cb) => {
      // 如果传入了dropList参数, 代表需要下拉列表, 跳过分页逻辑
      if (req.query.dropList) {
        cb(null);
      } else {
        // 调用公共方法中的校验参数方法, 如果成功, 则继续后面的操作
        // 如果失败则传递错误信息到async的最终方法中
        Common.checkParams(req.query, ['page', 'rows'], cb);
      }
    },
    // 查询方法, 依赖校验参数方法
    query: ['checkParams', (results, cb) => {
      let searchOption;                                    // 设定搜索对象
      if (req.query.dropList) {                        // 判断是否传入了dropList参数
        searchOption = {                                    // 如果传入了, 则不分页查询
          order: [['created_at', 'DESC']]
        }
      } else {
        // 如果没传入, 则分页查询
        // 根据前端提交的参数计算SQL语句中需要的offset, 即从多少条开始查询
        let offset = req.query.rows * (req.query.page - 1) || 0;
        // 根据前端提交的参数计算SQL语句中需要的limit, 即查询多少条
        let limit = parseInt(req.query.rows) || 20;
        let whereCondition = {};                        // 设定一个查询条件对象
        // 如果查询姓名存在, 查询对象增加姓名
        if (req.query.name) {
          whereCondition.name = req.query.name;
        }
        searchOption = {
          where: whereCondition,
          offset: offset,
          limit: limit,
          order: [['created_at', 'DESC']]
        }
      }
      // 通过offset和limit使用cate的model去数据库中查询
      // 并按照创建时间排序
      CateModel
        .findAndCountAll(searchOption)
        .then(function (result) {
          // 查询结果处理
          let list = [];                        // 定义一个空数组list, 用来存放最终结果
          result.rows.forEach((v, i) => {
            // 遍历SQL查询出来的结果, 处理后装入list
            let obj = {
              id: v.id,
              name: v.name,
              createdAt: dateFormat(v.createdAt, 'yyyy-mm-dd HH:MM:ss')
            };
            list.push(obj);
          });
          resObj.data = {                        // 给返回结果赋值, 包括列表和总条数
            list,
            count: result.count
          };
          cb(null);                                    // 继续后续操作
        })
        .catch(function (err) {
          // 错误处理
          console.log(err);                        // 打印错误日志
          cb(Constant.DEFAULT_ERROR);      // 传递错误信息到async的最终方法中
        });
    }]
  };
  Common.autoFn(tasks, res, resObj)      // 执行公共方法中的autoFn方法, 返回数据
}

// 添加分类方法
function add (req, res) {
  // 定义一个返回对象
  const resObj = Common.clone (Constant.DEFAULT_SUCCESS);
  let tasks = {                                          // 定义一个async任务
    // 校验参数方法
    checkParams: (cb) => {
      // 调用公共方法中的校验参数方法, 如果成功则继续后面操作
      // 如果失败则传递错误信息到async的最终方法中
      Common.checkParams (req.body, ['name'], cb);
    },
    // 添加方法, 依赖校验参数方法
    add: ['checkParams', (results, cb)=>{
      // 使用cate的model中的方法插入到数据库中
      CateModel
        .create ({
          name: req.body.name,
          imgSrc: req.body.img_src,
          describe: req.body.describe,
          tag: req.body.tag,
          borderColor: req.body.border_color,
          linkUrl: req.body.link_url,
          createdAt: dateFormat( new Date(), 'yyyy-mm-dd HH:MM:ss')
        })
        .then (function (result) {
          // 插入结果处理
          cb (null);                                    // 继续后续操作
        })
        .catch (function (err) {
          // 错误处理
          console.log (err);                        // 打印错误日志
          cb (Constant.DEFAULT_ERROR);      // 传递错误信息到async的最终方法中
        });
    }]
  };
  Common.autoFn (tasks, res, resObj)      // 执行公共方法中的autoFn方法, 返回数据
}