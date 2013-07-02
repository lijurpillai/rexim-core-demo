"use strict";
/*var _activeUsers = [];
var _res = [];*/

function indexCntrl($log,socket,$scope,$rootScope,$timeout,$location,$window){

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

function infrastructureCntrl($log,$scope,socket,$timeout,User){
	$log.info("In infrastructureCntrl");
	if(!User.isValidUser()){
		User.redirectToLogin();
	}
	

	$scope.activeUserData = {"users":150,"data":getRandomData(150)};
	$scope.serverData = {"users":200,"data":getRandomData(200)};
	$scope.activeUsersCircleChart = generateActiveUsersCircleChartData();	
	$scope.temperatureChartData = generateTemperatureStatusChartData();
	
	/**Start: Generate random data for temperatureChartData**/
	$scope.updateTemperatureChartData = function(){
		$scope.temperatureChartData = generateTemperatureStatusChartData();
		$timeout($scope.updateTemperatureChartData,3000);
	};
	//$timeout($scope.updateTemperatureChartData,3000);
	/**End: Generate random data for temperatureChartData**/
	
	/**Start: Generate random data for activeUserData**/
	$scope.updateRealTimeChartData = function(){
		$scope.activeUserData = {"users":150,"data":getRandomData(150)};
		$timeout($scope.updateRealTimeChartData,8000);
	};
	//$timeout($scope.updateRealTimeChartData,8000);
	/**End: Generate random data for activeUserData**/
	
	/**Start: Generate random data for serverData**/
	$scope.updateRealTimeServerChartData = function(){
		$scope.serverData = {"users":200,"data":getRandomData(200)};
		$timeout($scope.updateRealTimeServerChartData,2000);
	};
	//$timeout($scope.updateRealTimeServerChartData,2000);
	/**End: Generate random data for serverData**/
	
	/**Start: Generate random data for activeUsersCircleChart**/
	$scope.updateActiveUseCircleChartData = function(){
		$scope.activeUsersCircleChart = generateActiveUsersCircleChartData();
		$timeout($scope.updateActiveUseCircleChartData,1000);
	};
	//$timeout($scope.updateActiveUseCircleChartData,1000);
	/**End: Generate random data for activeUsersCircleChart**/
}

function messageCntrl($log,$scope,$timeout){
	$log.info("In messageCntrl");
}

function loginCntrl($log,$scope,$timeout,$location,$http,$rootScope){
	$log.info("In loginCntrl");
	if(sessionStorage){
		sessionStorage.clear('user');
	}
	if(angular.equals("/login",$location.absUrl().split('#')[1])){
		angular.element('#headerMenuBar').css({display: 'none'});
		angular.element('#main-menu-toggle').css({display: 'none'});
		angular.element('#widgets-area-button').css({display: 'none'});
		angular.element('#sidebar-left').css({display: 'none'});
	}

	$scope.loginAction = function(){
		$log.info("UserName: "+$scope.username);
		$log.info("UserPassword: "+$scope.userpassword);
		$scope.user;
		$http.get('js/app/dataproviders/loginDetails.json').success(function(data){
	        $scope.user = data;
	        if(angular.equals($scope.user.name,$scope.username) && angular.equals($scope.user.password,$scope.userpassword)){
	        	sessionStorage.setItem("user",angular.toJson($scope.user));
				$location.path('/dashboard_realtime');
				if(!$rootScope.$$phase){
	                $rootScope.$apply();
	            }
			}
	    });		
	};
}