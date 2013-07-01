exports.processRulesData = function(socket,rulesData){

	console.log("Initilizing processRulesData");
	var activeUsers = Object.keys(IO.connected).length;
	var clientId = socket.id;	
	
	socket.on('noResultsFound',function(data){	
  			  
  			  data.clientId = clientId;
  			  console.log("Rules Data ---->");  			  
  			  rulesData.push(data);
  			  console.log(rulesData);
  			  IO.sockets.emit('noResultsFound', { noResultsFound: rulesData });
	      });

	socket.on('couponError',function(data){	
  			  
  			  data.clientId = clientId;  			  
  			  rulesData.push(data);
  			  console.log(rulesData);
  			  IO.sockets.emit('couponError', { couponError: rulesData });
	      });

	}