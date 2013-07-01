
/**
Working version on Socket IO on Express 3.0 !!!!
 * Module dependencies.
 */
var express = require('express')
  , MemoryStore = express.session.MemoryStore 
  , sessionStore = new MemoryStore()
  , app = express()
  // trick to get socket io work in express 3
  , server = require('http').createServer(app)  
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path'); 

  
  //, connect = require('connect');
  
//session configs
//var sessionStore = new connect.session.MemoryStore();
//socket io references 

var socketConfig = './routes/socket/socketconfig.js';
var sendAnalyticsData = require('./routes/analytics/analyticsData.js');
var sendRuleData = require('./routes/rules/rulesData.js');
var owaChatHandler = require('./routes/chat/chat.js');

var rulesData = []; // list of rule data to be sent to dashboard

/*var owaClientConfig = require('./routes/client/owaclient.js');
var owaAdminConfig = require('./routes/admin/owadashboard.js');
var owaClientData = require('./routes/client/clientdata.js');
var owaChatHandler = require('./routes/chat/chat.js');*/


/*GLOBAL.OWA_CUSTOMERS = [];
GLOBAL.OWA_ADMINS = [];
GLOBAL.CONNECTED_ID = 0;
GLOBAL.OFFER_COUNT = 0;
GLOBAL.ERROR_COUNT = 0;
GLOBAL.PYMT_ERROR_DATA = [];*/


app.configure(function(){  
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');  
  app.set('view engine', 'ejs');
  app.set("view options", { layout: "layout.ejs" });
  
  app.use(express.cookieParser());
  app.use(express.session({store: sessionStore , secret: 'secret' , key: 'express.sid',
    maxAge :24*3600000 //1 Hour * 24
  }));

  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public'))); 
});

// Store imageData buffer 1x1 pixel transparent gif file
gif_1x1_buffer = new Buffer("R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", 
    encoding='base64');
 
app.get('/keepsession.gif', function(req,res){
  res.writeHead(200,
  {
   'Cache-Control': 'no-cache',
   'Pragma': 'no-cache',
   'Expires':"Tue, 01 Jan 2015 12:12:12 GMT",
   'Content-Type': 'image/gif'
  });
  res.write(gif_1x1_buffer.toString('binary'), 'binary');
  res.end();
});

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

GLOBAL.IO = require(socketConfig)(server,sessionStore); // get socket "io" connection

IO.sockets.on('connection', function (socket){

  console.log("socket connecting ------");
  IO.sockets.emit('activeUsers', { 'activeUsers':Object.keys(IO.connected).length} ); // active users
  sendAnalyticsData.processAnalyticsData(socket); // send analytics data
  sendRuleData.processRulesData(socket,rulesData);
  owaChatHandler.chatHandler(socket);

  socket.on('disconnect', function () {
    console.log("Socket Disconecting........." + Object.keys(IO.connected).length);
    IO.sockets.emit('activeUsers', { 'activeUsers':Object.keys(IO.connected).length} );
  });
});



/*IO.sockets.on('connection', function (socket){
  CONNECTED_ID++;
  owaClientConfig.configClientUser(socket);// perform client config 
  owaAdminConfig.configAdminUser(socket);  // perform admin config
  owaClientData.processClientData(socket); // handle client analytics data  
    socket.on('disconnect', function (){
      CONNECTED_ID--;
      owaClientConfig.removeClientUser(socket);
    });

    owaChatHandler.chatHandler(socket);

    socket.on('offerCode',function(offerCode){

      IO.sockets.socket(offerCode.clientId).emit('offerCode',offerCode.offer); 

    });
  

});*/


app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/chat',routes.chat);
app.get('/users', user.list);




