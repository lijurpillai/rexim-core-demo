exports.configClientUser = function(socket){

var customer = {};  
	
//IO.sockets.on('connection', function (socket) { // on connection  

	var client = IO.sockets.clients();
	/*console.log("address  :"); 	console.log(socket.handshake);
	console.log("client  :");  console.log(client);*/
	console.log("socket id  :" + socket.id);

  socket.on('setCust',function(custId){             // setting cutomer id
    console.log("custId : " + custId.custKey); 
                                            
       var customerId = custId.custKey;             // add client id to custmId
       var clientId = socket.id;
       var new_cust = true;  
       var adminId =  customerId + "_Admin";   
       	
       	if( OWA_CUSTOMERS.length == 0){             // First ever occurance 
       		  	console.log("---first time ---");
		       	customer.cust_Id = customerId;
            customer.admin_Id = adminId;
		       	customer.client_Id = [clientId];   

		       	OWA_CUSTOMERS.push(customer);		       	
       	}
       	else{                                       // adding client id to existing cust id
	       	for (var i = 0; i < OWA_CUSTOMERS.length; i++) {
	       		console.log("inside for loop ------ 1 "); 
		       	if(OWA_CUSTOMERS[i].cust_Id == customerId ){
		       			console.log("---existing customer---");
		       			OWA_CUSTOMERS[i].client_Id.push(clientId);
		       			new_cust = false;       			
		       		}  
	       	}

	       	if(new_cust){                              // adding cust id and clinet id to new cust
	       		console.log("---new customer---");	       		 
		       	OWA_CUSTOMERS.push({cust_Id:customerId ,admin_Id:adminId, client_Id: [clientId]});
	       	}
       	} 	
       console.log(OWA_CUSTOMERS); // display full list of customer.

                                                    // Sending data to unique cust_id + clinet_id combo 
    for (var i = 0; i < OWA_CUSTOMERS.length; i++) {  
    	for (var j = 0; j < OWA_CUSTOMERS[i].client_Id.length; j++) {
    		var msg = "for your eyes only Client" + "----"+ OWA_CUSTOMERS[i].cust_Id + "----" + OWA_CUSTOMERS[i].client_Id[j];
    	  		IO.sockets.socket(OWA_CUSTOMERS[i].client_Id[j]).emit('msg',msg);
    	  	};     	
    };
     
  });  

}


exports.removeClientUser = function(socket){

for (var i = 0; i < OWA_CUSTOMERS.length; i++){
  for (var j = 0; j < OWA_CUSTOMERS[i].client_Id.length; j++) {

    if (OWA_CUSTOMERS[i].client_Id[j] == socket.id)
    {
      console.log("ding dong");
      OWA_CUSTOMERS[i].client_Id.splice(j, 1);
      console.log(OWA_CUSTOMERS);

    }
  }

}

}