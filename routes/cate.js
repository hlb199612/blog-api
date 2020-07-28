var express = require ('express');                              // 引入Express对象
var router = express.Router ();                                    // 引入路由对象
const CateController = require('../controllers/cate');      // 引入自定义的controller
router.get ('/', CateController.list);            // 定义分类列表路由, GET请求
// router.get ('/:id', CateController.info);       // 定义单条分类路由, GET请求
router.post ('/', CateController.add);       // 定义添加分类路由, POST请求
// router.put ('/', CateController.update);       // 定义修改分类路由, PUT请求
// router.delete ('/', CateController.remove);      // 定义删除分类路由, DELETE请求
module.exports = router;                               // 导出路由, 供app.js文件调用