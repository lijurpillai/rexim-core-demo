module.exports = function(server,sessionStore){

//Initialize socket
var socket = require('socket.io');
var io = socket.listen(server);
io.set('log level', 1);

var utils = require('express/node_modules/connect/lib/utils')
var cookie = require('express/node_modules/cookie');

function parseCookie(cookies){
  var secret='secret';
    var reqcookies = {};
    var reqsignedCookies = {};
    if (cookies)
    {
      try
      {
        reqcookies = cookie.parse(cookies);
        if (secret)
        {
          reqsignedCookies = utils.parseSignedCookies(reqcookies, secret);
          var obj = utils.parseJSONCookies(reqsignedCookies);
          reqsignedCookies = obj;
        }
        reqcookies = utils.parseJSONCookies(reqcookies);
      }
      catch (err)
      {
        errstatus = 400;
        console.log("err",err.stack)
      }
    }
    return {cookies:reqcookies,signedCookies:reqsignedCookies};
};

/*io.set('authorization', function (handshake_data, accept){  // uncomment for enabling auth

     var data = handshake_data;
     if (data.headers.cookie) {        
        
        data.cookie = parseCookie(data.headers.cookie,'secret');
        data.sessionID = data.cookie.signedCookies['express.sid']||data.cookie.cookies['express.sid'];
        
        console.log(data.headers.cookie);
        // (literally) get the session data from the session store
         sessionStore.load(data.sessionID, function (err, session) {
          if (err) {
            // if we cannot grab a session, turn down the connection
            accept(err.message, false);
          } else if (session==undefined) {
            // if we cannot grab a session, turn down the connection
            accept('session not found', false);
          } else {
            data.session = session;
            if(!data.session.userid)
            {
             data.session.userid=require('express/node_modules/connect/lib/utils').uid(24);// expose user's session it is unsecure lets have another id
             data.session.save(function(){})
            }          
            accept(null, true);            
          }
        });
      }else {
        // Check to see if the conection is made from the server
        // ~ auth with token
        if (data.query.secret_keyword &&
            (data.query.secret_keyword === sio.secret_keyword))
        {
          return accept(null, true);
        }
        return accept('No cookie transmitted.', false);
      }      
});
*/


// Since heroku does not support websocket, configuring XHR long polling
/*io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});*/

console.log("Socket IO config loaded !!!");
return io;
}