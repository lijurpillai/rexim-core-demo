module.exports = function(server){

//Initialize socket
var socket = require('socket.io');
var io = socket.listen(server);

// Since heroku does not support websocket, configuring XHR long polling
/*io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});*/

console.log("working !!!");
return io;
}