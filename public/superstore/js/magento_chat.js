jQ(function(){ 
var box = null;
	jQ(".footer-container").append("<div id ='chatBox'></div>");
	if(box) {
                  box.chatbox("option", "boxManager").toggleBox();
              }
    else {
	          box = jQ("#chatBox").chatbox({id:"CSR", 
	                                        user:{key : "value"},
	                                        title : "REXIM Chat",
	                                        messageSent : function(id, user, msg) {
	                                           
	                                            jQ("#chatBox").chatbox("option", "boxManager")
	                                            .addMsg(id, msg);
	                                        }});
              }

    socket.on('msgFromAdmin',function(msg,adminId,supportUser){
          adminClientId = adminId;
          /*$("#chatDiv").show(500);
          $('#conversation').append('<b>'+supportUser + ':</b> ' + msg + '<br>');
          var objDiv = document.getElementById("conversation");
          objDiv.scrollTop = objDiv.scrollHeight;*/
          console.log("OHM");
        });


  });