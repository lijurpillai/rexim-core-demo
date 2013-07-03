exports.processRulesData = function(socket,rulesData){

	console.log("Initilizing processRulesData");
	var activeUsers = Object.keys(IO.connected).length;
	var clientId = socket.id;	
	
	socket.on('noResultsFound',function(data){	
  			  var currentdate = new Date();
          var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
          data.timeStamp = datetime;      
  			  data.clientId = clientId;  			  			  
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