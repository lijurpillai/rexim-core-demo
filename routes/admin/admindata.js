exports.processAdminData = function(socket){

     
	      console.log("connected users --- > " + CONNECTED_ID);   	      	      
	      /*console.log(OWA_ADMINS.length);
	      console.log(OWA_CUSTOMERS.length);*/
	  for (var i = 0; i < OWA_ADMINS.length; i++) {
	  	for (var j = 0; j < OWA_CUSTOMERS.length; j++) {	
	  		console.log("i am here --- >" + i + "<----->" + j);  		

	  		if(OWA_ADMINS[i].adminId == OWA_CUSTOMERS[j].admin_Id){
	  			console.log("i am here 2--- >"); 
	  			//IO.sockets.socket(OWA_ADMINS[i].client_Id).emit('pageview', { conn: connectedUsers });
	  			IO.sockets.emit('pageview', { conn: CONNECTED_ID }); // send active user data.

	  			socket.on('disconnect', function () {
	  			console.log(socket.id + '---- disconnected');	  			
			    IO.sockets.emit('pageview', { conn: CONNECTED_ID }); 
			});
	  		}  		
	  	};
	  	
	  };

};


exports.processOfferData = function(socket){
	IO.sockets.emit('offerview', { offer: OFFER_COUNT }); 
}

exports.processErrorData = function(socket,pymtErrorData){	
	console.log("the culprit -----> " + socket.id);
	IO.sockets.emit('pymtError', { pymtErrorData: PYMT_ERROR_DATA , errorCount:ERROR_COUNT }); 
}

