exports.processClientData = function(socket){	
	console.log("<--Inside processClientData-->");
	 var sendAdminData = require('../admin/admindata.js'); 
	 var sendAnalyticsData = require('../analytics/analyticsData.js');	 
	 var customerId = "owaCustomer1";
	 var errorType = "payment";	 

	 function errorData(customerId, clientId, errorType)
		{
		 this.customerId = customerId;
		 this.clientId = clientId;
		 this.errorType = errorType;
		}

	    socket.on('analyticsData',function(data){		                    
  			sendAnalyticsData.processAnalyticsData(socket,data);	  
	      });

	    socket.on('disconnect', function (){

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