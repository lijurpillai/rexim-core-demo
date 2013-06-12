'use strict';

angular.module('owappServices', []).
factory('socket', function ($rootScope) {
	console.log("inside socket service");
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emitToClient: function(eventName,data,clientId){
      console.log(io.sockets.clients());
      //io.sockets(clientId).emit(eventName,data);
      //io.sockets.emit('sample', { adminKey: 'owaCustomer1_Admin' }); 
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
}).
factory('dataBinding',function (){
  console.log("inside data binding service");  
  var data = {};
  data.conn = 0;
  data.offer =0;
  data.pymtError = 0;
  data.pymtErrorData =[];
    return {      
      set : function(dashBrdData){
        data.conn = dashBrdData.conn;
        data.offer = dashBrdData.offer;
        data.pymtError = dashBrdData.pymtError;
        data.pymtErrorData = dashBrdData.pymtErrorData
        //console.log(data.conn);


      },
      get : function(){
        if(data.conn == null)  {data.conn = 0;}
        if(data.offer == null)  {data.offer = 0;}
        if(data.pymtError == null)  {data.pymtError = 0;}
        return data;
      }
    }
});

