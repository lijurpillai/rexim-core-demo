exports.configAdminUser = function(socket){
	console.log("<-- Inside configAdminUser -->");
	var admins = {};	

			socket.on('setAdmin',function(data){   // setting admin user
				console.log("<-- Inside configAdminUser > socket(setAdmin) -->");
			    console.log("--Admin ID----" + data.adminKey); 
			    var adminId = data.adminKey; 
			    var clientId = socket.id;     // add admin id to custmId		        
		        
		        if(OWA_ADMINS.length == 0){
		        	
		        	admins.adminId = adminId;
		        	admins.clientId = clientId;
		        	OWA_ADMINS.push(admins);	
		        }
		        else{		        	
		        	for (var i = 0; i < OWA_ADMINS.length; i++) {// on refresh of the admin page.		        		
		        		if (OWA_ADMINS[i].adminId == adminId){  // will have only one admin id for this release		        			
		        			OWA_ADMINS[i].clientId = clientId;  // replace existing cient id with new id
		        		}
		        	};
		        }
		        console.log("----Admin details --- >");
		        console.log(OWA_ADMINS);
		        
			});	
		
}