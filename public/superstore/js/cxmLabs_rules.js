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




	//console.log(jQ('h2[class = "product-name"]').text(0));
	jQ('h2[class = "product-name"]').each(function(index){
		if(jQ(this).text() =='CN Clogs Beach/Garden Clog')
			jQ(this).bind("click",function(e){
				e.stopPropagation();
				console.log("sending socket");
			});
	});	
});