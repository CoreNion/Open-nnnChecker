var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var session = require('cookie-session');

var indexRouter = require('./routes/index');
var nnnSigninRouter = require('./routes/nnnsignin');
var nnnSignin_callbackRouter = require('./routes/nnnsignin_callback');
var twitterSignin = require('./routes/proof/twitter/signin');
var twitterSignin_callback = require('./routes/proof/twitter/callback');
var twitterResult = require('./routes/proof/twitter/result');
var twittertweet = require('./routes/proof/twitter/tweet');

var home = require("./routes/home");
var logout = require('./routes/logout');

var app = express();
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'", "www.googletagmanager.com", "www.google-analytics.com", "platform.twitter.com", "https://ssl.google-analytics.com"],
      "style-src": ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
      "img-src": ["'self'", "data: pbs.twimg.com www.google-analytics.com"],
      "font-src": ["'self'", "fonts.gstatic.com"],
      "frame-src": ["'self'", "https://twitter.com", "platform.twitter.com", "syndication.twitter.com"],
      "connect-src": ["'self'", "https://www.google-analytics.com"],
    },
  })
);

//デバッグ環境ではhttps必須を無効化
const hasSecure = app.get('env') === 'development' ? false : true;
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: hasSecure,
    maxage: 300000
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/nnnsignin', nnnSigninRouter);
app.use('/nnnsignin_callback', nnnSignin_callbackRouter);
app.use('/home', home);
app.use('/logout', logout);
app.use('/proof/twitter/signin', twitterSignin);
app.use('/proof/twitter/callback', twitterSignin_callback);
app.use('/proof/twitter/result', twitterResult);
app.use('/proof/twitter/tweet', twittertweet);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err)

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.userMessage = err.userMessage;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
