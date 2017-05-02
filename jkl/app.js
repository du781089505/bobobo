var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var index = require('./routes/index');
var users = require('./routes/users');
var homepage = require('./routes/homepage');
var details = require('./routes/details');
var personal = require('./routes/personal')
var app = express();


//设置全局跨域
  app.all('*', function(req, res, next) {
       res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Headers", "X-Requested-With");
       res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
       res.header("X-Powered-By",' 3.2.1')
       res.header("Content-Type", "application/json;charset=utf-8");
       next();
   });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
	secret:"12345",
	name:'testapp',
	resave:false,
	saveUninitiazed:true
}))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/homepage', homepage);
app.use('/details', details);
app.use('/personal', personal);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
app.listen("1234",function(){
	console.log("server start .......")
})
module.exports = app;
