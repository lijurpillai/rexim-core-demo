exports.processAnalyticsData = function(socket){

	/*var url = data.url;
	var ip = socket.handshake.address.address;
	var referrer = data.referrer;*/
	var activeUsers = Object.keys(IO.connected).length;
	var clientId = socket.id;
	var ip = socket.handshake.address.address;

	
	
	socket.on('analyticsData',function(data){	
  			  //data.activeUsers = activeUsers;
  			  data.clientId = clientId;
  			  data.ip = ip;
  			  console.log(data);
  			  IO.sockets.emit('analyticsData', { analyticsData: data });
	      });

	/*console.log("Analytics data loaded........"+ url);
	console.log("Analytics data loaded........"+ ip);
	console.log("Analytics data loaded........"+ referrer);
	console.log("Analytics data loaded........"+ activeUsers);*/




}