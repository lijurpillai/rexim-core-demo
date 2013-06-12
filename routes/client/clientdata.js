exports.processClientData = function(socket){	
	console.log("i am getting initialized......");
	 var sendAdminData = require('../admin/admindata.js'); 	 
	 var customerId = "owaCustomer1";
	 var errorType = "payment";	 

	 function errorData(customerId, clientId, errorType)
		{
		 this.customerId = customerId;
		 this.clientId = clientId;
		 this.errorType = errorType;
		}
	  
	 socket.on('owa',function(data){   // getting analytics data
	  	    console.log("Visited URL :" + data.analytics.href);    
	  	  });   
	  
	    socket.on('pageData',function(data){	  
	        var url = data.url;
	        var ip = socket.handshake.address.address;
	        console.log("url ---- >" + url);
	        console.log("ip --- > "+ ip);
  			sendAdminData.processAdminData(socket);
	  
	      });  	

	    socket.on('offerView',function(offerData){
	    	OFFER_COUNT++
	    	sendAdminData.processOfferData(socket);
	    });

	    socket.on('pymtError',function(pymtError){
	    	ERROR_COUNT++;			
			PYMT_ERROR_DATA.push(new errorData(customerId,socket.id,errorType) );
	    	sendAdminData.processErrorData(socket);
	    });

	    
}