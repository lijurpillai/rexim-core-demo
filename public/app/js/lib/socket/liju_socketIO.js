$(function(){

	var url = 'http://localhost:3000';
	var socket = io.connect(url);   
	console.log(socket);
    socket.emit('setAdmin', { adminKey: 'owaCustomer1_Admin' });       

    $("#chatBtn").click(function(){			
    	  /*$("#errorMsg").show();
          $("#chatDiv").show(500);
          socket.emit('adduser', "Liju");
          socket.emit('pymtError',{pymtError : "paymtFailed"});*/
          alert("water vap");
    });

});