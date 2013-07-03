exports.offerHandler = function(socket){
	console.log("Initializing offerHandler");
	socket.on('offerCode',function(offerCode){
	  console.log("Insode socket Offer code");		
      IO.sockets.socket(offerCode.clientId).emit('offerCode',offerCode.offer); 

    });


}