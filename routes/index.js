var express = require ('express');                              // 引入Express对象
var router = express.Router ();                                    // 引入路由对象
const IndexController = require('../controllers/index');      // 引入自定义的controller
router.post ('/login', IndexController.login);      // 定义登录路由, POST请求
module.exports = router;                              // 导出路由, 供app.js文件调用