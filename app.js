var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressSession = require('express-session');
var connectMongo = require('connect-mongo');

var routes = require('./routes/index');
var users = require('./routes/users');
var stories = require('./routes/stories');

mongoose.connect('mongodb://localhost/stories');
mongoose.connection.on('open', function() {console.log('Mongoose connected.'); });

var MongoStore = connectMongo(expressSession);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  expressSession(
    {
      secret: 'ziKologiia',
      saveUninitialized: false,
      resave: false,
      clear_interval: 900,
      cookie: { maxAge: 2 * 60 * 60 * 1000 },
      store: new MongoStore({ 
        //mongooseConnection: mongoose.connections[0] //try lynda way
        mongooseConnection: mongoose.connection 
      })
    }
  )
);

app.use('/', routes);
app.use('/login', routes);
app.use('/logout', routes);
app.use('/users', users);
app.use('/stories', stories);
app.use('/admin', function(req, res, next) {
  // GET 'http://www.example.com/admin/new'
  console.log(req.originalUrl); // '/admin/new'
  console.log(req.baseUrl); // '/admin'
  console.log(req.path); // '/new'
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
