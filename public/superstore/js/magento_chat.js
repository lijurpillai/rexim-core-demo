jQ(function(){ 
var box = null;
var _supportuser = "";
var adminClientId = "";

	jQ(".footer-container").append("<div id ='chatBox'></div>");
	if(box) {       
                 box.chatbox("option", "boxManager").toggleBox();
              }
    else {
	          box = jQ("#chatBox").
            chatbox({id:"CSR",user:{key : "value"},title : "REXIM Chat",
              messageSent : function(id, user, msg) 
                {jQ("#chatBox").chatbox("option", "boxManager")
                  .addMsg(id, msg);
                }
              });
            jQ('.ui-chatbox').hide();
          }

    socket.on('msgFromAdmin',function(msg,adminId,supportUser){
          adminClientId = adminId;
          _supportuser = supportUser;
          jQ('.ui-chatbox').show(500);
          box.chatbox("option", "boxManager").addMsg(supportUser, msg);

        });
    jQ('.ui-chatbox-input-box ').keydown(function(event) {
          console.log("in here");
          if (event.keyCode && event.keyCode == jQ.ui.keyCode.ENTER) {
              msg = jQ.trim(jQ(this).val());
              console.log("msg -- "+msg);
              if (msg.length > 0) {
                  box.chatbox("option", "boxManager").addMsg("Me", msg);
                  socket.emit('msgToAdmin',msg,adminClientId);
                  
              }
              jQ(this).val('');
              return false;
          }
      });
  });