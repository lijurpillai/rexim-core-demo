exports.processRulesData = function(socket){

	
	var activeUsers = Object.keys(IO.connected).length;
	var clientId = socket.id;	
	
	socket.on('noResultsFound',function(data){	
  			  
  			  data.clientId = clientId;
  			  console.log(data);
  			  IO.sockets.emit('noResultsFound', { noResultsFound: data });
	      });

	socket.on('couponError',function(data){	
  			  
  			  data.clientId = clientId;
  			  console.log(data);
  			  IO.sockets.emit('couponError', { couponError: data });
	      });

	}