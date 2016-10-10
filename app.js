var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/webpage.html');
});

http.listen(3005, function(){
  console.log('listening on *:3005');
});
var users = 0;

io.sockets.on('connection', function(socket){
  console.log(++users+ " users connected.");


  
  socket.on('message', function(msg){
    io.emit("new-message", msg);
  });

  // io.emit('chat message', msg);
  
  socket.on('disconnect', function(){
    console.log(--users, "users remaining");
  })
});