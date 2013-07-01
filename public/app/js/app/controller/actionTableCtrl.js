"use strict";

function actionTableCtrl($log,socket,$scope,$rootScope,$timeout,$location,$window){

	$log.info("In actionTableCtrl");
	if(!$scope.ruleData){
		$scope.ruleData = $rootScope.masterData;
		$scope.status = "Active";
	}

	socket.on('noResultsFound',function(data){				
		$log.info("inside no results found rule");
		$log.info(data.noResultsFound.length);
		$rootScope.masterData = data.noResultsFound;
		$scope.ruleData = data.noResultsFound;
		$scope.status = "Active";				
	});

	socket.on('couponError',function(data){

		$log.info("inside couponError rule");
		$log.info(data.couponError.length);
		$rootScope.masterData = data.couponError;
		$scope.ruleData = data.couponError;
		$scope.status = "Active";		

		});

	$scope.chatStatus = function(data){
			return data.ruleDetails.chat;
		};
		$scope.offerStatus = function(data){
			return data.ruleDetails.offer;
		};	

	

	$scope.chat = function(clientId){
		var url = "/chat?clientId="+clientId;
		console.log("url--" + url);
		$window.open(url,clientId, 'width=500, height=600');
		
	};
	
}

