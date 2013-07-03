exports.chatHandler = function(socket){
	var usernames = {};
	console.log("Initializing Chat handler");
	// when the client emits 'adduser', this listens and executes
  socket.on('adduser', function(username){
    // we store the username in the socket session for this client
    socket.username = username;
    // add the client's username to the global list
    usernames[username] = username;
    // echo to client they've connected
    socket.emit('updatechat', 'Customer Support', 'How may I help you');
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
    // update the list of users in chat, client-side
    IO.sockets.emit('updateusers', usernames);
  });

  socket.on('sendchatToClient',function(msg,clientId,supportUser){
    var adminClientId = socket.id ;
    console.log("admin id ---- " + adminClientId);     
     IO.sockets.socket(clientId).emit('msgFromAdmin',msg,adminClientId,supportUser);
  });

  socket.on('msgToAdmin',function(msg,adminClientId){    
    console.log("admin id ---- " + adminClientId);     
     IO.sockets.socket(adminClientId).emit('msgFromClient',msg);
  });
  

  // when the user disconnects.. perform this
  socket.on('disconnect', function(){
    // remove the username from global usernames list
    delete usernames[socket.username];
    // update list of users in chat, client-side
    IO.sockets.emit('updateusers', usernames);
    // echo globally that this client has left
    socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
  });
}