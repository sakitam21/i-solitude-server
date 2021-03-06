var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categorysRouter = require('./routes/categorys');
var materialsRouter = require('./routes/materials');

var app = express();

app.get('/images/*', function (req, res) {
    res.sendFile( __dirname + "/public/" + req.url );
    console.log("Request for " + req.url + " received.");
})

//跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Credentials",true);
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", '*');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categorys', categorysRouter);
app.use('/materials', materialsRouter);

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
