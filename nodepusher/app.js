var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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


var http = require('http');
var sio = require('socket.io');
var server = http.createServer().listen(process.env.PORT, process.env.IP);
var io = sio.listen(server);


console.log('listening on: ' + process.env.PORT + ' ' + process.env.IP)
io.sockets.on('connection', function(socket) {
  console.log('connection');

  var fs = require("fs");
  // Watch the sim directory
  fs.watch("/home/ubuntu/lmax", {persistent: true}, function(event, fileName) {
    console.log("Event: " + event);
    console.log(fileName + "\n");
    console.log(fileName.indexOf(".",0) + "\n");
    console.log(fileName.indexOf("journal",0));


    if (fileName.indexOf("journal",0) != -1 && fileName.indexOf(".",0) == -1 && fileName.indexOf("~",0) == -1) {
    //tail the file that triggered the event  
    var Tail = require('tail').Tail;
    var tail = new Tail("/home/ubuntu/lmax/" + fileName, "\n", {}, true);
    tail.watch();
    console.log("tail");
    console.log(tail);
    tail.on("line", function(data) {
      console.log("line changed: ")
      console.log(data);
    });
    tail.on("error", function(error) {
      console.log("ERROR: ")
      console.log('ERROR: ', error);
    });
}
  });


  socket.emit('news', {
    hello: 'world'
  });
  socket.on('message', function(data) {
    console.log(data);
  });
});

module.exports = app;
