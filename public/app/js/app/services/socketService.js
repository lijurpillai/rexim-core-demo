'use strict';

angular.module('owappServices', []).
factory('socket', function ($rootScope) {
	console.log("inside socket service");
  var socket = io.connect();
  return {
  	log:function(){console.log("inside socket service")},
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
});