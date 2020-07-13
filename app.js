// 引入Token验证中间件
const verifyMiddleware = require('./routes/middleware/verify');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var cateRouter = require('./routes/cate');            // 引入分类管理模块路由文件
// var articleRouter = require('./routes/article');      // 引入文章管理模块路由文件
// var InfoRouter = require('./routes/info');      // 引入博客信息管理模块路由文件
// var adminRouter = require('./routes/admin');            // 引入管理员管理模块路由文件
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","http://localhost:8081");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  res.header('Access-Control-Allow-Credentials', true);
  res.header("X-Powered-By", ' 3.2.1');
  next();
});


app.use('/', verifyMiddleware.verifyToken, indexRouter);
app.use('/cate', verifyMiddleware.verifyToken, cateRouter);                        // 配置分类管理模块路由path
// app.use('/article', verifyMiddleware.verifyToken, articleRouter);            // 配置文章管理模块路由path
// app.use('/info', verifyMiddleware.verifyToken, InfoRouter);                        // 配置博客信息管理模块路由path
// app.use('/admin', verifyMiddleware.verifyToken, adminRouter);                        // 配置管理员管理模块路由path

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
