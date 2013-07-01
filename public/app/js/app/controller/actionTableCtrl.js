"use strict";

function actionTableCtrl($log,socket,$scope,$timeout,$location,$window){

	$log.info("In actionTableCtrl");

	socket.on('noResultsFound',function(data){				
		$log.info("inside no results found rule");
		$log.info(data.noResultsFound.ruleId);
		
	});

	$scope.chat = function(clientId){
		var url = "/chat?clientId="+clientId;
		console.log("url--" + url);
		$window.open(url,clientId, 'width=500, height=600');
		
	};
	
}

