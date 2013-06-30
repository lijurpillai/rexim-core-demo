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