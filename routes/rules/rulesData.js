exports.processRulesData = function(socket,rulesData){

	console.log("Initilizing processRulesData");
	var activeUsers = Object.keys(IO.connected).length;
	var clientId = socket.id;
  var currentdate = new Date();
          var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();	
	
	socket.on('0001',function(data){	
  			  
          data.timeStamp = datetime;      
  			  data.clientId = clientId;  			  			  
  			  rulesData.push(data);
  			  console.log(rulesData);
  			  IO.sockets.emit('0001', { noResultsFound: rulesData });
	      });

	socket.on('0002',function(data){	
  			  data.timeStamp = datetime;
  			  data.clientId = clientId;  			  
  			  rulesData.push(data);
  			  console.log(rulesData);
  			  IO.sockets.emit('0002', { couponError: rulesData });
	      });

  socket.on('0003',function(data){ 
          console.log("inside 0003");
          data.timeStamp = datetime;
          data.clientId = clientId;
          if (data.ruleDetails.autoResponseOffer) {
            var offer = "FREESHIP";
            IO.sockets.socket(clientId).emit('offerCode',offer);
          };         
          rulesData.push(data);
          console.log(rulesData);
          IO.sockets.emit('0003', { couponError: rulesData }); // auto response of offer code
        });

	}