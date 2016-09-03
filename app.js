var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/webpage.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
var users = 0;
io.sockets.on('connection', function(socket){
  console.log(++users+ " users connected.");
  socket.on('send-message', function(msg){
    io.sockets.emit("new-message", msg);
  });
  socket.on('disconnect', function(){
    console.log(--users, "users remaining");
  })
});