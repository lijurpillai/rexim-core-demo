
/**
Working version on Socket IO on Express 3.0 !!!!
 * Module dependencies.
 */
var express = require('express')
  , app = express()
  // trick to get socket io work in express 3
  , server = require('http').createServer(app)  
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

//socket io references 

var socketConfig = './routes/socket/socketconfig.js';
var owaClientConfig = require('./routes/client/owaclient.js');
var owaAdminConfig = require('./routes/admin/owadashboard.js');
var owaClientData = require('./routes/client/clientdata.js');
var owaChatHandler = require('./routes/chat/chat.js');

GLOBAL.OWA_CUSTOMERS = [];
GLOBAL.OWA_ADMINS = [];
GLOBAL.CONNECTED_ID = 0;
GLOBAL.OFFER_COUNT = 0;
GLOBAL.ERROR_COUNT = 0;
GLOBAL.PYMT_ERROR_DATA = [];


app.configure(function(){  
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');  
  app.set('view engine', 'ejs');
  app.set("view options", { layout: "layout.ejs" });
  
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});


server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

GLOBAL.IO = require(socketConfig)(server); // get socket "io" connection

IO.sockets.on('connection', function (socket){
  CONNECTED_ID++;
  owaClientConfig.configClientUser(socket);// perform client config 
  owaAdminConfig.configAdminUser(socket);  // perform admin config
  owaClientData.processClientData(socket); // handle client analytics data
    socket.on('disconnect', function (){
      CONNECTED_ID--;
      owaClientConfig.removeClientUser(socket);
    });

    owaChatHandler.chatHandler(socket);

    /*socket.on('sendchat', function (data) {
    // we tell the client to execute 'updatechat' with 2 parameters
    IO.sockets.emit('updatechat', socket.username, data);
  });    
*/

    socket.on('offerCode',function(offerCode){

      console.log("muhuhhhaaa----1" + offerCode.offer);
      console.log("muhuhhhaaa----2>" + offerCode.clientId);
      IO.sockets.socket(offerCode.clientId).emit('offerCode',offerCode.offer); 

    });
  

});


app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/chat',routes.chat);
/*app.get('/chat', function (req, res) {
  res.sendfile(__dirname + '/chat.html');
});*/
app.get('/users', user.list);




