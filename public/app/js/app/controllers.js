"use strict";

function mainMenuCntrl($log,$scope,$location){
	$log.info("In mainMenuCntrl");
	
	$scope.getDashboardclassName = function(){
		if(angular.equals("/dashboard",$location.absUrl().split('#')[1])){
			return "active";
		}else{
			return "";
		}
	};
	
	$scope.getDashboardRealTimeclassName = function(){
		if(angular.equals("/dashboard_realtime",$location.absUrl().split('#')[1])){
			return "active";
		}else{
			return "";
		}
	};
	
	$scope.getDashboardHistoryclassName = function(){
		if(angular.equals("/dashboard_history",$location.absUrl().split('#')[1])){
			return "active";
		}else{
			return "";
		}
	};
	
	$scope.getInfrastructureClassName = function(){
		if(angular.equals("/infrastructure",$location.absUrl().split('#')[1])){
			return "active";
		}else{
			return "";
		}
	};
	
	$scope.getMessageClassName = function(){
		if(angular.equals("/messages",$location.absUrl().split('#')[1])){
			return "active";
		}else{
			return "";
		}
	};
}

function indexCntrl($log,$scope,$timeout,$location){
	$log.info("In indexCntrl");
	$scope.realtimeData;	
	
	$scope.getRealTimeData = function(){
		return this.realtimeData;
	};
	
	$scope.setRealTimeData = function(realtimeData){
		this.realtimeData = realtimeData;
	};
}

function dashboardCntrl($log,$scope,$timeout,$location,$rootScope,User){
	$log.info("In dashboardCntrl");
	if(!User.isValidUser()){
		User.redirectToLogin();
	}
	if(!angular.equals("/login",$location.absUrl().split('#')[1])){
		angular.element('#headerMenuBar').css({display: 'block'});
		angular.element('#main-menu-toggle').css({display: 'block'});
		angular.element('#widgets-area-button').css({display: 'block'});
		angular.element('#sidebar-left').css({display: 'block'});
	}
	
	$scope.loggedInTimer = "00:00:00";
	
	/*socket.on('activeUsers',function(data){
		$log.info("active users 1 " + data.activeUsers);
		$scope.realTimeChartData = generateRealTimeChartData(data.activeUsers);
		
	});
	
	socket.on('analyticsData',function(data){
		$log.info("socket");
		$log.info(data.analyticsData.activeUsers);
		$log.info(angular.toJson(data.analyticsData));
	});*/
	
	/**method for generating the realtime json object**/
	$scope.setRealTimeData(generateRealTimeData());	
	$log.info($scope.getRealTimeData());

	/**Start: Generate random data for RealTime Json Object**/
	$scope.updateRealTimeData = function(){
		$scope.setRealTimeData(generateRealTimeData());		
		$scope.circleChartData = generateCircleChartData($scope.getRealTimeData());
		$scope.realTimeChartData = generateRealTimeChartData($scope.getRealTimeData());
		$timeout($scope.updateRealTimeData,1000);
	};
	$timeout($scope.updateRealTimeData,1000);
	/**End: Generate random data for RealTime Json Object**/
	
	$scope.verticalChartInputs = generateVerticalStatusData();	
	$scope.browserUsingStatus = generateRealTimeBrowserData();
	
	/**Start: Generate random data for browserUsingStatus**/
	$scope.updateBrowserUsingStatusData = function(){
		$scope.browserUsingStatus = generateRealTimeBrowserData();
		$timeout($scope.updateBrowserUsingStatusData,12000);
	};
	$timeout($scope.updateBrowserUsingStatusData,12000);
	/**End: Generate random data for browserUsingStatus**/
	
	/**Start: Generate random data for verticalChartInputs**/
	$scope.updateVerticalChartData = function(){
		$scope.verticalChartInputs = generateVerticalStatusData();
		$timeout($scope.updateVerticalChartData,8000);
	};
	$timeout($scope.updateVerticalChartData,8000);
	/**End: Generate random data for verticalChartInputs**/
	
}


function dashboardHistoryCntrl($log,$scope,$timeout,$location,$rootScope,User){
	$log.info("In dashboardHistoryCntrl");	
	if(!User.isValidUser()){
		User.redirectToLogin();
	}
	
	if(!angular.equals("/login",$location.absUrl().split('#')[1])){
		angular.element('#headerMenuBar').css({display: 'block'});
		angular.element('#main-menu-toggle').css({display: 'block'});
		angular.element('#widgets-area-button').css({display: 'block'});
		angular.element('#sidebar-left').css({display: 'block'});
	}
		
	$scope.statusChartInputs = generateChartData();	
	$scope.verticalChartInputs = generateVerticalStatusData();	
	$scope.browserUsingStatus = generateRealTimeBrowserData();
	

	/**Start: Generate random data for browserUsingStatus**/
	$scope.updateBrowserUsingStatusData = function(){
		$scope.browserUsingStatus = generateRealTimeBrowserData();
		$timeout($scope.updateBrowserUsingStatusData,12000);
	};
	//$timeout($scope.updateBrowserUsingStatusData,12000);
	/**End: Generate random data for browserUsingStatus**/
	
	/**Start: Generate random data for verticalChartInputs**/
	$scope.updateVerticalChartData = function(){
		$scope.verticalChartInputs = generateVerticalStatusData();
		$timeout($scope.updateVerticalChartData,8000);
	};
	//$timeout($scope.updateVerticalChartData,8000);
	/**End: Generate random data for verticalChartInputs**/
	
	/**Start: Generate random data for statusChartInputs**/
    $scope.updateChartData = function(){
    	$scope.statusChartInputs = generateChartData();
    	$timeout($scope.updateChartData,4000);
    };
    //$timeout($scope.updateChartData,4000);
	/**End: Generate random data for statusChartInputs**/
}

function infrastructureCntrl($log,$scope,$timeout,User){
	$log.info("In infrastructureCntrl");
	if(!User.isValidUser()){
		User.redirectToLogin();
	}

	/*socket.on('analyticsData',function(data){
		$log.info("socket");
		$log.info(data.analyticsData.activeUsers);
		//$log.info(data.activeUsers);
		$scope.activeUsersCircleChart = generateActiveUsersCircleChartData(data.analyticsData.activeUsers);

	});*/
	
	/*socket.on('analyticsData',function(data){
		// To Do
	});

	socket.on('activeUsers',function(data){
		$log.info("active users 2 " + data.activeUsers);		
		$scope.activeUsersCircleChart = generateActiveUsersCircleChartData(data.activeUsers);
	});*/
	

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